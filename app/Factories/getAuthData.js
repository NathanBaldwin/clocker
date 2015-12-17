app.factory('getAuthData', [
  function() {

  	console.log("I see getAuthData!!");

  	var uid = "";
    var filteredResults = [];
    return {
    	setAdminUid: function(adminUid) {
    		uid = adminUid;
    		console.log("set admin Uid to:", uid);
    	},
    	getAdminUid: function() {
    		return uid;
    	},
      setFilteredResults: function(filteredArray) {
        filteredResults = filteredArray;
        console.log("filteredResults: ", filteredResults);
      },
      getFilteredResults: function() {
        return filteredResults;
      }

    }

  }
]);