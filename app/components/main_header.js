var React = require("react");
var ReactDOM = require('react-dom');

var ModuleButton = require("./module_button.js");
var Searcher = require("./header/search.js");

var MainHeader = React.createClass({
	propTypes: {
		leftBtnClickHandler: React.PropTypes.func.isRequired
	},
	render: function(){
		return (
			<header className="main-header navbar navbar-static-top container">
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
		var header = ReactDOM.findDOMNode(this);

		var SearcherNode = header.firstChild.firstChild.nextSibling.firstChild;			
		SearcherNode.style.marginTop = (header.offsetHeight - SearcherNode.offsetHeight) / 2 + "px";
	},
	callForSideBar: function(event){
		console.log("toggle");
		event.preventDefault();
		this.props.leftBtnClickHandler();
	},
	toHome: function(event){
		console.log("toHome");
	}
});


module.exports = MainHeader;