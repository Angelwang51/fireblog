angular.module( 'ngBlog.profile', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'profile', {
    url: '/profile',
    views: {
        'main':{
        controller: 'ProfileCtrl',
        templateUrl: 'profile/profile.tpl.html'
      }
    },
    data:{ pageTitle: 'Profile' }
  });
})
.controller('ProfileCtrl',
  function($scope,$http){
    $scope.addProfile=function(){
      var userJSON ={
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        aboutMe: $scope.aboutMe,
        myPhoto: $scope.myPhoto,
        facebook: $scope.facebook,
        twitter: $scope.twitter,
        instagram: $scope.instagram,
        pinterest: $scope.pinterest
      };
      $http.put('https://torrid-heat-2114.firebaseio.com/aboutMe.json',userJSON)
      .success(function(data){
          console.log(data);
      });
    };
  });
