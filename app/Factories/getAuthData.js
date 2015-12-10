app.factory('getAuthData', [
  function() {

  	console.log("I see getAuthData!!");

  	var uid = "";

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