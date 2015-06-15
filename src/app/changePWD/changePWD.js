angular.module( 'fireBlog.changePWD', [
  'ui.router',
  'placeholders',
  'ui.bootstrap',
  'firebase'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'changePWD', {
    url: '/changePWD',
    views: {
        'main':{
        controller: 'ChangePCtrl',
        templateUrl: 'changePWD/changePWD.tpl.html'
      }
    },
    data:{ pageTitle: 'Change Password' }
  });
})
.controller('ChangePCtrl',
  function($scope,$location,$firebaseAuth){
    var firebaseObj = new Firebase(API_URL);
    var auth = $firebaseAuth(firebaseObj); 
    $scope.changeP=function(){
      if (!$scope.changePForm.$invalid) {
        $scope.email= $scope.user.email;
        $scope.password = $scope.user.password3;
        if($scope.user.password2==$scope.user.password3){
          auth.$changePassword(
            {email:$scope.email,
             oldPassword:$scope.user.password1, 
             newPassword:$scope.password}
            )
          .then(function() {
                    // do things if success
                    console.log('Password changed successfully');
                    $location.path('/login');
                }, function(error){
                    // do things if failure
                    console.log(error);
                    $scope.pwdError = true;
                    $scope.pwdErrorMessage = error.message;
                });
          }
          else{
            $scope.pwdError = true;
            $scope.pwdErrorMessage="password are different!";
          }
        }
      };
    }
    );