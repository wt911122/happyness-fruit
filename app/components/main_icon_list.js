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
  	getInitialState: function(){
		return {
			listBelong: this.props.initialType,
			posLeft: 0,
			blockWidth: 0,
			shiftDegree: 0
		}
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
		var style = {
			transform: "translateX("+this.state.posLeft + "px)",
			WebkitTransform:"translateX("+this.state.posLeft + "px)",
			msTransform:"translateX("+this.state.posLeft + "px)",
			width: this.state.blockWidth + "px"
		}
		return (
			<div className="main-icon-list" style={style}>
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
	},
	resetStates: function(width, shift){
		this.setState({
			blockWidth: width,
			shiftDegree: shift,
			posLeft: 0
		});
		console.log(this.state);
	},
	toggle: function(){
		console.log(this.state);
		var node = ReactDOM.findDOMNode(this);
		var shift = node.offsetWidth;
		if (this.state.posLeft == 0) {
			this.setState({
				posLeft: -this.state.shiftDegree,
				blockWidth: document.documentElement.clientWidth
			});
		}else{
			this.setState({
				posLeft: 0,
				blockWidth: document.documentElement.clientWidth - this.state.shiftDegree
			});
		}
		setTimeout(function(){
			this.iscrollList.refresh();	
		}.bind(this), 300);
	}
});
module.exports = MainIconList;