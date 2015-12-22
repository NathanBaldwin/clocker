app.directive('smartRow', function($compile) {
    return  {
      restrict: 'A',
      link: function(scope, element, attr, ctrls) {
        var model = scope.$eval(attr.smartRow);
        //console.log("model", model);
        transcludeFn(function(clone) {
          element.after(clone);
          if (model.group === 'Belmont') {

            console.log("found Belmont!!!");
             var priceRow = angular.element('<tr price-row="' + model.group + '"></tr>');
             console.log("priceRow", priceRow);
             clone.after(priceRow);
             $compile(priceRow)(scope);
          }
        })
      }
    }
  });