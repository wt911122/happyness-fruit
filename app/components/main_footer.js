var React = require("react");
var ReactDOM = require('react-dom');

var ModuleButton = require("./module_button.js");
var Cart = require("./footer/cart.js");

var MainFooter = React.createClass({

	getInitialState: function(){
		return {
			amount: 0,
			price: 0,
			transportCost: 0,
		}
	},
	render: function(){
		return (
			<footer className="main-footer container">
				<div className='container-fluid'>
					<div>
						<Cart amount={this.state.amount}></Cart>
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
		var header = ReactDOM.findDOMNode(this);

		var blockfy = header.firstChild.firstChild.nextSibling.firstChild;			
		blockfy.style.marginTop = (header.offsetHeight - blockfy.offsetHeight) / 2 + "px";

		var button = header.firstChild.lastChild;			
		button.style.marginTop = (header.offsetHeight - button.offsetHeight) / 2 + "px";
	},
	toSumUp: function(event){
		console.log("toSumUp");
	}
});

module.exports = MainFooter;