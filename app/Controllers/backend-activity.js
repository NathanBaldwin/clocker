app.controller('backend-activity',
  ["$scope", "getAuthData", "$firebaseArray", "$firebaseObject",
  function($scope, getAuthData, $firebaseArray, $firebaseObject) {

  //get auth data for logged in user:
  var adminUid = getAuthData.getAdminUid();

  //function to construct references to access user's data stored
  //one level deep in Firebase:
  var createFbRef = function(fbKeyForData) {
   return new Firebase(getAuthData.ref() + adminUid + fbKeyForData);
  }

  //Create references which will be used to retrieve data stored
  //in Firebase in each of the keys specified in function parameters below:
	var pastVisitorsRef = createFbRef("/visitors");
	var activityLogRef = createFbRef("/activityLog");
	var groupsRef = createFbRef("/groups");
	var activityNamesRef = createFbRef("/activityNames");

  //retrieve activity log data and convert object of objects to an array of objects
  //using the $firebaseArray method. Then store array to a variable on scope.
	$scope.activityLogArray = $firebaseArray(activityLogRef);

  //deferred action waits for activityLogArray to load. On load, array is reversed
  //in order to display most recent logged events at top of activity table:
	$scope.activityLogArray.$loaded().then(function(returnedActivityArray) {
		$scope.allActivitiesArray = returnedActivityArray.reverse();
  })

  //user's group list stored in array:
	$scope.groupsArray = $firebaseArray(groupsRef);

  //user's activities stored in array:
	$scope.activityNamesArray = $firebaseArray(activityNamesRef);

  $scope.filteredResults = [];
  $scope.filteredSum = 0;

  $scope.$watch(function() {
    //console.log("new filteredResults", $scope.filteredResults);

    //console.log("event:", event);
    
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
  //***************Date-Picker functionality*********************************

  //start date is empty string by default:
	$scope.startDateText = "";

  //Convert unformatted moment (ie. Tue Dec 22 2015 00:00:00 GMT-0600 (CST))
  //to more readable format (ie. 2015-12-22), which is used to display user's selected date:
  var convertDate = function(oldFormat) {
    return $.datepicker.formatDate("yy-mm-dd", oldFormat).toString();
  };


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
	console.log("you clicked hide sidebar!");
	$scope.varForReflowWatch = $scope.varForReflowWatch + 1;
	$("#activity-log-body").removeClass("padding-for-sidebar");
	$("#activity-log-body").addClass("padding-for-add-sidebar-button");
	$("#activity-filter-sidebar").hide();
	$("#space-for-add-sidebar-button").removeClass("hidden");
	$("#fixed-header").removeClass("wide-margin");
	$("#fixed-header").addClass("thin-margin");
}

$scope.showSidebar = function () {

	$scope.varForReflowWatch = $scope.varForReflowWatch + 1;
	$("#activity-log-body").addClass("padding-for-sidebar");
	$("#activity-log-body").removeClass("padding-for-add-sidebar-button");
	$("#activity-filter-sidebar").show();
	$("#space-for-add-sidebar-button").addClass("hidden");
	$("#fixed-header").addClass("wide-margin");
	$("#fixed-header").removeClass("thin-margin");

}

$scope.varForReflowWatch = 0;

$scope.$watch('filteredSum', function() {
	console.log("watch worked!!");
	$scope.varForReflowWatch = $scope.varForReflowWatch + 1;

})



$scope.activityHeader = {
    top: 150,
    position: 'auto'
  };

$scope.openGroup = function() {
	event.stopPropagation();
}

}]);
