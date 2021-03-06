var React = require("react");
var ReactDOM = require('react-dom');
//var Ps = require('perfect-scrollbar');


var MainHeader = require("./app/components/main_header.js");
var MainFooter = require("./app/components/main_footer.js");
var MainSidebar = require("./app/components/main_sidebar.js");
var MainProductList = require("./app/components/main_product_list.js");
var ShadowPanel = require("./app/components/shadow_panel.js");
var ModalPanel = require("./app/components/modal_panel.js");
var MainIconList = require("./app/components/main_icon_list.js");
//var Cart = require("./app/components/cart.js")

var MockTypeData = require("./app/mock_types_data.js");
var ADcontent = require("./app/mock_ad_content.js");
var IconType = require("./app/mock_icon_types.js");

var MainPage = React.createClass({
	getInitialState: function(){
		return {
			data: MockTypeData,
			ADContent: ADcontent,
			iconTypes: IconType,
			activeType: 1,
			shadowZindex: -1,
			shadowVisible: false,
		}
	},	
	render: function(){
		return (
			<div>
				<MainHeader 
					ref="main_header"
					leftBtnClickHandler={this.toggleSideBar}
					layoutChanged={this.refreshLayout}
					ad={this.state.ADContent}>
				</MainHeader>
				<div>
					<MainSidebar 
						ref="main_sidebar"
						types={this.state.data}
						typeChanged={this.changeListType}
						activeType={this.state.activeType}>
					</MainSidebar>
				</div>
				<div>
					<MainIconList
						ref="main_icon_list"
						icons={this.state.iconTypes}>
					</MainIconList>
					<MainProductList 
						ref="main_product_list"
						productsData={this.state.data}
						itemUncovered={this.uncoverItem}
						itemOnChanged={this.changeCartItem}
						alertTypeChange={this.typeChanged}>
					</MainProductList>
				</div>
				<MainFooter 
					ref="main_footer"
					toggleCover={this.callShadow}>
				</MainFooter>
				<ShadowPanel
					zIndex={this.state.shadowZindex}
					visible={this.state.shadowVisible}
					onClick={this.shadowClick}>
				</ShadowPanel>
				<ModalPanel 
					ref="modal_panel" 
					changeCartItem={this.changeCartItem}
					onClosed={this.callShadow}>
				</ModalPanel>
			</div>
		);
	},
	componentDidMount: function(){
		this.refreshLayout();
	},
	refreshLayout: function(){
		var MainHeaderNode = ReactDOM.findDOMNode(this.refs.main_header);
		var MainSidebarNode = ReactDOM.findDOMNode(this.refs.main_sidebar);
		var MainFooterNode = ReactDOM.findDOMNode(this.refs.main_footer);
		var MainProductListNode = ReactDOM.findDOMNode(this.refs.main_product_list);
		var MainIconListNode = ReactDOM.findDOMNode(this.refs.main_icon_list);
		var CartNode = ReactDOM.findDOMNode(this.refs.cart_panel);

		var visibleHeight = document.documentElement.clientHeight - MainHeaderNode.offsetHeight - MainFooterNode.offsetHeight;
		var MainSidebarNodeStyles = {
			height: (visibleHeight + 10) + "px",
			top: MainHeaderNode.offsetHeight + "px"
		}
		MainSidebarNode.style.height = MainSidebarNodeStyles.height;
		MainSidebarNode.style.top = MainSidebarNodeStyles.top;

		MainIconListNode.style.left = MainSidebarNode.offsetWidth + "px";
		MainIconListNode.style.top = MainHeaderNode.offsetHeight + "px";
		MainIconListNode.style.width = document.documentElement.clientWidth - MainSidebarNode.offsetWidth + "px";
		this.refs.main_icon_list.resetStates(document.documentElement.clientWidth - MainSidebarNode.offsetWidth, MainSidebarNode.offsetWidth);

		//adjust product list layout
		var MainProductListStyle = {
			height: (visibleHeight - MainIconListNode.offsetHeight + 10) + "px",
			top: MainHeaderNode.offsetHeight + MainIconListNode.offsetHeight + "px",
			width: document.documentElement.clientWidth - MainSidebarNode.offsetWidth + "px",
			left: MainSidebarNode.offsetWidth  + "px"
		}
		MainProductListNode.style.height = MainProductListStyle.height;
		MainProductListNode.style.top = MainProductListStyle.top;
		MainProductListNode.style.width = MainProductListStyle.width;
		MainProductListNode.style.left = MainProductListStyle.left;
		this.refs.main_product_list.resetStates(document.documentElement.clientWidth - MainSidebarNode.offsetWidth, MainSidebarNode.offsetWidth);
		/*Ps.initialize(MainProductListNode, {
			suppressScrollX: false,
		});*/

		//CartNode.style.top = (document.documentElement.clientHeight - MainFooterNode.offsetHeight) + "px";
	},
	typeChanged: function(type){
		this.setState({
			activeType: type
		});
	},
	changeListType: function(type){
		this.setState({
			activeType: type
		});
		this.refs.main_product_list.changeListType(type);
	},
	toggleSideBar: function(){
		this.refs.main_sidebar.toggle();
		this.refs.main_product_list.toggle();
		this.refs.main_icon_list.toggle();
	},
	uncoverItem: function(item){
		var basket = this.refs.main_footer.checkItemInBasket(item);
		this.refs.modal_panel.callForModal(basket);
		this.callShadow({
			shadowZindex: 115,
			shadowVisible: true
		})
	},
	changeCartItem: function(paCKage){
		this.refs.main_footer.passToCart(paCKage);
	},
	callShadow: function(shadowProp){
		console.log(shadowProp);
		this.setState(shadowProp);
	},
	shadowClick: function(){
		if (this.refs.modal_panel.state.visible) this.refs.modal_panel.close();
		if (this.refs.main_footer.state.overflow === "visible"){
			this.refs.main_footer.toggleHandler();
		}
		
	},
	getTypeItems: function(){
		var array = this.state.data.filter(function(type){
			return this.state.activeType == type.id;
		}.bind(this));
		if (array.length > 1) {
			throw "raw data id error, id must be unique"
		};
		return array[0].items;
	}
})
ReactDOM.render(<MainPage></MainPage>, document.getElementById("container"));



