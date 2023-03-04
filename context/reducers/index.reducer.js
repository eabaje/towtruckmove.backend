const reducer = {};

reducer.authReducer = require("./auth.reducer.js").default;
reducer.assignReducer = require("./assign.reducer.js").default;
reducer.carrierReducer = require("./carrier.reducer.js").default;
//reducer.company = require('./company.reducer.js').default;
reducer.driverReducer = require("./driver.reducer.js").default;
reducer.vehicleReducer = require("./vehicle.reducer.js").default;
reducer.shipmentReducer = require("./shipment.reducer.js").default;
reducer.orderReducer = require("./order.reducer.js").default;
reducer.paymentReducer = require("./payment.reducer.js").default;
reducer.subscribeReducer = require("./subscribe.reducer.js").default;
reducer.tripReducer = require("./trip.reducer.js").default;
reducer.profileReducer = require("./profile.reducer.js").default;

reducer.userReducer = require("./user.reducer.js").default;

export default reducer;
