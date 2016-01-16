/// this module allows the user to log in/register with email and password for the website ///

app.controller('login', ["$scope", "getAuthData", "$location", "$firebaseAuth", 
  function($scope, getAuthData, $location, $firebaseAuth) {
  	console.log("I see login!!");

    var ref = new Firebase("https://clocker.firebaseio.com/");
    /// if user has already registered, this allows them to log in without complications on click of 'login' button///
    $scope.login = function() {
    	console.log("you clicked login!");

      //calling Firebase's authWithPassword method and passing it user's specified email and password to start authentication process:
			ref.authWithPassword({
	  		email    : $scope.email,
	  		password : $scope.password
			},
      function(error, authData) {
        //if authentication fails, error message is returned from Firebase and handeled here:
		  	if (error) {
		    	console.log("Login Failed!", error);
        //if authentication is successful, auth data object for user is returned from Firebase and handeled here:
		  	} else {
		  	//get user's id and store in 'getAuthData' factory, to be used by other controllers:
		    var adminUid = authData.uid;
		    getAuthData.setAdminUid(adminUid);

        //on success of authentication, load visitor sign in view, which will be populated with user's data stored in firebase:
        $location.path("/clocker/visitorsignin/");
        $scope.$apply();
          
		  	}
			});
	  }
  
}]);
