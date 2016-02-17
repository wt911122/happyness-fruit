var React = require("react");
var ReactDOM = require("react-dom")
var merge = require('lodash/merge');

var PropsMethodMixin = require("../../../mixins/PropsMethodMixin");

var ProductType = React.createClass({
	mixins: [PropsMethodMixin],
	propTypes: {
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
	componentWillReceiveProps: function(nextProps){
		if (nextProps.active !== this.state.checked) {
			console.log(this.props.identity);
			this.setState({
				checked: nextProps.active
			});		
		};
	},
	render: function(){
		return(
			<li key={this.props.identity} className={this.state.checked ? "active":""} onClick={this.handleChanged}>
				<img src={this.state.checked ? this.props.typeObj.imgURLActive :this.props.typeObj.imgURL} />
			</li>
		);
	},
	handleChanged:function(e) {
		e.stopPropagation();
		console.log("changed");
	    //this.setState({checked: checked});
		this.props.onChanged(this.props.typeObj.id);
	},
});

module.exports = ProductType;