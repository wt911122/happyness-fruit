var React = require("react");
var ReactDOM = require("react-dom");

var MainModal = require("./main_modal.js");

var ShopActions = require("../flux/ShopActions.js");
var ShopStore = require("../flux/ShopStore.js");

var MainModalCtrl = React.createClass({
	getInitialState: function(){
		return {
			item: {
				id: 0,
	      		title: "",
				subTitle: "",
				imgURL: "",
				discription: "",
				capacity: 0,
				price: 0,
			},
			amount: 0,
			visible: false,
		}
	},
	render: function(){
		return (<MainModal 
			item={this.state.item}
			amount={this.state.amount}
			visible={this.state.visible}
			onClose={this.onClose} 
			amountChanged={this.amountChanged}
			submitModal={this.submitModal}/>);
	},
	handleModalChanged: function(cartItem){
		console.log(cartItem);
		this.setState({
			item: cartItem.item,
			amount: cartItem.count,
			visible: true,
		});
		ShopActions.callForShadow({
			zIndex: 100,
			visible: true
		})
	},
	componentDidMount: function(){
		ShopStore.addModalCalledListener(this.handleModalChanged);
		ShopStore.addShadowClosingListener(this.closeSelf);
	},
	closeSelf: function(){
		console.log("modal closeSelf");
		this.setState({
			visible: false
		})
	},
	onClose: function(){
		this.setState({visible: false});
		ShopActions.closeShadow();
	},
	amountChanged: function(num){
		var tempAmount = this.state.amount + num;
		tempAmount = tempAmount < 0 ? 0 : tempAmount;
		this.setState({
			amount: tempAmount
		});
	},
	submitModal: function(){
		ShopActions.alterCartItem({
			operation: "replace",
			num: this.state.amount,
			item: this.state.item
		});
		this.onClose();
	}

});

module.exports = MainModalCtrl;