// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('badger-loop', ['ionic','ionic.service.core', 'ionic-material', 'ngRiffle']);

app.run(function ($ionicPlatform) {

    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
})

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.lists', {
        url: '/lists',
        views: {
            'menuContent': {
                templateUrl: 'templates/lists.html',
                controller: 'ListsCtrl'
            }
        }
    })
    .state('app.fundraising', {
        url: '/fundraising',
        views: {
            'menuContent': {
                templateUrl: 'templates/fundraising.html',
                controller: 'FundCtrl'
            }
        }
    })
    .state('app.website', {
        url: '/website',
        views: {
            'menuContent': {
                templateUrl: 'templates/website.html',
                controller: 'WebsiteCtrl'
            }
        }
    })

    .state('app.motion', {
        url: '/motion',
        views: {
            'menuContent': {
                templateUrl: 'templates/motion.html',
                controller: 'MotionCtrl'
            }
        }
    })

    .state('app.components', {
        url: '/components',
        views: {
            'menuContent': {
                templateUrl: 'templates/components.html',
                controller: 'ComponentsCtrl'
            }
        }
    })

    .state('app.extensions', {
        url: '/extensions',
        views: {
            'menuContent': {
                templateUrl: 'templates/extensions.html',
                controller: 'ExtensionsCtrl'
            }
        }
    })

    .state('app.ai', {
        url: '/ai',
        views: {
            'menuContent': {
                templateUrl: 'templates/ai.html',
                controller: 'AICtrl'
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/ai');
})

// Config for Exis
.config(function($riffleProvider){
    $riffleProvider.setDomain("xs.demo.badgerloop.blapp.Container.blai");
    // $riffleProvider.setFabricLocal();
})
.run(function($riffle){
    $riffle.setToken("hUzpwpthlJWeHG9Kb9W8yhWodm-sYQvOijNMYqY2mOxoFfZ2BZb8E.QWd1NOxCVFhW249ODPVfZ2tZZk4ke8N.h.wochywzF.PNrYWsPwYDjfsTCfSmXx1JUAW.29uwwh2GirelkMABQ5ynckHtCwTxYoT39K5nkxtjoA-VWHN4_");
    $riffle.join();   
});
