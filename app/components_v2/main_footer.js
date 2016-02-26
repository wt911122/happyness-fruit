var React = require("react");
var ReactDOM = require("react-dom");

var ShopActions = require("../flux/ShopActions.js");
var ModuleButton = require("./module_button.js");
var CartItem = require("./cart_item.js");

var MainFooter = React.createClass({
	propTypes:{
		counter: React.PropTypes.number,
		cost: React.PropTypes.number,
		cart: React.PropTypes.object,
		CartTranslateY: React.PropTypes.number
	},
	getDefaultProps: function() {
	    return ({
			options: {
				mouseWheel: true,
				scrollbars: false,
				eventPassthrough: true,
			},
	    })
  	},
	getInitialState: function(){
		return {
			counter: this.props.counter,
			cost: this.props.cost,
			cart: this.props.cart,
			CartTranslateY: this.props.CartTranslateY,
		}
	},
	/*shoudComponentUpdate: function(nextProps, nextState){
		if (nextState.CartTranslateY !== this.state.CartTranslateY) {
			this.setState({
				CartTranslateY: nextState.CartTranslateY
			})
		};
	},*/
	componentWillReceiveProps: function(nextProps){
		
		if (nextProps.counter !== this.state.counter) {
			this.setState(nextProps);
		}else if(nextProps.CartTranslateY !== this.state.CartTranslateY){
			this.setState({
				CartTranslateY: nextProps.CartTranslateY
			})
		}
	},
	renderCartLayer: function(){
		return (<div ref="cart" className="layer Lst cart-panel" style={this.animationStyle}>
					<div className="cart-head">
						<ModuleButton 
							outterStyle="swapAll-btn" 
							innerStyle="" 
							innerContent="清空" onClick={this.clearAll}/>
					</div>
					<div className="cart-body">
						<ul>
							{this.renderCartBody()}
						</ul>
					</div>
				</div>);
	},
	renderCartBody: function(){
		return this.state.cart.map(function(CItem, idx){
			return <CartItem 
					key={idx}
					itemStack={CItem}
					amountOnChanged={this.amountOnChanged}/>
		}.bind(this));
	},
	renderFooterInfoLayer: function(){
		return (<div className="layer Lnd">
					<div className="briefTip">
						<div>￥<large>{this.state.cost}</large></div>
						<div>运费：{this.state.transportCost}&nbsp;&nbsp;两杯起送</div>
					</div>
					<div className="goCheck">
						<ModuleButton 
							outterStyle="footer-btn" 
							innerStyle="" 
							innerContent="去结算" />
					</div>
				</div>);
	},	
	renderCartIconLayer: function(){
		return (<div className="layer Trd" style={this.animationStyle}>
					<ModuleButton 
						outterStyle="cart-btn" 
						innerStyle="" 
						innerContent={this.state.counter+""}
						onClick={this.toggle}/>
				</div>);
	},
	render: function(){
		this.animationStyle = {
			transform: "translateY("+this.state.CartTranslateY + "px)",
			WebkitTransform:"translateY("+this.state.CartTranslateY + "px)",
		}
		console.log(this.state.CartTranslateY);
		return (
			<footer className="main-footer">
				{this.renderCartLayer()}
				{this.renderFooterInfoLayer()}
				{this.renderCartIconLayer()}
			</footer>);
	},
	toggle: function(event){
		this.props.toggle(event);
	},
	amountOnChanged: function(message){
		this.props.amountOnChanged(message);
	},
	clearAll: function(){
		console.log("clearAll");
		this.props.clearAll();
	}
});

module.exports = MainFooter;
