app.controller('adminSignUp', ["$scope", "Auth", "$location", "$firebaseAuth", "getAuthData",
  function($scope, Auth, $location, $firebaseAuth, getAuthData) {
  	console.log("I see admin Sing Up!!");

  	$scope.createNewUser = function() {
			console.log("went to create new user");
			Auth.$createUser({
			  email    : $scope.email,
			  password : $scope.password
			}).then(function(authData) {
			  console.log("authData", authData);
			  var uid = authData.uid;
      	console.log("user created. User id:", authData.uid);
        $scope.message = "User created with uid: " + authData.uid;
        var newfbRef = new Firebase("https://clocker.firebaseio.com/" + uid +"/users/");
		    var userData = {
		    	"org": $scope.orgName,
		    	"userId": uid,
		    	"firstName": $scope.firstName,
		    	"lastName": $scope.lastName,
		    	"email": $scope.email,
		    	"password": $scope.password
		    };
		    /// sets the new user data object to the firebase database ///
		    newfbRef.push(userData);
		    $scope.login();
      }).catch(function(error) {
        $scope.error = error;
      });
    };

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