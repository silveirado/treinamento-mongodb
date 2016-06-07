import angular       from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter      from 'angular-ui-router';
import 'bootstrap';


angular.module('escola', [angularMeteor, uiRouter]);


function onReady() {
  angular.bootstrap(document, ['escola'], {strictDi: true});
}

if(Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
