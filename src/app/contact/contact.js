angular.module( 'fireBlog.contact', [
  'ui.router',
  'plusOne',
  'ui.bootstrap',
  'firebase'
])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'contact', {
    url: '/contact',
    views: {
      "main":{
        templateUrl: 'contact/contact.tpl.html'
      }
    },
    data:{ pageTitle: 'Contact' }
  });
});