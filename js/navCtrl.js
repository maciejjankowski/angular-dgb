app.controller('navCtrl', function ($rootScope, $cookieStore, $location, $http, $scope, LoginSvc, $log, UserSvc, $timeout) {
	$scope.ctrl = 'navCtrl';
	$log.log('navCtrl loading');

	$scope.switchDbg = function(){
		$rootScope.dbg ^= 1;
		$cookieStore.put('dbg', $rootScope.dbg) ;
		$log.warn("dbg: cookie, rootScope")
		$log.log($cookieStore.get('dbg'));
		$log.log($rootScope.dbg);
		$rootScope.dbg?$('[ng-controller]').addClass('dbg-ctrl'):$('[ng-controller]').removeClass('dbg-ctrl');
		$rootScope.dbg?$('[data-ng-controller]').addClass('dbg-ctrl'):$('[data-ng-controller]').removeClass('dbg-ctrl');
		$rootScope.dbg?$('[ng-include]').addClass('dbg-include'):$('[ng-include]').removeClass('dbg-include');
		$rootScope.dbg?$('[data-ng-include]').addClass('dbg-include'):$('[data-ng-include]').removeClass('dbg-include');
	}
	if ($rootScope.dbg){
		$timeout(function(){
			$rootScope.dbg?$('[ng-controller]').addClass('dbg-ctrl'):$('[ng-controller]').removeClass('dbg-ctrl');
			$rootScope.dbg?$('[data-ng-controller]').addClass('dbg-ctrl'):$('[data-ng-controller]').removeClass('dbg-ctrl');
			$rootScope.dbg?$('[ng-include]').addClass('dbg-include'):$('[ng-include]').removeClass('dbg-include');
			$rootScope.dbg?$('[data-ng-include]').addClass('dbg-include'):$('[data-ng-include]').removeClass('dbg-include');
			$rootScope.dbg?$('[ng-view]').addClass('dbg-ctrl'):$('[ng-view]').removeClass('dbg-ctrl');
			$rootScope.dbg?$('[data-ng-view]').addClass('dbg-ctrl'):$('[data-ng-view]').removeClass('dbg-ctrl');
			$rootScope.dbg?$('[ng-app]').addClass('dbg-ctrl'):$('[ng-app]').removeClass('dbg-ctrl');
			$rootScope.dbg?$('[data-ng-app]').addClass('dbg-ctrl'):$('[data-ng-app]').removeClass('dbg-ctrl');

			}, 500)
	}


});