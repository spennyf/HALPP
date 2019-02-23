app.controller('JoinChapterController', function($scope, $ionicPopup, $state, $ionicHistory, 
		$ionicLoading, $timeout, $rootScope, JoinChapterService) {
	
	
	JoinChapterService.getChapters().then(function(response) {
		if (response.status == 200) {
			$scope.chapters = response.data;
		}
	});



})

