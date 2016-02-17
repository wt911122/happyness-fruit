var React = require("react");
var ReactDOM = require("react-dom");
var CloneDeep = require("lodash/cloneDeep");
/*var ReactIScroll = require('react-iscroll').default,*/
var iScroll = require('iscroll/build/iscroll-probe');

var ListItem = require("./product-list/list_item.js");


var MainProductList = React.createClass({
	propTypes: {
		productsData: React.PropTypes.array,
		itemUncovered: React.PropTypes.func.isRequired,
		itemOnChanged: React.PropTypes.func.isRequired,
		alertTypeChange: React.PropTypes.func.isRequired
	},
	changePoints: [],
	itemHeight: 0,
	historyPoint: {},
	allowListener: true,
	count: 0,
	getDefaultProps: function() {
	    return ({
	      options: {
	        mouseWheel: true,
	        scrollbars: false,
	        click: true,
	        probeType: 3,
	        
	      }
	    })
  	},
	getInitialState: function(){
		return {
			alowChange: this.props.initialPermission,
			posLeft: 0,
			blockWidth: 0,
			shiftDegree: 0,
			activeIMGArray: [true, true, true, true]
		}
	},
	componentWillReceiveProps: function(nextProps){
		/*console.log("MainProductList");
		console.log(nextProps);
		if (nextProps.initialType !== this.state.listBelong) {
			//console.log(this.scanPointsPos(nextProps.initialType) * this.itemHeight);
			//this.iscrollList.goToPage(0, this.scanPointsPos(nextProps.initialType), 0);
			this.setState({
				listBelong: nextProps.initialType
			})
		};*/
	},
	renderItem: function(){
		return this.props.productsData.map(function(type, i){
			var length = type.items.length;
			return type.items.map(function(item, j){
				if (j == 0) {
					this.changePoints.push({
						id: i*length + j,
						type: type.id
					});
				};
				if (j == length-1) {
					this.changePoints.push({
						id: i*length + j,
						type: type.id
					});
				};
				return <ListItem 
						key={"item-"+item.id}
						item={item}
						onChanged={this.itemOnChanged}
						uncovered={this.itemUncovered}
						activeIMG={!!this.state.activeIMGArray[i*length + j]}>
					</ListItem>
			}.bind(this));
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
			<div className="productList" ref="productList" style={style}>
					<ul>
						{this.renderItem()}
					</ul>
			</div>);
	},
	componentDidUpdate: function(){
		setTimeout(function(){
			var node = ReactDOM.findDOMNode(this);
			var height = node.firstChild.firstChild.offsetHeight;
			console.log("item height: " + height)
			this.itemHeight = height;
		}.bind(this), 250);
	},
	componentDidMount: function(){
		setTimeout(function(){
			this.iscrollList = new iScroll(this.refs.productList, this.props.options);
			this.iscrollList.on("scrollEnd", this.onScrollEnd);
			this.iscrollList.on("scroll", this.onScrolled);
			this.visibleArea = ReactDOM.findDOMNode(this).offsetHeight;
		}.bind(this), 300);
	},
	changeListType: function(type){
		console.log("changeListType");
		console.log(type);
		this.allowListener = false;
		this.iscrollList.scrollTo(0, -this.scanPointsPos(type) * this.itemHeight, 200, iScroll.utils.ease.quadratic);
		setTimeout(function(){
			this.allowListener = true;
		}.bind(this), 250);	
	},
	onScrolled: function(){
		/*var node = ReactDOM.findDOMNode(this);
		var height = node.firstChild.firstChild.offsetHeight;*/
		//console.log(Math.floor(-this.iscrollList.y / this.itemHeight));
		if(this.allowListener && this.count % 5 ==0){
			var idx = Math.floor(-this.iscrollList.y / this.itemHeight)
			//console.log(idx)
			var point = this.scanPoints(idx);

			if (this.historyPoint && point && this.historyPoint !== point) {
				console.log(point);
				this.props.alertTypeChange(point.type);
				this.historyPoint = point;
			};
			if (!this.historyPoint) {this.historyPoint = point;};	
			this.count = 0;
		}
		
		this.count ++;
		//console.log(this.iscrollList.y);
	},
	scanPoints: function(idx){
		return this.changePoints.filter(function(item){
			return (item.id == idx);
		})[0]
	},
	scanPointsPos: function(typeID){
		return this.changePoints.filter(function(item){
			return (item.type == typeID);
		})[0].id;
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
		var idx = Math.floor(-this.iscrollList.y / this.itemHeight);
		console.log(idx);
		var idxEnd = Math.floor(-(this.iscrollList.y - this.visibleArea) / this.itemHeight);
		console.log(idxEnd);
		var activeIMGArrayCopy = CloneDeep(this.state.activeIMGArray);
		while(idx != idxEnd){
			activeIMGArrayCopy[idx] = true;
			idx ++;
		}
		this.setState({
			activeIMGArray: activeIMGArrayCopy
		})
	},
	onScrollStart: function() {
    	console.log("iScroll starts scrolling")
  	},
	resetStates: function(width, shift){
		this.setState({
			blockWidth: width,
			shiftDegree: shift,
			posLeft: 0
		});
		//console.log(this.state);
	},
	toggle: function(){
		//console.log(this.state);
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

module.exports = MainProductList;