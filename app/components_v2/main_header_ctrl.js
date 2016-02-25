var React = require("react");

var ShopActions = require("../flux/ShopActions.js");
var ShopStore = require("../flux/ShopStore.js");

var MainHeader = require("./main_header.js");

var MainHeaderCtrl = React.createClass({
	getInitialState: function(){
		return {
			advertise: ""
		}
	},

	handleADReady: function(data) {
		if (data !== "") {
			this.setState({
				advertise: data
			});
		};
	},

	componentDidMount: function() {
		ShopStore.addADReadyListener(this.handleADReady);
	},

	componentWillUnmount: function() {
		ShopStore.removeADReadyListener(this.handleADReady);
	},
	onADAltered: function(state){
		console.log("advertise altered");
		ShopActions.alterAD({
			state: state
		});
	},
	render: function(){
		return <MainHeader 
					advertise={this.state.advertise}
					onADAltered={this.onADAltered} />
	},
});


module.exports = MainHeaderCtrl;