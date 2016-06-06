Util = {
  $apply: _apply
};

function _apply() {
  angular.element(document).injector().invoke(
    ['$rootScope', function($rootScope) {
      if (!$rootScope.$$phase) {
        $rootScope.$apply();
      }
    }]);
}
