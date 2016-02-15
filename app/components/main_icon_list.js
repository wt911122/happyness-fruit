var React = require("react");
var ReactDOM = require("react-dom");
var iScroll = require("iscroll");

var MainIconList = React.createClass({
	propTypes: {
		icons: React.PropTypes.array,
	},
	getDefaultProps: function() {
	    return ({
	      options: {
	        mouseWheel: true,
	        scrollbars: false,
	        click: true,
	        scrollX: true,
	        scrollY: false
	      }
	    })
  	},
	renderIcon: function(){
		console.log(this.props.icons);
		return this.props.icons.map(function(item, i){
			var style = {
				color: item.color,
				backgroundColor: item.backgroundColor
			}
			return (
				<li key={"fruitType-" + item.id}>
					<button className="fruit-icon" style={style}>{item.name}</button>
				</li>)
		}.bind(this));
	},
	render: function(){
		return (
			<div className="main-icon-list">
				<div className="wrapper">
					<ul>
						{this.renderIcon()}
					</ul>
				</div>
			</div>)
	},
	componentDidMount: function(){
		var node = ReactDOM.findDOMNode(this);
		var wrapper = node.firstChild;
		var padding = (node.offsetHeight - wrapper.offsetHeight) / 2 + "px";
		wrapper.style.paddingTop = padding;
		wrapper.style.paddingBottom = padding;
		wrapper.style.width = this.props.icons.length * 54 + "px";
		setTimeout(function(){
			this.iscrollList = new iScroll(node, this.props.options);
		}.bind(this), 300);
	}
});
module.exports = MainIconList;