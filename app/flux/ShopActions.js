var Dispatcher = require("./Dispatcher");
var ShopConstants = require("./ShopConstants.js");

var ShopActions = {
  alterAD: function(state){
    Dispatcher.dispatch({
      actionType: ShopConstants.ALTER_AD,
      state: state
    })
  },

  requestAD: function(req) {
    Dispatcher.dispatch({
      actionType: ShopConstants.REQUST_AD,
      req: req
    });
  }
}

module.exports = ShopActions;
