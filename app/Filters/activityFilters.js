app.filter('afterDateFilter', function(){
	  return function(input, timeIn){
	  	// console.log("afterDate input", input);
	    var out = [];
	    angular.forEach(input, function(activity){
	      if(moment(activity.in).isAfter(timeIn)){
	        out.push(activity)
	      }
	    })
	    // console.log("afterDate out:", out);
	    return out;
	  }
	})

app.filter('beforeDateFilter', function(){
  return function(input, timeIn){
  	// console.log("beforeDate input", input);
    var out = [];
    angular.forEach(input, function(activity){
      if(moment(activity.in).isBefore(timeIn)){
        out.push(activity)
      }
    })
  	// console.log("beforeDate out:", out);
    return out;
  }
})

// app.filter("as", function($parse) {
//   return function(value, context, path) {
//     return $parse(path).assign(context, value);
//   };
// });

// app.filter('resultsCatcher', ["getAuthData",
// 	function(getAuthData){
//   return function(input){
//   	console.log("resultsCatcher input", input);
//   	getAuthData.setFilteredResults(input);

//     return input;
//   }
// }])