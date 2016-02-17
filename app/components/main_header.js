var React = require("react");
var ReactDOM = require('react-dom');

var ModuleButton = require("./module_button.js");
var Searcher = require("./header/search.js");
var SlideAd = require("./header/slide_ad.js");

var MainHeader = React.createClass({
	propTypes: {
		leftBtnClickHandler: React.PropTypes.func.isRequired,
		layoutChanged: React.PropTypes.func,
		ad: React.PropTypes.string
	},
	render: function(){
		return (
			<header className="main-header navbar navbar-static-top container">
				<SlideAd
					content={this.props.ad}
					onClose={this.layoutChanged}>
				</SlideAd>
				<div className='container-fluid'>
					<div>
						<ModuleButton neededStyle="btn bar-btn toSideBtn" neededContent="分类" onClick={this.callForSideBar}></ModuleButton>
					</div>
         			<div>
						<Searcher></Searcher>
					</div>
					<div className="floatToRight">
						<ModuleButton neededStyle="btn bar-btn toHomeBtn" neededContent="HOME" onClick={this.toHome}></ModuleButton>
					</div>
        		</div>
			</header>);
	},
	componentDidMount: function(){
		this.refreshLayout();
	},
	refreshLayout:function(){
		var header = ReactDOM.findDOMNode(this);
		var container = header.lastChild;
		var SearcherNode = header.lastChild.firstChild.nextSibling.firstChild;	
		var leftButton = header.lastChild.firstChild;	
		var rightButton = header.lastChild.lastChild;	
		var topMargin = (container.offsetHeight - SearcherNode.offsetHeight) / 2		
		SearcherNode.style.marginTop =  (topMargin >  12 ? 10 : topMargin) + "px";
		var width = container.offsetWidth - leftButton.offsetWidth - rightButton.offsetWidth;
		console.log(width);
		console.log(leftButton.offsetWidth);
		console.log(rightButton.offsetWidth);
		SearcherNode.style.width = (width > 188 ? 188 : width) + "px";
	},
	callForSideBar: function(event){
		console.log("toggle");
		event.preventDefault();
		this.props.leftBtnClickHandler();
	},
	toHome: function(event){
		console.log("toHome");
	},
	layoutChanged: function(){
		this.props.layoutChanged();
	}
});


module.exports = MainHeader;