app.controller('visitorSignIn', ["$scope", "Auth", "$location", "$firebaseArray", "getAuthData",
  function($scope, Auth, $location, $firebaseArray, getAuthData) {
  	console.log("I see admin visitor sign in controller!");



  	var adminUid = getAuthData.getAdminUid();
  	console.log("adminUid", adminUid);


  	var pastVisitorsRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/visitors")

  	$scope.pastVisitorsArray = $firebaseArray(pastVisitorsRef);

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

}]);