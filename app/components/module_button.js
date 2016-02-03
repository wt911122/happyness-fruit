var React = require("react");

var ModuleButton = React.createClass({
	propTypes: {
		neededStyle: React.PropTypes.string,
		neededContent: React.PropTypes.string,
		onClick: React.PropTypes.func,
	},
	render: function(){
		return (<button className={this.props.neededStyle} onClick={this.handleClick}>{this.props.neededContent}</button>);
	},
	handleClick: function(event){
		if (this.props.onClick) {
			this.props.onClick(event);
		};
	}

});

module.exports = ModuleButton;