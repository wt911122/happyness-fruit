var React = require("react");
var ReactDOM = require("react-dom");
var update = require("react/lib/update");

var ShopActions = require("../flux/ShopActions.js");
var ShopStore = require("../flux/ShopStore.js");

var SideNav = require("./content/side_nav.js");
var MainContent = require("./content/main_content.js")


var MainContentCtrl = React.createClass({
	getInitialState: function(){
		return {
			translateY: 0,
			translateX: 0,
			contentHeight: document.documentElement.offsetHeight - 80,
			listWidth: document.documentElement.offsetWidth - 115,
			dataReady: false,
			active: 0,
			data: [],			
		}
	},
	handleHeaderADReady: function(data){
		console.log(data);
		if (data !== "") {
			this.setState({
				translateY: 34,
				contentHeight: document.documentElement.offsetHeight - 114
			})
		};
		setTimeout(function(){
			ShopActions.requestData({
				url: "app/mock_data.json",
				args: ""
			})
		}, 1000);
		
	},
	handleDataReady: function(data){
		//console.log(data);
		this.setState({
			dataReady: true,
			data: data,
			active: data[0].id
		});
	},
	handleADAlterd: function(data){
		if (!data.state) {
			this.setState({
				translateY: 0,
				contentHeight: document.documentElement.offsetHeight - 80
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
	componentDidMount: function() {
		ShopStore.addADReadyListener(this.handleHeaderADReady);
		ShopStore.addDataReadyListener(this.handleDataReady);
		ShopStore.addADAlterdListener(this.handleADAlterd);
		ShopStore.addSideBarToggleListener(this.handleSideBarToggle)
	},
	shouldComponentUpdate: function(nextProps, nextState){
		return (nextState.translateX !== this.state.translateX) || 
			   (nextState.translateY !== this.state.translateY) ||
			   (nextState.dataReady !== this.state.dataReady)   ||     
			   (nextState.active !== this.state.active)       
	},
	updateStyles: function(){
		this.translate = {	
			transform: "translateY("+this.state.translateY + "px)" + " translateX("+this.state.translateX + "px)",
			WebkitTransform: "translateY("+this.state.translateY + "px)" + " translateX("+this.state.translateX + "px)",
		}
		this.contentHeight = {
			height: this.state.contentHeight + "px"
		}
		this.listWidth = {
			width: this.state.listWidth + "px"
		}
	},
	render: function(){

		if (!this.state.dataReady) {
			return  (<div className="main-content">
						<div className="loading">
						</div>
					</div>)
		};
		this.updateStyles();
		return (<div className="main-content">
					<SideNav 
						outterStyle={update(this.contentHeight,{$merge:this.translate})}
						active={this.state.active} 
						data={this.state.data} 
						activeChanged={this.activeChanged}/>
					<MainContent 
						outterStyle={update(update(this.contentHeight,{$merge:this.translate}), {$merge: this.listWidth})}
						data={this.state.data} 
						active={this.state.active}
						activeChanged={this.activeChanged}/>
				</div>);
	},
	componentWillUnmount: function() {
		ShopStore.removeADReadyListener(this.handleHeaderADReady);
		ShopStore.removeDataReadyListener(this.handleDataReady);
	},
	activeChanged: function(id){
		this.setState({
			active: id
		})
	}
});

module.exports = MainContentCtrl;