app.service('HomeService', function($rootScope, $http, $ionicPopup, $ionicLoading) {
		
	
	this.pushToken =  function(registrationId) {
		$ionicLoading.show();
		var storage = window.localStorage;
		var authToken = storage.getItem('authentication_token');
		return $http.post($rootScope.apiBasePath + "/v1/users/push?authentication_token=" + authToken + "&registrationId=" + registrationId
				+ "&deviceType=" + device.platform).then(function(response){
				$ionicLoading.hide();
				return response;
			}, function(error) {
				$ionicLoading.hide();
				console.log(error)
			}
		);
	}

	this.checkAbstinenceForDay =  function(date) {
		$ionicLoading.show();
		var storage = window.localStorage;
		var authToken = storage.getItem('authentication_token');
		return $http.get($rootScope.apiBasePath + "/v1/users/abstinence?authentication_token=" + authToken
				+ "&date=" + date).then(function(response){
					$ionicLoading.hide();
					return response;
			}, function(error) {
				console.log(error)
				$ionicLoading.hide();
				$ionicPopup.alert({
					title: 'Error',
					template: 'Please try again.'
				});
			}
		);
	}
	
	this.saveAbstinenceForDay =  function(date, abstained) {
		$ionicLoading.show();
		var authToken = window.localStorage.getItem('authentication_token');
		return $http.post($rootScope.apiBasePath + "/v1/users/abstinence?authentication_token=" + authToken
				+ "&date=" + date + "&abstained=" + abstained).then(function(response){
					$ionicLoading.hide();
					return response;
			}, function(error) {
				console.log(error)
				$ionicLoading.hide();
				$ionicPopup.alert({
					title: 'Error',
					template: 'Please try again.'
				});
			}
		);
	}
	
	this.getUserResults =  function() {
		$ionicLoading.show();
		var authToken = window.localStorage.getItem('authentication_token');
		return $http.post($rootScope.apiBasePath + "/v1/users/abstinence_results?authentication_token=" + authToken).then(function(response){
					$ionicLoading.hide();
					return response;
			}, function(error) {
				console.log(error)
				$ionicLoading.hide();
				$ionicPopup.alert({
					title: 'Error',
					template: 'Please try again.'
				});
			}
		);
	}
	
	
			
	
})