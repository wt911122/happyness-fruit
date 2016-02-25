var React = require("react");
var ReactDOM = require("react-dom");

var ModuleButton = require("./module_button.js");

var ItemCounter = React.createClass({
	propTypes: {
		initialAmount: React.PropTypes.number,
		amountChanged: React.PropTypes.func
	},

	getInitialState: function(){
		return {
			amount: this.props.initialAmount
		}
	},
	componentWillReceiveProps: function(nextProps){
		var nextAmount = nextProps.initialAmount;
		if (nextAmount !== this.state.amount) {
			this.setState({
				amount: nextAmount
			})
		};
	},
	render: function(){
		return (
			<div className="item-counter">
				<ModuleButton 
					outterStyle="btn-wrapper"
					innerStyle="counterBtn minus"
					innerContent=""
					onClick={this.doMinus}/>
				<span className="textBetween">{this.state.amount}</span>
				<ModuleButton 
					outterStyle="btn-wrapper"
					innerStyle="counterBtn plus"
					innerContent=""
					onClick={this.doAdd}/>
			</div>)
	},
	doMinus: function(event){
		event.preventDefault();
		this.props.amountChanged(-1);
	},
	doAdd: function(event){
		event.preventDefault();
		this.props.amountChanged(1);
	},
	handleClick: function(event){
		event.stopPropagation();
	}

});

module.exports = ItemCounter;