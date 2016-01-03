app.controller('backend-activity', ["$scope", "Auth", "$location", "$firebaseArray", "getAuthData", "$firebaseObject",
  function($scope, Auth, $location, $firebaseArray, getAuthData, $firebaseObject) {
  	console.log("I see backend-activity controller!");

  var ref = new Firebase("https://clocker.firebaseio.com/");
	var currentAuthData = ref.getAuth();
	var adminUid = currentAuthData.uid;
	var pastVisitorsRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/visitors");
	var activityLogRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/activityLog");
	var groupsRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/groups");
	var activityNamesRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/activityNames");
	console.log("adminUid", adminUid);


	$scope.activityLogArray = $firebaseArray(activityLogRef);

	$scope.activityLogArray.$loaded().then(function(returnedActivityArray) {
		$scope.allActivitiesArray = returnedActivityArray.reverse();

		})

	$scope.groupsArray = $firebaseArray(groupsRef);

	$scope.activityNamesArray = $firebaseArray(activityNamesRef);

	$scope.startDateText = "";

	//Start-date Picker functionality:

	var startDate = "";

	var convertDate = function(oldFormat) {

		return $.datepicker.formatDate("yy-mm-dd", oldFormat).toString();

	};


	$scope.filteredResults = [];
	$scope.filteredSum = 0;

	$scope.$watch(function() {
  	//console.log("new filteredResults", $scope.filteredResults);
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

		$scope.filteredSum = Number(Math.round((sum / 3600)+'e2') +'e-2');

		console.log("$$scope.filteredSum", $scope.filteredSum);


		//total events calc:
		var allEvents = $scope.filteredResults.map(function(activity) {
			return activity.activity;
		})

		//console.log("allEvents", allEvents);
		var uniqueEvents = _.uniq(allEvents);
		// console.log("uniqueEvents", uniqueEvents);

		$scope.eventsTotal = uniqueEvents.length;

		//total groups calc:

		var allGroups = $scope.filteredResults.map(function(activity) {
			return activity.group;
		})

		//console.log("allGroups", allGroups);
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
		// console.log("uniquePeople", uniquePeople);
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
					$scope.startDateText = $scope.selectedStart;
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
					$scope.beforeDateText = $scope.selectedEnd;
					$scope.$apply();
					var timeTest = moment(convertedDate).isBefore("2015-12-14T12:17:10-06:00");

					console.log("before or after test:", timeTest);

					console.log("dateText", dateText);
					console.log("selectedDateObj", selectedDateObj);		
				}
			});
		});

	$scope.compareActivities = function(currentActivity) {
		// console.log("currentActivity", currentActivity);
		// console.log("$scope.filteredResults", $scope.filteredResults);

		var currentIndex = $scope.filteredResults.indexOf(currentActivity);
		//console.log("currentIndex", currentIndex);
		// console.log("$scope.filteredResults[currentIndex + 1]", $scope.filteredResults[currentIndex + 1]);

		var prevActivity = $scope.filteredResults[currentIndex - 1]

		if (prevActivity === undefined) {
			return true
		};

		var currentMoment = moment(currentActivity.in);
		// console.log("currentMoment", currentMoment);

		var nextActMoment = moment(prevActivity.in)
		// console.log("nextActMoment", nextActMoment);

		if (currentMoment.isSame(nextActMoment, 'd')) {
			// console.log("SAME day");
			return false;
		} else {
			// console.log("++++++++PREVIOUS DAY++++++++++");
			return true;
		};

	}

	$scope.selectedGroups = [];

	$scope.setSelectedGroup = function () {
        var groupName = this.group.$value;
        console.log("groupName", groupName);
        if (_.contains($scope.selectedGroups, groupName)) {
            $scope.selectedGroups = _.without($scope.selectedGroups, groupName);
        } else {
            $scope.selectedGroups.push(groupName);
        }
        return false;
    };

  $scope.isChecked = function (groupName) {
  		console.log("groupName", groupName);
      if (_.contains($scope.selectedGroups, groupName)) {
      		console.log("want to add checkmark!");
          return 'glyphicon glyphicon-ok';
      }
      return false;
  };

  $scope.checkAllGroups = function () {
        $scope.selectedGroups = _.pluck($scope.groupsArray, '$value');
    };

  $scope.selectedActivities = [];

  $scope.setSelectedActivity = function () {
        var selectedActivity = this.activityName.$value;
        console.log("selectedActivity", selectedActivity);
        if (_.contains($scope.selectedActivities, selectedActivity)) {
            $scope.selectedActivities = _.without($scope.selectedActivities, selectedActivity);
        } else {
            $scope.selectedActivities.push(selectedActivity);
        }
        return false;
    };

 	$scope.checkAllActivities = function () {
        $scope.selectedActivities = _.pluck($scope.activityNamesArray, '$value');
    };

  $scope.activityIsChecked = function (activityName) {
		console.log("activityName", activityName);
    if (_.contains($scope.selectedActivities, activityName)) {
    		console.log("want to add checkmark!");
        return 'glyphicon glyphicon-ok';
    }
    return false;
};

$scope.closeDropdowns = function() {
	//console.log("you clicked on the body!!");
	console.log("event", event.target.id);

}

//****** Sidebar hide/show functionality: *********

$scope.hideSidebar = function () {
	//console.log("you clicked hide sidebar!");
	$("#activity-log-body").removeClass("padding-for-sidebar");
	$("#activity-log-body").addClass("padding-for-add-sidebar-button");
	$("#activity-filter-sidebar").hide();
	$("#space-for-add-sidebar-button").removeClass("hidden");
	$("#fixed-header").removeClass("wide-margin");
	$("#fixed-header").addClass("thin-margin");
	$scope.varForReflowWatch = $scope.varForReflowWatch + 1;
}

$scope.showSidebar = function () {

	$("#activity-log-body").addClass("padding-for-sidebar");
	$("#activity-log-body").removeClass("padding-for-add-sidebar-button");
	$("#activity-filter-sidebar").show();
	$("#space-for-add-sidebar-button").addClass("hidden");
	$("#fixed-header").addClass("wide-margin");
	$("#fixed-header").removeClass("thin-margin");
	$scope.varForReflowWatch = $scope.varForReflowWatch + 1;

}

$scope.varForReflowWatch = 1;

$scope.activityHeader = {
    top: 150,
    position: 'auto'
  };










	


}]);