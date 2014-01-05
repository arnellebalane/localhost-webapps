var app = angular.module('localhost', []);

app.controller('AppsController', function($scope, $http) {
  $scope.apps = [];
  $scope.ignored = [];
  $scope.ignore = function(event, index) {
    event.preventDefault();
    $scope.ignored.push($scope.apps[index]);
    chrome.storage.local.set({'ignored': $scope.ignored});
  }

  chrome.storage.local.get(['cached', 'ignored'], function(items) {
    $scope.apps = items.cached || [];
    $scope.ignored = items.ignored || [];
  });

  $http
    .get('http://localhost/localhost-webapps/server/retrieve.php')
    .success(function(data, status, headers, config) {
      $scope.apps = data;
      chrome.storage.local.set({'cached': data});
    });
});