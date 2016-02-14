var React = require("react");
var ReactDOM = require("react-dom");
var ReactIScroll = require('react-iscroll');
var iScroll = require('iscroll');

var ListItem = require("./product-list/list_item.js");


var MainProductList = React.createClass({
	propTypes: {
		productsData: React.PropTypes.array,
		initialType: React.PropTypes.number,
		itemUncovered: React.PropTypes.func.isRequired,
		itemOnChanged: React.PropTypes.func.isRequired,
	},
	getDefaultProps: function(){
		return {
			options: {
		        mouseWheel: true,
		        scrollbars: false
		    }
		}
	},
	getInitialState: function(){
		return {
			listBelong: this.props.initialType,
			posLeft: 0,
			blockWidth: 0,
			shiftDegree: 0
		}
	},
	renderItem: function(){
		return this.props.productsData.map(function(item, i){
			return <ListItem 
						key={"item-"+item.id}
						item={item}
						onChanged={this.itemOnChanged}
						uncovered={this.itemUncovered}>
					</ListItem>
		}.bind(this))
	},
	render: function(){
		var style = {
			transform: "translateX("+this.state.posLeft + "px)",
			WebkitTransform:"translateX("+this.state.posLeft + "px)",
			msTransform:"translateX("+this.state.posLeft + "px)",
			width: this.state.blockWidth + "px"
		}
		return (
			<div className="productList" style={style}>
			    <ReactIScroll iScroll={iScroll}
                    options={this.props.options}
                    onScrollEnd={this.onScrollEnd}>
				<ul>
					{this.renderItem()}
				</ul>
				</ReactIScroll>
			</div>);
	},
	itemOnChanged: function(paCKage){
		console.log("itemOnChanged");
		this.props.itemOnChanged(paCKage);
	},
	itemUncovered: function(item){
		console.log("itemUncovered");
		this.props.itemUncovered(item);
	},
	onScrollEnd: function(){
		console.log("iScroll starts scrolling")
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
	}
});

module.exports = MainProductList;