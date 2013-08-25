var app = angular.module('app1',  ['ngCookies']);
app.run(function ($rootScope, $cookieStore, $timeout, $log){

	if ($cookieStore.get('dbg')){
		$rootScope.dbg = $cookieStore.get('dbg');
	}
	else {
		$rootScope.dbg = 0;
		$cookieStore.put('dbg', 0);
	}
	
	
	$rootScope.switchDbg = function(){
		$rootScope.dbg ^= 1;
		$cookieStore.put('dbg', $rootScope.dbg) ;
		$log.warn("dbg: cookie, rootScope");
		$rootScope.dbg ? $('[ng-controller]').addClass('dbg-ctrl') : $('[ng-controller]').removeClass('dbg-ctrl');
		$rootScope.dbg ? $('[data-ng-controller]').addClass('dbg-ctrl') : $('[data-ng-controller]').removeClass('dbg-ctrl');
		$rootScope.dbg ? $('[ng-include]').addClass('dbg-include') : $('[ng-include]').removeClass('dbg-include');
		$rootScope.dbg ? $('[data-ng-include]').addClass('dbg-include') : $('[data-ng-include]').removeClass('dbg-include');
		$rootScope.dbg ? $('[ng-view]').addClass('dbg-view') : $('[ng-view]').removeClass('dbg-view');
		$rootScope.dbg ? $('[data-ng-view]').addClass('dbg-view') : $('[data-ng-view]').removeClass('dbg-view');
		$rootScope.dbg ? $('[ng-app]').addClass('dbg-app') : $('[ng-app]').removeClass('dbg-app');
		$rootScope.dbg ? $('[data-ng-app]').addClass('dbg-app') : $('[data-ng-app]').removeClass('dbg-app');
	}

	if ($rootScope.dbg){
		$timeout(function(){
			$rootScope.dbg ? $('[ng-controller]').addClass('dbg-ctrl') : $('[ng-controller]').removeClass('dbg-ctrl');
			$rootScope.dbg ? $('[data-ng-controller]').addClass('dbg-ctrl') : $('[data-ng-controller]').removeClass('dbg-ctrl');
			$rootScope.dbg ? $('[ng-include]').addClass('dbg-include') : $('[ng-include]').removeClass('dbg-include');
			$rootScope.dbg ? $('[data-ng-include]').addClass('dbg-include') : $('[data-ng-include]').removeClass('dbg-include');
			$rootScope.dbg ? $('[ng-view]').addClass('dbg-view') : $('[ng-view]').removeClass('dbg-view');
			$rootScope.dbg ? $('[data-ng-view]').addClass('dbg-view') : $('[data-ng-view]').removeClass('dbg-view');
			$rootScope.dbg ? $('[ng-app]').addClass('dbg-app') : $('[ng-app]').removeClass('dbg-app');
			$rootScope.dbg ? $('[data-ng-app]').addClass('dbg-app') : $('[data-ng-app]').removeClass('dbg-app');


		}, 500);
	}
	
});

app.controller('navCtrl', function ($rootScope, $scope, $cookieStore, $log, $timeout) {

// you dont really need this:
	$timeout(function(){
			var ctx = $('#canvas1')[0].getContext("2d");
			ctx.fillStyle="#FF0000";
			ctx.fillRect(0,0,6,12);
			ctx.fillStyle="#FFFFFF";
			ctx.fillRect(6,0,12,12);
			ctx.fillStyle="#0000FF";
			ctx.fillRect(12,0,18,12);
		},
		500
	);
	
	
});

app.controller('oneCtrl',function(){});
app.controller('twoCtrl',function(){});