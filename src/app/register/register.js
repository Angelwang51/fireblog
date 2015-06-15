angular.module( 'fireBlog.register', [
  'ui.router',
  'placeholders',
  'ui.bootstrap',
  'firebase'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'register', {
    url: '/register',
    views: {
        'main':{
        controller: 'RegisterCtrl',
        templateUrl: 'register/register.tpl.html'
      }
    },
    data:{ pageTitle: 'Register' }
  });
})
.controller('RegisterCtrl',
  function($scope,$location,$firebaseAuth,$http){
    var firebaseObj = new Firebase(API_URL);
    var auth = $firebaseAuth(firebaseObj);
    $scope.signUp = function() {
    if (!$scope.regForm.$invalid) {
        $scope.email = $scope.user.email;
        $scope.password = $scope.user.password;
        if ($scope.email && $scope.password) {
            auth.$createUser(
              {email:$scope.email, 
              password:$scope.password})
                .then(function(data) {
                    console.log(data);
                    $scope.profileID=data.uid;
                    var authJSON={
                      username: $scope.email
                    };
                    $http.put(API_URL+'/profile/'+$scope.profileID+'/.json',authJSON);
                    // do things if success
                    console.log('User creation success');
                    $location.path('/login');
                }, function(error) {
                    // do things if failure
                    console.log(error);
                    $scope.regError = true;
                    $scope.regErrorMessage = error.message;
                });
        }
    }
};
});