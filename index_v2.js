var React = require("react");
var ReactDOM = require('react-dom');

var MainHeaderCtrl = require("./app/components_v2/main_header_ctrl.js");
var MainContentCtrl = require("./app/components_v2/main_content_ctrl.js");
var MainFooterCtrl = require("./app/components_v2/main_footer_ctrl.js");
var MainModalCtrl = require("./app/components_v2/main_modal_ctrl.js");
var MainShadow = require("./app/components_v2/main_shadow.js")

var Dispatcher = require("./app/flux/Dispatcher.js");
var ShopStore = require("./app/flux/ShopStore.js");
var ShopConstants = require("./app/flux/ShopConstants.js");

Dispatcher.register(function(payload){
	switch(payload.actionType){
		case ShopConstants.ALTER_AD:
			ShopStore.AdAlterd(payload.state);
			break;
		case ShopConstants.REQUST_AD:
			ShopStore.requestAD(payload.req);
			break;
		case ShopConstants.REQUST_DATA: 
			ShopStore.requstData(payload.req);
			break;
		case ShopConstants.TOGGLE_SIDEBAR: 
			ShopStore.toggleSideBar();
			break;
		case ShopConstants.GO_CHECK_CART:
			ShopStore.checkCart(payload.item);
			break;
		case ShopConstants.CALL_FOR_MODAL:
			ShopStore.callModall(payload.cartItem);
			break;
		case ShopConstants.CALL_FOR_SHADOW: 
			ShopStore.callShadow(payload.props);
			break;
		case ShopConstants.ALTER_CART_ITEM:
			ShopStore.alterCartItem(payload.operations);
			break;
		case ShopConstants.CLOSE_SHADOW: 
			ShopStore.closeShadow();
			break;
		case ShopConstants.SHADOW_ON_CLOSE: 
			ShopStore.shadowOnClose();
			break;
	}
});

var MainPage = React.createClass({
	getInitialState: function(){
		return {

		}
	},
	render: function(){
		return (
			<div>
				<MainHeaderCtrl />
				<MainContentCtrl />
				<MainFooterCtrl />
				<MainModalCtrl />
				<MainShadow />
			</div>
		);
	},
	toggleSideBar: function(){
		console.log("toggleSlider");
	},
	refreshLayout: function(){
		console.log("refreshLayout");
	},
	callShadow: function(){
		console.log("callShadow");
	},
});
ReactDOM.render(<MainPage></MainPage>, document.getElementById("container"));
