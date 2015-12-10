/// this module allows the user to log in/register with email and password for the website ///

app.controller('login', ["$scope", "Auth", "getAuthData", "$location", "$firebaseAuth", 
  function($scope, Auth, getAuthData, $location, $firebaseAuth) {
  	console.log("I see login!!");

    var ref = new Firebase("https://clocker.firebaseio.com/");
    /// if user has already registered, this allows them to log in without complications ///
    $scope.login = function() {
    	console.log("you clicked login!");
			ref.authWithPassword({
	  		email    : $scope.email,
	  		password : $scope.password
			}, function(error, authData) {
		  	if (error) {
		    	console.log("Login Failed!", error);
		  	} else {

		  	console.log("authData.uid:", authData.uid);
		    var adminUid = authData.uid;
		    getAuthData.setAdminUid(adminUid);	
        $location.path("/clocker/visitorsignin/");
        $scope.$apply();
		    	
          
		  	}
			});
	  }
  
}]);