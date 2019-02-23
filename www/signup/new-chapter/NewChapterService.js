app.service('NewChapterService', function($rootScope, $http, $ionicPopup, $ionicLoading) {
		
	
	this.signup =  function(body) {

		$ionicLoading.show();
		
		return $http.post($rootScope.apiBasePath + "/v1/users/signup", body).then(function(response){
				$ionicLoading.hide();
				return response;
				
			}, function(error) {
				console.log(error)
				$ionicLoading.hide();
				$ionicPopup.alert({
					title: 'Singup Unsuccessful',
					template: 'Please try again.'
				});
			}
		);
	}
	
	
})