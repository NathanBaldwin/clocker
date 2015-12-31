// app.directive('hours', function() {
//   return {
//     restrict: 'A',
//     require: '^ngRepeat',
//     scope: true,
//     template: '<div><h3>testing total: {{filteredResults.length}}</h3></div>',
//     controller: ["$scope", function($scope) {
//     	$scope.modifyResults = function(arrayOfResults) {
//     		$scope.modifiedResults = filteredResults;
//     	};
//     }],
//     link: function(scope, iElement, iAttrs, ctrl) {
      
//   	}
// }
// });

// app.directive('hours', function() {
//   return {
//     restrict: 'A',
//     // scope: {
//     // 	originalArray: '=activities',
//     // 	filtered: '=filteredResults'
//     // },
//     template: '<div><h3>testing total: {{filteredSum}} </h3></div>',
//     link: function(scope, elem, attrs) {
//     	console.log("scope:", scope);
//     	console.log("elem:", elem);
//     	console.log("attrs:", attrs);

//     	console.log("filteredResults", scope.filteredResults);

//     	scope.$watch(function() {
//     		console.log("new filteredResults", scope.filteredResults);

//     		var sum = 0;

//     		scope.filteredResults.forEach(function (r) {
// 			sum += r.totalSecs;
// 			});

// 			scope.filteredSum = sum / 3600;
// 			console.log("$scope.filteredSum", scope.filteredSum);
// 	    	})

//     	scope.$watch('filteredResults', function(value){
//         console.log("value changed", value);
        
//       });


//     	console.log("scope.originalArray", scope.originalArray);

//     	scope.$watch('originalArray', function(value){
//         console.log("value changed", value);
//         console.log("filtered:", filtered);
        
//       });
      
// 	}
      
//   	}
// });