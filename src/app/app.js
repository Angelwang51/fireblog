var API_URL = 'https://torrid-heat-2114.firebaseio.com';

angular.module( 'fireBlog', [
  'templates-app',
  'templates-common',
  //'ngSanitize',
  'btford.markdown',
  'ngAnimate',
  'fireBlog.article',
  'fireBlog.post',
  'fireBlog.edit',
  'fireBlog.detail',
  'fireBlog.register',
  'fireBlog.login',
  'fireBlog.changePWD',
  'fireBlog.aboutMe',
  'fireBlog.contact',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/article' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | fireBlog' ;
    }
  });

})
;



