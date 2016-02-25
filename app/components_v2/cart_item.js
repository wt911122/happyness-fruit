var React = require("react");
var ReactDOM = require("react-dom");

var ItemCounter = require("./item_counter.js");

var CartItem = React.createClass({
	propTypes:{
		itemStack: React.PropTypes.object,
		amountOnChanged: React.PropTypes.func,
	},
	getInitialState: function(){
		return {
			itemStack: this.props.itemStack
		}
	},
	componentWillReceiveProps: function(nextProps){
		if (this.state.itemStack.count !== nextProps.itemStack.count) {
			this.setState({
				itemStack: nextProps.itemStack
			})
		};	
	},
	render: function(){
		return (
			<li className="cartItem">
				<div>{this.state.itemStack.item.title}</div>
				<ItemCounter  
					initialAmount={this.state.itemStack.count}
					amountChanged={this.amountOnChanged}>
				</ItemCounter>
				<div className="price-tag">￥<large>{this.state.itemStack.item.price * this.state.itemStack.count}</large></div>
			</li>);
	},
	amountOnChanged: function(num){
		var prop = {
			num: num,
			item: this.state.itemStack.item,
		}
		this.props.amountOnChanged(prop);
	}
});

module.exports = CartItem;