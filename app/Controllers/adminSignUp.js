app.controller('adminSignUp', ["$scope", "Auth", "$location", "$firebaseAuth",
  function($scope, Auth, $location, $firebaseAuth) {
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
		    	"userId": uid,
		    	"firstName": $scope.firstName,
		    	"lastName": $scope.lastName,
		    	"email": $scope.email,
		    	"password": $scope.password
		    };
		    /// sets the new user data object to the firebase database ///
		    newfbRef.push(userData);
		    //$scope.login();
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
          $location.path("/clocker/main/");
          $scope.$apply();
		    	console.log("Logged user in with payload:", authData);
          
		  	}
			});
	  }


  	
  
}]);