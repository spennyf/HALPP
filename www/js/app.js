// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('HALPP', ['ionic'])

.run(function($ionicPlatform, $rootScope) {
	
	$rootScope.apiBasePath = "https://www.halpp.ca/api";
	
    $rootScope.readCookie =  function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    
    $rootScope.validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
    
	
    $ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			// Hide the accessory bar by default (remove this to show the
			// accessory bar above the keyboard
			// for form inputs)
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

			// Don't remove this line unless you know what you are doing. It
			// stops the viewport
			// from snapping when text inputs are focused. Ionic handles this
			// internally for
			// a much nicer keyboard experience.
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {
//	
//	$ionicCloudProvider.init({
//		"core": {
//		  "app_id": "2df292f4"
//		}
//	});
	
	
	$stateProvider
	
	.state('login', {
		url: '/login',
		templateUrl: 'login/login.html',
		controller: 'LoginController'
	})
	
	.state('signup', {
		url: '/signup',
		templateUrl: 'signup/signup.html',
		controller: 'SignupController'
	})
	
	.state('new-chapter', {
		url: '/new-chapter',
		templateUrl: 'signup/new-chapter/new-chapter.html',
		controller: 'NewChapterController'
	})
	
	.state('join-chapter', {
		url: '/join-chapter',
		templateUrl: 'signup/join-chapter/join-chapter.html',
		controller: 'JoinChapterController'
	})
	
	.state('home', {
		url: '/home',
		templateUrl: 'home/home.html',
		controller: 'HomeController'
	})
	
	 $urlRouterProvider.otherwise('/login')
})

ionic.Platform.ready(function() {
	console.log("device ready!");

	angular.bootstrap(document.body, ['HALPP']);
});

// https://medium.com/@dhaval/integrate-sns-push-notifications-with-cordova-ios-app-664e0c4c3a18
//var app = {
//    initialize: function() {
//        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//    },
//    
//    onDeviceReady: function() {
//        this.registerForPush();
//    },
//    
//    registerForPush: function(){
//        var push = PushNotification.init({
//            ios: {
//                alert: "true",
//                badge: "true",
//                sound: "true"
//            }
//        });
//
//        push.on('registration', function(data) {
//            alert('Registration Done: ' + JSON.stringify(data));
//        });
//
//        push.on('notification', function(data) {
//            alert('Notification Received' + JSON.stringify(data));            
//        });
//
//        push.on('error', function(e) {
//          console.log('Notification Error', e);
//        });
//    }
//}
//
//app.initialize();
