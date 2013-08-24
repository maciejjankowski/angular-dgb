var app = angular.module('dkPro',  ['ngResource','ui.bootstrap','$strap.directives','ngCookies']);

app.config(function ($routeProvider, $logProvider, $compileProvider) {

	$compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/); // to jest po to, żeby nie zjadało linków tel:// na unsafe
//	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    $routeProvider.
		when('/login',  { templateUrl: 'partials/login.html' }).
		when('/start',  { templateUrl: 'partials/start.html' }).
	    when('/',       { templateUrl: 'partials/start.html' }).

		//~ when('/client/new', { templateUrl: 'partials/newClient.html'}).
		//~ when('/client/edit', { templateUrl: 'partials/editClient.html'}).
		//~ when('/client/:id', { templateUrl: 'partials/newClient.html'}).
	
		when('/clients/new', { templateUrl: 'partials/newClient.html'}).
//		when('/clients/edit', { templateUrl: 'partials/newClient.html'}).//todo: nie uprościć tego?
		when('/clients/edit/:id', { templateUrl: 'partials/newClient.html'}).
	    when('/clients/', { templateUrl: 'partials/viewClient.html'}).
		when('/clients/:id', { templateUrl: 'partials/viewClient.html'}).
	
		//~ when('/loans/', { templateUrl: 'partials/loansList.html' }).
		when('/loans/new', { templateUrl: 'partials/newLoan.html' }).
		when('/loans/approve', { templateUrl: 'partials/approveList.html' }).
		when('/loans/:id/approve', { templateUrl: 'partials/approveLoan.html' }).
		when('/loans/:id', { templateUrl: 'partials/newLoan.html' }).


		//~ when('/loan/new', { templateUrl: 'partials/newLoan.html' }).
		//~ when('/loan/approve', { templateUrl: 'partials/approveList.html' }).

		//~ when('/loan/:id', { templateUrl: 'partials/newLoan.html' }).
		//~ when('/loan/:id/approve', { templateUrl: 'partials/approve.html' }).
		
		//~ when('/payment/new', { templateUrl: 'partials/newPayment.html' }).
		//~ when('/payment/vindication', { templateUrl: 'partials/vindication.html' }).

		when('/payments/new', { templateUrl: 'partials/newPayment.html' }).
		when('/payments', { templateUrl: 'partials/duePayments.html' }).

		when('/settings', { redirectTo: '/settings/products' }).
	
		when('/settings/employees', { templateUrl: 'partials/settings/employees/list.html' }).
		when('/settings/employees/new', { templateUrl: 'partials/settings/employees/editEmployee.html' }).
		when('/settings/employees/:employeeId', { templateUrl: 'partials/settings/employees/editEmployee.html' }).
	
		when('/settings/branches', { templateUrl: 'partials/settings/branches/branchesList.html' }).
		when('/settings/branches/new', { templateUrl: 'partials/settings/branches/newBranch.html' }).
		when('/settings/branches/:branchId', { templateUrl: 'partials/settings/branches/newBranch.html' }).
	
		when('/settings/products', { templateUrl: 'partials/settings/products/list.html' }).
		when('/settings/products/new', { templateUrl: 'partials/settings/products/form.html' }).
		when('/settings/products/:productId', { templateUrl: 'partials/settings/products/form.html' }).
		
		when('/settings/options', { templateUrl: 'partials/settings/vindication.html' }).
	    when('/settings/templates', { templateUrl: 'partials/settings/documents.html' }).


	    when('/raport/dzienny/:branchId', { templateUrl: 'partials/r/dzienny.html' }).
		when('/raport/miesieczny/:branchId', { templateUrl: 'partials/r/miesieczny.html' }).
		when('/raport/przyrostKlientow', { templateUrl: 'partials/r/przyrostKlientow.html' }).		
		when('/raport/przyrostKapitalu', { templateUrl: 'partials/r/przyrostKapitalu.html' }).		
//		when('/raport/srednieOpoznienieSplat', { templateUrl: 'partials/r/srednieOpoznienieSplat.html' }).
//		when('/raport/skutecznoscEgzekucji', { templateUrl: 'partials/r/skutecznoscEgzekucji.html' }).
	    when('/notThereYet', { templateUrl: 'partials/nty.html' }).
    otherwise({ redirectTo: '/notThereYet' });
	 
	 //~ $logProvider.debugEnabled(true);
});//~ - . - . - . - . - . - . - .- . - . - . - . - . - . - . - . - . - . - . - . - . - . - . - . 
app.directive('contenteditable', function() {
	return {
		restrict: 'A', // only activate on element attribute
		require: '?ngModel', // get a hold of NgModelController
		link: function(scope, element, attrs, ngModel) {
			if(!ngModel) return; // do nothing if no ng-model

			// Specify how UI should be updated
			ngModel.$render = function() {
				element.html(ngModel.$viewValue || '');
			};

			// Listen for change events to enable binding
			element.bind('blur keyup change', function() {
				scope.$apply(read);
			});
			read(); // initialize

			// Write data to the model
			function read() {
				var html = element.html();
				// When we clear the content editable the browser leaves a <br> behind
				// If strip-br attribute is provided then we strip this out
				if( attrs.stripBr && html == '<br>' ) {
					html = '';
				}
				ngModel.$setViewValue(html);
			}
		}
	};
});


