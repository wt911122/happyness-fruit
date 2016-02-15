var React = require("react");
var ReactDOM = require("react-dom");
var CloneDeep = require("lodash/cloneDeep");

var CartItem = require("./cart/cart-item.js");
var ModuleButton = require("./module_button.js");

var Cart = React.createClass({
	propTypes: {
		CartItemAmountChanged: React.PropTypes.func
	},
	getDefaultProps: function(){
		return {
			maxHeight: 320,
			itemCartedKeyPrefix: "cartItem-"
		}
	},
	getDefaultProps: function(){
		return {
			plus: "justPileUp",
			copy: "copyToCart"
		}
	},
	getInitialState: function(){
		return {
			amount: 0,
			price: 0,
			itemsInCart: [],
			posBottom: 0,
			visible: "hidden"
		}
	},
	renderItems: function(){
		console.log("renderItemsOuter");
		return this.state.itemsInCart.map(function(itemStack, i){
			var keyCode = "cartItem-"+itemStack.item.id;
			return <CartItem 
						key={keyCode}
						itemStack={itemStack}
						amountOnChanged={this.CartItemAmountChanged}
					></CartItem>
		}.bind(this));
	},
	render: function(){
		var style = {
			transform: "translateY("+this.state.posBottom + "px)",
			WebkitTransform:"translateY("+this.state.posBottom + "px)",
			msTransform:"translateY("+this.state.posBottom + "px)",
			
		};
		return (
			<div className="cart-panel" style={style}>
				<div className="cart-head">
					<ModuleButton 
						neededStyle="swapAll-btn floatToRight"
						neededContent="清空"
						onClick={this.clearAll}>
					</ModuleButton>
				</div>
				<div className="cart-body" style={{visible: this.state.visible}}>
					<ul>
						{this.renderItems()}
					</ul>
				</div>
			</div>);
	},
	unZipPackage: function(paCKage){
		return this[this.props[paCKage.getOperation()]].call(this, paCKage);
	},
	justPileUp: function(paCKage){
		var flag = false;
		var obj = paCKage.getItem();
		var itemsInCartCopy = CloneDeep(this.state.itemsInCart);

		var target = itemsInCartCopy.filter(function(itemStack, i){
			if(itemStack.item.id == obj.id) pos = i;
			return itemStack.item.id == obj.id
		});
		if (target.length > 0) {
			target = target[0];
			target.amount = target.amount + paCKage.getAmount();
			target.price = target.price + paCKage.getAmount() * obj.price;
		}else{
			itemsInCartCopy.push({
				item: paCKage.getItem(),
				amount: paCKage.getAmount(),
				price: paCKage.getAmount() * obj.price
			})
		}

		var tempState = {
			amount: this.state.amount + paCKage.getAmount(),
			price: this.state.price + paCKage.getAmount() * obj.price,
			itemsInCart: itemsInCartCopy
		}

		this.setState(tempState);
		return {
			amount: tempState.amount,
			price: tempState.price
		}
	},
	copyToCart: function(paCKage){
		console.log("---------------paCKage----------------")

		var obj = paCKage.getItem(),
			tempState, transPKG;
		console.log(obj);
		console.log(paCKage.getAmount());
		console.log(paCKage.getOperation());
		var itemsInCartCopy = CloneDeep(this.state.itemsInCart);
		var target = itemsInCartCopy.filter(function(itemStack, i){
			if(itemStack.item.id == obj.id) pos = i;
			return itemStack.item.id == obj.id
		});
		if (target.length > 0) {
			target = target[0];
			if (paCKage.getAmount() === 0) {
				tempState = {
					amount: this.state.amount - target.amount,
					price: this.state.price - target.amount * obj.price
				}
				itemsInCartCopy.splice(pos, 1);
				tempState.itemsInCart = itemsInCartCopy;
			}else{
				var diff = paCKage.getAmount() - target.amount;;
				target.amount = paCKage.getAmount();
				target.price = paCKage.getAmount() * obj.price;
				tempState = {
					amount: this.state.amount + diff,
					price: this.state.price + diff * obj.price,
					itemsInCart: itemsInCartCopy
				}
			}
		}else{
			itemsInCartCopy.push({
				item: paCKage.getItem(),
				amount: paCKage.getAmount(),
				price: paCKage.getAmount() * obj.price
			});
			tempState = {
				amount: this.state.amount + paCKage.getAmount(),
				price: this.state.price + paCKage.getAmount() * obj.price,
				itemsInCart: itemsInCartCopy
			}
		}
		transPKG = {
			amount: tempState.amount,
			price: tempState.price
		}
		this.setState(tempState);
		this.props.CartItemAmountChanged(transPKG);
	},
	CartItemAmountChanged: function(prop){
		var itemsInCartCopy = CloneDeep(this.state.itemsInCart);
		var obj = prop.item, pos;
		var target = itemsInCartCopy.filter(function(itemStack, i){
			if(itemStack.item.id == obj.id) pos = i;
			return itemStack.item.id == obj.id
		})[0];
		console.log(pos);
		var tempNewNum = target.amount + prop.num;
		var flag = tempNewNum < 0;
		if (!flag) {
			var tempState = {
				amount: this.state.amount + prop.num,
				price: this.state.price + prop.num * obj.price,
				itemsInCart: itemsInCartCopy
			}
			var transPKG = {
				amount: tempState.amount,
				price: tempState.price,
			}
			if (tempNewNum === 0 ) {
				itemsInCartCopy.splice(pos,1);
				console.log(prop.itemHeight);
				tempState.posBottom = this.state.posBottom + prop.itemHeight;
				transPKG.cartBtnTransport = prop.itemHeight;
			}else{
				target.amount = tempNewNum;
				target.price = tempNewNum * obj.price;
			}

			
			this.setState(tempState);
			this.props.CartItemAmountChanged(transPKG);
		};
	},
	checkItemInBasket: function(item){
		var obj = this.state.itemsInCart.filter(function(itemStack, i){
			return itemStack.item.id == item.id
		})[0];
		if (obj === void 0) {
			obj = {
				item: item,
				amount: 0,
				price: 0
			}
		};
		return obj;
	},
	clearAll: function(){
		if (this.state.itemsInCart.length > 0) {
			var node = ReactDOM.findDOMNode(this);

			this.setState({
				amount: 0,
				price: 0,
				itemsInCart: [],
				posBottom: -node.firstChild.offsetHeight,
			})

			this.props.CartItemAmountChanged({
				amount: 0,
				price: 0,
				cartBtnTransport: node.firstChild.nextSibling.offsetHeight
			});
		};
		
	},
	toggle: function(){
		console.log("toggle");
		if (this.state.posBottom == 0) {
			var node = ReactDOM.findDOMNode(this);
			this.setState({
				posBottom: -node.offsetHeight,
				visible:"visible"
			});
		}else{
			this.setState({
				posBottom: 0,
				visible:"hidden"
			});
		}

	}
});

module.exports = Cart;