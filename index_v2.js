var React = require("react");
var ReactDOM = require('react-dom');

var MainHeaderCtrl = require("./app/components_v2/main_header_ctrl.js");

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

	}
})

var MainPage = React.createClass({
	getInitialState: function(){
		return {

		}
	},
	render: function(){
		return (
			<div>
				<MainHeaderCtrl />
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
