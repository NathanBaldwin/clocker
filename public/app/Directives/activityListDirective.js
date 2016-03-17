app.directive('in', function() {
    return  {
      restrict: 'A',
      scope: {
        timeIn: "@"
      },
      template: '<div>{{newTimeInFormatted}}</div>',
      link: function(scope, element, attr, ctrls) {
        // console.log("inFormatted", scope.timeIn);
        var timeIn = scope.timeIn;

        // console.log("new date format", moment(timeIn).format('h:mm:ss a'));
        scope.newTimeInFormatted = moment(timeIn).format('h:mm:ss a');      
        
      }
    }
  });

app.directive('out', function() {
    return  {
      restrict: 'A',
      scope: {
        timeOut: "@"
      },
      template: '<div>{{newTimeOutFormatted}}</div>',
      link: function(scope, element, attr, ctrls) {
        // console.log("inFormatted", scope.timeIn);
        var timeOutStamp = scope.timeOut;

        console.log("new out date format", timeOutStamp);
        if (moment(timeOutStamp).format('h:mm:ss a') === "Invalid date") {
          scope.newTimeOutFormatted = "";
        } else {
        scope.newTimeOutFormatted = moment(timeOutStamp).format('L, h:mm:ss a');    
        };  
        
      }
    }
  });

app.directive('totalTime', function() {
    return  {
      restrict: 'A',
      scope: {
        timeOut: "@",
        timeIn: "@"
      },
      template: '<div>{{totalTime}}</div>',
      link: function(scope, element, attr, ctrls) {
        // console.log("inFormatted", scope.timeIn);
        var timeInStamp = scope.timeIn;
        var timeOutStamp = scope.timeOut;

        console.log("timeIn", timeInStamp);
        console.log("timeOut", timeOutStamp);

        // var duration = moment(timeInStamp).twix(timeOutStamp);
        var duration = moment.preciseDiff(timeInStamp, timeOutStamp);
        // scope.totalTime = duration.humanizeLength();
        scope.totalTime = duration;

        


        // var durationSecs = duration.count('seconds');
        // scope.totalTime = durationSecs / 3600;

              
        
      }
    }
  });