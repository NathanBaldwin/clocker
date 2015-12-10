/// this module allows the user to log in/register with email and password for the website ///

app.controller('login', ["$scope", "Auth", "$location", "$firebaseAuth",
  function($scope, Auth, $location, $firebaseAuth) {
  	console.log("I see login!!");

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
        var newfbRef = new Firebase("https://clocker.firebaseio.com/users/" + uid);
		    var userData = {
		    	"user": uid,
		    	"email": $scope.email,
		    	"password": $scope.password
		    };
		    /// sets the new user data object to the firebase database ///
		    newfbRef.set(userData);
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
          $location.path("/clocker/main/");
          $scope.$apply();
		    	console.log("Logged user in with payload:", authData);
          
		  	}
			});
	  }
  
}]);