var EventEmitter = require("event-emitter");
var ajax = require("ajax");

var ShopStore = function() {
  this.emitter = new EventEmitter();
};


ShopStore.prototype.error = function(data){
  console.log(2, 'error', data);
}
// Basic event handling functions
// ------------- Advertisement block -----------------
var AD_READY_EVENT = "ADReadyEvent";
ShopStore.prototype.emitADReady = function(data) {
    this.emitter.emit(AD_READY_EVENT, data);
};

ShopStore.prototype.addADReadyListener = function(callback) {
    this.emitter.on(AD_READY_EVENT, callback);
};

ShopStore.prototype.removeADReadyListener = function(callback) {
    this.emitter.removeListener(AD_READY_EVENT, callback);
};

ShopStore.prototype.requestAD = function(req){
  ajax.get(req.url, req.args, this.emitADReady.bind(this));
     // .catch(this.error)
}
// ----------------------------------------------------------

// ------------- ADAlterd block -----------------
var AD_ALTER_EVENT = "ADAlterEvent";
ShopStore.prototype.emitADAlterd = function(state) {
    this.emitter.emit(AD_ALTER_EVENT, state);
};

ShopStore.prototype.addADAlterdListener = function(callback) {
    this.emitter.on(AD_ALTER_EVENT, callback);
};

ShopStore.prototype.removeADAlterdListener = function(callback) {
    this.emitter.removeListener(AD_ALTER_EVENT, callback);
};

ShopStore.prototype.AdAlterd = function(state){
    this.emitADAlterd(state);
}
// ----------------------------------------------------------

// ------------------------request data----------------------------
var DATA_READY_EVENT = "DataReadyEvent";
ShopStore.prototype.emitDataReady = function(data) {
    this.emitter.emit(DATA_READY_EVENT, data);
};

ShopStore.prototype.addDataReadyListener = function(callback) {
    this.emitter.on(DATA_READY_EVENT, callback);
};

ShopStore.prototype.removeDataReadyListener = function(callback) {
    this.emitter.removeListener(DATA_READY_EVENT, callback);
};
ShopStore.prototype.requstData = function(req){
     ajax.get(req.url, req.args, this.emitDataReady.bind(this));
}
// ----------------------------------------------------------------

// ------------- toggle sidebar -----------------
var TOGGLE_SIDEBAR_EVENT = "SideBarToggleEvent";
ShopStore.prototype.emitSideBarToggleAlterd = function() {
    this.emitter.emit(TOGGLE_SIDEBAR_EVENT);
};

ShopStore.prototype.addSideBarToggleListener = function(callback) {
    this.emitter.on(TOGGLE_SIDEBAR_EVENT, callback);
};

ShopStore.prototype.removeSideBarToggleListener = function(callback) {
    this.emitter.removeListener(TOGGLE_SIDEBAR_EVENT, callback);
};

ShopStore.prototype.toggleSideBar = function(){
    this.emitSideBarToggleAlterd();
}
// ----------------------------------------------------------

// ------------- go check cart -----------------
var CHECK_CART_EVENT = "CheckCartEvent";
ShopStore.prototype.emitCheckCart = function(item) {
    console.log("emitCheckCart");
    this.emitter.emit(CHECK_CART_EVENT, item);
};

ShopStore.prototype.addCheckCartListener = function(callback) {
    this.emitter.on(CHECK_CART_EVENT, callback);
};

ShopStore.prototype.removeCheckCartListener = function(callback) {
    this.emitter.removeListener(CHECK_CART_EVENT, callback);
};

ShopStore.prototype.checkCart = function(item){
    this.emitCheckCart(item);
}
// ----------------------------------------------------------

// ------------- call for modal -----------------
var MODAL_CALLED_EVENT = "ModalCalledEvent";
ShopStore.prototype.emitModalCalled = function(cartItem) {
   console.log("emitModalCalled");
    this.emitter.emit(MODAL_CALLED_EVENT, cartItem);
};

ShopStore.prototype.addModalCalledListener = function(callback) {
    this.emitter.on(MODAL_CALLED_EVENT, callback);
};

