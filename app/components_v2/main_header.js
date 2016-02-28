var React = require("react");
var ReactDOM = require('react-dom');

var ModuleButton = require("./module_button.js");

var ShopActions = require("../flux/ShopActions.js");

var MainHeader = React.createClass({
	propTypes: {
		advertise: React.PropTypes.string
	},
	getInitialState: function(){
		return {
			advertise: this.props.advertise,
			showAD: false
		}
	},
	componentWillReceiveProps: function(nextProps){
		if (nextProps.advertise !== this.state.advertise) {
			this.setState({
				advertise: nextProps.advertise,
				showAD: true
			});
		};
	},
	render: function(){
		return (
			<header className="main-header">
				<div className="advertise" ref="ad_content">
					<div className="content">
						<div className="slider">{this.state.advertise}</div>
					</div>
					<ModuleButton outterStyle="touchArea" innerStyle="close" innerContent="" onClick={this.closeAD}/>
				</div>
				<div className='navbar'>
					<ModuleButton outterStyle="btn bar-btn toSideBtn" innerStyle="" innerContent="分类" onClick={this.callForSideBar}></ModuleButton>
					<form onSubmit={this.onBlur}>
						<input ref="searcher" type="search" className="searcher" placeholder="搜索您想找的商品"/>
					</form>
					<ModuleButton outterStyle="btn bar-btn toHomeBtn" innerStyle="" innerContent="" onClick={this.toHome}></ModuleButton>
        		</div>
			</header>);
	},
	/*shouldComponentUpdate: function(){
		return 
	},*/
	componentDidUpdate: function(){
		if (this.state.showAD) {
			ReactDOM.findDOMNode(this).classList.add("active");
		}else{
			ReactDOM.findDOMNode(this).classList.remove("active");
		}
		this.props.onADAltered(this.state.showAD);

	},
	componentDidMount: function(){
		ShopActions.requestAD({
			url: "app/mock_ad_content.js",
			args: ""
		})
	},
	callForSideBar: function(event){
		event.preventDefault();
		console.log("callForSideBar");
		ShopActions.toggleSideBar();
	},
	toHome: function(event){
		console.log("toHome");
	},
	closeAD: function(){
		this.refs.searcher.blur();
		setTimeout(function(){
			this.setState({
				showAD: false
			});
			ShopActions.alterAD(false);
		}.bind(this), 300);

	},
	onBlur: function(event){
		event.preventDefault();
		ShopActions.filterItem(ReactDOM.findDOMNode(this.refs.searcher).value.trim());
	}
});


module.exports = MainHeader;