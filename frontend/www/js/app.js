//STRIPE CHECKOUT 
var SERVER_SIDE_URL = "https://nameless-cove-34816.herokuapp.com";
var STRIPE_API_PUBLISHABLE_KEY = "pk_live_fXAVXCShfBiNNmsb1nEiAxC2";

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.service.core', 'stripe.checkout', 'starter.controllers', 'starter.services', 'nl2br', 'monospaced.elastic', 'ngRiffle', 'ngCordova', 'ionic.contrib.ui.tinderCards'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.hide();
            ionic.Platform.fullScreen();
        }
        // if(ionic.Platform.isIOS()){
        //     ionic.Platform.fullScreen();
        // }
    });
})

.config(function($stateProvider, $urlRouterProvider, $riffleProvider, StripeCheckoutProvider) {

    //Attach to Exis prod node
    $riffleProvider.setDomain("xs.demo.badgerloop.blapp.Container.blai");

    //Stripe Checkouts
    StripeCheckoutProvider.defaults({ key: STRIPE_API_PUBLISHABLE_KEY });

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // login screen
        .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'AuthCtrl'
    })

    // register screen
    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'AuthCtrl'
    })

    // register screen
    .state('news', {
        url: '/news',
        templateUrl: 'templates/news.html',
        controller: 'NewsCtrl'
    })


    // website screen
    .state('website', {
        url: '/website',
        templateUrl: 'templates/website.html',
        controller: 'AuthCtrl'
    })

    // vr screen
    .state('vr', {
        url: '/vr',
        templateUrl: 'templates/vr.html',
        controller: 'AuthCtrl'
    })

     // vr screen
    .state('instagram', {
        url: '/instagram',
        templateUrl: 'templates/instagram.html',
        controller: 'InstaCtrl'
    })

    // Fund screen
    .state('fundus', {
        url: '/fundus',
        templateUrl: 'templates/fundus.html',
        controller: 'FundCtrl',
        resolve: {
            // checkout.js isn't fetched until this is resolved.
            stripe: StripeCheckoutProvider.load
        }
    })

    // Home screen
    .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
    })

    .state('gallery', {
        url: '/gallery',
        templateUrl: 'templates/gallery.html',
        controller: 'HomeCtrl'
    })    

    // Home screen
    .state('render', {
        url: '/render/:name',
        templateUrl: 'templates/render.html',
        controller: 'RenderCtrl',
        params: {link: null, name: null }
    })

    // Recent posts
    .state('recent_posts', {
        url: '/recent-posts',
        templateUrl: 'templates/recent-posts.html',
        controller: 'HomeCtrl'
    })

    // View post detail
    .state('post', {
        url: '/post/:postId',
        templateUrl: 'templates/post.html',
        controller: 'PostCtrl',
        params: { postId: null }
    })

    // View post detail
    .state('articles', {
        url: '/articles/:name',
        templateUrl: 'templates/articles.html',
        controller: 'ArticlesCtrl',
        params: { link: null, name: null }
    })

    // Chat list
    .state('chats', {
        url: '/chats',
        templateUrl: 'templates/chats.html',
        controller: 'ChatCtrl'
    })

    .state('chat-detail', {
        url: '/chats/:chatId',
        templateUrl: 'templates/chat-detail.html',
        controller: 'ChatDetailCtrl'
    })

    // List of notifications
    .state('notifications', {
        url: '/notifications',
        templateUrl: 'templates/notifications.html',
        controller: 'NotificationsCtrl'
    })

    // Team list
    .state('team', {
        url: '/team',
        templateUrl: 'templates/team.html',
        controller: 'TeamCtrl'
    })

    // User profile
    .state('user', {
        url: '/user/:userId',
        templateUrl: 'templates/user.html',
        controller: 'UserCtrl'
    })

    // Setting page
    .state('setting', {
        url: '/setting',
        templateUrl: 'templates/setting.html',
        controller: 'SettingCtrl'
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

})

.run(function($riffle) {
    $riffle.setToken("69z01ijIPeLlCFPjLTbMs4JQGwY4bdxRGzVhxefn.mBJnnkfIzF.DxbMRM70.dJCAHZIHvviv697Wd9ZDa83l2LNcnmqv.qkDyRcmPFodjAkXJi1r2m7RgGSXAcrHIGQTMHU4CtoJbwqXXMksRCBd3CPt2-JOUX6hq7qr2m0g-g_");
    $riffle.join();
})

   .directive("detectFocus", function () {
        return {
            restrict: "A",
            scope: {
                onFocus: '&onFocus',
                onBlur: '&onBlur',
                focusOnBlur: '=focusOnBlur'
            },
            link: function (scope, elem) {

                elem.on("focus", function () {
                    scope.onFocus();
                    scope.focusOnBlur = true;  //note the reassignment here, reason why I set '=' instead of '@' above.
                });

                elem.on("blur", function () {
                    scope.onBlur();
                    if (scope.focusOnBlur)
                        elem[0].focus();
                });
            }
        }
    })
.filter('externalLinks', function() {
   return function(text) {
     return String(text).replace(/href=/gm, "class=\"ex-link\" href=");
   }
 })

.run(function($ionicLoading, $ionicPlatform) {

    var deploy = new Ionic.Deploy();
    deploy.check().then(function(hasUpdate) {
        console.log('Ionic Deploy: Update available: ' + hasUpdate);
        deploy.update().then(function(res) {
            
        }, function(err) {
            console.log('Ionic Deploy: Update error! ', err);
            $ionicLoading.show({
              template: 'Update Error :(',
              duration: 2000
            });
        }, function(prog) {
            console.log('Ionic Deploy: Progress... ', prog);
            $ionicLoading.show({
                template: "Updating:\n" + prog + "%"
            });
        });
    }, function(err) {
        console.error('Ionic Deploy: Unable to check for updates', err);
        $ionicLoading.show({
          template: 'Unable to check for updates',
          duration: 2000
        });
    });
    $ionicLoading.hide();

    //Initialize Push
    $ionicPlatform.ready(function() {
    var push = new Ionic.Push({
      "debug": true
    });

    push.register(function(token) {
      console.log("Device token:",token.token);
      push.saveToken(token);  // persist the token in the Ionic Platform
    });
  });

});
