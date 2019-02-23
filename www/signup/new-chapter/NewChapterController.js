app.controller('NewChapterController', function($scope, $ionicPopup, $state, $ionicHistory, 
		$ionicLoading, $timeout, $rootScope, SignupService, NewChapterService) {
	
	$scope.user = SignupService.user;
	
	$scope.signup = function() {
		
		if ($scope.user.CHAPTER_NAME == undefined || $scope.user.CHAPTER_NAME == null || $scope.user.CHAPTER_NAME.length < 6) {
			$ionicPopup.alert({
				title: 'Invalid Chapter Name',
				template: 'Please enter a chapter name that is 6 or more characters'
			});
		} else {
			NewChapterService.signup($scope.user).then(function(response) {
				console.log(response)
				
			});
		}
		
	}
	
	
})

