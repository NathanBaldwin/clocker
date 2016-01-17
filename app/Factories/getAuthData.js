app.factory('getAuthData', [
  function() {

  //creating new reference to the clocker database at firebase.com:
  var ref = new Firebase("https://clocker.firebaseio.com/");

  //method to retrieve auth data from Firebase:
  var currentAuthData = ref.getAuth();

    return {
      //if user is logged in, this method will return their uid, which is used 
      //by the visitor sign-in and backend activity controllers to retrieve
      // data stored in firebase:
    	getAdminUid: function() {
    		return currentAuthData.uid;
    	},
      //getter for the clocker firebase reference above:
      ref: function() {
        return ref;
      }
    }
  }
]);
