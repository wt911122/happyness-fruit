var React = require("react");
var ReactDOM = require("react-dom");

var ModuleButton = require("../module_button.js");

var SlideAd = React.createClass({
	propTypes: {
		content: React.PropTypes.string,
		onClose: React.PropTypes.func
	},
	
	render: function(){
		return (
			<div className="advertise">
				<div ref="ad_content" className="content">
					<div className="slider">{this.props.content}</div>
				</div>
				<ModuleButton
					neededStyle="close"
					neededContent=""
					onClick={this.close}
				></ModuleButton>
			</div>);
	},	
	close: function(){
		var node = ReactDOM.findDOMNode(this);
		node.style.display = "none";
		this.props.onClose();
	}
});

module.exports = SlideAd