angular.module( 'ngBlog', [
  'templates-app',
  'templates-common',
  //'ngSanitize',
  'btford.markdown',
  'ngAnimate',
  'ngBlog.article',
  'ngBlog.post',
  'ngBlog.edit',
  'ngBlog.detail',
  'ngBlog.register',
  'ngBlog.login',
  'ngBlog.changePWD',
  'ngBlog.profile',
  'ngBlog.aboutMe',
  'ngBlog.contact',
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
      $scope.pageTitle = toState.data.pageTitle + ' | ngBlog' ;
    }
  });

})
;



