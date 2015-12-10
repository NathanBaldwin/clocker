app.controller('visitorSignIn', ["$scope", "Auth", "$location", "$firebaseArray", "getAuthData",
  function($scope, Auth, $location, $firebaseArray, getAuthData) {
  	console.log("I see admin visitor sign in controller!");



  	var adminUid = getAuthData.getAdminUid();
  	console.log("adminUid", adminUid);


  	var pastVisitorsRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/visitors")

  	$scope.pastVisitorsArray = $firebaseArray(pastVisitorsRef);
  	$scope.email = "";

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
				alert("no match found");
			} else {
				$("#foundMatchModal").modal("show");
			};


		})

	}

			// var fullName = "";

			// var pastVisNames = pastVisitorArray.map(function(visitorObject) {
			// 	var firstName = visitorObject.firstName;
			// 	var lastName = visitorObject.lastName;
			// 	fullName = firstName + " " + lastName;

			// 	return fullName;
			// });
			// console.log("pastVisNames", pastVisNames);
			// var match = pastVisNames.filter(function() {
			// 	return 
			// })

			// if (pastVisNames) {
			// 	$("#foundMatchModal").modal("show");


			// } else {
			// 	alert("no match found");
			// }; 	
  
}]);