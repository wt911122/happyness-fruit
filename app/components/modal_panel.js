var React = require("react");
var ReactDOM = require("react-dom");

var ModuleButton = require("./module_button.js");
var ItemCounter = require("./cart/item-counter.js");
var CartWorker = require("./cart_worker.js");

var ModalPanel = React.createClass({
	propTypes:{
		changeCartItem: React.PropTypes.func.isRequired,
		onClosed: React.PropTypes.func.isRequired
	},
	getInitialState: function() {
	    return {
	      	item: {
	      		id: 0,
	      		title: "",
				subTitle: "",
				imgURL: "",
				discription: "",
				capacity: 0,
				price: 0,
	      	},
	      	amount: 0,
	      	visible: false
	    };
	},
	render: function(){
		var style = this.state.visible ? {} : {display: "none"};
		return (
			<div className="modal-panel" style={style}>
				<div className="modal-panel-header">
					<div>
						<label className="capacity">{this.state.item.capacity}ml</label>
						<ModuleButton
							neededStyle="shareBtn"
							neededContent="分享"
							onClick={this.callSharePanel}>
						</ModuleButton>
						<button
							className="exitBtn"
							onClick={this.close}>
						</button>
					</div>
					<div className="imgBlock">
						<img src={this.state.item.imgURL}/>
					</div>
					<div className="hgroup">
						<h1>{this.state.item.title}</h1>
						<h2>{this.state.item.subTitle}</h2>
					</div>
					<div className="floatToRight priceTag">
						￥<large>{this.state.item.price}</large>
					</div>
				</div>
				<div className="modal-panel-body">
					<p>{this.state.item.discription}</p>
				</div>
				<div className="modal-panel-footer">
					<ItemCounter
						initialAmount={this.state.amount}
						amountChanged={this.amountChanged}
						>
					</ItemCounter>
					<ModuleButton
						neededStyle="modal-panel-button floatToRight"
						neededContent="加入购物车"
						onClick={this.changeCartItem}>
					</ModuleButton>
				</div>
			</div>
			)
	},
	componentDidUpdate: function(){
		var node = ReactDOM.findDOMNode(this);
		console.log(node.offsetWidth, node.offsetHeight)
		node.style.left = (document.documentElement.clientWidth - node.offsetWidth)/2 + "px";
		node.style.top = (document.documentElement.clientHeight - node.offsetHeight)/2 + "px";
	},
	changeCartItem: function(event){
		event.preventDefault();
		var paCKage = CartWorker({
			item: this.state.item,
			amount: this.state.amount,
			operation: "copy"
		})
		this.props.changeCartItem(paCKage);
		this.close();
	},
	amountChanged: function(num){
		var tempAmount = this.state.amount + num;
		tempAmount = tempAmount < 0 ? 0 : tempAmount;
		this.setState({
			amount: tempAmount
		});
	},
	callForModal: function(basket){
		console.log(basket);
		this.setState({
			item: basket.item,
			amount: basket.amount,
			visible: true
		});
	},
	callSharePanel: function(){
		console.log("call share Panel");
	},
	close: function(){
		this.props.onClosed({
			shadowZindex: -1,
			shadowVisible: false
		});
		this.setState({visible: false});
	}
});

module.exports = ModalPanel;