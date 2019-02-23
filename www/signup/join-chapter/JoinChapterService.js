app.service('JoinChapterService', function($rootScope, $http, $ionicPopup, $ionicLoading) {
		
	
	this.getChapters =  function() {
		$ionicLoading.show();
		return $http.get($rootScope.apiBasePath + "/v1/chapters").then(function(response){
				$ionicLoading.hide();
				return response;
			}, function(error) {
				$ionicLoading.hide();
				console.log(error)
			}
		);
	}
	
	
})