var app = angular.module('angularJScontroller', []);

app.controller('myController', function($scope) {
  $scope.message = 'Hello from HomeController';

});

/*
var webapp = angular.module('angularJScontroller', []);


webapp.controller('myController', function($scope, $http) {
	
    $scope.data = [];
	
	// when landing on the page, get all todos and show them	
    var request = $http.get('/');
    
    request.success(function(data) {
        $scope.availability = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });
});*/


/*function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
		
}*/
