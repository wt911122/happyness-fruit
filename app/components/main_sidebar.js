var React = require("react");
var ReactDOM = require("react-dom");
var iScroll = require('iscroll/build/iscroll-probe');


var ProductType = require("./nav-side/product_type_v2.js");

var uniqueId = require('lodash/uniqueId');


var MainSidebar = React.createClass({
	propTypes:{
		types: React.PropTypes.array.isRequired,
		typeChanged: React.PropTypes.func,
		activeType: React.PropTypes.number
	},
	getDefaultProps: function() {
	    return ({
	      options: {
	        mouseWheel: true,
	        scrollbars: false,
	        eventPassthrough: true,
	        probeType: 1
	      }
	    })
  	},
	getInitialState: function(){
		return {
			id: uniqueId('multiple-type-'),
			activeType: this.props.activeType,
			position: 0
		}
	},
	componentWillReceiveProps: function(nextProps){
		console.log("MainSidebar");
		console.log(nextProps);
		if (nextProps.activeType !== this.state.activeType) {
			this.setState({
				activeType: nextProps.activeType
			})
		};
	},
	renderItems: function(){
		return this.props.types.map(function(type, i){
			var key = "type-"+type.id;
			return <ProductType 
						key={key}
						identity={key} 
						name={this.state.id} 
						typeObj={type} 
						active={type.id == this.state.activeType} 
						onChanged={this.handleChanged}>
					</ProductType>
		}.bind(this));
	},
	render: function(){
		var navStyle = {
			transform: "translateX("+this.state.position + "px)",
			WebkitTransform:"translateX("+this.state.position + "px)",
			msTransform:"translateX("+this.state.position + "px)"
		};
		console.log(navStyle);
		return (<nav className="sideNAV" style={navStyle}>
				<ul>
					{this.renderItems()}
				</ul>
			</nav>);
	},	
	componentDidMount: function(){
		setTimeout(function(){
			this.iscrollList = new iScroll(ReactDOM.findDOMNode(this), this.props.options);
		}.bind(this), 300);
	},
	handleChanged: function(typeID){
		this.props.typeChanged(typeID);
	},
	toggle: function(){
		var node = ReactDOM.findDOMNode(this);
		var shift = node.offsetWidth;
		if(this.state.position == 0) 
			this.setState({
				position: -shift
			});
		else 
			this.setState({
				position: 0
			});
		console.log(this.state)
	}
});

module.exports = MainSidebar;