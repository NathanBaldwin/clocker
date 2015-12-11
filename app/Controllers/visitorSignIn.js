app.controller('visitorSignIn', ["$scope", "Auth", "$location", "$firebaseArray", "getAuthData",
  function($scope, Auth, $location, $firebaseArray, getAuthData) {
  	console.log("I see admin visitor sign in controller!");

  	var ref = new Firebase("https://clocker.firebaseio.com/");
		var currentAuthData = ref.getAuth();
		var adminUid = currentAuthData.uid;
		console.log("adminUid", adminUid);

		if (currentAuthData) {
  		console.log("Authenticated user with uid:", currentAuthData.uid);
		}

  	var pastVisitorsRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/visitors")

  	$scope.pastVisitorsArray = $firebaseArray(pastVisitorsRef);

  	$scope.match = [];

  	$scope.findVisitor = function() {
			$scope.pastVisitorsArray.$loaded().then(function(pastVisitorsArray) {
			console.log("pastVisitors data:", pastVisitorsArray);

			$scope.match = _.filter(pastVisitorsArray, function(visitorObj) {
					if (_.includes(visitorObj.email.toLowerCase(), $scope.email.toLowerCase())) {
						console.log("obj includes", visitorObj.email);
						return visitorObj;
					}
				});
			console.log("matching visitor object(s):", $scope.match);

			if ($scope.match.length < 1) {
				$("#noMatchModal").modal("show");
			} else {
				$("#foundMatchModal").modal("show");
			};
		})
	}

	$scope.createNewVisitor = function() {
		console.log("you clicked on create 'create new visitor'!");
		console.log("adminUid", adminUid);
	
		var newfbRef = new Firebase("https://clocker.firebaseio.com/" + adminUid +"/visitors/");
    var userData = {
    	"firstName": $scope.firstName,
    	"lastName": $scope.lastName,
    	"email": $scope.email
    }
  
    /// sets the new visitor data object to the firebase database ///
    newfbRef.push(userData)
  
  };

  $scope.createNewActivity = function() {
		console.log("you clicked on create 'create new Activity'!");
		console.log("adminUid", adminUid);
	
		var newfbRef = new Firebase("https://clocker.firebaseio.com/" + adminUid +"/activityLog/");
    var firstMatch = $scope.match[0];
    console.log("firstMatch", firstMatch);

    var newActivity = {
    	"firstName": firstMatch.firstName,
    	"lastName": firstMatch.lastName,
    	"email": firstMatch.email,
    	"visitorId": firstMatch.$id,
    	"group": $scope.group,
    	"activity": $scope.activity
    }

    console.log("newActivity", newActivity);
  
    / sets new activity data object to the firebase database ///
    newfbRef.push(newActivity);
  
  };

}]);