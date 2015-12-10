app.controller('visitorSignIn', ["$scope", "Auth", "$location", "$firebaseArray", "getAuthData",
  function($scope, Auth, $location, $firebaseArray, getAuthData) {
  	console.log("I see admin visitor sign in controller!");

  	var adminUid = getAuthData.getAdminUid();
  	console.log("adminUid", adminUid);

  	//var visitorsRef = new Firebase("https://clocker.firebaseio.com/" + uid +"/visitors/")

  	


  	
  
}]);