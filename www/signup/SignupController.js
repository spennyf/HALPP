app.controller('SignupController', function($scope, $ionicPopup, $state, $ionicHistory, 
		$ionicLoading, $timeout, $rootScope, SignupService, LoginService) {
	
	var storage = window.localStorage;
	
	$scope.user = SignupService.user;
	
	$scope.goBack = function() {
		console.log('go back')
		$ionicHistory.goBack();
	}
	
	
    $scope.createChapter = function() {
    	
    		if ($scope.user.EMAIL_ADDRESS != undefined && $scope.user.EMAIL_ADDRESS != null && !$rootScope.validateEmail($scope.user.EMAIL_ADDRESS)) {
			$ionicPopup.alert({
				title: 'Invalid Email',
				template: 'Please enter a vaild email address'
			});
    		} else if ($scope.user.PASSWORD == undefined || $scope.user.PASSWORD == null || $scope.user.PASSWORD.length < 6) {
    			$ionicPopup.alert({
    				title: 'Invalid Password',
    				template: 'Please enter a password that is 6 or more characters'
    			});
    		} else {
    			$state.go('new-chapter');
    		}
    }
    
    $scope.join = function() {
    	
    		if ($scope.user.EMAIL_ADDRESS == undefined || $scope.user.EMAIL_ADDRESS == null || !$rootScope.validateEmail($scope.user.EMAIL_ADDRESS)) {
			$ionicPopup.alert({
				title: 'Invalid Email',
				template: 'Please enter a vaild email address'
			});
    		} else if ($scope.user.PASSWORD == undefined || $scope.user.PASSWORD == null || $scope.user.PASSWORD.length < 6) {
    			$ionicPopup.alert({
    				title: 'Invalid Password',
    				template: 'Please enter a password that is 6 or more characters'
    			});
    		} else {
    			
    			SignupService.signupUser($scope.user.EMAIL_ADDRESS, $scope.user.PASSWORD).then(function(response) {
	    			console.log(response)
	    			if (response.data.AUTHENTICATION_TOKEN != null) {
	    				storage.setItem('authentication_token', response.data.AUTHENTICATION_TOKEN);
	    				$ionicHistory.nextViewOptions({
	    			    	  disableAnimate: true,
	    			    	  disableBack: true
	    			    });
	    				$state.go('home');
	    			}
//	    			LoginService.loginUser($scope.user).then(function(response) {
//	    	    			if (response.data.AUTHENTICATION_TOKEN != null) {
//	    	    				console.log(response.data.AUTHENTICATION_TOKEN)
//		    	    			storage.setItem('authentication_token', response.data.AUTHENTICATION_TOKEN);
//	    	    				$ionicHistory.nextViewOptions({
//	    	    			    	  disableAnimate: true,
//	    	    			    	  disableBack: true
//	    	    			    });
//		    	    			$state.go('home')
//	    	    			}
//	    			});
			});
    		}
    	
    }
    
   
    
    
})

