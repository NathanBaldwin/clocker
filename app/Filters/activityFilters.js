app.filter('afterDateFilter', function(){
	  return function(input, timeIn, startDateText){
	  	// console.log("afterDate input", input);
	  	console.log("timeIn", timeIn);
	  	console.log("startDateText", startDateText);
	    var out = [];
	    angular.forEach(input, function(activity){
	      if(moment(activity.in).isAfter(timeIn)){
	        out.push(activity)
	      }
	    })
	    // console.log("afterDate out:", out);
	    if ((timeIn === undefined) || (startDateText === "")) {
	    	return input;
	    } else {
	    	return out;
	    };
	  }
	})

app.filter('beforeDateFilter', function(){
  return function(input, timeIn, beforeDateText){
  	// console.log("beforeDate input", input);
    var out = [];
    angular.forEach(input, function(activity){
      if(moment(activity.in).isBefore(timeIn)){
        out.push(activity)
      }
    })
  	// console.log("beforeDate out:", out);
    if (beforeDateText === "") {
	    	return input;
	    } else {
	    	return out;
	    };
  }
})

app.filter('groupFilter', function(){
  return function(input, selectedGroups){
  	// console.log("groupFilter input", input);
  	console.log("groupFilter selectedGroups", selectedGroups[0]);
    var out = [];

    if (selectedGroups[0] === undefined) {
    	console.log("no groups selected!++++++++++++");
    	return input;
    };

    angular.forEach(input, function(activity){
      if(_.contains(selectedGroups, activity.group)){
        out.push(activity)
      }
    })
	return out; 
  }
})

app.filter('activityFilter', function(){
  return function(input, selectedActivities){
  	// console.log("groupFilter input", input);
  	console.log("groupFilter selectedActivities", selectedActivities[0]);
    var out = [];

    if (selectedActivities[0] === undefined) {
    	console.log("no groups selected!++++++++++++");
    	return input;
    };

    angular.forEach(input, function(activity){
      if(_.contains(selectedActivities, activity.activity)){
        out.push(activity)
      }
    })
	return out; 
  }
})

