app.service('SignupService', function($rootScope, $http, $ionicPopup, $ionicLoading) {
		
	
	this.user = {};
	
	this.signupUser =  function(email, password) {
		$ionicLoading.show();
		return $http.post($rootScope.apiBasePath + "/v1/users/signup_user?email_address=" + encodeURIComponent(email)
				+ "&password=" + encodeURIComponent(password)).then(function(response){
				$ionicLoading.hide();
				return response;
			}, function(error) {
				$ionicLoading.hide();
				console.log(error)
			}
		);
	}
	
	
})