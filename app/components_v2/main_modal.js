var React = require("react");
var ReactDOM = require("react-dom");

var ModuleButton = require("./module_button.js");
var ItemCounter = require("./item_counter.js");


var MainModal = React.createClass({
	propsType: {
		item: React.PropTypes.shape({
			id:          React.PropTypes.number,
      		title:       React.PropTypes.string,
			subTitle:    React.PropTypes.string,
			imgURL:      React.PropTypes.string,
			discription: React.PropTypes.string,
			capacity:    React.PropTypes.number,
			price:       React.PropTypes.number
		}),
		amount:  React.PropTypes.number,
	    visible: React.PropTypes.bool
	}, 
	getInitialState: function(){
		return {
			item: this.props.item,
			amount: this.props.amount,
			visible: this.props.visible,
		}
	},
	componentWillReceiveProps: function(nextProps){
		if (nextProps.visible !== this.state.visible) {
			this.setState(nextProps);
		};
		if (nextProps.amount !== this.state.amount) {
			this.setState({amount: nextProps.amount});
		};
	},
	render:function(){
		var style = this.state.visible ? {} : {display: "none"};
		return (<div className="modal-panel" style={style}>
					<div className="modal-panel-header">
						<div>
							<label className="capacity">{this.state.item.capacity}ml</label>
							<ModuleButton
								outterStyle="shareBtn"
								innerStyle=""
								innerContent="分享"
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
							amountChanged={this.amountChanged}/>
						<ModuleButton
							outterStyle="modal-panel-button"
							innerStyle=""
							innerContent="加入购物车"
							onClick={this.submitModal}>
						</ModuleButton>
					</div>
				</div>)
	},
	componentDidUpdate: function(){
		var node = ReactDOM.findDOMNode(this);
		var translateX = (document.documentElement.offsetWidth - node.offsetWidth ) / 2;
		var translateY = (document.documentElement.offsetHeight - node.offsetHeight ) / 2;
		translateY = translateY > 0 ? translateY: 30; 
		node.style.WebkitTransform = "translateY("+translateY + "px)" + " translateX("+translateX + "px)";
		node.style.transform = "translateY("+translateY + "px)" + " translateX("+translateX + "px)";
	},
	amountChanged: function(num){
		this.props.amountChanged(num);
	},
	close: function(){
		this.props.onClose();
	},
	submitModal: function(){
		this.props.submitModal();
	}
});

module.exports = MainModal;