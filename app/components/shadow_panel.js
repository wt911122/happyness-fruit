var React = require("react");

var ShadowPanel = React.createClass({
	propTypes: {
		zIndex: React.PropTypes.number,
		visible: React.PropTypes.bool
	},
	getInitialState: function(){
		return {
			zIndex: this.props.zIndex,
			visible: this.props.visible
		}
	},
	componentWillReceiveProps: function(nextProps){
		if (this.state.visible !== nextProps.visible) {
			this.setState(nextProps);
		};
	},	
	render: function(){
		var style = {
			zIndex: this.state.zIndex,
			opacity: this.state.visible ? 1: 0
		}
		return <div style={style} className="shadowCover"></div>;
	},
	callShadow: function(props){
		this.setState(props);
	}
})
module.exports = ShadowPanel;