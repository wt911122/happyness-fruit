var React = require("react");
var ReactDOM = require("react-dom");
var ShopActions = require("../../flux/ShopActions.js");

var ModuleButton = require("../module_button.js");

var Product = React.createClass({
	propTypes: {
		item: React.PropTypes.object
	},
	render: function(){
		var item = this.props.item;
		return (<li className="productItem" onTouchEnd={this.onTouched} onTouchStart={this.onTouchStart}>
					<div className="imgBlock"><img className="reactImg" src={item.imgURL} /></div>
					<div className="description">
						<h1>{item.title}</h1>
						<h2>{item.subTitle}</h2>
						<p>￥<large>{item.price}</large></p>
					</div>
					<ModuleButton outterStyle="touchArea" innerStyle="plusBtn" innerContetn=""/>
				</li>);
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
			var target = e.changedTouches[0].target;
			//console.log(target);
			if(target.tagName.toLowerCase() === "button" || target.className === "plusBtn"){
				ShopActions.alterCartItem({
					operation: "plus",
					num: 1,
					item: this.props.item
				})
			}else{
				ShopActions.goCheckCart(this.props.item);
			}
		};
	}
})	

var MainContent = React.createClass({
	propTypes: {
		outterStyle: React.PropTypes.object,
		data: React.PropTypes.array,
		active: React.PropTypes.number
	},
	marks:[],
	getDefaultProps: function() {
		return {
			options: {
				mouseWheel: true,
		        scrollbars: false,
		        eventPassthrough: true,
		        probeType: 1,
			}
		}
	},
	getInitialState: function(){
		return {
			outterStyle: this.props.outterStyle,
			active: this.props.active
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
		if (nextProps.active !== this.state.active) {
			console.log("receive")
			this.setState({
				active: nextProps.active
			});
			this.scroll = false;
			ReactDOM.findDOMNode(this).querySelector("ul > li:nth-child("+this.findLiCount(nextProps.active)+")").scrollIntoView();
			this.scroll = true;
		};
	},
	findLiCount: function(active){
		for (var i = this.marks.length - 1; i >= 0; i--) {
			if(this.marks[i].obj === active)
				return (this.marks[i].count + 1);
		};
	},
	renderProduct: function(){
		var count=0;
		var self = this;
		return this.props.data.map(function(obj){
			self.marks.push({
				obj: obj.id,
				count: count
			});
			count += obj.items.length
			return obj.items.map(function(item){
				return <Product key={item.id} item={item}/>
			})
		})
	},
	render: function(){
		//document.forms[0].scrollIntoView();
		console.log(this.state.active);
		return (<div className="main-product-list" style={this.state.outterStyle}>	
					<ul>
						{this.renderProduct()}
					</ul>
				</div>);
	},
	shouldComponentUpdate: function(nextProps, nextState){
		return nextState.active !== this.state.active ||
			   nextState.outterStyle.transform !== this.state.outterStyle.transform;
	},
	componentDidMount: function(){
		var node = ReactDOM.findDOMNode(this);
		this.listHeight = ReactDOM.findDOMNode(this).querySelector("ul > li:nth-child(1)").offsetHeight;
		node.addEventListener("scroll", function(){
			for (var i = this.marks.length - 1; i >= 0; i--) {
				if (this.marks[i].count * this.listHeight < node.scrollTop){
     				this.setState({
     					active: this.marks[i].obj
     				});
     				this.props.activeChanged(this.marks[i].obj);
					break;
				}
			};
		}.bind(this));
	}
});

module.exports = MainContent;