app.factory('getAuthData', [
  function() {



  	var uid = "";
    var filteredResults = [];
    return {
    	setAdminUid: function(adminUid) {
    		uid = adminUid;
    		console.log("set admin Uid to:", uid);
    	},
    	getAdminUid: function() {
    		return uid;
    	}
    }

  }
]);
