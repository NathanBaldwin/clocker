	// app.filter('afterDateFilter', function(){
	//   return function(input, timeIn){
	//   	console.log("afterDate input", input);
	//     var out = [];
	//     angular.forEach(input, function(activity){
	//       if(moment(activity.in).isAfter(timeIn)){
	//         out.push(activity)
	//       }
	//     })
	//     console.log("afterDate out:", out);
	//     return out;
	//   }
	// })

	// app.filter('beforeDateFilter', function(){
	//   return function(input, timeIn){
	//   	console.log("beforeDate input", input);
	//     var out = [];
	//     angular.forEach(input, function(activity){
	//       if(moment(activity.in).isBefore(timeIn)){
	//         out.push(activity)
	//       }
	//     })
	//   	console.log("beforeDate out:", out);
	//     return out;
	//   }
	// })

	// app.filter('resultsCatcher', function(){
	//   return function(input){
	//   	console.log("resultsCatcher input", input);
	    
	//     return input;
	//   }
	// })

app.controller('backend-activity', ["$scope", "Auth", "$location", "$firebaseArray", "getAuthData", "$firebaseObject",
  function($scope, Auth, $location, $firebaseArray, getAuthData, $firebaseObject) {
  	console.log("I see backend-activity controller!");

  var ref = new Firebase("https://clocker.firebaseio.com/");
	var currentAuthData = ref.getAuth();
	var adminUid = currentAuthData.uid;
	var pastVisitorsRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/visitors");
	var activityLogRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/activityLog");
	console.log("adminUid", adminUid);

	//Start-date Picker functionality:

	var startDate = "";

	var convertDate = function(oldFormat) {

		return $.datepicker.formatDate("yy-mm-dd", oldFormat).toString();

	};

	//$scope.filteredResults = getAuthData.getFilteredResults();
	//$scope.filteredResults = resultsCatcher;

	$scope.filteredResults = [];
	$scope.filteredSum = 0;

	$scope.$watch(function() {
  	console.log("new filteredResults", $scope.filteredResults);
  	var sum = 0;

  	//total hours calc:
  	$scope.filteredResults.forEach(function (r) {
		sum += r.totalSecs;
		});

		$scope.filteredSum = Number(Math.round((sum / 3600)+'e2') +'e-2')

		console.log("$$scope.filteredSum", $scope.filteredSum);

		//total events calc:
		var allEvents = $scope.filteredResults.map(function(activity) {
			return activity.activity;
		})

		console.log("allEvents", allEvents);
		var uniqueEvents = _.uniq(allEvents);
		console.log("uniqueEvents", uniqueEvents);

		$scope.eventsTotal = uniqueEvents.length;

		//total groups calc:

		var allGroups = $scope.filteredResults.map(function(activity) {
			return activity.group;
		})

		console.log("allGroups", allGroups);
		var uniqueGroups = _.uniq(allGroups);

		$scope.groupTotal = uniqueGroups.length;

		//total people calc:

		

	})



	// $scope.showFilteredSummary = function () {
	// 	var sum = 0;

	// 	$scope.filteredResults.forEach(function (r) {
	// 		sum += r.totalSecs;
	// 		console.log("r",r.totalSecs);
	// 	});

	// 	$scope.filteredSum = sum;
	// 	console.log("$scope.filteredSum",$scope.filteredSum);

	// 	return sum;
	// }

	$(function() {
			$("#start-date-picker").datepicker({
				changeMonth: true,
				changeYear: true,
				dateFormat: "D, M dd, yy",
				onSelect: function(dateText, selectedDateObj) {
					startDate = $("#start-date-picker").datepicker( "getDate" );
					console.log("startDate", startDate);
					console.log("converted Date:", convertDate(startDate));
					var convertedDate = convertDate(startDate);
					$scope.selectedStart = convertDate(startDate);
					$scope.$apply();
					var timeTest = moment(convertedDate).isAfter("2015-12-14T12:17:10-06:00");

					console.log("before/after test:", timeTest);

					console.log("dateText", dateText);
					console.log("selectedDateObj", selectedDateObj);
				}
			});
		});

	//"before" date Picker functionality:
	$(function() {
			$("#before-date-picker").datepicker({
				changeMonth: true,
				changeYear: true,
				dateFormat: "D, M dd, yy",
				onSelect: function(dateText, selectedDateObj) {
					beforeDate = $("#before-date-picker").datepicker( "getDate" );
					console.log("before date:", beforeDate);
					console.log("converted before Date:", convertDate(beforeDate));
					var convertedDate = convertDate(beforeDate);
					$scope.selectedEnd = convertDate(beforeDate);
					$scope.$apply();
					var timeTest = moment(convertedDate).isBefore("2015-12-14T12:17:10-06:00");

					console.log("before or after test:", timeTest);

					console.log("dateText", dateText);
					console.log("selectedDateObj", selectedDateObj);		
				}
			});
		});


	$scope.activityLogArray = $firebaseArray(activityLogRef);

	//total visitors/people:

	var visitorsArray = $firebaseArray(pastVisitorsRef);

	visitorsArray.$loaded().then(function(returnedVisitorsArray) {
		console.log("Visitors Array: ", returnedVisitorsArray);
		$scope.visitorsSum = returnedVisitorsArray.length;
		console.log("$scope.visitorsSum", $scope.visitorsSum);

	})

	//total hours:

	
	// $scope.$watch(function () {
 //    $scope.filteredArray = $scope.$eval("activityLogArray | afterDateFilter: selectedStart | beforeDateFilter: selectedEnd | filterBy: ['firstName', 'lastName']: searchName | filterBy: ['group']: group | filterBy: ['activity']: event");
	// });

	// var testResults = $scope.filteredResults;

	// $scope.$watch('testResults', function() {
	// 	console.log("test results changed!!");
	// })



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