import $ from "jquery";
//import "./ripple";
// menu [ horizontal configure ]

var ost = 0;
if (typeof window !== "undefined") {



$(window).scroll(function () {
  var vw = $(window)[0].innerWidth;
  if (vw >= 768) {
    var cOst = $(this).scrollTop();
    if (cOst == 400) {
      $(".theme-horizontal").addClass("top-nav-collapse");
    } else if (cOst > ost && 400 < ost) {
      $(".theme-horizontal")
        .addClass("top-nav-collapse")
        .removeClass("default");
    } else {
      $(".theme-horizontal")
        .addClass("default")
        .removeClass("top-nav-collapse");
    }
    ost = cOst;
  }
});







// menu [ compact ]
function togglemenu() {
  var vw = $(window)[0].innerWidth;
  if ($(".pcoded-navbar").hasClass("theme-horizontal") == false) {
    if (vw <= 1200 && vw >= 992) {
      $(".pcoded-navbar:not(.theme-horizontal)").addClass("navbar-collapsed");
    }
    if (vw < 992) {
      $(".pcoded-navbar:not(.theme-horizontal)").removeClass(
        "navbar-collapsed"
      );
    }
  }
}
// ===============

// toggle full screen
function toggleFullScreen() {
  var a = $(window).height() - 10;

  if (
    !document.fullscreenElement && // alternative standard method
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement
  ) {
    // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(
        Element.ALLOW_KEYBOARD_INPUT
      );
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
  $(".full-screen > i").toggleClass("icon-maximize");
  $(".full-screen > i").toggleClass("icon-minimize");
}
// =============   layout builder   =============
$.fn.pcodedmenu = function (settings) {
  var oid = this.attr("id");
  var defaults = {
    themelayout: "vertical",
    MenuTrigger: "click",
    SubMenuTrigger: "click",
  };
  var settings = $.extend({}, defaults, settings);
  var PcodedMenu = {
    PcodedMenuInit: function () {
      PcodedMenu.HandleMenuTrigger();
      PcodedMenu.HandleSubMenuTrigger();
      PcodedMenu.HandleOffset();
    },
    HandleSubMenuTrigger: function () {
      var $window = $(window);
      var newSize = $window.width();

      if (
        $(".pcoded-navbar").hasClass("theme-horizontal") == true ||
        $(".pcoded-navbar").hasClass("theme-horizontal-dis") == true
      ) {
        if (
          (newSize >= 992 && $("body").hasClass("layout-6")) ||
          (newSize >= 992 && $("body").hasClass("layout-7"))
        ) {
          var $dropdown = $(
            "body[class*='layout-6'] .theme-horizontal .pcoded-inner-navbar .pcoded-submenu > li.pcoded-hasmenu, body[class*='layout-7'] .theme-horizontal .pcoded-inner-navbar .pcoded-submenu > li.pcoded-hasmenu"
          );
          $dropdown
            .off("click")
            .off("mouseenter mouseleave")
            .hover(
              function () {
                $(this).addClass("pcoded-trigger").addClass("active");
              },
              function () {
                $(this).removeClass("pcoded-trigger").removeClass("active");
              }
            );
        } else {
          if (
            $("body").hasClass("layout-6") ||
            $("body").hasClass("layout-7")
          ) {
            if ($(".pcoded-navbar").hasClass("theme-horizontal-dis")) {
              var $dropdown = $(
                ".pcoded-navbar.theme-horizontal-dis .pcoded-inner-navbar .pcoded-submenu > li.pcoded-hasmenu"
              );
              $dropdown
                .off("click")
                .off("mouseenter mouseleave")
                .hover(
                  function () {
                    $(this).addClass("pcoded-trigger").addClass("active");
                  },
                  function () {
                    $(this).removeClass("pcoded-trigger").removeClass("active");
                  }
                );
            }
            if (!$(".pcoded-navbar").hasClass("theme-horizontal-dis")) {
              var $dropdown = $(
                ".pcoded-navbar:not(.theme-horizontal-dis) .pcoded-inner-navbar .pcoded-submenu > li > .pcoded-submenu > li"
              );
              $dropdown
                .off("mouseenter mouseleave")
                .off("click")
                .on("click", function () {
                  var str = $(this).closest(".pcoded-submenu").length;
                  if (str === 0) {
                    if ($(this).hasClass("pcoded-trigger")) {
                      $(this).removeClass("pcoded-trigger");
                      $(this).children(".pcoded-submenu").slideUp();
                    } else {
                      $(
                        ".pcoded-submenu > li > .pcoded-submenu > li.pcoded-trigger"
                      )
                        .children(".pcoded-submenu")
                        .slideUp();
                      $(this)
                        .closest(".pcoded-inner-navbar")
                        .find("li.pcoded-trigger")
                        .removeClass("pcoded-trigger");
                      $(this).addClass("pcoded-trigger");
                      $(this).children(".pcoded-submenu").slideDown();
                    }
                  } else {
                    if ($(this).hasClass("pcoded-trigger")) {
                      $(this).removeClass("pcoded-trigger");
                      $(this).children(".pcoded-submenu").slideUp();
                    } else {
                      $(
                        ".pcoded-submenu > li > .pcoded-submenu > li.pcoded-trigger"
                      )
                        .children(".pcoded-submenu")
                        .slideUp();
                      $(this)
                        .closest(".pcoded-submenu")
                        .find("li.pcoded-trigger")
                        .removeClass("pcoded-trigger");
                      $(this).addClass("pcoded-trigger");
                      $(this).children(".pcoded-submenu").slideDown();
                    }
                  }
                });
              $(
                ".pcoded-inner-navbar .pcoded-submenu > li > .pcoded-submenu > li"
              ).on("click", function (e) {
                e.stopPropagation();
                var str = $(this).closest(".pcoded-submenu").length;
                if (str === 0) {
                  if ($(this).hasClass("pcoded-trigger")) {
                    $(this).removeClass("pcoded-trigger");
                    $(this).children(".pcoded-submenu").slideUp();
                  } else {
                    $(".pcoded-hasmenu li.pcoded-trigger")
                      .children(".pcoded-submenu")
                      .slideUp();
                    $(this)
                      .closest(".pcoded-inner-navbar")
                      .find("li.pcoded-trigger")
                      .removeClass("pcoded-trigger");
                    $(this).addClass("pcoded-trigger");
                    $(this).children(".pcoded-submenu").slideDown();
                  }
                } else {
                  if ($(this).hasClass("pcoded-trigger")) {
                    $(this).removeClass("pcoded-trigger");
                    $(this).children(".pcoded-submenu").slideUp();
                  } else {
                    $(".pcoded-hasmenu li.pcoded-trigger")
                      .children(".pcoded-submenu")
                      .slideUp();
                    $(this)
                      .closest(".pcoded-submenu")
                      .find("li.pcoded-trigger")
                      .removeClass("pcoded-trigger");
                    $(this).addClass("pcoded-trigger");
                    $(this).children(".pcoded-submenu").slideDown();
                  }
                }
              });
            }
          } else {
            if (newSize >= 992) {
              var $dropdown = $(
                ".pcoded-navbar.theme-horizontal .pcoded-inner-navbar .pcoded-submenu > li.pcoded-hasmenu"
              );
              $dropdown
                .off("click")
                .off("mouseenter mouseleave")
                .hover(
                  function () {
                    $(this).addClass("pcoded-trigger").addClass("active");
                  },
                  function () {
                    $(this).removeClass("pcoded-trigger").removeClass("active");
                  }
                );
            } else {
              var $dropdown = $(
                ".pcoded-navbar.theme-horizontal-dis .pcoded-inner-navbar .pcoded-submenu > li > .pcoded-submenu > li"
              );
              $dropdown
                .off("mouseenter mouseleave")
                .off("click")
                .on("click", function () {
                  var str = $(this).closest(".pcoded-submenu").length;
                  if (str === 0) {
                    if ($(this).hasClass("pcoded-trigger")) {
                      $(this).removeClass("pcoded-trigger");
                      $(this).children(".pcoded-submenu").slideUp();
                    } else {
                      $(
                        ".pcoded-submenu > li > .pcoded-submenu > li.pcoded-trigger"
                      )
                        .children(".pcoded-submenu")
                        .slideUp();
                      $(this)
                        .closest(".pcoded-inner-navbar")
                        .find("li.pcoded-trigger")
                        .removeClass("pcoded-trigger");
                      $(this).addClass("pcoded-trigger");
                      $(this).children(".pcoded-submenu").slideDown();
                    }
                  } else {
                    if ($(this).hasClass("pcoded-trigger")) {
                      $(this).removeClass("pcoded-trigger");
                      $(this).children(".pcoded-submenu").slideUp();
                    } else {
                      $(
                        ".pcoded-submenu > li > .pcoded-submenu > li.pcoded-trigger"
                      )
                        .children(".pcoded-submenu")
                        .slideUp();
                      $(this)
                        .closest(".pcoded-submenu")
                        .find("li.pcoded-trigger")
                        .removeClass("pcoded-trigger");
                      $(this).addClass("pcoded-trigger");
                      $(this).children(".pcoded-submenu").slideDown();
                    }
                  }
                });
            }
          }
        }
      }
      switch (settings.SubMenuTrigger) {
        case "click":
          $(".pcoded-navbar .pcoded-hasmenu").removeClass("is-hover");
          $(
            ".pcoded-inner-navbar .pcoded-submenu > li > .pcoded-submenu > li"
          ).on("click", function (e) {
            e.stopPropagation();
            var str = $(this).closest(".pcoded-submenu").length;
            if (str === 0) {
              if ($(this).hasClass("pcoded-trigger")) {
                $(this).removeClass("pcoded-trigger");
                $(this).children(".pcoded-submenu").slideUp();
              } else {
                $(".pcoded-submenu > li > .pcoded-submenu > li.pcoded-trigger")
                  .children(".pcoded-submenu")
                  .slideUp();
                $(this)
                  .closest(".pcoded-inner-navbar")
                  .find("li.pcoded-trigger")
                  .removeClass("pcoded-trigger");
                $(this).addClass("pcoded-trigger");
                $(this).children(".pcoded-submenu").slideDown();
              }
            } else {
              if ($(this).hasClass("pcoded-trigger")) {
                $(this).removeClass("pcoded-trigger");
                $(this).children(".pcoded-submenu").slideUp();
              } else {
                $(".pcoded-submenu > li > .pcoded-submenu > li.pcoded-trigger")
                  .children(".pcoded-submenu")
                  .slideUp();
                $(this)
                  .closest(".pcoded-submenu")
                  .find("li.pcoded-trigger")
                  .removeClass("pcoded-trigger");
                $(this).addClass("pcoded-trigger");
                $(this).children(".pcoded-submenu").slideDown();
              }
            }
          });
          $(".pcoded-submenu > li").on("click", function (e) {
            e.stopPropagation();
            var str = $(this).closest(".pcoded-submenu").length;
            if (str === 0) {
              if ($(this).hasClass("pcoded-trigger")) {
                $(this).removeClass("pcoded-trigger");
                $(this).children(".pcoded-submenu").slideUp();
              } else {
                $(".pcoded-hasmenu li.pcoded-trigger")
                  .children(".pcoded-submenu")
                  .slideUp();
                $(this)
                  .closest(".pcoded-inner-navbar")
                  .find("li.pcoded-trigger")
                  .removeClass("pcoded-trigger");
                $(this).addClass("pcoded-trigger");
                $(this).children(".pcoded-submenu").slideDown();
              }
            } else {
              if ($(this).hasClass("pcoded-trigger")) {
                $(this).removeClass("pcoded-trigger");
                $(this).children(".pcoded-submenu").slideUp();
              } else {
                $(".pcoded-hasmenu li.pcoded-trigger")
                  .children(".pcoded-submenu")
                  .slideUp();
                $(this)
                  .closest(".pcoded-submenu")
                  .find("li.pcoded-trigger")
                  .removeClass("pcoded-trigger");
                $(this).addClass("pcoded-trigger");
                $(this).children(".pcoded-submenu").slideDown();
              }
            }
          });
          break;
      }
    },
    HandleMenuTrigger: function () {
      var $window = $(window);
      var newSize = $window.width();
      if (newSize >= 992) {
        if ($(".pcoded-navbar").hasClass("theme-horizontal") == true) {
          if (
            (newSize >= 768 && $("body").hasClass("layout-6")) ||
            (newSize >= 768 && $("body").hasClass("layout-7"))
          ) {
            var $dropdown = $(
              "body[class*='layout-6'] .theme-horizontal .pcoded-inner-navbar > li,body[class*='layout-7'] .theme-horizontal .pcoded-inner-navbar > li "
            );
            $dropdown
              .off("click")
              .off("mouseenter mouseleave")
              .hover(
                function () {
                  $(this).addClass("pcoded-trigger").addClass("active");
                  if ($(".pcoded-submenu", this).length) {
                    var elm = $(".pcoded-submenu:first", this);
                    var off = elm.offset();
                    var l = off.left;
                    var w = elm.width();
                    var docH = $(window).height();
                    var docW = $(window).width();

                    var isEntirelyVisible = l + w <= docW;
                    if (!isEntirelyVisible) {
                      var temp = $(".sidenav-inner").attr("style");
                      $(".sidenav-inner").css({
                        "margin-left":
                          parseInt(temp.slice(12, temp.length - 3)) - 80,
                      });
                      $(".sidenav-horizontal-prev").removeClass("disabled");
                    } else {
                      $(this).removeClass("edge");
                    }
                  }
                },
                function () {
                  $(this).removeClass("pcoded-trigger").removeClass("active");
                }
              );
          } else {
            if (
              $("body").hasClass("layout-6") ||
              $("body").hasClass("layout-7")
            ) {
              if ($(".pcoded-navbar").hasClass("theme-horizontal-dis")) {
                var $dropdown = $(
                  ".pcoded-navbar.theme-horizontal-dis .pcoded-inner-navbar > li"
                );
                $dropdown
                  .off("click")
                  .off("mouseenter mouseleave")
                  .hover(
                    function () {
                      $(this).addClass("pcoded-trigger").addClass("active");
                      if ($(".pcoded-submenu", this).length) {
                        var elm = $(".pcoded-submenu:first", this);
                        var off = elm.offset();
                        var l = off.left;
                        var w = elm.width();
                        var docH = $(window).height();
                        var docW = $(window).width();

                        var isEntirelyVisible = l + w <= docW;
                        if (!isEntirelyVisible) {
                          var temp = $(".sidenav-inner").attr("style");
                          $(".sidenav-inner").css({
                            "margin-left":
                              parseInt(temp.slice(12, temp.length - 3)) - 80,
                          });
                          $(".sidenav-horizontal-prev").removeClass("disabled");
                        } else {
                          $(this).removeClass("edge");
                        }
                      }
                    },
                    function () {
                      $(this)
                        .removeClass("pcoded-trigger")
                        .removeClass("active");
                    }
                  );
              }
              if (!$(".pcoded-navbar").hasClass("theme-horizontal-dis")) {
                var $dropdown = $(
                  ".pcoded-navbar:not(.theme-horizontal-dis) .pcoded-inner-navbar > li"
                );
                $dropdown
                  .off("mouseenter mouseleave")
                  .off("click")
                  .on("click", function () {
                    if ($(this).hasClass("pcoded-trigger")) {
                      $(this).removeClass("pcoded-trigger");
                      $(this).children(".pcoded-submenu").slideUp();
                    } else {
                      $("li.pcoded-trigger")
                        .children(".pcoded-submenu")
                        .slideUp();
                      $(this)
                        .closest(".pcoded-inner-navbar")
                        .find("li.pcoded-trigger")
                        .removeClass("pcoded-trigger");
                      $(this).addClass("pcoded-trigger");
                      $(this).children(".pcoded-submenu").slideDown();
                    }
                  });
              }
            } else {
              var $dropdown = $(".theme-horizontal .pcoded-inner-navbar > li");
              $dropdown
                .off("click")
                .off("mouseenter mouseleave")
                .hover(
                  function () {
                    $(this).addClass("pcoded-trigger").addClass("active");
                    if ($(".pcoded-submenu", this).length) {
                      var elm = $(".pcoded-submenu:first", this);
                      var off = elm.offset();
                      var l = off.left;
                      var w = elm.width();
                      var docH = $(window).height();
                      var docW = $(window).width();

                      var isEntirelyVisible = l + w <= docW;
                      if (!isEntirelyVisible) {
                        var temp = $(".sidenav-inner").attr("style");
                        $(".sidenav-inner").css({
                          "margin-left":
                            parseInt(temp.slice(11, temp.length - 3)) - 80,
                        });
                        $(".sidenav-horizontal-prev").removeClass("disabled");
                      } else {
                        $(this).removeClass("edge");
                      }
                    }
                  },
                  function () {
                    $(this).removeClass("pcoded-trigger").removeClass("active");
                  }
                );
            }
          }
        }
      } else {
        var $dropdown = $(
          ".pcoded-navbar.theme-horizontal-dis .pcoded-inner-navbar > li"
        );
        $dropdown
          .off("mouseenter mouseleave")
          .off("click")
          .on("click", function () {
            if ($(this).hasClass("pcoded-trigger")) {
              $(this).removeClass("pcoded-trigger");
              $(this).children(".pcoded-submenu").slideUp();
            } else {
              $("li.pcoded-trigger").children(".pcoded-submenu").slideUp();
              $(this)
                .closest(".pcoded-inner-navbar")
                .find("li.pcoded-trigger")
                .removeClass("pcoded-trigger");
              $(this).addClass("pcoded-trigger");
              $(this).children(".pcoded-submenu").slideDown();
            }
          });
      }
      switch (settings.MenuTrigger) {
        case "click":
          $(".pcoded-navbar").removeClass("is-hover");
          $(".pcoded-inner-navbar > li:not(.pcoded-menu-caption) ").on(
            "click",
            function () {
              if ($(this).hasClass("pcoded-trigger")) {
                $(this).removeClass("pcoded-trigger");
                $(this).children(".pcoded-submenu").slideUp();
              } else {
                $("li.pcoded-trigger").children(".pcoded-submenu").slideUp();
                $(this)
                  .closest(".pcoded-inner-navbar")
                  .find("li.pcoded-trigger")
                  .removeClass("pcoded-trigger");
                $(this).addClass("pcoded-trigger");
                $(this).children(".pcoded-submenu").slideDown();
              }
            }
          );
          break;
      }
    },
    HandleOffset: function () {
      switch (settings.themelayout) {
        case "horizontal":
          var trigger = settings.SubMenuTrigger;
          if (trigger === "hover") {
            $("li.pcoded-hasmenu").on("mouseenter mouseleave", function (e) {
              if ($(".pcoded-submenu", this).length) {
                var elm = $(".pcoded-submenu:first", this);
                var off = elm.offset();
                var l = off.left;
                var w = elm.width();
                var docH = $(window).height();
                var docW = $(window).width();

                var isEntirelyVisible = l + w <= docW;
                if (!isEntirelyVisible) {
                  $(this).addClass("edge");
                } else {
                  $(this).removeClass("edge");
                }
              }
            });
          } else {
            $("li.pcoded-hasmenu").on("click", function (e) {
              e.preventDefault();
              if ($(".pcoded-submenu", this).length) {
                var elm = $(".pcoded-submenu:first", this);
                var off = elm.offset();
                var l = off.left;
                var w = elm.width();
                var docH = $(window).height();
                var docW = $(window).width();

                var isEntirelyVisible = l + w <= docW;
                if (!isEntirelyVisible) {
                  $(this).toggleClass("edge");
                }
              }
            });
          }
          break;
        default:
      }
    },
  };
  PcodedMenu.PcodedMenuInit();
};
$("#pcoded").pcodedmenu({
  MenuTrigger: "click",
  SubMenuTrigger: "click",
});

// menu [ Mobile ]
$("#mobile-collapse,#mobile-collapse1").click(function (e) {
  var vw = $(window)[0].innerWidth;
  if (vw < 992) {
    $(".pcoded-navbar").toggleClass("mob-open");
    e.stopPropagation();
  }
});
$(window).ready(function () {
  var vw = $(window)[0].innerWidth;
  $(".pcoded-navbar").on("click tap", function (e) {
    e.stopPropagation();
  });
  $(".pcoded-main-container,.pcoded-header").on("click", function () {
    if (vw < 992) {
      if ($(".pcoded-navbar").hasClass("mob-open") == true) {
        $(".pcoded-navbar").removeClass("mob-open");
        $("#mobile-collapse,#mobile-collapse1").removeClass("on");
      }
    }
  });
});
$(".pcoded-navbar .close").on("click", function () {
  var port = $(this);
  port.parents(".card").fadeOut("slow").remove();
});

// active menu item list start
$(".pcoded-navbar .pcoded-inner-navbar a").each(function () {
  var pageUrl = window.location.href.split(/[?#]/)[0];
  if (!$("body").hasClass("layout-14")) {
    if (this.href == pageUrl && $(this).attr("href") != "") {
      $(this).parent("li").addClass("active");
      if (!$(".pcoded-navbar").hasClass("theme-horizontal")) {
        $(this)
          .parent("li")
          .parent()
          .parent(".pcoded-hasmenu")
          .addClass("active")
          .addClass("pcoded-trigger");
        $(this)
          .parent("li")
          .parent()
          .parent(".pcoded-hasmenu")
          .parent()
          .parent(".pcoded-hasmenu")
          .addClass("active")
          .addClass("pcoded-trigger");
      }
      if ($("body").hasClass("layout-7") || $("body").hasClass("layout-6")) {
        $(this)
          .parent("li")
          .parent()
          .parent(".pcoded-hasmenu")
          .addClass("active")
          .addClass("pcoded-trigger");
        $(this)
          .parent("li")
          .parent()
          .parent(".pcoded-hasmenu")
          .parent()
          .parent(".pcoded-hasmenu")
          .addClass("active")
          .addClass("pcoded-trigger");
        $(".theme-horizontal .pcoded-inner-navbar")
          .find("li.pcoded-trigger")
          .removeClass("pcoded-trigger");
      }
      $(this).parent("li").parent().parent(".sidelink").addClass("active");
      $(this)
        .parent("li")
        .parent()
        .parent()
        .parent()
        .parent(".sidelink")
        .addClass("active");
      $(this)
        .parent("li")
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent(".sidelink")
        .addClass("active");
      if ($("body").hasClass("layout-1") || $("body").hasClass("layout-9")) {
        var temp = $(".sidelink.active").attr("class");
        temp = temp.replace("sidelink", "");
        temp = temp.replace("active", "");
        $(".sidemenu  .nav-link[data-cont=" + temp.trim() + "]")
          .parent()
          .addClass("active");
      }
    }
  }
});
// active menu item list end
// only heaeder fixed js start
$(window).scroll(function () {
  if (!$(".pcoded-header").hasClass("headerpos-fixed")) {
    if ($(this).scrollTop() > 60) {
      $(".pcoded-navbar.menupos-fixed").css("position", "fixed");
      $(".pcoded-navbar.menupos-fixed").css("transition", "none");
      $(".pcoded-navbar.menupos-fixed").css("margin-top", "0px");
    } else {
      $(".pcoded-navbar.menupos-fixed").removeAttr("style");
      $(".pcoded-navbar.menupos-fixed").css("position", "absolute");
      $(".pcoded-navbar.menupos-fixed").css("margin-top", "60px");
    }
  }
  if ($("body").hasClass("box-layout")) {
    if ($(this).scrollTop() > 60) {
      $(".pcoded-navbar").css("position", "fixed");
      $(".pcoded-navbar").css("transition", "none");
      $(".pcoded-navbar").css("margin-top", "0px");
      $(".pcoded-navbar").css("border-radius", "0px");
    } else {
      $(".pcoded-navbar").removeAttr("style");
      $(".pcoded-navbar").css("position", "absolute");
      $(".pcoded-navbar").css("margin-top", "60px");
    }
  }
});
// only heaeder fixed js end

// wave effect start

// $.ripple(
//   ".btn, .pcoded-navbar a,.pcoded-header .navbar-nav > li > .dropdown > a,.page-link, .nav .nav-link",
//   {
//     debug: false, // Turn Ripple.js logging on/off
//     on: "mousedown", // The event to trigger a ripple effect
//     opacity: 0.4, // The opacity of the ripple
//     color: "auto", // Set the background color. If set to "auto", it will use the text color
//     multi: false, // Allow multiple ripples per element
//     duration: 0.7, // The duration of the ripple
//     // Filter function for modifying the speed of the ripple
//     rate: function (pxPerSecond) {
//       return pxPerSecond;
//     },
//     easing: "linear", // The CSS3 easing function of the ripple
//   }
// );
// wave effect end
// more-details start
$("#more-details").on("click", function () {
  $("#nav-user-link").slideToggle();
});
// more-details end
//$("body").append('<div class="fixed-button active"><a href="https://1.envato.market/qG0m5" target="_blank" class="btn btn-md btn-primary"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Upgrade To Pro</a> </div>');
// var $window=$(window),nav=$(".fixed-button");
// $window.scroll(function(){$window.scrollTop()>=200?nav.addClass("active"):nav.removeClass("active")});





}