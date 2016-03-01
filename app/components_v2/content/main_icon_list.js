var React = require("react");
var ReactDOM = require("react-dom");
var ShopActions = require("../../flux/ShopActions.js");

var Icon = React.createClass({
	propTypes: {
		style: React.PropTypes.object, 
		item: React.PropTypes.object
	},
	render: function(){
		var item = this.props.item;
		return (
			<li>
				<button className="fruit-icon" style={this.props.style} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouched}>{item.name}</button>
			</li>)
	},
	onTouchStart: function(e){
		event.stopPropagation();
		event.preventDefault();
		this.touchY = e.touches[0].clientY;
	},
	onTouched: function(e){
		event.stopPropagation();
		event.preventDefault();
		var deltaY = e.changedTouches[0].clientY - this.touchY;
		if (Math.abs(deltaY == 0)) {
			ShopActions.filterItem(this.props.item.name);
		};
		
	}
})

var MainIconList = React.createClass({
	propTypes: {
		outterStyle: React.PropTypes.object,
		iconData: React.PropTypes.array
	},
	getInitialState: function(){
		return {
			outterStyle: this.props.outterStyle,
			iconData: this.props.iconData
		}
	},
	componentWillReceiveProps: function(nextProps){
		if (nextProps.outterStyle.transform !== this.state.outterStyle.transform) {
			console.log("outterStyle receive")
			//this.listHeight = ReactDOM.findDOMNode(this).querySelector("ul > li:nth-child(1)").offsetHeight;
			this.setState({
				outterStyle: nextProps.outterStyle
			})
		};
		
		if (nextProps.iconData !== this.state.iconData) {

			this.setState({
				iconData: nextProps.iconData
			})
		}
	},
	renderIcon: function(){
		//console.log(this.state.icons);
		return this.state.iconData.map(function(item, i){
			var style = {
				color: item.color,
				backgroundColor: item.backgroundColor
			}
			return <Icon key={"fruitType-" + item.id} style={style} item={item}/>
		}.bind(this));
	},
	render: function(){
		return (
			<div className="main-icon-list" style={this.state.outterStyle}>
				<div className="wrapper">
					<ul>
						{this.renderIcon()}
					</ul>
				</div>
			</div>);
	},
	componentDidMount: function() {
		console.log("update");
		var node = ReactDOM.findDOMNode(this);
		var wrapper = node.firstChild;
		var padding = (node.offsetHeight - wrapper.offsetHeight) / 2 + "px";
		wrapper.style.paddingTop = padding;
		wrapper.style.paddingBottom = padding;
		wrapper.style.width = this.state.iconData.length * 54 + "px";
	}
});
module.exports = MainIconList;