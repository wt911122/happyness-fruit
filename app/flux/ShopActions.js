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
  },

  requestIcon: function(req){
     Dispatcher.dispatch({
      actionType: ShopConstants.REQUST_ICON,
      req: req
    });
   },

  requestData: function(req){
    Dispatcher.dispatch({
      actionType: ShopConstants.REQUST_DATA,
      req: req
    });
  },

  toggleSideBar: function(){
    Dispatcher.dispatch({
      actionType: ShopConstants.TOGGLE_SIDEBAR,
    })
  },

  goCheckCart: function(item){
    console.log("dispatch goCheckCart");
    Dispatcher.dispatch({
      actionType: ShopConstants.GO_CHECK_CART,
      item: item
    })
  },

  callForModal: function(cartItem){
    console.log("dispatch callForModal");
    Dispatcher.dispatch({
      actionType: ShopConstants.CALL_FOR_MODAL,
      cartItem: cartItem
    })
  },

  callForShadow: function(props){
    console.log("dispatch callForShadow");
    Dispatcher.dispatch({
      actionType: ShopConstants.CALL_FOR_SHADOW,
      props: props
    })
  },

  shadowOnClosed: function(){
    console.log("dispatch callForShadow");
    Dispatcher.dispatch({
      actionType: ShopConstants.SHADOW_ON_CLOSE
    })
  },

  closeShadow: function(){
    console.log("dispatch closeShadow");
    Dispatcher.dispatch({
      actionType: ShopConstants.CLOSE_SHADOW,
    })
  },

  alterCartItem: function(operations){
    console.log("dispatch alterCartItem");
    Dispatcher.dispatch({
      actionType: ShopConstants.ALTER_CART_ITEM,
      operations: operations
    })
  }, 

  filterItem: function(filter){
    console.log("dispatch filterItem");
    Dispatcher.dispatch({
      actionType: ShopConstants.FILTER_ITEM,
      filter: filter
    })
  }
}

module.exports = ShopActions;
