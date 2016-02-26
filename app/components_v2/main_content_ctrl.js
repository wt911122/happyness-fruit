var React = require("react");
var ReactDOM = require("react-dom");
var update = require("react/lib/update");

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
			dataCopy: [],			
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
			url: "app/mock_data.json",
			args: ""
		});
		ShopActions.requestIcon({
			url: "app/mock_icon_types.json",
			args: ""
		})
	},
	handleDataReady: function(data){
		//console.log(data);
		this.setState({
			dataReady: true,
			data: data,
			dataCopy: data,
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
				contentHeight: document.documentElement.offsetHeight - 116
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
			this.setState({
				filtered: false,
				data: this.state.dataCopy
			})
		}else{
			var data = this.state.dataCopy.map(function(dataItem){
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
			})
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
			   (nextState.data !== this.state.data)                   ||
			   (nextState.active !== this.state.active)       
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
						active={this.state.active}
						activeChanged={this.activeChanged}
						filtered={this.state.filtered}/>
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
	}
});

module.exports = MainContentCtrl;