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
				dateFormat: "D, M dd, yy",
				onSelect: function(dateText, selectedDateObj) {
					console.log("dateText", dateText);
					console.log("selectedDateObj", selectedDateObj);
					// var date = $.datepicker.parseDate(inst.settings.dateFormat || $.datepicker._defaults.dateFormat, dateText, inst.settings);
					// var dateText1 = $.datepicker.formatDate("D, d M yy", date, inst.settings);
					// date.setDate(date.getDate() + 7);
					// var dateText2 = $.datepicker.formatDate("D, d M yy", date, inst.settings);
					// $("#dateoutput").html("Chosen date is <b>" + dateText1 + "</b>; chosen date + 7 days yields <b>" + dateText2 + "</b>");
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