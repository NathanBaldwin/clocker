app.factory('Auth', ["$firebaseAuth",
  function($firebaseAuth) {
  	console.log("I see Auth!!");
    var ref = new Firebase("https://clocker.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);
