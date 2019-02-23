app.controller('LoginController', function($scope, $ionicPopup, $state, $ionicHistory, 
		$ionicLoading, $timeout, $rootScope, LoginService) {
	
	var storage = window.localStorage;
	
	$rootScope.currentUser = {};
    $scope.user = {
    		EMAIL_ADDRESS: '',
    		PASSWORD: ''
    };
    
   
    if (storage.getItem("authentication_token") != null) {
    		LoginService.currentUser(storage.getItem("authentication_token")).then(function(response) {
			console.log(response)
			if (response.data.AUTHENTICATION_TOKEN != null) {
				console.log(response.data.AUTHENTICATION_TOKEN)
    				storage.setItem('authentication_token', response.data.AUTHENTICATION_TOKEN);
				storage.setItem('email_address', response.data.EMAIL_ADDRESS);
				$ionicHistory.nextViewOptions({
			    	  disableAnimate: true,
			    	  disableBack: true
			    });
    				$state.go('home')
			}
    		});
    }
    
    
    $scope.login = function() {
    	
    		if ($scope.user.EMAIL_ADDRESS == undefined || $scope.user.EMAIL_ADDRESS == null) {
    			$ionicPopup.alert({
				title: 'Enter Email Address',
				template: 'Please enter your email address.'
			});
    		} else if ($scope.user.PASSWORD == undefined || $scope.user.PASSWORD == null) {
    			$ionicPopup.alert({
    				title: 'Enter Password',
    				template: 'Please enter a password.'
    			});
    		} else {
    			LoginService.loginUser($scope.user).then(function(response) {
    	    			console.log(response)
    	    			if (response.data.AUTHENTICATION_TOKEN != null) {
    	    				console.log(response.data.AUTHENTICATION_TOKEN)
	    	    			storage.setItem('authentication_token', response.data.AUTHENTICATION_TOKEN);
    	    				storage.setItem('email_address', response.data.EMAIL_ADDRESS);
    	    				$ionicHistory.nextViewOptions({
    	    			    	  disableAnimate: true,
    	    			    	  disableBack: true
    	    			    });
	    	    			$state.go('home')
    	    			}
    			});
    		}
    	
    	
	    	
    }
    
    $scope.goSignup = function() {
    		$state.go('signup');
    }
    

    
    
    //app.initialize();
})

/*var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    
    onDeviceReady: function() {
        this.registerForPush();
    },
    
    registerForPush: function(){
    	console.log('register for push')
        var push = PushNotification.init({
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            }
        });

        push.on('registration', function(data) {
            alert('Registration Done: ' + JSON.stringify(data));
        });

        push.on('notification', function(data) {
            alert('Notification Received' + JSON.stringify(data));            
        });

        push.on('error', function(e) {
          console.log('Notification Error', e);
        });
    }
}*/

