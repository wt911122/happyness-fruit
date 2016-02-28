var React = require("react");
var ReactDOM = require("react-dom");
var Immutable = require("immutable");
var ShopActions = require("../../flux/ShopActions.js");

var ModuleButton = require("../module_button.js");

var Product = React.createClass({
	propTypes: {
		item: React.PropTypes.object,
		loadingImg: React.PropTypes.bool,
		invisible: React.PropTypes.bool
	},
	getInitialState: function(){
		return {
			loadingImg: this.props.loadingImg,
			invisible: this.props.invisible,
		}
	},
	componentWillReceiveProps: function(nextProps){
		if (nextProps.loadingImg !== this.state.loadingImg) {
			this.setState({
				loadingImg: nextProps.loadingImg
			})
		};
		if (nextProps.invisible !== this.state.invisible) {
			this.setState({
				invisible: nextProps.invisible
			})
		};
	},
	render: function(){
		var item = this.props.item;
		//console.log(this.state.loadingImg, item.imgURL)
		var src = this.state.loadingImg ? item.imgURL+"" : "app/style/images/Loading.png";
		var style = {display: this.state.invisible?"none":"block"};
		//console.log(src)
		return (<li className="productItem" style={style} onTouchEnd={this.onTouched} onTouchStart={this.onTouchStart}>
					<div className="imgBlock"><img className="reactImg" src={src} /></div>
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
		filtered: React.PropTypes.bool,
		active: React.PropTypes.number,
		loadingStates: React.PropTypes.object,
		invisibleStates: React.PropTypes.object
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
			active: this.props.active,
			data: this.props.data,
			filtered: this.props.filtered,
			loadingStates: this.props.loadingStates,
			invisibleStates: this.props.invisibleStates
		}
	},
	componentWillReceiveProps: function(nextProps){
		if (nextProps.outterStyle.transform !== this.state.outterStyle.transform) {
			console.log("outterStyle receive")
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
		if (nextProps.loadingStates !== this.state.loadingStates) {
			this.setState({
				loadingStates: nextProps.loadingStates
			})
		}
		if (nextProps.invisibleStates !== this.state.invisibleStates) {
			this.setState({
				invisibleStates: nextProps.invisibleStates
			})
		}
		/*if (nextProps.data !== this.state.data) {
			console.log(nextProps.data);
			var node = this.node = ReactDOM.findDOMNode(this);
			
			this.setState({
				filtered: nextProps.filtered,
				data: nextProps.data
			})
		}*/
	},
	findLiCount: function(active){
		for (var i = this.marks.length - 1; i >= 0; i--) {
			if(this.marks[i].obj === active)
				return (this.marks[i].count + 1);
		};
	},
	renderProduct: function(){
		var count=0, index, counter=-1;
		var self = this;
		var loadingStates = this.state.loadingStates;
		var invisibleStates = this.state.invisibleStates;
		//self.marks = [];
		console.log(this.state.data);
		return this.state.data.map(function(obj, i){
			if (!self.marked ) {
				console.log("marks")
				self.marks.push({
					obj: obj.id,
					count: count
				});
				count += obj.items.length
			};
			
			return obj.items.map(function(item, j){
				counter++;
				return <Product key={item.id} item={item} loadingImg={!!loadingStates.get(counter)} invisible={!!invisibleStates.get(counter)}/>
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
			   nextState.outterStyle.transform !== this.state.outterStyle.transform || 
			   nextState.loadingStates !== this.state.loadingStates ||
			   nextState.invisibleStates !== this.state.invisibleStates;
	},
	componentDidMount: function(){
		var node = this.node = ReactDOM.findDOMNode(this);
		var childSample = node.querySelector("ul > li:nth-child(1)");
		this.listHeight = childSample.offsetHeight;
		this.marked = true;
		node.addEventListener("scroll", this.scrollHandler);
	},
	scrollHandler: function(){
		//console.log(this.marks);
		var node = this.node;
		for (var i = this.marks.length - 1; i >= 0 ; i--) {
			if (this.marks[i].count * this.listHeight < node.scrollTop){
 				this.setState({
 					active: this.marks[i].obj
 				});
 				this.props.activeChanged(this.marks[i].obj);
				break;
			}
		};
		clearTimeout(this.timeoutFunc);
		this.timeoutFunc = setTimeout(function(){
			var listHeight = this.listHeight;
			var idx = Math.floor(node.scrollTop / listHeight);
			var idxEnd = Math.floor((node.scrollTop + node.offsetHeight) / listHeight);
			this.props.requestLoadingIMG(idx, idxEnd);

		}.bind(this), 300);
	}
});

module.exports = MainContent;