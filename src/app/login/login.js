angular.module( 'fireBlog.login', [
  'ui.router',
  'placeholders',
  'ui.bootstrap',
  'firebase'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
        'main':{
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})
.controller('LoginCtrl', 
  function($rootScope, $scope,$firebaseAuth,$location,$http){
    var firebaseObj = new Firebase(API_URL);
    $scope.loginObj = $firebaseAuth(firebaseObj);
    $scope.SignIn = function(event) {
      event.preventDefault();  // To prevent form refresh
      $scope.username = $scope.user.email;
      $scope.password = $scope.user.password;
       
      $scope.loginObj.$authWithPassword({
              email: $scope.username,
              password: $scope.password
          })
          .then(function(user) {
              var authData = $scope.loginObj.$getAuth();
              $scope.profileID=authData.uid;

              $http.get(API_URL+'/profile/'+$scope.profileID+'/.json')
              .success(function(data){
                $rootScope.welcome=data.username;
                console.log(data.username);
              });
              // Success callback
              console.log('Authentication successful');
              $location.path('/article');
              // Hide signIn and signUp in nav bar
              $rootScope.currentUserSignedIn = true;
          }, function(error) {
              // Failure callback
              console.log('Authentication failure');
          });

};
   
});