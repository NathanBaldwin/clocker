app.controller('visitorSignIn', ["$scope", "Auth", "$location", "$firebaseArray", "getAuthData", "$firebaseObject",
  function($scope, Auth, $location, $firebaseArray, getAuthData, $firebaseObject) {
  	console.log("I see admin visitor sign in controller!");

  	//*****************VISITOR SIGN IN FORM FUNCTIONALITY*************

  	var ref = new Firebase("https://clocker.firebaseio.com/");
		var currentAuthData = ref.getAuth();
		var adminUid = currentAuthData.uid;
  	var pastVisitorsRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/visitors");
		var activityLogRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/activityLog");
		console.log("adminUid", adminUid);

		if (currentAuthData) {
  		console.log("Authenticated user with uid:", currentAuthData.uid);
		}



  	$scope.match = [];  	

  	$scope.pastVisitorsArray = $firebaseArray(pastVisitorsRef);

  	$scope.pastVisitorsArray.$loaded().then(function(pastVisitorsArray) {
			console.log("pastVisitors data:", $scope.pastVisitorsArray);

		})


  	$scope.findVisitor = function() {
			$scope.pastVisitorsArray.$loaded().then(function(pastVisitorsArray) {
			console.log("pastVisitors data:", $scope.pastVisitorsArray);

			$scope.match = _.filter($scope.pastVisitorsArray, function(visitorObj) {
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
	
    var userData = {
    	"firstName": $scope.firstName,
    	"lastName": $scope.lastName,
    	"email": $scope.email
    }
  
    /// sets the new visitor data object to the firebase database ///
    $scope.pastVisitorsArray.$add(userData).then(function(ref) {
    	var newVisitorObj = {};
    	var newVisitorId = ref.key();
    	ref.on('value', function(snapshot) {
    		newVisitorObj = snapshot.val();
    	})
    	console.log("newVisitorObj", newVisitorObj);

    	var newActivity = {
    	"firstName": newVisitorObj.firstName,
    	"lastName": newVisitorObj.lastName,
    	"email": newVisitorObj.email,
    	"visitorId": newVisitorId,
    	"group": $scope.group,
    	"activity": $scope.activity,
    	"inFormatted": moment().format('MMMM Do YYYY, h:mm:ss a'),
    	"in": moment().format(),
    	"signedIn": true
    }

    console.log("newActivity", newActivity);
    console.log("moment:", moment().format('MMMM Do YYYY, h:mm:ss a'));
  
    // sets new activity data object to the firebase database
    activityLogRef.push(newActivity);

    });
    
  };



  $scope.createNewActivity = function() {
		console.log("you clicked on create 'create new Activity'!");
		console.log("adminUid", adminUid);
	
    var firstMatch = $scope.match[0];
    console.log("firstMatch", firstMatch);

    var newActivity = {
    	"firstName": firstMatch.firstName,
    	"lastName": firstMatch.lastName,
    	"email": firstMatch.email,
    	"visitorId": firstMatch.$id,
    	"group": $scope.group,
    	"activity": $scope.activity,
    	"inFormatted": moment().format('MMMM Do YYYY, h:mm:ss a'),
    	"in": moment().format(),
    	"signedIn": true
    }

    console.log("newActivity", newActivity);
    console.log("moment:", moment().format('MMMM Do YYYY, h:mm:ss a'));
  
    // sets new activity data object to the firebase database
    activityLogRef.push(newActivity);
  
  };

 	//*****************VISITOR LOG FUNCTIONALITY*************

 	var currentVisitorsRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/activityLog");

  $scope.currentVisitorsArray = $firebaseArray(currentVisitorsRef);

  $scope.currentVisitorsArray.$loaded().then(function(currentVisitors) {
			console.log("current visitors data:", currentVisitors);			
		
	})

	$scope.signOut = function() {
		console.log("you clicked sign out!");
		console.log("event.target.id", event.target.id);

		var eventKey = event.target.id;

		var fbActivityRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/activityLog/" + eventKey);

		var activityObj = $firebaseObject(fbActivityRef);

		activityObj.$loaded().then(function(activityData) {
			console.log("activityData", activityData);

			console.log("activityData.in", activityData.in);

			activityObj.signedIn = false;
			activityObj.outFormatted = moment().format('MMMM Do YYYY, h:mm:ss a');
			activityObj.out = moment().format();

			activityObj.$save().then(function(updatedObjectRef) {
				updatedObjectRef.on('value', function(updatedObject) {
					var signedOutActObj = updatedObject.val();
					console.log("signedOutActObj", signedOutActObj);

					var timeIn = signedOutActObj.in.toString();
					var timeOut = signedOutActObj.out.toString();
					console.log("time in:", timeIn, "timeOut:", timeOut);

					var duration = moment(timeIn).twix(timeOut);
					var durationMins = duration.count('minutes');
					var durationSecs = duration.count('seconds');
					console.log("durationMins", durationMins);
					console.log("durationSecs", durationSecs);

					activityObj.totalMins = durationMins;
					activityObj.totalSecs = durationSecs;

					activityObj.$save();


				})
			})

			// fbActivityRef.update({
			// 	signedIn: false,
			// 	out: moment().format('MMMM Do YYYY, h:mm:ss a')
			// })
		})



	}



}]);