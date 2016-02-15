var React = require("react");
var ReactDOM = require('react-dom');

var ModuleButton = require("./module_button.js");
var Cart = require("./cart.js");

var MainFooter = React.createClass({
	propTypes:{
		toggleCover: React.PropTypes.func.isRequired
	},
	getInitialState: function(){
		return {
			amount: 0,
			price: 0,
			transportCost: 0,

			cartBtnTransport:0
		}
	},
	render: function(){
		var cartBtnStyle = {
			transform: "translateY("+this.state.cartBtnTransport + "px)",
			WebkitTransform:"translateY("+this.state.cartBtnTransport + "px)",
			msTransform:"translateY("+this.state.cartBtnTransport + "px)",
		}
		return (
			<footer className="main-footer container">
				<button className="cart-btn" onTouchEnd={this.toggle} style={cartBtnStyle}>{this.state.amount}</button>
				<Cart ref="cart_panel" 
					CartItemAmountChanged={this.CartItemAmountChanged}>
				</Cart>
				<div className='container-fluid beLevel'>
					<div>
						<div className="cartContainer">
						</div>
					</div>
					<div className="blockfy">
						<div>
							<div>￥<large>{this.state.price}</large></div>
							<div>运费：{this.state.transportCost}&nbsp;&nbsp;两杯起送</div>
						</div>
					</div>
					<div className="floatToRight">
						<ModuleButton neededStyle="btn footer-btn" neededContent="去结算" onClick={this.toSumUp}></ModuleButton>
					</div>
				</div>
			</footer>);
	},
	componentDidMount: function(){
		var footer = ReactDOM.findDOMNode(this);

		var fackCart = footer.lastChild.firstChild.firstChild;	
		fackCart.style.height = footer.offsetHeight + "px";

		var blockfy = footer.lastChild.firstChild.nextSibling.firstChild;			
		blockfy.style.marginTop = (footer.offsetHeight - blockfy.offsetHeight) / 2 + "px";

		var button = footer.lastChild.lastChild;			
		button.style.marginTop = (footer.offsetHeight - button.offsetHeight) / 2 + "px";
	},
	CartItemAmountChanged: function(newState){
		if (newState.cartBtnTransport) {
			newState.cartBtnTransport = this.state.cartBtnTransport + newState.cartBtnTransport;
		};
		this.setState(newState);
	},
	toSumUp: function(event){
		console.log("toSumUp");
	},
	passToCart: function(paCKage){
		console.log(paCKage.getItem());
		var rslt = this.refs.cart_panel.unZipPackage(paCKage);
		console.log(rslt);
		this.setState(rslt);
	},
	closeCart: function(){
		this.refs.cart_panel.toggle();
	},
	checkItemInBasket: function(item){
		return this.refs.cart_panel.checkItemInBasket(item);
	},
	toggle: function(event){
		event.stopPropagation();
		this.toggleHandler();
	},
	toggleHandler: function(){
		this.refs.cart_panel.toggle();
		var height = -ReactDOM.findDOMNode(this.refs.cart_panel).offsetHeight;
		console.log(height);
		if (this.state.cartBtnTransport == 0) {
			this.setState({
				cartBtnTransport: height
			});
			console.log(typeof this.props.toggleCover);
			this.props.toggleCover({
				shadowZindex: 5,
				shadowVisible: true
			})
		}else{
			this.setState({
				cartBtnTransport: 0
			});
			this.props.toggleCover({
				shadowZindex: -1,
				shadowVisible: false
			})
		}
	}
});

module.exports = MainFooter;