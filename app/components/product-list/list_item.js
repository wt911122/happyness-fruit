var React = require("react");
var ReactDOM = require("react-dom");

var ModuleButton  = require("../module_button.js")

var ListItem = React.createClass({
	propTypes:{
		key: React.PropTypes.string,
		item: React.PropTypes.object,
		onChanged: React.PropTypes.func.isRequired
	},
	render: function(){
		return (
			<li className="productItem">
				<div className="imgBlock"><img className="reactImg" src={this.props.item.imgURL}/></div>
				<div className="description">
					<h1>{this.props.item.title}</h1>
					<h2>{this.props.item.subTitle}</h2>
					<p>￥<large>{this.props.item.price}</large></p>
				</div>
				<ModuleButton 
					neededStyle="plusBtn"
					neededContent="+"
					onClick={this.onChanged}>
				</ModuleButton>
			</li>)
	},
	onChanged: function(event){
		event.preventDefault();
		console.log("plusOne");
	}
});
module.exports = ListItem;

