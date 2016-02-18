var React = require("react");

var ModuleButton = React.createClass({
	propTypes: {
		outterStyle: React.PropTypes.string.isRequired,
		innerStyle: React.PropTypes.string.isRequired,
		innerContent: React.PropTypes.string,
	},
	render: function(){
		return (
			<button className={this.props.outterStyle} onClick={this.handleClick} onTouchEnd={this.handleTouch}>
				<div className={this.props.innerStyle}>{this.props.innerContent}</div>
			</button>);
	},
	handleTouch: function(event){
		if (this.props.onClick) {
			event.stopPropagation();
			this.props.onClick(event);
		};
	},
	handleClick: function(event){
		event.preventDefault();
		event.stopPropagation();
	}

});

module.exports = ModuleButton;