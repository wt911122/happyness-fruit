var EventEmitter = require("event-emitter");
var AD_READY_EVENT = "ADReadyEvent";
var AD_ALTER_EVENT = "ADAlterEvent";

var ShopStore = function() {
  this.emitter = new EventEmitter();
};


ShopStore.prototype.error = function(data){
  console.log(2, 'error', data);
}
// Basic event handling functions
// ------------- Advertisement block -----------------
ShopStore.prototype.emitADReady = function(data) {
    this.emitter.emit(AD_READY_EVENT, data);
};

ShopStore.prototype.addADReadyListener = function(callback) {
    this.emitter.on(AD_READY_EVENT, callback);
};

ShopStore.prototype.removeADReadyListener = function(callback) {
    this.emitter.removeListener(AD_READY_EVENT, callback);
};

ShopStore.prototype.requestAD = function(req){
  this.$http(req.url)
      .post(req.args)
      .then(this.emitADReady.bind(this))
     // .catch(this.error)
}
// ----------------------------------------------------------

// ------------- ADAlterd block -----------------
ShopStore.prototype.emitADAlterd = function(state) {
    this.emitter.emit(AD_ALTER_EVENT, state);
};

ShopStore.prototype.addADAlterdListener = function(callback) {
    this.emitter.on(AD_ALTER_EVENT, callback);
};

ShopStore.prototype.removeADAlterdListener = function(callback) {
    this.emitter.removeListener(AD_ALTER_EVENT, callback);
};

ShopStore.prototype.AdAlterd = function(state){
    this.emitADAlterd(state);
}
// ----------------------------------------------------------


/*SurveyStore.prototype.saveSurvey = function(survey) {
  console.debug("TODO: fire XHR to persist survey, then invoke this.emitChange() after the XHR has completed.");

  this.emitChange();
}

SurveyStore.prototype.deleteSurvey = function(id) {
  console.debug("TODO: delete survey", id);

  this.emitChange();
}

SurveyStore.prototype.recordSurvey = function(results) {
  console.debug("TODO: record the survey results", results);

  this.emitChange();
}

SurveyStore.prototype.listSurveys = function(callback) {
  console.debug("TODO: fetch surveys from server via XHR");

  callback([]);
}

SurveyStore.prototype.getSurvey = function(id) {
  console.debug("TODO: fetch survey by id from server via XHR");

  callback({});
}*/

ShopStore.prototype.$http = function(url){
  // A small example of object
  var core = {

    // Method that performs the ajax request
    ajax : function (method, url, args) {

      // Creating a promise
      var promise = new Promise( function (resolve, reject) {

        // Instantiates the XMLHttpRequest
        var client = new XMLHttpRequest();
        var uri = url;

        if (args && (method === 'POST' || method === 'PUT')) {
          uri += '?';
          var argcount = 0;
          for (var key in args) {
            if (args.hasOwnProperty(key)) {
              if (argcount++) {
                uri += '&';
              }
              uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
            }
          }
        }

        client.open(method, uri);
        client.send();

        client.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            // Performs the function "resolve" when this.status is equal to 2xx
            console.log(this.response);
            resolve(this.response);
          } else {
            // Performs the function "reject" when this.status is different than 2xx
            reject(this.statusText);
          }
        };
        client.onerror = function () {
          reject(this.statusText);
        };
      });

      // Return the promise
      return promise;
    }
  };

  // Adapter pattern
  return {
    'get' : function(args) {
      return core.ajax('GET', url, args);
    },
    'post' : function(args) {
      return core.ajax('POST', url, args);
    },
    'put' : function(args) {
      return core.ajax('PUT', url, args);
    },
    'delete' : function(args) {
      return core.ajax('DELETE', url, args);
    }
  };
};
// The SurveyStore is a singleton, so export only the one instance.
module.exports = new ShopStore();
