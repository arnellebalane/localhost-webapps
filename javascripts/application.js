var app = angular.module('localhost', []);

app.controller('AppsController', function($scope, $http) {
  $scope.apps = [];
  $http
    .get('http://localhost/localhost-webapps/server/retrieve.php')
    .success(function(data, status, headers, config) {
      $scope.apps = data;
    });
});