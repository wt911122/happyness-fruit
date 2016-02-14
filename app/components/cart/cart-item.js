var React = require("react");
var ReactDOM = require("react-dom");

var ItemCounter = require("./item-counter");

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
		if (this.state.itemStack.amount !== nextProps.itemStack.amount) {
			this.setState({
				itemStack: nextProps.itemStack
			})
		};	
	},
	render: function(){
		console.log("renderCartItem");
		return (
			<li className="cartItem">
				<div>{this.state.itemStack.item.title}</div>
				<ItemCounter  
					initialAmount={this.state.itemStack.amount}
					amountChanged={this.amountOnChanged}>
				</ItemCounter>
				<div className="price-tag floatToRight">￥<large>{this.state.itemStack.price}</large></div>
			</li>);
	},
	amountOnChanged: function(num){
		var prop = {
			num: num,
			item: this.state.itemStack.item,
			itemHeight: ReactDOM.findDOMNode(this).offsetHeight
		}
		this.props.amountOnChanged(prop);
	}
});

module.exports = CartItem;