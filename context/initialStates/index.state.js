const initialstate = {};

initialstate.authInitial = require('./auth.state.js').default;
initialstate.assignInitial = require('./assign.state.js').default;
initialstate.carrierInitial = require('./carrier.state.js').default;
//initialstate.companyInitial = require('./company.state.js').default;
initialstate.driverInitial = require('./driver.state.js').default;
initialstate.vehicleInitial = require('./vehicle.state.js').default;
initialstate.shipmentInitial = require('./shipment.state.js').default;
initialstate.orderInitial = require('./order.state.js').default;
initialstate.paymentInitial = require('./payment.state.js').default;
initialstate.subscribeInitial = require('./subscribe.state.js').default;
initialstate.tripInitial = require('./trip.state.js').default;
initialstate.profileInitial = require('./profile.state.js').default;

initialstate.userInitial = require('./user.state.js').default;

export default initialstate;
