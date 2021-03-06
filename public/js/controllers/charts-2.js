(function() {
angular.module('MyApp')
    .controller('ChartsCtrl', ChartsCtrl);

ChartsCtrl.$inject = ['$scope'];

function ChartsCtrl($scope, answers) {
  $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
  $scope.labels = ["Jan", "Feb", "Mar"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80],
    [28, 48, 40]
  ];


  $scope.graph = "yo"
                       


  // $scope.data = Admin.chart;

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };
}
})();