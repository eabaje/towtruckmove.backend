/* REQUIRES /js/shared/json2.js */

/*global jQuery:false, Fat:true */
/*jslint devel: true, browser: true, continue: true, sloppy: true, vars: true, white: true, plusplus: true,
 maxerr: 50, maxlen: 120, indent: 4 */
/**
 * Fat.Location.Fieldset and Fat.Location.Manager: JS classes for location validation
 *
 * Supports: jQuery
 *
 * By using the autoLoad function, this class will attach itself to location field sets it finds in the current
 *     document.
 * FieldSet elements are designated by class
 *      CLASS           PURPOSE
 *      FatLocation     encapsulates one field set -- can exist multiple times
 *      FatCity, FatState, FatZip       city, state, zip fields
 *      FatValid        hidden "is valid" value (should be set to "1" if prepopulated values are valid)
 *      FatMetro        visible metro area auto-filled when setting location
 *      FatClear        anchor that will clear the field set
 *      FatSpinner      spinner image that is shown/hidden with ajax call processing
 *      FatSuggestions  hidden div that will display suggestions -- ONE ONLY per document (extras will be ignored)
 *
 *      OPTION EXTRA PROPERTY
 *      id="Text version of fieldset"   FatCity id is passed in validation response. This can be used to say "fill
 *          in [id] location"
 *      validationGroup="[1...9999]"    FatCity uses this property to group fieldsets to call a function when all
 *          in the group are valid.
 *          CD uses this to prefetch zip-to-zip distance and pricing once both orig & dest are valid.
 *          Any number of fieldsets can be in the validationGroup
 *
 * Fat.Location.Fieldset JS class groups all entry, validation and setting functionality
 *      Fieldsets do not know about other fieldsets.
 *
 * Fat.Location.Manager JS class handles the small amount of inter-fieldset functionality
 * (Object is generally auto-instantiated by autoLoad functions defined below.)
 *      When a fieldset gains focus, the prior-focused set is blurred
 *      Suggestions are displayed and hidden through the manager
 *      When a fieldset is valid, if in a group, other sets in the group are checked. If all valid
 *          the callback is executed.
 *      The form onSubmit should be written to utilize a validation queueing that will wait for all
 *          ajax validation to complete
 *      before executing the form validation function.
 *          <form ... onsubmit="return startValidation(this)">  // validation call
 *
 *          function startValidation( form ) {
 *              FatManager.waitForAllLocations(function( fieldsets ) { // function that will wait for all
 *                  ajax calls to finish
 *                  if (validate(form, fieldsets)) {            // once all ajax finished, run own validation
 *                                                              // for this form
 *                      form.submit();                          //   if all okay, submit the form
 *                  }
 *              });
 *              return false;                                   // always return false to prevent
 *                                                              //   form submission "onSubmit"
 *          }
 *
 *  JS CLOSURES are used in many places to retain context through function calls.
 *      Otherwise "this" can become "window" or other context.
 *      var that = this;
 *      this.clear.click(function( ) { that.clearLocation(); });
 *
 *
 *
 *
 */

// Initialize Fat object, if necessary
if (typeof Fat === 'undefined') {
    var Fat = {};
}

// Initialize Fat Location object
Fat.Location = {};