ShopStore.prototype.removeModalCalledListener = function(callback) {
    this.emitter.removeListener(MODAL_CALLED_EVENT, callback);
};

ShopStore.prototype.callModall = function(cartItem){
    this.emitModalCalled(cartItem);
}
// ----------------------------------------------------------
// ------------- call for modal -----------------
var CLOSE_SHADOW_EVENT = "CloseShadowEvent";
ShopStore.prototype.emitCloseShadow = function() {
   console.log("emitCloseShadow");
    this.emitter.emit(CLOSE_SHADOW_EVENT);
};

ShopStore.prototype.addCloseShadowListener = function(callback) {
    this.emitter.on(CLOSE_SHADOW_EVENT, callback);
};

ShopStore.prototype.removeCloseShadowListener = function(callback) {
    this.emitter.removeListener(CLOSE_SHADOW_EVENT, callback);
};

ShopStore.prototype.closeShadow = function(){
    this.emitCloseShadow();
}
// ----------------------------------------------------------

// ------------- call for shadow -----------------
var SHADOW_CALLED_EVENT = "ShadowCalledEvent";
ShopStore.prototype.emitShadowCalled = function(props) {
   console.log("emitModalCalled");
    this.emitter.emit(SHADOW_CALLED_EVENT, props);
};

ShopStore.prototype.addShadowCalledListener = function(callback) {
    this.emitter.on(SHADOW_CALLED_EVENT, callback);
};

ShopStore.prototype.removeShadowCalledListener = function(callback) {
    this.emitter.removeListener(SHADOW_CALLED_EVENT, callback);
};

ShopStore.prototype.callShadow = function(props){
    this.emitShadowCalled(props);
}
// ----------------------------------------------------------

// ------------- shadow on close-----------------
var SHADOW_CLOSING_EVENT = "ShadowClosingEvent";
ShopStore.prototype.emitShadowClosing = function() {
   console.log("emitShadowClosing");
    this.emitter.emit(SHADOW_CLOSING_EVENT);
};

ShopStore.prototype.addShadowClosingListener = function(callback) {
    this.emitter.on(SHADOW_CLOSING_EVENT, callback);
};

ShopStore.prototype.removeShadowClosingListener = function(callback) {
    this.emitter.removeListener(SHADOW_CLOSING_EVENT, callback);
};

ShopStore.prototype.shadowOnClose = function(){
    this.emitShadowClosing();
}
// ----------------------------------------------------------

// ------------- mitCartItem -----------------
var CART_ALTERED_EVENT = "CartAlteredEvent";
ShopStore.prototype.emitCartItemAltered= function(operation) {
   console.log("CartAlteredEvent");
    this.emitter.emit(CART_ALTERED_EVENT, operation);
};

ShopStore.prototype.addCartItemAlteredListener = function(callback) {
    this.emitter.on(CART_ALTERED_EVENT, callback);
};

ShopStore.prototype.removeCartItemAlteredListener = function(callback) {
    this.emitter.removeListener(CART_ALTERED_EVENT, callback);
};

ShopStore.prototype.alterCartItem = function(operation){
    this.emitCartItemAltered(operation);
}
// ----------------------------------------------------------

/*SurveyStore.prototype.saveSurvey = function(survey) {
  console.debug("TODO: fire XHR to persist survey, then invoke this.emitChange() after the XHR has completed.");

  this.emitChange();
}

SurveyStore.prototype.deleteSurvey = function(id) {
  console.debug("TODO: delete survey", id);

  this.emitChange();
}

SurveyStore.prototype.recordSurvey = function(results) {
  console.debug("TODO: record the survey results", results);

  this.emitChange();
}

SurveyStore.prototype.listSurveys = function(callback) {
  console.debug("TODO: fetch surveys from server via XHR");

  callback([]);
}

SurveyStore.prototype.getSurvey = function(id) {
  console.debug("TODO: fetch survey by id from server via XHR");

  callback({});
}*/
// The SurveyStore is a singleton, so export only the one instance.
module.exports = new ShopStore();
