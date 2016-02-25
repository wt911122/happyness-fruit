var React = require("React");

var Item = React.createClass({
	propTypes: {
		item: React.PropTypes.object,
		active: React.PropTypes.bool
	},
	getInitialState: function(){
		return {
			active: this.props.active
		}
	},
	componentWillReceiveProps: function(nextProps){
		if (nextProps.active !== this.state.active) {
			this.setState({
				active: nextProps.active
			})
		};
	},
	render: function(){
		var style = {
			backgroundImage:"url("+this.props.item.imgURL+")",
			backgroundPosition: (active? this.props.item.active: this.props.item.normal)
		}
		return (<li onTouchEnd={this.onTouched}>
					<div className="image" style={style}></div>
				</li>);
	},
	onTouched: function(event){
		event.stopPropagation();
		event.preventDefault();
		this.props.onTouched(this.props.item.id);
	}
});
module.exports = Item;