var React = require("react");

var Searcher = React.createClass({
	render: function(){
		return (<input 
				type="search"
				className="searcher"
				placeholder="搜索您想找的商品"
				></input>);
	}
});

module.exports = Searcher;