angular.module( 'fireBlog.aboutMe', [
  'ui.router',
  'plusOne',
  'ui.bootstrap',
  'firebase'
])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'aboutMe', {
    url: '/aboutMe',
    views: {
      "main":{
        templateUrl: 'aboutMe/aboutMe.tpl.html'
      }
    },
    data:{ pageTitle: 'About Me' }
  });
});
