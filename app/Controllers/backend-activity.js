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
	
	//Start-date Picker functionality:

	var startDate = "";

	var convertDate = function(oldFormat) {

		return $.datepicker.formatDate("yy-mm-dd", oldFormat).toString();

	};


	$scope.filteredResults = [];
	$scope.filteredSum = 0;

	$scope.$watch(function() {
  	console.log("new filteredResults", $scope.filteredResults);
  	var sum = 0;

  	//total hours calc:

  	// var filteredSecsArray = _.pull($scope.filteredResults.totalSecs, undefined);
  	// console.log("filteredSecsArray", filteredSecsArray);

  	$scope.filteredResults.forEach(function (r) {
	  	if (r.totalSecs === undefined) {
	  	} else {
			sum += r.totalSecs;
			}

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

		var allPeople = $scope.filteredResults.map(function(activity) {

			var firstName = activity.firstName;
			var lastName = activity.lastName;
			var fullName = firstName + " " + lastName;

			return fullName;
		})

		var uniquePeople = _.uniq(allPeople);
		console.log("uniquePeople", uniquePeople);
		$scope.peopleTotal = uniquePeople.length;

	})


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


	


}]);