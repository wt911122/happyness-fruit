var React = require("react");
var ReactDOM = require("react-dom");
var update = require("react/lib/update");
var Immutable = require("immutable");

var ShopActions = require("../flux/ShopActions.js");
var ShopStore = require("../flux/ShopStore.js");

var SideNav = require("./content/side_nav.js");
var MainContent = require("./content/main_content.js");
var MainIconList = require("./content/main_icon_list.js");

var MainContentCtrl = React.createClass({
	getInitialState: function(){
		return {
			translateY: 0,
			translateX: 0,
			sideHeight: document.documentElement.offsetHeight - 80,
			contentHeight: document.documentElement.offsetHeight - 116,
			listWidth: document.documentElement.offsetWidth - 115,
			dataReady: false,
			iconDataReady: false,
			filtered: false,
			active: 0,
			data: [],
			iconData: [],

			loadingStates: {},
			invisibleStates: {},		
		}
	},
	handleHeaderADReady: function(data){
		console.log(data);
		if (data !== "") {
			this.setState({
				translateY: 34,
				sideHeight: document.documentElement.offsetHeight - 114,
				contentHeight: document.documentElement.offsetHeight - 150,
			})
		};

		ShopActions.requestData({
			url: "app/mock_data2.json",
			args: ""
		});
		ShopActions.requestIcon({
			url: "app/mock_icon_types.json",
			args: ""
		})
	},
	handleDataReady: function(data){
		var count = data.map(function(obj){
			return obj.items.length
		}).reduce(function(prev, cur, index, array){
			return prev + cur; 
		});
		console.log(count)
		this.setState({
			dataReady: true,
			data: data,
			loadingStates: Immutable.List(Immutable.Repeat(false, count)).map(function(element, i){if (i < 5) {return true;}else{return false;}}),
			invisibleStates: Immutable.List(Immutable.Repeat(false, count)),
			active: data[0].id
		});
	},
	handleIconListReady: function(data){
		this.setState({
			iconDataReady: true,
			iconData: data
		});
	},
	handleADAlterd: function(data){
		if (!data.state) {
			this.setState({
				translateY: 0,
				contentHeight: document.documentElement.offsetHeight - 116,
				sideHeight: document.documentElement.offsetHeight - 80,
			})
		};
	},
	handleSideBarToggle: function(){
		var state = (this.state.translateX === 0);
		console.log("toggle" + state)
		this.setState({
			translateX: (state? -115: 0),
			listWidth: (state? document.documentElement.offsetWidth: document.documentElement.offsetWidth - 115),
		});
	},
	handleItemFilter: function(filter){
		if (filter === "") {
			this.setState(function (preState){
				var newinvisibleStates = preState.invisibleStates.map(function(element){
					return false;
				});
				return{
					invisibleStates: newinvisibleStates
				}
			})
		}else{
			var counter = 0;
			var trueCounter = 0;
			this.setState(function (preState){
				var newinvisibleStates = preState.invisibleStates;
				var newloadingStates = preState.loadingStates;
				this.state.data.forEach(function(dataItem, idx){
					dataItem.items.map(function(item){
						if (item.title.indexOf(filter) > -1) {
							newinvisibleStates = newinvisibleStates.set(counter, false);
							if (trueCounter< 6) {
								console.log(counter);
								newloadingStates = newloadingStates.set(counter, true);
							};
							trueCounter++;
						}else{
							newinvisibleStates = newinvisibleStates.set(counter, true);

						}
						counter ++;
					});
				});
				console.log(newinvisibleStates.toArray());
				console.log(newloadingStates.toArray());
				return {
					invisibleStates: newinvisibleStates,
					loadingStates: newloadingStates
				}
			}.bind(this));
			
			/*var data = this.state.dataCopy.map(function(dataItem){
				var obj = {};
				for(prop in dataItem){
					if (dataItem.hasOwnProperty(prop) && prop !== "items" ) {
						obj[prop] = dataItem[prop];
					};
				}
				obj.items = dataItem.items.filter(function(item){
					return item.title.indexOf(filter) > -1;
				});
				return obj;
			});
			this.setState({
				filtered: true,
				data: data
			})*/
		}
	},
	componentDidMount: function() {
		ShopStore.addADReadyListener(this.handleHeaderADReady);
		ShopStore.addDataReadyListener(this.handleDataReady);
		ShopStore.addIconDataReadyListener(this.handleIconListReady);
		ShopStore.addADAlterdListener(this.handleADAlterd);
		ShopStore.addSideBarToggleListener(this.handleSideBarToggle);
		ShopStore.addFilterItemListener(this.handleItemFilter);
		
	},
	shouldComponentUpdate: function(nextProps, nextState){
		return (nextState.translateX !== this.state.translateX)       || 
			   (nextState.translateY !== this.state.translateY)       ||
			   (nextState.dataReady !== this.state.dataReady)         ||   
			   (nextState.iconDataReady !== this.state.iconDataReady) ||  
			   (nextState.active !== this.state.active)               ||
			   (nextState.loadingStates !== this.state.loadingStates) ||
			   (nextState.invisibleStates !== this.state.invisibleStates) 		
	},
	updateStyles: function(){
		this.translate = {	
			transform: "translateY("+this.state.translateY + "px)" + " translateX("+this.state.translateX + "px)",
			WebkitTransform: "translateY("+this.state.translateY + "px)" + " translateX("+this.state.translateX + "px)",
		}
		this.sideHeight = {
			height: this.state.sideHeight + "px"
		}
		this.contentHeight = {
			height: this.state.contentHeight + "px"
		}
		this.listWidth = {
			width: this.state.listWidth + "px"
		}
	},
	render: function(){
		//console.log(this.state.dataReady , this.state.iconDataReady );
		if (!this.state.dataReady || !this.state.iconDataReady) {
			return  (<div className="main-content">
						<div className="loading">
						</div>
					</div>)
		};
		this.updateStyles();

		return (<div className="main-content">
					<SideNav 
						outterStyle={update(this.sideHeight,{$merge:this.translate})}
						active={this.state.active} 
						data={this.state.data} 
						activeChanged={this.activeChanged}/>
					<MainIconList 
						outterStyle={update(this.listWidth,{$merge:this.translate})}
						iconData={this.state.iconData}/>
					<MainContent 
						outterStyle={update(update(this.contentHeight,{$merge:this.translate}), {$merge: this.listWidth})}
						data={this.state.data}
						loadingStates={this.state.loadingStates} 
						invisibleStates={this.state.invisibleStates}
						active={this.state.active}
						activeChanged={this.activeChanged}
						filtered={this.state.filtered}
						requestLoadingIMG={this.prepareLoadingIMG}/>
				</div>);
	},
	componentWillUnmount: function() {
		ShopStore.removeADReadyListener(this.handleHeaderADReady);
		ShopStore.removeDataReadyListener(this.handleDataReady);
		ShopStore.removeIconDataReadyListener(this.handleIconListReady);
		ShopStore.removeADAlterdListener(this.handleADAlterd);
		ShopStore.removeSideBarToggleListener(this.handleSideBarToggle);
		ShopStore.removeFilterItemListener(this.handleItemFilter);
	},
	activeChanged: function(id){
		this.setState({
			active: id
		})
	},
	prepareLoadingIMG: function(idxArr){
		//console.log(idx, idxEND);
		this.setState(function (preState){
			var newloadingStates = preState.loadingStates.map(function(element, i){
				if (idxArr.some(function(idx){return i == idx})) return true;
				return element
			})
			
			//console.log(newloadingStates.toArray());
			return {
				loadingStates: newloadingStates
			}
		})
	}
});

module.exports = MainContentCtrl;