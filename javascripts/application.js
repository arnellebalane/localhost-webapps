var app = angular.module('localhost', []);

app.controller('AppsController', function($scope, $http) {
  $scope.apps = [];
  $scope.ignored = [];
  $scope.ignore = function(event, index) {
    event.preventDefault();
    $scope.ignored.push($scope.apps[index]);
    $scope.apps.splice(index, 1);
    chrome.storage.local.set({'cached': $scope.apps, 'ignored': $scope.ignored});
  }

  chrome.storage.local.get(['cached', 'ignored'], function(items) {
    $scope.apps = items.cached || [];
    $scope.ignored = items.ignored || [];
    for (var i = 0; i < $scope.ignored.length; i++) {
      $scope.apps.splice($scope.apps.indexOf($scope.ignored[i]), 1);
    }
  });

  $http
    .get('http://localhost/localhost-webapps/server/retrieve.php')
    .success(function(data, status, headers, config) {
      $scope.apps = data;
      for (var i = 0; i < $scope.ignored.length; i++) {
        $scope.apps.splice($scope.apps.indexOf($scope.ignored[i]), 1);
      }
      chrome.storage.local.set({'cached': data});
    });
});