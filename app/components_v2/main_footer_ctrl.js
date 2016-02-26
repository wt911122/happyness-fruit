var React = require("react");
var ReactDOM = require("react-dom");
var Immutable = require("immutable");

var ShopActions = require("../flux/ShopActions.js");
var ShopStore = require("../flux/ShopStore.js");

var MainFooter = React.createFactory(require("./main_footer.js"));

var MainFooterCtrl = React.createClass({
	getDefaultProps: function(){
		return {
			maxTranslateY: 200,
		}
	},
	getInitialState: function(){
		return {
			counter: 0,
			cost: 0,
			cart: Immutable.List(),
			CartTranslateY: 0
		}
	},
	checkCartHandler: function(item){
		var cart = this.state.cart;
		var cartItem = cart.find(function(cartItem){
			return cartItem.item.id === item.id;
		});
		if (!cartItem) {
			cartItem = {
				item: item,
				count: 0
			}
		};
		console.log(cartItem);
		ShopActions.callForModal(cartItem);
	},
	plusHanlder: function(operation){
		var cart = this.state.cart;
		var item = operation.item;
		var idx = cart.findIndex(function(cartItem){
			return cartItem.item.id === item.id;
		})
		if (idx == -1) {
			this.setState(function (prevState) {
				var cart = prevState.cart;
				return {
					cart: cart.push({ 
						item: item,
						count: operation.num
					}),
					counter: prevState.counter + operation.num,
					cost: prevState.cost + operation.num * item.price
				};
			})
		}else{
			this.setState(function (prevState){
				var cart = prevState.cart;
				return {
					cart: cart.update(idx, function(cartItem){
						return {
							item: cartItem.item,
							count: cartItem.count + operation.num
						}
					}),
					counter: prevState.counter + operation.num,
					cost: prevState.cost + operation.num * item.price
				}
			})
		}
	},
	replaceHandler: function(operation){
		var cart = this.state.cart;
		var item = operation.item;
		var idx = cart.findIndex(function(cartItem){
			return cartItem.item.id === item.id;
		});
		// 列表中未有项目
		if (idx == -1) {
			if (operation.num !== 0) {
				this.setState(function (prevState) {
					var cart = prevState.cart;
					return {
						cart: cart.push({ 
							item: item,
							count: operation.num
						}),
						counter: prevState.counter + operation.num,
						cost: prevState.cost + operation.num * item.price
					};
				})
			};
		}else{
			var obj = cart.get(idx);
			if (operation.num == 0) {
				this.setState(function (prevState) {
					var cart = prevState.cart;
					return {
						cart: cart.delete(idx),
						counter: prevState.counter - obj.count,
						cost: prevState.cost - obj.count * item.price
					};
				});
			}else{
				this.setState(function (prevState){
					var cart = prevState.cart;
					return {
						cart: cart.update(idx, function(cartItem){
							return {
								item: cartItem.item,
								count: operation.num
							}
						}),
						counter: prevState.counter + operation.num - obj.count,
						cost: prevState.cost + (operation.num - obj.count) * item.price
					}
				})
			}
		}
	},
	alterCartItem: function(operation){
		switch(operation.operation){
			case "plus":
				this.plusHanlder(operation);
				break;
			case "replace":
				this.replaceHandler(operation);
				break;
		}
	},
	closeSelf: function(){
		console.log("modal closeSelf");
		this.setState({
			CartTranslateY: 0
		})
	},
	componentDidMount: function(){
		ShopStore.addCheckCartListener(this.checkCartHandler);
		ShopStore.addCartItemAlteredListener(this.alterCartItem);
		ShopStore.addShadowClosingListener(this.closeSelf)
	},
	render: function(){
		return MainFooter({
			counter: this.state.counter,
			cost: this.state.cost,
			cart: this.state.cart,
			CartTranslateY: this.state.CartTranslateY,
			amountOnChanged: this.amountOnChanged,
			toggle: this.toggle,
			clearAll: this.clearAll
		});
	},
	findItemInCart: function(item){
		var result = -1;
		for (var i = this.state.cart.length - 1; i >= 0; i--) {
			if(this.state.cart[i].item.id == item.id){
				result = i;
			}
		};
		return result;
	},
	amountOnChanged: function(message){
		var item = message.item;
		var num = message.num;
		console.log(message)
		var node = ReactDOM.findDOMNode(this);
		node = node.querySelector(".layer.Lst.cart-panel > .cart-body > ul");
		this.setState(function (prevState) {
			var cart = prevState.cart;
			var preItemIdx = cart.findIndex(function(cartItem){
				return cartItem.item.id === item.id;
			});
			var resultNum = cart.get(preItemIdx).count + num;
			if (resultNum == 0){
				var cartTranslateY = - ((node.offsetHeight - 6) > this.props.maxTranslateY? this.props.maxTranslateY: (node.offsetHeight - 6));
				return {
					cart: cart.delete(preItemIdx),
					counter: prevState.counter + num,
					cost: prevState.cost + num * item.price,
					CartTranslateY: cartTranslateY
				}
			}else{
				return {
					cart: cart.update(preItemIdx, function(cartItem){
						return {
							item: cartItem.item,
							count: resultNum
						}
					}),
					counter: prevState.counter + num,
					cost: prevState.cost + num * item.price
				};
			}
		});
		
	},
	toggle: function(event){
		console.log(event.changedTouches[0].target)
		console.log("toggle")
		if (this.state.cart.count() !== 0 || this.state.CartTranslateY !== 0) {
			console.log("> 0 ")
			var node = ReactDOM.findDOMNode(this);
			node = node.querySelector(".layer.Lst.cart-panel > .cart-body > ul");
			var cartTranslateY = 0;
			if(this.state.CartTranslateY === 0 ){
				cartTranslateY = - ((node.offsetHeight + 30)> this.props.maxTranslateY? this.props.maxTranslateY: (node.offsetHeight + 30));
				ShopActions.callForShadow({
					zIndex: 70,
					visible: true
				});	
			}else{
				ShopActions.closeShadow();	
			}
			console.log("toggle"+cartTranslateY);
			this.setState({
				CartTranslateY: cartTranslateY
			})
			
		};
	},
	clearAll: function(){
		if (this.state.cart.count() !== 0) {
			this.setState(function (prevState){
				var cart = prevState.cart;
				return {
					cart: cart.clear(),
					counter: 0,
					cost: 0,
					CartTranslateY: 0
				}
				
			})
			ShopActions.closeShadow();	
		};

	}
});

module.exports = MainFooterCtrl;

