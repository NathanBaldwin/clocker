app.controller('backend-activity', ["$scope", "Auth", "$location", "$firebaseArray", "getAuthData", "$firebaseObject",
  function($scope, Auth, $location, $firebaseArray, getAuthData, $firebaseObject) {
  	console.log("I see backend-activity controller!");

  var ref = new Firebase("https://clocker.firebaseio.com/");
	var currentAuthData = ref.getAuth();
	var adminUid = currentAuthData.uid;
	var pastVisitorsRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/visitors");
	var activityLogRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/activityLog");
	console.log("adminUid", adminUid);

	$scope.activityLogArray = $firebaseArray(activityLogRef);

	//total visitors/people:

	var visitorsArray = $firebaseArray(pastVisitorsRef);

	visitorsArray.$loaded().then(function(returnedVisitorsArray) {
		console.log("Visitors Array: ", returnedVisitorsArray);
		$scope.visitorsSum = returnedVisitorsArray.length;
		console.log("$scope.visitorsSum", $scope.visitorsSum);

	})

	//total hours:

	$scope.activityLogArray.$loaded().then(function(returnedActivityArray) {
		console.log("returnedActivityArray", returnedActivityArray);

		var secondsArray = returnedActivityArray.map(function(activity) {
			return activity.totalSecs;
		})

		console.log("secondsArray", secondsArray);

		var filteredArray = _.pull(secondsArray, undefined);
		console.log("filteredArray", filteredArray);

		var secondsSum = filteredArray.reduce(function(prevVal, currentVal) {
			return prevVal + currentVal;
		})

		console.log("secondsSum", secondsSum);

		$scope.totalHours = Number(Math.round((secondsSum / 3600)+'e2') +'e-2'); 
		console.log("$scope.totalHours", $scope.totalHours);
	})

	//total Groups:

	$scope.activityLogArray.$loaded().then(function(returnedActivityArray) {
		console.log("returnedActivityArray", returnedActivityArray);

		var allGroups = returnedActivityArray.map(function(activity) {
			return activity.group;
		})

		console.log("allGroups", allGroups);
		var uniqueGroups = _.uniq(allGroups);
		console.log("uniqueGroups", uniqueGroups);

		$scope.totalGroups = uniqueGroups.length;

		})

	//total Events:

	$scope.activityLogArray.$loaded().then(function(returnedActivityArray) {
		console.log("returnedActivityArray", returnedActivityArray);

		var allEvents = returnedActivityArray.map(function(activity) {
			return activity.activity;
		})

		console.log("allEvents", allEvents);
		var uniqueEvents = _.uniq(allEvents);
		console.log("uniqueEvents", uniqueEvents);

		$scope.totalEvents = uniqueEvents.length;

		})



}]);