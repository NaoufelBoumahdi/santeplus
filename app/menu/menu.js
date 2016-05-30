'use strict';

/*angular.module('myApp.menu', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/menu', {
    templateUrl: 'menu/menu.html',
    controller: 'menuCtrl'
  });
}])

.controller('menuCtrl', [function() {

}]);*/


/*var app = angular.module('myApp.menu', ['ngRoute','ngTouch']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/menu', {
    templateUrl: 'menu/menu.html',
    controller: 'menuCtrl'
  });
}])
app.directive('mySlideController', ['$swipe',
  function($swipe) {
    return {
      restrict: 'EA',
      link: function(scope, ele, attrs, ctrl) {
        var startX, pointX;
        $swipe.bind(ele, {
          'start': function(coords) {
            startX = coords.x;
            pointX = coords.y;
          },
          'move': function(coords) {
            var delta = coords.x - pointX;
// ...
          },
          'end': function(coords) {
// ...
          },
          'cancel': function(coords) {
// ...
          }
        });
      }
    }
  }]);

app.controller("menuCtrl", function($scope){
  $scope.showmenu=false;
  $scope.toggleMenu = function(){
    $scope.showmenu=($scope.showmenu) ? false : true;
  }
});

function MyService() {
  this.doIt = function() {
    console.log("done");
  }
}


var myModule = angular.module("myApp.menu", []);

myModule.service("myService", MyService);


myModule.controller("menuCtrl", function($scope, myService) {

  myService.doIt();

});*/





angular
    .module("menu", ["integralui"])
    .controller("menuCtrl", ["$scope", "IntegralUIMenuService", "$timeout", "$http"], function($scope, $menuService, $timeout, $http){
// A unique identifier of the Menu directive
      $scope.menuName = "menuSample";
// Use the default menu icon if there is no specified icon
      $scope.defaultIcon = 'icons-medium empty';
// An array object that will hold all menu items
      $scope.data = [];

// Initially create the root menu without any submenus
      var initTimer = $timeout(function(){
        var dataSource = $http.get('json/main-menu.txt');
        if (dataSource){
          dataSource.success(function(data){
// Load Root Menu
            $menuService.loadData($scope.menuName, data);
          });
          dataSource.error(function(data){
            alert("AJAX failed to Load Data");
          });
        }
      }, 1);

      var loadMenu = function(item){
        if (item && item.submenu){
          var dataSource = $http.get('json/' + item.submenu);
          if (dataSource){
            dataSource.success(function(data){
// Change the dropdown icon to a loading icon
              $menuService.beginLoad($scope.menuName, item);

              var loadTimer = $timeout(function(){
// Load a Menu from JSON
                $menuService.loadData($scope.menuName, data, item);

// Open the loaded sub menu
                $menuService.openMenu($scope.menuName, item);

// Mark that submenu is loaded successfuly
                item.isLoaded = true;

// Restores the dropdown icon to a default one
                $menuService.endLoad($scope.menuName);

                $timeout.cancel(loadTimer);
              }, 1000);
            });
            dataSource.error(function(data){
              alert("AJAX failed to Load Data");
            });
          }
        }
      }

// Handle itemClick event to open submenu for the clicked root menu
      $scope.onItemClick = function(e){ 
// Load menu from JSON only if it's not loaded already
        if (e.item && e.item.hasChildren && !e.item.isLoaded)
          loadMenu(e.item);
      }
    });