var React = require("react");

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
			backgroundPosition: (this.state.active? this.props.item.active: this.props.item.normal),
			borderBottomColor: (this.state.active?"#da1028":"#b5b5b6")
		}
		return (<li onTouchEnd={this.onTouched} onTouchStart={this.onTouchStart}>
					<div className="image" style={style}></div>
				</li>)
	},
	onTouchStart: function(e){
		event.stopPropagation();
		event.preventDefault();
		this.touchY = e.touches[0].clientY;
	},
	onTouched: function(e){
		event.stopPropagation();
		event.preventDefault();
		var deltaY = e.changedTouches[0].clientY - this.touchY;
		if (Math.abs(deltaY == 0)) {
			this.props.onTouched(this.props.item.id);
		};
		
	}
});

var SideNav = React.createClass({
	propTypes:{
		active: React.PropTypes.number,
		data: React.PropTypes.array,
		outterStyle: React.PropTypes.object
	},
	getInitialState: function(){
		return {
			data: this.props.data,
			active: this.props.active,
			outterStyle: this.props.outterStyle
		}
	},
	componentWillReceiveProps: function(nextProps){
		if (nextProps.active !== this.state.active) {
			this.setState({
				active: nextProps.active
			})
		};
		if (nextProps.outterStyle !== this.state.outterStyle) {
			this.setState({
				outterStyle: nextProps.outterStyle
			})
		};
	},
	renderItem: function(){
		
		return this.state.data.map(function(item, idx){
			return <Item 
				key={item.id} 
				item={item} 
				active={this.state.active === item.id}
				onTouched={this.onTouched}/>
		}.bind(this));
	},
	render: function(){
		return (<div className="sideBar" style={this.state.outterStyle}>
				<ul>
					{this.renderItem()}
				</ul>
			</div>)
	},
	onTouched: function(id){
		this.props.activeChanged(id);
	}
});

module.exports = SideNav;