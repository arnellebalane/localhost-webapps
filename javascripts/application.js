var app = angular.module('localhost', []);

app.controller('AppsController', function($scope, $http) {
  $scope.apps = [];
  chrome.storage.local.get(['cached', 'ignored'], function(items) {
    if (items.cached) {
      $scope.apps = items.cached;
    }
  });
  $http
    .get('http://localhost/localhost-webapps/server/retrieve.php')
    .success(function(data, status, headers, config) {
      $scope.apps = data;
      chrome.storage.local.set({'cached': data});
    });
});