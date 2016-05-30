'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.menu',
  'myApp.article',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
  .when("/menu", {templateUrl: "menu/menu.html", <span class="highlight">controller: "menuCtrl"</span>})
  .when("/", {templateUrl: "article/article.html", <span class="highlight">controller: "articleCtrl"</span>})
  .otherwise("/404", {templateUrl: "partials/404.html", <span class="highlight">controller: "PageCtrl"</span>});
}]);

