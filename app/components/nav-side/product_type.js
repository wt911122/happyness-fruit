var React = require("react");
var ReactDOM = require("react-dom")
var merge = require('lodash/merge');

var PropsMethodMixin = require("../../../mixins/PropsMethodMixin");

var ProductType = React.createClass({
	mixins: [PropsMethodMixin],
	propTypes: {
		key: React.PropTypes.string,
		identity: React.PropTypes.string.isRequired,
		name: React.PropTypes.string.isRequired,
		typeObj: React.PropTypes.object,
		onChanged: React.PropTypes.func.isRequired,
		active: React.PropTypes.bool
	},
	getInitialState: function() {
	    return {
	       checked: this.props.active
	    };
	},
	componentWillUpdate: function(){
		var node = ReactDOM.findDOMNode(this);
		this.state.checked = node.firstChild.lastChild.checked;
	},
	render: function(){
		console.log(this.props.identity);
		return(
			<li className={this.state.checked ? "active":""}>
				<label htmlFor={this.props.identity}>
					<img src={this.state.checked ? this.props.typeObj.imgURLActive :this.props.typeObj.imgURL} />
					<input className="hidden" 
						id={this.props.identity} 
						type="radio" 
						checked={this.state.checked}
						name={this.props.name} 
						onChange={this.handleChanged}/>
				</label>
			</li>
		);
	},
	handleChanged:function(e) {
		var checked = e.target.checked;
		console.log("changed");
	    //this.setState({checked: checked});

		this.props.onChanged(this.props.typeObj.id);
	},
	/*shouldComponentUpdate: function(nextProps, nextState){
		var node = ReactDOM.findDOMNode(this);
		console.log(node.firstChild.lastChild.checked, this.state.checked);
		return node.firstChild.lastChild.checked !== this.state.checked;
	}*/
});

module.exports = ProductType;