app.run(function ($rootScope, $log, $location, $cookieStore, LoginSvc, UserSvc, $cookies){
	$log = {
		log:function(){},
		warn:function(){},
		error:function(){},
		info:function(){}
	}

	$log.warn("dbg: cookie, rootScope")
	$log.log($cookieStore.get('dbg'));
	$log.log($rootScope.dbg);

	if ($cookieStore.get('dbg')){
		$rootScope.dbg = $cookieStore.get('dbg');
	}
	else {

		$rootScope.dbg = 0;
		$cookieStore.put('dbg', 0);
	}

	$log.warn("dbg: cookie, rootScope")
	$log.log($cookieStore.get('dbg'));
	$log.log($rootScope.dbg);

	var a=new Date().getHours();
	var headID = document.getElementsByTagName("head")[0];         
	var ns = document.createElement('link');
	ns.type = 'text/css';

	ns.rel="stylesheet";
	
	if (0 || (a >= 20) || a < 6 ) {
		ns.href="/stylesheets/darkstrap.css";
		$rootScope.iconClass='icon-white';
	} else ns.href="/stylesheets/bootstrap.min.css";
//	headID.appendChild(ns);

// todo: REMOVE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	if (1 || $cookies.dbg == 1){
		LoginSvc.setUsername('mj');
		LoginSvc.setPassword('mj');//todo: remove
		LoginSvc.login().success(function (data, status, headers, config){
			UserSvc.readUser(data.uid).$then(function(arg){
				$rootScope.user = arg.data;
				LoginSvc.setUser(arg.data);
				if($cookies.next)
				{
					$location.path($cookies.next);
					delete $cookies.next;
				}
				else
					$location.path("/start");
			});
		});
	}



	$rootScope.activePath = $location.path().split('/').pop(); // TODO niezbyt dobrze to działa - za mało logiki
	$rootScope.$on('$routeChangeSuccess', function(){
		$rootScope.activePath = $location.path().split('/').pop();
	});

	$rootScope.$on( "$routeChangeStart", function(event, next, current) { // login

		if ( !$rootScope.user ) {
		// no logged user, we should be going to #login
			if ( next.templateUrl == "partials/login.html" ) {
			  // already going to #login, no redirect needed
			} else {
				$cookies.next = $location.path();
			  // not going to #login, we should redirect now
				$location.path( "/login" );
			}
		}
	});

	$rootScope.alert = function(text){ // todo: this should be a separate controller / directive?
		$rootScope.alertTxt = text;
		$timeout(function(){$rootScope.alertTxt=''},4500);
	}
});

app.controller('loginCtrl', function($scope, LoginSvc, $location, $log, $rootScope, UserSvc, $cookies){
	$scope.login = function (){
		LoginSvc.setUsername($scope.user.username);
		LoginSvc.setPassword($scope.user.password);

		LoginSvc.login().success(function (data, status, headers, config){
//				$rootScope.login = data;
			UserSvc.readUser(data.uid).$then(function(arg){
				$rootScope.user = arg.data;
				LoginSvc.setUser(arg.data);
				if($cookies.next)
				{
					$location.path($cookies.next);
					delete $cookies.next;
				}
				else
					$location.path("/start");
			});
		});

	};

	$scope.logout = function (){
		$rootScope.login = {};
		$rootScope.user = {};
	};

})

app.service('LoginSvc', function ( $routeParams, $http, UserSvc, $log, $cookies, $rootScope) { //todo: this should be a service :)
	//~ var user = {};
	$log.warn('LoginSvc says hello');
	var user = {};
	var username = "";
	var password = "";
	this.login = function (){
		// todo: bind w tych funkcjach poniżej, bo wtedy weźmiemy this.user (LoginSvc.user) = cokolwiek się zwróci z $http
		if (!user.id){
//			$log.log("$rootScope.user");
			$log.warn('attempting login');
			$log.log($rootScope.user);
			return $http.post('/users/login', { username:username, password: password });
		}
	}

	this.getUser = function(){
		return user;
	}

	this.setUser = function(obj){
		user = obj;
		return user;
	}

	this.getBranchId = function (){
		return user && user.branch && user.branch.id;
	}

	this.setUsername = function (arg){
		username = arg;
	}

	this.setPassword = function (arg){
		password = arg;
	}
    
});//~ - . - . - . - . - . - . - .- . - . - . - . - . - . - . - . - . - . - . - . - . - . - . - 
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
		}, 500)
	}


	$scope.getBranchId = function(){
		LoginSvc.getBranchId();
	}

	$scope.getUserName = function(){
		var user = LoginSvc.getUser();
		$scope.username = user.name;
	}

	$scope.logout = function (){
		$rootScope.login = {};
		$rootScope.user = {};
		LoginSvc.setUser({});
		$location.path('/login');
	};

});//~ - . - . - . - . - . - . - .- . - . - . - . - . - . - . - . - . - . - . - . - . - . - . - .