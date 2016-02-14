var CartWorker = function(paCKage){
	if (paCKage === void 0) {
		throw "package needed";
	};
	if (paCKage.amount === void 0) {
		throw "amount needed";
	};
	if (paCKage.operation === void 0){
		throw "operation needed";
	};
	if (paCKage.item === void 0) {
		throw "item needed";
	};
	return {
		getAmount: function(){
			return paCKage.amount;
		},
		getItem: function(){
			return paCKage.item;
		},
		getOperation: function(){
			return paCKage.operation;
		}
	}
}
	
module.exports = CartWorker;