(function ($) {

    /**
     * Location Fieldset
     * @param {object} options Object containing initialization options
     *     city, state, zip, metro, valid, clear, spinner, manager
     * @constructor
     */
    Fat.Location.Fieldset = function (options) {

        // HTML DOM objects are attached on initialization
        this.city = null;       // TEXT INPUT (required)
        this.state = null;      // SELECT (required)
        this.zip = null;        // TEXT INPUT (required)
        this.valid = null;      // HIDDEN (required)
        this.metro = null;      // DIV
        this.clear = null;      // A
        this.spinner = null;    // SPAN
        this.allowCanada = true;

        this.stateText = null;  // for FatStateSmall text overlay of hidden state selector

        // JS vars
        this.ajax = null;       // active ajax process
        this.response = null;   // ajax response
        this.location = '';     // concatination of location (city+state+zip) to detect changes
        this.validated = false; // validation has run on this location
        this.focusedOn = null;  // for MSIE: track field to return after clicking a suggestion
        this.autoSet = false;   // can we autoset from the first suggestion when blurring (is it an exact match)?

        // On startup, attach DOM objects and init vars
        if (typeof options === 'object') {
            // bind functionality to each object
            if (typeof options.city === 'object') {
                this.bindCity(options.city);
            }
            if (typeof options.state === 'object') {
                this.bindState(options.state);
                if ($(this.state).hasClass('FatStateSmall')) {
                    this.makeSmallState();
                }
            }
            if (typeof options.zip === 'object' && options.zip !== null) {
                this.bindZip(options.zip);
            }
            if (typeof options.metro === 'object' && options.metro !== null) {
                this.metro = options.metro;
            }
            if (typeof options.valid === 'object' && options.valid !== null) {
                this.valid = options.valid;
            }
            if (typeof options.clear === 'object' && options.clear !== null) {
                this.clear = options.clear;
                var that = this;
                // return false to prevent nagivate away warning in JT
                $(this.clear).click(function ( ) {
                    that.clearLocation();
                    return false;
                });
            }
            if (typeof options.spinner === 'object' && options.spinner !== null) {
                this.spinner = options.spinner;
            }
            // get manager or create one
            if (typeof options.manager === 'object') {
                this.manager = options.manager;
            }
            if (this.manager === null) {
                // pass through options in case some for manager
                Fat.Location.Fieldset.prototype.manager = new Fat.Location.Manager(options);
            }
            if (typeof options.allowCanada != 'undefined' && options.allowCanada !== null) {
                this.allowCanada = options.allowCanada;
            }
            if (typeof options.identifier != 'undefined' && options.identifier !== null) {
                this.identifier = options.identifier;
            } else {
                this.identifier = '';
            }
            if (typeof options.errorColor != 'undefined' && options.errorColor !== null) {
                this.errorColor = options.errorColor;
            } else {
                this.errorColor = '#ffc0c0';
            }
            this.manager.add(this); // add this fieldset to manager's list (used for ajax wait & form validation)
            this.manager.registerValidationGroup(this);

            //this.setError(); // set background color if not valid
        }
    };

    Fat.Location.Fieldset.prototype.smallStateCounter = 1;

// prototype default values for this class
    Fat.Location.Fieldset.prototype.manager = null;

    Fat.Location.Fieldset.prototype.script = '/ajax/FatLocationValidation.php';
//The number of suggestions to display [1..10]. Current SQL provides 10 max.
    Fat.Location.Fieldset.prototype.suggest = 10;

    Fat.Location.Fieldset.prototype.errorColor = this.errorColor;   // background color when error in fieldset
    Fat.Location.Fieldset.prototype.validColor = '#ffffff';   // background color when fieldset is valid

//Array of state codes that are excluded from validation (JT requirement)
    Fat.Location.Fieldset.prototype.stateExceptions = null;

    Fat.Location.Fieldset.prototype.maxCityLength = 50;

    Fat.Location.Fieldset.prototype.msec = 2000;      // delay in typing before looking for suggestions
    Fat.Location.Fieldset.prototype.minLen = 4;       // minimum city length to first look for suggestions

// positioning for suggestions popover
    Fat.Location.Fieldset.prototype.toRight = true;
    Fat.Location.Fieldset.prototype.toRightLeftOffset = 25;
    Fat.Location.Fieldset.prototype.toRightTopOffset = 5;
    Fat.Location.Fieldset.prototype.arrowClass = 'FatArrow';

    Fat.Location.Fieldset.setList = [];     // array of all fieldsets

    /**
     * Bind events to city element
     * @param {element} city City dom element
     */
    Fat.Location.Fieldset.prototype.bindCity = function (city) {
        this.city = city;
        var $city = $(city);
        var that = this;
        if (typeof this.cityOnkeyup === 'function') {
            $city.keyup(function (e) {
                that.cityOnkeyup();
            });
        }
        if (typeof this.cityOnfocus === 'function') {
            $city.focus(function (e) {
                that.cityOnfocus();
            });
        }
        if (typeof this.cityOnblur === 'function') {
            $city.blur(function (e) {
                that.cityOnblur();
            });
        }
        if (typeof this.cityOnchange === 'function') {
            $city.change(function (e) {
                that.cityOnchange(e);
            });
        }
        if (typeof this.city.validationGroup === 'string') {
            this.validationGroup = this.city.validationGroup;
        }
    };

    /**
     * Clear out city field value
     */
    Fat.Location.Fieldset.prototype.cityEmpty = function () {
        return this.city.value === '';
    };

    /**
     * Triggered by city key up event
     */
    Fat.Location.Fieldset.prototype.cityOnkeyup = function ( ) {
        this.keypressed();
    };

    /**
     * Triggered by city focus event
     */
    Fat.Location.Fieldset.prototype.cityOnfocus = function ( ) {
        this.focus(this.city);
    };

    /**
     * Triggered by city blur event
     */
    Fat.Location.Fieldset.prototype.cityOnblur = function ( ) {
        this.startBlurTimer(true);
    };

    /**
     * Triggered by city change event
     */
    Fat.Location.Fieldset.prototype.cityOnchange = null;

    /**
     * Bind events to state element
     * @param {element} state State dom element
     */
    Fat.Location.Fieldset.prototype.bindState = function (state) {
        var that = this;
        this.state = state;
        var $state = $(state);

        if (typeof this.stateOnclick === 'function') {
            $state.click(function (e) {
                that.stateOnclick(e);
            });
        }
        if (typeof this.stateOnkeyup === 'function') {
            $state.keyup(function (e) {
                that.stateOnkeyup();
            });
        }
        if (typeof this.stateOnfocus === 'function') {
            $state.focus(function (e) {
                that.stateOnfocus();
            });
        }
        if (typeof this.stateOnblur === 'function') {
            $state.blur(function (e) {
                that.stateOnblur();
            });
        }
        if (typeof this.stateOnchange === 'function') {
            $state.change(function (e) {
                that.stateOnchange(e);
            });
        }
    };

    Fat.Location.Fieldset.prototype.stateOnclick = null;

    /**
     * Triggered by state key up event
     */
    Fat.Location.Fieldset.prototype.stateOnkeyup = function ( ) {
        var that = this;
        window.setTimeout(function () {
            that.keypressed();
        }, 50);
    };

    /**
     * Triggered by state focus event
     */
    Fat.Location.Fieldset.prototype.stateOnfocus = function ( ) {
        this.focus(this.state);
    };

    /**
     * Triggered by state blur event
     */
    Fat.Location.Fieldset.prototype.stateOnblur = function ( ) {
        this.startBlurTimer(true);
    };

    /**
     * Triggered by state change event
     */
    Fat.Location.Fieldset.prototype.stateOnchange = Fat.Location.Fieldset.prototype.stateOnkeyup;

    /**
     * Support overlay of big state selector with narrow state text input.
     * Clicking on state text box brings up selector. Clicking on selector hides it and sets text input.
     * Simply add class to state selector: FatStateSmall
     *
     * @TODO
     * [ ] * * * * This has not been tweaked to work with JQuery * * * *
     */
    Fat.Location.Fieldset.prototype.makeSmallState = function ( ) {

        var that = this;
        this.stateText = $('<input type="text" class="FatStateText" value="' + this.state.value + '"/>').get(0);
        $(this.stateText).insertBefore(this.state);

        // set the default for auto-test when leaving page -- setUnsubmitted()
        this.stateText.defaultValue = this.state.value;

        // if available, put 'State' overlay when blank - defined in FormExtensions.js
        this.stateText.uid = Fat.Location.Fieldset.prototype.smallStateCounter++;
        if (typeof Fat.Form.EmptyOverlaySet === 'function') {
            Fat.Form.EmptyOverlaySet($(this.stateText), 'State');
        }

        var $state = $(this.state);
        var $stateText = $(this.stateText);
        var textOffset = $stateText.offset();
        var textWidth = $stateText.width();
        var selectorOffset = $state.offset();
        var selectorWidth = $state.width();

        $(this.state).css({
            'position': 'absolute',
            'z-index': '9',
            'display': 'none',
            'left': (textOffset.left + textWidth - selectorWidth -
                    -parseInt($stateText.css('border-left-width'), 10) - parseInt($stateText.css('border-right-width'), 10)
                    - parseInt($stateText.css('padding-left'), 10) - parseInt($stateText.css('padding-right'), 10))
                    + 'px'
        });

        $(this.state).on('blur', function () {
            that.state.style.display = 'none';

            that.stateText.value = that.state.value;
            that.stateText.disabled = false;
            $(that.stateText).trigger('change');
            $(that.stateText).trigger('blur');
        });


        $(this.state).on('click', function () {
            that.zip.focus();
        });

        $(this.state).on('keypress', function (event) {
            switch (event.keyCode) {
                case 13: // RETURN
                    event.stopPropagation();
                    $(that.state).trigger('click');
                    $(that.stateText).trigger('blur');
                    break;
            }
        });

        $(this.stateText).on('focus', function () {
            that.state.style.display = 'inline';
            that.state.size = 20;
            that.state.focus();
            that.stateText.disabled = true;
        });
    };

    /**
     * Bind events to zip element
     * @param {element} zip Zip dom element
     */
    Fat.Location.Fieldset.prototype.bindZip = function (zip) {
        var that = this;
        this.zip = zip;
        var $zip = $(zip);

        if (typeof this.zipOnkeyup === 'function') {
            $zip.keyup(function (e) {
                that.zipOnkeyup(e);
            });
        }
        if (typeof this.zipOnfocus === 'function') {
            $zip.focus(function (e) {
                that.zipOnfocus(e);
            });
        }
        if (typeof this.zipOnblur === 'function') {
            $zip.blur(function (e) {
                that.zipOnblur(e);
            });
        }
        if (typeof this.zipOnchange === 'function') {
            $zip.change(function (e) {
                that.zipOnchange(e);
            });
        }
    };

    /**
     * Zip keyup
     */
    Fat.Location.Fieldset.prototype.zipOnkeyup = function ( ) {
        this.keypressed();
    };
    /**
     * Zip on focus
     */
    Fat.Location.Fieldset.prototype.zipOnfocus = function ( ) {
        this.focus(this.zip);
    };
    /**
     * Zip on blur
     */
    Fat.Location.Fieldset.prototype.zipOnblur = function ( ) {
        this.startBlurTimer(true);
    };
    /**
     * Zip on change
     */
    Fat.Location.Fieldset.prototype.zipOnchange = null;

    /**
     * Is fieldset valid
     * @return boolean
     */
    Fat.Location.Fieldset.prototype.isValid = function ( ) {
        return this.ajax === null && this.valid.value === '1' && this.city.value !== '';
    };

    /**
     * Set location to specified value
     * @param {string} location Location id
     */
    Fat.Location.Fieldset.prototype.set = function (location) {
        if (typeof location === 'string') {
            location = this.response.suggestions[location];
        }

        // Stop JSON and hide suggestions div
        this.abortJSON();
        this.manager.hideSuggestions(this.city.id);
        jQuery('#' + this.city.id).removeClass('emptyField');

        // Populate form
        if (location) {
            this.city.value = location.city;
            this.state.value = location.state;
            this.zip.value = location.zip;
            this.valid.value = '1';

            // if using FatStateSmall, fill the small overlay
            if (this.stateText !== null) {
                this.stateText.value = location.state;
            }

            this.manager.checkValidationGroup(this.validationGroup); // if in validation group, see if whole group valid
            if (this.metro) {
                if (typeof location.metro === 'string') {
                    location.metro = location.metro.replace(/&apos;/g, "'");
                    this.metro.innerHTML = (location.metro ? '[' + location.metro + ']' : '&nbsp;');
                } else {
                    this.metro.innerHTML = '&nbsp;';
                }
            }
            $(this.city).trigger('change');
            $(this.state).trigger('change');
            $(this.zip).trigger('change');
            if (this.stateText !== null) {
                $(this.stateText).trigger('change');
            }
        }
        this.setError();
        this.remember();

        if (location.city === '') { // on clear, go to city
            this.city.focus();
            this.manager.hideSuggestions(this.city.id);
        } else if (this.focusedOn) { // return focus for MSIE
            var that = this;
            window.setTimeout(function ( ) {
                that.focusedOn.focus();
            }, 50);
        }

        this.autoSet = false; // make sure we don't run auto-set
    };

    /**
     * Set field background color to valid or error color
     * @param {string} color Valid css color
     */
    Fat.Location.Fieldset.prototype.setBgColor = function (color) {
        this.city.style.background = color;
        this.state.style.background = color;
        this.zip.style.background = color;
        if (this.stateText !== null) {
            this.stateText.style.background = color;
        }
    };

    /**
     * Set field background color to valid or error color
     */
    Fat.Location.Fieldset.prototype.setError = function ( ) {
        if (!this.city.disabled) {
            var color = (this.valid.value === '1' ? this.validColor : this.errorColor);
            this.setBgColor(color);
            if (typeof Fat.Location.Manager.prototype.validationCallback == 'function') {
                Fat.Location.Manager.prototype.validationCallback(this.valid.value === '1');
            }
        }
        this.manager.hideSuggestions(this.city.id);
    };

    /**
     * Clear the location -- set to <blank> location
     */
    Fat.Location.Fieldset.prototype.clearLocation = function ( ) {
        this.focus(null, true);
        this.set({city: '', state: '', zip: '', metro: ''});
        this.setError();
        this.autoSet = false; // make sure we don't run auto-set
    };

    /**
     * Remember current location
     * @return {boolean} T: Location changed
     */
    Fat.Location.Fieldset.prototype.remember = function ( ) {
        var changed = this.changed();
        if (changed) {
            this.location = this.city.value + this.state.value + this.zip.value;
            this.validated = false;
        }
        return changed;
    };

    /**
     * Check to see if fieldset has changed
     * @return {boolean}
     */
    Fat.Location.Fieldset.prototype.changed = function ( ) {
        return this.location !== this.city.value + this.state.value + this.zip.value;
    };

    /**
     * When blurring and no current ajax, autoset if can
     * @return {boolean} T: did set
     */
    Fat.Location.Fieldset.prototype.doSetter = function ( ) {
        var ran = false;
        if (this.autoSet) {
            this.set(this.response.suggestions[0]);
            this.autoSet = false;
            ran = true;
        }
        return ran;
    };

// when a key is pressed, if value changed then cancel ajax, cancel any autoset and set timer for new ajax call
    Fat.Location.Fieldset.prototype.keypressed = function (doNow) {
        if (this.remember()) {
            this.valid.value = this.location === '' ? '1' : '0'; // blank is valid
            this.abortJSON();
            this.autoSet = false; // make sure we don't run auto-set
            if (doNow) {
                this.validate();
            } else {
                this.startValidationTimer(true);
            }
        }
    };

// force this location as valid. (Used when stateExceptions are specified.)
    Fat.Location.Fieldset.prototype.forceValid = function ( ) {
        this.setBgColor(this.validColor);
        this.valid.value = '1';
        this.manager.checkValidationGroup(this.validationGroup); // if in validation group, see if whole group valid
    };

    /*
     * AJAX onComplete function -- executed when ajax completes
     * This can be overwritten for custom function event handling
     *
     * Display suggestions div with suggestions or error/failure message
     */
    Fat.Location.Fieldset.prototype.onComplete = function (response, success) {
        if (this.ajax) {
            delete this.ajax;
            this.ajax = null;
        }

        this.validated = true;
        this.response = response;
        if (success && typeof this.response === 'object' && this.response) {
            // can we autoset when blurring from this fieldset?
            this.autoSet = this.response.failure !== 'object'
                    && typeof this.response.suggestions === 'object'
                    && typeof this.response.suggestions[0] === 'object'
                    && this.response.suggestions[0].exact === '1';

            if (!this.manager.haveFocus(this.city.id)) {
                if (this.autoSet) {
                    this.set(this.response.suggestions[0]);
                } else {
                    this.setError();
                }
            } else {    // if still on fieldset, display suggestions or error/failure message
                this.manager.showSuggestions(this);
            }
            if (this.identifier != ''){
                this.manager.showSuggestions(this);
            }
        } else { // invalid response received
            this.setError();
        }
    };

// set focus to "field" and clear blur timer
// redisplay suggestions if appropriate
// field: null when bluring out of fieldset
    Fat.Location.Fieldset.prototype.focus = function (field, noValidation) {

        this.focusedOn = field;
        this.startBlurTimer(false);
        if (this.manager.haveFocus(this.city.id) === (field === null ? true : false)) {
            this.startValidationTimer(false);
            if (this.manager.haveFocus(this.city.id)) {
                this.manager.hideSuggestions(this.city.id);
                if (this.ajax === null) { // if no current AJAX request, do setter or validate
                    if (!this.doSetter()) {
                        this.validate(false, false, false, true);
                    }
                }
            }
            if (field === null) {
                this.manager.hideSuggestions(this.city.id);
                this.manager.lostFocus(this.city.id);
                if (this.ajax === null) { // if no active validation, set if error
                    this.setError();
                }
            } else {
                this.manager.gotFocus(this.city.id);
                if (!noValidation && this.valid.value === '0') {
                    this.setBgColor(this.validColor);
                    // if ajax not running or changed since focus then validate (should not have)
                    if (this.ajax === null || this.remember()) {
                        this.abortJSON();
                        this.validate();
                    }
                } else {
                    this.remember();
                }
            }
        }
        return true;
    };

// start blur timer -- allow holding focus when moving between fields in same fieldset
// if no new "focus" before timeout then focus(null)
// on: F to turn off timer
    Fat.Location.Fieldset.prototype.startBlurTimer = function (on) {
        if (this.blurTimer) {
            window.clearTimeout(this.blurTimer);
        }
        if (on) {
            var that = this;
            this.blurTimer = window.setTimeout(function () {
                that.focus(null);
            }, 50);
        } else {
            this.blurTimer = null;
        }
    };

// start validation timer -- when timer expires then validation will be performed on fieldset
// timer is usually reset with each keypress to hold off validation until typing is complete
// on: F to turn off timer
    Fat.Location.Fieldset.prototype.startValidationTimer = function (on) {
        if (this.locationTimer) {
            window.clearTimeout(this.locationTimer);
        }
        if (on) {
            var that = this;
            this.locationTimer = window.setTimeout(function () {
                that.validate(true);
            }, this.msec);
        } else {
            this.locationTimer = null;
        }
    };

// validate this fieldset
    Fat.Location.Fieldset.prototype.validate = function (isTimer, findMore, doNotShow, forceSetter) {
        if (!this.manager.haveFocus(this.city.id)) {
            return;
        }

        // if hasn't changed since last response, display response/suggestions
        if (this.validated && !findMore) {
            this.onComplete(this.response, true);
            return;
        }

        // if the selected state is "excluded" then force valid
        if (this.stateExceptions) {
            if (this.state.value && this.stateExceptions.search(this.state.value) !== -1) {
                this.forceValid();
                return;
            }
        }

        if (findMore) {
            this.valid.value = '0';
        }

        this.startValidationTimer(false);

        if (
                this.valid.value === '1'
                || (this.city.value.length < 2 && this.zip.value.length < 5)
                || (
                        isTimer
                        && this.state.value === ''
                        && this.city.value.length < this.minLen
                        && this.zip.value.length < 5
                        )
                ) {
            return;
        }

        // validate
        this.remember();

        this.setBgColor(this.validColor);

        this.reloadSuggestions(findMore, doNotShow, forceSetter);
    };

// get CityStateZip object for ajax call
// addlValues: more values to include in ajax request
    Fat.Location.Fieldset.prototype.csz = function (addlValues) {
        var k;
        var city = this.city.value == 'City' ? '' : this.city.value;
        var values = {city: city, state: this.state.value, zip: this.zip.value};
        if (typeof addlValues === 'object') {
            for (k in addlValues) {
                if (addlValues.hasOwnProperty(k)) {
                    values[k] = addlValues[k];
                }
            }
        }
        return values;
    };

// display type/wait message; abort any current ajax request and start new request
    Fat.Location.Fieldset.prototype.reloadSuggestions = function (findMore, doNotShow, forceSetter) {
        if (!doNotShow) {
            this.manager.showSuggestions(
                    this, '<span unselectable=on style="font-size: 8pt;">You may continue typing or wait...</span>'
                    );
        }
        this.abortJSON();
        var that = this;
        this.getJSON(
                this.script,
                this.csz(
                        {
                            maxCityLength: this.maxCityLength,
                            findMore: findMore,
                            doNotShow: doNotShow,
                            forceSetter: forceSetter,
                            suggest: this.suggest,
                            allowCanada: this.allowCanada
                        }
                ),
                function (response, success) {
                    if (that.identifier != '' && $(response.suggestions).length == 1){
                        $(that.zip).trigger('blur');
                    }
                    that.onComplete(response, success);
                }
        );
    };

// show or hide the spinner image
    Fat.Location.Fieldset.prototype.showSpinner = function (show) {
        if (this.spinner) {
            if (show) {
                $(this.spinner).show();
            } else {
                $(this.spinner).hide();
            }
        }
    };

// sample stand-alone call for suggestions
// generate ajax call with city/state/zip and execute "callback" with response
    Fat.Location.Fieldset.prototype.validateCSZ = function (city, state, zip, callback) {
        this.getJSON(this.script, {city: city, state: state, zip: zip}, function (response, success) {
            if (success && typeof response === 'object') {
                response.exact = typeof response.suggestions === 'object'
                        && typeof response.suggestions[0] === 'object' && response.suggestions[0].exact === '1';
                response.corrected = response.exact
                        && (response.suggestions[0].city.toLowerCase() !== response.request.city.toLowerCase()
                                || response.suggestions[0].state.toLowerCase() !== response.request.state.toLowerCase()
                                || response.suggestions[0].zip.toLowerCase() !== response.request.zip.toLowerCase());
            }
            if (typeof callback === 'function') {
                callback(response); // do callback function
            }
        });
    };

// simply validate the fields and set "valid" and background color
// generate ajax call with city/state/zip and execute optional callback with response
    Fat.Location.Fieldset.prototype.validateNow = function (callback) {
        this.getJSON(this.script, {city: this.city.value, state: this.state.value, zip: this.zip.value}, function (response, success) {
            if (success && typeof response === 'object') {
                response.exact = typeof response.suggestions === 'object'
                        && typeof response.suggestions[0] === 'object' && response.suggestions[0].exact === '1';
                response.corrected = response.exact
                        && (response.suggestions[0].city.toLowerCase() !== response.request.city.toLowerCase()
                                || response.suggestions[0].state.toLowerCase() !== response.request.state.toLowerCase()
                                || response.suggestions[0].zip.toLowerCase() !== response.request.zip.toLowerCase());
                this.valid.value = response.exact;
                this.setError();
            }
            if (typeof callback === 'function') {
                callback(response); // do callback function
            }
        });


    };

// Returns status of location entered in this fieldset
    Fat.Location.Fieldset.prototype.validateAjax = function (callback) {

        this.getJSON(
                this.script,
                {city: this.city.value, state: this.state.value, zip: this.zip.value},
        function (response, success) {
            if (typeof callback === 'function') {
                var exact = typeof response.suggestions === 'object'
                        && typeof response.suggestions[0] === 'object' && response.suggestions[0].exact === '1';
                callback(exact); // do callback function
            }
        }
        );
    }

    /*
     * Fat.Location.Manager JS class handles the small amount of inter-fieldset functionality
     *      When a fieldset gains focus, the prior-focused set is blurred
     *      Suggestions are displayed and hidden through the manager
     *      When a fieldset is valid, if in a group, other sets in the group are checked.
     *          If all valid the callback is executed.
     *      The form onSubmit should be written to utilize a validation queueing that will wait for
     *          all ajax validation to complete
     *      before executing the form validation function.
     *          <form ... onsubmit="return startValidation(this)">  // validation call
     *
     *          function startValidation( form ) {
     *              // function that will wait for all ajax calls to finish
     *              FatManager.waitForAllLocations(function( fieldsets ) {
     *                  if (validate(form, fieldsets)) {        // once all ajax finished, run own validation for this form
     *                      form.submit();                      // if all okay, submit the form
     *                  }
     *              });
     *              return false;                               // always return false to prevent form submission "onSubmit"
     *          }
     */

// this is generally auto-instantiated by autoLoad functions defined below
    Fat.Location.Manager = function (options) {
        this.waiting = false;
        this.focused = false;

        // process any options passed
        if (typeof options === 'object') {
            if (typeof options.suggestions === 'object') {
                this.suggestions = options.suggestions;
            }

            if (typeof options.usePageWrapperPositioning === 'boolean') {
                this.usePageWrapperPositioning = options.usePageWrapperPositioning;
            }

            // waitSign is used by waitForAjax
            if (typeof options.waitSign === 'object') {
                this.waitSign = options.waitSign;
                // if on/off functions not defined, create them
                if (typeof Fat.Location.Manager.prototype.waitSignOn !== 'function') {
                    this.waitSignOn = function ( ) {
                        this.waitSign.style.top = $(window).scrollTop() + 150 + 'px';
                        $(this.waitSign).show();
                    };
                }
                if (typeof Fat.Location.Manager.prototype.waitSignOff !== 'function') {
                    this.waitSignOff = function ( ) {
                        $(this.waitSign).hide();
                    };
                }
            }
        }
    };

// default prototype values
    Fat.Location.Manager.prototype.fieldsets = {};
    Fat.Location.Manager.prototype.validationGroups = [];
    Fat.Location.Manager.prototype.suggestions = null;
    Fat.Location.Manager.prototype.waitSign = null;
    Fat.Location.Manager.prototype.waitSignOn = null;
    Fat.Location.Manager.prototype.waitSignOff = null;
    Fat.Location.Manager.prototype.validationCallback = null;
    Fat.Location.Manager.prototype.usePageWrapperPositioning = true;

// add a fieldset to manager's list
    Fat.Location.Manager.prototype.add = function (fieldset) {
        this.fieldsets[fieldset.city.id] = fieldset;
    };

// record the fieldset that got focus
// blur any current focus fieldset
    Fat.Location.Manager.prototype.gotFocus = function (id) {
        if (this.focused !== false) {
            this.fieldsets[this.focused].focus(null);
        }
        this.focused = id;
    };

// fieldset lost focus
    Fat.Location.Manager.prototype.lostFocus = function (id) {
        if (this.focused === id) {
            this.focused = false;
        }
    };

// does fieldset have focus?
    Fat.Location.Manager.prototype.haveFocus = function (id) {
        return this.focused === id;
    };

// register a "validation group" for this fieldset
// validation groups can have any number of fieldsets
// when specified, a callback is execute when all fieldsets in a validation group are valid and not empty
    Fat.Location.Manager.prototype.registerValidationGroup = function (fieldset) {
        if (typeof this.validationGroups[fieldset.validationGroup] === 'undefined') {
            this.validationGroups[fieldset.validationGroup] = [];
        }
        this.validationGroups[fieldset.validationGroup].push(fieldset);
    };

// check specified validation group and execute callback if all locations valid and not empty
    Fat.Location.Manager.prototype.checkValidationGroup = function (id) {
        if (typeof id === 'undefined' || typeof this.validationGroups[id] === 'undefined') {
            return;
        }
        var i;
        for (i = 0; i < this.validationGroups[id].length; i++) {
            if (!this.validationGroups[id][i].isValid()) {      // if any fieldset validating, not valid or blank, return
                return;
            }
        }

        this.onGroupValid(this.validationGroups[id]);
    };

// this function should be redeclared as needed in page where it's used
    Fat.Location.Manager.prototype.onGroupValid = function (fieldsets) {
        return fieldsets;
    };


// wait for all fieldset ajax calls to finish and autoset
// then execute callback with any invalid location ids
// "callback" is called with "fieldsets" that tell validation status (see waitForAjax())
    Fat.Location.Manager.prototype.waitForAllLocations = function (callback) {
        if (typeof callback !== 'function') { // must be a function or no reason to wait
            return;
        }

        var that = this;
        window.setTimeout(function () {
            that.hideSuggestions();
        }, 0); // immediately fork to hide suggestion box

        var localCallback = callback;
        this.waitForAjax(localCallback);
    };


// check all fieldset ajax calls; wait if not finished
// calls "callback" with validation status array
//      allValid: T/F   Are ALL locations valid? (Empty is valid)
//      allEmpty: T/F   Are ALL locations empty?
//      anyEmpty: T/F   Is ANY location empty?
//                          If requiring ALL locations filled and valid: if (allValid && !anyEmpty) { ... }
//      fieldsets: []   For each fieldset
//          id: string      "id" in HTML element used as validation prompt
//                              (eg: "You must supply a valid [id] location.")
//          isValid: T/F    This fieldset is valid (Empty is valid)
//          isEmpty: T/F    This fieldset is empty
    Fat.Location.Manager.prototype.waitForAjax = function (callback) {

        var that = this;

        if (this.focused !== false) {
            this.fieldsets[this.focused].keypressed(true);
            this.fieldsets[this.focused].focus(null); // blur the current focus
            this.focused = false;
        }
        var ready = true;
        var id;
        for (id in this.fieldsets) {
            if (this.fieldsets.hasOwnProperty(id)) {
                if (this.fieldsets[id].ajax !== null) {
                    ready = false;
                    break;
                }
            }
        }
        if (!ready) {
            if (!this.waiting && typeof this.waitSignOn === 'function') {
                window.setTimeout(function () {
                    that.waitSignOn();
                }, 0); // immediately fork to show waitSign
                this.waiting = true;
            }
            var localCallback = callback;
            window.setTimeout(function () {
                that.waitForAjax(localCallback);
            }, 1000); // wait another sec,  try again
        } else {
            if (this.waiting && typeof this.waitSignOff === 'function') {
                this.waitSignOff();
                this.waiting = false;
            }

            var valid;
            var empty;
            var allValid = true;
            var allEmpty = true;
            var anyEmpty = false;
            var fieldsets = {};
            for (id in this.fieldsets) {
                if (this.fieldsets.hasOwnProperty(id)) {
                    if (this.fieldsets[id].valid.value === '1') {
                        valid = true;
                        if (this.fieldsets[id].cityEmpty()) {
                            empty = true;
                            anyEmpty = true;
                        } else {
                            empty = false;
                            allEmpty = false;
                        }
                    } else {
                        valid = false;
                        allValid = false;
                        empty = false;
                        allEmpty = false;
                    }
                    fieldsets[id] = {'id': id, 'valid': valid, 'empty': empty};
                }
            }

            // execute the callback with validation results
            callback({'allValid': allValid, 'allEmpty': allEmpty, 'anyEmpty': anyEmpty, 'fieldsets': fieldsets});
        }
    };

// build error messages
    Fat.Location.Manager.prototype.buildFieldsetErrors = function (fieldsets) {
        var errors = [];
        console.log(fieldsets);
        var id;
        for (id in fieldsets.fieldsets) {
            if (fieldsets.fieldsets.hasOwnProperty(id)) {
                var name = id.replace(/_/g, ' '); // replace underscore with space

                if (name === 'origination') {
                    name = 'Pickup';
                } else if (name === 'destination') {
                    name = 'Delivery';
                }

                if (!fieldsets.fieldsets[id].valid || fieldsets.fieldsets[id].empty || jQuery('#' + id).val() == 'City') {
                    errors.push('Enter a valid ' + name + ' location.');
                }
            }
        }
        return errors;
    };

// hide the suggestion box
    Fat.Location.Manager.prototype.hideSuggestions = function (id) {
        if (this.focused === id) {
            $(this.suggestions).hide();
        }
    };

// show suggestion div with suggestions or error/failure message
    Fat.Location.Manager.prototype.showSuggestions = function (fieldset, html) {
        if (typeof html !== 'undefined') {
            this.suggestions.innerHTML = html;
        } else {
            this.suggestions.innerHTML = '';
            if (!fieldset.response
                    || (
                            !fieldset.response.suggestions && !fieldset.response.error && !fieldset.response.failure
                            )
                    ) {
                $(this.suggestions).hide();
                return;
            }
            if (fieldset.response.error) {
                this.suggestions.innerHTML = "<p class='errorMessage'>" +
                        fieldset.response.error + "</p><span class='FatArrow'></span>";
            } else if (fieldset.response.failure) {
                this.suggestions.innerHTML = "<p class='failure'>" +
                        fieldset.response.failure + "</p><span class='FatArrow'></span>";
            } else {
                var div;
                var localFieldset = fieldset;
                var i;
                for (i in fieldset.response.suggestions) {
                    if (fieldset.response.suggestions.hasOwnProperty(i)) {
                        if (fieldset.response.suggestions[i]) {
                            div = document.createElement("div");
                            div.className = 'FatResults';
                            div.innerHTML = "<a href='javascript:void(0)' id='" + fieldset.identifier + "suggestN" + i + "'>" +
                                    fieldset.response.suggestions[i].suggestion + "</a>";
                            if (fieldset.response.suggestions[i].metro) {
                                div.innerHTML += " <span class='metro'>[" + fieldset.response.suggestions[i].metro +
                                        "]</span>";
                            }
                            this.suggestions.appendChild(div);
                            $(document).find('#' + fieldset.identifier + 'suggestN' + i).mousedown(this.getSuggestionClickFunction(fieldset, i));
                        }
                    }
                }

                var suggestMore = false;
                div = document.createElement("div");
                div.className = 'FatMore';
                if (fieldset.response.request.findMore) {
                    div.innerHTML = "Or try spelling the city differently.";
                } else if (fieldset.state.value === '') {
                    div.innerHTML = "Select the state for more suggestions.";
                } else {
                    div.innerHTML = "Continue typing or [<a id='suggestMore' unselectable='on'" +
                            " onmousedown='return false' href='javascript:void(0)'>Suggest More</a>]";
                    suggestMore = true;
                }
                this.suggestions.appendChild(div);
                if (suggestMore) {
                    $(document).find('#suggestMore').mouseup(function ( ) {
                        localFieldset.validate(false, true);
                    });
                }

                var span = document.createElement('span');
                span.className = fieldset.arrowClass;
                this.suggestions.appendChild(span);

            }
        }

        var city = fieldset.city;
        var offset = this.getOffset(city); // get offset - library dependent

        this.suggestions.style.left = parseInt(offset.left, 10)
                + (fieldset.toRight ? city.offsetWidth + parseInt(fieldset.toRightLeftOffset, 10) : 20) + 'px';
        this.suggestions.style.top = parseInt(offset.top, 10)
                + (fieldset.toRight ? +parseInt(fieldset.toRightTopOffset, 10) : 25) + 'px';

        //$(this.suggestions).fadeIn();
        this.suggestions.style.display = 'block';

    };

// return a js object with top and left properties.  this is library dependent
    Fat.Location.Manager.prototype.getOffset = function (div) {

        var offset = {"top": 0, "left": 0};

        var j_offset = $(div).offset();
        offset.top = j_offset.top;
        offset.left = j_offset.left;

        return offset;

    };

// Create JS closure and return a function to execute when suggestion link is clicked
    Fat.Location.Manager.prototype.getSuggestionClickFunction = function (fieldset, i) {
        var localFieldset = fieldset;
        return function ( ) {
            localFieldset.set(i);
        };
    };

    /**
     * Do JSON-based AJAX call
     */

// bind a window onLoad event for instantiating and configuring FatLocation objects on startup
    Fat.Location.Fieldset.prototype.autoLoad = function (callback) {
        var localCallback = callback;

        $('document').ready(function () {
            var manager = new Fat.Location.Manager({
                suggestions: $('.FatSuggestions').get(0),
                waitSign: $('.FatWait').get(0)
            });

            var newSet;
            $('.FatLocation').each(function () {
                var $this = $(this);
                newSet = new Fat.Location.Fieldset({
                    city: $this.find('.FatCity').get(0),
                    state: $this.find('.FatState').get(0),
                    zip: $this.find('.FatZip').get(0),
                    metro: $this.find('.FatMetro').get(0),
                    valid: $this.find('.FatValid').get(0),
                    clear: $this.find('.FatClear').get(0),
                    spinner: $this.find('.FatSpinner').get(0),
                    manager: manager,
                    allowCanada: $this.find('.FatAllowCanada').val() == 1
                });
                $this.data('fatLocationObject', newSet);
                Fat.Location.Fieldset.setList.push(newSet);
            });

            if (typeof localCallback === 'function') {
                localCallback(manager);
            }
        });
    };

    /**
     * Known issues:
     *   * If page is not found or returned string is not valid, onComplete is not called -- any failure breaks the code
     */
    Fat.Location.Fieldset.prototype.getJSON = function (url, request, onComplete) {
        this.showSpinner(true);
        var that = this;
        this.ajax = new $.getJSON(url, {json: JSON.stringify(request)}, function (response, status) {
            that.showSpinner(false);
            if (onComplete === null) {
                return;
            }
            onComplete(response, status === 'success');
        });
    };

    Fat.Location.Fieldset.prototype.abortJSON = function ( ) {
        if (this.ajax) {
            this.showSpinner(false);
            this.ajax.abort();
            delete this.ajax;
            this.ajax = null;
        }
    };

})(jQuery);
