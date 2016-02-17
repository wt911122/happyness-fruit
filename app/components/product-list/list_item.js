var React = require("react");
var ReactDOM = require("react-dom");
var CartWorker = require("../cart_worker.js");

var ModuleButton  = require("../module_button.js");
var PropsMethodMixin = require("../../../mixins/PropsMethodMixin.js");

var ListItem = React.createClass({
	mixins:[PropsMethodMixin],
	propTypes:{
		key: React.PropTypes.string,
		item: React.PropTypes.object,
		onChanged: React.PropTypes.func.isRequired,
		uncovered: React.PropTypes.func.isRequired,
		activeIMG: React.PropTypes.bool,
	},
	getInitialState: function() {
		return {
			activeIMG: this.props.activeIMG
		}
	},
	componentWillReceiveProps: function(nextProps){
		if (this.state.activeIMG !== nextProps.activeIMG) {
			this.setState({
				activeIMG: nextProps.activeIMG
			})
		};	
	},
	render: function(){
		var src = this.state.activeIMG ? this.props.item.imgURL : "app/style/images/Loading.png"; 
		return (
			<li className="productItem" onClick={this.uncovered}>
				<div className="imgBlock"><img className="reactImg" src={src} /></div>
				<div className="description">
					<h1>{this.props.item.title}</h1>
					<h2>{this.props.item.subTitle}</h2>
					<p>￥<large>{this.props.item.price}</large></p>
				</div>
				<button className="touchArea" onTouchEnd={this.onChanged} onClick={this.handleClick}>
					<div className="plusBtn"></div>
				</button>
			</li>)
	},
	onChanged: function(event){
		event.preventDefault();
		event.stopPropagation();
		console.log("plusOne");
		var prop = CartWorker({
			amount: 1,
			operation: "plus",
			item: this.props.item
		})
		this.callMethodOnProps('onChanged', prop);
	},
	uncovered: function(event){
		event.preventDefault();
		console.log("uncovered");
		this.callMethodOnProps('uncovered', this.props.item);
	},
	handleClick: function(event){
		event.stopPropagation();
	}
});
module.exports = ListItem;

