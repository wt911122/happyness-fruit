var React = require("react");

var ShopActions = require("../flux/ShopActions.js");
var ShopStore = require("../flux/ShopStore.js");

var ShadowPanel = React.createClass({
	getInitialState: function(){
		return {
			zIndex: -1,
			visible: false
		}
	},
	render: function(){
		var style = {
			zIndex: this.state.zIndex,
			opacity: this.state.visible ? 1: 0
		}
		return <div style={style} onClick={this.onClick} className="shadowCover"></div>;
	},
	shouldComponentUpdate: function(nextProps, nextState){
		return nextState.visible !== this.state.visible;
	},
	handleShadowCalled: function(props){
		this.setState(props);
	},
	componentDidMount: function(){
		ShopStore.addShadowCalledListener(this.handleShadowCalled);
		ShopStore.addCloseShadowListener(this.closeShadow)
	},
	closeShadow: function(){
		this.setState({
			zIndex: -1,
			visible: false
		})
	},
	onClick: function(){
		this.setState({
			zIndex: -1,
			visible: false
		});
		ShopActions.shadowOnClosed();
	}
})
module.exports = ShadowPanel;