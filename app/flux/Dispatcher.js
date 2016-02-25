var Dispatcher = function() {
  this.handlers = [];
  this.isDispatching = false;
  this.pendingPayload = null;
}

Dispatcher.prototype.register = function(callback) {
  this.handlers.push({
    isPending: false,
    isHandled: false,
    callback: callback
  });
};

Dispatcher.prototype.dispatch = function(payload) {
  if (this.isDispatching) {
   // throw new Error("Cannot dispatch in the middle of a dispatch!");
   //延迟触发
    setTimeout(function(){
      this.dispatch(payload);
    }.bind(this), 50);
    return
  }

  // Initialize states to begin the dispatch
  this.handlers.forEach(function(handler) {
    handler.isPending = false;
    handler.isHandled = false;
  });

  this.pendingPayload = payload;
  this.isDispatching = true;

  try {
    // Invoke the handler callbacks
    this.handlers.forEach(function(handler) {
      if (!handler.isPending) {
        handler.isPending = true;
        handler.callback(payload);
        handler.isHandled = true;
      }
    })
  } finally {
    // Clean up after the dispatch
    this.pendingPayload = null;
    this.isDispatching = false;
  }
};

// The Dispatcher is a singleton, so export only the one instance.
module.exports = new Dispatcher();
