var React = require("react");

var ModuleButton = React.createClass({
	propTypes: {
		neededStyle: React.PropTypes.string,
		neededContent: React.PropTypes.string,
		onClick: React.PropTypes.func,
	},
	render: function(){
		return (<button className={this.props.neededStyle} onTouchEnd={this.handleClick}>{this.props.neededContent}</button>);
	},
	handleClick: function(event){
		if (this.props.onClick) {
			event.stopPropagation();
			console.log(event.touches);
			console.log(event.targetTouches);
			console.log(event.changedTouches);
			this.props.onClick(event);
		};
	}

});

module.exports = ModuleButton;