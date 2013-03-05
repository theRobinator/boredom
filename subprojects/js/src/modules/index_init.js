goog.require('zoosk.soy.Index');


var index = angular.module('index', [])
    .controller('IndexCtrl', ['$scope', 'momentJson', 'zooskService', zoosk.controllers.IndexCtrl])
    .factory('zooskService', ['$http', '$q', function($http, $q) {
        return new zoosk.services.ZooskService($http, $q);
    } ]);

index.run(['$templateCache', function($templateCache) {
    $templateCache.put('singlemoment.soy', zoosk.soy.Index.singleMoment());
}]);

goog.exportSymbol('zoosk.boostrap.initializeIndex', function(momentJson) {
    index.value('momentJson', momentJson);
    angular.bootstrap(/** @type {Element} */ (document), ['index']);
});
