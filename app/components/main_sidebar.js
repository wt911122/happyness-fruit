var React = require("react");
var ReactDOM = require("react-dom")


var ProductType = require("./nav-side/product_type.js");

var uniqueId = require('lodash/uniqueId');


var MainSidebar = React.createClass({
	propTypes:{
		types: React.PropTypes.array.isRequired
	},
	getInitialState: function(){
		return {
			id: uniqueId('multiple-type-'),
			activeType: 1,
			position: 0
		}
	},
	resolveAnimationFrame: function(){
		var timestamp = new Date();
		var timeRemain = Math.max(0, this.props.anin)
	},
	componentWillUpdate: function(){

	},
	renderItems: function(){
		return this.props.types.map(function(type, i){
			console.log("renderItems:"+(type.id == this.state.activeType));
			return <ProductType
						key={"type-"+type.id} 
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
	handleChanged: function(props){
		this.forceUpdate();
		console.log(props);
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