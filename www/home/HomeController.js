app.controller('HomeController', function($scope, $ionicPopup, $state, $ionicHistory, 
		$ionicLoading, $timeout, $rootScope, HomeService) {
	
	$scope.currDate = new Date();
	$scope.currDate.setDate($scope.currDate.getDate()-1);
	$scope.currDateStr = $scope.currDate.getDate() + "/" + ($scope.currDate.getMonth() + 1) + "/" + $scope.currDate.getFullYear();
	$scope.dbDate = $scope.currDate.getFullYear() + "-" + ($scope.currDate.getMonth() + 1) + "-" + $scope.currDate.getDate();
	$scope.daySelected = false;
	$scope.ytd = 0;
	$scope.mtd = 0;
	
	var storage = window.localStorage;
	var currUserEmail = storage.getItem("email_address");
	
	document.addEventListener('deviceready', function() {
		console.log('do push')
		var push = PushNotification.init({
	        ios: {
	            alert: "true",
	            badge: "true",
	            sound: "true"
	        },
	        android: {}
	    });
	
	    push.on('registration', function(data) {
	            console.log('Registration Done: ' + JSON.stringify(data));
	            console.log(data.registrationId)
	            HomeService.pushToken(data.registrationId).then(function(response) {
		        		console.log(response)
		        	});
	    });
	
	    push.on('notification', function(data) {
	            console.log('Notification Received' + JSON.stringify(data));
	    });
	
	    push.on('error', function(e) {
	            console.log('Notification Error', e);
	    });
    });
		
	
	
	HomeService.checkAbstinenceForDay($scope.dbDate).then(function(response) {
		console.log(response)
		if (response.data.ABSTAINED == '') {
			$scope.abstainedMsg = 'Did you abstain?';
		} else if (response.data.ABSTAINED == 'Y') {
			$scope.abstainedMsg = 'You abstained!';
			$scope.daySelected = true;
		} else if (response.data.ABSTAINED == 'N') {
			$scope.abstainedMsg = 'You did not abstain';
			$scope.daySelected = true;
		}
	});
	
	
	HomeService.getUserResults().then(function(response) {
		$scope.results = response.data.RESULTS;
		for (var i = 0; i < $scope.results.length; i++) {
			var user = $scope.results[i];
			if (user.EMAIL == currUserEmail) {
				$scope.ytd = user.DAYS_ABSTAINED;
			}
		}
		
		$scope.resultsMonth = response.data.RESULTS_MONTH;
		for (var i = 0; i < $scope.resultsMonth.length; i++) {
			var user = $scope.resultsMonth[i];
			if (user.EMAIL == currUserEmail) {
				$scope.mtd = user.DAYS_ABSTAINED;
			}
		}
	});
	
	$scope.changeDay = function(change) {
		

		if (change == 'prev') {
			$scope.currDate.setDate($scope.currDate.getDate() - 1);
		} else {
			$scope.currDate.setDate($scope.currDate.getDate() + 1);
		}
		$scope.currDateStr = $scope.currDate.getDate() + "/" + ($scope.currDate.getMonth() + 1) + "/" + $scope.currDate.getFullYear();
		
		$scope.dbDate = $scope.currDate.getFullYear() + "-" + ($scope.currDate.getMonth() + 1) + "-" + $scope.currDate.getDate();
		
		HomeService.checkAbstinenceForDay($scope.dbDate).then(function(response) {
			console.log(response)
			if (response.data.ABSTAINED == '') {
				$scope.abstainedMsg = 'Did you abstain?';
				$scope.daySelected = false;
			} else if (response.data.ABSTAINED == 'Y') {
				$scope.abstainedMsg = 'You abstained!';
				$scope.daySelected = true;
			} else if (response.data.ABSTAINED == 'N') {
				$scope.abstainedMsg = 'You did not abstain';
				$scope.daySelected = true;
			}
		});
		
	}
	
	$scope.saveDay = function(abstained) {
		console.log('saveDay: ' + abstained)
		HomeService.saveAbstinenceForDay($scope.dbDate, abstained).then(function(response) {
			console.log(response)
			if (response.data.ABSTAINED == 'Y') {
				$scope.abstainedMsg = 'You abstained!';
				$scope.daySelected = true;
				$scope.ytd++;
			} else if (response.data.ABSTAINED == 'N') {
				$scope.abstainedMsg = 'You did not abstain';
				$scope.daySelected = true;
			} else if (response.data.ABSTAINED == 'U') {
				if ($scope.abstainedMsg == 'You abstained!') {
					$scope.ytd--;
				}
				$scope.abstainedMsg = 'Did you abstain?';
				$scope.daySelected = false;
			}
			
		});
		
	}
	
	$scope.viewUsersTab = function() {
				
		HomeService.getUserResults().then(function(response) {
			$scope.results = response.data.RESULTS;
			for (var i = 0; i < $scope.results.length; i++) {
				var user = $scope.results[i];
				if (user.EMAIL == currUserEmail) {
					$scope.ytd = user.DAYS_ABSTAINED;
				}
			}
		});
	}
	

	
	
	

})

