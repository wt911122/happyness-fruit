var React = require("react");

var ModuleButton = React.createClass({
	propTypes: {
		neededStyle: React.PropTypes.string,
		neededContent: React.PropTypes.string,
		onClick: React.PropTypes.func,
	},
	render: function(){
		return (<button className={this.props.neededStyle} onClick={this.handleClick} onTouchEnd={this.handleTouch}>{this.props.neededContent}</button>);
	},
	handleTouch: function(event){
		if (this.props.onClick) {
			event.stopPropagation();
			console.log(event.touches);
			console.log(event.targetTouches);
			console.log(event.changedTouches);
			this.props.onClick(event);
		};
	},
	handleClick: function(event){
		event.stopPropagation();
	}

});

module.exports = ModuleButton;