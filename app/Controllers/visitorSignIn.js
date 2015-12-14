app.controller('visitorSignIn', ["$scope", "Auth", "$location", "$firebaseArray", "getAuthData",
  function($scope, Auth, $location, $firebaseArray, getAuthData) {
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
    	"in": moment().format('MMMM Do YYYY, h:mm:ss a'),
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
    	"in": moment().format('MMMM Do YYYY, h:mm:ss a'),
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

		var fbActivityRef = new Firebase("https://clocker.firebaseio.com/" + adminUid + "/activityLog/" + eventKey)

		fbActivityRef.update({
			signedIn: false,
			out: moment().format('MMMM Do YYYY, h:mm:ss a')
		})

	}



}]);