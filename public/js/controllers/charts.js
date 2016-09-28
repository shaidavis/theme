app.controller('ChartsCtrl', ['$scope', 'answers', 'questions', '$location', '$route', function($scope, answers, questions, $location, $route) {


 $scope.generateReport = function (){
  alert("This feature is coming soon!")
 }

  $scope.shareReport = function (){
  alert("This report is just a demonstration. Sharing will come soon!")
 }

$scope.labels1 = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
$scope.series1 = ['High Athletics', 'Average Athletics', 'Low Athletics'];
$scope.data1 = [
  [65, 59, 40, 31, 26, 25, 30, 35, 40, 50, 55, 60],
  [30, 40, 38, 51, 56, 41, 49, 20, 30, 39, 45, 42],
  [48, 28, 20, 13, 33, 21, 30, 23, 19, 31, 40, 12]
];
$scope.onClick = function (points, evt) {
  console.log(points, evt);
}
  $scope.datasetOverride5 = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options5 = {
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


  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride1 = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];

    $scope.options1 = {
      scales: {
        xAxes: [{
           
        }],
        yAxes: [{
          labelString: 'probability',
          ticks: {
            
            userCallback: function(label, index, labels) {
                         // when the floored value is the same as the value we have a whole number
                         if (Math.floor(label) === label) {
                             return label;
                         }
                     }
                },

          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }]
      }
    }


  $scope.labels2 =["Lost", "Survivor", "Fox and Friends", "Will & Grace", "The Daily Show", "NCIS", "Family Guy"];
  $scope.series2 =["Trump", "Clinton", "3rd Party", "Undecided"]
  $scope.data2 = [
    [65, 59, 90, 81, 56, 55, 40],
    [28, 48, 8, 19, 96, 27, 100],
    [10, 20, 10, 39, 6, 57, 10],
    [20, 78, 44, 49, 60, 70, 90]
  ];

  $scope.labels3 = ["Terrible Sleep", "Poor Sleep", "Fair Sleep", "Good Sleep", "Excellent Sleep"];
  $scope.data3 = [309, 523, 560, 110, 40];

  $scope.series4 = ['Kinsey 1', 'Kinsey 2', 'Kinsey 3', 'Kinsey 4', 'Kinsey 5', 'Kinsey 6', 'Kinsey 7', 'H', 'I', 'J', 'K', 'L'];

    $scope.data4 = [
      [{
        x: 48,
        y: 10,
        r: 20
      }],
      [{
        x: 13,
        y: 40,
        r: 50
      }],
      [{
        x: 35,
        y: 20,
        r: 11
      }],
      [{
        x: 20,
        y: 23,
        r: 20
      }],
      [{
        x: 30,
        y: 50,
        r: 75
      }],
      [{
        x: 14,
        y: 20,
        r: 40
      }],
      [{
        x: 50,
        y: 20,
        r: 50
      }],
      [{
        x: 44,
        y: 10,
        r: 20
      }],
         [{
        x: 20,
        y: 30,
        r: 20
      }],
      [{
        x: 50,
        y: 10,
        r: 30
      }],
      [{
        x: 39,
        y: 10,
        r: 20
      }],
      [{
        x: 24,
        y: 20,
        r: 20
      }]
    ];
  
  $scope.colors5 = ['#45b7cd', '#ff6384', '#ff8e72'];
  $scope.labels5 = ["Like Cilantro", "Dislike Cilantro", "Unsure"];
  $scope.series5 = ['Vanilla', 'Chocolate', 'Strawberry'];
  $scope.data5 = [
    [85, 50, 30],
    [28, 48, 80],
    [40, 14, 30]
  ];




  $scope.labels6 = ["0% - 25%", "25% - 50%", "50% - 75%", "75% - 100%"];
  $scope.data6 = [600, 300, 100, 50];

}]);