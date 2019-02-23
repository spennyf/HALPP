app.service('LoginService', function($rootScope, $http, $ionicPopup, $ionicLoading) {
		
	this.loginUser =  function(user) {

		$ionicLoading.show();
		console.log($rootScope.apiBasePath + "/v1/users/login?email_address=" + user.EMAIL_ADDRESS 
				+ "&password=" + user.PASSWORD)
					
		return $http.post($rootScope.apiBasePath + "/v1/users/login?email_address=" + user.EMAIL_ADDRESS 
				+ "&password=" + user.PASSWORD).then(function(response){
					$ionicLoading.hide();
					console.log('login res')
					console.log(response)
					return response;
				
			}, function(error) {
				console.log('login err')
				console.log(error)
				$ionicLoading.hide();
				$ionicPopup.alert({
					title: 'Login Unsuccessful',
					template: 'Please enter a vaild username and password.'
				});
			}
		);
	}
		
	this.currentUser =  function(uuid) {
		$ionicLoading.show();
		console.log('current user')
		return $http.post($rootScope.apiBasePath + "/v1/users/login?authentication_token=" + uuid).then(function(response){
				$ionicLoading.hide();
				return response;
			}, function(error) {
				$ionicLoading.hide();
				console.log(error)
			}
		);
	}
	
	
            
            
		
			
	
})
