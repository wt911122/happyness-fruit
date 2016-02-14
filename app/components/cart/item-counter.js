var React = require("react");
var ReactDOM = require("react-dom");

var ModuleButton = require("../module_button.js");

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
		console.log("renderCartItemCounter");
		return (
			<div className="item-counter">
				<ModuleButton onClick={this.doMinus} neededStyle="counterBtn minus" neededContent=""></ModuleButton>
				<span className="textBetween">{this.state.amount}</span>
				<ModuleButton onClick={this.doAdd} neededStyle="counterBtn plus" neededContent=""></ModuleButton>
			</div>)
	},
	doMinus: function(event){
		event.preventDefault();
		this.props.amountChanged(-1);
	},
	doAdd: function(event){
		event.preventDefault();
		this.props.amountChanged(1);
	}

});

module.exports = ItemCounter;