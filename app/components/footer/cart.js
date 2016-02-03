var React = require("react");

var Cart = React.createClass({
	propTypes: {
		amount: React.PropTypes.number,
	},
	render: function(){
		return (
			<div className="cartContainer">
				<button className="cart-btn">{this.props.amount}</button>
			</div>);
	}
});

module.exports = Cart;