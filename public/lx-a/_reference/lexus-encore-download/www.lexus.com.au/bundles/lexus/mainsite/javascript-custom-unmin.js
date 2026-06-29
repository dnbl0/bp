/* Minification failed. Returning unminified contents.
(2418,36-37): run-time error JS1003: Expected ':': ,
(2418,48-49): run-time error JS1003: Expected ':': ,
(2418,61-62): run-time error JS1003: Expected ':': }
(2620,40-41): run-time error JS1195: Expected expression: )
(2620,43-44): run-time error JS1195: Expected expression: >
(2622,22-23): run-time error JS1195: Expected expression: ,
(2622,28-29): run-time error JS1003: Expected ':': )
(2623,17-18): run-time error JS1002: Syntax error: }
(2625,72-73): run-time error JS1004: Expected ';': {
(2632,18-19): run-time error JS1195: Expected expression: )
(2634,72-73): run-time error JS1004: Expected ';': {
(2638,18-19): run-time error JS1195: Expected expression: )
(2647,62-63): run-time error JS1004: Expected ';': {
(2689,17-18): run-time error JS1028: Expected identifier or string: .
(2689,19-20): run-time error JS1010: Expected identifier: .
(2690,25-26): run-time error JS1004: Expected ';': :
(2690,64-65): run-time error JS1197: Too many errors. The file might not be a JavaScript file: ,
(2664,5-44): run-time error JS1301: End of file encountered before function is properly closed: function eventTrack(action, properties)
(2691,14-15): run-time error JS1195: Expected expression: )
(2691,15-16): run-time error JS1197: Too many errors. The file might not be a JavaScript file: ;
 */
/* Minification failed. Returning unminified contents.
(2396,36-37): run-time error JS1003: Expected ':': ,
(2396,48-49): run-time error JS1003: Expected ':': ,
(2396,61-62): run-time error JS1003: Expected ':': }
(2598,40-41): run-time error JS1195: Expected expression: )
(2598,43-44): run-time error JS1195: Expected expression: >
(2600,22-23): run-time error JS1195: Expected expression: ,
(2600,28-29): run-time error JS1003: Expected ':': )
(2601,17-18): run-time error JS1002: Syntax error: }
(2603,72-73): run-time error JS1004: Expected ';': {
(2610,18-19): run-time error JS1195: Expected expression: )
(2612,72-73): run-time error JS1004: Expected ';': {
(2616,18-19): run-time error JS1195: Expected expression: )
(2625,62-63): run-time error JS1004: Expected ';': {
(2667,17-18): run-time error JS1028: Expected identifier or string: .
(2667,19-20): run-time error JS1010: Expected identifier: .
(2668,25-26): run-time error JS1004: Expected ';': :
(2668,64-65): run-time error JS1197: Too many errors. The file might not be a JavaScript file: ,
(2642,5-44): run-time error JS1301: End of file encountered before function is properly closed: function eventTrack(action, properties)
(2669,14-15): run-time error JS1195: Expected expression: )
(2669,15-16): run-time error JS1197: Too many errors. The file might not be a JavaScript file: ;
 */
(function() {
    'use strict';
    angular.module(
        'Lexus', [
            'Lexus.Directives',
            'Lexus.Components',
            'Lexus.Factories',
            'Lexus.Services',
            'Lexus.Filters',
            'ngTouch',
            'ngCookies',
            'ngSanitize',
            'ngAnimate',
            'ngTagsInput',
            'ng-directives-utils.transcludeReplace',
            'vcRecaptcha',
            '720kb.datepicker',
            'ngRoute',
            'ngDialog',
            'angularCancelOnNavigateModule',
            'angulartics',
            'Lexus.angulartics',
            'angulartics.debug',
            'duParallax'

        ]);

    // Namespaces
    angular.module('Lexus.Directives', []);
    angular.module('Lexus.Factories', []);
    angular.module('Lexus.Services', []);
    angular.module('Lexus.Filters', []);
    angular.module('Lexus.Components', []);
})();;
"use strict";

angular.module('Lexus.Filters', [])
    .filter('formatArgs', [function() { // pass url and array of arguments.
        return function(url, args) {

            var urlReplacers = url.match(/\{[0-9]+\}/g);
            var replaced = 0;
            // Loop through arguments and replace url value.
            angular.forEach(args, function(value, key) {
                url = url.replace("{" + key + "}", value);
                replaced++;
            });
            //strips off the unused replacers from URL
            if (urlReplacers.length > replaced) {
                for (var _t = replaced; _t < urlReplacers.length; _t++) {
                    url = url.replace("/{" + _t + "}", '');
                }
            }

            return url;
        };
    }])
    .filter('format', [function() {
        return function(value, template) {
            return template.replace('{0}', value);
        }
    }])
    .filter('replaceCaseInsensitive', [function() {
        return function(value, substringValue) {
            if (typeof(value) != "string") return value;

            var r = new RegExp(substringValue, "i");
            return value.replace(r, "");
        }
    }])
    .filter('sanatize', [function() { // Remove certain characters from variable.
        return function(value) {
            if (value !== null) {
                return value.replace(/[^a-z0-9.\-@\s\/\'\&\u2019\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+/gi, '');
            }
        };
    }])
    .filter('lowerCaseFirstLetter', function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toLowerCase() + input.substr(1) : '';
        }
    })
    .filter('currencyNoZero', ['$filter', function($filter) {
        return function(input) {
            return (parseInt(input) === 0) ? '' : $filter('currency')(input);
        }
    }])
    .filter('currencyNoZeroNoCents', ['$filter', function($filter) {
        return function(input) {
            return (parseInt(input) === 0) ? '' : $filter('currency')(input, undefined, 0);
        }
    }])
    .filter('currencyRounded', ['$filter', function($filter) {
        return function(input) {
            return $filter('currency')(Math.round(input));
        }
    }])
    .filter('dateToBE', ['$filter', function($filter) { // Format FE date for BE.
        return function(value, format) {
            if (angular.isDefined(value) && !angular.equals(value, '')) {
                var date = moment(value, format);

                return {
                    day: date.format('D'),
                    month: date.format('M'),
                    year: date.format('YYYY'),
                    fullDate: date.format('YYYY-M-D')
                };
            } else {
                return {
                    day: '',
                    month: '',
                    year: '',
                    fullDate: ''
                };
            }
        };
    }])
    .filter('dateToUniversal', ['$filter', function($filter) { // Format BE date for FE.
        return function(value) {
            if (angular.isDefined(value) && !angular.equals(value, '')) {
                var date = moment(value, 'YYYY-MM-DD');

                return date.unix();
            } else {
                return '';
            }
        };
    }])
    .filter('filterLower', function() {
        return function(array, value) {
            return array.filter(function(element, index, array) {
                if (element.rating <= value.rating) {
                    return element;
                }
            });
        };
    })
    .filter('filterHigher', function() {
        return function(array, value) {
            return array.filter(function(element, index, array) {
                if (element.rating >= value.rating) {
                    return element;
                }
            });
        };
    })
    .filter('removeSpaces', function() {
        return function(text) {
            return String(text).replace(/\s+/g, '');
        }
    })
    .provider('filterWatcher', function() {

        this.$get = ['$window', '$rootScope', function($window, $rootScope) {

            /**
             * Cache storing
             * @type {Object}
             */
            var $$cache = {};

            /**
             * Scope listeners container
             * scope.$destroy => remove all cache keys
             * bind to current scope.
             * @type {Object}
             */
            var $$listeners = {};

            /**
             * $timeout without triggering the digest cycle
             * @type {function}
             */
            var $$timeout = $window.setTimeout;

            /**
             * @description
             * get `HashKey` string based on the given arguments.
             * @param fName
             * @param args
             * @returns {string}
             */
            function getHashKey(fName, args) {
                function replacerFactory() {
                    var cache = [];
                    return function(key, val) {
                        if (angular.isObject(val) && !(val == null)) {
                            if (~cache.indexOf(val)) return '[Circular]';
                            cache.push(val)
                        }
                        if ($window == val) return '$WINDOW';
                        if ($window.document == val) return '$DOCUMENT';
                        if (val && val.$evalAsync && val.$watch) return '$SCOPE';
                        return val;
                    }
                }
                return [fName, JSON.stringify(args, replacerFactory())]
                    .join('#')
                    .replace(/"/g, '');
            }

            /**
             * @description
             * fir on $scope.$destroy,
             * remove cache based scope from `$$cache`,
             * and remove itself from `$$listeners`
             * @param event
             */
            function removeCache(event) {
                var id = event.targetScope.$id;
                forEach($$listeners[id], function(key) {
                    delete $$cache[key];
                });
                delete $$listeners[id];
            }

            /**
             * @description
             * for angular version that greater than v.1.3.0
             * it clear cache when the digest cycle is end.
             */
            function cleanStateless() {
                $$timeout(function() {
                    if (!$rootScope.$$phase)
                        $$cache = {};
                }, 2000);
            }

            /**
             * @description
             * Store hashKeys in $$listeners container
             * on scope.$destroy, remove them all(bind an event).
             * @param scope
             * @param hashKey
             * @returns {*}
             */
            function addListener(scope, hashKey) {
                var id = scope.$id;
                if (angular.isUndefined($$listeners[id])) {
                    scope.$on('$destroy', removeCache);
                    $$listeners[id] = [];
                }
                return $$listeners[id].push(hashKey);
            }

            /**
             * @description
             * return the `cacheKey` or undefined.
             * @param filterName
             * @param args
             * @returns {*}
             */
            function $$isMemoized(filterName, args) {
                var hashKey = getHashKey(filterName, args);
                return $$cache[hashKey];
            }

            /**
             * @description
             * store `result` in `$$cache` container, based on the hashKey.
             * add $destroy listener and return result
             * @param filterName
             * @param args
             * @param scope
             * @param result
             * @returns {*}
             */
            function $$memoize(filterName, args, scope, result) {
                var hashKey = getHashKey(filterName, args);
                //store result in `$$cache` container
                $$cache[hashKey] = result;
                // for angular versions that less than 1.3
                // add to `$destroy` listener, a cleaner callback
                if (scope && scope.$evalAsync && scope.$watch) {
                    addListener(scope, hashKey);
                } else {
                    cleanStateless();
                }
                return result;
            }

            return {
                isMemoized: $$isMemoized,
                memoize: $$memoize
            }
        }];
    })
    .filter('groupBy', ['$parse', 'filterWatcher', function($parse, filterWatcher) {
        return function(collection, property) {

            if (!angular.isObject(collection) || angular.isUndefined(property)) {
                return collection;
            }

            return filterWatcher.isMemoized('groupBy', arguments) ||
                filterWatcher.memoize('groupBy', arguments, this,
                    _groupBy(collection, $parse(property)));

            /**
             * groupBy function
             * @param collection
             * @param getter
             * @returns {{}}
             */
            function _groupBy(collection, getter) {
                var result = {};
                var prop;

                angular.forEach(collection, function(elm) {
                    prop = getter(elm);

                    if (!result[prop]) {
                        result[prop] = [];
                    }
                    result[prop].push(elm);
                });
                return result;
            }
        }
    }]);;
"use strict";
angular.module('Lexus.Factories')
    .factory('API', ['$http', '$q', function($http, $q) { // Query API and return JSON.
        return {
            get: function(url, callback) {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: url
                }).
                then(function success(response) {
                    if (callback) {
                        callback();
                    }
                    if (response.data.ErrorMessage) {
                        deferred.reject(response.data, 200);
                    } else {
                        deferred.resolve(response.data);
                    }
                }, function error(response) {
                    var myresult = {
                        reason: response.data,
                        status: response.status,
                        ErrorMessage: response.statusText
                    };
                    deferred.reject(myresult);
                });

                return deferred.promise;
            },
            post: function(url, data) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: url,
                    data: data
                }).
                then(function success(response) {
                    if (response.data.ErrorMessage) {
                        deferred.reject(response.data, 200);
                    } else {
                        deferred.resolve(response.data);
                    }
                }, function(response) {
                    var myresult = {
                        reason: response.data,
                        status: response.status,
                        ErrorMessage: response.statusText
                    };
                    deferred.reject(myresult);
                });

                return deferred.promise;
            },
            del: function(url, callback) {
                var deferred = $q.defer();

                $http({
                    method: 'DELETE',
                    url: url
                }).
                then(function success(response) {
                    if (callback) {
                        callback();
                    }
                    if (response.data.ErrorMessage) {
                        deferred.reject(response.data, 200);
                    } else {
                        deferred.resolve(response.data);
                    }
                }, function error(response) {
                    var myresult = {
                        reason: response.data,
                        status: response.status,
                        ErrorMessage: response.statusText
                    };
                    deferred.reject(myresult);
                });

                return deferred.promise;
            }
        };
    }]);;
"use strict";
angular.module('angularCancelOnNavigateModule', [])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('HttpRequestTimeoutInterceptor');
    }])
    .run(['$rootScope', 'HttpPendingRequestsService', function($rootScope, HttpPendingRequestsService) {
        //$rootScope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {
        //    if (newUrl != oldUrl) {
        //        HttpPendingRequestsService.cancelAll();
        //    }
        //})
    }]);

angular.module('angularCancelOnNavigateModule')
    .service('HttpPendingRequestsService', ['$q', function($q) {
        var cancelPromises = [];

        function newTimeout() {
            var cancelPromise = $q.defer();
            cancelPromises.push(cancelPromise);
            //console.log('%c HttpPendingRequestsService newTimeout() -> cancelPromises: ', 'color: red;', cancelPromises);
            return cancelPromise.promise;
        }

        function cancelAll() {
            console.log('%c HttpPendingRequestsService cancelAll() -> cancelPromises: ', 'color: red;', cancelPromises);
            angular.forEach(cancelPromises, function(cancelPromise) {
                cancelPromise.promise.isGloballyCancelled = true;
                cancelPromise.resolve();
            });
            cancelPromises.length = 0;
        }

        return {
            newTimeout: newTimeout,
            cancelAll: cancelAll
        };
    }]);

angular.module('angularCancelOnNavigateModule')
    .factory('HttpRequestTimeoutInterceptor', ['$q', 'HttpPendingRequestsService', function($q, HttpPendingRequestsService) {
        return {
            request: function(config) {
                config = config || {};
                if (config.timeout === undefined && !config.noCancelOnRouteChange) {
                    config.timeout = HttpPendingRequestsService.newTimeout();
                }
                return config;
            },

            responseError: function(response) {
                if (response.config.timeout.isGloballyCancelled) {
                    return $q.defer().promise;
                }
                return $q.reject(response);
            }
        };
    }]);;
"use strict";

angular.module('Lexus.Factories')
    .factory('Geolocation', ['$q', '$rootScope', function($q, $rootScope) {
        return function() {

            var deferred = $q.defer();
            var geoLocServiceExists = 'geolocation' in navigator;
            var timeout;

            var defOptions = {
                timeout: 8000
            };

            if (geoLocServiceExists) {
                //success
                var geoOnSuccess = function(position) {
                    if (position) {
                        window.clearTimeout(timeout);
                        deferred.resolve({
                            "lat": position.coords.latitude,
                            "lng": position.coords.longitude,
                            "success": true,
                            "message": "pass"
                        });
                    }
                };
                //error
                var geoOnError = function(error) {
                    window.clearTimeout(timeout);
                    deferred.reject({
                        "success": false,
                        "error": error,
                        "message": error
                    }, 200);
                };

                // start timer. See firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=675533
                // this will force a failure notice after the above configured timeout, as firefox will
                // never give us the error
                timeout = window.setTimeout(geoOnError, defOptions.timeout);

                //getPosition call
                navigator.geolocation.getCurrentPosition(geoOnSuccess, geoOnError, defOptions);

                // when opening the modal, stop attempting to get the location
                $rootScope.$on('modal-open', function() {
                    window.clearTimeout(timeout);
                });
            } else {
                deferred.reject({
                    "success": false,
                    "message": "geoLocation is not supported"
                });
            }

            return deferred.promise;
        }
    }]);;
"use strict";

angular.module('Lexus.Factories')
    .factory('Geodecode', ['$q', '$filter', 'API', 'Geolocation', function($q, $filter, API, Geolocation) {
        return function() {


            var geodeferred = $q.defer();

            var response = {
                isSuccessfull: false,
                data: {},
                message: ''
            };

            var addressParse = {};

            var onSuccess = function(geoData) {
                if (geoData && geoData.success) {
                    var addressDecode = $filter('formatArgs')(Lexus.API.Address.GeoDecode, [Lexus.ID.Site, geoData.lat, geoData.lng]);

                    API.get(addressDecode).then(function(req) {

                        $.each(req.Data.results, function(i, item) {
                            if (item.types[0] === "postal_code") {
                                addressParse.postcode = item.address_components[0].short_name;
                            }
                            if (item.types[0] === "locality") {
                                addressParse.suburb = item.address_components[0].short_name;
                            }
                            if (item.types[0] === "administrative_area_level_1") {
                                addressParse.state = item.address_components[0].short_name;
                            }
                        });

                        response.isSuccessfull = true;
                        response.data = addressParse;

                        geodeferred.resolve(response);

                    }, function(data) {
                        response.message = "failed to get the parsed address";
                        geodeferred.reject(response);
                    });
                } else {
                    response.message = "failed to get the co-ordinates from geolocation service";
                    geodeferred.reject(response);
                }
            };

            var onError = function(data) {
                response.message = (data) ? data.message : "geo service unavailable";
                geodeferred.reject(response);
            };

            //Invoke Geolocation service
            var _g = Geolocation();
            _g.then(onSuccess, onError);

            return geodeferred.promise;
        }
    }]);;
"use strict";

angular.module('Lexus.Services')
    .service('AddressSuggestService', ['$timeout', '$http', 'API', '$filter', function($timeout, $http, API, $filter) {
        var self = this;
        var params = {};

        params.defaults = {
            siteID: Lexus.ID.Site,
            term: null
        };

        params.params = {
            siteID: params.defaults.siteID,
            term: params.defaults.term
        };

        self.GetResults = function(callback) {
            params.params.searchQueryUrl = $filter('formatArgs')(Lexus.API.Lookup.Suburb, [
                params.params.siteID,
                params.params.term
            ]);

            return API.get(params.params.searchQueryUrl, callback);
        }

        // Update a search parameter.
        self.setParam = function(name, value) {
            params.params[name] = value;
        };

        // Get a parameter value
        self.getParam = function(name) {
            return params.params[name];
        };


        return self;
    }]);;
"use strict";

angular.module('Lexus.Services')
    .factory('BuildPriceService', ['$q', '$timeout', 'BuildPriceAPIService', function($q, $timeout, BuildPriceAPIService) {
        var self = this;

        self.events = {
            pageNavigation: 'bp-page-navigation',
            pageNavigationBroadcast: 'bp-page-navigation-broadcast',
            openPostcodeDialog: 'open-change-postcode',
            closePostcodeDialog: 'close-change-postcode',
            postcodeChanged: 'postcode-changed',
            openPostcodeSlideout: 'open-postcode-slideout',
            confirmPostcodeFromSlideout: 'confirm-postcode-slideout',

            overviewDataReceived: 'bp-overview-data-received',
            vehicleDataReceived: 'bp-vehicle-data',
            enhancementPacksReceived: 'bp-enhancement-pack-data',
            trimsReceived: 'bp-trim-data',
            paintsReceived: 'bp-colour-data',

            modelSelected: 'bp-did-select-model',
            modelSelectedUpdateMenu: 'bp-did-select-model-update-menu',
            engineVariantSelected: 'bp-did-select-engine-variant',
            gradeSelected: 'bp-did-select-grade',
            enhancementPackSelected: 'bp-did-select-enhancement-pack',
            paintSelected: 'bp-did-select-paint',
            trimSelected: 'bp-did-select-trim',

            threeSixtyLoad: 'bp-did-360-start',
            threeSixtyLoaded: 'bp-did-360-done',

            userSelection: 'bp-user-selection',

            priceLoad: 'bp-did-price-start',
            priceDone: 'bp-did-price-done',
            priceReceived: 'bp-did-price-succeed',
            priceError: 'bp-did-price-error',

            onOfferText: 'bp-on-offer-text',

            vehicleDataRelay: 'bp-vehicle-relay',
            paintDataRelay: 'bp-paint-relay',
            invalidSelectionError: 'bp-invalid-selection',

            holdPricingCalls: 'bp-hold-pricing-calls',
            holdPricingCallsRelay: 'bp-hold-pricing-calls-relay',

            gtmEvent: 'bp-gtm-event',
            onCompareVehicles: 'cv-on-compare-vehicles',
            compareVehicleActiveSelection: 'cv-vehicle-active-selection',

            triggerSaveBuildPriceDialog: 'trigger-save-build-price',
            triggerCloseSaveBuildPriceDialog: 'trigger-close-save-build-price',
            closeSaveBuildPriceDialog: 'close-save-build-price',
            openSaveBuildPriceDialog: 'open-save-build-price',
        };

        self.findModelInVehicleData = function(modelName) {
            var modelObj;
            for (var btIdx in BuildPriceAPIService.data) {
                modelObj = BuildPriceAPIService.data[btIdx].models.find(function(model) {
                    return model.uriName === modelName;
                });
                if (modelObj) {
                    return modelObj;
                }
            }
        };

        //Remove soon, moved to bp-api
        self.findEngineVariantInVehicleData = function(variantName) {
            for (var btIdx in BuildPriceAPIService.data) {
                for (var mdlIdx in BuildPriceAPIService.data[btIdx].models) {
                    var engineVariantObj = BuildPriceAPIService.data[btIdx].models[mdlIdx].modelEngineVariants.find(function(variant) {
                        return variant.uriName === variantName;
                    });
                    if (engineVariantObj) {
                        return engineVariantObj;
                    }
                }
            }

            return {
                grades: []
            };
        };

        self.findGradeInVehicleData = function(gradeId) {
            var gradeObj;
            for (var btIdx in BuildPriceAPIService.data) {
                for (var mdlIdx in BuildPriceAPIService.data[btIdx].models) {
                    for (var varIdx in BuildPriceAPIService.data[btIdx].models[mdlIdx].modelEngineVariants) {
                        gradeObj = BuildPriceAPIService.data[btIdx].models[mdlIdx].modelEngineVariants[varIdx].grades.find(function(grade) {
                            return grade.id === gradeId;
                        });
                        if (gradeObj) {
                            return gradeObj;
                        }
                    }
                }
            }
        };

        self.waitCondition = {
            CHANGED: 0,
            NOTNULL: 1,
            ISNULL: 2,
            NOTEMPTY: 3,
            ISTRUE: 4,
            ISSTRICTLYTRUE: 5,
            ISFALSE: 6,
            ISSTRICTLYFALSE: 7
        };

        self.stepIds = {
            MODEL: "MODEL",
            GRADE: "GRADE",
            ENHANCEMENT_PACK: "ENHANCEMENT_PACK",
            PAINT_TRIM: "PAINT_TRIM",
            SUMMARY: "SUMMARY"
        };

        self.routingSettings = {
            baseUrl: '',
            argIdx: ['carmodel', 'engineVariant', 'grade', 'enhancementPack', 'colour', 'trim']
        };

        self.waitFor = function(target, waitCondition) {
            var defer = $q.defer();

            var currentValue = eval("this." + target);
            if ((waitCondition === self.waitCondition.NOTNULL && currentValue != null ||
                    waitCondition === self.waitCondition.ISNULL && currentValue == null)) {
                defer.resolve(currentValue);
            }

            var unbind = this.$watch(target, function(newValue, oldValue) {
                switch (waitCondition) {
                    case self.waitCondition.CHANGED:
                        unbind();
                        defer.resolve(newValue);
                        break;
                    case self.waitCondition.NOTNULL:
                        if (newValue != null) {
                            unbind();
                            defer.resolve(newValue);
                        }
                        break;
                    case self.waitCondition.ISNULL:
                        if (newValue == null) {
                            unbind();
                            defer.resolve(newValue);
                        }
                        break;
                    case self.waitCondition.NOTEMPTY:
                        if (newValue != null && newValue.length != null && newValue.length > 0) {
                            unbind();
                            defer.resolve(newValue);
                        }
                        break;
                    case self.waitCondition.ISTRUE:
                        if (newValue == true) {
                            unbind();
                            defer.resolve(newValue);
                        }
                        break;
                    case self.waitCondition.ISSTRICTLYTRUE:
                        if (newValue === true) {
                            unbind();
                            defer.resolve(newValue);
                        }
                        break;
                    case self.waitCondition.ISFALSE:
                        if (newValue == false) {
                            unbind();
                            defer.resolve(newValue);
                        }
                        break;
                    case self.waitCondition.ISSTRICTLYFALSE:
                        7
                        if (newValue === false) {
                            unbind();
                            defer.resolve(newValue);
                        }
                        break;
                    default:
                        unbind();
                        defer.reject();
                }
            });

            return defer.promise
        }

        self.watchDebounce = function(func, wait, immediate) {
            var timeout;

            var deferred = $q.defer();

            return function() {
                var context = this,
                    args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) {
                        deferred.resolve(func.apply(context, args));
                        deferred = $q.defer();
                    }
                };
                var callNow = immediate && !timeout;
                if (timeout) {
                    $timeout.cancel(timeout);
                }
                timeout = $timeout(later, wait);
                if (callNow) {
                    deferred.resolve(func.apply(context, args));
                    deferred = $q.defer();
                }
                return deferred.promise;
            };
        }

        self.getGradeNameFromId = function(gradeId) {
            var grade = self.findGradeInVehicleData(gradeId);
            return grade ? grade.name : "Unknown";
        }

        self.getColourFromUri = function(colours, colour) {
            return colours.find(function(currentColour) {
                return currentColour.uriName == colour;
            });

        }

        self.emitInvalidSelection = function(invalidSelectionData) {

            console.error("Specification validation failed in " + (invalidSelectionData.controllerName ? invalidSelectionData.controllerName : "scope id " + invalidSelectionData.$scope.$id) + ": '" + invalidSelectionData.invalidValue + "' - value defaulted to '" + invalidSelectionData.defaultValue + "'");
            invalidSelectionData.$scope.$emit(self.events.invalidSelectionError, invalidSelectionData);
        }

        self.fragmentReplacementMap = [
            //orig-regex, orig-replacement, reverse-regex, reverse-replacement
            [/-/g, "_", /_/g, "-"],
            [/\s/g, "-", /-/g, " "],
            [/\//g, "~", /~/g, "/"]
        ];

        self.pathReplacementMap = [
            [/\/+/g, "/"]
        ];

        //Makes replacements in the fragmentReplacementMap
        self.encodeUriFragment = function(pathFragment) {
            if (pathFragment == null) return;
            for (var i = 0; i < self.fragmentReplacementMap.length; i++) {
                pathFragment = pathFragment.replace(self.fragmentReplacementMap[i][0], self.fragmentReplacementMap[i][1]);
            }
            return pathFragment
        }

        self.decodeUriFragment = function(pathFragment) {
            if (pathFragment == null) return;
            for (var i = self.fragmentReplacementMap.length - 1; i >= 0; i--) {
                pathFragment = pathFragment.replace(self.fragmentReplacementMap[i][2], self.fragmentReplacementMap[i][3]);
            }
            return pathFragment;
        }

        //Makes replacements in the pathReplacementMap
        self.encodeUriPath = function(path) {
            if (path == null) return;
            for (var i = 0; i < self.pathReplacementMap.length; i++) {
                path = path.replace(self.pathReplacementMap[i][0], self.pathReplacementMap[i][1]);
            }
            return path;
        }

        //Vehicle structure in the format
        /*
        vehicle: {
                  carmodel: 'CT',
                  engineVariant: 'CT 200',
                  grade: '',
                  postcode: '3000',
                  enhancementPack: 'Standard',
                  colour: '',
                  trim: ''
                }
        */
        self.getBuildPriceLink = function(vehicle, step) {

            var url = (vehicle.carmodel) ? self.encodeUriFragment(vehicle.carmodel) : "";
            url = url + "/";

            if (vehicle.engineVariant) {

                url = url + self.encodeUriFragment(vehicle.engineVariant) + "/";
                if (vehicle.grade) {
                    url = url + self.encodeUriFragment(vehicle.grade) + "/";

                    if (vehicle.enhancementPack) {
                        url = url + vehicle.enhancementPack + "/";

                        if (vehicle.colour) {
                            url = url + self.encodeUriFragment(vehicle.colour) + "/";
                        }

                        if (vehicle.trim) {
                            url = url + self.encodeUriFragment(vehicle.trim) + "/";

                            if (step) {
                                url = url + "/" + step + "#lx-bp-nav";
                            }
                        }
                    }
                }
            }

            var path = self.encodeUriPath(url);

            return path;
        }

        return self;
    }]);;
"use strict";

angular.module('Lexus.Services')
    .factory('BuildPriceAPIService', ['$q', '$timeout', 'VehicleService', function($q, $timeout, VehicleService) {
        var self = this;
        //self.data = [];

        self.isEmpty = function(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }

            return JSON.stringify(obj) === JSON.stringify({});
        }

        self.waitCondition = {
            CHANGED: 0,
            NOTNULL: 1,
            ISNULL: 2,
            NOTEMPTY: 3
        };

        self.waitFor = function(target, waitCondition) {
            var defer = $q.defer();

            var currentValue = eval("this." + target);
            if ((waitCondition === self.waitCondition.NOTNULL && currentValue != null ||
                    waitCondition === self.waitCondition.ISNULL && currentValue == null)) {
                defer.resolve(currentValue);
            }

            if (!Object.prototype.watch) {
                Object.defineProperty(Object.prototype, "watch", {
                    enumerable: false,
                    configurable: true,
                    writable: false,
                    value: function(prop, handler) {
                        var
                            oldval = this[prop],
                            newval = oldval,
                            getter = function() {
                                return newval;
                            },
                            setter = function(val) {
                                oldval = newval;
                                return newval = handler.call(this, prop, oldval, val);
                            };

                        if (delete this[prop]) { // can't watch constants
                            Object.defineProperty(this, prop, {
                                get: getter,
                                set: setter,
                                enumerable: true,
                                configurable: true
                            });
                        }
                    }
                });
            }

            // object.unwatch
            if (!Object.prototype.unwatch) {
                Object.defineProperty(Object.prototype, "unwatch", {
                    enumerable: false,
                    configurable: true,
                    writable: false,
                    value: function(prop) {
                        var val = this[prop];
                        delete this[prop]; // remove accessors
                        this[prop] = val;
                    }
                });
            }

            function isEmpty(obj) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop))
                        return false;
                }

                return JSON.stringify(obj) === JSON.stringify({});
            }

            var obj = this;
            obj.watch(target, function(id, oldValue, newValue) {
                switch (waitCondition) {
                    case self.waitCondition.CHANGED:
                        obj.unwatch(target);
                        defer.resolve(newValue);
                        break;
                    case self.waitCondition.NOTNULL:
                        if (newValue != null) {
                            obj.unwatch(target);
                            defer.resolve(newValue);
                        }
                        break;
                    case self.waitCondition.ISNULL:
                        if (newValue == null) {
                            obj.unwatch(target);
                            defer.resolve(newValue);
                        }
                        break;
                    case self.waitCondition.NOTEMPTY:
                        //if (newValue != null && newValue.length != null && newValue.length > 0) {
                        if (!isEmpty(newValue)) {
                            obj.unwatch(target);
                            defer.resolve(newValue);
                        }
                        break;
                    default:
                        obj.unwatch(target);
                        defer.reject();
                }
            });
            return defer.promise
        }

        self.getModels = function(callback) {
            return VehicleService.getVehiclesOverview().then(function success(response) {
                self.data = response.data;
                if (callback && typeof(callback) === "function") {
                    callback();
                }
                return response;
            }, function failure(response) {
                var msg = "Error loading vehicle overview";
                console.error ? console.error(msg) : console.log("Error: " + msg);
            });

        }

        self.findEngineVariantInVehicleData = function(engineVariantName) {
            //if (!self.data) {
            //    console.log("self.findEngineVariantInVehicleData -> self.data: ", self.data);
            //    console.log("self.findEngineVariantInVehicleData -> engineVariantName: ", engineVariantName);
            //}

            for (var btIdx in self.data) {
                if (self.data.hasOwnProperty(btIdx)) {
                    var bodyTypeObj = self.data[btIdx];
                    for (var mdlIdx in bodyTypeObj.models) {
                        if (bodyTypeObj.models.hasOwnProperty(mdlIdx)) {
                            var modelObj = bodyTypeObj.models[mdlIdx];
                            var engineVariantObj = modelObj.modelEngineVariants.find(function(variant) {
                                return variant.uriName === engineVariantName;
                            });
                            if (engineVariantObj) {
                                return engineVariantObj;
                            }
                        }
                    }
                }
            }

        };

        self.findModelInVehicleData = function(carmodel) {
            for (var btIdx in self.data) {
                if (self.data.hasOwnProperty(btIdx)) {
                    var bodyTypeObj = self.data[btIdx];
                    var modelObj = bodyTypeObj.models.find(function(model) {
                        return model.uriName === carmodel;
                    });
                    if (modelObj) {
                        return modelObj;
                    }
                }
            }

        };

        self.getGradeByName = function(engineVariantName, gradeName) {
            if (engineVariantName == null || gradeName == null) return false;
            var grades = (self.findEngineVariantInVehicleData(engineVariantName) || {}).grades;
            return (grades || []).find(function(item) {
                return item.uriName == gradeName;
            });

        }

        self.getGradeByID = function(engineVariantName, gradeId) {
            return (self.findEngineVariantInVehicleData(engineVariantName).grades || []).find(function(item) {
                return item.id == gradeId;
            });
        }

        self.getVariantByID = function(engineVariantName, gradeId, variantId) {
            var grade = self.getGradeByID(engineVariantName, gradeId);
            return (grade.variants || []).find(function(item) {
                return item.mdmid == variantId;
            });
        }

        self.getVariantByName = function(engineVariantName, gradeId, variantName) {
            var grade = self.getGradeByID(engineVariantName, gradeId);
            return (grade.variants || []).find(function(item) {
                return item.uriName == variantName;
            });
        }

        self.getTrimByID = function(engineVariantName, gradeId, variantId, trimId) {
            var variant = self.getVariantByID(engineVariantName, gradeId, variantId);
            return (variant.trims.availableTrims || []).find(function(item) {
                return item.id == trimId;
            });
        }

        self.getTrimByName = function(engineVariantName, gradeId, variantId, trimName) {
            var variant = self.getVariantByID(engineVariantName, gradeId, variantId);

            return (variant.trims.availableTrims || []).find(function(trim) {
                return trim.uriName == trimName;
            });
        }

        self.getPaintByID = function(engineVariantName, gradeId, variantId, trimId, materialCode) {
            var trim = self.getTrimByID(engineVariantName, gradeId, variantId, trimId);
            return (trim.paints.availableColours || []).find(function(item) {
                return item.materialCode == materialCode;
            });
        }

        self.getPaintByName = function(engineVariantName, gradeId, variantId, trimId, paintName) {
            var trim = self.getTrimByID(engineVariantName, gradeId, variantId, trimId);
            return (trim.paints.availableColours || []).find(function(paint) {
                return paint.shortName == paintName || paint.uriName == paintName;
            });
        }

        self.getVariants = function(engineVariantName, gradeId, callback) {
            var myGrade = self.getGradeByID(engineVariantName, gradeId);

            if (myGrade.variants) {

                if (callback && typeof(callback) === "function") {
                    callback(myGrade.variants);
                }
                return myGrade.variants;
            } else {
                return VehicleService.getVariants(gradeId).then(function success(response) {
                    if (!myGrade.variants) {
                        myGrade.variants = response.data;
                    }
                    if (callback && typeof(callback) === "function") {
                        callback(response.data);
                    }
                }, function failure(response) {
                    //emit error event?
                    var msg = "Error loading enhancement packs";
                    console.error ? console.error(msg) : console.log("Error: " + msg);
                });
            }
            //bpEnPack.variants = response.data;
        }

        self.getTrims = function(engineVariantName, gradeId, variantId, callback) {
            self.getVariants(engineVariantName, gradeId, function(variants) {
                var myVariant = self.getVariantByID(engineVariantName, gradeId, variantId);
                var myGrade = self.getGradeByID(engineVariantName, gradeId);

                if (myVariant.trims) {

                    var availableTrims = myVariant.trims.availableTrims;
                    var unavailableTrims = self.GetUnAvailableCollection(myGrade.availableTrims, availableTrims);

                    myVariant.trims = {
                        allTrims: myGrade.availableTrims,
                        availableTrims: availableTrims,
                        unavailableTrims: unavailableTrims
                    }

                    if (callback && typeof(callback) === "function") {
                        callback(myVariant.trims.availableTrims, myVariant.trims.unavailableTrims, myVariant.trims.allTrims);
                    }
                } else {
                    VehicleService.getTrims(gradeId, variantId).then(function success(response) {
                        if (response.data.length == 0) {
                            console.warn('getTrims received 0 results for ' + engineVariant + ' with grade ID ' + gradeId);
                        }

                        var availableTrims = response.data;
                        var unavailableTrims = self.GetUnAvailableCollection(myGrade.availableTrims, availableTrims);

                        if (!myVariant.trims) {
                            myVariant.trims = {
                                allTrims: myGrade.availableTrims,
                                availableTrims: availableTrims,
                                unavailableTrims: unavailableTrims
                            };
                        }

                        if (callback && typeof(callback) === "function") {
                            callback(myVariant.trims.availableTrims, myVariant.trims.unavailableTrims, myVariant.trims.allTrims);
                        }

                    }, function error(response) {
                        console.error('getTrims returned an error');
                    });

                }
            });
        }

        self.getPaints = function(engineVariantName, gradeId, variantId, trimId, callback) {
            self.getTrims(engineVariantName, gradeId, variantId, function(trims) {
                var myTrim = self.getTrimByID(engineVariantName, gradeId, variantId, trimId);
                var myGrade = self.getGradeByID(engineVariantName, gradeId);
                if (myTrim.paints) {
                    if (callback && typeof(callback) === "function") {
                        callback(myTrim.paints.availableColours, myTrim.paints.unavailableColours);
                    }
                } else {
                    VehicleService.getPaints(gradeId, variantId, trimId).then(function success(response) {
                        if (response.data.length == 0) {
                            console.warn('getColours received 0 results for ' + trimId);
                        }

                        var availableColours = response.data;
                        var unavailableColours = self.GetUnAvailableCollection(myGrade.availablePaints, availableColours);

                        if (!myTrim.paints) {
                            myTrim.paints = {
                                availableColours: availableColours,
                                unavailableColours: unavailableColours

                            };
                        }

                        if (callback && typeof(callback) === "function") {
                            callback(myTrim.paints.availableColours, myTrim.paints.unavailableColours);
                        }
                    }, function error(response) {
                        console.error('getColours returned an error');
                    });
                }


            });
        }

        //Remove intersections with Available Colours from from AvailablePaints
        self.GetUnAvailableCollection = function(allCollection, availableCollection) {
            var unavailableCollection = [];
            for (var a = 0, lenA = allCollection.length; a < lenA; a++) {
                var foundMatch = false;
                for (var b = 0, lenB = availableCollection.length; b < lenB; b++) {
                    if (allCollection[a].code == availableCollection[b].code) {
                        foundMatch = true;
                    }
                }
                if (!foundMatch) {
                    unavailableCollection.push(allCollection[a]);
                }
            }
            return unavailableCollection;
        }

        self.FilterAvailableCollection = function(allCollection, availableCollection) {
            var filteredCollection = [];
            for (var a = 0, lenA = allCollection.length; a < lenA; a++) {
                var foundMatch = false;
                for (var b = 0, lenB = availableCollection.length; b < lenB; b++) {
                    if (allCollection[a].code == availableCollection[b].code) {
                        foundMatch = true;
                    }
                }
                if (foundMatch) {
                    filteredCollection.push(allCollection[a]);
                }
            }
            return filteredCollection;
        }

        self.getUnavailableTrimsBasedOnPaint = function(engineVariantName, gradeId, variantId, trimId, paintName) {
            var myGrade = self.getGradeByID(engineVariantName, gradeId);
            var paint = self.getPaintByName(engineVariantName, gradeId, variantId, trimId, paintName);

            var availableTrims = paint.availableTrims;
            var unavailableTrims = self.GetUnAvailableCollection(myGrade.availableTrims, availableTrims);
            return {
                availableTrims: availableTrims,
                unavailableTrims: unavailableTrims
            };
        }

        self.getExteriorImages = function(engineVariantName, gradeId, variantId, trimId, materialCode, callback) {
            self.getPaints(engineVariantName, gradeId, variantId, trimId, function(paints) {
                var myPaint = self.getPaintByID(engineVariantName, gradeId, variantId, trimId, materialCode);
                if (myPaint.images && myPaint.images.exterior) {
                    if (callback && typeof(callback) === "function") {
                        callback(myPaint.images.exterior);
                    }
                } else {
                    VehicleService.getVehicleImages(gradeId, variantId, trimId, materialCode).then(function(response) {
                        if (!myPaint.images) {
                            myPaint.images = {};
                        }
                        if (!myPaint.images.exterior) {
                            myPaint.images.exterior = response.data;
                        }
                        if (callback && typeof(callback) === "function") {
                            callback(myPaint.images.exterior);
                        }
                    });

                }
            });
        };

        return self;
    }]);;
"use strict";

angular.module('Lexus.Services')
    .factory('PreLaunchAPIService', ['$q', '$timeout', 'PreLaunchVehicleService', function($q, $timeout, PreLaunchVehicleService) {
        var self = this;
        //self.data = [];     

        self.getModels = function(callback) {
            return PreLaunchVehicleService.getVehiclesOverview().then(function success(response) {
                self.data = response.data;
                if (callback && typeof(callback) === "function") {
                    callback();
                }
                return response;
            }, function failure(response) {
                var msg = "Error loading vehicle overview for pre launch vehicles";
                console.error ? console.error(msg) : console.log("Error: " + msg);
            });

        };

        self.findEngineVariantInVehicleData = function(engineVariantName) {

            for (var btIdx in self.data) {
                if (self.data.hasOwnProperty(btIdx)) {
                    var bodyTypeObj = self.data[btIdx];
                    for (var mdlIdx in bodyTypeObj.models) {
                        if (bodyTypeObj.models.hasOwnProperty(mdlIdx)) {
                            var modelObj = bodyTypeObj.models[mdlIdx];
                            var engineVariantObj = modelObj.modelEngineVariants.find(function(variant) {
                                return variant.uriName === engineVariantName;
                            });
                            if (engineVariantObj) {
                                return engineVariantObj;
                            }
                        }
                    }
                }
            }

        };

        self.getGradesList = function(engineVariantName) {
            if (engineVariantName == null) return false;
            var grades = (self.findEngineVariantInVehicleData(engineVariantName) || {}).grades;
            return (grades || []).map(function(grade) {
                return grade.name;
            });
        };

        self.getGradesByEngineVariant = function(engineVariantName) {
            if (engineVariantName == null) return false;
            var grades = (self.findEngineVariantInVehicleData(engineVariantName) || {}).grades;
            return grades || [];
        };

        self.getInteriorsByGradeName = function(engineVariantName, gradeName) {
            if (engineVariantName == null) return false;
            var grades = (self.findEngineVariantInVehicleData(engineVariantName) || {}).grades;
            var grade = (grades || []).find(function(item) {
                return item.name == gradeName;
            });
            return (grade && grade.baseVariant) ? grade.baseVariant.trims : [];
        };

        self.getExteriorsByGradeName = function(engineVariantName, gradeName) {
            if (engineVariantName == null) return false;
            var grades = (self.findEngineVariantInVehicleData(engineVariantName) || {}).grades;
            var grade = (grades || []).find(function(item) {
                return item.name == gradeName;
            });
            return (grade && grade.baseVariant) ? grade.baseVariant.paints : [];
        };

        return self;
    }]);;
"use strict";

angular.module('Lexus.Services')
    .service('DealersService', ['$timeout', '$filter', '$http', '$rootScope', 'API', function($timeout, $filter, $http, $rootScope, API) {
        var service = this;
        var params = {};
        var decodeEmailPart = function(str) {
            return typeof atob === "function" ?
                decodeURIComponent(atob(str)) :
                typeof Buffer !== "undefined" && typeof Buffer.from === "function" ?
                decodeURIComponent(Buffer.from(str, 'base64').toString()) :
                str;
        };
        var decodeDealerEmail = function(dealer) {
            if (!dealer || !dealer.locations || !dealer.locations.length) {
                return;
            }
            dealer.locations.forEach(service.DecodeLocationEmail);
        };
        var decodeDealerResponseEmail = function(data) {
            if (!data || !data.Data) {
                return;
            }
            if (data.Data instanceof Array) {
                data.Data.forEach(decodeDealerEmail);
            } else {
                decodeDealerEmail(data.Data);
            }
        };

        params.defaults = {
            siteID: Lexus.ID.Site,
            postCode: 'null',
            suburb: 'null',
            state: 'null',
            type: 'All',
            dealerID: '',
            branchCode: '',
            dealerState: ''
        };

        params.params = {
            siteID: params.defaults.siteID,
            postCode: params.defaults.postCode,
            suburb: params.defaults.suburb,
            state: params.defaults.state,
            type: params.defaults.type,
            dealerID: params.defaults.dealerID,
            branchCode: params.defaults.branchCode,
            dealerState: params.defaults.dealerState
        };

        service.DeconstructCompositeID = function(dealerCompositeKey) {
            if (dealerCompositeKey.indexOf('-')) {
                var parts = dealerCompositeKey.split('-');
                return {
                    dealerID: parts[0],
                    branchCode: parts[1],
                    sapCode: parts[2]
                };
            } else {
                return;
            }
        };

        service.DecodeLocationEmail = function(location) {
            if (location && location.elMailFirstPartEncoded && location.elMailLastPartEncoded) {
                location.email = decodeEmailPart(location.elMailFirstPartEncoded) + "@" + decodeEmailPart(location.elMailLastPartEncoded);
            }
            if (location && location.serviceElMailFirstPartEncoded && location.serviceElMailLastPartEncoded) {
                location.serviceEmail = decodeEmailPart(location.serviceElMailFirstPartEncoded) + "@" + decodeEmailPart(location.serviceElMailLastPartEncoded);
            }
        };

        service.GetDealerBranches = function() {
            params.params.searchQueryUrl = $filter('formatArgs')(Lexus.API.Lookup.DealerBranches, [
                params.params.siteID,
                params.params.dealerID,
                params.params.type
            ]);

            API.get(params.params.searchQueryUrl)
                .then(function(data) {
                    decodeDealerResponseEmail(data);
                    $rootScope.$broadcast('dealer-search-results-received', data);
                    $timeout($rootScope.$broadcast('refresh-gtm', 'Dealer Results'), 0);
                }, function(reason) {
                    $rootScope.$broadcast('dealer-search-results-error', reason);
                });
        }

        service.GetDealerBranch = function() {
            params.params.searchQueryUrl = $filter('formatArgs')(Lexus.API.Lookup.DealerBranchByCode, [
                params.params.siteID,
                params.params.dealerID,
                params.params.branchCode
            ]);

            API.get(params.params.searchQueryUrl)
                .then(function(data) {
                    decodeDealerResponseEmail(data);
                    $rootScope.$broadcast('dealer-search-results-received', data);
                    $timeout($rootScope.$broadcast('refresh-gtm', 'Dealer Results'), 0);
                }, function(reason) {
                    $rootScope.$broadcast('dealer-search-results-error', reason);
                });
        };

        service.GetResult = function() {

            params.params.searchQueryUrl = $filter('formatArgs')(Lexus.API.Lookup.DealerById, [
                params.params.siteID,
                params.params.dealerID, //This dealerID a composite key ex. 050055-22541-12345
                params.params.dealerState
            ]);

            API.get(params.params.searchQueryUrl)
                .then(function(data) {
                    decodeDealerResponseEmail(data);
                    $rootScope.$broadcast('dealer-search-result-received', data);
                    $timeout($rootScope.$broadcast('refresh-gtm', 'Dealer Results'), 0);
                }, function(reason) {
                    $rootScope.$broadcast('dealer-search-result-error', reason);
                });
        };

        service.GetResults = function() {
            params.params.searchQueryUrl = $filter('formatArgs')(Lexus.API.Lookup.DealersByLocation, [
                params.params.siteID,
                params.params.postCode,
                params.params.suburb,
                params.params.state,
                params.params.type
            ]);

            return API.get(params.params.searchQueryUrl)
                .then(function(data) {
                    decodeDealerResponseEmail(data);
                    $rootScope.$broadcast('dealer-search-results-received', data);
                    $timeout($rootScope.$broadcast('refresh-gtm', 'Dealer Results'), 0);
                    return data;
                }, function(error) {
                    $rootScope.$broadcast('dealer-search-results-error', error);
                    throw error;
                });
        };

        // Update a search parameter.
        service.setParam = function(name, value) {
            params.params[name] = value;
        };

        // Get a parameter value
        service.getParam = function(name) {
            return params.params[name];
        };

        return service;
    }]);



;
"use strict";

angular.module('Lexus.Services')
    .service('FormsService', ['$timeout', '$http', '$rootScope', function($timeout, $http, $rootScope) {
        var self = this;

        self.ShowResult = function(element) {
            if (!element.classList.contains('lx-form-no-scroll')) {
                TweenLite.to(window, 2, {
                    scrollTo: {
                        y: element.parentElement.offsetTop,
                        x: 0
                    },
                    ease: Power4.easeOut
                });
            }
            $rootScope.$broadcast('broadcast.lazyLoadRevalidate');
        }

        return self;
    }]);;
"use strict";

angular.module('Lexus.Services')
    .service('MouseDetectionService', ['$rootScope', function($rootScope) {
        var self = this;

        var MouseDetectionAgent = function() {
            this.resetMouseFoundAndBuffer();
            this.startWatching();
            return this;
        };

        MouseDetectionAgent.prototype.timestampMsArrayLooksLikeMouseData = function(timestampMsArray, maxBufferSize, mouseFrequencyThresholdHz) {
            var bufferFull = timestampMsArray.length === maxBufferSize;
            var bufferDurationThresholdMs = maxBufferSize / mouseFrequencyThresholdHz * 1000;
            if (bufferFull) {
                var firstTimestampMsInBuffer = timestampMsArray[0];
                var lastTimestampMsInBuffer = timestampMsArray[timestampMsArray.length - 1];
                if (bufferDurationThresholdMs >= lastTimestampMsInBuffer - firstTimestampMsInBuffer) {
                    return true;
                }
            }
            return false;
        };

        MouseDetectionAgent.prototype.resetMouseFoundAndBuffer = function() {
            this.mouseMoveTimestampMsBuffer = [];
            this.mouseFound = false;
            $rootScope.$broadcast('did-lose-mouse');
        };

        MouseDetectionAgent.prototype.tellMouseFound = function() {
            this.mouseFound = true;
            $rootScope.$broadcast('did-detect-mouse');
        };

        MouseDetectionAgent.prototype.stopWatching = function() {
            $('body').off('mousemove.MouseDetectionAgent');
        };

        MouseDetectionAgent.prototype.startWatching = function() {
            var self = this,
                maxBufferSize = 10;
            $('body').on('mousemove.MouseDetectionAgent', function() {
                if (self.mouseMoveTimestampMsBuffer.length >= maxBufferSize) {
                    self.mouseMoveTimestampMsBuffer.shift();
                }

                self.mouseMoveTimestampMsBuffer.push((new Date).valueOf());

                if (self.timestampMsArrayLooksLikeMouseData(self.mouseMoveTimestampMsBuffer, maxBufferSize, 10)) {
                    self.tellMouseFound();
                    self.stopWatching();
                }
            })
        };

        return new MouseDetectionAgent();
    }]);;
"use strict";

angular.module('Lexus.Services')
    .service('PricingService', ['$filter', 'API', function($filter, API) {
        var params = {
            defaults: {
                siteID: Lexus.ID.Site,
                gradeId: null,
                postCode: null,
                pricingZone: null,
                enablePricingByZone: false
            }
        };

        params.params = {
            siteID: params.defaults.siteID,
            gradeId: params.defaults.gradeId,
            postCode: params.defaults.postCode,
            pricingZone: params.defaults.pricingZone,
            enablePricingByZone: params.defaults.enablePricingByZone
        };

        var service = {
            driveAwayByGrade: driveAwayByGrade,
            driveAwayByEnhancementPack: driveAwayByEnhancementPack,
            detailPriceByPaint: detailPriceByPaint,
            setParam: setParam,
            getParam: getParam
        };

        return service;

        function driveAwayByGrade(gradeID, postCode, pricingZone) {
            var endpoint = Lexus.API.Lookup.DriveAwayByGrade;
            var location = postCode;

            if (params.params.enablePricingByZone === true && pricingZone) {
                endpoint = Lexus.API.Lookup.DriveAwayByGradeByZone;
                location = pricingZone;
            }

            var apiUrl = $filter('formatArgs')(endpoint, [
                params.params.siteID,
                gradeID,
                location
            ]);
            return API.get(apiUrl);
        }

        function driveAwayByEnhancementPack(gradeID, enhancementPack, postCode, pricingZone) {
            var endpoint = Lexus.API.Lookup.DriveAwayByEnhancementPack;
            var location = postCode;

            if (params.params.enablePricingByZone === true && pricingZone) {
                endpoint = Lexus.API.Lookup.DriveAwayByEnhancementPackByZone;
                location = pricingZone;
            }

            var apiUrl = $filter('formatArgs')(endpoint, [
                params.params.siteID,
                gradeID,
                enhancementPack,
                location
            ]);
            return API.get(apiUrl);
        };

        function detailPriceByPaint(gradeId, variantId, trimId, materialCode, postCode, pricingZone) {
            var endpoint = Lexus.API.Lookup.DetailPriceByPaint;
            var location = postCode;

            if (params.params.enablePricingByZone === true && pricingZone) {
                endpoint = Lexus.API.Lookup.DetailPriceByPaintByZone;
                location = pricingZone;
            }
            var apiUrl = $filter('formatArgs')(endpoint, [
                params.params.siteID,
                gradeId,
                variantId,
                trimId,
                materialCode,
                location
            ]);

            return API.get(apiUrl);
        };

        // Update a search parameter.
        function setParam(name, value) {
            params.params[name] = value;
        };

        // Get a parameter value
        function getParam(name) {
            return params.params[name];
        };
    }]);;
"use strict";

angular.module('Lexus.Services')
    .service('RepairersService', ['$timeout', '$filter', '$http', '$rootScope', 'API', function Map($timeout, $filter, $http, $rootScope, API) {
        var self = this;
        var params = {};

        params.defaults = {
            siteID: Lexus.ID.Site,
            state: 'null'
        };

        params.params = {
            siteID: params.defaults.siteID,
            state: params.defaults.state
        };

        self.GetResults = function() {
            params.params.searchQueryUrl = $filter('formatArgs')(Lexus.API.Lookup.RepairerByState, [
                params.params.siteID,
                params.params.state
            ]);

            API.get(params.params.searchQueryUrl)
                .then(function(data) {
                    $rootScope.$broadcast('repairers-search-results-received', data);
                }, function(reason) {
                    $rootScope.$broadcast('repairers-search-results-error', reason);
                });
        }

        // Update a search parameter.
        self.setParam = function(name, value) {
            params.params[name] = value;
        };

        // Get a parameter value
        self.getParam = function(name) {
            return params.params[name];
        };


        return self;
    }]);;
"use strict";

angular.module('Lexus.Services')
    .service('UserPreferencesService', ['$filter', '$rootScope', '$cookies', 'API', '$location', '$log',
        function($filter, $rootScope, $cookies, API, $location, $log) {
            var self = this;
            self.$location = $location;
            var params = {};
            var version = Lexus.ID.CacheVersion;
            var cookieOptions = {
                domain: '.lexus.com.au',
                path: '/'
            };

            params.defaults = {
                visitor: {
                    postCode: null,
                    suburb: null,
                    state: null,
                    pricingZone: null,
                },
                dealer: {
                    dealerID: null, //This dealerID a composite key ex. 050055-22541-12345
                    dealerCodeSimple: null,
                    branchCode: null,
                    dealerName: null,
                    dealerType: null,
                    dealerUrl: null,
                    dealerState: null
                },
                vehicle: {
                    model: null,
                    grade: null,
                    engineVariant: null,
                    enhancementPack: null,
                    trim: null,
                    colour: null,
                    materialCode: null
                },
                compareVehicles: {
                    model: null,
                    bodyType: null,
                    modelsBrowsed: null,
                    variantsSelected: null
                },
                analytics: {
                    identifier: null
                },
                languagePref: {
                    translate: null
                },
                personalization: {
                    lifestyle: null,
                }
            };

            params.params = {
                visitor: {
                    postCode: params.defaults.visitor.postCode,
                    suburb: params.defaults.visitor.suburb,
                    state: params.defaults.visitor.state,
                    pricingZone: params.defaults.visitor.pricingZone,
                },
                dealer: {
                    dealerID: params.defaults.dealer.dealerID,
                    dealerCodeSimple: params.defaults.dealer.dealerCodeSimple,
                    branchCode: params.defaults.dealer.branchCode,
                    dealerName: params.defaults.dealer.dealerName,
                    dealerType: params.defaults.dealer.dealerType,
                    dealerUrl: params.defaults.dealer.dealerUrl,
                    dealerState: params.defaults.dealer.dealerState
                },
                vehicle: {
                    model: params.defaults.vehicle.model,
                    grade: params.defaults.vehicle.grade,
                    engineVariant: params.defaults.vehicle.engineVariant,
                    enhancementPack: params.defaults.vehicle.enhancementPack,
                    trim: params.defaults.vehicle.trim,
                    colour: params.defaults.vehicle.colour,
                    materialCode: params.defaults.vehicle.materialCode
                },
                compareVehicles: {
                    model: params.defaults.compareVehicles.model,
                    bodyType: params.defaults.compareVehicles.bodyType,
                    modelsBrowsed: params.defaults.compareVehicles.modelsBrowsed,
                    variantsSelected: params.defaults.compareVehicles.variantsSelected
                },
                analytics: {
                    identifier: params.defaults.analytics.identifier
                },
                languagePref: {
                    translate: params.defaults.languagePref.translate
                },
                personalization: {
                    lifestyle: params.defaults.personalization.lifestyle,
                }
            };

            // **************************************
            // Init.
            // **************************************

            self.init = function() {
                var visitor = $cookies.getObject('lexus-visitor' + version);
                var dealer = $cookies.getObject('lexus-dealer' + version);
                var vehicle = $cookies.getObject('lexus-vehicle' + version);
                var compareVehicles = $cookies.getObject('lexus-compare-vehicles' + version);
                var analytics = $cookies.getObject('lexus-analytics' + version);
                var languagePref = $cookies.getObject('lexus-analytics' + version);
                var personalization = $cookies.getObject('lexus-personalization' + version);

                if (visitor) params.params.visitor = visitor;
                if (dealer) params.params.dealer = dealer;
                if (vehicle) params.params.vehicle = vehicle;
                if (compareVehicles) params.params.compareVehicles = compareVehicles;
                if (analytics) params.params.analytics = analytics;
                if (languagePref) params.params.languagePref = languagePref;
                if (personalization) params.params.personalization = personalization;

            };

            $rootScope.$on('preferred-dealer-change', function(event, dealer) {
                if (!dealer.dealerID || dealer.dealerID == 0) {
                    $cookies.remove('lexus-dealer' + version, cookieOptions);
                } else {
                    $cookies.putObject('lexus-dealer' + version, dealer, cookieOptions);
                }
            });

            self.setVisitorCookie = function(event, visitor) {
                //all or nothing / don't write the cookie unless we have postcode, state and suburb (or all are empty) - forms dealing with the user's address need all three
                if ((visitor.postCode && visitor.suburb && visitor.state) || (!visitor.postCode && !visitor.suburb && !visitor.state)) {
                    $cookies.putObject('lexus-visitor' + version, visitor, cookieOptions);
                } else {
                    console.error("Incomplete visitor cookie")
                }
            };

            self.setAnalyticsCookie = function(analytics) {
                if (analytics) {
                    $cookies.putObject('lexus-analytics' + version, analytics);
                } else {
                    console.error("No analytics info.")
                }
            };

            self.getAnalyticsCookie = function(urlParameters) {
                var result = $cookies.getObject('lexus-analytics' + version) || params.params.analytics;
                if (urlParameters) {
                    result.identifier = urlParameters.identifier || result.identifier;
                }
                return result;
            }

            self.setLanguagePref = function(languagePref, pageGuid) {
                if (languagePref) {
                    $cookies.putObject('lexus-language-pref-' + pageGuid + version, languagePref);
                } else {
                    console.error("No language preference info.")
                }
            };

            self.getLanguagePref = function(pageGuid) {
                var result = $cookies.getObject('lexus-language-pref-' + pageGuid + version) || params.params.languagePref;
                return result;
            }

            self.setPageVisited = function(event, pageId) {
                if (!pageId || pageId == "") {
                    console.warn("Visit not recorded for page " + window.location.pathname + ", guid is null or empty");
                    return;
                }
                var cookieName = 'lexus-page-visit' + version;
                var visitedPages = $cookies.getObject(cookieName) || [];
                if (visitedPages.find(function(id) {
                        return id === pageId;
                    }) == null) {
                    visitedPages.push(pageId);
                    $cookies.putObject(cookieName, visitedPages);
                }
            };
            $rootScope.$on('record-page-visit', self.setPageVisited);

            //functionality for these two event handlers has converged except for the casing of postcode, todo: refactor out one of these
            $rootScope.$on('visitor-details-cookie-change', self.setVisitorCookie);
            $rootScope.$on('visitor-details-change-autocomplete', function(event, visitor) {
                if (visitor.postcode) {
                    visitor.postCode = visitor.postcode;
                    delete visitor.postcode;
                }
                self.setVisitorCookie(event, visitor);
            });

            $rootScope.$on('visitor-details-session-change', function(event, visitor) {
                return API.post($filter('formatArgs')(Lexus.API.User.SetPreferences, [Lexus.ID.Site]), visitor);

            });

            $rootScope.$on('language-pref-change', function(event, languagePref) {
                self.setLanguagePref(event, languagePref);
            });

            $rootScope.$on('vehicle-preference-change', function(event, vehicle) {
                //$log.log('vehicle-preference-change');
                //$log.log(vehicle);
                $cookies.putObject('lexus-vehicle' + version, vehicle, cookieOptions);
            });

            $rootScope.$on('compare-vehicle-change', function(event, compareVehicleState) {
                $cookies.putObject('lexus-compare-vehicles' + version, compareVehicleState);
            });

            $rootScope.$on('personalization-change', function(event, personalization) {
                $cookies.putObject('lexus-personalization' + version, personalization);
            });

            self.getAutocompleteTagFromVisitor = function(visitor) {
                return {
                    text: visitor.suburb + " " + visitor.postCode,
                    data: {
                        postcode: visitor.postCode,
                        suburb: visitor.suburb,
                        state: visitor.state,
                        pricingZone: visitor.pricingZone
                    }
                };
            }

            self.splitAutoCompleteResult = function(suggestion) {
                var msg = "splitAutoCompleteResult deprecated: use <postcode-result>.data directly instead of splitting <postcode-result>.text";
                console.warn ? console.warn(msg) : console.log(msg);
                var visitor = {
                    postCode: suggestion.slice(suggestion.lastIndexOf(' ') + 1, suggestion.length).trim(),
                    suburb: suggestion.slice(0, suggestion.lastIndexOf(' ')).trim()
                };
                return visitor;
            }

            // Get a parameter value
            self.getParam = function(name) {
                return params.params[name];
            };

            self.getLexusDealer = function(urlParameters) {
                var result = $cookies.getObject('lexus-dealer' + version) || params.params.dealer;
                if (urlParameters) {
                    result.dealerID = urlParameters.dealerID || result.dealerID;
                    result.dealerCodeSimple = urlParameters.dealerCodeSimple || result.dealerCodeSimple;
                    result.dealerName = urlParameters.dealerName || result.dealerName;
                    result.dealerState = urlParameters.dealerState || result.dealerState;
                }
                return result;

            }

            self.getLexusVisitor = function(urlParameters) {
                var result = $cookies.getObject('lexus-visitor' + version) || params.params.visitor;
                if (urlParameters) {
                    //overrides for visitor?
                }
                return result;
            }

            self.getLexusVehicle = function(urlParameters) {
                var result = $cookies.getObject('lexus-vehicle' + version) || params.params.vehicle;
                if (urlParameters) {
                    result.model = urlParameters.model || result.model;
                    result.grade = urlParameters.grade || result.grade;
                    result.engineVariant = urlParameters.engineVariant || result.engineVariant;
                    result.enhancementPack = urlParameters.enhancementPack || result.enhancementPack;
                    result.trim = urlParameters.trim || result.trim;
                    result.colour = urlParameters.colour || result.colour;
                    result.materialCode = urlParameters.materialCode || result.materialCode;
                }
                return result;
            }

            self.isPageVisited = function(pageId) {
                if (!pageId || pageId == "") {
                    return false;
                }

                var cookieName = 'lexus-page-visit' + version;
                var pages = $cookies.getObject(cookieName);
                if (pages && pages.length > 0) {
                    return pages.indexOf(function(item) {
                        return item == pageId;
                    }) != null;
                }
            }

            self.getLexusVisitorSession = function() {
                return API.get($filter('formatArgs')(Lexus.API.User.GetPreferences, [Lexus.ID.Site]));
            }

            //#region UTM parameters - cookies disabled - incompatible with Eloqua handling of UTM campaign
            //self.setUtmParameters = function (utmParameters) {
            //    $cookies.putObject('lexus-utm', utmParameters);
            //};

            self.getUtmParameters = function() {
                //var utmParameters = $cookies.getObject('lexus-utm');
                var utmParams = ["utm_campaign", "utm_medium", "utm_source", "utm_content"];
                var result = {};
                var queryParams = this.$location.search();
                for (var idx = 0, pLen = utmParams.length; idx < pLen; idx++) {
                    var param = utmParams[idx];
                    if (typeof param == 'string') {
                        result[param.replace(/utm_/, '')] = queryParams[param];
                    }
                }

                return result;
            };
            //#endregion

            self.getEloquaCustomerGUID = function() {

                if (typeof(GetElqCustomerGUID) == "function") {
                    return GetElqCustomerGUID();
                } else {
                    return "";
                }
            }

            self.getCompareVehiclesState = function(urlParameters) {
                var result = $cookies.getObject('lexus-compare-vehicles' + version) || params.params.compareVehicles;
                if (urlParameters) {
                    result.model = urlParameters.model || result.model;
                    result.bodyType = urlParameters.bodyType || result.bodyType;
                    result.modelsBrowsed = urlParameters.modelsBrowsed || result.modelsBrowsed;
                    result.variantsSelected = urlParameters.variantsSelected || result.variantsSelected;
                }
                return result;
            }

            self.getPersonalizationState = function(urlParameters) {
                var result = $cookies.getObject('lexus-personalization' + version) || params.params.personalization;
                if (urlParameters) {
                    result.lifestyle = urlParameters.lifestyle || result.lifestyle;
                }
                return result;
            }

            self.init();

            return self;
        }
    ]);

;
"use strict";

angular.module('Lexus.Services')
    .service('VehicleService', ['$timeout', '$filter', '$http', 'API', '$rootScope', function($timeout, $filter, $http, API, $rootScope) {
        var self = this;
        var params = {};

        params.defaults = {
            siteID: Lexus.ID.Site,
            bodyTypeId: null,
            modelId: null,
            engineVariants: []
        };

        params.params = {
            siteID: params.defaults.siteID,
            bodyTypeId: params.defaults.bodyTypeId,
            modelId: params.defaults.modelId,
            engineVariants: params.defaults.engineVariants
        };

        self.getBodyTypes = function() {
            var apiUrl = $filter('formatArgs')(Lexus.API.Lookup.VehicleBodyTypes, [
                params.params.siteID
            ]);
            return API.get(apiUrl);
        };

        self.getVehiclesOverview = function() {
            var apiUrl = $filter('formatArgs')(Lexus.API.Lookup.VehiclesOverview, [
                params.params.siteID
            ]);
            return API.get(apiUrl);
        };

        self.getModels = function(bodyTypeId) {
            var apiUrl = $filter('formatArgs')(Lexus.API.Lookup.VehicleModels, [
                params.params.siteID,
                bodyTypeId
            ]);
            return API.get(apiUrl);
        };

        self.getEngineVariants = function(modelId) {
            var apiUrl = $filter('formatArgs')(Lexus.API.Lookup.VehicleEngineVariants, [
                params.params.siteID,
                modelId
            ]);
            return API.get(apiUrl);
        };

        self.getEngineVariantsWithGrades = function(modelId) {
            var apiUrl = $filter('formatArgs')(Lexus.API.Lookup.VehicleEngineVariantsWithGrades, [
                params.params.siteID,
                modelId
            ]);
            return API.get(apiUrl);
        };

        self.getTrims = function(gradeID, variantId) {
            var apiUrl = $filter('formatArgs')(Lexus.API.Lookup.VehicleTrims, [
                params.params.siteID,
                gradeID,
                variantId
            ]);
            return API.get(apiUrl);
        };

        self.getPaints = function(gradeID, variantId, trimId) {
            var apiUrl = $filter('formatArgs')(Lexus.API.Lookup.VehiclePaints, [
                params.params.siteID,
                gradeID,
                variantId,
                trimId
            ]);
            return API.get(apiUrl);
        };

        self.getVariants = function(gradeId) {
            var apiUrl = $filter('formatArgs')(Lexus.API.Lookup.VehicleVariants, [
                params.params.siteID,
                gradeId
            ]);
            return API.get(apiUrl);
        };

        self.getEnhancementPacks = function(gradeId) {
            var apiUrl = $filter('formatArgs')(Lexus.API.Lookup.VehicleEnhancementPacks, [
                params.params.siteID,
                gradeId
            ]);
            return API.get(apiUrl);
        };

        self.getVehicleImages = function(gradeId, variantId, trimId, materialCode) {
            var apiUrl = $filter('formatArgs')(Lexus.API.Lookup.VehicleImages, [
                params.params.siteID,
                gradeId,
                variantId,
                trimId,
                materialCode
            ]);
            return API.get(apiUrl);
        };

        self.getVehiclePanoXMLUrl = function(gradeId, variantId, trimId, materialCode) {
            var apiUrl = $filter('formatArgs')(Lexus.API.Lookup.PanoXML, [
                params.params.siteID,
                gradeId,
                variantId,
                trimId,
                materialCode
            ]);
            return apiUrl;
        };



        //self.getPaintNTrimDetails = function (variantID) {
        //    var apiUrl = $filter('formatArgs')(Lexus.API.Lookup.PaintNTrimByGrade, [
        //        params.params.siteID,
        //        variantID
        //    ]);
        //    return API.get(apiUrl);
        //}

        // Update a search parameter.
        self.setParam = function(name, value) {
            params.params[name] = value;
        };

        // Get a parameter value
        self.getParam = function(name) {
            return params.params[name];
        };

        return self;
    }]);;
"use strict";

angular.module('Lexus.Services')
    .service('PreLaunchVehicleService', ['$timeout', '$filter', '$http', 'API', '$rootScope', function($timeout, $filter, $http, API, $rootScope) {
        var self = this;
        var params = {};

        params.defaults = {
            siteID: Lexus.ID.Site
        };

        params.params = {
            siteID: params.defaults.siteID
        };

        self.getVehiclesOverview = function() {
            var apiUrl = $filter('formatArgs')(Lexus.API.Lookup.VehiclesOverviewPreLaunch, [
                params.params.siteID
            ]);
            return API.get(apiUrl);
        }

        self.getTrims = function(gradeID, variantId) {
            var apiUrl = $filter('formatArgs')(Lexus.API.Lookup.VehicleTrims, [
                params.params.siteID,
                gradeID,
                variantId
            ]);
            return API.get(apiUrl);
        }

        return self;
    }]);;
"use strict";

angular.module("Lexus.Services")
    .factory("EloquaService", ["UserPreferencesService", function EloquaService(UserPreferencesService) {
        var service = {
            attachEloquaFields: AttachEloquaFields
        };
        return service;

        //Takes an object and attaches the corresponding eloqua fields to it
        function AttachEloquaFields(toObject) {
            var elqCustomerGUID = UserPreferencesService.getEloquaCustomerGUID();

            if (toObject) {
                toObject.ElqCustomerGUID = elqCustomerGUID;
            }
            return toObject;
        }
    }]);


;
'use strict';

angular.module('Lexus.Services').service('ViewportService', [
    '$window',
    function($window) {
        var self = this;

        self.isMobile = function() {
            return $window.innerWidth < Lexus.Breakpoint.Small
        };

        self.isDesktop = function() {
            return !self.isMobile();
        }

        return self;
    }
]);;
'use strict';

(function() {
    angular.module("Lexus.Services").service("FontIconService", function() {
        var self = this;

        self.generateDataURLfromIcon = function(size, unicode, color) {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");

            canvas.height = size;
            canvas.width = size;
            ctx.fillStyle = color;
            ctx.font = size + "px icomoon";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(unicode, size / 2, size / 2);

            return canvas.toDataURL("image/png");
        };

        // hack to fix the above function resulting in wrong icon by icomoon.
        self.generateCursorIcon = function() {
            // FontIconService.generateDataURLfromIcon(32, '\ue92b', '#f0eee6');
            var lightBoxCursor =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACf0lEQVRYR+2XvWsUYRCHn9lTxCLs7Z5Fbg/BSlBQsLOw8KPyP9AETTAokoiCSoqIiIgpghEUFVEiiRL1P7DSWFjYCREUbBTk9lJ4u3umENG7kffihSPxdtdE3CZbvbAz83veeb9mJAr8j8AWOn+fsKyBfL77RYzNsl9RNLefRmMiKbZEgf8V6IoJ/hnL6l8hwCSwOSb2/FKAusC07Xp9fzPbtLa1wJ9S6AVyv30WAQT4AOwC6qJM2wWvP23gNHa1qj+psij+BtgKaCsDqMhpQXtRDgA/EB7mHe94muBJNlHo30c5CqxHeK7ItKjeNH6LACIM/Ww0ZnLIFCL7gO+KTjhu6VSSQNz/MCjfEmQA2IDqTB3tW2dZ+1S5vQzAdrxH89XK9oboXYU9BgK4nne9CyuBiAL/KnDWiAu8slROdhWK72qhf6QNoBw1SZBB2/Uem7GBqIua8c6VQrSLA7M5lR4jbuLXAr9H0TutDIyYQd71RttnuQDBE1AD8U2VcafgXUyTibDqXxHhHLARZDanHG6Jt/yjwG/qmt3f8VsCMS8i47ZTvBznUwsrl1TViHd1Em/3jwVopqs6t1ulcQ/YAVoDRvNuaexPEFFQHgZGQGzgrah1wi50v44DTgQwzmFY2SvaXLNtQCDokO2WnrYHrgXlQ4qYne0C71Vk0HGKL5OWLBXAwsapHFTVGwibVPW8Uyg9aA8eVsvHROQayhcROWO7xWdJ4ol7IE2A1dqkzsBqhTr5rwGsZSB1BtqOoauqwx2O4RhK8M+PYaYXUaZX8X95jFrPYmbPcRRkX5CYvgBTE2ZUkjUbkyZApkVp1mV55o1JqzfMrDXLtDnNtD3/BcgX4+AyBu25AAAAAElFTkSuQmCC";

            // FontIconService.generateDataURLfromIcon(32, '\ue90f', '#e4e1d7');
            var prevCursor =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB+klEQVRYR8WXv2sTYRjHP08KbTMUulTQ5HJxKF4ijoKDm4N1UQQHhy5VKhSkHToUB6md1KGDpWCp1IIIOnYoKPgPCI5ic6WDvV7OQrsUOsQfbR654WKWpJfc1ff+gPt87vu+9/wQTukJPPeVoqOq8tEqOrdbYSRt/r7rDvzO6kuFu0BG4ZNll67/F4EQ/iur74CRCN5fkztDjnN46gLV6lae46NV4BpQB9b6ajLWDh5KpXIEu9638hE9S4JeDeEC73trMnESPBWBEH6MrIJcBv4I8iZnO+Nx71aiBKrfN66QkWXgEvBThRWrUHoYF54oAX9784ZI/QUwDNQQnc8Xyo87gXctEOy4txRdQCkAhwLzObs01ym8KwHfc0cFfQ6cAzlQmLVsZ6EbeMcCwbZ7T0WfAmeAPVF5lCs6r7uFdyTge+6kwBzoIPBDkRnLdt4mgccWCLzKrMI0MAB4qpkJq3jhQ1J4LIHAc58pOglkgS3VzFRa8BMF/J3Koij3gX7gK3V9kD9f/pzGl0fvaFmIfK/yRGAG6AP90oOOnbUvbqQJb5uAcYHQzugRRFEbvYT/JAz+hpGE0ULUSMJkKW5KwlwzaiRhsh03kjA5kEQSRkeySMLoUNosYWwsbxyHycUkkjC6mjVLNC+nwHreLt1s1cYTLSbtZoO46/lfr4cXMA1Qm1oAAAAASUVORK5CYII=";

            // FontIconService.generateDataURLfromIcon(32, '\ue910', '#e4e1d7');
            var nextCursor =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB70lEQVRYR8XXP2jUcBTA8e+7KNcOIggOklxzDsVcBTfBUTu1UztWB20HF5E6FBR1EBEEBQeLlEKhrULp2k51at3dCr1GOrTpXXEQhNKhil6eJJ7YwfRyl+AvY/IL78Pv33tPSHjqO34/wjxoUVQe2mVvNmlslveSAlACviLy2OnxprME+9e/iYBo8N6uP6SqbwAH2Bf0ue32vcwTcSwgClTb+TQoEr4GeoEDgVe2W3maF6IlIEZsb16Vgk6BVIBvikyWXO9BHohUgChQfbt6BUumUS4BPwR5Z7ve7ayI1IAo0Odgo6+BzIFcBhrAguNWRrMg2gLEM1Hfcmj8fAtcA0JgqXgoY2c976ATSNuAKMgX3z/1vVsXgYFm0PfFQ7neCaIjwBHEHDAMFIA1rBO3HKe33s5MdAz4iwij0zECWKAfLXTsnHuxmhaRCfAnyF7gzyh6EziJsG5peCMtIhdAfFcE/gtBx4Eu0E0N5U7pfOVDq5nIDRCfkN3qM1QmgG5gS7Vwr1S+sHIcIldAnD+C6n1FHgGnI5OI3LV7vOUkRO6A5nKMC/oEOANSQxl1yt5q29mw1folfa8FvjmA0SUwugmNHkNjF9HvpGToKm5mRDPJyGg6NlqQGC3JjBalRstyo42J0dbsSHdspjn9X+35L8RtDDDXC10pAAAAAElFTkSuQmCC";

            return {
                lightBoxCursor,
                prevCursor,
                nextCursor
            };
        };

        return self;
    });
})();;
"use strict";
angular.module('Lexus.Directives')
    .directive('lxAccordion', ['$window', '$timeout', '$filter', '$http', function($window, $timeout, $filter, $http) {
        accordionController.$inject = ['$scope', '$http', '$filter', '$timeout', '$window', '$interval', '$rootScope'];
        return {
            scope: true,
            restrict: 'A',
            controller: accordionController,
            controllerAs: 'ac',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {}
        };

        function accordionController($scope, $http, $filter, $timeout, $window, $interval, $rootScope) {
            var ac = this;
            $scope.init = function(collapseOthersOnExpansion, broadcastSelection) {
                ac.panels = [];
                ac.collapseOthersOnExpansion = collapseOthersOnExpansion;
                ac.broadcastSelection = broadcastSelection;
            };

            $scope.toggleVisible = function(i) {
                var becomeVisible = !ac.panels[i].visible;
                ac.panels[i].visible = becomeVisible;

                // On first open, init content gallery
                if (becomeVisible && !ac.panels[i].hasBeenVisible) {
                    $scope.$broadcast('broadcast.contentGalleryReload', {
                        targetId: ac.panels[i].id
                    });
                    ac.panels[i].hasBeenVisible = true;
                }

                if (becomeVisible == true && ac.collapseOthersOnExpansion) {
                    for (var j = 0; j < ac.panels.length; j++) {
                        if (j != i) {
                            ac.panels[j].visible = false;
                        }
                    }
                }

                if (ac.broadcastSelection) {
                    $rootScope.$broadcast('variant-selected', {
                        selectedVariantIndex: i
                    });
                }
            };

            $scope.initPanel = function(i, initiallyExpanded) {
                ac.panels[i] = {};
                ac.panels[i].id = i;
                ac.panels[i].visible = initiallyExpanded;
                ac.panels[i].hasBeenVisible = false;
            };

            // Check if the URL has a hash link that should set an accordion item open by default.
            $scope.expandItemByDefault = function(divId) {
                return ($window.location.hash === divId) ? true : false;
            };

        }
    }]);


;
"use strict";
angular.module('Lexus.Directives')
    .directive('lxAnchorMenuBar', ['$window', function($window) {
        lxAnchorMenuBarController.$inject = ['$scope', '$filter', '$timeout'];
        return {
            scope: true,
            restrict: 'A',
            controller: lxAnchorMenuBarController,
            controllerAs: 'amc',
            bindToController: {
                modelName: '@'
            },
            link: function(scope, element, attrs) {
                scope.currentlyScrolledId = '';

                if (attrs.anchorMenuItems) {
                    scope.anchorMenuItems = angular.fromJson(attrs.anchorMenuItems);

                    var transitionDelay = 0;
                    for (var i = scope.anchorMenuItems.length - 1; i >= 0; i--) {
                        var anchorMenuItem = scope.anchorMenuItems[i];
                        anchorMenuItem.transitionDelay = transitionDelay;
                        scope.anchorMenuItems[i] = anchorMenuItem;
                        transitionDelay += 0.15;
                    }
                }

                angular.element($window).bind("scroll", function() {
                    calcCurrentlyScrolledIdComponent($window);
                });

                function calcCurrentlyScrolledIdComponent(window) {
                    var currentlyScrolledIdComponent;
                    for (var i = 0; i < scope.anchorMenuItems.length; i++) {
                        var anchorMenuItem = scope.anchorMenuItems[i];
                        var item = $("#" + anchorMenuItem.anchorId)[0];
                        if (!item) continue;
                        anchorMenuItem.offsetTop = item.offsetTop;

                        if (window.pageYOffset + 73 >= anchorMenuItem.offsetTop &&
                            (currentlyScrolledIdComponent == null || anchorMenuItem.offsetTop > currentlyScrolledIdComponent.offsetTop)) {
                            currentlyScrolledIdComponent = anchorMenuItem;
                        }
                    }
                    scope.currentlyScrolledId = currentlyScrolledIdComponent != null ? currentlyScrolledIdComponent.anchorId : scope.anchorMenuItems[0].anchorId;
                }
            }
        };

        function lxAnchorMenuBarController($scope, $filter, $timeout) {
            this.mobileMenuOpen = false;
            this.menuOpenTimeouts = [];
            this.menuCloseTimeouts = [];

            this.getCurrentlyScrolledId = function() {
                return $scope.currentlyScrolledId;
            };

            this.getCurrentlyActiveItem = function() {
                var item = $filter("filter")($scope.anchorMenuItems, {
                    anchorId: $scope.currentlyScrolledId
                });
                return item != null && item.length > 0 ? item[0].title : '';
            };

            this.toggleMobileAnchorMenu = function() {
                this.mobileMenuOpen = !this.mobileMenuOpen;

                if (this.mobileMenuOpen == true) {
                    if ($scope.anchorMenuItems) {
                        for (var i = 0; i < this.menuOpenTimeouts.length; i++) {
                            $timeout.cancel(this.menuOpenTimeouts[i]);
                        }

                        this.menuOpenTimeouts = [];

                        for (var i = 0; i < $scope.anchorMenuItems.length; i++) {
                            var timeout = $timeout(fireMenuOpened, 600, true, $scope.anchorMenuItems[i]);
                            this.menuOpenTimeouts.push(timeout);
                        }
                    }
                } else {
                    if ($scope.anchorMenuItems) {

                        for (var i = 0; i < this.menuCloseTimeouts.length; i++) {
                            $timeout.cancel(this.menuCloseTimeouts[i]);
                        }

                        this.menuCloseTimeouts = [];

                        for (var i = 0; i < $scope.anchorMenuItems.length; i++) {
                            var timeout = $timeout(fireMenuClosed, 0, true, $scope.anchorMenuItems[i]);
                            this.menuCloseTimeouts.push(timeout);
                        }
                    }
                }

                $('body').removeClass("modal-open");

                if (this.mobileMenuOpen) {
                    $('body').addClass("modal-open");
                }
            };

            this.closeMobileAnchorMenu = function() {
                this.mobileMenuOpen = false;
                $('body').removeClass("modal-open");
            };

            function fireMenuOpened(anchorMenuItem) {
                $scope.$broadcast('anchor-menu-opened', anchorMenuItem);
            }

            function fireMenuClosed(anchorMenuItem) {
                $scope.$broadcast('anchor-menu-closed', anchorMenuItem);
            }
        }
    }]);


angular.module('Lexus.Directives')
    .directive('lxAnchorMenuItem', ['$rootScope', '$anchorScroll', '$location', function($rootScope, $anchorScroll, $location) {
        return {
            scope: true,
            restrict: 'A',
            require: "^lxAnchorMenuBar",
            link: function(scope, element, attrs, controller) {
                scope.anchorId = attrs.anchorId;

                scope.isActive = function() {
                    return controller.getCurrentlyScrolledId() == attrs.anchorId;
                };

                scope.lazyRerender = function() {
                    window.setTimeout(() => {
                        $rootScope.$digest();
                    }, 1100);
                }

                scope.$on('anchor-menu-opened', function(event, data) {
                    if (scope.anchorId == data.anchorId) {
                        element.css({
                            transition: "opacity 0.25s ease-out " + data.transitionDelay + "s, transform 0.25s ease-out " + data.transitionDelay + "s"
                        });
                        element.addClass("menu-open");
                    }
                });

                scope.$on('anchor-menu-closed', function(event, data) {
                    if (scope.anchorId == data.anchorId) {
                        element.removeClass("menu-open");
                    }
                });

            }
        }
    }]);;
'use strict';

angular.module('Lexus.angulartics', ['angulartics'])
    .config(['$analyticsProvider', function($analyticsProvider) {

        $analyticsProvider.settings.ga = {
            userId: null
        };

        $analyticsProvider.registerPageTrack(function(path) {
            var dataLayer = window.dataLayer = window.dataLayer || [];
            dataLayer.push({
                'event': 'content-view',
                'content-name': path,
                'userId': $analyticsProvider.settings.ga.userId
            });
        });

        $analyticsProvider.registerEventTrack(eventTrack);

        function eventTrack(action, properties) {
            var dataLayer = window.dataLayer = window.dataLayer || [];
            properties = properties || {};

            // Only fire when the GA4 event comes from clicking email or phone.
            if ((properties.serviceType === "Sales" || properties.serviceType === "Service") && (properties.label === "Phone" || properties.label === "Email")) {
                dataLayer.push({
                    "event": "find_a_dealer",
                    "target": properties.category,
                    "action": properties.action,
                    "target-properties": properties.label,
                    "value": properties.value,
                    "interaction-type": properties.noninteraction,
                    "model": properties.model,
                    "driveAwayPrice": properties.driveAwayPrice,
                    "variant": properties.variant,
                    "userId": $analyticsProvider.settings.ga.userId,
                    "salesOrService": properties.serviceType,
                    "dealerSelected": properties.dealer,
                    "contactMethod": properties.label,
                });
            }

            if (properties.event === "build_and_price") {
                dataLayer.push({
                    ...properties,
                    "userId": $analyticsProvider.settings.ga.userId,
                });
                return;
            }

            dataLayer.push({
                'event': properties.event || 'interaction',
                'target': properties.category,
                'action': properties.action,
                'target-properties': properties.label,
                'value': properties.value,
                'interaction-type': properties.noninteraction,
                'model': properties.model,
                'driveAwayPrice': properties.driveAwayPrice,
                'variant': properties.variant,
                'userId': $analyticsProvider.settings.ga.userId
            });

        }

        $analyticsProvider.registerExceptionTrack(function(error, cause) {

            eventTrack(error.toString(), {
                'category': 'Exceptions',
                'label': error.stack
            });

        });

        $analyticsProvider.registerSetUsername(function(userId) {
            $analyticsProvider.settings.ga.userId = userId;
        });

    }]);

angular.module('Lexus.Directives')
    .directive('lxGtm', ['$window', '$timeout', '$filter', '$http', '$analytics', function($window, $timeout, $filter, $http, $analytics) {
        gtmController.$inject = ['$rootScope', '$scope', '$http', '$filter', '$timeout', '$window', '$interval', '$analytics', 'UserPreferencesService'];
        return {
            scope: true,
            restrict: 'A',
            controller: gtmController,
            controllerAs: 'gtm',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {
                var helpers = {};
                helpers.now = Date.now || function() {
                    return new Date().getTime();
                };
                helpers.debounce = function(func, wait, immediate) {
                    var timeout, args, context, timestamp, result;

                    var later = function() {
                        var last = helpers.now() - timestamp;

                        if (last < wait && last >= 0) {
                            timeout = setTimeout(later, wait - last);
                        } else {
                            timeout = null;
                            if (!immediate) {
                                result = func.apply(context, args);
                                if (!timeout) context = args = null;
                            }
                        }
                    };

                    return function() {
                        context = this;
                        args = arguments;
                        timestamp = helpers.now();
                        var callNow = immediate && !timeout;
                        if (!timeout) timeout = setTimeout(later, wait);
                        if (callNow) {
                            result = func.apply(context, args);
                            context = args = null;
                        }

                        return result;
                    };
                };
                helpers.throttle = function(func, wait) {
                    var context, args, timeout, throttling, more, result;
                    var whenDone = helpers.debounce(function() {
                        more = throttling = false;
                    }, wait);
                    return function() {
                        context = this;
                        args = arguments;
                        var later = function() {
                            timeout = null;
                            if (more) func.apply(context, args);
                            whenDone();
                        };
                        if (!timeout) timeout = setTimeout(later, wait);
                        if (throttling) {
                            more = true;
                        } else {
                            result = func.apply(context, args);
                        }
                        whenDone();
                        throttling = true;
                        return result;
                    };
                };

                var currentScrollDepth = 0;

                var scrollDepth = function(e) {
                    //whatever
                    var topEdge = $window.pageYOffset,
                        clientHeight = $window.innerHeight,
                        fullHeight = document.body.clientHeight,
                        calculatedScrollDepth = ((topEdge / (fullHeight - clientHeight)) * 100).toFixed();

                    var scrollEvent = function(calculated, current) {
                        if (calculated != current) {
                            currentScrollDepth = calculated;
                            //$analytics.eventTrack('Scroll Event', { category: window.location.pathname, action: 'Page Scroll', label: currentScrollDepth + '%', noninteraction: true });
                            $analytics.eventTrack('Scroll Event', {
                                event: 'Scroll',
                                category: window.location.pathname,
                                action: 'Page Scroll',
                                label: currentScrollDepth + '%',
                                noninteraction: true
                            });
                        }
                    };

                    if ((calculatedScrollDepth - currentScrollDepth) > 10 || (calculatedScrollDepth - currentScrollDepth) < -10) {
                        scrollEvent(((calculatedScrollDepth / 10).toFixed() * 10), currentScrollDepth);
                    } else if (calculatedScrollDepth == 0) {
                        scrollEvent(0, currentScrollDepth);
                    } else if (calculatedScrollDepth == 100) {
                        scrollEvent(100, currentScrollDepth);
                    }
                };

                angular.element($window).bind("scroll", helpers.throttle(scrollDepth, 100));
            }
        };

        function gtmController($rootScope, $scope, $http, $filter, $timeout, $window, $interval, $analytics, UserPreferencesService) {
            var gtm = this;
            gtm.trackers = [];
            gtm.forms = {};
            gtm.chatTracked = false;

            if (window.Element && !Element.prototype.closest) {
                Element.prototype.closest =
                    function(s) {
                        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                            i,
                            el = this;
                        do {
                            i = matches.length;
                            while (--i >= 0 && matches.item(i) !== el) {};
                        } while ((i < 0) && (el = el.parentElement));
                        return el;
                    };
            }

            if (!Element.prototype.matches) {
                Element.prototype.matches =
                    Element.prototype.matchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector ||
                    Element.prototype.oMatchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    function(s) {
                        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                            i = matches.length;
                        while (--i >= 0 && matches.item(i) !== this) {}
                        return i > -1;
                    };
            }

            function extractContent(s) {
                var span = document.createElement('span');
                span.innerHTML = s;
                return span.textContent || span.innerText;
            };

            function checkValue(val, el, type) {
                var newVal = val;
                switch (val) {
                    case ':path':
                        newVal = window.location.pathname;
                        break;
                    case ':link':
                        newVal = el.getAttribute('href');
                        break;
                    case ':parentlink':
                        newVal = el.parentElement.getAttribute('href');
                        break;
                }

                if (el.matches('[type]') && el.type.toLowerCase() == 'submit' && type == 'label') {
                    if (angular.element(el).closest('form').hasClass('ng-invalid'))
                        newVal += ' - Errors';
                }

                return newVal.replace(/\n/g, ' ');
            }

            function getGtmDetails(el) {
                var labelEl = el.closest('[data-gtm-label]');
                var categoryEl = el.closest('[data-gtm-category]');
                var subCategoryEl = el.closest('[data-gtm-sub-category]');
                var priceEl = el.closest('[data-gtm-drive-away-price]');
                var dealerEl = el.closest("[data-gtm-dealer]");
                //temp change: this is for find a dealer only unless refactor to React component
                var findADealerEl = el.closest("[data-gtm-find-a-dealer]");

                var label = labelEl ? checkValue(labelEl.dataset.gtmLabel, el, 'label') : false;
                var subCategory = subCategoryEl ? checkValue((subCategoryEl) ? subCategoryEl.dataset.gtmSubCategory : '', el, 'subCategory') : false;
                var category = categoryEl ? checkValue((categoryEl) ? categoryEl.dataset.gtmCategory : '', el, 'category') : false;
                var price = priceEl ? checkValue((priceEl) ? priceEl.dataset.gtmDriveAwayPrice : '', el, 'driveAwayPrice') : false;
                var dealer = dealerEl ? checkValue(labelEl.dataset.gtmDealer, el, "dealer") : false;
                var serviceType = findADealerEl ?
                    checkValue(findADealerEl.dataset.gtmFindADealer, el, "findADealer") :
                    false;

                if (label && subCategory && category) {
                    var tracker = {
                        el: el,
                        category: category,
                        subCategory: subCategory,
                        label: label,
                        driveAwayPrice: price,
                        dealer,
                        serviceType,
                    };
                    return tracker;
                }
            }

            var pushAnalytics = function(label, data) {
                var data = data;
                var preferences = UserPreferencesService.getLexusVehicle();
                data.model = preferences.model;
                data.variant = preferences.engineVariant;

                $analytics.eventTrack(label.replace(/\s/gi, '-'), data);
            };

            var analyticsClick = function(event) {
                var el = event.target;
                $timeout(function() {
                    var gtmDetails = getGtmDetails(el);
                    //$analytics.eventTrack(gtmDetails.subCategory, { category: gtmDetails.category, action: gtmDetails.subCategory, label: gtmDetails.label });
                    if (gtmDetails) {
                        pushAnalytics(gtmDetails.subCategory, {
                            category: gtmDetails.category,
                            action: gtmDetails.subCategory,
                            label: gtmDetails.label,
                            driveAwayPrice: gtmDetails.driveAwayPrice,
                            dealer: gtmDetails.dealer,
                            serviceType: gtmDetails.serviceType,
                        });
                    }
                });
            };

            var analyticsBlur = function(event) {
                var el = event.target,
                    details = el.dataset.gtmFormDetails.split('||');
                gtm.forms[details[0]][details[1]].touched = true;
            };

            var chatClick = function(event) {
                pushAnalytics('Live Chat', {
                    category: window.location.pathname,
                    action: 'Live Chat',
                    label: 'Chat Clicked'
                });
            };

            var addTrackers = function() {
                gtm.labels = document.querySelectorAll('[data-gtm-label]');

                for (var e = 0, len = gtm.labels.length; e < len; e++) {
                    var el = gtm.labels[e];
                    angular.element(el).off('click', analyticsClick);
                    angular.element(el).on('click', analyticsClick);
                };
            };

            var addForms = function() {
                //Exclude SC from which will have its own GTM supported specifically
                var forms = document.querySelectorAll('form:not(.lx-scforms)');
                for (var f = 0, len = forms.length; f < len; f++) {
                    var frm = forms[f];
                    var formName = frm.closest("[data-gtm-sub-category]") ? .dataset.gtmSubCategory.replace(/\W/g, "");
                    gtm.forms[formName] = [];
                    var inputs = frm.querySelectorAll('input,select,textarea,button');

                    for (var i = 0, inputLen = inputs.length; i < inputLen; i++) {
                        var el = inputs[i];
                        var labelText = el.closest('label');
                        if (el.type != 'hidden' && el.type != 'submit' && !el.matches('[style*="display: none"')) {
                            var inputLabel = null;
                            if (inputLabel == null) inputLabel = (el.closest('label')) ? el.closest('label').innerText : null;
                            if (inputLabel == null) inputLabel = (el.closest('.lx-form-text-label')) ? el.closest('.lx-form-text-label').innerText : null;
                            if (inputLabel == null)
                                inputLabel = el.hasAttribute("id") ?
                                document.querySelector("[for=" + el.id + "]") ? .innerText :
                                el.innerText;

                            inputLabel =
                                inputLabel &&
                                inputLabel
                                .replace(/^\n/, "")
                                .replace(/^\s*/, "")
                                .replace(/(.*)\n(.*)/g, "$1")
                                .replace(/\W/g, "-")
                                .replace(/-{2,}/g, "-");

                            var item = {
                                el: el,
                                label: inputLabel,
                                index: gtm.forms[formName].length,
                                touched: false
                            };
                            el.setAttribute('data-gtm-form-details', formName + '||' + item.index);

                            angular.element(el).on('blur change input', analyticsBlur);
                            gtm.forms[formName].push(item);
                        }
                    }
                }

                //console.log(gtm.forms);

            };

            var addChat = function() {
                var chatButton = document.querySelector('img[id^=LCM]');

                if (chatButton && !gtm.chatTracked) {
                    angular.element(chatButton).on('click', chatClick);
                    gtm.chatTracked = true;
                }
            };

            var checkForChat = function(delay, count, limit) {
                //console.log('checkForChat(' + delay + ',' + count + ',' + limit + ')');
                if (typeof LCM != 'undefined' && LCM) {
                    console.log(LCM);
                    addChat();
                } else if (count < limit) {
                    setTimeout(function() {
                        checkForChat(delay, count + 1, limit);
                    }, delay);
                }

            };

            $rootScope.$on('open-modal-window', function(event, data) {
                var errorWords = ['oops', 'error', 'warning', 'unavailable', 'problem'];
                var matchString = new RegExp(errorWords.join('|'), 'gi', '');

                var modalType = (data.content.match(matchString)) ? 'Error Message' : 'Dialog';

                var eventObject = {
                    category: window.location.pathname,
                    action: 'Modal ' + modalType,
                    label: extractContent(data.content)
                };
                //console.log(eventObject);
                //$analytics.eventTrack('Modal Window', eventObject);
                pushAnalytics('Modal Window', eventObject);

            });

            $scope.$on('gtm-form-success', function(event, data, labelSuffix) {
                var category = window.location.pathname;
                var action = data; //  Form name
                var label = 'Form Submission Success' + (labelSuffix != null ? " - " + labelSuffix : "");
                pushAnalytics(category, {
                    category: category,
                    action: action,
                    label: label
                });
            });

            $scope.$on('gtm-form-failure', function(event, data) {
                var category = window.location.pathname;
                var action = data; //  Form name

                pushAnalytics(category, {
                    category: category,
                    action: action,
                    label: 'Form Submission Failure'
                });
            });

            function pushVehicleAnalytics(area, vehicle, eventData) {

                if (vehicle.carmodel != null && vehicle.carmodel != "")
                    pushAnalytics(area, {
                        category: area,
                        action: 'Model',
                        label: eventData.source + ': ' + vehicle.carmodel
                    });
                if (vehicle.engineVariant != null && vehicle.engineVariant != "")
                    pushAnalytics(area, {
                        category: area,
                        action: 'Variant',
                        label: eventData.source + ': ' + vehicle.engineVariant
                    });
                if (vehicle.grade != null && vehicle.grade != "")
                    pushAnalytics(area, {
                        category: area,
                        action: 'Grade',
                        label: eventData.source + ': ' + vehicle.grade
                    });
                if (vehicle.enhancementPack != null && vehicle.enhancementPack != "")
                    pushAnalytics(area, {
                        category: area,
                        action: 'Enhancement Pack',
                        label: eventData.source + ': ' + vehicle.enhancementPack
                    });
                if (vehicle.colour != null && vehicle.colour != "")
                    pushAnalytics(area, {
                        category: area,
                        action: 'Colour',
                        label: eventData.source + ': ' + vehicle.colour
                    });
                if (vehicle.trim != null && vehicle.trim != "")
                    pushAnalytics(area, {
                        category: area,
                        action: 'Trim',
                        label: eventData.source + ': ' + vehicle.trim
                    });
            }

            $scope.$on('gtm-buildPrice', function(event, eventData) {
                var area = 'Build And Price';
                var vehicle = eventData.data;

                if (eventData.source.toLowerCase().match(/initial|summary|default/)) {
                    pushVehicleAnalytics(area, vehicle, eventData);
                }

                if (eventData.source == "360") {
                    pushAnalytics(area, {
                        category: area,
                        action: '360',
                        label: 'Vehicle Rotated'
                    });
                }

                if (eventData.source.toLowerCase().replace(/\s/gi, '') == "postcoderoadblock") {
                    if (eventData.data.dialogDisplayed) {
                        if (eventData.data.firstVisit) {
                            pushAnalytics(area, {
                                category: 'Postcode Roadblock',
                                action: area,
                                label: 'Roadblock displayed'
                            });
                        } else {
                            pushAnalytics(area, {
                                category: 'Postcode Roadblock',
                                action: area,
                                label: 'Postcode displayed'
                            });
                        }
                    } else {
                        pushAnalytics(area, {
                            category: 'Postcode Roadblock',
                            action: area,
                            label: 'Roadblock and Postcode not displayed'
                        });
                    }
                }

                // New GA4 event. Only send event on last step
                if (eventData.source.toLowerCase() === "summary") {
                    const dealerName = eventData.data.dealerName;
                    const data = {
                        "event": "build_and_price",
                        "model": vehicle.carmodel || "unknown",
                        "variant": vehicle.engineVariant || "unknown",
                        "grade": vehicle.grade || "unknown",
                        "enhancement_pack": vehicle.enhancementPack || "unknown",
                        "exterior_colour": vehicle.colour || "unknown",
                        "interior_colour": vehicle.trim || "unknown",
                        "website": dealerName || "Corporate"
                    }
                    $analytics.eventTrack("build_and_price", data);
                }
            });

            $scope.$on('gtm-preLaunch', function(event, eventData) {
                var area = 'Pre Launch';

                if (eventData.source.toLowerCase().match(/initial|interior|exterior|default/)) {
                    var vehicle = eventData.data;
                    pushVehicleAnalytics(area, vehicle, eventData);
                }

            });

            $scope.$on('refresh-gtm', function(event, data) {
                console.log('lxGtm: refresh-gtm event received from: ', data);
                $timeout(function() {
                    addTrackers();
                }, 150, false);
            });

            $window.addEventListener('beforeunload', function(event) {
                var forms = Object.keys(gtm.forms);
                if (forms.length > 0) {
                    forms.forEach(function(formName) {
                        var form = gtm.forms[formName];
                        var touched = [];
                        var filled = '';
                        form.forEach(function(item) {
                            if (item.touched) {
                                touched.push(item);
                                filled += (filled.length > 0) ? ' >> ' + item.label : item.label;
                            }
                        });
                        var eventObject = {
                            category: window.location.pathname,
                            action: formName,
                            label: touched.length + '/' + form.length + ' fields: ' + filled
                        };
                        //console.log(eventObject);
                        //$analytics.eventTrack(formName, eventObject);
                        pushAnalytics(formName, eventObject);

                    });
                }
            });

            function init() {
                $timeout(function() {
                    addTrackers();
                    addForms();
                }, 0, false);
                $timeout(function() {
                    addTrackers();
                    addForms();
                    checkForChat(100, 0, 10);
                }, 500, false);
            }

            init();

        }
    }]);

;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxHero', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var controls = attrs.controls || false,
                    _window = angular.element(window),
                    _header = angular.element('header'),
                    _bNav = angular.element('.lx-b-nav'),
                    _cta = angular.element('.lx-cta-bar'),
                    headerHeight = _header.innerHeight(),
                    breakpointSrc = 'src-lg',
                    oldBreakpointSrc,
                    breakpointHeightAdjust = Lexus.Breakpoint.Small;

                function init() {
                    fullScreenResize();
                }

                function fullScreenResize() {
                    var windowHeight = _window.innerHeight(),
                        ctaHeight = (element.hasClass('has-cta-bar')) ? 0 : (_cta.length > 0) ? _cta.innerHeight() : 96,
                        bNavHeight = (_bNav.length > 0) ? _bNav.innerHeight() : 0,
                        imageHeight = windowHeight - headerHeight - ctaHeight - bNavHeight;

                    if (_window.width() < breakpointHeightAdjust) {
                        imageHeight = 261;
                    }

                    element.height(imageHeight);
                }

                _window.resize(function() {
                    fullScreenResize();
                });

                _window.ready(function() {
                    init();
                });
            }
        };
    }]);;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxBackgroundImage', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var controls = attrs.controls || false,
                    _window = angular.element(window),
                    _currentSize = 0,
                    _newSize = 0;

                function init() {
                    updateBackgroundSize();
                }

                function updateBackgroundSize() {

                    if (_window.width() <= Lexus.Breakpoint.ExtraExtraSmall) {
                        _newSize = Lexus.Breakpoint.ExtraExtraSmall;
                    } else if (_window.width() <= Lexus.Breakpoint.ExtraSmall) {
                        _newSize = Lexus.Breakpoint.ExtraSmall;
                    } else if (_window.width() <= Lexus.Breakpoint.Small) {
                        _newSize = Lexus.Breakpoint.Small;
                    } else {
                        _newSize = 1920;
                    } // Lexus.Breakpoint.Medium; }

                    if (_currentSize != _newSize) {

                        var resolvedBackground = attrs.background + '?q=95&w=' + _newSize;

                        if (attrs.backgroundFillVertical) {
                            resolvedBackground = attrs.background + '?q=95&h=' + element[0].clientHeight;
                        }

                        element.css({
                            'background-image': 'url(' + resolvedBackground + ')'
                        });

                        _currentSize = _newSize;

                    }
                }

                _window.resize(function() {
                    updateBackgroundSize();
                });

                _window.ready(function() {
                    init();
                });
            }
        };
    }]);;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxImageResize', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var controls = attrs.controls || false,
                    _window = angular.element(window),
                    _currentSize = 0,
                    _newSize = 0;

                function init() {
                    updateImageSize();
                }

                function updateImageSize() {

                    if (_window.width() <= Lexus.Breakpoint.ExtraExtraSmall) {
                        _newSize = Lexus.Breakpoint.ExtraExtraSmall;
                    } else if (_window.width() <= Lexus.Breakpoint.ExtraSmall) {
                        _newSize = Lexus.Breakpoint.ExtraSmall;
                    } else if (_window.width() <= Lexus.Breakpoint.Small) {
                        _newSize = Lexus.Breakpoint.Small;
                    } else {
                        _newSize = 1200;
                    }

                    if (_currentSize != _newSize) {
                        var resolvedImage = attrs.image + '?q=95&w=' + _newSize;
                        attrs.$set("src", resolvedImage);
                        _currentSize = _newSize;
                    }
                }

                _window.resize(function() {
                    updateImageSize();
                });

                _window.ready(function() {
                    init();
                });
            }
        };
    }]);;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxCarousel', [function() { // Lazy load images.
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var controls = attrs.controls || false,
                    _window = angular.element(window),
                    _header = angular.element('header'),
                    _allImages = element.find('.lx-carousel__image'),
                    //_videos = element.find('.carousel-video'),
                    //_ytVideos = [],
                    feautredCarousel = element.parent('.lx-carousel'),
                    headerHeight = _header.innerHeight(),
                    breakpointSrc = 'src-lg',
                    reassignSources = true,
                    oldBreakpointSrc,
                    breakpointHeightAdjust = Lexus.Breakpoint.Small,
                    //hasLoadedYoutubeAPI = false,
                    bxSlider;

                function init() {
                    fullScreenResize();
                    imageSrc();
                    initSlider();
                }

                // If it is a feature carousel then resize images.
                function fullScreenResize() {
                    var windowHeight = _window.innerHeight(),
                        imageHeight = windowHeight - headerHeight - 88;

                    if (feautredCarousel.length > 0) {
                        if (_window.width() < breakpointHeightAdjust) {
                            imageHeight = 261;
                        }

                        element.height(imageHeight);
                        _allImages.height(element.height());
                    }
                }

                function findElement(arr, propName, propValue) {
                    for (var i = 0; i < arr.length; i++)
                        if (arr[i][propName] == propValue)
                            return arr[i];

                    // will return undefined if not found; you could return a default instead
                }

                // Resize all video heights, as iframes won't automatically set height
                //function videoResize() {
                //    if (_videos.length) {
                //        var videoHeight = element[0].parentElement.clientHeight * 0.97; // set to 0.97 to prevent height adjust issue
                //        for (var i = 0; i < _videos.length; i++) {
                //            _videos[i].height = videoHeight;
                //        }
                //    }
                //}

                // Pauses all the videos
                //function pauseVideos() {
                //    if (_ytVideos.length) {
                //        angular.forEach(_ytVideos, function (value, key) {
                //            if (value.value && value.value.stopVideo) {
                //                value.value.stopVideo();
                //            }
                //        });
                //    }
                //}

                function imageSrc() {
                    if ((reassignSources || breakpointSrc == 'src') && _window.width() > breakpointHeightAdjust) {
                        breakpointSrc = 'src-lg';
                        reassignSrc();
                    } else if ((reassignSources || breakpointSrc == 'src-lg') && _window.width() <= breakpointHeightAdjust) {
                        breakpointSrc = 'src';
                        reassignSrc();
                    }
                    reassignSources = false;
                }

                function reassignSrc() {
                    $(_allImages).each(function() {
                        var $img = $(this).hasClass('lx-carousel__image') ? $(this) : $(this).find('.lx-carousel__image');
                        $img.attr('src', null).attr('src', $img.attr('data-' + breakpointSrc));

                    });
                }

                //function initYoutubeAPI() {

                //    var tag = document.createElement('script');
                //    tag.src = "https://www.youtube.com/iframe_api";
                //    var firstScriptTag = document.getElementsByTagName('script')[0];
                //    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                //    hasLoadedYoutubeAPI = true;
                //}

                // Load bxslider.
                function initSlider() {
                    var _allImages = element.find('.lx-carousel__image'),
                        imagesLength = _allImages.length;

                    //// retrieve all youtube video iframes
                    //var _frames = element.find('.carousel-video'),
                    //    framesLength = _frames.length;

                    ////Init the YT JS API
                    //if (!hasLoadedYoutubeAPI) {
                    //    initYoutubeAPI();
                    //}

                    function loadBackgroundImage(slide) {
                        if (angular.isDefined(slide) &&
                            (angular.isUndefined(slide.css('background-image')) || slide.css('background-image') == 'none' || !angular.equals(breakpointSrc, oldBreakpointSrc))) {
                            slide.css('background-image', 'url("' + slide.data(breakpointSrc) + '")');
                            slide.find('img').attr('src', slide.data(breakpointSrc)).hide();
                        }
                    };

                    bxSlider = element.bxSlider({
                        mode: 'fade',
                        minSlides: 1,
                        maxSlides: 1,
                        slideMargin: 0,
                        captions: true,
                        auto: true,
                        pause: 5000,
                        pager: true,
                        autoHover: true,
                        nextText: '',
                        prevText: '',
                        controls: controls,
                        onSliderLoad: function(currentIndex) {

                            if (imagesLength) {
                                var _firstElement = angular.element(_allImages[currentIndex]),
                                    _secondElement = angular.element(_allImages[currentIndex + 1]);

                                // Show first element.
                                loadBackgroundImage(_firstElement);
                                loadBackgroundImage(_secondElement);
                            }
                            //videoResize();
                        },
                        onSlideBefore: function() {},
                        onSlideAfter: function($slideElement, oldIndex, newIndex) {
                            //When a video comes into view start playing it, when its left pause it again
                            //pauseVideos();
                            //if ($slideElement.hasClass('slide-video')) {
                            //    var video = $slideElement.find('iframe');
                            //    if (!findElement(_ytVideos, 'name', video[0].id)) {
                            //        var player = new YT.Player(video[0].id, {
                            //            events: {
                            //                'onReady': function (event) {
                            //                    event.target.setVolume(0);
                            //                    event.target.playVideo();
                            //                },
                            //                'onStateChange': function (event) {

                            //                    switch (event.data) {
                            //                        case YT.PlayerState.PLAYING:
                            //                            bxSlider.stopAuto();
                            //                            //pause the gallery rotation
                            //                            break;
                            //                        case YT.PlayerState.PAUSED:
                            //                            bxSlider.startAuto();
                            //                            //resume gallery rotation
                            //                            break;
                            //                        case YT.PlayerState.ENDED:
                            //                            bxSlider.startAuto();
                            //                            //resume gallery rotation
                            //                            break;
                            //                        default:
                            //                            //default code block
                            //                    }
                            //                },
                            //                'onError': function (data) {
                            //                    console.log('Error ' + data);
                            //                }
                            //            }
                            //        });
                            //        _ytVideos.push({
                            //            name: video[0].id,
                            //            value: player
                            //        });
                            //    }
                            //    var ytObj = findElement(_ytVideos, 'name', video[0].id);
                            //    //This is used for the second pass on the same video, the above ready callback wont run
                            //    //Get player state will not be valid on first pass cause the video isnt inited yet
                            //    if (ytObj.value.getPlayerState) {
                            //        console.log(ytObj.value.getPlayerState());

                            //        switch (ytObj.value.getPlayerState()) {
                            //            case -1: //unstarted
                            //                ytObj.value.setVolume(0);
                            //                ytObj.value.playVideo();
                            //                break;
                            //            case 0: //ended
                            //                break;
                            //            case 1: //playing
                            //                break;
                            //            case 2: //paused
                            //                break;
                            //            case 3: //buffering
                            //                break;
                            //            case 5: //video cued
                            //                break;
                            //            default:
                            //        }
                            //    }
                            //}
                            if (imagesLength) {
                                var _thisImage = angular.element(_allImages[newIndex]);
                                var _nextImage = angular.element(_allImages[newIndex + 1]);
                                loadBackgroundImage(_thisImage);
                                loadBackgroundImage(_nextImage);
                                oldBreakpointSrc = breakpointSrc;
                            }
                        }
                    });
                }


                _window.resize(function() {

                    //put this on a short timeout to prevent continuous re-initing while resizing
                    init();
                    fullScreenResize();
                    imageSrc();
                    //videoResize();
                });

                _window.ready(function() {
                    init();
                });
            }
        };
    }]);;
'use strict';

(function() {
    var EVENT_OPEN_LIGHTBOX = 'EVENT_OPEN_LIGHTBOX';
    var EVENT_OWL_CHANGED = 'EVENT_OWL_CHANGED';

    angular.module('Lexus.Directives').directive('lxImageGalleryCarousel', [
        'FontIconService',
        '$timeout',
        '$window',
        function(FontIconService, $timeout, $window) {
            controller.$inject = ['$scope', '$attrs'];

            return {
                scope: true,
                restrict: 'A',
                link: link,
                controller: controller,
                controllerAs: 'ImageGalleryCtrl',
                bindToController: true,
                transclude: true
            };

            function link(scope, element, attrs, ctrl, transclude) {
                transclude(scope, function(clone) {
                    element.append(clone);
                });

                function loadAllImages(callback) {
                    var numImagesLoaded = 0;
                    var images = element
                        .find('.js-owl-carousel')
                        .first()
                        .find('.item img')
                        .toArray();

                    for (var i = 0; i < images.length; i++) {
                        var img = new Image();
                        img.src = images[i].src;
                        img.addEventListener('load', function() {
                            numImagesLoaded += 1;
                            if (numImagesLoaded === images.length) {
                                callback();
                            }
                        });
                    }
                }

                // Fix for owl carousel incorrectly computing the stage width
                // when used in conjunction with `autoWidth: true`.
                // https://github.com/OwlCarousel2/OwlCarousel2/issues/1139
                function fixOwlStageWidth() {
                    var stage = element.find('.owl-stage').first();
                    stage.width(stage.width() * 2);

                    window.addEventListener('load', function() {
                        ctrl.$owlCarousel.trigger('refresh.owl.carousel');
                    });
                }

                var owlCarouselOptions = {
                    items: 2,
                    margin: 40,
                    nav: false,
                    dots: false,
                    smartSpeed: 750,
                    autoWidth: true,
                    onInitialized: fixOwlStageWidth,
                    onRefreshed: fixOwlStageWidth
                };
                var $items = element
                    .find('.js-owl-carousel')
                    .first()
                    .find('.item');

                if (typeof attrs.lxImageGalleryCarouselOptions !== 'undefined') {
                    owlCarouselOptions = angular.extend(
                        owlCarouselOptions,
                        JSON.parse(attrs.lxImageGalleryCarouselOptions)
                    );
                }

                ctrl.numberOfItems = $items.length;
                ctrl.hasLightbox = typeof attrs.lxImageGalleryCarouselHasLightbox !== 'undefined';
                ctrl.isInsideLightbox = typeof attrs.lxImageGalleryCarouselIsInsideLightbox !== 'undefined';

                // If the carousel is inside a lightbox we want to expand each items
                // height to fill the maximum vertical space allocated to it via CSS.
                function resizeItems() {
                    var height = element
                        .find('.lx-image-gallery-carousel__owl-body')
                        .first()
                        .height();

                    $items.each(function() {
                        $(this).css({
                            height: height + 'px',
                            width: 'auto'
                        });
                    });

                    if (typeof ctrl.$owlCarousel !== 'undefined') {
                        ctrl.$owlCarousel.trigger('refresh.owl.carousel');
                    }
                }

                if (ctrl.isInsideLightbox) {
                    $($window).on('resize', resizeItems);
                    resizeItems();
                }

                // If we do not wait for the images to load, on occasion owl carousel
                // will not load correctly (only on occasion though).
                loadAllImages(function() {
                    scope.$apply(function() {
                        ctrl.$owlCarousel = element
                            .find('.js-owl-carousel')
                            .first()
                            .owlCarousel(owlCarouselOptions);
                        ctrl.owlCarouselInitialised = true;
                    });
                });

                // Apply a custom cursor to items if it this carousel contains a lightbox.
                if (ctrl.hasLightbox) {
                    var {
                        lightBoxCursor
                    } = FontIconService.generateCursorIcon();

                    $items.find('img').each(function() {
                        $(this).css("cursor", "url(" + lightBoxCursor + ") 16 16, auto");
                    });
                }

                // Apply a custom cursor to the next/previous buttons if inside lightbox.
                if (ctrl.isInsideLightbox) {
                    var {
                        prevCursor,
                        nextCursor
                    } = FontIconService.generateCursorIcon();

                    element
                        .find(".js-lx-image-gallery-carousel-overlay-nav-button-prev")
                        .first()
                        .css("cursor", "url(" + prevCursor + ") 16 16, auto");
                    element
                        .find(".js-lx-image-gallery-carousel-overlay-nav-button-next")
                        .first()
                        .css("cursor", "url(" + nextCursor + ") 16 16, auto");
                }
            }

            function controller($scope, $attrs) {
                var $owlCarousel = null;
                var ImageGalleryCtrl = this;
                ImageGalleryCtrl.sliderValue = 1;

                ImageGalleryCtrl.handleNextClick = function() {
                    if (!$owlCarousel) return;
                    $owlCarousel.trigger('next.owl.carousel');
                };

                ImageGalleryCtrl.handlePrevClick = function() {
                    if (!$owlCarousel) return;
                    $owlCarousel.trigger('prev.owl.carousel');
                };

                ImageGalleryCtrl.handleItemClick = function(event) {
                    if (!ImageGalleryCtrl.hasLightbox) return;

                    if (!$(event.target).hasClass("lx-image-gallery-carousel__owl-carousel-image")) {
                        event.stopPropagation();
                        return;
                    }

                    $scope.$broadcast(EVENT_OPEN_LIGHTBOX, ImageGalleryCtrl.sliderValue);
                };

                ImageGalleryCtrl.handleSliderChange = function() {
                    if (!$owlCarousel) return;
                    $owlCarousel.trigger('to.owl.carousel', ImageGalleryCtrl.sliderValue - 1);
                };

                $scope.$watch(
                    'ImageGalleryCtrl',
                    function(newValue, oldValue) {
                        if (newValue.owlCarouselInitialised && !oldValue.owlCarouselInitialised) init();
                    },
                    true
                );

                function init() {
                    $owlCarousel = ImageGalleryCtrl.$owlCarousel.owlCarousel();

                    $owlCarousel.on('changed.owl.carousel', function(event) {
                        ImageGalleryCtrl.sliderValue = event.item.index + 1;

                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }

                        if (ImageGalleryCtrl.hasLightbox) {
                            $scope.$broadcast(EVENT_OWL_CHANGED, ImageGalleryCtrl.sliderValue);
                        }
                    });

                    $attrs.$observe('lxImageGalleryCarouselSliderValue', function(sliderValue) {
                        $owlCarousel.trigger('to.owl.carousel', sliderValue);
                    });
                }
            }
        }
    ]);

    angular.module('Lexus.Directives').directive('lxImageGalleryCarouselLightbox', function() {
        ImageGalleryCarouselLightboxController.$inject = ['$scope', '$element'];

        return {
            scope: true,
            restrict: 'A',
            controller: ImageGalleryCarouselLightboxController,
            controllerAs: 'LightboxCtrl',
            bindToController: true
        };

        function ImageGalleryCarouselLightboxController($scope, $element) {
            var LightboxCtrl = this;
            var element = $element[0];
            var $document = $(document);
            var KEYUP_EVENT = 'keyup.lxImageGalleryCarousel';

            LightboxCtrl.isOpen = false;
            LightboxCtrl.sliderValue = 1;

            LightboxCtrl.open = function() {
                bodyScrollLock.disableBodyScroll(element);
                LightboxCtrl.isOpen = true;
                $document.on(KEYUP_EVENT, function(e) {
                    if (e.key === 'Escape') {
                        LightboxCtrl.isOpen = false;
                        bodyScrollLock.enableBodyScroll(element);
                        $scope.$apply();
                    }
                });
            };

            LightboxCtrl.close = function() {
                LightboxCtrl.isOpen = false;
                bodyScrollLock.enableBodyScroll(element);
                $document.off(KEYUP_EVENT);
            };

            $scope.$on(EVENT_OPEN_LIGHTBOX, function() {
                LightboxCtrl.open();
            });

            $scope.$on(EVENT_OWL_CHANGED, function(event, sliderValue) {
                LightboxCtrl.sliderValue = sliderValue - 1;
            });
        }
    });
})();;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxCampaignPromoTile', function() {
        CampaignPromoTileController.$inject = ['$scope', '$window', '$rootScope'];
        return {
            scope: true,
            restrict: 'A',
            controller: CampaignPromoTileController,
            controllerAs: 'cptc',
            bindToController: true,
            link: function(scope, element, attrs) {}
        };

        function CampaignPromoTileController($scope, $window, $rootScope) {
            var cptc = this;
            cptc.shiftPromoTilesUp = false;

            $scope.init = function() {
                $scope.showPromoTile = true;
            }


            $scope.toggleShow = function() {
                $scope.showPromoTile = !$scope.showPromoTile;
            }

            $scope.$on("shift-promo-tiles-up", function(evt, data) {
                cptc.shiftPromoTilesUp = data;
            });
        }

    });;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxCampaignRangeExplore', function() {
        CampaignRangeExploreController.$inject = ['$scope', '$window', '$rootScope', '$timeout'];
        return {
            scope: true,
            restrict: 'A',
            controller: CampaignRangeExploreController,
            controllerAs: 'crec',
            bindToController: true,
            link: function(scope, element, attrs) {
                scope.directiveElement = element;
                scope.initControl();
            }
        };

        function CampaignRangeExploreController($scope, $window, $rootScope, $timeout) {
            var crec = this;

            $scope.init = function(showSplashScreen) {
                $scope.showSplashScreen = showSplashScreen;
            }

            $scope.initControl = function() {
                $scope.showCampaignDetails = !$scope.showSplashScreen;
                $scope.blurOverlayImage = true;
                $scope.animationStarted = false;
                if ($scope.showSplashScreen) {
                    $('body').addClass("is-locked");
                }
            }

            $scope.attachActivateOnScroll = function() {
                //Wait before attaching, the window might still be anchor scrolling
                $timeout(function() {
                    $scope.scrollEvent();
                }, 300);
            }

            $scope.scrollEvent = function() {
                window.onscroll = function() {
                    if (!$scope.animationStarted) {
                        $scope.animationStarted = true;
                        $scope.closeOverlay();
                    }
                }
            }

            $scope.scrollIntoView = function(callback) {
                TweenLite.to(window, 0, {
                    scrollTo: 0,
                    onComplete: callback
                });
            }

            $scope.animationComplete = function() {
                $(".lx-campaign-range-explore__overlay-svg").hide();
                $(".lx-campaign-range-explore__centered").hide();
                $(".lx-campaign-range-explore__background").hide();
            }

            $scope.fadeoutText = function() {
                $(".lx-campaign-range-explore__overlay").hide();

                var tl = new TimelineLite();
                tl.delay(3);
                tl.to($(".lx-campaign-range-explore__centered"), 0.7, {
                    css: {
                        opacity: "0"
                    },
                    onComplete: $scope.animateSVGShowOffer
                });
                tl.play();
            }

            $scope.hideBackground = function() {
                var t = new TimelineLite();
                t.to($(".lx-campaign-range-explore__background"), 1, {
                    css: {
                        opacity: "0"
                    }
                });
                t.play();
            }

            $scope.animateSVGShowOffer = function() {
                $scope.scrollIntoView();
                $scope.hideBackground();

                $('body').removeClass("is-locked");

                var tl = new TimelineLite({
                    onComplete: $scope.animationComplete
                });
                tl.to("#Poly-1", 3, {
                        y: '200%'
                    }, "showOffer")
                    .to("#Poly-2", 3, {
                        y: '-200%'
                    }, "showOffer")
                    .to("#Poly-3", 3, {
                        x: '200%'
                    }, "showOffer")
                    .to("#Poly-4", 3, {
                        x: '-200%'
                    }, "showOffer")
                tl.play();

                $timeout(function() {
                    $rootScope.$broadcast('calculate-widths')
                }, 100);

            }

            $scope.closeOverlay = function() {
                var tl = new TimelineLite();
                tl.to($(".lx-campaign-range-explore__overlay-logo, .lx-campaign-range-explore__overlay-heading"), 1.2, {
                    css: {
                        top: "-5%",
                        opacity: "0"
                    }
                });
                tl.play();

                var tl2 = new TimelineLite();
                tl2.to($(".lx-campaign-range-explore__overlay-animation-outer"), 2, {
                    css: {
                        opacity: "0"
                    }
                });
                tl2.play();

                $scope.blurOverlayImage = false;

                var tl3 = new TimelineLite();
                tl3.to($(".lx-campaign-range-explore__overlay-svg"), 0.8, {
                    css: {
                        opacity: "0.9"
                    }
                });
                tl3.to($(".lx-campaign-range-explore__centered"), 0, {
                    css: {
                        transform: "translateY(15%)"
                    }
                });
                tl3.to($(".lx-campaign-range-explore__centered"), 1, {
                    css: {
                        transform: "translateY(0)",
                        opacity: "0.9"
                    },
                    onComplete: $scope.fadeoutText
                });
                tl3.play();
                $scope.showCampaignDetails = true;
            }
        }
    })
    .directive('lxCampaignRangeExploreMainImage', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var controls = attrs.controls || false,
                    _window = angular.element(window)

                function init() {
                    fullScreenResize();
                }

                function fullScreenResize() {
                    var imageHeight = _window.innerHeight();
                    element.height(imageHeight);
                }

                _window.resize(function() {
                    fullScreenResize();
                });

                _window.ready(function() {
                    init();
                });
            }
        };
    }])
    .directive('lxCampaignRangeExploreHero', ['$window', '$timeout', '$filter', '$http', '$location', '$rootScope', function($window, $timeout, $filter, $http, $location, $rootScope) {
        exploreCampaignRangeController.$inject = ['$scope', '$http', '$filter', '$timeout', '$window', '$interval', '$location'];
        return {
            scope: true,
            restrict: 'A',
            controller: exploreCampaignRangeController,
            controllerAs: 'er',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {}
        };


        function exploreCampaignRangeController($scope, $http, $filter, $timeout, $window, $interval, $location) {
            var er = this,
                _window = angular.element(window),
                _currentSize = 0,
                _newSize = 0,
                _sizeFilter = '',
                _panelBkg = angular.element('.lx-campaign-range-explore__image-panel').attr('data-background');

            $scope.resolvedImage = null;

            function init() {
                $scope.updateBackgroundImage();
                $scope.model = null;
                $scope.modelFullName = null;
            }


            $scope.previousVehicle = function() {
                $rootScope.$broadcast('change-previous-vehicle');
            }

            $scope.nextVehicle = function() {
                $rootScope.$broadcast('change-next-vehicle');
            }

            $scope.scrollTo = function(anchor) {
                TweenLite.to(window, 0.5, {
                    scrollTo: anchor,
                    ease: Power2.easeOut
                });
            }

            $rootScope.$on('change-active-vehicle', function(event, args) {
                $scope.er.activeVehicle = args;
                $scope.model = args.name;
                $scope.modelFullName = args.fullName;
                $scope.updateBackgroundImage(args.imageSrc);
                $scope.updateDisclaimer(args.disclaimer, args.disclaimerIsDarkStyle);
            });

            $scope.updateDisclaimer = function(text, isDarkStyle) {
                $(".lx-campaign-range-explore__info-content").text(text);
                $(".lx-campaign-range-explore__info-content").closest(".lx-campaign-range-explore__info-overlay").toggleClass("lx-campaign-range-explore--dark-tooltip", isDarkStyle);
            }

            $scope.updateModelTitle = function(model) {
                if (!model) {
                    return;
                }

                $scope.model = model.name;
                $scope.modelFullName = model.fullName;
            }

            $scope.updateBackgroundImage = function(imageSrc) {

                if (_window.width() <= Lexus.Breakpoint.ExtraExtraSmall) {
                    _newSize = Lexus.Breakpoint.ExtraExtraSmall;
                } else if (_window.width() <= Lexus.Breakpoint.ExtraSmall) {
                    _newSize = Lexus.Breakpoint.ExtraSmall;
                } else if (_window.width() <= Lexus.Breakpoint.Small) {
                    _newSize = Lexus.Breakpoint.Small;
                } else {
                    _newSize = Lexus.Breakpoint.Medium;
                }

                if (_currentSize != _newSize) {
                    _sizeFilter = '?q=95&w=' + _newSize;
                    _currentSize = _newSize;
                }

                if ($scope.resolvedImage != (imageSrc + _sizeFilter)) {
                    $scope.resolvedImage = imageSrc + _sizeFilter;

                }

            }

            _window.resize(function() {
                $scope.updateBackgroundImage($scope.er.activeVehicle.imageSrc);
            });


            $scope.init = function() {
                $scope.er = {
                    activeVehicle: {}
                };
            }

        }
    }])
    .directive('lxCampaignRangeExploreSlider', ['$window', '$timeout', '$filter', '$http', '$location', '$rootScope', 'UserPreferencesService', 'VehicleService', function($window, $timeout, $filter, $http, $location, $rootScope, UserPreferencesService, VehicleService) {
        exploreRangeSliderController.$inject = ['$scope', '$http', '$filter', '$timeout', '$window', '$interval', '$location', '$rootScope', 'UserPreferencesService', 'VehicleService'];
        return {
            scope: true,
            restrict: 'A',
            controller: exploreRangeSliderController,
            controllerAs: 'ers',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {

                var touchStartHandler = function(e) {
                    scope.slider.startClientX = e.changedTouches[0].screenX;
                }
                var touchMovetHandler = function(e) {
                    // reference first touch point for this event
                    var relativeScrolled_x = e.changedTouches[0].screenX - scope.slider.startClientX;
                    var idexesToFly = Math.ceil(Math.abs(relativeScrolled_x) / scope.itemWidth);
                    //scrolled right
                    if (relativeScrolled_x < 0) {
                        //scroll to next element
                        scope.slider.jumpToIndex = scope.carouselPos + idexesToFly <= scope.sliderItemCollection.length - 1 ?
                            scope.carouselPos + idexesToFly : scope.carouselPos;
                    }
                    //scrolled left
                    else {
                        //scroll to prev element
                        scope.slider.jumpToIndex = scope.carouselPos - idexesToFly >= 0 ? scope.carouselPos - idexesToFly : 0;
                    }
                }
                var touchEndHandler = function(e) {
                    if (scope.slider.jumpToIndex == null || (scope.slider.jumpToIndex == scope.carouselPos)) {
                        return;
                    }
                    scope.changeActiveVehicleIndex(scope.slider.jumpToIndex, true, true);
                }

                function clearTouchEvents() {
                    if (scope.carouselSlider[0].removeEventListener) {
                        scope.carouselSlider[0].removeEventListener('touchstart', touchStartHandler);
                        scope.carouselSlider[0].removeEventListener('touchmove', touchMovetHandler);
                        scope.carouselSlider[0].removeEventListener('touchend', touchEndHandler);
                    }
                }

                function addTouchEvents() {
                    clearTouchEvents();
                    if (scope.carouselSlider[0].addEventListener) {
                        scope.carouselSlider[0].addEventListener('touchstart', touchStartHandler, false);
                        scope.carouselSlider[0].addEventListener('touchmove', touchMovetHandler, false);
                        scope.carouselSlider[0].addEventListener('touchend', touchEndHandler, false);
                    }
                }

                $rootScope.$on('calculate-widths', function(event, args) {
                    scope.carouselSlider = element;
                    scope.activeMarker = element.find('.lx-campaign-range-explore__marker-js');
                    scope.$innerContainer = scope.carouselSlider.children().first('.lx-campaign-range-explore__subpanels');
                    scope.itemWidth = scope.$innerContainer.find('.lx-campaign-range-explore__subpanel').first().width();

                    scope.outerContainerWidth = scope.carouselSlider.width();
                    scope.maxScrollX = scope.$innerContainer.width() - scope.outerContainerWidth;
                    scope.slider = {
                        startClientX: undefined,
                        jumpToIndex: null,
                        smoothScrollonClick: false,
                    }

                    //use native swipe scrolling for touch devices, If its a laptop with touch and wide screen assume they are using K&M
                    if (!Modernizr.touchevents || angular.element($window).width() >= Lexus.Breakpoint.Medium) {
                        scope.carouselSlider.mousemove(function(event) {
                            scope.smoothScrollTo(event);
                        });
                        scope.carouselSlider.mouseleave(function(event) {
                            scope.smoothSnapToNearest(event);
                        });
                        clearTouchEvents();
                        scope.slider.smoothScrollonClick = false;
                    } else if (Modernizr.touchevents && angular.element($window).width() < Lexus.Breakpoint.Medium) {
                        addTouchEvents();
                        scope.slider.smoothScrollonClick = true;
                    }

                    angular.forEach(scope.$innerContainer.children('.lx-campaign-range-explore__subpanel'), function(value, key) {
                        value.className = value.className;
                    });
                    //scope.smoothSnapToNearest(event);
                });

                angular.element($window).bind('resize', function() {
                    $rootScope.$broadcast('calculate-widths');
                });

                scope.$on('$destroy', function() {
                    clearTouchEvents();
                });
            }
        }


        function exploreRangeSliderController($scope, $http, $filter, $timeout, $window, $interval, $location, $rootScope) {
            var ers = this;
            $scope.urlParameters = $location.search();

            $scope.init = function(overscrollPadding, markerRadius) {
                $scope.overscrollPadding = overscrollPadding;
                $scope.markerRadius = markerRadius;
                $scope.carouselTweenTime = 1;
                $scope.markerTweenTime = 1;
                $scope.easingFunction = Power2.easeOut;
                $scope.sliderItemCollection = [];
                var dataVehicle = UserPreferencesService.getLexusVehicle($scope.urlParameters);
                if (dataVehicle && dataVehicle.model) {
                    $scope.changeActiveVehicleIndex($scope.findIndexByModel(dataVehicle.model), true);
                }


                $rootScope.$on('change-previous-vehicle', function() {
                    var newIndex = $scope.carouselPos - 1 >= 0 ? $scope.carouselPos - 1 : $scope.sliderItemCollection.length - 1;
                    $scope.changeActiveVehicleIndex(newIndex, true);
                    $scope.smoothScrollToIndex(newIndex);
                });
                $rootScope.$on('change-next-vehicle', function() {
                    var newIndex = $scope.carouselPos + 1 <= $scope.sliderItemCollection.length - 1 ? $scope.carouselPos + 1 : 0;
                    $scope.changeActiveVehicleIndex(newIndex, true);
                    $scope.smoothScrollToIndex(newIndex);
                });
            }



            $scope.findIndexByModel = function(modelName) {
                var modelIndex = -1;
                if ($scope.sliderItemCollection && $scope.sliderItemCollection.length > 0 && modelName) {
                    modelIndex = $scope.sliderItemCollection.findIndex(function(m) {
                        return m.name.toLowerCase() === modelName.toLowerCase()
                    });
                }
                return (modelIndex == -1 ? 0 : modelIndex);
            }

            $scope.smoothScrollToIndex = function(index) {
                var left = $scope.itemWidth * index;
                left = Math.round(left + $scope.overscrollPadding + ($scope.itemWidth / 2) - ($scope.outerContainerWidth / 2));
                TweenLite.to($scope.carouselSlider, $scope.carouselTweenTime, {
                    scrollTo: {
                        x: (left)
                    },
                    ease: $scope.easingFunction
                });
                $rootScope.$broadcast('pause-smooth-scroll-to', '');
            }

            $rootScope.$on('pause-smooth-scroll-to', function(event, args) {
                $rootScope.pauseSmoothScrollTo = true;
                setTimeout(function() {
                    $rootScope.pauseSmoothScrollTo = false;
                }, 1500);
            });

            $scope.smoothScrollTo = function(event) {
                if ($rootScope.pauseSmoothScrollTo === true) {
                    return;
                }
                var offsetX = $scope.carouselSlider.position().left;
                var posInPc = (event.clientX - offsetX) / $scope.outerContainerWidth;
                $scope.carouselPos = $scope.maxScrollX * posInPc;
                TweenLite.to($scope.carouselSlider, $scope.carouselTweenTime, {
                    scrollTo: {
                        x: ($scope.carouselPos)
                    },
                    ease: $scope.easingFunction
                });
            }

            $scope.smoothSnapToNearest = function(event) {
                var offset = $scope.overscrollPadding;
                var snapWidth = $scope.itemWidth;

                var misalignment = ($scope.carouselPos % snapWidth) - offset;
                var previousSnapPoint = $scope.carouselPos - misalignment;
                var nextSnapPoint = $scope.carouselPos - misalignment + snapWidth;

                if (misalignment === 0) {
                    return;
                } else if (misalignment < (snapWidth / 2)) {
                    TweenLite.to($scope.carouselSlider, $scope.carouselTweenTime, {
                        scrollTo: {
                            x: previousSnapPoint
                        },
                        ease: $scope.easingFunction
                    });
                } else {
                    TweenLite.to($scope.carouselSlider, $scope.carouselTweenTime, {
                        scrollTo: {
                            x: nextSnapPoint
                        },
                        ease: $scope.easingFunction
                    });
                }
            }

            $scope.setMarkerPosition = function(failCount) {
                var i = failCount || 0;
                if (!$scope.activeMarker && i < 10) {
                    setTimeout(function() {
                        $scope.setMarkerPosition(i + 1);
                    }, 100);
                    return;
                }
                var newPosition = Math.round($scope.overscrollPadding + ($scope.carouselPos * $scope.itemWidth) + ($scope.itemWidth * 0.5) - $scope.markerRadius);
                $scope.activeMarker.css('left', newPosition + 'px');
                //why? $scope.smoothScrollToIndex($scope.carouselPos);
            }

            $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                $scope.sliderItemCollection[0].style = {
                    "margin-left": $scope.overscrollPadding + "px"
                };
                $scope.sliderItemCollection[$scope.sliderItemCollection.length - 1].style = {
                    "margin-right": $scope.overscrollPadding + "px"
                };
                $timeout(function() {
                    $rootScope.$broadcast('calculate-widths')
                }, 100);
                $scope.setMarkerPosition();

                var dataVehicle = UserPreferencesService.getLexusVehicle($scope.urlParameters);
                if (dataVehicle && dataVehicle.model) {
                    $scope.changeActiveVehicleIndex($scope.findIndexByModel(dataVehicle.model), true);
                }

            });

            this.addSliderItem = function(data) {
                $scope.sliderItemCollection[data.index] = data;
                $scope.sliderItemCollection[data.index].disabled = false;
                $scope.sliderItemCollection[data.index].style = {};
                if (data.init) {
                    $scope.carouselPos = parseInt(data.index);
                    $scope.sliderItemCollection[data.index].active = true;
                    $timeout(function() {
                        $rootScope.$broadcast('change-active-vehicle', data)
                    }, 100);
                } else {
                    $scope.sliderItemCollection[data.index].active = false;
                }
            }

            $rootScope.$on('campaign-vehicle-preference-change', function(event, args) {
                if (args) {
                    var vehicleIndex = $scope.findIndexByModel(args.model);
                    if (vehicleIndex >= 0) {
                        $scope.changeActiveVehicleIndex(vehicleIndex, false);
                    }
                }

            });

            $scope.changeActiveVehicleIndex = function(index, broadcastChange, smoothScroll) {
                if ($scope.sliderItemCollection.length > 0) {

                    $scope.carouselPos = index;
                    angular.forEach($scope.sliderItemCollection, function(value, key) {
                        value.active = (key == index);
                    });
                    $scope.setMarkerPosition();
                    var newVehicle = $scope.sliderItemCollection[index];

                    $scope.updateBackgroundImage(newVehicle.imageSrc);
                    $scope.updateModelTitle(newVehicle);

                    if (broadcastChange) {
                        $scope.updateCookieAlertOthers(newVehicle);
                    }

                    if (smoothScroll || ($scope.slider && $scope.slider.smoothScrollonClick)) {
                        $scope.smoothScrollToIndex(index);
                    }

                }
            }

            $scope.updateCookieAlertOthers = function(newVehicle) {

                $timeout(function() {
                    $rootScope.$broadcast('change-active-vehicle', newVehicle)
                }, 100);

                $rootScope.$broadcast('campaign-vehicle-preference-change', {
                    model: newVehicle.name,
                    grade: undefined,
                    engineVariant: undefined,
                    enhancementPack: undefined
                });

            }



            $rootScope.$on('filter-body-type', function(event, args) {
                var newActiveIndex = 0;
                var needtoApplyNewIndex = false;
                angular.forEach($scope.sliderItemCollection, function(value, key) {
                    var isDisabled = !(args == 'all' || args == value.bodyType);
                    value.disabled = isDisabled;
                    if (isDisabled && value.active) {
                        value.active = false;
                        needtoApplyNewIndex = true;
                    }
                });
                if (needtoApplyNewIndex) {
                    var keepGoing = true;
                    angular.forEach($scope.sliderItemCollection, function(value, key) {
                        if (keepGoing) {
                            if (!value.disabled) {
                                value.active = true;
                                $scope.smoothScrollToIndex(key);
                                keepGoing = false;
                                $timeout(function() {
                                    $rootScope.$broadcast('change-active-vehicle', value);
                                    $scope.changeActiveVehicleIndex(value.index);
                                }, 100);
                            }
                        }
                    });
                }
            });


        }
    }])
    .directive('lxCampaignRangeExploreSliderItem', ['$window', '$timeout', '$filter', '$http', '$location', '$rootScope', function($window, $timeout, $filter, $http, $location, $rootScope) {
        return {
            scope: true,
            restrict: 'AE',
            require: '^lxCampaignRangeExploreSlider',
            link: function(scope, element, attrs, exploreRangeSliderController) {
                exploreRangeSliderController.addSliderItem(attrs);
            }
        }


    }]);

;
(function(undefined) {

    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .directive('lxCampaignModelRangeEngineVariant', CampaignModelRangeEngineVariantDirective);

    CampaignModelRangeEngineVariantDirective.$inject = ['$location', '$rootScope', 'UserPreferencesService'];

    function CampaignModelRangeEngineVariantDirective($location, $rootScope, UserPreferencesService) {

        var engineVariants = null;
        var modelRange = null;
        var buildAndPriceUrl = null;
        var gradeName = null;
        campaignModelRangeEngineVariantController.$inject = ['$scope', '$window', 'VehicleService', 'BuildPriceService', 'UserPreferencesService'];
        return {
            scope: true,
            restrict: 'A',
            controller: campaignModelRangeEngineVariantController,
            link: link
        };

        function link(scope, element, attrs) {
            engineVariants = angular.fromJson(attrs.engineVariants);
            buildAndPriceUrl = attrs.buildAndPriceUrl;
            gradeName = attrs.gradeName;

            for (var index = 0; index < engineVariants.length; index++) {
                engineVariants[index].selected = false;
            }

            var dataVehicle = UserPreferencesService.getLexusVehicle($location.search());

            if (dataVehicle) {
                var variant = null;
                var foundVariant = null;
                var variantIndex = null;

                for (var index = 0; index < engineVariants.length; index++) {
                    if (engineVariants[index].model === dataVehicle.model) {
                        variant = engineVariants[index];
                        foundVariant = variant.engineVariant;
                        break;
                    }
                }

                if (foundVariant) {
                    variantIndex = scope.selectVariant(variant.engineVariant, variant.gradeId, variant.variantId, variant.enhancementPack);
                } else {
                    variantIndex = scope.selectVariant(engineVariants[0].engineVariant, engineVariants[0].gradeId, engineVariants[0].variantId, engineVariants[0].enhancementPack);
                }
            } else {
                variantIndex = scope.selectVariant(engineVariants[0].engineVariant, engineVariants[0].gradeId, engineVariants[0].variantId, engineVariants[0].enhancementPack);
            }

            if (variantIndex != null) {
                scope.setModelName(engineVariants[variantIndex].model, engineVariants[variantIndex].engineVariant);
            }
        }

        function campaignModelRangeEngineVariantController($scope, $window, VehicleService, BuildPriceService, UserPreferencesService) {

            $scope.variantName = "";
            $scope.gradeId = "";
            $scope.variantId = "";
            $scope.enhancementPack = "";

            $scope.selectVariant = function(variantName, gradeId, variantId, enhancementPack) {
                var selectedIndex = null;
                for (var index = 0; index < engineVariants.length; index++) {
                    if (engineVariants[index].engineVariant === variantName) {
                        engineVariants[index].selected = true;

                        selectedIndex = index;
                        $rootScope.$broadcast('vehicle-preference-change', {
                            model: engineVariants[index].model,
                            engineVariant: engineVariants[index].engineVariant,
                            grade: engineVariants[index].grade,
                        });
                    } else {
                        engineVariants[index].selected = false;
                    }
                }
                $scope.variantName = variantName;
                $scope.gradeId = gradeId;
                $scope.variantId = variantId;
                $scope.enhancementPack = enhancementPack;

                $rootScope.$broadcast('broadcast.lazyLoadRevalidate');
                return selectedIndex;
            }

            $scope.isSelected = function(variantName) {
                for (var index = 0; index < engineVariants.length; index++) {
                    if (engineVariants[index].engineVariant === variantName) {
                        return engineVariants[index].selected;
                    }
                }
            }

            $scope.isModelSelected = function(modelName) {
                return $scope.modelName === modelName;
            }

            $scope.setModelName = function(modelName, variantName) {
                $scope.modelName = modelName;
                $scope.variantName = variantName;

                if (variantName && !$scope.isSelected(variantName)) {
                    $scope.selectVariant(variantName, $scope.gradeId, $scope.variantId, $scope.enhancementPack);
                }
            }

            $scope.displayTab = function(modelName) {
                return modelName == $scope.modelName;
            }

            $scope.buildLink = function() {
                var trim = null;
                var paint = null;

                var dataVisitor = UserPreferencesService.getLexusVisitor($location.search());
                var postCode = dataVisitor ? dataVisitor.postCode : "3000";

                VehicleService.getTrims($scope.gradeId, $scope.variantId).then(function success(response) {
                    if (response.data.length == 0) {
                        console.info('getTrims received 0 results for ' + $scope.variantName + ' with grade ID ' + $scope.gradeId);
                    }

                    var availableTrims = response.data;
                    if (availableTrims && availableTrims.length > 0) {
                        trim = availableTrims[0];

                        VehicleService.getPaints($scope.gradeId, $scope.variantId, trim.id).then(function success(response) {
                            if (response.data.length == 0) {
                                console.info('getPaints received 0 results for ' + $scope.variantName + ' with grade ID ' + $scope.gradeId + ' and trim Id ' + trim.id);
                            }

                            var paints = response.data;

                            if (paints && paints.length > 0) {

                                paint = paints[0];

                                var vehicle = {
                                    carmodel: $scope.modelName,
                                    engineVariant: $scope.variantName,
                                    grade: gradeName,
                                    postcode: postCode,
                                    enhancementPack: $scope.enhancementPack,
                                    colour: paint.uriName,
                                    trim: trim.uriName
                                };

                                var url = buildAndPriceUrl ? buildAndPriceUrl + '/' + BuildPriceService.getBuildPriceLink(vehicle, 2) : '';
                                if (url) {
                                    $window.location.href = url;
                                }
                            }

                        }, function error(response) {
                            console.error('getTrims returned an error');
                        });

                    }

                }, function error(response) {
                    console.error('getTrims returned an error');
                });
            }
        }
    }
}());

;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxContentGallery', [function() { // Lazy load images.
        return {
            scope: {
                'parentAccordionPanelId': '@'
            },
            restrict: 'A',
            link: function(scope, element, attrs) {
                var controls = attrs.controls || false,
                    _window = angular.element(window),
                    _allImages = element.find('.lx-content-gallery__slide'),
                    breakpointSrc = 'src-lg',
                    reassignSources = true,
                    oldBreakpointSrc,
                    breakpointHeightAdjust = Lexus.Breakpoint.Small,
                    bxSlider;

                function init() {
                    imageSrc();
                    initSlider();

                    scope.$on('broadcast.contentGalleryReload', function(event, args) {
                        if (args.targetId.toString() !== scope.parentAccordionPanelId) {
                            return;
                        }
                        bxSlider.reloadSlider();
                    });
                }

                function imageSrc() {
                    if ((reassignSources || breakpointSrc == 'src') && _window.width() > breakpointHeightAdjust) {
                        breakpointSrc = 'src-lg';
                        reassignSrc();
                    } else if ((reassignSources || breakpointSrc == 'src-lg') && _window.width() <= breakpointHeightAdjust) {
                        breakpointSrc = 'src';
                        reassignSrc();
                    }
                    reassignSources = false;
                }

                function reassignSrc() {
                    $(_allImages).each(function() {
                        var $img = $(this).find('img');
                        $img.attr('src', null).attr('src', $img.attr('data-' + breakpointSrc));
                        var a = 1;
                    });
                }

                // Load bxslider.
                function initSlider() {

                    bxSlider = element.bxSlider({
                        mode: 'fade',
                        slideMargin: 0,
                        captions: true,
                        auto: false,
                        pause: 5000,
                        pager: false,
                        autoHover: true,
                        nextText: '',
                        prevText: '',
                        //controls: controls,
                        adaptiveHeight: true,
                        onSliderLoad: function(currentIndex) {},
                        onSlideBefore: function() {},
                        onSlideAfter: function($slideElement, oldIndex, newIndex) {

                        }
                    });
                }


                _window.resize(function() {

                });

                _window.ready(function() {
                    init();
                });
            }
        };
    }]);;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxContentVideo', ['$rootScope', '$window', function($rootScope, $window) {
        contentVideoController.$inject = ['$scope', '$rootScope'];
        return {
            scope: true,
            restrict: 'A',
            controller: contentVideoController,
            controllerAs: 'cv',
            bindToController: true,
            link: function(scope, element, attrs) {

                if ((attrs.autoplay || '').toLowerCase() === 'true') {
                    embedVideo(scope, element, attrs, element[0]);
                } else {
                    element.on('click', function(event) {
                        embedVideo(scope, element, attrs, event.currentTarget);
                    });
                }

                angular.element($window).bind('resize', function() {
                    scope.$broadcast('content-video-window-resize');
                });

                function embedVideo(scope, element, attrs, targetElement) {
                    if (!attrs['data-playing']) {
                        var aspect = attrs.width / attrs.height;
                        var muted = ((attrs.muted || '').toLowerCase() === 'true') ? 'true' : 'false';
                        targetElement.innerHTML = '<iframe src="//www.youtube.com/embed/' + attrs.id + '?modestbranding=1&autoplay=1&mute=' + muted + '&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=1&rel=0" frameborder="0" class="lx-video__inner-iframe" width="' + attrs.width + '" widthOriginal="' + attrs.width + '" height="' + attrs.height + '" aspect="' + aspect + '" allowfullscreen="allowfullscreen"></iframe>';
                        attrs.$set('data-playing', true);
                        resize(element);
                        //Can only wire up the resize listener when the iframe is injected
                        scope.$on('content-video-window-resize', function(event, args) {
                            resize(element);
                        });
                    }
                }

                function resize(myElement) {
                    var iframe = myElement.find('iframe');
                    if (iframe[0].attributes.widthOriginal.value >= myElement[0].clientWidth) {
                        iframe[0].width = myElement[0].clientWidth;
                        iframe[0].height = myElement[0].clientWidth / iframe[0].attributes.aspect.value;
                    }
                }
            }
        };

        function contentVideoController($scope, $rootScope) {
            var cv = this;
            $scope.init = function() {

            }
        }

    }]);;
"use strict";
/* Directives */
angular.module("Lexus.Directives").directive("lxDealerLookup", [
    "$rootScope",
    "DealersService",
    "AddressSuggestService",
    "UserPreferencesService",
    function() {
        DealerLookupController.$inject = [
            "$scope",
            "$rootScope",
            "$http",
            "DealersService",
            "AddressSuggestService",
            "UserPreferencesService",
        ];
        return {
            scope: true,
            restrict: "A",
            controller: DealerLookupController,
            controllerAs: "dlc",
            bindToController: true,
            link: function(scope, element, attrs) {
                scope.$on("clear-dealer-search-input", function() {
                    element.find("tags-input input")[0].value = "";
                });
            },
        };

        function DealerLookupController(
            $scope,
            $rootScope,
            $http,
            DealersService,
            AddressSuggestService,
            UserPreferencesService,
        ) {
            var dlc = this;
            var userPreferencesService = UserPreferencesService;

            $scope.init = function(salesClosedDealers, serviceClosedDealers) {
                $scope.tags = [];
                $scope.tagsLoading = false;
                $scope.salesClosedDealers = salesClosedDealers;
                $scope.serviceClosedDealers = serviceClosedDealers;

                $scope.ds = {
                    tags: [],
                    type: "Sales",
                    results: null,
                    loading: false,
                };

                var visitorPreference = userPreferencesService.getLexusVisitor();
                var dealerPreference = userPreferencesService.getLexusDealer();

                if (visitorPreference && visitorPreference.postCode && visitorPreference.suburb) {
                    $scope.ds.tags.push({
                        text: visitorPreference.suburb + " " + visitorPreference.postCode,
                        data: {
                            postCode: visitorPreference.postCode,
                            suburb: visitorPreference.suburb,
                        },
                    });

                    $scope.searchNow();
                }

                $scope.preferredDealer =
                    dealerPreference &&
                    dealerPreference.dealerID &&
                    dealerPreference.branchCode &&
                    dealerPreference.dealerName &&
                    dealerPreference.dealerUrl ?
                    {
                        id: dealerPreference.dealerID,

                        branchCode: dealerPreference.branchCode,
                        name: dealerPreference.dealerName,
                        url: dealerPreference.dealerUrl,
                    } :
                    {};
            };

            $scope.ChangeDealerType = function(type) {
                $scope.ds.type = type;
                if ($scope.ds.tags.length) {
                    $scope.searchNow();
                    $scope.updatePreferredDealer();
                }
            };

            $scope.updatePreferredDealer = function() {
                $rootScope.$broadcast("preferred-dealer-change", {
                    dealerID: $scope.preferredDealer.id,
                    dealerCodeSimple: $scope.preferredDealer.dealerCodeSimple,
                    branchCode: $scope.preferredDealer.branchCode,
                    dealerName: $scope.preferredDealer.name,
                    dealerType: $scope.ds.type,
                    dealerUrl: $scope.preferredDealer.url,
                    dealerState: $scope.preferredDealer.state,
                });
            };

            $scope.dealerSearch = function($tag) {
                $scope.ds.tags = [];
                $scope.ds.tags[0] = $tag;
                $scope.searchNow();
            };

            $scope.checkServiceType = function(result) {
                var serviceString = $scope.ds.type;
                if (typeof result == "string") {
                    serviceString = result;
                } else if (typeof result == "object" && result != null) {
                    serviceString = result.serviceType;
                }

                return serviceString.toLowerCase().match(/^service$/) ? true : false;
            };

            $scope.modifyResults = function(data) {
                if (data != null) {
                    var newData = data.filter(function(d) {
                        return (
                            ($scope.ds.type === "Sales" && !$scope.salesClosedDealers.includes(d.dealerCode)) ||
                            ($scope.ds.type !== "Sales" && !$scope.serviceClosedDealers.includes(d.dealerCode))
                        );
                    });
                    for (var r = 0, rLen = newData.length; r < rLen; r++) {
                        if (newData[r].serviceOnly != null) {
                            newData[r].serviceOnly = $scope.checkServiceType(data);
                        }

                        if ($scope.ds.type === "Sales" && $scope.serviceClosedDealers.includes(newData[r].dealerCode)) {
                            newData[r].serviceType = "Sales";
                        }

                        if ($scope.ds.type === "Service" && $scope.salesClosedDealers.includes(newData[r].dealerCode)) {
                            newData[r].serviceType = "Service";
                        }
                    }

                    return newData;
                }
            };

            $scope.searchNow = function() {
                $scope.ds.loading = true;
                $rootScope.$broadcast("visitor-details-change-autocomplete", $scope.ds.tags[0].data);

                DealersService.setParam("postCode", $scope.ds.tags[0].data.postCode);
                DealersService.setParam("suburb", $scope.ds.tags[0].data.suburb);
                DealersService.setParam("type", $scope.ds.type);

                DealersService.GetResults().then(
                    function(data) {
                        $scope.ds.results = $scope.modifyResults(data.Data);
                        $scope.ds.loading = false;
                        $scope.ds.showChangeDealer = false;

                        if (typeof window !== "undefined") {
                            window.document.body.dispatchEvent(new CustomEvent("find-a-dealer-search"));
                        }
                    },
                    function(error) {
                        console.log(error);
                    },
                );
            };

            $scope.clearSearch = function() {
                $scope.$broadcast("clear-dealer-search-input");
                $scope.ds.tags = [];
            };

            $scope.setPreferredDealer = function(dealer, address, preferredDealer) {
                var allreadyChecked = dealer.dealerCode === preferredDealer.id;
                if (allreadyChecked) {
                    $scope.preferredDealer.id = null;
                    $scope.preferredDealer.branchCode = null;
                    $scope.preferredDealer.dealerCodeSimple = null;
                    $scope.preferredDealer.name = null;
                    $scope.preferredDealer.url = null;
                    $scope.preferredDealer.state = null;
                } else {
                    $scope.preferredDealer.id = dealer.dealerCode;
                    $scope.preferredDealer.branchCode = address.branchCode;
                    $scope.preferredDealer.dealerCodeSimple = dealer.dealerCodeSimple;
                    $scope.preferredDealer.name = dealer.dealerName;
                    $scope.preferredDealer.url = dealer.dealerUrl || address.webSite;
                    $scope.preferredDealer.state = address.state;
                }
                $scope.updatePreferredDealer();
            };

            $scope.loadTags = function(query) {
                $scope.tagsLoading = true;
                AddressSuggestService.setParam("term", query);
                return AddressSuggestService.GetResults($scope.tagsLoaded);
            };

            $scope.tagsLoaded = function() {
                $scope.tagsLoading = false;
            };

            $scope.autocompleteLoading = function() {
                return $scope.tagsLoading;
            };
        }
    },
]);;
'use strict';

angular.module('Lexus.Directives')
    .directive('lxFadeIn', ['$window', '$timeout', '$filter', '$http', '$analytics', function($window, $timeout, $filter, $http, $analytics) {
        return {
            scope: true,
            restrict: 'A',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {

                var helpers = {};
                helpers.now = Date.now || function() {
                    return new Date().getTime();
                };
                helpers.debounce = function(func, wait, immediate) {
                    var timeout, args, context, timestamp, result;

                    var later = function() {
                        var last = helpers.now() - timestamp;

                        if (last < wait && last >= 0) {
                            timeout = setTimeout(later, wait - last);
                        } else {
                            timeout = null;
                            if (!immediate) {
                                result = func.apply(context, args);
                                if (!timeout) context = args = null;
                            }
                        }
                    };

                    return function() {
                        context = this;
                        args = arguments;
                        timestamp = helpers.now();
                        var callNow = immediate && !timeout;
                        if (!timeout) timeout = setTimeout(later, wait);
                        if (callNow) {
                            result = func.apply(context, args);
                            context = args = null;
                        }

                        return result;
                    };
                };
                helpers.throttle = function(func, wait) {
                    var context, args, timeout, throttling, more, result;
                    var whenDone = helpers.debounce(function() {
                        more = throttling = false;
                    }, wait);
                    return function() {
                        context = this;
                        args = arguments;
                        var later = function() {
                            timeout = null;
                            if (more) func.apply(context, args);
                            whenDone();
                        };
                        if (!timeout) timeout = setTimeout(later, wait);
                        if (throttling) {
                            more = true;
                        } else {
                            result = func.apply(context, args);
                        }
                        whenDone();
                        throttling = true;
                        return result;
                    };
                };

                if (window.Element && !Element.prototype.closest) {
                    Element.prototype.closest =
                        function(s) {
                            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                                i,
                                el = this;
                            do {
                                i = matches.length;
                                while (--i >= 0 && matches.item(i) !== el) {};
                            } while ((i < 0) && (el = el.parentElement));
                            return el;
                        };
                }

                var appearClass = 'lx-appear';
                var disappeaerClass = 'lx-disappeared';
                var includeEls = 'h1,h2,h3,h4,h5,h6,p,li,a[class*=cta],button[class*=cta],[class*=button],[class*=btn]';
                var excludeEls = '.lx-footer,.lx-footer-sticky,.lx-b-nav,.lx-c-nav,.lx-save-build-price__slideouttray,.lx-postcode-slideout';

                var transitionEls = element.find(includeEls);
                transitionEls.each(function(index, el) {
                    if (!el.closest(excludeEls)) {
                        angular.element(el).addClass(appearClass);
                        angular.element(el).addClass(disappeaerClass);
                    }
                });

                var appear = function() {
                    var forceAppear = arguments ? arguments[0] : false;
                    var topEdge = $window.pageYOffset,
                        clientHeight = $window.innerHeight,
                        fullHeight = topEdge + clientHeight;
                    if (topEdge > 100 || forceAppear) {
                        transitionEls.each(function(index, el) {
                            if (angular.element(el).offset().top < fullHeight) {
                                angular.element(el).removeClass(disappeaerClass);
                                setTimeout(function() {
                                    angular.element(el).removeClass(appearClass)
                                }, 500);
                            }
                        });
                    }
                }

                angular.element($window).bind("scroll", helpers.throttle(appear, 50));


                angular.element(document).ready(function() {
                    setTimeout(function() {
                        appear(true)
                    }, 500);
                });

            }
        }


    }]);

;

"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxFeatureTiles', [function() {
        featureTilesController.$inject = ['$scope', '$compile', '$window', '$rootScope'];
        return {
            scope: true,
            restrict: 'A',
            controller: featureTilesController,
            controllerAs: 'ft',
            bindToController: true,
            link: function(scope, element, attrs) {
                scope.ft.panels = [];
                var panelCollection = element.find(scope.ft.section),
                    imageCollection = element.find(scope.ft.section + ' img'),
                    history = [],
                    resizeTimer,
                    imageLoaded = 0;

                function loadSection(list, scopeList) {
                    if (scopeList.length === 0) {
                        angular.forEach(list, function(value, key) {
                            scopeList[key] = {
                                isLong: (value.offsetHeight > scope.ft.sectionHeight),
                                isOpen: false,
                                content: value.innerHTML
                            }
                        });
                    } else {
                        angular.forEach(list, function(value, key) {
                            if (!scopeList[key].isLong) {
                                scopeList[key].isLong =
                                    (value.offsetHeight > scope.ft.sectionHeight);
                            }
                        });
                    }
                }

                loadSection(panelCollection, scope.ft.panels);

                for (var i = 0; i < imageCollection.length; i++) {
                    (function(i) {
                        imageCollection[i].addEventListener('load', function() {
                            imageLoaded++
                            if (imageLoaded === imageCollection.length) { // after all image loaded reload section class
                                loadSection(panelCollection, scope.ft.panels);
                                scope.$digest();
                            }
                        })
                    })(i);
                }

                window.addEventListener('resize', function() {
                    clearTimeout(resizeTimer); // reduce flash
                    resizeTimer = setTimeout(function() {
                        loadSection(panelCollection, scope.ft.panels);
                        scope.$digest();
                    }, 50);
                });
            }
        };

        function featureTilesController($scope, $compile, $window, $rootScope) {
            var ft = this;

            $scope.init = function() {
                ft.modalWrapper = [
                    '<div class="lx-feature-tiles__section is-in-modal">',
                    '</div>'
                ];
                ft.section = '.lx-feature-tiles__section';
                ft.sectionHeight = '600';
                ft.breakpoint = Lexus.Breakpoint.ExtraSmall;
            }

            $scope.featureBtn = function(i) {
                if (window.innerWidth >= ft.breakpoint) {
                    $scope.loadModal(ft.panels[i].content);
                } else {
                    $scope.ft.panels[i].isOpen = !$scope.ft.panels[i].isOpen;
                }
            }

            $scope.loadModal = function(content) {
                $rootScope.$broadcast('open-modal-window', {
                    content: content,
                    wrapper: ft.modalWrapper
                });
            };
        }
    }]);;
"use strict";
angular.module('Lexus.Directives')
    .directive("lxFixedFirstColumn", [function() {
        function init($scope, $element) {
            var interval = setInterval(function() {
                var tr = $element.find("tr");
                angular.forEach(tr, function(i) {
                    var columns = angular.element(i).children();

                    if (columns.length < 1) {
                        // Row with no columns? Ignore it.
                        return;
                    }
                    if (columns.length === 2) {
                        // Row with no columns? Ignore it.
                        $element.find(".lx-responsive-table-viewport").css('overflow-x', 'hidden');
                    }
                    var column0 = angular.element(columns[0]).children()[0] || columns[0];
                    var column1 = columns[1];

                    // reset height styles (if any) so we can measure the "natural" height of these <td>s
                    columns[0].style.height = "";
                    if (column1) {
                        columns[1].style.height = "";
                    }

                    // Calculate heights of each <td>.
                    var height0 = (column0).offsetHeight;
                    var height1 = column1 ? column1.offsetHeight : 0;

                    // Calculate final height.
                    var height = Math.max(height0, height1);

                    // Set heights of <td> and <tr>.
                    columns[0].style.height = height + "px";
                    i.style.height = height + "px";

                    if (column1) {
                        column1.style.height = height + "px";
                    }

                    // If <td> heights have stabilized.
                    if (height0 !== 0 && height0 === height1) {
                        clearInterval(interval);
                    }
                });
            }, 0);
        }

        return {
            restrict: "A",
            template: "<div class='lx-responsive-table-viewport'><div ng-transclude></div></div>",
            transclude: true,
            link: function($scope, $element) {
                init($scope, $element);

                var resizeHandler = function() {
                    init($scope, $element);
                };

                $(window).on('resize', resizeHandler);

                $scope.$on('$destroy', function() {
                    $(window).off('resize', resizeHandler);
                });
            }
        };

    }]);;

"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxFormFieldCarModelEngineVariantWithGrade', [function() {

        formFieldController.$inject = ['$scope', '$rootScope', 'UserPreferencesService', 'VehicleService', '$filter', '$element', "$log"];
        return {
            scope: true,
            restrict: 'A',
            controller: formFieldController,
            controllerAs: 'form',
            bindToController: true,
            link: function(scope, element, attrs) {
                scope.vehicleIndex = attrs.vehicleIndex || "0";
            }
        };

        function formFieldController($scope, $rootScope, UserPreferencesService, VehicleService, $filter, $element, $log) {
            var form = this;

            $scope.init = function() {
                $scope.ffc = $scope.ffc || {};
                $scope.ffc.formfields = {
                    data: {
                        enginevariants: [],
                        enhancementPacks: []
                    },
                    comingSoonModels: {}
                };
            }

            function getGradeVariantLabel(engineVariant, grade) {
                return engineVariant.name + ' ' + $filter('replaceCaseInsensitive')(grade.name, engineVariant.name);
            }

            //sorry, this is also hardcoded in forms-finance-calculator.js
            function getGradeVariantKey(engineVariant, grade) {
                return engineVariant.name + ';' + grade.name;
            }

            function getVariantAndGradeFromKey(key) {
                if (key) {
                    var values = key.split(';');
                    if (values.length === 2) {
                        return {
                            engineVariant: values[0],
                            grade: values[1]
                        };
                    }
                }
            }

            function bindEnhancementPacks() {
                if ($scope.ffc.formfields.data.enginevariantsandgrades) {
                    var engineVariantAndGrade = $scope.ffc.formfields.data.enginevariantsandgrades.find(function(item) {
                        return $scope.ffc.form.data.engineVariantAndGrade == item.key;
                    });

                    if (engineVariantAndGrade) {
                        var selectedGradeId = engineVariantAndGrade.gradeId;
                        $scope.ffc.form.data.loadingEnhancementPacks = true;
                        VehicleService.getVariants(selectedGradeId)
                            .then(function(response) {
                                $scope.ffc.form.data.loadingEnhancementPacks = false;
                                if (response.status === "Success") {
                                    $scope.ffc.formfields.data.enhancementPacks = response.data;

                                    if ($scope.ffc.form.data.engineVariantAndGrade == null) {
                                        $scope.ffc.formfields.data.enhancementPacks = null;
                                    }

                                    if ($scope.ffc.form.data.enhancementPack && $scope.ffc.form.data.enhancementPack !== "") {
                                        var enhancementPackFound = $scope.ffc.formfields.data.enhancementPacks.find(function(item) {
                                            return $scope.ffc.form.data.enhancementPack == item.uriName;
                                        });

                                        if (!enhancementPackFound) {
                                            $log.warn("resetting enhancement pack1");
                                            $scope.ffc.form.data.enhancementPack = $scope.ffc.formfields.data.enhancementPacks[0].uriName;
                                        }
                                    } else {
                                        $log.warn("resetting enhancement pack2");
                                        $scope.ffc.form.data.enhancementPack = $scope.ffc.formfields.data.enhancementPacks[0].uriName;
                                    }
                                }
                            });
                    }
                }
            }

            //At time of model change
            $scope.bindEngineVariants1 = function() {
                VehicleService.getVehiclesOverview().then(function success(response) {
                    var myModel;
                    response.data.find(function(bodyType) {
                        bodyType.models.find(function(model) {
                            if ($scope.ffc.form.data.carmodel == model.name) {
                                myModel = model;
                                return;
                            }
                        });
                        return;
                    });

                    VehicleService.getEngineVariantsWithGrades(myModel.id)
                        .then(function success(response) {
                            if (response.status === "Success") {
                                $scope.ffc.formfields.data.enginevariantsandgrades = [];
                                var isPresent = false;
                                response.data.forEach(function(engineVariant) {
                                    engineVariant.grades.forEach(function(grade) {
                                        $scope.ffc.formfields.data.enginevariantsandgrades.push({
                                            engineVariant: engineVariant.name,
                                            grade: grade.name,
                                            gradeId: grade.id,
                                            mdmGradeId: grade.gradeID,
                                            label: getGradeVariantLabel(engineVariant, grade),
                                            key: getGradeVariantKey(engineVariant, grade)
                                        });
                                        if (getGradeVariantKey(engineVariant, grade) == $scope.ffc.form.data.engineVariantAndGrade) {
                                            isPresent = true;
                                        }
                                    });
                                });

                                if (!isPresent) {
                                    $scope.ffc.form.data.engineVariantAndGrade = null;
                                    $scope.ffc.formfields.data.enhancementPacks = null;
                                }

                                //Can only bind Enhancement packs after they have been returned on bootup
                                bindEnhancementPacks();
                            }
                        })
                        .then(function failure(response) {});

                }).then(function failure(response) {});

            };

            $rootScope.$on('field-car-model-engine-variant-update-selected', function(event, data) {
                //Forms Have a UniqueVehicle Index , if not it defaults to one vehicle with index 0
                if (!data || (data && data.vehicleIndex && (data.vehicleIndex == $scope.vehicleIndex))) {
                    $scope.updateModelSelection(true);
                }
            });

            $rootScope.$on('field-car-model-engine-variant-update-without-reset', function() {
                $scope.updateModelSelection(false);
            });

            $rootScope.$on('field-car-model-enhancement-pack-update-selected', function() {
                $scope.updateEngineVariantSelection();
            });

            function resetChildControls() {
                $scope.ffc.formfields.data.enhancementPacks = null;
                $scope.ffc.formfields.data.enginevariantsandgrades = null;
                $scope.ffc.form.data.engineVariantAndGrade = null;
                $scope.ffc.form.data.engineVariant = null;
                $scope.ffc.form.data.grade = null;
            }

            $scope.updateModelSelection = function(clearChildControls) {

                if ($scope.ffc.formfields.comingSoonModels[$scope.ffc.form.data.carmodel]) {
                    resetChildControls();
                    return;
                }

                if (clearChildControls) {
                    resetChildControls();
                }
                $scope.bindEngineVariants1();

                $rootScope.$broadcast('vehicle-preference-change', {
                    model: $scope.ffc.form.data.carmodel,
                    grade: (UserPreferencesService.getLexusVehicle() ? UserPreferencesService.getLexusVehicle().grade : ""),
                    engineVariant: (UserPreferencesService.getLexusVehicle() ? UserPreferencesService.getLexusVehicle().engineVariant : ""),
                    enhancementPack: (UserPreferencesService.getLexusVehicle() ? UserPreferencesService.getLexusVehicle().enhancementPack : ""),
                    vehicleIndex: $scope.vehicleIndex
                });
            };

            //At time of engine variant change
            $scope.updateEngineVariantSelection = function(clearChildControls) {
                if (clearChildControls) {
                    $scope.ffc.formfields.data.enhancementPacks = null;
                    $scope.ffc.form.data.enhancementPack = null;
                }

                bindEnhancementPacks();

                var values = getVariantAndGradeFromKey($scope.ffc.form.data.engineVariantAndGrade);
                var engineVariant = (values ? values.engineVariant : null);
                var grade = (values ? values.grade : null);
                $scope.ffc.form.data.engineVariant = engineVariant;
                $scope.ffc.form.data.grade = grade;

                console.log('updateEngineVariantSelection');
                console.log('clearChildControls=' + clearChildControls);
                $rootScope.$broadcast('vehicle-preference-change', {
                    model: $scope.ffc.form.data.carmodel,
                    engineVariant: engineVariant ? engineVariant : (UserPreferencesService.getLexusVehicle() ? UserPreferencesService.getLexusVehicle().engineVariant : ""),
                    grade: grade ? grade : (UserPreferencesService.getLexusVehicle() ? UserPreferencesService.getLexusVehicle().grade : ""),
                    enhancementPack: UserPreferencesService.getLexusVehicle() ? UserPreferencesService.getLexusVehicle().enhancementPack : "",
                    vehicleIndex: $scope.vehicleIndex
                });

            };

            $scope.updateEnhancementPackSelection = function() {
                var values = getVariantAndGradeFromKey($scope.ffc.form.data.engineVariantAndGrade);
                var engineVariant = values ? values.engineVariant : '';
                var grade = values ? values.grade : '';
                console.log('updateEnhancementPackSelection');
                $rootScope.$broadcast('vehicle-preference-change', {
                    model: $scope.ffc.form.data.carmodel,
                    grade: grade ? grade : UserPreferencesService.getLexusVehicle().grade,
                    engineVariant: engineVariant ? engineVariant : UserPreferencesService.getLexusVehicle().engineVariant,
                    enhancementPack: $scope.ffc.form.data.enhancementPack
                });
            };

            $scope.modelDisplayName = function(name, fullName, isComingSoon, offerTitle) {
                $scope.ffc.formfields.comingSoonModels[name] = isComingSoon && isComingSoon.toLowerCase() == 'true';
                return (isComingSoon && isComingSoon.toLowerCase() == 'true') ? 'All-New ' + name + ' - ' + fullName + ' (' + offerTitle + ')' : name + '-' + fullName;
            };
        }
    }])

    .directive('lxFormFieldCarModelEngineVariant', [function() {

        formFieldController.$inject = ['$scope', '$rootScope', 'UserPreferencesService', 'VehicleService', '$filter', '$element'];
        return {
            scope: true,
            restrict: 'A',
            controller: formFieldController,
            controllerAs: 'form',
            bindToController: true,
            link: function(scope, element, attrs) {

            }
        };

        function formFieldController($scope, $rootScope, UserPreferencesService, VehicleService, $filter, $element) {
            var form = this;
            $scope.init = function() {

                $scope.ffc.formfields = {
                    data: {
                        enginevariants: []
                    },
                    comingSoonModels: {}
                };
            }

            //At time of model change
            $scope.bindEngineVariants2 = function() {
                //Clear fields at lower level and do not bind variants for comingSoon models
                if ($scope.ffc.formfields.comingSoonModels[$scope.ffc.form.data.carmodel]) {
                    $scope.ffc.form.data.carmodel = null;
                    $scope.ffc.form.data.enginevariant = null;
                    return;
                }

                VehicleService.getVehiclesOverview().then(function success(response) {
                    var myModel;
                    response.data.find(function(bodyType) {
                        bodyType.models.find(function(model) {
                            if ($scope.ffc.form.data.carmodel == model.name) {
                                myModel = model;
                                return;
                            }
                        });
                        return;
                    });

                    VehicleService.getEngineVariants(myModel.id)
                        .then(function success(data) {
                            if (data.status === "Success") {
                                $scope.ffc.formfields.data.enginevariants = data.data;
                            }
                        })
                        .then(function failure(response) {});

                }).then(function failure(response) {});

            };

            $rootScope.$on('field-car-model-engine-variant-update-selected', function() {
                $scope.bindEngineVariants2();
            });

            $scope.updateModelSelection = function() {
                if ($scope.ffc.formfields.comingSoonModels[$scope.ffc.form.data.carmodel]) {
                    $scope.ffc.form.data.enginevariant = null;
                    return;
                }
                $scope.bindEngineVariants2();
                $rootScope.$broadcast('vehicle-preference-change', {
                    model: $scope.ffc.form.data.carmodel
                    //engineVariant: UserPreferencesService.getLexusVehicle() ? UserPreferencesService.getLexusVehicle().engineVariant : ""
                    //grade: UserPreferencesService.getLexusVehicle() ? UserPreferencesService.getLexusVehicle().grade : ""
                });
            };

            //At time of engine variant change
            $scope.updateEngineVariantSelection = function() {

                console.log("updateEngineVariantSelection");

                $rootScope.$broadcast('vehicle-preference-change', {
                    model: $scope.ffc.form.data.carmodel,
                    engineVariant: $scope.ffc.form.data.enginevariant,
                    //grade: UserPreferencesService.getLexusVehicle() ? UserPreferencesService.getLexusVehicle().grade : "",
                });
            };

            $scope.modelDisplayName = function(name, fullName, isComingSoon, offerTitle) {
                $scope.ffc.formfields.comingSoonModels[name] = isComingSoon && isComingSoon.toLowerCase() == 'true';
                return (isComingSoon && isComingSoon.toLowerCase() == 'true') ? 'All-New ' + name + ' - ' + fullName + ' (' + offerTitle + ')' : name + '-' + fullName;
            };

        }
    }])
    .directive('lxFormFieldCarModel', [function() {
        formFieldController.$inject = ['$scope', '$rootScope', 'UserPreferencesService', 'VehicleService', '$filter', '$element'];
        return {
            scope: true,
            restrict: 'A',
            controller: formFieldController,
            controllerAs: 'form',
            bindToController: true,
            link: function(scope, element, attrs) {

            }
        };

        function formFieldController($scope, $rootScope, UserPreferencesService, VehicleService, $filter, $element) {
            var form = this;
            $scope.init = function() {

                $scope.ffc.formfields = {
                    data: {
                        enginevariants: []
                    },
                    comingSoonModels: {}
                };

            }

            $rootScope.$on('field-car-model-update-selected', function() {
                $scope.updateModelSelection();
            });

            $scope.updateModelSelection = function() {
                if ($scope.ffc.formfields.comingSoonModels[$scope.ffc.form.data.carmodel]) {
                    $scope.ffc.form.data.carmodel = null;
                    return;
                }
                $rootScope.$broadcast('vehicle-preference-change', {
                    model: $scope.ffc.form.data.carmodel,
                    //grade: UserPreferencesService.getLexusVehicle() ? UserPreferencesService.getLexusVehicle().grade : "",
                    //engineVariant: UserPreferencesService.getLexusVehicle() ? UserPreferencesService.getLexusVehicle().engineVariant : ""
                });
            };

            $scope.modelDisplayName = function(name, fullName, isComingSoon, offerTitle) {
                $scope.ffc.formfields.comingSoonModels[name] = isComingSoon && isComingSoon.toLowerCase() == 'true';
                return (isComingSoon && isComingSoon.toLowerCase() == 'true') ? 'All-New ' + name + ' - ' + fullName + ' (' + offerTitle + ')' : name + '-' + fullName;
            };
        }
    }])
    .directive('lxFormFieldDateWrap', ['$rootScope', function($rootScope) {
        formFieldDateWrapController.$inject = ['$scope', '$rootScope', '$filter', '$element'];
        return {
            scope: true,
            restrict: 'E',
            controller: formFieldDateWrapController,
            controllerAs: 'form',
            bindToController: true,
            link: function(scope, element, attrs) {
                var formName = attrs.name;
                var dp = element.find("#datePicker");
                dp.bind('change', function(elem) {
                    if (!moment(elem.target.value, 'DD-MM-YYYY').isValid()) {
                        $rootScope.$broadcast('date-picker-invalid');
                    } else {
                        $rootScope.$broadcast('date-picker-valid');
                    }

                });
            }
        };

        function formFieldDateWrapController($scope, $rootScope, $filter, $element) {
            var form = this;
            $scope.init = function() {

            }
        }
    }])
    .directive('lxFormFieldRangeInput', ['$rootScope', function($rootScope) {
        formFieldRangeInputController.$inject = ['$scope', '$rootScope', '$filter', '$element'];
        return {
            scope: true,
            restrict: 'A',
            controller: formFieldRangeInputController,
            controllerAs: 'form',
            bindToController: true,
            link: function(scope, element, attrs) {
                var control, controlMin, controlMax, controlVal, formattedValue, labelWidth, controlThumbWidth, position, positionOffset, output, range, format;
                control = element.find("input[type='range']");
                control.on('input change', function() {
                    calculatePosition();
                });

                if (attrs['format']) {
                    format = attrs['format'];
                }

                if (attrs['watch']) {
                    var watchArgs = []

                    if (attrs.watch.split) {
                        attrs['watch'].split(',').forEach(function(str) {
                            watchArgs.push(str.trim());
                        });
                    }

                    watchArgs.forEach(function(item) {
                        scope.$watch(item, function(oldValue, newValue) {
                            if (oldValue != newValue) {
                                calculatePosition();
                            }
                        });
                    });
                }

                $rootScope.$on('balloon-payment-options-received', function() {
                    //This is for second slider change can be optimised further
                    calculatePosition();
                });

                function calculatePosition() {
                    controlMin = parseInt(control.attr('min')) || 0;
                    controlMax = parseInt(control.attr('max')) || 1;
                    controlVal = control.val();
                    if (format) {
                        formattedValue = scope.formatOutput(format, controlVal);
                    } else {
                        formattedValue = controlVal;
                    }

                    range = controlMax - controlMin;
                    controlThumbWidth = 25;
                    labelWidth = 38;

                    position = ((controlVal - controlMin) / range) * 100;

                    // Calculate negative offset:
                    // half label width
                    // - half thumb width            zero            + half thumb width
                    // |--------------------------------------------------------------|
                    positionOffset = Math.round(((controlThumbWidth) * position / 100) - (controlThumbWidth / 2)) + labelWidth / 2;
                    output = control.next('.lx-form-slider__output');

                    output.css('left', 'calc(' + position + '% - ' + positionOffset + 'px)').html(formattedValue);
                }

                calculatePosition();
            }

        };

        function formFieldRangeInputController($scope, $rootScope, $filter, $element) {
            var form = this;
            $scope.init = function() {

            }

            $scope.formatOutput = function(format, val) {
                return $filter('formatArgs')(format, [val]);
            }
        }
    }])
    .directive('lxTooltip', [function() {
        disclaimerBubbleController.$inject = ['$scope', '$rootScope', '$filter', '$element'];
        return {
            scope: {
                'cssClass': '@'
            },
            restrict: 'AE',
            controller: disclaimerBubbleController,
            controllerAs: 'dbc',
            bindToController: true,
            transclude: true,
            //template: '<div class="lx-tooltip__info-overlay"><div class="lx-tooltip__info-icon" data-ng-init="init();" data-ng-mouseover="show()" data-ng-mouseleave="hide()"></div><div class="lx-tooltip__info-content" data-ng-transclude data-ng-show="showDisclaimer"></div></div>',
            template: '<div class="lx-tooltip__info-overlay is-{{alignment}} {{cssClass}}"' +
                'ng-class="{\'is-open\': isMouse && isMouseInside || !isMouse && isToggled}" ' +
                'mouse-detected="isMouse = true" ' +
                'ng-click="toggleIt($event)" ' +
                'ng-mouseenter="isMouseInside = true" ' +
                'ng-mouseleave="isMouseInside = false">' +
                '<div class="lx-tooltip__info-icon" ng-hide="showOffer"></div>' +
                '<div class="lx-tooltip__info-on-offer" ng-show="showOffer"><span>{{onOfferTitle}}</span></div>' +
                '<div class="lx-tooltip__info-content" data-ng-transclude ></div>' +
                '</div>',
            link: function(scope, element, attrs) {
                scope.alignment = attrs.lxTooltip;
                scope.showOffer = (attrs.tooltipOffer != null) ? attrs.tooltipOffer : false;
                scope.onOfferTitle = (attrs.tooltipTitle != null) ? attrs.tooltipTitle : "ON OFFER*";
            }
        };

        function disclaimerBubbleController($scope, $rootScope, $filter, $element) {
            var dbc = this;
            $scope.init = function() {
                $scope.showDisclaimer = false;
            }

            $scope.show = function() {
                $scope.showDisclaimer = true;
            }

            $scope.hide = function() {
                $scope.showDisclaimer = false;
            }

            $scope.toggleIt = function(event) {
                $scope.isToggled = !$scope.isToggled;
                event.stopPropagation();
            }

        }
    }]);;

"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxForm', [function() {
        var formBroadcast = '';
        var formName = '';
        formController.$inject = ['$scope', '$rootScope', 'UserPreferencesService', '$filter', '$element', '$timeout', 'AddressSuggestService'];
        return {
            scope: true,
            restrict: 'A',
            controller: formController,
            controllerAs: 'form',
            bindToController: true,
            link: function(scope, element, attrs) {
                formBroadcast = attrs.lxForm;
                formName = attrs.name;
                scope.$broadcast("initialize");
            }
        };

        function formController($scope, $rootScope, UserPreferencesService, $filter, $element, $timeout, AddressSuggestService) {
            var form = this,
                i,
                monthList = [4, 6, 9, 11],
                yesterday = moment().subtract(1, 'days'),
                inThreeMonths = moment().add(3, 'months');

            function addMonths(d, m) {
                var years = Math.floor(m / 12);
                var months = m - (years * 12);
                if (years) d.setFullYear(d.getFullYear() + years);
                if (months) d.setMonth(d.getMonth() + months);
                return d;
            }

            function leadingZero(value) {
                if (value < 10) {
                    return '0' + value;
                }

                return value;
            }

            function formatDateString(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                return [year, month, day].join('-');
            }

            $scope.dateError = function(formName) {
                formName = formName || "lxForm";

                var value = $scope[formName].datePicker.$viewValue ?
                    $scope[formName].datePicker.$viewValue : '';

                if (!value)
                    return $scope.form.dateError[2];

                var dateParts = (value.indexOf('/') > 1) ?
                    value.split('/') : false,
                    date = (dateParts != false) ? (dateParts[2] + '-' +
                        dateParts[1] + '-' + dateParts[0]) : value,
                    date = Date.parse(date);

                if (isNaN(date)) {
                    return $scope.form.dateError[0];
                } else {
                    return $scope.form.dateError[2];
                }
            }

            //DO NOT NEST THIS OBJECT, Plugin doesnt like form.dateChange
            $scope.dateChange = function(modelName, newValue) {

            }

            $scope.$on("initialize", function() {
                $scope.user = {};
                $scope.form.dateError = [
                    'Invalid date',
                    'Please choose a date that is in the valid range',
                    'Please pick date from the calendar'
                ];

                $scope.form.specificErrorMessages = {
                    'VINMsg': 'VIN must be 17 alphanumberic characters',
                    'VINLookupFailedMsg': 'VIN cannot be found, please check that what you have entered is correct',
                    'RegistrationInvalidMsg': 'Maximum seven characters. Numbers and letters only.'
                };


                $scope.form.errorMessages = [
                    'This field is required',
                    'The format is not valid',
                    'The input is too short',
                    'The captcha is required',
                    'The value is not suitable'
                ];

                $scope.form.namePattern = /^[a-zA-Z- ']*$/;
                $scope.form.nameMinLength = 2;
                $scope.form.messageMinLength = 16;
                $scope.form.postcodeMinLength = 4;
                $scope.form.dealerPostcodeMinLength = 4;
                $scope.form.yearMinLength = 4;
                $scope.form.phoneMinLength = 10;
                $scope.form.vinMinLength = 17;
                $scope.form.emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
                $scope.form.numberPattern = /^\d+$/;
                $scope.form.phonePattern = /^(0[23478]|\+[1-9])\d{8,15}$/i;
                $scope.form.hiddenUnselected = false;
                $scope.form.hasHTML5DatePicker = Modernizr.inputtypes.date;
                $scope.form.dateFormat = 'date';
                $scope.form.minYear = "1990";
                //Do not put this in a nested object, You have been warned by Ettienne!
                $scope.dateMin = moment().add(1, 'd').hour(12).startOf('h'); //today;
                $scope.dateMax = moment().add(3, 'months').hour(12).startOf('h'); //inThreeMonths;
                $scope.dateDefault = new Date(moment().add(3, 'd').hour(12).startOf('h')); //inThreeDays

                $scope.form.dateMin2 = formatDateString(yesterday);
                $scope.form.dateMax2 = formatDateString(inThreeMonths);
                $scope.form.datePattern = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[012])\/(201[6-9])/;
                $scope[formName].date = $scope.dateDefault;
                $scope.form.tagsLoading = false;
                $scope.form.alphanumeric = /^[a-zA-Z0-9]*$/;
            });

            $scope.errorText = function(length, min, data, value, specificErrorKey) {
                if (value) {
                    //  console.log(value);
                }
                if (specificErrorKey) {
                    return form.specificErrorMessages[specificErrorKey];
                } else {
                    if (!length) {
                        return form.errorMessages[0];
                    } else if (min && length < min) {
                        return form.errorMessages[2];
                    } else if (data) {
                        return form.errorMessages[4];
                    } else {
                        return form.errorMessages[1];
                    }
                }

            }

            $scope.showUnselected = function() {
                form.hiddenUnselected = false;
            }

            $scope.hideUnselected = function() {
                if (!form.hiddenUnselected) {
                    form.hiddenUnselected = true;
                }
            }

            $scope.VINchange = function() {
                $rootScope.$broadcast('vin-change');
            };

            $scope.submit = function(formName) {
                formName = formName || "lxForm";
                //console.log(formBroadcast);
                if ($scope[formName].$invalid) {
                    angular.forEach($scope[formName].$error, function(field) {
                        angular.forEach(field, function(errorField) {
                            if (errorField && errorField.$setTouched) {
                                errorField.$setTouched();
                                errorField.$setDirty();
                            }
                        })
                    });
                    if ($element.find(".ng-invalid")[0].id === 'postcodes') {
                        $element.find(".ng-invalid input")[0].focus();
                    } else {
                        $element.find(".ng-invalid")[0].focus();
                    }

                } else {
                    $rootScope.$broadcast('open-modal-window', {
                        content: '<div class="lx-loader">Loading...</div>',
                        closeOnEvent: 'close-modal-window',
                        variant: Lexus.ModalVariant.Spinner
                    });
                    $rootScope.$broadcast(formBroadcast, {
                        content: $scope.user
                    });
                }
            }

            $rootScope.$on('form-result', function(events, arg) {
                $rootScope.$broadcast('close-modal-window');
            });

            $rootScope.$on('date-picker-invalid', function(event, value) {
                $scope[formName].datePicker.$setValidity("validDate", false);
                $scope.$apply();
            });

            $rootScope.$on('vin-lookup-success', function(event, value) {
                $scope[formName].vin.$setValidity("notfound", true);
            });

            $rootScope.$on('vin-lookup-failed', function(event, value) {
                $scope[formName].vin.$setValidity("notfound", false);
            });

            $scope.loadTags = function(query) {
                $scope.form.tagsLoading = true;
                AddressSuggestService.setParam('term', query);
                return AddressSuggestService.GetResults($scope.tagsLoaded);
            };

            $scope.tagsLoaded = function() {
                $scope.form.tagsLoading = false;
            }

            $scope.autocompleteLoading = function() {
                return $scope.form.tagsLoading;
            };

            $rootScope.$on('date-picker-valid', function(event, value) {
                $scope[formName].datePicker.$setValidity("validDate", true);
                $scope.$apply();
            });


        }
    }]);;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxFormsFinanceCalculator', ['$http', '$filter', '$timeout', '$window', '$interval', '$location',
        '$rootScope', 'DealersService', 'AddressSuggestService', 'UserPreferencesService',
        'VehicleService', 'vcRecaptchaService', 'FormsService', 'PricingService', '$sce',
        'BuildPriceService', 'BuildPriceAPIService', 'EloquaService', '$log', FormsFinanceCalculatorDirective
    ]);


function FormsFinanceCalculatorDirective($http, $filter, $timeout, $window, $interval, $location,
    $rootScope, DealersService, AddressSuggestService, UserPreferencesService,
    VehicleService, vcRecaptchaService, FormsService, PricingService, $sce,
    BuildPriceService, BuildPriceAPIService, eloquaService, $log) {
    var formName = '';
    var forceDealerId = '';
    var dealerState = '';
    FormsFormsFinanceCalculatorController.$inject = ['$scope'];

    return {
        scope: true,
        restrict: 'A',
        controller: FormsFormsFinanceCalculatorController,
        controllerAs: 'ffc',
        bindToController: true,
        link: function(scope, element, attrs, filter, http) {
            scope.successContent = element.find('.lx-form-success');
            scope.failureContent = element.find('.lx-form-failure');
            formName = attrs.lxFormsName;
        }
    };

    function FormsFormsFinanceCalculatorController($scope) {
        var ftd = this;

        $log.info("Build and Price Data:");
        $log.info($scope.buildAndPriceData);

        $scope.ffc.urlParameters = $location.search();
        $scope.BuildPriceService = BuildPriceService;
        $scope.testValue = 10;

        function getModelFromAvailableModels(carModel) {

            var availableModels = $scope.ffc.form.settings.availableModels;

            if (!availableModels || (availableModels && availableModels.length == 0))
                return null;

            if (availableModels.length === 1) {
                return availableModels[0];
            }

            if (availableModels.length > 1) {
                var modelIndex = availableModels.findIndex(function(m) {
                    return carModel != null ? m.toLowerCase() === carModel.toLowerCase() : false
                });
                return modelIndex > -1 ? availableModels[modelIndex] : null;
            }

            return null;
        }

        $rootScope.$on('change-active-vehicle', function() {
            var dataVehicle = UserPreferencesService.getLexusVehicle($scope.ffc.urlParameters);
            $scope.ffc.form.data.carmodel = getModelFromAvailableModels(dataVehicle.model);
            $scope.clearSomeCarData();

            if ($scope.ffc.form.data.carmodel == null)
                return;

            $rootScope.$broadcast('field-car-model-engine-variant-update-selected');
        });

        $scope.init = function(settings) {

            var dataVehicle = UserPreferencesService.getLexusVehicle($scope.ffc.urlParameters);
            var dataDealer = UserPreferencesService.getLexusDealer($scope.ffc.urlParameters);
            var settings = settings || {};
            settings.balloonPayment = settings.balloonPayment || {};
            settings.loanTerm = settings.loanTerm || {};
            settings.summary = settings.summary || {};
            settings.messages = settings.messages || {};

            $scope.dealerState = settings.dealerState;
            $scope.forceDealerId = settings.forceDealerId;
            $scope.isDealerSite = settings.isDealerSite;
            $scope.isMultiBranchDealer = settings.isMultiBranchDealer;
            $scope.dealerCompositeID = settings.dealerCompositeID;

            $scope.pricingSuccess = true;

            $scope.currentPath = $location.path();

            //defaults
            $scope.ffc.form = {
                submitting: false,
                completed: false,
                errors: false,
                settings: {
                    availableModels: settings.availableModels ? settings.availableModels : null,
                    availableGrades: settings.availableGrades ? settings.availableGrades : null,
                    balloonPayment: {
                        fixedValue: settings.balloonPayment.fixedValue ? settings.balloonPayment.fixedValue : null,
                        min: settings.balloonPayment.min ? settings.balloonPayment.min : 0,
                        max: settings.balloonPayment.max ? settings.balloonPayment.max : 50,
                        step: settings.balloonPayment.step ? settings.balloonPayment.step : 5,
                        disabled: settings.balloonPayment.disabled != null ? settings.balloonPayment.disabled : true
                    },
                    loanTerm: {
                        personalMax: settings.loanTerm.personalMax ? settings.loanTerm.personalMax : 5,
                        businessMax: settings.loanTerm.businessMax ? settings.loanTerm.businessMax : 5,
                        max: settings.loanTerm.max ? settings.loanTerm.max : 5,
                        min: 1
                        //disabled: settings.loanTerm.disabled ? settings.loanTerm.disabled : true
                    },
                    /*interestRate: {
                        min: settings.interestRate.min ? settings.interestRate.min : 0,
                        max: settings.interestRate.max ? settings.interestRate.max : 100,
                        step: settings.interestRate.step ? settings.interestRate.step : 0.25
                    },*/
                    summary: {
                        paymentInterval: settings.summary.paymentInterval ? settings.summary.paymentInterval : 'month'
                    },
                    messages: {
                        apiError: settings.messages.apiError ? settings.messages.apiError : 'Oops, something went wrong while we were doing the sums.  Please check the form values and try again.  If the problem persists, please contact your dealer directly.'
                    },
                    disclaimerPage: settings.disclaimerPage,
                    enablePricingByZone: settings.enablePricingByZone == 'true'
                },
                data: {
                    postcodes: null,
                    deposit: null,
                    interestrate: null,
                    interestRateCopy: "",
                    carmodel: dataVehicle.model,
                    grade: dataVehicle.grade,
                    engineVariant: dataVehicle.engineVariant,
                    engineVariantAndGrade: dataVehicle.engineVariant + ";" + dataVehicle.grade,
                    enhancementPack: dataVehicle.enhancementPack,
                    trim: dataVehicle.trim,
                    colour: dataVehicle.colour,
                    loanterm: null,
                    balloonPayment: 0,
                    loantype: 'Personal', //Default Selected Value
                    dealerId: dataDealer.dealerID,
                    dealerName: dataDealer.dealerName,
                    source: $scope.ffc.urlParameters.source || null
                },
                emailsettings: {
                    email: {
                        subject: 'Lexus Financial Services: Finance estimate',
                        body: '',
                        introText: '',
                        disclaimer: '',
                        fullBodyContents: '',
                        //cc: emailsettings.email.cc ? emailsettings.email.cc : '',
                        //bcc: emailsettings.email.bcc ? emailsettings.email.bcc : ''
                    }
                },
                results: {
                    paint: null,
                    trim: null,
                    driveAwayPrice: 0,
                    installmentPerMonth: 0,
                    installmentPerWeek: 0,
                    finalBalloonPayment: 0
                },
                pricingSuccess: true,
                dealerquoteform: {
                    Show: false
                }
            };

            $log.info("$scope.ffc.form.data:");
            $log.info($scope.ffc.form.data);

            if ($scope.ffc.form.settings.balloonPayment.fixedValue != null) {
                $scope.ffc.form.data.balloonPayment = $scope.ffc.form.settings.balloonPayment.fixedValue;
            }

            // LEXWEB-450 / AC 16 - clear cookie if carmodel unavailable for this campaign
            var availableModels = $scope.ffc.form.settings.availableModels;
            if (availableModels) {

                $scope.ffc.form.data.carmodel = getModelFromAvailableModels($scope.ffc.form.data.carmodel);

                $scope.clearSomeCarData();

                $rootScope.$broadcast('vehicle-preference-change', {
                    model: $scope.ffc.form.data.carmodel, //Ac6 reset all cookies on model change
                    grade: undefined,
                    engineVariant: undefined,
                    enhancementPack: undefined
                });

                $rootScope.$broadcast('field-car-model-engine-variant-update-selected');
            }

            UserPreferencesService.getLexusVisitorSession().then(function success(data) {
                var dataUser = UserPreferencesService.getLexusVisitor($scope.ffc.urlParameters);


                //initialise subform fields
                $scope.ffc.form.data.email = data.Data.email;
                $scope.ffc.form.data.firstname = data.Data.name;
                $scope.ffc.form.data.lastname = data.Data.surname;
                $scope.ffc.form.data.phone = data.Data.phone;
                $scope.ffc.form.data.message = null;
                $scope.ffc.form.data.prefer = data.Data.preferredContactMethod ? data.Data.preferredContactMethod : 'email',
                    $scope.ffc.form.data.phonetype = data.Data.phoneType ? data.Data.phoneType : 'home';
                $scope.ffc.form.data.additionalcomments = null;
                $scope.ffc.form.data.subscribe = false;
                $scope.ffc.form.data.captcha = '';
                $scope.ffc.form.data.messagedynamic = "";

                if (dataUser.suburb && dataUser.postCode && dataUser.state) {
                    if (!$scope.ffc.form.data.postcodes) {
                        $scope.ffc.form.data.postcodes = [];
                    }
                    $scope.ffc.form.data.postcodes.push(UserPreferencesService.getAutocompleteTagFromVisitor(dataUser));
                }
            }, function failure(data) {
                $scope.ffc.form.data.email = null;
                $scope.ffc.form.data.firstname = null;
                $scope.ffc.form.data.lastname = null;
                $scope.ffc.form.data.phone = null;
                $scope.ffc.form.data.message = null;
                $scope.ffc.form.data.prefer = 'email';
                $scope.ffc.form.data.phonetype = 'home';
                $scope.ffc.form.data.additionalcomments = null;
                $scope.ffc.form.data.subscribe = false;
                $scope.ffc.form.data.captcha = '';
                $scope.ffc.form.data.messagedynamic = "";


            }).finally(function() {

                if ($scope.ffc.form.data.carmodel) {
                    $rootScope.$broadcast('field-car-model-engine-variant-update-without-reset');

                    if ($scope.ffc.form.data.engineVariantAndGrade) {
                        $rootScope.$broadcast('field-car-model-enhancement-pack-update-selected');
                    }

                }

                //Main Site
                if ($scope.ffc.form.data.postcodes && $scope.ffc.form.data.postcodes.length > 0 && !$scope.isDealerSite) {
                    $scope.searchNow();
                }

                //Dealer Site Multi Branch
                if ($scope.isDealerSite && $scope.isMultiBranchDealer) {
                    $scope.ffc.form.data.dealerId = null;
                    $scope.ffc.form.data.dealerName = null;
                    $scope.loadBranches($scope.forceDealerId);
                }

                //Dealer Site NOT Multi Branch
                if ($scope.isDealerSite && !$scope.isMultiBranchDealer) {
                    $scope.ffc.form.data.dealerId = $scope.dealerCompositeID;
                    $scope.ffc.form.data.dealerName = null;
                }
            });
        }

        $scope.clearSomeCarData = function() {
            $scope.ffc.form.data.engineVariant = undefined;
            $scope.ffc.form.data.grade = undefined;
            $scope.ffc.form.data.engineVariantAndGrade = undefined;
            $scope.ffc.form.data.enhancementPack = undefined;
        }

        $scope.createGenericMessage = function(vehicleIndex) {

            var carModel = $('#carmodel_' + vehicleIndex + ' option:selected').text(); // should we split by name of full name is ok? carModel.split('-')[0] $scope.ffc.form.data.carmodel is populating id for time being jquery is used to get model value ,once refactored shd be in ng-variable
            var bodyContents = "I am interested in finding out more about vehicle finance on the "; // <br>";
            bodyContents += carModel + " " + $('#engineVariant_' + vehicleIndex + ' option:selected').text() + ", ";
            bodyContents += ($('#enhancementPack_' + vehicleIndex + ' option:selected').val() == "") ? "" : $('#enhancementPack_' + vehicleIndex + ' option:selected').text() + ", ";
            bodyContents += ($scope.ffc.form.results.paint ? $scope.ffc.form.results.paint.uriName : "") + "<br><br>";

            bodyContents += "<strong>Usage:</strong> " + $scope.ffc.form.data.loantype.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1)
            }) + "<br>";
            bodyContents += "<strong>" + ($scope.ffc.form.data.loantype.toLowerCase() === "personal" ? "Comparison Rate" : "Interest Rate") + ":</strong> " + $scope.ffc.form.data.interestrate + " %" + "<br>";
            bodyContents += "<strong>Deposit:</strong> $" + $scope.ffc.form.data.deposit + "<br>";
            bodyContents += "<strong>Loan Term:</strong> " + $scope.ffc.form.data.loanterm + " years" + "<br>";
            bodyContents += "<strong>Balloon Payment<span class='lx-finance-summary__section-payment-info'>3</span> :</strong> " + ($scope.pricingSuccess ? "$" + $scope.ffc.form.results.finalBalloonPayment : "Price currently not available") + "<br>";
            bodyContents += "<strong>Drive Away<span class='lx-finance-summary__section-payment-info'>1</span> :</strong> " + ($scope.pricingSuccess ? "$" + $scope.ffc.form.results.driveAwayPrice : "Price currently not available") + "<br>";

            bodyContents += "<strong>Estimated Repayment<span class='lx-finance-summary__section-payment-info'>2</span> :</strong> ";

            if ($scope.ffc.form.settings.summary.paymentInterval == 'month') {
                bodyContents += ($scope.pricingSuccess) ? "$" + $scope.ffc.form.results.installmentPerMonth + " per month <br>" : "Price currently not available <br>";
            } else {
                bodyContents += ($scope.pricingSuccess) ? "$" + $scope.ffc.form.results.installmentPerWeek + " per week <br>" : "Price currently not available <br>";
            }

            $scope.ffc.form.data.messagedynamic = bodyContents;

            var t = $sce.trustAsHtml(bodyContents);

            return t;
        }

        $scope.setFocus = function($event) {
            $('html, body').animate({
                scrollTop: ($('#postcodes').offset().top - 80)
            });
            $event.preventDefault();
            $("#postcodes :input").focus();
        };

        $scope.setFocusWithScroll = function($event) {
            $event.preventDefault();
            $('html, body').animate({
                scrollTop: ($('#postcodes').offset().top - 80)
            }, 200);
        }

        $scope.getMailLink = function(vehicleIndex) {
            vehicleIndex = vehicleIndex || 0;

            var carModel = $('#carmodel_' + vehicleIndex + ' option:selected').text(); // should we split by name of full name is ok? carModel.split('-')[0] $scope.ffc.form.data.carmodel is populating id for time being jquery is used to get model value ,once refactored shd be in ng-variable
            var engineVariantandGrade = $('#engineVariant_' + vehicleIndex + ' option:selected').text();
            var enhancementPack = $('#enhancementPack_' + vehicleIndex + ' option:selected').text();
            var lineBreak = "\n"; //"%0D%0A";
            var bodyContents = $scope.ffc.form.emailsettings.email.introText + lineBreak + lineBreak;
            bodyContents += "Vehicle Model : " + carModel + lineBreak;
            bodyContents += "Variant and Grade : " + engineVariantandGrade + lineBreak;
            bodyContents += "Enhancement Pack : " + enhancementPack + lineBreak;
            bodyContents += "Disclaimer Paint : " + "The price is based on " + ($scope.ffc.form.results.paint ? $scope.ffc.form.results.paint.uriName.toUpperCase() : "a default") + " exterior and ";
            bodyContents += ($scope.ffc.form.results.trim ? $scope.ffc.form.results.trim.uriName.toUpperCase() : "a default") + " trim" + lineBreak;
            bodyContents += "Interest Rate : " + $scope.ffc.form.data.interestrate + "%" + lineBreak;
            bodyContents += "Deposit : $" + $scope.ffc.form.data.deposit + lineBreak;
            bodyContents += "Loan Term : " + $scope.ffc.form.data.loanterm + " years" + lineBreak;
            bodyContents += "Usage : " + $scope.ffc.form.data.loantype + lineBreak;
            bodyContents += "Drive-away : ";
            bodyContents += ($scope.pricingSuccess) ? "$" + $scope.ffc.form.results.driveAwayPrice : "Price currently not available";
            bodyContents += lineBreak;

            if ($scope.ffc.form.settings.summary.paymentInterval == 'month') {
                bodyContents += "Estimated Monthly Repayment^ : ";
                bodyContents += ($scope.pricingSuccess) ? "$" + $scope.ffc.form.results.installmentPerMonth : "Price currently not available";
            } else {
                bodyContents += "Estimated Weekly Repayment^ : ";
                bodyContents += ($scope.pricingSuccess) ? "$" + $scope.ffc.form.results.installmentPerWeek : "Price currently not available";
            }

            bodyContents += lineBreak;

            bodyContents += "Final Balloon Payment++ : $" + $scope.ffc.form.results.finalBalloonPayment + lineBreak + lineBreak;
            //Final Balloon Payment++ : $4,959.10 or 10% of Drive-away
            bodyContents += $scope.ffc.form.emailsettings.email.disclaimer + lineBreak;
            $scope.ffc.form.emailsettings.email.fullBodyContents = bodyContents;

            var t = "mailto:?subject=" + encodeURIComponent($scope.ffc.form.emailsettings.email.subject) + "&body=" + encodeURIComponent($scope.ffc.form.emailsettings.email.fullBodyContents);
            return t;

        }

        $scope.getBuildPriceLink = function() {

            var url = $scope.ffc.form.data.carmodel ? $scope.BuildPriceService.encodeUriFragment($scope.ffc.form.data.carmodel) : "";
            url = url + "/";

            if ($scope.ffc.form.data.engineVariant) {

                url = url + $scope.BuildPriceService.encodeUriFragment($scope.ffc.form.data.engineVariant) + "/";
                url = url + $scope.BuildPriceService.encodeUriFragment($scope.ffc.form.data.grade) + "/";

                if ($scope.ffc.form.data.enhancementPack) {
                    url = url + $scope.BuildPriceService.encodeUriFragment($scope.ffc.form.data.enhancementPack) + "/";
                }

                if ($scope.ffc.form.results.paint) {
                    url = url + $scope.BuildPriceService.encodeUriFragment(
                        $scope.ffc.form.results.paint.uriName) + "/";
                }

                if ($scope.ffc.form.results.trim) {
                    url = url + $scope.BuildPriceService.encodeUriFragment($scope.ffc.form.results.trim.uriName);
                }

                url = url + "/4#lx-bp-nav";
            }

            var path = $scope.BuildPriceService.encodeUriPath(url);

            return path;
        }

        $scope.updateIntroText = function(introText) {
            $scope.ffc.form.emailsettings.email.introText = $sce.trustAsHtml(introText);
        }

        $scope.updateDisclaimerText = function(disclaimerText) {
            $scope.ffc.form.emailsettings.email.disclaimer = $sce.trustAsHtml(disclaimerText);
        }

        $scope.deselectDealer = function() {
            $scope.ffc.form.data.dealerId = $scope.ffc.form.data.dealerName = null;
        }

        $scope.selectDealer = function(dealerInputId) {
            var scrollPos = $(document).scrollTop();
            var maxPos = $('#' + dealerInputId).parents('.lx-form__find-dealer-js').offset().top;
            if (scrollPos > maxPos) {
                TweenLite.to(window, 0.5, {
                    scrollTo: {
                        y: maxPos
                    },
                    ease: Power2.easeOut
                });
            }
        }

        $scope.searchNow = function() {
            $scope.ffc.form.dealersLoading = true;
            $rootScope.$broadcast('visitor-details-change-autocomplete', $scope.ffc.form.data.postcodes[0].data);
            DealersService.setParam('postCode', $scope.ffc.form.data.postcodes[0].data.postCode);
            DealersService.setParam('suburb', $scope.ffc.form.data.postcodes[0].data.suburb);
            DealersService.setParam('type', 'Sales');
            $scope.ffc.form.data.postcode = $scope.ffc.form.data.postcodes[0].data.postCode;
            DealersService.GetResults();
        }

        $scope.clearPostcode = function() {
            $scope.ffc.form.data.postcodes = null;
            $scope.ffc.form.dealerquoteform.Show = false;
        }

        $scope.updatePostcode = function(tag) {
            $scope.ffc.form.tagsLoading = false;
            $rootScope.$broadcast('visitor-details-cookie-change', {
                postCode: tag.data.postcode,
                suburb: tag.data.suburb,
                state: tag.data.state,
                pricingZone: tag.data.pricingZone
            });

            $scope.ffc.form.data.postcodes = [];
            $scope.ffc.form.data.postcodes[0] = tag;

            $scope.dealerSearch(tag);
        }

        $scope.loadBranches = function(dealerID) {
            $scope.ffc.form.dealersLoading = true;
            DealersService.setParam('dealerID', dealerID);
            DealersService.setParam('type', 'Sales');
            DealersService.GetDealerBranches();
        }

        $scope.dealerSearch = function($tag) {
            $scope.searchDealersNow();
        }

        $scope.searchDealersNow = function() {
            $scope.ffc.form.dealersLoading = true;
            $rootScope.$broadcast('visitor-details-change-autocomplete', $scope.ffc.form.data.postcodes[0].data);


            //Main Site
            if ($scope.ffc.form.data.postcodes && $scope.ffc.form.data.postcodes.length > 0 && !$scope.isDealerSite) {
                $scope.searchNow();
            }

            //Dealer Site Multi Branch
            if ($scope.isDealerSite && $scope.isMultiBranchDealer) {
                $scope.ffc.form.data.dealerId = null;
                $scope.ffc.form.data.dealerName = null;
                $scope.loadBranches($scope.forceDealerId);
            }

            //Dealer Site NOT Multi Branch
            if ($scope.isDealerSite && !$scope.isMultiBranchDealer && $scope.dealerState) {
                DealersService.setParam('dealerID', $scope.forceDealerId);
                DealersService.setParam('dealerState', $scope.dealerState);
                DealersService.setParam('type', 'Sales');
                DealersService.GetResult();
            }
        }

        $scope.$on('dealer-search-results-received', function(event, data) {
            $scope.ffc.form.dealersLoading = false;
            $scope.ffc.form.dealers = data.Data;

            $scope.checkDealersLoaded();

            if ($scope.ffc.form.dealerquoteform.Show) {
                $('html, body').animate({
                    scrollTop: ($('#scrollFormTop').offset().top)
                }, 200);
            }
        });

        //Do a sanity check to see if the bound dealers match the forceDealer if not clear the force dealer
        $scope.checkDealersLoaded = function() {
            var result = $scope.ffc.form.dealers.find(function(dealer) {
                return dealer.dealerCode == $scope.ffc.form.data.dealerId;
            });
            if (!result) {
                $scope.ffc.form.data.dealerId = null;
            }

            if ($scope.ffc.form.dealers.length == 1)
                $scope.ffc.form.data.dealerId = $scope.ffc.form.dealers[0].dealerCode;
        }

        $scope.$on('dealer-search-result-received', function(event, data) {
            $scope.ffc.form.dealersLoading = false;
            $scope.ffc.form.dealer = data.Data;

            if ($scope.ffc.form.dealerquoteform.Show) {
                $('html, body').animate({
                    scrollTop: ($('#scrollFormTop').offset().top)
                }, 200);
            }

            $scope.ffc.form.dealerlocations = data.Data.locations;

            if ($scope.ffc.form.dealerlocations == null) {
                $scope.ffc.form.dealerlocations = [];
            }
            //Multiple dealers for same dealerId - A bug to be corrected latter -wont require looping in that case on parent
            if (data.Data) {
                angular.forEach(data.Data, function(val) {
                    if (val) {
                        angular.forEach(val.locations, function(innerval) {
                            this.push(innerval);
                        }, $scope.ffc.form.dealerlocations);
                    }
                });
            }

            if ($scope.ffc.form.dealerlocations.length == 1)
                $scope.ffc.form.data.locationId = $scope.ffc.form.dealerlocations[0].locationId;

            //$("#additionalcomments").focus();

        });

        $scope.getData = function() {
            return {
                DriveAwayPrice: $scope.ffc.form.results.driveAwayPrice,
                Deposit: $scope.ffc.form.data.deposit,
                InterestRate: $scope.ffc.form.data.interestrate,
                LoanTerm: $scope.ffc.form.data.loanterm,
                BalloonPayment: $scope.ffc.form.data.balloonpayment
            };
        }

        $scope.isSectionDisabled = function(sectionName) {
            switch (sectionName) { // note: falls through to test multiple cases
                case 'summary':
                case 'loanDetails':
                    if (!($scope.ffc.form.data.carmodel && $scope.ffc.form.data.engineVariantAndGrade)) {
                        return true;
                    }
                case 'vehicleDetails':
                    if (!($scope.ffc.form.data.postcodes && $scope.ffc.form.data.postcodes.length > 0)) {
                        return true;
                    }
            }
            return false;
        }

        $scope.updateLoanType = function() {
            $scope.bindLoanTermOptions();
            $scope.bindBalloonPaymentOptions();
            $scope.interestRateCopy();
        }

        $scope.updateLoanTerm = function() {
            $scope.bindBalloonPaymentOptions();
        }

        $scope.interestRateCopy = function() {
            if ($scope.ffc.form.data.loantype.toLowerCase() === 'business') {
                $scope.ffc.form.data.interestRateCopy = $scope.ffc.form.data.interestRateBusiness > 0 ? $scope.ffc.form.data.interestRateBusiness :
                    $scope.ffc.form.data.interestrate;
            }

            if ($scope.ffc.form.data.loantype.toLowerCase() === 'personal') {
                $scope.ffc.form.data.interestRateCopy = $scope.ffc.form.data.interestRatePersonal > 0 ? $scope.ffc.form.data.interestRatePersonal :
                    $scope.ffc.form.data.interestrate;
            }
        }

        $scope.bindLoanTermOptions = function() {
            switch ($scope.ffc.form.data.loantype) {
                case 'personal':
                    $scope.ffc.form.settings.loanTerm.max = $scope.ffc.form.settings.loanTerm.personalMax
                    break;
                case 'business':
                    $scope.ffc.form.settings.loanTerm.max = $scope.ffc.form.settings.loanTerm.businessMax
                    break;
            }
            $scope.ffc.form.data.loanterm = Math.min($scope.ffc.form.settings.loanTerm.max, Math.max($scope.ffc.form.settings.loanTerm.min, $scope.ffc.form.data.loanterm));
        }

        $scope.bindBalloonPaymentOptions = function() {
            if ($scope.ffc.form.settings.balloonPayment.fixedValue) {
                return;
            }
            if ($scope.ffc.form.data.loantype && $scope.ffc.form.data.loanterm) {
                $http({
                        method: 'GET',
                        url: $filter('formatArgs')(Lexus.API.Lookup.FinanceBalloonPaymentOptions, [Lexus.ID.Site, $scope.ffc.form.data.loantype, $scope.ffc.form.data.loanterm, $scope.ffc.form.data.loantype])
                    })
                    .then(function success(response) {
                        if (response.data.Data) {
                            $scope.ffc.form.settings.balloonPayment.min = response.data.Data.Min;
                            $scope.ffc.form.settings.balloonPayment.step = response.data.Data.Step;
                            $scope.ffc.form.data.balloonPayment = Math.min(response.data.Data.Max, Math.max(response.data.Data.Min, $scope.ffc.form.data.balloonPayment));
                            $scope.ffc.form.settings.balloonPayment.max = response.data.Data.Max;
                        }
                        $scope.ffc.form.settings.balloonPayment.disabled = response.data.Data.DisableBalloonPayments;
                        $rootScope.$broadcast('balloon-payment-options-received');
                    }, function error(response) {
                        $rootScope.$broadcast('open-modal-window', {
                            content: $scope.ffc.form.settings.messages.apiError,
                            variant: Lexus.ModalVariant.Content,
                            closeOnEvent: 'close-modal-window',
                            wrapper: ["<p style='padding: 20px 65px 0px 20px; text-align: left'>", "</p>"]
                        });
                    })
                    .finally(function() {

                    });
            }
        }

        //Watches: carmodel, enhancementPack, postcode, grade
        //Modifies: driveAwayPrice
        $scope.$watchGroup(['ffc.form.data.carmodel', 'ffc.form.data.enhancementPack', 'ffc.form.data.postcodes', 'ffc.form.data.engineVariantAndGrade'], function(newDataArray, oldDataArray, $scope) {
            var newData = {};
            newData.carmodel = newDataArray[0];
            newData.enhancementPack = newDataArray[1];
            newData.postcodes = newDataArray[2];
            newData.engineVariantAndGrade = newDataArray[3];

            //Something has changed since entering with a B&P Deeplink
            if ($scope.ffc.form.data.engineVariantAndGrade != newData.engineVariantAndGrade || $scope.ffc.form.data.enhancementPack != newData.enhancementPack) {
                $scope.ffc.form.data.trim = $scope.ffc.form.results.trim = null;
                $scope.ffc.form.data.colour = $scope.ffc.form.results.paint = null;
            }

            $log.info("carmodel: " + newData.carmodel);
            $log.info("enhancementPack: " + newData.enhancementPack);
            $log.info("engineVariantAndGrade: " + newData.engineVariantAndGrade);
            var pricingZone = "";
            if (newData.postcodes && newData.postcodes.length > 0) {
                var visitor = UserPreferencesService.splitAutoCompleteResult(newData.postcodes[0].text);
                pricingZone = newData.postcodes[0].data.pricingZone;
                if (!visitor.postCode) {
                    // $scope.ffc.form.results.driveAwayPrice = 0; ?
                    return;
                }
            } else {
                $scope.ffc.form.results.driveAwayPrice = 0;
                return;
            }

            BuildPriceService.waitFor.call($scope, 'ffc.formfields.data.enhancementPacks', BuildPriceService.waitCondition.NOTEMPTY)
                .then(function(enhancementPacks) {

                    var selectedEnhancementPack = $scope.ffc.formfields.data.enhancementPacks.find(function(item) {
                        return $scope.ffc.form.data.enhancementPack == item.uriName;
                    });

                    var selectedGrade = $scope.ffc.formfields.data.enginevariantsandgrades.find(function(item) {
                        return $scope.ffc.form.data.engineVariantAndGrade == item.key;
                    });

                    if (selectedEnhancementPack && selectedEnhancementPack.mdmid) {

                        var selectedEnhancementPackMdmId = selectedEnhancementPack.mdmid;

                        if (!selectedGrade) {
                            $scope.ffc.form.data.engineVariantAndGrade = undefined;
                            return;
                        }

                        var selectedGradeId = selectedGrade.gradeId;
                        var selectedEngineVariant = $scope.ffc.form.data.engineVariant;
                        PricingService.setParam("enablePricingByZone", $scope.ffc.form.settings.enablePricingByZone);
                        if ($scope.ffc.form.data.trim && $scope.ffc.form.data.colour) //Deep Linked from B&P with a trim and paint
                        {
                            BuildPriceAPIService.getModels(function() {
                                BuildPriceAPIService.getVariants(selectedEngineVariant, selectedGradeId, function() {
                                    var selectedVariant = BuildPriceAPIService.getVariantByName(selectedEngineVariant, selectedGradeId, $scope.ffc.form.data.enhancementPack);
                                    BuildPriceAPIService.getTrims(selectedEngineVariant, selectedGradeId, selectedVariant.mdmid, function() {
                                        var selectedTrim = BuildPriceAPIService.getTrimByName(selectedEngineVariant, selectedGradeId, selectedVariant.mdmid, $scope.ffc.form.data.trim);
                                        if (!selectedTrim) {
                                            selectedTrim = selectedVariant.trims.availableTrims[0];
                                            $scope.ffc.form.data.trim = selectedTrim.uriName;
                                        }
                                        BuildPriceAPIService.getPaints(selectedEngineVariant, selectedGradeId, selectedVariant.mdmid, selectedTrim.id, function(availableColours, unavailableColours) {
                                            var selectedPaint = BuildPriceAPIService.getPaintByName(selectedEngineVariant, selectedGradeId, selectedVariant.mdmid, selectedTrim.id, $scope.ffc.form.data.colour);
                                            if (!selectedPaint) {
                                                selectedPaint = selectedTrim.paints.availableColours[0];
                                                $scope.ffc.form.data.colour = selectedPaint.uriName;
                                            }
                                            PricingService.detailPriceByPaint(
                                                selectedGradeId,
                                                selectedEnhancementPackMdmId,
                                                selectedTrim.id,
                                                selectedPaint.materialCode,
                                                visitor.postCode,
                                                pricingZone
                                            ).then(function success(data) {
                                                if (data.status === "Success") {
                                                    $scope.pricingResult(data.data.driveAway);
                                                    $scope.ffc.form.results.driveAwayPrice = data.data.driveAway;
                                                    $scope.ffc.form.results.paint = selectedPaint;
                                                    $scope.ffc.form.results.trim = selectedTrim;
                                                }
                                            }, function failure(data) {
                                                $scope.pricingResult(false);
                                                $rootScope.$broadcast('open-modal-window', {
                                                    content: $scope.ffc.form.settings.messages.apiError,
                                                    variant: Lexus.ModalVariant.Content,
                                                    closeOnEvent: 'close-modal-window',
                                                    wrapper: ["<p style='padding: 20px 65px 0px 20px; text-align: left'>", "</p>"]
                                                });
                                            });

                                        });
                                    });
                                });
                            });

                        } else {
                            PricingService.driveAwayByEnhancementPack(selectedGradeId, selectedEnhancementPackMdmId, visitor.postCode, pricingZone).then(function success(data) {
                                if (data.status === "Success") {
                                    if (data.data && data.data.driveAway) {
                                        $scope.pricingResult(data.data.driveAway);

                                        $scope.ffc.form.results.driveAwayPrice = data.data.driveAway;
                                        $scope.ffc.form.results.paint = data.data.paint;
                                        $scope.ffc.form.results.trim = data.data.trim;
                                    } else {
                                        $scope.pricingResult(0);
                                    }
                                }
                            }, function failure(data) {
                                $scope.pricingResult(false);
                                $rootScope.$broadcast('open-modal-window', {
                                    content: $scope.ffc.form.settings.messages.apiError,
                                    variant: Lexus.ModalVariant.Content,
                                    closeOnEvent: 'close-modal-window',
                                    wrapper: ["<p style='padding: 20px 65px 0px 20px; text-align: left'>", "</p>"]
                                });
                            });
                        }
                    } else if (newData.engineVariantAndGrade && $scope.ffc.formfields.data.enginevariantsandgrades) {


                        if (selectedGrade) {
                            var selectedGradeId = selectedGrade.gradeId;

                            PricingService.driveAwayByGrade(selectedGradeId, visitor.postCode, pricingZone).then(function success(data) {
                                if (data.status === "Success") {
                                    if (data.data && data.data.driveAway) {
                                        $scope.pricingResult(data.data.driveAway);

                                        $scope.ffc.form.results.driveAwayPrice = data.data.driveAway;
                                        $scope.ffc.form.results.paint = data.data.paint;
                                        $scope.ffc.form.results.trim = data.data.trim;
                                    } else {
                                        $scope.pricingResult(0);
                                    }
                                }
                            }, function failure(data) {

                                $scope.pricingResult(false);
                                $rootScope.$broadcast('open-modal-window', {
                                    content: $scope.ffc.form.settings.messages.apiError,
                                    variant: Lexus.ModalVariant.Content,
                                    closeOnEvent: 'close-modal-window',
                                    wrapper: ["<p style='padding: 20px 65px 0px 20px; text-align: left'>", "</p>"]
                                });
                            });
                        }
                    } else {
                        $scope.ffc.form.results.driveAwayPrice = 0;
                    }

                });

        });

        //Watches: driveAwayPrice, deposit, interestrate, loanterm, balloonpayment, loantype
        //Modifies: installmentPerWeek/PerMonth, finalBalloonPayment
        $scope.$watchGroup(['ffc.form.results.driveAwayPrice', 'ffc.form.data.deposit', 'ffc.form.data.interestrate', 'ffc.form.data.loanterm', 'ffc.form.data.balloonPayment', 'ffc.form.data.loantype'], function(newDataArray, oldDataArray, $scope) {
            var newData = {};
            newData.driveAwayPrice = newDataArray[0];
            newData.deposit = newDataArray[1];
            newData.interestrate = newDataArray[2];
            newData.loanterm = newDataArray[3];
            newData.balloonPayment = newDataArray[4];
            newData.loantype = newDataArray[5];

            if ($scope.delayedRecalc) {
                $timeout.cancel($scope.delayedRecalc);
            }
            if (newData.driveAwayPrice === 0) {
                $scope.ffc.form.results.installmentPerMonth = 0;
                $scope.ffc.form.results.installmentPerWeek = 0;
                $scope.ffc.form.results.finalBalloonPayment = 0;
                return;
            }
            if (newData.driveAwayPrice > 0 && newData.deposit && newData.interestrate && newData.loanterm && (newData.balloonPayment != null) && newData.loantype) {
                $scope.delayedRecalc = $timeout($scope.recalc, 500, true, newData);
            }
        });

        $scope.pricingResult = function(value) {
            var status = (typeof value == "number") ? (value != 0) : (typeof value == "boolean") ? value : false;
            if (status) {
                angular.element('body').removeClass('pricing-error');
            } else {
                angular.element('body').addClass('pricing-error');
            }

            $scope.pricingSuccess = status;

        }

        $scope.recalc = function(newData) {
            var interrestRate = $scope.ffc.form.data.interestrate;
            /// This is being added so we can Hack around the bad finance service.
            /// Personal loans for the L'Exhibition Campaign should show 1% but pass 0.00000000001 only for Personal
            /// Go check this ticket LDM-8
            if ($scope.ffc.form.data.interestRateOverride > 0 && $scope.ffc.form.data.loantype.toLowerCase() === 'personal') {
                interrestRate = $scope.ffc.form.data.interestRateOverride;
            }
            if ($scope.ffc.form.data.interestRateOverrideBusiness > 0 && $scope.ffc.form.data.loantype.toLowerCase() === 'business') {
                interrestRate = $scope.ffc.form.data.interestRateOverrideBusiness;
            }


            //temporary toString().replace() until deposit is fixed to always be an int
            $http({
                    method: 'GET',
                    url: $filter('formatArgs')(Lexus.API.Lookup.FinanceCalculator, [Lexus.ID.Site, $scope.ffc.form.results.driveAwayPrice, $scope.ffc.form.data.deposit.toString().replace(/,/g, ''), interrestRate, $scope.ffc.form.data.loanterm, $scope.ffc.form.data.balloonPayment, $scope.ffc.form.data.loantype])
                })
                .then(function successCallback(response) {

                    if (response.data.Status == "Success") {
                        $scope.ffc.form.results.installmentPerMonth = response.data.Data.InstallmentPerMonth;
                        $scope.ffc.form.results.installmentPerWeek = response.data.Data.InstallmentPerWeek;
                        $scope.ffc.form.results.finalBalloonPayment = response.data.Data.FinalBalloonPayment;
                        $scope.ffc.form.failed = false;
                    } else {
                        $rootScope.$broadcast('open-modal-window', {
                            content: response.data.ErrorMessage,
                            variant: Lexus.ModalVariant.Content,
                            closeOnEvent: 'close-modal-window',
                            wrapper: ["<p style='padding: 20px 65px 0px 20px; text-align: left'>", "</p>"]
                        });
                    }

                }, function errorCallback(error) {
                    $scope.ffc.form.failed = true;

                    $rootScope.$broadcast('open-modal-window', {
                        content: $scope.ffc.form.settings.messages.apiError,
                        variant: Lexus.ModalVariant.Content,
                        closeOnEvent: 'close-modal-window',
                        wrapper: ["<p style='padding: 20px 65px 0px 20px; text-align: left'>", "</p>"]
                    });

                });

        }

        $scope.openDealerQuoteForm = function(vehicleIndex) {
            $scope.ffc.form.completed = false;
            $scope.ffc.form.dealerquoteform.Show = true;

            $scope.createGenericMessage(vehicleIndex);
            $scope.searchDealersNow();

            //$("#additionalcomments").focus();

        }

        $scope.getDataRequestQuoteData = function() {

            var deposit = $scope.ffc.form.data.deposit.toString().replace(",", "");

            return {
                AdditionalComments: $scope.ffc.form.data.additionalcomments,
                Source: $scope.ffc.form.data.source,
                DealerId: $scope.ffc.form.data.dealerId,
                ContextDealerSiteId: $scope.forceDealerId,
                Message: $scope.ffc.form.data.messagedynamic,
                PostCode: $scope.ffc.form.data.postcode,
                Phone: $scope.ffc.form.data.phone,
                FirstName: $scope.ffc.form.data.firstname,
                LastName: $scope.ffc.form.data.lastname,
                Email: $scope.ffc.form.data.email,
                PreferredContactMethod: $scope.ffc.form.data.prefer,
                Subscribe: $scope.ffc.form.data.subscribe,
                PhoneType: $scope.ffc.form.data.phonetype,
                Captcha: $scope.ffc.form.data.captcha,
                Model: $scope.ffc.form.data.carmodel,
                EngineVariant: $scope.ffc.form.data.engineVariant,
                Grade: $scope.ffc.form.data.grade,
                EnhancementPack: $scope.ffc.form.data.enhancementPack,
                Paint: $scope.ffc.form.results ? $scope.ffc.form.results.paint.name : null,
                Trim: $scope.ffc.form.results ? $scope.ffc.form.results.trim.name : null,
                LoanType: $scope.ffc.form.data.loantype,
                InterestRate: $scope.ffc.form.data.interestrate,
                Deposit: deposit,
                LoanTerm: $scope.ffc.form.data.loanterm,
                BalloonPayment: $scope.ffc.form.data.balloonPayment,
                DriveAwayPrice: $scope.ffc.form.results.driveAwayPrice,
                MonthlyPayments: $scope.ffc.form.results.installmentPerMonth,
                FormUrl: ($scope.ffc.form.settings.disclaimerPage && $scope.ffc.form.settings.disclaimerPage != "" ? $scope.ffc.form.settings.disclaimerPage : $location.absUrl())
            };
        }

        $rootScope.$on('submit-finance-calculator-form', function() {
            $scope.ffc.form.submitting = true;

            var formData = $scope.getDataRequestQuoteData();

            eloquaService.attachEloquaFields(formData);

            //Code to be changed once actual client side validation is in place on finance form to refer to actual api
            $http({
                method: 'POST',
                url: $filter('formatArgs')(Lexus.API.FormSubmission.RequestDealerQuoteUrl, [Lexus.ID.Site]),
                data: formData
            }).
            then(function success(response) {

                    if (response.data.Status == "Success") {
                        $scope.submissionPass(response.data);
                    } else {
                        $scope.submissionFail(response.data);
                    }
                }, function error(response) {
                    $scope.submissionFail(response.data);
                })
                .finally(function() {
                    $rootScope.$broadcast('form-result');
                });
        });

        $scope.submissionPass = function(data) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.ffc.form.completed = true;
            $scope.ffc.form.failed = false;
            $scope.ffc.form.submitting = false;
            var historyState = "RequestDealerQuoteForm=Pass";
            $location.state(historyState);
            FormsService.ShowResult($scope.successContent[0]);
            $rootScope.$broadcast('gtm-form-success', 'Finance Calculator');
            $rootScope.$broadcast('visitor-details-session-change', $scope.getDataRequestQuoteData());
        };

        $scope.submissionFail = function(data) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.ffc.form.failed = true;
            $scope.ffc.form.errors = data.Data;
            $scope.ffc.form.submitting = false;
            $scope.ffc.form.completed = true;
            var historyState = "RequestDealerQuoteForm=Fail";
            $location.state(historyState);
            FormsService.ShowResult($scope.failureContent[0]);
            console.error(data.ErrorMessage);
        };


        $scope.email = function() {

        }

        $scope.calculateNext = function(interestrate, interestrateInc, highestinterestrate, lowestinterestrate, type, obj) {
            var currentRate = Number($scope.ffc.form.data.interestrate);
            var maxRate = Number(highestinterestrate);
            var minRate = Number(lowestinterestrate);
            var increment = Number(interestrateInc);
            var adjustedRate;
            if (type == 'Increase') {
                adjustedRate = $scope.roundToIncrement(currentRate + increment, increment);
                if (adjustedRate > maxRate) {
                    $scope.showInterestrateModal(lowestinterestrate, highestinterestrate)
                } else {
                    $scope.ffc.form.data.interestrate = adjustedRate.toFixed(2);
                }
            } else if (type == 'Decrease') {
                adjustedRate = $scope.roundToIncrement(currentRate - increment, increment);
                if (adjustedRate < minRate || adjustedRate <= 0) {
                    $scope.showInterestrateModal(lowestinterestrate, highestinterestrate)
                } else {
                    $scope.ffc.form.data.interestrate = adjustedRate.toFixed(2);
                }
            }

            $scope.formatNumberToDecimal($scope.ffc.form.data.interestrate, obj);

        }

        $scope.showInterestrateModal = function(lowestinterestrate, highestinterestrate) {
            $scope.$emit('open-modal-window', {
                content: 'Interest Rate should be between ' + lowestinterestrate + ' and ' + highestinterestrate + '',
                wrapper: ['<p class="lx-modal__paragraph">', '</p>']
            });
        }

        $scope.filterValue = function($event, val, type) { //Allow comma's ,dot and backspace
            var asciiVal = $event.keyCode || $event.charCode;
            if (isNaN(String.fromCharCode(asciiVal))) {
                if (asciiVal != 44 && asciiVal != 46 && asciiVal != 8) {
                    $event.preventDefault();
                }

                if (type == 'interestrate') {
                    if (asciiVal == 46) {
                        if ($("#interestRate").val().indexOf(".") != -1) {
                            $event.preventDefault();
                        }
                    }

                    if (asciiVal == 44) {
                        $event.preventDefault();
                    }
                }
            }

        }

        $scope.initDeposit = function(val, obj) {

            var formattedNum = Math.floor(Number(val.toString().replace(',', ''))).toLocaleString('en', {
                useGrouping: true
            });

            $scope.ffc.form.data.deposit = formattedNum;
        }

        $scope.validate = function(interestrate, interestrateInc, highestinterestrate, lowestinterestrate, obj) {
            var increment = Number(interestrateInc);
            var modifiedRate = $scope.roundToIncrement(Number($scope.ffc.form.data.interestrate), increment);
            var maxRate = Number(highestinterestrate);
            var minRate = Number(lowestinterestrate);


            if (modifiedRate > maxRate || modifiedRate < minRate || modifiedRate <= 0) {
                $scope.showInterestrateModal(lowestinterestrate, highestinterestrate)
            }

            if (modifiedRate > maxRate) {
                $scope.ffc.form.data.interestrate = maxRate.toFixed(2);
            } else if (modifiedRate < minRate || modifiedRate <= 0 + increment) {
                $scope.ffc.form.data.interestrate = Math.max(minRate, 0 + increment).toFixed(2);
            } else {
                $scope.ffc.form.data.interestrate = modifiedRate.toFixed(2);
            }
            $scope.formatNumberToDecimal($scope.ffc.form.data.interestrate, obj);
        }

        $scope.roundToIncrement = function(value, increment) {

            if (typeof(value) != "number" || typeof(increment) != "number") {
                throw new Error("Value is not of type \"number\"");
            }

            if (increment != 0) {
                var incRoundingFactor = 1 / increment;
                return (Math.round(value * incRoundingFactor) / incRoundingFactor);
            } else {
                return value;
            }
        }

        $scope.formatNumber = function(val, obj) {
            if (obj != null) {
                var value;
                if (obj[formName] != null && !isNaN(value = Number(val.toString().replace(/,/g, '')))) {
                    $scope.ffc.form.data.deposit = Math.floor(value).toLocaleString('en', {
                        useGrouping: true
                    });
                }
                if (obj[formName] != null)
                    $scope.ffc.form.data.deposit = $scope.ffc.form.data.deposit.replace('-', '');
            }
        }

        $scope.formatNumberToDecimal = function(val, obj) {
            if (obj != null) {
                if (obj[formName] != null && !isNaN(Number(val.replace(',', '')))) {
                    if (val.replace(',', '').indexOf('.') == -1)
                        $scope.ffc.form.data.interestrate = Number(val).toFixed(2);
                }
                if (obj[formName] != null)
                    $scope.ffc.form.data.interestrate = $scope.ffc.form.data.interestrate.replace('-', '');
            }

        }

        $scope.byAvailableGrades = function(engineVariantGrade) {
            return !$scope.ffc.form.settings.availableGrades || $scope.ffc.form.settings.availableGrades.includes(engineVariantGrade.mdmGradeId);
        };
    }
}

;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxFormsFinanceContact', ['$window', '$timeout', '$filter', '$http', '$location', function($window, $timeout, $filter, $http, $location) {
        var typeofForm = '';
        formsFinanceContactController.$inject = ['$scope', '$http', '$filter', '$timeout', '$window', '$interval', '$location', '$rootScope', 'AddressSuggestService', 'UserPreferencesService', 'vcRecaptchaService', 'FormsService', 'API'];
        return {
            scope: true,
            restrict: 'A',
            controller: formsFinanceContactController,
            controllerAs: 'ffc',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {
                scope.successContent = element.find('.lx-form-success');
                scope.failureContent = element.find('.lx-form-failure');
                typeofForm = attrs.lxFormsType;
            }
        };

        function formsFinanceContactController($scope, $http, $filter, $timeout, $window, $interval, $location, $rootScope, AddressSuggestService, UserPreferencesService, vcRecaptchaService, FormsService, API) {
            var fcu = this;

            $scope.init = function() {
                UserPreferencesService.getLexusVisitorSession().then(function(data) {

                    var visitorPreference = UserPreferencesService.getLexusVisitor();
                    $scope.ffc.form = {
                        submitting: false,
                        completed: false,
                        errors: false,
                        data: {
                            subscribe: false,
                            postcodes: [],
                            postcode: "",
                            email: data.Data.email,
                            phonetype: data.Data.phoneType && data.Data.phoneType != '' ? data.Data.phoneType : 'home',
                            firstname: data.Data.name,
                            lastname: data.Data.surname,
                            phone: data.Data.phone,
                            prefer: data.Data.preferredContactMethod ? data.Data.preferredContactMethod : 'email',
                            captcha: '',
                            requesttype: null
                        }
                    };

                    var visitorPreference = UserPreferencesService.getLexusVisitor();
                    if (visitorPreference && visitorPreference.postCode && visitorPreference.suburb && visitorPreference.state) {
                        $scope.ffc.form.data.postcodes.push(UserPreferencesService.getAutocompleteTagFromVisitor(visitorPreference));
                    }

                }, function(reason) {});
            }

            $scope.getData = function() {
                var visitor = UserPreferencesService.splitAutoCompleteResult($scope.ffc.form.data.postcodes[0].text);
                return {
                    Message: $scope.ffc.form.data.message,
                    FirstName: $scope.ffc.form.data.firstname,
                    LastName: $scope.ffc.form.data.lastname,
                    Email: $scope.ffc.form.data.email,
                    PostCode: visitor.postCode,
                    Phone: $scope.ffc.form.data.phone,
                    PhoneType: $scope.ffc.form.data.phonetype,
                    PreferredContactMethod: $scope.ffc.form.data.prefer,
                    Subscribe: $scope.ffc.form.data.subscribe.toString(),
                    Captcha: $scope.ffc.form.data.captcha,
                    RequestType: $scope.ffc.form.data.requesttype,
                };
            }



            $rootScope.$on('submit-financial-form', function() {

                $rootScope.$broadcast('visitor-details-cookie-change-autocomplete', $scope.ffc.form.data.postcodes[0].text);

                $scope.ffc.form.submitting = true;


                //Code to be changed once actual client side validation is in place on finance form to refer to actual api
                $http({
                    method: 'POST',
                    url: $filter('formatArgs')(Lexus.API.FormSubmission.FinanceContact, [Lexus.ID.Site]),
                    data: $scope.getData()
                }).
                then(function success(response) {
                        if (response.data.Status == "Success") {
                            $scope.submissionPass(response.data);
                        } else {
                            $scope.submissionFail(response.data);
                        }
                    }, function error(response) {
                        $scope.submissionFail(response.data);

                    })
                    .finally(function() {
                        $rootScope.$broadcast('form-result');
                    });
            });

            $scope.submissionPass = function(data) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.ffc.form.completed = true;
                $scope.ffc.form.failed = false;
                $scope.ffc.form.submitting = false;
                var historyState = "FinanceForm=Pass";
                $location.state(historyState);
                FormsService.ShowResult($scope.successContent[0]);
                $rootScope.$broadcast('gtm-form-success', 'Finance Contact');
                $rootScope.$broadcast('visitor-details-session-change', $scope.getData());
            }

            $scope.submissionFail = function(data) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.ffc.form.failed = true;
                $scope.ffc.form.errors = data.Data;
                $scope.ffc.form.submitting = false;
                $scope.ffc.form.completed = true;
                var historyState = "FinanceForm=Fail";
                $location.state(historyState);
                FormsService.ShowResult($scope.failureContent[0]);
                console.error(data.ErrorMessage);
            }

            //$scope.loadTags = function (query) {
            //    AddressSuggestService.setParam('term', query);
            //    return AddressSuggestService.GetResults();
            //};

            $scope.updatePostcode = function($tag) {
                $scope.ffc.form.data.postcodes = [];
                $scope.ffc.form.data.postcodes[0] = $tag;
            };

        }
    }]);;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxFormsInsuranceContact', ['$window', '$timeout', '$filter', '$http', '$location', function($window, $timeout, $filter, $http, $location) {
        var typeofForm = '';
        formsInsuranceContactController.$inject = ['$scope', '$http', '$filter', '$timeout', '$window', '$interval', '$location', '$rootScope', 'AddressSuggestService', 'UserPreferencesService', 'vcRecaptchaService', 'FormsService', 'API'];
        return {
            scope: true,
            restrict: 'A',
            controller: formsInsuranceContactController,
            controllerAs: 'ffc',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {
                scope.successContent = element.find('.lx-form-success');
                scope.failureContent = element.find('.lx-form-failure');
                typeofForm = attrs.lxFormsType;
            }
        };

        function formsInsuranceContactController($scope, $http, $filter, $timeout, $window, $interval, $location, $rootScope, AddressSuggestService, UserPreferencesService, vcRecaptchaService, FormsService, API) {
            var fcu = this;

            $scope.init = function() {
                UserPreferencesService.getLexusVisitorSession().then(function(data) {

                    var visitorPreference = UserPreferencesService.getLexusVisitor();
                    $scope.ffc.form = {
                        submitting: false,
                        completed: false,
                        errors: false,
                        data: {
                            subscribe: false,
                            postcodes: [],
                            postcode: "",
                            email: data.Data.email,
                            phonetype: data.Data.phoneType && data.Data.phoneType != '' ? data.Data.phoneType : 'home',
                            firstname: data.Data.name,
                            lastname: data.Data.surname,
                            phone: data.Data.phone,
                            prefer: data.Data.preferredContactMethod ? data.Data.preferredContactMethod : 'email',
                            captcha: '',
                            requesttype: null
                        }
                    };



                    var visitorPreference = UserPreferencesService.getLexusVisitor();
                    if (visitorPreference && visitorPreference.postCode && visitorPreference.suburb) {
                        $scope.ffc.form.data.postcodes.push({
                            text: visitorPreference.suburb + " " + visitorPreference.postCode
                        });
                    }

                }, function(reason) {});
            }

            $scope.getData = function() {
                var visitor = UserPreferencesService.splitAutoCompleteResult($scope.ffc.form.data.postcodes[0].text);
                return {
                    Message: $scope.ffc.form.data.message,
                    FirstName: $scope.ffc.form.data.firstname,
                    LastName: $scope.ffc.form.data.lastname,
                    Email: $scope.ffc.form.data.email,
                    PostCode: visitor.postCode,
                    Phone: $scope.ffc.form.data.phone,
                    PhoneType: $scope.ffc.form.data.phonetype,
                    PreferredContactMethod: $scope.ffc.form.data.prefer,
                    Subscribe: $scope.ffc.form.data.subscribe.toString(),
                    Captcha: $scope.ffc.form.data.captcha,
                    RequestType: $scope.ffc.form.data.requesttype,
                };
            }



            $rootScope.$on('submit-insurance-form', function() {

                $rootScope.$broadcast('visitor-details-cookie-change-autocomplete', $scope.ffc.form.data.postcodes[0].text);

                $scope.ffc.form.submitting = true;


                //Code to be changed once actual client side validation is in place on finance form to refer to actual api
                $http({
                    method: 'POST',
                    url: $filter('formatArgs')(Lexus.API.FormSubmission.InsuranceContact, [Lexus.ID.Site]),
                    data: $scope.getData()
                }).
                then(function success(response) {
                        if (response.data.Status == "Success") {
                            $scope.submissionPass(response.data);
                        } else {
                            $scope.submissionFail(response.data);
                        }
                    }, function error(response) {
                        $scope.submissionFail(response.data);
                    })
                    .finally(function() {
                        $rootScope.$broadcast('form-result');
                    });
            });

            $scope.submissionPass = function(data) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.ffc.form.completed = true;
                $scope.ffc.form.failed = false;
                $scope.ffc.form.submitting = false;
                var historyState = "InsuranceForm=Pass";
                $location.state(historyState);
                FormsService.ShowResult($scope.successContent[0]);
                $rootScope.$broadcast('gtm-form-success', 'Insurance Contact');
                $rootScope.$broadcast('visitor-details-session-change', $scope.getData());
            };
            $scope.submissionFail = function(data) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.ffc.form.failed = true;
                $scope.ffc.form.errors = data.Data;
                $scope.ffc.form.submitting = false;
                $scope.ffc.form.completed = true;
                var historyState = "InsuranceForm=Fail";
                $location.state(historyState);
                FormsService.ShowResult($scope.failureContent[0]);
                console.error(data.ErrorMessage);
            };

            $scope.updatePostcode = function($tag) {
                $scope.ffc.form.data.postcodes = [];
                $scope.ffc.form.data.postcodes[0] = $tag;
            };



        }
    }]);;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxFormsRegisterInterest', ['$window', '$timeout', '$filter', '$http', '$location', function($window, $timeout, $filter, $http, $location) {
        var formModel = '';
        var formDealerId = '';
        formsRegisterInterestController.$inject = ['$scope', '$http', '$filter', '$timeout', '$window', '$interval', '$location', '$rootScope', 'AddressSuggestService', 'UserPreferencesService', 'vcRecaptchaService', 'FormsService', 'EloquaService'];
        return {
            scope: true,
            restrict: 'A',
            controller: formsRegisterInterestController,
            controllerAs: 'ffc',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {
                scope.successContent = element.find('.lx-form-success');
                scope.failureContent = element.find('.lx-form-failure');
                formModel = attrs.lxFormsRegister;
                formDealerId = attrs.lxFormsDealerId;
            }
        };

        function formsRegisterInterestController($scope, $http, $filter, $timeout, $window, $interval, $location, $rootScope, AddressSuggestService, UserPreferencesService, vcRecaptchaService, FormsService, EloquaService) {
            var ffc = this;

            $scope.init = function() {
                UserPreferencesService.getLexusVisitorSession().then(function(data) {
                    data.Data = data.Data || {};
                    var visitorPreference = UserPreferencesService.getLexusVisitor();
                    $scope.ffc.form = {
                        submitting: false,
                        completed: false,
                        errors: false,
                        data: {
                            subscribe: false,
                            email: data.Data.email,
                            firstname: data.Data.name,
                            lastname: data.Data.surname,
                            phone: data.Data.phone,
                            daterange: '',
                            model: formModel,
                            vehicle: '',
                            dealerId: formDealerId,
                            captcha: '',
                            purchasedelay: null,
                            currentmake: null
                        }
                    };

                }, function(reason) {});
            }


            $scope.getData = function() {
                var t = {
                    Model: $scope.ffc.form.data.model,
                    FirstName: $scope.ffc.form.data.firstname,
                    LastName: $scope.ffc.form.data.lastname,
                    Email: $scope.ffc.form.data.email,
                    PlanToPurchase: $scope.ffc.form.data.purchasedelay,
                    Phone: $scope.ffc.form.data.phone,
                    VehicleTypeOwned: $scope.ffc.form.data.currentmake,
                    Subscribe: $scope.ffc.form.data.subscribe.toString(),
                    Captcha: $scope.ffc.form.data.captcha,
                    DealerId: $scope.ffc.form.data.dealerId,
                    //Leave alone this its to clear validation on the base type!
                    //Its on the base type as we remember the value in session
                    PhoneType: 'Not Specified'
                };
                return t;
            }


            $rootScope.$on('submit-register-interest-form', function() {

                $scope.ffc.form.submitting = true;
                //Code to be changed once actual client side validation is in place on finance form to refer to actual api
                var formData = $scope.getData();
                EloquaService.attachEloquaFields(formData);

                $http({
                    method: 'POST',
                    url: $filter('formatArgs')(Lexus.API.FormSubmission.FutureVehicleInterest, [Lexus.ID.Site]),
                    data: formData
                }).
                then(function success(response) {
                        if (response.data.Status == "Success") {
                            $scope.submissionPass(response.data);
                        } else {
                            $scope.submissionFail(response.data);
                        }
                    }, function error(response) {
                        $scope.submissionFail(response.data);
                    })
                    .finally(function() {
                        $rootScope.$broadcast('form-result');
                    });
            });


            $scope.submissionPass = function(data) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.ffc.form.completed = true;
                $scope.ffc.form.failed = false;
                $scope.ffc.form.submitting = false;
                var historyState = "RegisterInterestForm=Pass";
                $location.state(historyState);
                FormsService.ShowResult($scope.successContent[0]);
                $rootScope.$broadcast('gtm-form-success', 'Register Interest Form');
                $rootScope.$broadcast('visitor-details-session-change', $scope.getData());
            };
            $scope.submissionFail = function(data) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.ffc.form.failed = true;
                $scope.ffc.form.errors = data.Data;
                $scope.ffc.form.submitting = false;
                $scope.ffc.form.completed = true;
                var historyState = "RegisterInterestForm=Fail";
                $location.state(historyState);
                FormsService.ShowResult($scope.failureContent[0]);
                if (data.ErrorMessage)
                    console.error(data.ErrorMessage);
            };

        }
    }]);;
(function() {

    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .directive('lxFormsRequestBrochure', FormsRequestBrochureDirective);

    FormsRequestBrochureDirective.$inject = [
        "$filter", "$timeout", "$http", "$location", "API", "$rootScope",
        "UserPreferencesService", "FormsService", "EloquaService",
        "DealersService", "AddressSuggestService"
    ];

    function FormsRequestBrochureDirective($filter, $timeout, $http, $location, API, $rootScope,
        userPreferencesService, formsService, eloquaService,
        dealersService, addressSuggestService) {

        var brochureData;
        FormsRequestBrochureController.$inject = ['$scope'];
        return {
            scope: true,
            restrict: 'A',
            controller: FormsRequestBrochureController,
            controllerAs: 'ffc',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {
                scope.successContent = element.find('.lx-form-success');
                scope.failureContent = element.find('.lx-form-failure');

                brochureData = JSON.parse(attrs.brochureData);
            }
        };

        function FormsRequestBrochureController($scope) {

            function initialize() {

                var urlParameters = $location.search();

                userPreferencesService.getLexusVisitorSession().then(function success(data) {
                    var dataVehicle = userPreferencesService.getLexusVehicle(urlParameters);
                    var dataDealer = userPreferencesService.getLexusDealer(urlParameters);
                    var dataUser = userPreferencesService.getLexusVisitor(urlParameters);

                    $scope.ffc.form = {
                        submitting: false,
                        completed: false,
                        errors: false,
                        brochureUrl: null,
                        disableAddressValidation: true, //address fields hidden by default, so validation is disabled by default
                        dealerTagsLoading: false,
                        data: {
                            carmodel: dataVehicle.model,
                            brochureType: 'digital-brochure',
                            firstname: data.Data.name,
                            lastname: data.Data.surname,
                            address: data.Data.address,
                            postcodes: [],
                            dealerpostcodes: [],
                            postcode: dataUser.postCode,
                            pricingZone: dataUser.pricingZone,
                            suburb: dataUser.suburb,
                            state: dataUser.state,
                            email: data.Data.email,
                            phone: data.Data.phone,
                            purchasedelay: null,
                            currentmake: null,
                            subscribe: false,
                            captcha: '',
                            dealerId: dataDealer.dealerID,
                            dealerName: dataDealer.dealerName
                        }
                    };
                    if (dataUser.suburb && dataUser.postCode) {
                        $scope.ffc.form.data.dealerpostcodes.push({
                            text: dataUser.suburb + " " + dataUser.postCode
                        });
                        $scope.ffc.form.data.postcodes.push({
                            text: dataUser.suburb + " " + dataUser.postCode
                        });
                    }
                }, function failure(data) {
                    $scope.ffc.form = {
                        submitting: false,
                        completed: false,
                        errors: false,
                        brochureUrl: null,
                        disableAddressValidation: true,
                        data: {
                            carmodel: null,
                            brochureType: 'digital-brochure',
                            firstname: null,
                            lastname: null,
                            address: null,
                            postcodes: [],
                            postcode: null,
                            suburb: null,
                            state: null,
                            email: null,
                            phone: null,
                            purchasedelay: null,
                            currentmake: null,
                            subscribe: false,
                            captcha: ''
                        }
                    };
                }).finally(function() {
                    //Main Site
                    if ($scope.ffc.form.data.dealerpostcodes && $scope.ffc.form.data.dealerpostcodes.length > 0) {
                        searchNow();
                    }

                    //Dealer Site Multi Branch
                    if (brochureData.isDealerSite && brochureData.isMultiBranchDealership) {
                        $scope.ffc.form.data.dealerId = null;
                        $scope.ffc.form.data.dealerName = null;
                        loadBranches(brochureData.forceDealerId);
                    }

                    //Dealer Site NOT Multi Branch
                    if (brochureData.isDealerSite && !brochureData.isMultiBranchDealership) {
                        $scope.ffc.form.data.dealerId = brochureData.dealerCompositeID;
                        $scope.ffc.form.data.dealerName = null;
                    }

                    if ($scope.ffc.form.data.carmodel) {
                        $rootScope.$broadcast('field-car-model-update-selected');
                    }
                });

                $scope.updateBrochureType();

            }

            function loadBranches(dealerID) {
                $scope.ffc.form.dealersLoading = true;
                dealersService.setParam('dealerID', dealerID);
                dealersService.setParam('type', 'Sales');
                dealersService.GetDealerBranches();
            }

            $scope.$on('dealer-search-results-received', function(event, data) {
                $scope.ffc.form.dealersLoading = false;
                $scope.ffc.form.dealers = data.Data;

                var result = findDealer($scope.ffc.form.data.dealerId);

                if (!result) {
                    $scope.ffc.form.data.dealerId = null;
                }

                if ($scope.ffc.form.dealers.length == 1)
                    $scope.ffc.form.data.dealerId = $scope.ffc.form.dealers[0].dealerCode;
            });

            function findDealer(dealerCode) {
                return $scope.ffc.form.dealers.find(function(dealer) {
                    return dealer.dealerCode == dealerCode;
                });
            }

            $scope.deselectDealer = function() {
                $scope.ffc.form.data.dealerId = $scope.ffc.form.data.dealerName = null;
            }

            $scope.selectDealer = function(dealerInputId) {
                var scrollPos = $(document).scrollTop();
                var maxPos = $('#' + dealerInputId).parents('.lx-form__find-dealer-js').offset().top;
                if (scrollPos > maxPos) {
                    TweenLite.to(window, 0.5, {
                        scrollTo: {
                            y: maxPos
                        },
                        ease: Power2.easeOut
                    });
                }
            }

            $scope.dealerSearch = function($tag) {
                $scope.ffc.form.dealersLoading = true;

                //Main Site
                if ($scope.ffc.form.data.dealerpostcodes && $scope.ffc.form.data.dealerpostcodes.length > 0 && !$scope.isDealerSite) {
                    searchNow();
                }

                //Dealer Site Multi Branch
                if (brochureData.isDealerSite && brochureData.isMultiBranchDealership) {
                    $scope.ffc.form.data.dealerId = null;
                    $scope.ffc.form.data.dealerName = null;
                    loadBranches(brochureData.forceDealerId);
                }

                //Dealer Site NOT Multi Branch
                if (brochureData.isDealerSite && !brochureData.isMultiBranchDealership && brochureData.dealerState) {
                    dealersService.setParam('dealerID', brochureData.forceDealerId);
                    dealersService.setParam('dealerState', brochureData.dealerState);
                    dealersService.setParam('type', 'Sales');
                    dealersService.GetResult();
                }
            }

            $scope.$on('dealer-search-result-received', function(event, data) {
                $scope.ffc.form.dealersLoading = false;
                $scope.ffc.form.dealer = data.Data;
                $scope.ffc.form.dealerlocations = data.Data.locations;

                if ($scope.ffc.form.dealerlocations == null) {
                    $scope.ffc.form.dealerlocations = [];
                }
                //Multiple dealers for same dealerId - A bug to be corrected latter -wont require looping in that case on parent
                if (data.Data) {
                    angular.forEach(data.Data, function(val) {
                        //console.log(val.locations);
                        if (val) {
                            angular.forEach(val.locations, function(innerval) {
                                console.log(innerval);
                                this.push(innerval);
                            }, $scope.ffc.form.dealerlocations);
                        }
                    });
                }

                if ($scope.ffc.form.dealerlocations.length == 1)
                    $scope.ffc.form.data.locationId = $scope.ffc.form.dealerlocations[0].locationId;
            });

            $scope.updateBrochureType = function() {
                if ($scope.ffc && $scope.ffc.form && $scope.ffc.form.data && $scope.ffc.form.data.brochureType) {
                    $scope.ffc.form.disableAddressValidation = ($scope.ffc.form.data.brochureType == "digital-brochure");
                }
            }

            $scope.minTags = function() {
                if ($scope.ffc && $scope.ffc.form && $scope.ffc.form.disableAddressValidation) {
                    return $scope.ffc.form.disableAddressValidation ? '0' : '1';
                }
                return '1';
            }

            $scope.clearDealerPostcode = function() {
                $scope.ffc.form.data.dealerpostcodes = null;
            }

            $scope.clearPostcode = function() {
                $scope.ffc.form.data.postcodes = null;
            }

            $scope.updateDealerPostcode = function($tag) {
                $scope.ffc.form.data.dealerpostcodes = [];
                $scope.ffc.form.data.dealerpostcodes[0] = $tag;

                $scope.dealerSearch($tag);

                if (!$scope.ffc.form.data.postcode) {
                    $scope.ffc.form.data.postcodes = [];
                    $scope.ffc.form.data.postcodes.push({
                        text: $tag.data.suburb + " " + $tag.data.postcode
                    });
                    $scope.ffc.form.data.postcode = $tag.data.postcode;
                    $scope.ffc.form.data.suburb = $tag.data.suburb;
                    $scope.ffc.form.data.state = $tag.data.state;
                    $scope.ffc.form.data.pricingZone = $tag.data.pricingZone;

                    $rootScope.$broadcast('visitor-details-cookie-change', {
                        postCode: $tag.data.postcode,
                        suburb: $tag.data.suburb,
                        state: $tag.data.state,
                        pricingZone: $tag.data.pricingZone
                    });
                }
            }

            $scope.updatePostcode = function($tag) {
                $scope.ffc.form.data.postcodes = [];
                $scope.ffc.form.data.postcodes[0] = $tag;

                $scope.ffc.form.data.postcode = $tag.data.postcode;
                $scope.ffc.form.data.suburb = $tag.data.suburb;
                $scope.ffc.form.data.state = $tag.data.state;
                $scope.ffc.form.data.pricingZone = $tag.data.pricingZone;

                $rootScope.$broadcast('visitor-details-cookie-change', {
                    postCode: $tag.data.postcode,
                    suburb: $tag.data.suburb,
                    state: $tag.data.state,
                    pricingZone: $tag.data.pricingZone
                });
            }

            function searchNow() {
                $scope.ffc.form.dealersLoading = true;

                var visitor = userPreferencesService.splitAutoCompleteResult($scope.ffc.form.data.dealerpostcodes[0].text);

                dealersService.setParam('postCode', visitor.postCode);
                dealersService.setParam('suburb', visitor.suburb);
                dealersService.setParam('type', 'Sales');

                dealersService.GetResults();
            }

            function getFormData() {

                var result = {
                    Model: $scope.ffc.form.data.carmodel,
                    DealerId: $scope.ffc.form.data.dealerId,
                    ContextDealerSiteId: brochureData.forceDealerId,
                    FirstName: $scope.ffc.form.data.firstname,
                    LastName: $scope.ffc.form.data.lastname,
                    BrochureType: $scope.ffc.form.data.brochureType,
                    Address: $scope.ffc.form.data.address,
                    Postcode: $scope.ffc.form.data.postcode,
                    State: $scope.ffc.form.data.state,
                    Suburb: $scope.ffc.form.data.suburb,
                    Email: $scope.ffc.form.data.email,
                    Phone: $scope.ffc.form.data.phone,
                    PlanToPurchase: $scope.ffc.form.data.purchasedelay,
                    VehicleTypeOwned: $scope.ffc.form.data.currentmake,
                    Captcha: $scope.ffc.form.data.captcha,
                    Subscribe: $scope.ffc.form.data.subscribe
                }
                return result;
            };

            $rootScope.$on('vehicle-preference-change', function(event, data) {
                $scope.ffc.form.data.carmodel = data.model;
            });

            $rootScope.$on('submit-request-brochure-form', function(event, data) {
                var formData = getFormData();

                eloquaService.attachEloquaFields(formData);

                $http({
                        method: 'POST',
                        url: $filter('formatArgs')(Lexus.API.FormSubmission.RequestBrochure, [Lexus.ID.Site]),
                        data: formData
                    })
                    .then(function success(response) {
                        if (response.data.Status == "Success") {
                            submissionPass(response.data);
                            $rootScope.$broadcast('gtm-form-success', 'Request Brochure');
                        } else {
                            submissionFail(response.data);
                        }
                    }, function error(response) {
                        submissionFail(response.data);
                    })
                    .finally(function() {
                        $rootScope.$broadcast('form-result');
                    });
            });


            function submissionPass(data) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.ffc.form.brochureUrl = data.Data.BrochureUrl;
                $scope.ffc.form.completed = true;
                $scope.ffc.form.failed = false;
                $scope.ffc.form.submitting = false;
                var historyState = "RequestBrochureForm=Pass";
                $location.state(historyState);
                formsService.ShowResult($scope.successContent[0]);
                $rootScope.$broadcast('visitor-details-session-change', getFormData());
            };

            function submissionFail(data) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.ffc.form.failed = true;
                $scope.ffc.form.errors = data.Data;
                $scope.ffc.form.submitting = false;
                $scope.ffc.form.completed = true;
                var historyState = "RequestBrochureForm=Fail";
                $location.state(historyState);
                formsService.ShowResult($scope.failureContent[0]);
                console.error(data.ErrorMessage);
            };

            $scope.loadDealerTags = function(query) {
                $scope.ffc.form.dealerTagsLoading = true;
                addressSuggestService.setParam('term', query);

                var results = addressSuggestService.GetResults(function() {
                    $scope.ffc.form.dealerTagsLoading = false;
                });

                return results;
            };

            initialize();
        }
    }

}());

;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxFormsSubscribeNewsLetter', ['$window', '$timeout', '$filter', '$http', '$location', function($window, $timeout, $filter, $http, $location) {
        var formDealerId = '';
        formsSubscribeNewsLetterController.$inject = ['$scope', '$http', '$filter', '$timeout', '$window', '$interval', '$location', '$rootScope', 'AddressSuggestService', 'UserPreferencesService', 'vcRecaptchaService', 'FormsService'];
        return {
            scope: true,
            restrict: 'A',
            controller: formsSubscribeNewsLetterController,
            controllerAs: 'ffc',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {
                scope.successContent = element.find('.lx-form-success');
                scope.failureContent = element.find('.lx-form-failure');
            }
        };

        function formsSubscribeNewsLetterController($scope, $http, $filter, $timeout, $window, $interval, $location, $rootScope, AddressSuggestService, UserPreferencesService, vcRecaptchaService, FormsService) {
            var ffc = this;

            $scope.init = function() {

                UserPreferencesService.getLexusVisitorSession().then(function(data) {

                    var dataUser = UserPreferencesService.getLexusVisitor();
                    $scope.ffc.form = {
                        submitting: false,
                        completed: false,
                        errors: false,
                        data: {
                            subscribe: false,
                            email: data.Data.email,
                            firstname: data.Data.name,
                            lastname: data.Data.surname,
                            phone: data.Data.phone,
                            captcha: ''
                        }
                    };


                }, function failure(data) {
                    $scope.ffc.form = {
                        submitting: false,
                        completed: false,
                        errors: false,
                        data: {
                            subscribe: false,
                            email: null,
                            firstname: null,
                            lastname: null,
                            phone: null,
                            captcha: ''
                        }
                    };
                }).finally(function() {

                });
            }


            $scope.getData = function() {
                var t = {
                    FirstName: $scope.ffc.form.data.firstname,
                    LastName: $scope.ffc.form.data.lastname,
                    Email: $scope.ffc.form.data.email,
                    Phone: $scope.ffc.form.data.phone,
                    Subscribe: $scope.ffc.form.data.subscribe.toString(),
                    Captcha: $scope.ffc.form.data.captcha,
                    //Leave alone this its to clear validation on the base type!
                    //Its on the base type as we remember the value in session
                    PhoneType: 'Not Specified'
                };
                return t;
            }


            $rootScope.$on('submit-subscribe-newsletter-form', function() {
                $scope.ffc.form.submitting = true;

                $http({
                    method: 'POST',
                    url: $filter('formatArgs')(Lexus.API.FormSubmission.SubscribeNewsletterUrl, [Lexus.ID.Site]),
                    data: $scope.getData()
                }).
                then(function success(response) {
                        if (response.data.Status == "Success") {
                            $scope.submissionPass(response.data);
                        } else {
                            $scope.submissionFail(response.data);
                        }
                    }, function error(response) {
                        $scope.submissionFail(response.data);
                    })
                    .finally(function() {
                        $rootScope.$broadcast('form-result');
                    });
            });

            $scope.submissionPass = function(data) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.ffc.form.completed = true;
                $scope.ffc.form.failed = false;
                $scope.ffc.form.submitting = false;
                var historyState = "SubscribeNewsLetterForm=Pass";
                $location.state(historyState);
                FormsService.ShowResult($scope.successContent[0]);
                $rootScope.$broadcast('gtm-form-success', 'Subscribe Newsletter Form');
                $rootScope.$broadcast('visitor-details-session-change', $scope.getData());
            };

            $scope.submissionFail = function(data) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.ffc.form.failed = true;
                $scope.ffc.form.errors = data.Data;
                $scope.ffc.form.submitting = false;
                $scope.ffc.form.completed = true;
                var historyState = "SubscribeNewsLetterForm=Fail";
                $location.state(historyState);
                FormsService.ShowResult($scope.failureContent[0]);
                console.error(data.ErrorMessage);
            };

        }
    }]);;
(function() {
    "use strict";

    /* Directives */
    angular.module('Lexus.Directives')
        .directive("lxFormsTestDriveConcierge", TestDriveConciergeDirective);

    TestDriveConciergeDirective.$inject = [
        "$filter", "$http", "$location", "API", "$rootScope", "DealersService",
        "AddressSuggestService", "UserPreferencesService", "FormsService", "EloquaService"
    ];

    function TestDriveConciergeDirective($filter, $http, $location, API, $rootScope, DealersService,
        AddressSuggestService, UserPreferencesService, FormsService, EloquaService) {
        FormsTestDriveConciergeController.$inject = ['$scope'];
        return {
            scope: true,
            restrict: 'A',
            controller: FormsTestDriveConciergeController,
            controllerAs: 'ffc',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {
                scope.successContent = element.find('.lx-form-success');
                scope.failureContent = element.find('.lx-form-failure');
            }
        };

        function FormsTestDriveConciergeController($scope) {
            var ftd = this;
            $scope.ffc.urlParameters = $location.search();

            $scope.init = function(forceDealerId, dealerCompositeID, isDealerSite, isMultiBranchDealer) {
                UserPreferencesService.getLexusVisitorSession().then(function success(data) {
                    var dataVehicle = UserPreferencesService.getLexusVehicle($scope.ffc.urlParameters);
                    var dataDealer = UserPreferencesService.getLexusDealer($scope.ffc.urlParameters);
                    var dataUser = UserPreferencesService.getLexusVisitor($scope.ffc.urlParameters);
                    $scope.ffc.form = {
                        submitting: false,
                        completed: false,
                        errors: false,
                        dealers: [],
                        data: {
                            postcodes: [],
                            carmodel: dataVehicle.model,
                            grade: dataVehicle.grade,
                            enginevariant: dataVehicle.engineVariant,
                            contextDealerSiteId: forceDealerId,
                            subscribe: false,
                            postcode: "",
                            email: data.Data.email,
                            phonetype: data.Data.phoneType ? data.Data.phoneType : 'home',
                            firstname: data.Data.name,
                            lastname: data.Data.surname,
                            phone: data.Data.phone,
                            prefer: data.Data.preferredContactMethod ? data.Data.preferredContactMethod : 'email',
                            captcha: '',
                            dealerId: dataDealer.dealerID,
                            dealerName: dataDealer.dealerName,
                            preferredlocation: 'home',
                            purchasedelay: null,
                            currentmake: null
                        }
                    };
                    if (dataUser.suburb && dataUser.postCode) {
                        $scope.ffc.form.data.postcodes.push({
                            text: dataUser.suburb + " " + dataUser.postCode,
                            data: {
                                postCode: dataUser.postCode,
                                suburb: dataUser.suburb
                            }
                        });
                    }
                }, function failure(data) {
                    $scope.ffc.form = {
                        submitting: false,
                        completed: false,
                        errors: false,
                        dealers: [],
                        data: {
                            postcodes: [],
                            carmodel: null,
                            grade: null,
                            subscribe: false,
                            postcode: "",
                            email: null,
                            phonetype: 'home',
                            firstname: null,
                            lastname: null,
                            phone: null,
                            prefer: 'email',
                            captcha: '',
                            dealerId: null,
                            dealerName: null,
                            preferredlocation: 'home',
                            purchasedelay: null,
                            currentmake: null
                        }
                    };
                }).finally(function() {
                    if ($scope.ffc.form.data.carmodel) {
                        $rootScope.$broadcast('field-car-model-engine-variant-update-selected');
                    }

                    //Main Site
                    if ($scope.ffc.form.data.postcodes && $scope.ffc.form.data.postcodes.length > 0 && !isDealerSite) {
                        $scope.searchNow();
                    }

                    //Dealer Site Multi Branch
                    if (isDealerSite && isMultiBranchDealer) {
                        $scope.ffc.form.data.dealerId = null;
                        $scope.ffc.form.data.dealerName = null;
                        $scope.loadBranches(forceDealerId);
                    }

                    //Dealer Site NOT Multi Branch
                    if (isDealerSite && !isMultiBranchDealer) {
                        $scope.ffc.form.data.dealerId = dealerCompositeID;
                        $scope.ffc.form.data.dealerName = null;
                    }

                });


            }


            //$scope.loadTags = function (query) {
            //    AddressSuggestService.setParam('term', query);
            //    return AddressSuggestService.GetResults();
            //};

            $scope.deselectDealer = function() {
                $scope.ffc.form.data.dealerName = null;
            }

            $scope.selectDealer = function(dealerInputId) {
                var scrollPos = $(document).scrollTop();
                var maxPos = $('#' + dealerInputId).parents('.lx-form__find-dealer-js').offset().top;
                if (scrollPos > maxPos) {
                    TweenLite.to(window, 0.5, {
                        scrollTo: {
                            y: maxPos
                        },
                        ease: Power2.easeOut
                    });
                }
                try {
                    var code = dealerInputId.replace('option-', '');
                    $scope.ffc.form.data.dealerName = $scope.ffc.form.dealers.find(function(dealer) {
                        return dealer.dealerCode == code;
                    }).dealerName;
                } catch (ex) {
                    (console.error || console.log)(ex);
                }
            }

            $scope.loadBranches = function(dealerID) {
                DealersService.setParam('dealerID', dealerID);
                DealersService.setParam('type', 'Sales');
                DealersService.GetDealerBranches();
            }

            $scope.dealerSearch = function($tag) {
                $scope.ffc.form.data.postcodes = [];
                $scope.ffc.form.data.postcodes[0] = $tag;
                $scope.searchNow();
            }

            $scope.searchNow = function() {
                $scope.ffc.form.dealersLoading = true;
                $rootScope.$broadcast('visitor-details-change-autocomplete', $scope.ffc.form.data.postcodes[0].data);
                DealersService.setParam('postCode', $scope.ffc.form.data.postcodes[0].data.postCode); //Dummy Implementation needs to be changed
                DealersService.setParam('suburb', $scope.ffc.form.data.postcodes[0].data.suburb); //Dummy Implementation needs to be changed
                DealersService.setParam('type', 'Sales');
                DealersService.GetResults();

            }

            $rootScope.$on('vehicle-preference-change', function(event, data) {
                $scope.ffc.form.data.carmodel = data.model;
                $scope.ffc.form.data.enginevariant = data.engineVariant;
            });

            $scope.$on('dealer-search-results-received', function(event, data) {
                $scope.ffc.form.dealersLoading = false;
                $scope.ffc.form.dealers = data.Data;
                $scope.checkDealersLoaded();
            });

            //Do a sanity check to see if the bound dealers match the forceDealer if not clear the force dealer
            $scope.checkDealersLoaded = function() {
                var result = $scope.ffc.form.dealers.find(function(dealer) {
                    return dealer.dealerCode == $scope.ffc.form.data.dealerId;
                });
                if (!result) {
                    $scope.ffc.form.data.dealerId = null;
                }

                if ($scope.ffc.form.dealers.length == 1)
                    $scope.ffc.form.data.dealerId = $scope.ffc.form.dealers[0].dealerCode;
            }


            $scope.getData = function() {
                var utmParameters = UserPreferencesService.getUtmParameters();
                var postcode = null;
                if ($scope.ffc.form.data.postcodes.length > 0 && $scope.ffc.form.data.postcodes[0].text) {
                    postcode = parseInt($scope.ffc.form.data.postcodes[0].text.split(' ').reverse()[0]);
                }
                return {
                    FirstName: $scope.ffc.form.data.firstname,
                    LastName: $scope.ffc.form.data.lastname,
                    Email: $scope.ffc.form.data.email,
                    Phone: $scope.ffc.form.data.phone,
                    PreferredContactMethod: $scope.ffc.form.data.prefer,
                    Model: $scope.ffc.form.data.carmodel,
                    Grade: $scope.ffc.form.data.grade,
                    EngineVariant: $scope.ffc.form.data.enginevariant,
                    ContextDealerSiteId: $scope.ffc.form.data.contextDealerSiteId,
                    DealerId: $scope.ffc.form.data.dealerId,
                    Subscribe: $scope.ffc.form.data.subscribe.toString(),
                    Captcha: $scope.ffc.form.data.captcha,
                    PreferredLocation: $scope.ffc.form.data.preferredlocation,
                    PlanToPurchase: $scope.ffc.form.data.purchasedelay,
                    VehicleTypeOwned: $scope.ffc.form.data.currentmake,
                    //Leave alone this its to clear validation on the base type!
                    //Its on the base type as we remember the value in session
                    PhoneType: 'Not Specified',
                    UtmSource: utmParameters.source,
                    UtmMedium: utmParameters.medium,
                    UtmCampaign: utmParameters.campaign,
                    UtmContent: utmParameters.content,
                    Postcode: postcode,
                    DealerName: $scope.ffc.form.data.dealerName
                };
            }

            $rootScope.$on('submit-test-drive-concierage-form', function() {
                var formData = $scope.getData();

                EloquaService.attachEloquaFields(formData);

                $scope.ffc.form.submitting = true;
                //Code to be changed once actual client side validation is in place on finance form to refer to actual api
                $http({
                        method: 'POST',
                        url: $filter('formatArgs')(Lexus.API.FormSubmission.TestDriveConcierge, [Lexus.ID.Site]),
                        data: formData
                    })
                    .then(function success(response) {
                        if (response.data.Status == "Success") {
                            $scope.submissionPass(response.data);
                        } else {
                            $scope.submissionFail(response.data);
                        }
                    }, function error(response) {
                        $scope.submissionFail(response.data);
                    })
                    .finally(function() {
                        $rootScope.$broadcast('form-result');
                    });
            });

            $scope.submissionPass = function(data) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.ffc.form.completed = true;
                $scope.ffc.form.failed = false;
                $scope.ffc.form.submitting = false;
                var historyState = "ConcierageTestDriveForm=Pass";
                $location.state(historyState);
                FormsService.ShowResult($scope.successContent[0]);
                $rootScope.$broadcast('gtm-form-success', 'Test Drive Concierge');
                $rootScope.$broadcast('visitor-details-session-change', $scope.getData());
            };
            $scope.submissionFail = function(data) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.ffc.form.failed = true;
                $scope.ffc.form.errors = data.Data;
                $scope.ffc.form.submitting = false;
                $scope.ffc.form.completed = true;
                var historyState = "ConcierageTestDriveForm=Fail";
                $location.state(historyState);
                FormsService.ShowResult($scope.failureContent[0]);
                console.error(data.ErrorMessage);
            };
        }
    }


}());

;
(function() {

    "use strict";

    angular.module('Lexus.Directives')
        .directive('lxFormsTestDrivePreLaunch', FormsTestDrivePreLaunchDirective);

    FormsTestDrivePreLaunchDirective.$inject = [
        "$filter", "$http", "$location", "API", "$rootScope", "DealersService",
        "AddressSuggestService", "UserPreferencesService", "FormsService", "EloquaService"
    ];

    function FormsTestDrivePreLaunchDirective($filter, $http, $location, API, $rootScope, DealersService,
        AddressSuggestService, UserPreferencesService, FormsService, EloquaService) {

        var formFutureModel = '';
        FormsTestDrivePreLaunchController.$inject = ['$scope'];
        return {
            scope: true,
            restrict: 'A',
            controller: FormsTestDrivePreLaunchController,
            controllerAs: 'ffc',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {
                scope.successContent = element.find('.lx-form-success');
                scope.failureContent = element.find('.lx-form-failure');
                formFutureModel = attrs.lxFormsFutureModel;
            }
        };

        function FormsTestDrivePreLaunchController($scope) {
            var ftd = this;
            $scope.ffc.urlParameters = $location.search();

            $scope.init = function(forceDealerId, dealerCompositeID, isDealerSite, isMultiBranchDealer) {
                UserPreferencesService.getLexusVisitorSession().then(function success(data) {
                    //var dataVehicle = UserPreferencesService.getLexusVehicle($scope.ffc.urlParameters);  Wont be passed from URL or cookies for future vehicles
                    var dataDealer = UserPreferencesService.getLexusDealer($scope.ffc.urlParameters);
                    var dataUser = UserPreferencesService.getLexusVisitor($scope.ffc.urlParameters);
                    $scope.ffc.form = {
                        submitting: false,
                        completed: false,
                        errors: false,
                        dealers: [],
                        data: {
                            postcodes: [],
                            carmodel: formFutureModel,
                            subscribe: false,
                            postcode: "",
                            email: data.Data.email,
                            phonetype: data.Data.phoneType ? data.Data.phoneType : 'home',
                            firstname: data.Data.name,
                            lastname: data.Data.surname,
                            phone: data.Data.phone,
                            prefer: data.Data.preferredContactMethod ? data.Data.preferredContactMethod : 'email',
                            captcha: '',
                            contextDealerSiteId: forceDealerId,
                            dealerId: dataDealer.dealerID,
                            dealerName: dataDealer.dealerName,
                            preferredlocation: 'home',
                            purchasedelay: null,
                            currentmake: null
                        }
                    };
                    if (dataUser.suburb && dataUser.postCode) {
                        $scope.ffc.form.data.postcodes.push({
                            text: dataUser.suburb + " " + dataUser.postCode,
                            data: {
                                postCode: dataUser.postCode,
                                suburb: dataUser.suburb
                            }
                        });
                    }
                }, function failure(data) {
                    $scope.ffc.form = {
                        submitting: false,
                        completed: false,
                        errors: false,
                        dealers: [],
                        data: {
                            postcodes: [],
                            carmodel: formFutureModel,
                            subscribe: false,
                            postcode: "",
                            email: null,
                            phonetype: 'home',
                            firstname: null,
                            lastname: null,
                            phone: null,
                            prefer: 'email',
                            captcha: '',
                            dealerId: null,
                            dealerName: null,
                            preferredlocation: 'home',
                            purchasedelay: null,
                            currentmake: null
                        }
                    };
                }).finally(function() {
                    //Main Site
                    if ($scope.ffc.form.data.postcodes && $scope.ffc.form.data.postcodes.length > 0 && !isDealerSite) {
                        $scope.searchNow();
                    }

                    //Dealer Site Multi Branch
                    if (isDealerSite && isMultiBranchDealer) {
                        $scope.ffc.form.data.dealerId = null;
                        $scope.ffc.form.data.dealerName = null;
                        $scope.loadBranches(forceDealerId);
                    }

                    //Dealer Site NOT Multi Branch
                    if (isDealerSite && !isMultiBranchDealer) {
                        $scope.ffc.form.data.dealerId = dealerCompositeID;
                        $scope.ffc.form.data.dealerName = null;
                    }

                });
            }

            //$scope.loadTags = function (query) {
            //    AddressSuggestService.setParam('term', query);
            //    return AddressSuggestService.GetResults();
            //};

            $scope.deselectDealer = function() {
                $scope.ffc.form.data.dealerName = null;
            }

            $scope.selectDealer = function(dealerInputId) {
                var scrollPos = $(document).scrollTop();
                var maxPos = $('#' + dealerInputId).parents('.lx-form__find-dealer-js').offset().top;
                if (scrollPos > maxPos) {
                    TweenLite.to(window, 0.5, {
                        scrollTo: {
                            y: maxPos
                        },
                        ease: Power2.easeOut
                    });
                }
                try {
                    var code = dealerInputId.replace('option-', '');
                    $scope.ffc.form.data.dealerName = $scope.ffc.form.dealers.find(function(dealer) {
                        return dealer.dealerCode == code;
                    }).dealerName;
                } catch (ex) {
                    (console.error || console.log)(ex);
                }
            }

            $scope.loadBranches = function(dealerID) {
                DealersService.setParam('dealerID', dealerID);
                DealersService.setParam('type', 'Sales');
                DealersService.GetDealerBranches();
            }

            $scope.dealerSearch = function($tag) {
                $scope.ffc.form.data.postcodes = [];
                $scope.ffc.form.data.postcodes[0] = $tag;
                $scope.searchNow();
            }

            $scope.searchNow = function() {
                $scope.ffc.form.dealersLoading = true;
                $rootScope.$broadcast('visitor-details-change-autocomplete', $scope.ffc.form.data.postcodes[0].data);
                DealersService.setParam('postCode', $scope.ffc.form.data.postcodes[0].data.postCode); //Dummy Implementation needs to be changed
                DealersService.setParam('suburb', $scope.ffc.form.data.postcodes[0].data.suburb); //Dummy Implementation needs to be changed
                DealersService.setParam('type', 'Sales');
                DealersService.GetResults();

            }

            $scope.$on('dealer-search-results-received', function(event, data) {
                $scope.ffc.form.dealersLoading = false;
                $scope.ffc.form.dealers = data.Data;
                $scope.checkDealersLoaded();
            });

            //Do a sanity check to see if the bound dealers match the forceDealer if not clear the force dealer
            $scope.checkDealersLoaded = function() {
                var result = $scope.ffc.form.dealers.find(function(dealer) {
                    return dealer.dealerCode == $scope.ffc.form.data.dealerId;
                });
                if (!result) {
                    $scope.ffc.form.data.dealerId = null;
                }

                if ($scope.ffc.form.dealers.length == 1)
                    $scope.ffc.form.data.dealerId = $scope.ffc.form.dealers[0].dealerCode;
            }


            $scope.getData = function() {
                var utmParameters = UserPreferencesService.getUtmParameters();
                var postcode = null;
                if ($scope.ffc.form.data.postcodes.length > 0 && $scope.ffc.form.data.postcodes[0].text) {
                    postcode = parseInt($scope.ffc.form.data.postcodes[0].text.split(' ').reverse()[0]);
                }
                return {
                    FirstName: $scope.ffc.form.data.firstname,
                    LastName: $scope.ffc.form.data.lastname,
                    Email: $scope.ffc.form.data.email,
                    Phone: $scope.ffc.form.data.phone,
                    PreferredContactMethod: $scope.ffc.form.data.prefer,
                    Model: formFutureModel,
                    DealerId: $scope.ffc.form.data.dealerId,
                    ContextDealerSiteId: $scope.ffc.form.data.contextDealerSiteId,
                    Subscribe: $scope.ffc.form.data.subscribe.toString(),
                    Captcha: $scope.ffc.form.data.captcha,
                    PlanToPurchase: $scope.ffc.form.data.purchasedelay,
                    VehicleTypeOwned: $scope.ffc.form.data.currentmake,
                    PreferredLocation: $scope.ffc.form.data.preferredlocation,
                    //Leave alone this its to clear validation on the base type!
                    //Its on the base type as we remember the value in session
                    PhoneType: 'Not Specified',
                    UtmSource: utmParameters.source,
                    UtmMedium: utmParameters.medium,
                    UtmCampaign: utmParameters.campaign,
                    UtmContent: utmParameters.content,
                    Postcode: postcode,
                    DealerName: $scope.ffc.form.data.dealerName
                };
            }

            $rootScope.$on('submit-test-drive-prelaunch-form', function() {
                var formData = $scope.getData();

                EloquaService.attachEloquaFields(formData);

                $scope.ffc.form.submitting = true;
                //Code to be changed once actual client side validation is in place on finance form to refer to actual api
                $http({
                        method: 'POST',
                        url: $filter('formatArgs')(Lexus.API.FormSubmission.PreLaunchTestDriveUrl, [Lexus.ID.Site]),
                        data: formData
                    })
                    .then(function success(response) {
                        if (response.data.Status == "Success") {
                            $scope.submissionPass(response.data);
                        } else {
                            $scope.submissionFail(response.data);
                        }

                    }, function error(response) {
                        $scope.submissionFail(response.data);
                    })
                    .finally(function() {
                        $rootScope.$broadcast('form-result');
                    });
            });

            $scope.submissionPass = function(data) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.ffc.form.completed = true;
                $scope.ffc.form.failed = false;
                $scope.ffc.form.submitting = false;
                var historyState = "PreBookTestDriveForm=Pass";
                $location.state(historyState);
                FormsService.ShowResult($scope.successContent[0]);
                $rootScope.$broadcast('gtm-form-success', 'Test Drive Prelaunch');
                $rootScope.$broadcast('visitor-details-session-change', $scope.getData());

            };

            $scope.submissionFail = function(data) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.ffc.form.failed = true;
                $scope.ffc.form.errors = data.Data;
                $scope.ffc.form.submitting = false;
                $scope.ffc.form.completed = true;
                var historyState = "PreBookTestDriveForm=Fail";
                $location.state(historyState);
                FormsService.ShowResult($scope.failureContent[0]);
                console.error(data.ErrorMessage);
            };
        }
    }

}());

;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxFormsTestDrive', [
        "$rootScope", "$filter", "$http", "$location", "API", "DealersService", "AddressSuggestService", "UserPreferencesService", "FormsService", "EloquaService",
        function($rootScope, $filter, $http, $location, API, DealersService, AddressSuggestService, UserPreferencesService, FormsService, EloquaService) {
            FormsTestDriveController.$inject = ['$scope'];
            return {
                scope: true,
                restrict: 'A',
                controller: FormsTestDriveController,
                controllerAs: 'ffc',
                bindToController: true,
                link: function(scope, element, attrs, filter, http) {
                    scope.successContent = element.find('.lx-form-success');
                    scope.failureContent = element.find('.lx-form-failure');
                }
            };

            function FormsTestDriveController($scope) {
                var ftd = this;
                $scope.ffc.urlParameters = $location.search();

                $scope.init = function(forceDealerId, dealerCompositeID, isDealerSite, isMultiBranchDealer) {
                    UserPreferencesService.getLexusVisitorSession().then(function success(data) {
                        var dataVehicle = UserPreferencesService.getLexusVehicle($scope.ffc.urlParameters);
                        var dataDealer = UserPreferencesService.getLexusDealer($scope.ffc.urlParameters);
                        var dataUser = UserPreferencesService.getLexusVisitor($scope.ffc.urlParameters);
                        $scope.ffc.form = {
                            submitting: false,
                            completed: false,
                            errors: false,
                            dealers: null,
                            data: {
                                postcodes: [],
                                carmodel: dataVehicle.model,
                                grade: dataVehicle.grade,
                                enginevariant: dataVehicle.engineVariant,
                                subscribe: false,
                                postcode: "",
                                email: data.Data.email,
                                phonetype: data.Data.phoneType ? data.Data.phoneType : 'home',
                                firstname: data.Data.name,
                                lastname: data.Data.surname,
                                phone: data.Data.phone,
                                prefer: data.Data.preferredContactMethod ? data.Data.preferredContactMethod : 'email',
                                captcha: '',
                                dealerId: dataDealer.dealerID,
                                dealerName: dataDealer.dealerName,
                                purchasedelay: null,
                                currentmake: null,
                                contextDealerSiteId: forceDealerId
                            }
                        };
                        if (dataUser.suburb && dataUser.postCode) {
                            $scope.ffc.form.data.postcodes.push({
                                text: dataUser.suburb + " " + dataUser.postCode,
                                data: {
                                    postCode: dataUser.postCode,
                                    suburb: dataUser.suburb
                                }
                            });
                        }
                    }, function failure(data) {
                        $scope.ffc.form = {
                            submitting: false,
                            completed: false,
                            errors: false,
                            dealers: null,
                            data: {
                                postcodes: [],
                                carmodel: null,
                                grade: null,
                                subscribe: false,
                                postcode: "",
                                email: null,
                                phonetype: 'home',
                                firstname: null,
                                lastname: null,
                                phone: null,
                                prefer: 'email',
                                captcha: '',
                                dealerId: null,
                                dealerName: null,
                                purchasedelay: null,
                                currentmake: null
                            }
                        };
                    }).finally(function() {
                        if ($scope.ffc.form.data.carmodel) {
                            $rootScope.$broadcast('field-car-model-engine-variant-update-selected');
                        }

                        //Main Site
                        if ($scope.ffc.form.data.postcodes && $scope.ffc.form.data.postcodes.length > 0 && !isDealerSite) {
                            //Do nothing, Pass empty dealer ID
                            $scope.searchNow();
                        }

                        //Dealer Site Multi Branch
                        if (isDealerSite && isMultiBranchDealer) {
                            $scope.ffc.form.data.dealerId = null;
                            $scope.ffc.form.data.dealerName = null;
                            $scope.loadBranches(forceDealerId);
                        }

                        //Dealer Site NOT Multi Branch
                        if (isDealerSite && !isMultiBranchDealer) {
                            $scope.ffc.form.data.dealerId = dealerCompositeID;
                            $scope.ffc.form.data.dealerName = null;
                        }

                    });
                }

                $scope.deselectDealer = function() {
                    $scope.ffc.form.data.dealerName = null;
                }

                $scope.selectDealer = function(dealerInputId) {
                    var scrollPos = $(document).scrollTop();
                    var maxPos = $('#' + dealerInputId).parents('.lx-form__find-dealer-js').offset().top;
                    if (scrollPos > maxPos) {
                        TweenLite.to(window, 0.5, {
                            scrollTo: {
                                y: maxPos
                            },
                            ease: Power2.easeOut
                        });
                    }
                    try {
                        var code = dealerInputId.replace('option-', '');
                        $scope.ffc.form.data.dealerName = $scope.ffc.form.dealers.find(function(dealer) {
                            return dealer.dealerCode == code;
                        }).dealerName;
                    } catch (ex) {
                        (console.error || console.log)(ex);
                    }
                }

                $scope.loadBranches = function(dealerID) {
                    $scope.ffc.form.dealersLoading = true;
                    DealersService.setParam('dealerID', dealerID);
                    DealersService.setParam('type', 'Sales');
                    DealersService.GetDealerBranches();
                }

                $scope.dealerSearch = function($tag) {
                    $scope.ffc.form.data.postcodes = [];
                    $scope.ffc.form.data.postcodes[0] = $tag;
                    $scope.searchNow();
                }

                $scope.$on('dealer-search-results-received', function(event, data) {
                    $scope.ffc.form.dealersLoading = false;
                    $scope.ffc.form.dealers = data.Data;
                    $scope.checkDealersLoaded();
                });

                //Do a sanity check to see if the bound dealers match the forceDealer if not clear the force dealer
                $scope.checkDealersLoaded = function() {
                    var result = $scope.ffc.form.dealers.find(function(dealer) {
                        return dealer.dealerCode == $scope.ffc.form.data.dealerId;
                    });
                    if (!result) {
                        $scope.ffc.form.data.dealerId = null;
                    }

                    if ($scope.ffc.form.dealers.length == 1)
                        $scope.ffc.form.data.dealerId = $scope.ffc.form.dealers[0].dealerCode;
                }


                $scope.searchNow = function() {
                    $scope.ffc.form.dealersLoading = true;
                    $rootScope.$broadcast('visitor-details-change-autocomplete', $scope.ffc.form.data.postcodes[0].data);
                    DealersService.setParam('postCode', $scope.ffc.form.data.postcodes[0].data.postCode); //Dummy Implementation needs to be changed
                    DealersService.setParam('suburb', $scope.ffc.form.data.postcodes[0].data.suburb); //Dummy Implementation needs to be changed
                    DealersService.setParam('type', 'Sales');
                    DealersService.GetResults();

                }

                $scope.getData = function() {
                    var utmParameters = UserPreferencesService.getUtmParameters();
                    var postcode = null;
                    if ($scope.ffc.form.data.postcodes.length > 0 && $scope.ffc.form.data.postcodes[0].text) {
                        postcode = parseInt($scope.ffc.form.data.postcodes[0].text.split(' ').reverse()[0]);
                    }

                    var result = {
                        Model: $scope.ffc.form.data.carmodel,
                        EngineVariant: $scope.ffc.form.data.enginevariant,
                        DealerId: $scope.ffc.form.data.dealerId,
                        ContextDealerSiteId: $scope.ffc.form.data.contextDealerSiteId,
                        FirstName: $scope.ffc.form.data.firstname,
                        LastName: $scope.ffc.form.data.lastname,
                        Email: $scope.ffc.form.data.email,
                        Phone: $scope.ffc.form.data.phone,
                        PreferredContactMethod: $scope.ffc.form.data.prefer,
                        PlanToPurchase: $scope.ffc.form.data.purchasedelay,
                        VehicleTypeOwned: $scope.ffc.form.data.currentmake,
                        Captcha: $scope.ffc.form.data.captcha,
                        Subscribe: $scope.ffc.form.data.subscribe,
                        UtmSource: utmParameters.source,
                        UtmMedium: utmParameters.medium,
                        UtmCampaign: utmParameters.campaign,
                        UtmContent: utmParameters.content,
                        Postcode: postcode,
                        DealerName: $scope.ffc.form.data.dealerName
                    };

                    return result;
                };

                $rootScope.$on('vehicle-preference-change', function(event, data) {
                    $scope.ffc.form.data.carmodel = data.model;
                    $scope.ffc.form.data.enginevariant = data.engineVariant;
                });

                $rootScope.$on('submit-test-drive-form', function(event, data) {
                    var formData = $scope.getData();

                    EloquaService.attachEloquaFields(formData);

                    $scope.ffc.form.submitting = true;
                    $http({
                            method: 'POST',
                            url: $filter('formatArgs')(Lexus.API.FormSubmission.TestDrive, [Lexus.ID.Site]),
                            data: formData
                        })
                        .then(function success(response) {
                            if (response.data.Status == "Success") {
                                $scope.submissionPass(response.data);
                            } else {
                                $scope.submissionFail(response.data);
                            }
                        }, function error(response) {
                            $scope.submissionFail(response.data);
                        })
                        .finally(function() {
                            $rootScope.$broadcast('form-result');
                        });
                });


                $scope.submissionPass = function(data) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.ffc.form.completed = true;
                    $scope.ffc.form.failed = false;
                    $scope.ffc.form.submitting = false;
                    var historyState = "TestDriveForm=Pass";
                    $location.state(historyState);
                    FormsService.ShowResult($scope.successContent[0]);
                    $rootScope.$broadcast('gtm-form-success', 'Test Drive');
                    $rootScope.$broadcast('visitor-details-session-change', $scope.getData());
                };
                $scope.submissionFail = function(data) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $scope.ffc.form.failed = true;
                    $scope.ffc.form.errors = data.Data;
                    $scope.ffc.form.submitting = false;
                    $scope.ffc.form.completed = true;
                    var historyState = "TestDriveForm=Fail";
                    $location.state(historyState);
                    FormsService.ShowResult($scope.failureContent[0]);
                    console.error(data.ErrorMessage);
                };

            }
        }
    ]);



;
"use strict"
/* Directives */

angular.module('Lexus.Directives')
    .directive('lxFormsUpdateDetail', ['$window', '$timeout', '$filter', '$http', '$location', function($window, $timeout, $filter, $http, $location) {
        formUpdateDetailController.$inject = ['$scope', '$http', '$filter', '$timeout', '$window', '$interval', '$location', '$rootScope', 'vcRecaptchaService', 'API', 'FormsService', 'UserPreferencesService'];
        return {
            scope: true,
            restrict: 'A',
            controller: formUpdateDetailController,
            controllerAs: 'ffc',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {
                scope.successContent = element.find('.lx-form-success');
                scope.failureContent = element.find('.lx-form-failure');
            }
        };

        function formUpdateDetailController($scope, $http, $filter, $timeout, $window, $interval, $location, $rootScope, vcRecaptchaService, API, FormsService, UserPreferencesService) {
            var fcu = this;

            $scope.init = function(optionValue) {
                $scope.ffc.form = {
                    submitting: false,
                    completed: false,
                    errors: false,
                    data: {
                        subscribe: false,
                        firstname: '',
                        lastname: '',
                        address: '',
                        postcodes: [],
                        email: '',
                        phonetype: '',
                        updatetype: '',
                        phone: '',
                        prefer: 'email',
                        captcha: '',
                        vin: '',
                        registration: '',
                        requesttype: ''
                    }
                };
                $scope.ffc.form.data.updatetype = optionValue;
            }

            $rootScope.$on('submit-update-detail-form', function() {
                var formData = $scope.getData();

                $http({
                        method: 'POST',
                        url: $filter('formatArgs')(Lexus.API.FormSubmission.UpdateDetails, [Lexus.ID.Site]),
                        data: formData
                    })
                    .then(function success(response) {
                        if (response.data.Status == "Success") {
                            $scope.submissionPass(response.data);
                        } else {
                            $scope.submissionFail(response.data);
                        }
                    }, function error(response) {
                        $scope.submissionFail(response.data);
                    })
                    .finally(function() {
                        $rootScope.$broadcast('form-result');
                    });
            });

            $rootScope.$on('vin-change', function(event, data) {
                if (!$scope.ffc.form.data.vin) {
                    $rootScope.$broadcast('vin-lookup-success');
                    return;
                }
                var formData = $scope.getData();

                $scope.ffc.form.submitting = true;
                API.post($filter('formatArgs')(Lexus.API.Lookup.VINLookupTakata, [Lexus.ID.Site]), $scope.getVinData())
                    .then(function success(response) {
                        if (response.Status == "Success") {
                            $rootScope.$broadcast('vin-lookup-success');
                        } else {
                            $rootScope.$broadcast('vin-lookup-failed');
                        }
                    }, function error(response) {
                        $rootScope.$broadcast('vin-lookup-failed');
                    })
            });

            $scope.getData = function() {
                var visitor = UserPreferencesService.splitAutoCompleteResult($scope.ffc.form.data.postcodes[0].text);
                var result = {
                    UpdateType: $scope.ffc.form.data.updatetype,
                    FirstName: $scope.ffc.form.data.firstname,
                    LastName: $scope.ffc.form.data.lastname,
                    Email: $scope.ffc.form.data.email,
                    Phone: $scope.ffc.form.data.phone,
                    StreetAddress: $scope.ffc.form.data.address,
                    Postcode: visitor.postCode,
                    PhoneType: $scope.ffc.form.data.phonetype,
                    PreferredContactMethod: $scope.ffc.form.data.prefer,
                    Captcha: $scope.ffc.form.data.captcha,
                    Vin: $scope.ffc.form.data.vin,
                    Registration: $scope.ffc.form.data.registration,
                    StateRegistered: $scope.ffc.form.data.requesttype,
                    Subscribe: $scope.ffc.form.data.subscribe
                };
                return result;

            };

            $scope.getVinData = function() {
                var result = {
                    Vin: $scope.ffc.form.data.vin
                };
                return result;

            };

            $scope.submissionPass = function(data) {
                $scope.ffc.form.completed = true;
                $scope.ffc.form.failed = false;
                $scope.ffc.form.submitting = false;
                var historyState = "UpdateDetails=Pass";
                $location.state(historyState);
                FormsService.ShowResult($scope.successContent[0]);
                $rootScope.$broadcast('gtm-form-success', 'Update Details');
                $rootScope.$broadcast('visitor-details-session-change', $scope.getData());
            };

            $scope.submissionFail = function(data) {
                $scope.ffc.form.failed = true;
                $scope.ffc.form.errors = data.Data;
                $scope.ffc.form.submitting = false;
                $scope.ffc.form.completed = true;
                var historyState = "UpdateDetails=Fail";
                $location.state(historyState);
                FormsService.ShowResult($scope.failureContent[0]);
                console.error(data.ErrorMessage);
            };
        }

    }]);;
"use strict";
angular.module('Lexus.Directives')
    .directive('lxGoogleMap', ['$window', '$timeout', '$filter', '$http', function($window, $timeout, $filter, $http) {
        googleMapController.$inject = ['$scope', '$http', '$filter', '$timeout', '$window', '$interval'];
        return {
            scope: true,
            restrict: 'A',
            controller: googleMapController,
            controllerAs: 'gm',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {

                var mapStyles = [{
                    "featureType": "all",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#d7d3c6"
                    }, {
                        "saturation": "0"
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "all",
                    "stylers": [{
                        "color": "#f0eee7"
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#d7d3c6"
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#232635"
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "color": "#ca4b19"
                    }]
                }, {
                    "featureType": "administrative.country",
                    "elementType": "all",
                    "stylers": [{
                        "color": "#d7d3c6"
                    }]
                }, {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [{
                        "color": "#d7d3c6"
                    }]
                }, {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#d7d3c6"
                    }]
                }, {
                    "featureType": "landscape.man_made",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#313649"
                    }]
                }, {
                    "featureType": "landscape.natural.landcover",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#d7d3c6"
                    }]
                }, {
                    "featureType": "landscape.natural.landcover",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#313649"
                    }]
                }, {
                    "featureType": "landscape.natural.terrain",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#d7d3c6"
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }, {
                        "color": "#ca4b19"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [{
                        "saturation": -100
                    }, {
                        "lightness": 45
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#f0eee7"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#f0eee7"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#313649"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#f0eee7"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#f0eee7"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#313649"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#f0eee7"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#e4e1d7"
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "visibility": "simplified"
                    }, {
                        "color": "#f0eee7"
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#313649"
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#f0eee7"
                    }]
                }, {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }, {
                        "color": "#beb4b2"
                    }]
                }, {
                    "featureType": "transit",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "transit.station.rail",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{
                        "color": "#313649"
                    }, {
                        "visibility": "on"
                    }]
                }];

                if (inViewport(element[0])) {
                    loadMap(element[0], attrs);
                    scope.loaded = true;
                } else {
                    scope.loaded = false;
                    var runEvent = true;
                    angular.element($window).bind("scroll", function() {
                        if (runEvent) {
                            runEvent = false;
                            $timeout(function() {
                                if (!scope.loaded && inViewport(element[0])) {
                                    loadMap(element[0], attrs);
                                    scope.loaded = true;
                                }
                                runEvent = true;
                            }, 2000);
                        }
                    });
                }

                // dealerStyles
                function loadMap(el, att) {
                    var myLatLng = {
                        lat: Number(att.lat),
                        lng: Number(att.lng)
                    };
                    var map = new google.maps.Map(el, {
                        center: myLatLng,
                        zoom: 13
                    });
                    map.setOptions({
                        styles: mapStyles,
                        zoomControl: true,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: true,
                        rotateControl: false,
                        fullscreenControl: false
                    });
                    google.maps.event.trigger(map, 'resize');
                    var icon;
                    if (att.iconAnchorX && att.icon) {
                        icon = {
                            url: att.icon,
                            size: new google.maps.Size(att.iconWidth, att.iconHeight),
                            origin: new google.maps.Point(att.iconOriginX, att.iconOriginY),
                            anchor: new google.maps.Point(att.iconAnchorX, att.iconAnchorY)
                        };
                    } else if (att.icon) {
                        icon = att.icon;
                    } else {
                        icon = '';
                    }
                    var marker = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        title: att.dealername,
                        icon: icon
                    });
                }

                function inViewport(el) {
                    var r, html;
                    if (!el || 1 !== el.nodeType) {
                        return false;
                    }
                    html = document.documentElement;
                    r = el.getBoundingClientRect();

                    return (!!r &&
                        r.bottom >= 0 &&
                        r.right >= 0 &&
                        r.top <= html.clientHeight &&
                        r.left <= html.clientWidth
                    );
                }
            }
        }

        function googleMapController($scope, $http, $filter, $timeout, $window, $interval) {
            var gm = this;
        }
    }]);

;
"use strict";

angular.module('Lexus.Directives')
    .directive('buttonClick', [function() {
        return function(scope, element, attrs) {
            $(element).click(function(event) {
                event.preventDefault();
            });
        };
    }])
    .directive('runOnBlur', [function() {
        return function(scope, element, attrs) {
            element.blur(function() {
                if (angular.isDefined(attrs.runOnBlur)) {
                    scope.$apply(function() {
                        scope.$eval(attrs.runOnBlur);
                    });
                }
            });
        };
    }])
    .directive('onFinishRender', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function() {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
    }])
    .directive('enterPress', [function() {
        return function(scope, element, attrs) {
            element.bind('keydown keypress', function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.enterPress);
                    });

                    event.preventDefault();
                }
            });
        };
    }])
    .directive('backImg', function() {
        return function(scope, element, attrs) {
            var url = attrs.backImg;
            element.css('background-image', 'url(' + url + ')');
        };
    })
    .directive('forceFocusOnClick', [function() {
        // This directive forces focus on devices that don't support focus on non input/anchor elements (ipads + other ios devices)
        return function(scope, element, attrs) {
            element.bind('click', function(event) {
                if (this != document.activeElement) {
                    event.stopPropagation();
                    this.focus();
                }
            });
        };
    }])
    .directive('lxSmallLoader', [function() {

        return {
            scope: {
                showLoader: '=',
                transition: '@'
            },
            restrict: 'AE',
            transclude: true,
            template: '<div class="lx-small-loader" ' +
                'data-ng-class="{\'is-loading\': showLoader, \'lx-small-loader--with-transition\': transition}">' +
                '<div class="lx-small-loader__container" data-ng-class="{\'lx-small-loader__transitionable\': transition}" data-ng-show="showLoader">' +
                new Array(12 + 1).join('<i class="lx-small-loader__circle">•</i>') +
                '</div>' +
                '<div data-ng-class="{\'lx-small-loader__transitionable\': transition}" data-ng-transclude data-ng-hide="showLoader"></div>' +
                '</div>'
        };

    }])
    .directive('mouseDetected', ['$rootScope', 'MouseDetectionService', function($rootScope, MouseDetectionService) {
        return {
            restrict: 'A',
            scope: {
                onMouseDetected: '&mouseDetected'
            },
            link: function(scope, elem, attrs) {
                $rootScope.$on('did-detect-mouse', function() {
                    //console.log('about to call', scope.onMouseDetected);
                    scope.onMouseDetected();
                    scope.$apply();
                });
            }
        }
    }])
    .directive('scrollTopOnFocus', ['$window', function($window) {
        return function(scope, element, attrs) {
            element.bind('click', function(event) {
                var scrollYPos = $(element[0]).offset().top;
                event.preventDefault();
                if ($window.innerWidth <= Lexus.Breakpoint.ExtraSmall) {
                    TweenLite.to(window, 1, {
                        scrollTo: {
                            y: scrollYPos,
                            x: 0
                        },
                        ease: Power4.easeOut
                    });
                }
            });
        };
    }])
    .directive('scrollToIdOnClick', [function() {
        return function(scope, element, attrs) {
            element.bind('click', function() {
                var duration = attrs.scrollDuration != null ? attrs.scrollDuration : 2;
                var $element = $('#' + attrs.scrollTarget);

                if (!$element.length) {
                    return;
                }

                TweenMax.to(window, duration, {
                    scrollTo: {
                        y: '#' + attrs.scrollTarget,
                        offsetY: attrs.scrollOffset,
                        ease: Power4.easeOut,
                        autoKill: false
                    }
                });
            });
        };
    }]);;
(function() {
    "use strict";

    angular.module('Lexus.Directives')
        .directive('lxImageDisclaimer', ImageDisclaimerDirective);

    function ImageDisclaimerDirective() {
        return {
            scope: {
                'cssClass': '@'
            },
            restrict: 'A',
            transclude: true,
            template: '<div class="{{cssClass}}" ' +
                'ng-class="{\'is-open\': isMouse && isMouseInside || !isMouse && isToggled}" ' +
                'mouse-detected="isMouse = true" ' +
                'ng-click="isToggled = !isToggled" ' +
                'ng-mouseenter="isMouseInside = true" ' +
                'ng-mouseleave="isMouseInside = false"><ng-transclude></ng-transclude></div>'
        };
    }
}());;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lazyLoadImages', [function() { // Lazy load images.
        return {
            link: function(scope, element, attrs) {
                var _window = angular.element(window),
                    bLazy;

                function initImages() {
                    var _images = element.find('.b-lazy');

                    angular.forEach(_images, function(value, key) {
                        var _image = angular.element(value),
                            src = _image.data('src'),
                            mw = _image.data('src-mw'),
                            q = _image.data('src-q'),
                            mwXxs = Math.round(Lexus.Breakpoint.ExtraExtraSmall * 1.5),
                            mwXs = Math.round(Lexus.Breakpoint.ExtraSmall * 1.5),
                            mwSm = Math.round(Lexus.Breakpoint.Small * 1.5),
                            mwMd = Math.round(Lexus.Breakpoint.Medium),
                            imgQuery = '';

                        // Check for extra image settings.
                        if (angular.isDefined(mw)) {
                            imgQuery += 'mw=' + mw;
                            mwXs = mwSm = mwMd = mw;
                        }

                        if (angular.isDefined(q)) {
                            if (angular.isDefined(mw)) {
                                imgQuery += '&';
                            }

                            imgQuery += 'q=' + q;
                        }

                        if (imgQuery) {
                            _image.attr('data-src', src + '?' + imgQuery);
                        }

                        _image
                            .attr('data-src-xxs', src + '?mw=' + mwXxs + '&q=95')
                            .attr('data-src-xs', src + '?mw=' + mwXs + '&q=95')
                            .attr('data-src-sm', src + '?mw=' + mwSm + '&q=95')
                            .attr('data-src-md', src + '?mw=' + mwMd + '&q=95');
                    });
                }

                function initBLazy() {
                    bLazy = new Blazy({
                        offset: 600,
                        breakpoints: [{
                            width: Lexus.Breakpoint.ExtraExtraSmall, // mobile
                            src: 'data-src-xxs'
                        }, {
                            width: Lexus.Breakpoint.ExtraSmall, // small tabet
                            src: 'data-src-xs'
                        }, {
                            width: Lexus.Breakpoint.Small, // tablet
                            src: 'data-src-sm'
                        }, {
                            width: Lexus.Breakpoint.Medium, // medium destkop
                            src: 'data-src-md'
                        }]
                    });
                }

                initImages();

                initBLazy();

                // Watch app for lazy load rescan.
                scope.$on('broadcast.lazyLoad', function(event, args) {
                    initImages();

                    bLazy.revalidate();
                });

                scope.$on('broadcast.lazyLoadRevalidate', function(event, args) {
                    bLazy.revalidate();
                });

                // On resize.
                _window.on('resize', function() {
                    bLazy.revalidate();
                });
            }
        };
    }])
    .directive('initLazyLoadImage', ['$rootScope', '$timeout', function($rootScope, $timeout) { // Lazy load new images.
        return {
            link: function(scope, element, attrs) {
                element.on('click', function() {

                    // Lazy load new images.
                    $timeout(function() {
                        $rootScope.$broadcast('broadcast.lazyLoad');
                    }, 300);
                });
            }
        };
    }]);;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxModal', [function() {
        modalController.$inject = ['$scope', '$timeout', '$sce', '$rootScope'];
        return {
            scope: true,
            restrict: 'A',
            controller: modalController,
            controllerAs: 'modal',
            bindToController: true,
            link: function(scope, element, attrs) {}
        };

        function modalController($scope, $timeout, $sce, $rootScope) {
            var modal = this;

            modal = modalStateUpdate(modal, false);
            $scope.modalContent = '';

            function modalStateUpdate(modal, set) {
                modal.modalIsOpen = set;
                return modal;
            }

            $scope.modalClose = function() {
                modal.isClosing = 'is-closing';
                modal = modalStateUpdate(modal, false);
                $timeout(function() {
                    $scope.modalContent = ''
                }, 250);
            }

            $scope.modalOpen = function(callback) {
                modal = modalStateUpdate(modal, true);
                if (callback) {
                    callback(event);
                }
            }

            /* Event Args:
             * arg : {
             *   content : 'html-content'
             *   [variant : Lexus.ModalVariant.[Content|Spinner]],
             *   [closeOnEvent : 'event-name-to-listen-for'],
             *   [wrapper : ['html-before','html-after']],
             * }
             */
            $rootScope.$on('open-modal-window', function(events, arg) {

                modal.variantClass = arg.variant;
                modal.closeOnEvent = (arg.variant == Lexus.ModalVariant.Spinner);

                if (arg.wrapper) {
                    arg.content = addModalWrapper(arg.wrapper, arg.content);
                }

                //caution: using trusted html, so be careful putting user generated content in the modal
                $scope.modalContent = $sce.trustAsHtml(arg.content);
                $scope.modalOpen();
            });

            $rootScope.$on('close-modal-window', function(events, arg) {
                $scope.modalClose();
            });

            function addModalWrapper(wrapper, content) {
                return content = wrapper[0] +
                    content + wrapper[1];
            }

            function getScrollbarWidth() {
                var outer = document.createElement("div");
                outer.style.visibility = "hidden";
                outer.style.width = "100px";
                outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

                document.body.appendChild(outer);

                var widthNoScroll = outer.offsetWidth;
                // force scrollbars
                outer.style.overflow = "scroll";

                // add innerdiv
                var inner = document.createElement("div");
                inner.style.width = "100%";
                outer.appendChild(inner);

                var widthWithScroll = inner.offsetWidth;

                // remove divs
                outer.parentNode.removeChild(outer);

                var scrollBarWidth = widthNoScroll - widthWithScroll;
                document.styleSheets[0].insertRule(".is-locked { padding-right:" + scrollBarWidth + "px;}", document.styleSheets[0].cssRules.length);
            }

            if (window.innerWidth > 480) {
                getScrollbarWidth();
            }

        }

    }]);;
"use strict";

const attributes = {
    stepSpeed: "@animStepSpeed",
    minX: "@animMinX",
    maxX: "@animMaxX",
    minY: "@animMinY",
    maxY: "@animMaxY",
    case: "@animCase",
    enabledMobile: "@animEnabledMobile",
    triggerOffsetY: "@animTriggerOffsetY",
};

const cases = {
    x: "<div data-du-parallax='true' x='controller.animatorFunc'><ng-transclude/></div>",
    y: "<div data-du-parallax='true' y='controller.animatorFunc'><ng-transclude/></div>",
    fade: "<div data-du-parallax='true' custom='controller.scrollFade'><ng-transclude/></div>",
};

const checkIsAnimated = (window) => (attributes) => {
    const isMobile = window.innerWidth < Lexus.Breakpoint.Small;
    return !isMobile || (isMobile && attributes.animEnabledMobile === "1");
};

const animations = {
    x: (controller) =>
        controller.initXY(+controller.stepSpeed, +controller.maxX, +controller.minX, +controller.triggerOffsetY),
    y: (controller) =>
        controller.initXY(+controller.stepSpeed, +controller.maxY, +controller.minY, +controller.triggerOffsetY),
    fade: (controller) => controller.initScrollFade(+controller.stepSpeed, +controller.triggerOffsetY),
};

/* Directives */
angular.module("Lexus.Directives").directive("lxParallax", [
    "$window",
    "parallaxHelper",
    function($window, parallaxHelper) {
        const checkIsAnimatedWithWindow = checkIsAnimated($window);
        const windowHeight = $window.innerHeight;

        return {
            scope: attributes,
            restrict: "A",
            controller: parallaxController,
            controllerAs: "controller",
            bindToController: true,
            transclude: true,
            template: (_, attrs) => (checkIsAnimatedWithWindow(attrs) ? cases[attrs.animCase] : "<ng-transclude/>"),
            link: function({
                controller
            }, _, attrs) {
                if (checkIsAnimatedWithWindow(attrs)) {
                    animations[controller.case] ? .(controller);
                }
            },
        };

        function parallaxController() {
            this.initXY = (stepSpeed, max, min, triggerOffsetY) => {
                this.animatorFunc = parallaxHelper.createAnimator(stepSpeed, max, min, triggerOffsetY);
            };

            this.initScrollFade = (stepSpeed, triggerOffsetY) => {
                const factor = windowHeight * stepSpeed;
                const offset = windowHeight * triggerOffsetY;

                this.scrollFade = ({
                    elemY
                }) => {
                    const opacity = (elemY + offset) / factor;
                    const correctedOpacity = Math.max(0, Math.min(1, opacity));
                    return {
                        opacity: correctedOpacity,
                    };
                };
            };
        }
    },
]);;
(function() {
    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .directive('lxSearchResults', ['$window', '$timeout', '$filter', '$http', '$location', function($window, $timeout, $filter, $http, $location) {
            searchResultsController.$inject = ['$scope', '$http', '$filter', '$timeout', '$window', '$interval', '$location'];
            return {
                scope: true,
                restrict: 'A',
                controller: searchResultsController,
                controllerAs: 'src',
                bindToController: true,
                link: function(scope, element, attrs, filter, http) {}
            };

            function searchResultsController($scope, $http, $filter, $timeout, $window, $interval, $location) {
                var src = this;
                $scope.init = function() {
                    $scope.src = {
                        searchTerm: $location.search().q
                    };
                }

                $scope.runSearch = function() {
                    $window.location.href = Lexus.URI.SearchResultsPage + "?q=" + $scope.src.searchTerm;
                }
            }
        }]);
}());;

"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxMobileCarousel', [function() {
        mobileCarouselController.$inject = ['$scope'];
        return {
            scope: true,
            restrict: 'A',
            controller: mobileCarouselController,
            controllerAs: 'mc',
            bindToController: true,
            link: function(scope, element, attrs) {}
        };

        function mobileCarouselController($scope) {
            var mc = this;

            $scope.init = function(slide) {
                mc.isShowing = 2;
                if (slide) {
                    mc.isShowing = slide;
                }

                mc.showingClass = ['is-showing-right', 'is-showing-left', 'is-showing-'];
                mc = classUpdate(mc);
            }


            function classUpdate(scope) {
                scope.mainClass = mc.showingClass[2] + scope.isShowing;
                scope.firstSecClass = firstClassUpdate(scope.isShowing, scope.showingClass[0]);
                scope.secondSecClass = secondClassUpdate(scope.isShowing, scope.showingClass);
                scope.thirdSecClass = thirdClassUpdate(scope.isShowing, scope.showingClass[1]);

                return scope;
            }

            function firstClassUpdate(showing, classSet) {
                var className = '';
                if (showing > 1) {
                    className = classSet;
                }
                return className;
            };

            function thirdClassUpdate(showing, classSet) {
                var className = '';
                if (showing < 3) {
                    className = classSet;
                }
                return className;
            };

            function secondClassUpdate(showing, classList) {
                var className = '';
                if (showing === 3) {
                    className = classList[0];
                } else if (mc.isShowing === 1) {
                    className = classList[1];
                }
                return className;
            };

            $scope.prevSec = function() {
                if (mc.isShowing > 1) {
                    mc.isShowing--;
                }

                mc = classUpdate(mc);
            }

            $scope.nextSec = function() {
                if (mc.isShowing < 3) {
                    mc.isShowing++;
                }

                mc = classUpdate(mc);
            }
        }

    }]);;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxStickToTop', ['$window', function($window) {
        return {
            link: function($scope, $element, $attrs) {
                var repaintState;
                var repaintStateOverrides;
                var restoreOverflowAnchorTimeout = null;
                var BUFFER_DIST = 50

                function getElementHeightInclMargins($el) {
                    var boundingRect = $el.get(0).getBoundingClientRect();
                    var rawHeight = boundingRect.bottom - boundingRect.top;
                    var marginTop = parseInt($el.css('margin-top').match(/([0-9]+(\.[0-9])?)/g)[0], 10);
                    var marginBottom = parseInt($el.css('margin-bottom').match(/([0-9]+(\.[0-9])?)/g)[0], 10);
                    return rawHeight + marginTop + marginBottom;
                }

                function setPlaceholderVisibility(visible) {
                    $placeholder.css({
                        'height': visible ? (getElementHeightInclMargins($element) + 'px') : '0',
                        'visibility': visible ? '' : 'hidden'
                    });
                    if ($pusher) {
                        $pusher.css({
                            'height': visible ? (repaintState.topBeforeFixed + 'px') : '0',
                            'visibility': visible ? '' : 'hidden'
                        });
                    }
                }

                function repaint(repaintState) {
                    var $html = $('html');
                    $html.css('overflow-anchor', 'none');
                    $window.clearTimeout(restoreOverflowAnchorTimeout);
                    if (repaintState.isFixed) {
                        // fix the element to the viewport, the same offset from the top. (this should stop it from actually moving anywhere)
                        // transform translate3d forces ipad to load position fixed on scroll

                        $element.css({
                            position: 'fixed',
                            top: repaintState.topWhenFixed,
                            transform: 'translate3d(0,0,0)'
                        });

                        $element.addClass($attrs.lxStickyHeaderClass || 'lx-sticky-header');

                    } else {
                        // put the nav back where it was
                        $element.css({
                            position: '',
                            top: 0,
                            transform: 'translate3d(0,0,0)'
                        });
                        $element.removeClass($attrs.lxStickyHeaderClass || 'lx-sticky-header');
                    }

                    setPlaceholderVisibility(repaintState.isPlaceholderTopOutsideViewport || repaintState.isFixed, repaintState);

                    restoreOverflowAnchorTimeout = $window.setTimeout(function() {
                        $html.css('overflow-anchor', '');
                    }, 100)
                }

                function recalc() {
                    var allPlaceholders = $('.lx-stick-to-top-placeholder').toArray();
                    var previousPlaceholders = allPlaceholders.slice(0, allPlaceholders.indexOf($placeholder.get(0)));
                    var sumOfPreviousPlaceholderHeights = 0;
                    angular.forEach(previousPlaceholders, function(el, index) {
                        sumOfPreviousPlaceholderHeights += getElementHeightInclMargins($(el));
                    });

                    //repaintState.isPlaceholderTopOutsideViewport = $placeholder.get(0).getBoundingClientRect().top < sumOfPreviousPlaceholderHeights;
                    var placeHolderTop = $placeholder.get(0).getBoundingClientRect().top;
                    var eleHeight = getElementHeightInclMargins($element);
                    var distanceTravelled = eleHeight - BUFFER_DIST;

                    if (!$element.hasClass($attrs.lxStickyHeaderClass)) {
                        repaintState.topBeforeFixed = distanceTravelled;
                    }

                    if ($element.hasClass($attrs.lxStickyHeaderClass)) {
                        distanceTravelled = repaintState.topBeforeFixed;
                    }

                    repaintState.isPlaceholderTopOutsideViewport = -placeHolderTop > distanceTravelled;
                    repaintState.isFixed = repaintState.isPlaceholderTopOutsideViewport;

                    repaintState.topWhenFixed = sumOfPreviousPlaceholderHeights;

                    if (repaintStateOverrides) {
                        $.extend(repaintState, repaintStateOverrides);
                    }

                    repaint(repaintState);
                }

                function setRepaintStateOverrides(newRepaintStateOverrides) {
                    if (newRepaintStateOverrides === null || typeof newRepaintStateOverrides === 'undefined') {
                        repaintStateOverrides = undefined;
                    } else {
                        repaintStateOverrides = newRepaintStateOverrides;
                    }
                    recalc();
                }

                var exports = {
                    setRepaintOverrides: setRepaintStateOverrides,
                    clearRepaintOverrides: function() {
                        setRepaintStateOverrides(null);
                    }
                };

                var $placeholder;
                var $pusher;

                function init() {
                    repaintState = {};

                    // publish API for availability to other components, e.g. secondary-nav
                    $element.data('lxStickToTop', exports);

                    // put in a placeholder element to take up the space the initial element took up
                    $placeholder = $('<div class="' + ($attrs.lxStickToTopPlaceholderClass || '') + ' lx-stick-to-top-placeholder"></div>');
                    $element.before($placeholder);
                    if (($attrs.lxUsePusher || true) == true) {
                        $pusher = $('<div class="lx-stick-to-top-pusher"></div>');
                        $element.after($pusher);
                    }

                    var $window = $(window);
                    $window.on('scroll', recalc);
                    $window.on('resize', recalc);
                    recalc();
                }

                init();

                $scope.$on('$destroy', function() {
                    $placeholder.remove();

                    var $window = $(window);
                    $window.off('scroll', recalc);
                    $window.off('resize', recalc);
                });
            }
        }
    }]);;

"use strict";
angular.module('Lexus.Directives')
    .directive('lxNumberAnimator', [function() {
        return {
            scope: {
                source: "<ngModel",
                roundingModel: "@round"
            },
            restrict: 'E',
            template: '{{animatedValue}}',
            link: function(scope, element, attrs) {
                scope.source = 0;
                scope.validRoundingModels = ["floor", "round", "ceiling"];
                init(scope, element, attrs);
            },
        };

        function init(scope, elem, attrs) {

            //set/validate rounding - default to floor
            scope.roundingModel = scope.roundingModel || "floor";
            if (scope.validRoundingModels.indexOf(scope.roundingModel) == -1) {
                var msg = "Invalid rounding model '" + scope.roundingModel + "' - value should be 'floor', 'round' or 'ceiling'";
                console.error ? console.error(msg) : console.log("ERROR: " + msg);
                scope.roundingModel = "floor";
            }

            scope.animatedValue = 0;
            scope.interimValue = {
                value: 0
            };
            scope.$watch('source', function(newVal) {
                if (typeof newVal === 'number') {
                    //scope.localValue = newVal;
                    TweenLite.to(scope.interimValue, 1.0, {
                        ease: Expo.easeOut,
                        value: newVal,
                        onUpdate: function() {
                            var roundedValue;
                            if (scope.roundingModel === "floor") {
                                roundedValue = Math.floor(scope.interimValue.value);
                            } else if (scope.roundingModel === "ceiling") {
                                roundedValue = Math.ceil(scope.interimValue.value);
                            } else {
                                roundedValue = Math.round(scope.interimValue.value);
                            }

                            scope.animatedValue = roundedValue.toLocaleString('en', { /*style: 'currency', currency: 'AUD',*/
                                useGrouping: true
                            });
                            scope.$digest();
                        }
                    });
                }
            });
        }


    }]);;
(function() {

    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .directive('lxRangeDealerLookup', RangeDealerLookupDirective);

    RangeDealerLookupDirective.$inject = ['UserPreferencesService', 'DealersService'];

    function RangeDealerLookupDirective(userPreferencesService, dealersService) {
        rangeDealerLookupController.$inject = ['$scope'];
        return {
            scope: true,
            restrict: 'A',
            controller: rangeDealerLookupController,
            controllerAs: 'rdl',
            bindToController: true,
            link: function(scope, element, attrs) {
                scope.rdl = {};
                scope.rdl.data = {};

                scope.rdl.data.isDealerSite = (attrs.isDealerSite === 'true');
                scope.rdl.data.dealerID = attrs.dealerId;
                scope.rdl.data.dealerState = attrs.dealerState;
                scope.rdl.data.dealerToShow = false;
                scope.rdl.data.isMultiBranch = (attrs.dealerIsMultiBranch === 'true');
                scope.rdl.data.branchCode = attrs.dealerBranchCode;
                scope.rdl.data.serviceTypeToShow = attrs.serviceTypeToShow;

                scope.init();
            }
        };



        function rangeDealerLookupController($scope) {
            var rdl = this;

            $scope.init = function() {
                $scope.ds = {
                    loading: true
                };

                var dealerPreference = userPreferencesService.getLexusDealer();
                $scope.rdl.data.hasPreferredDealer = (dealerPreference && dealerPreference.dealerID);

                //Mainsite
                if (!$scope.rdl.data.isDealerSite && $scope.rdl.data.hasPreferredDealer) {
                    $scope.rdl.data.dealerState = dealerPreference.dealerState;

                    var dealerDetails = dealersService.DeconstructCompositeID(dealerPreference.dealerID);

                    $scope.rdl.data.dealerID = dealerDetails.dealerID;
                    $scope.rdl.data.dealerToShow = true;
                    dealersService.setParam('dealerID', $scope.rdl.data.dealerID);
                    dealersService.setParam('branchCode', $scope.rdl.data.branchCode || dealerDetails.branchCode);
                    dealersService.GetDealerBranch();
                }
                //Dealer Site, ex Brisbane
                else if ($scope.rdl.data.isDealerSite && !$scope.rdl.data.isMultiBranch) {
                    dealersService.setParam('dealerID', $scope.rdl.data.dealerID);
                    dealersService.setParam('dealerState', $scope.rdl.data.dealerState);
                    dealersService.setParam('type', $scope.rdl.data.serviceTypeToShow);
                    $scope.rdl.data.dealerToShow = true;

                    dealersService.GetDealerBranches();
                }
                //All other Dealer Sites
                else if ($scope.rdl.data.isDealerSite && $scope.rdl.data.isMultiBranch) {
                    dealersService.setParam('dealerID', $scope.rdl.data.dealerID);
                    dealersService.setParam('type', $scope.rdl.data.serviceTypeToShow);
                    $scope.rdl.data.dealerToShow = true;

                    dealersService.GetDealerBranches();
                }
            }

            $scope.checkServiceType = function(result) {
                var serviceString = '';
                if (typeof result == 'string') {
                    serviceString = result;
                } else if (typeof result == 'object' && result != null) {
                    serviceString = result.serviceType;
                }

                console.log('$scope.checkServiceType: ', serviceString);

                return serviceString.toLowerCase().match(/^service$/) ? true : false;
            }

            //Plural
            $scope.$on('dealer-search-results-received', function(event, data) {
                var dealers = data.Data;
                $scope.ds.results = dealers;
                $scope.ds.showChangeDealer = !$scope.rdl.data.isDealerSite;
                $scope.ds.loading = false;

            });

            //Singular
            $scope.$on('dealer-search-result-received', function(event, data) {
                var dealers = [];
                dealers.push(data.Data);
                $scope.ds.results = dealers;
                $scope.ds.showChangeDealer = !$scope.rdl.data.isDealerSite;
                $scope.ds.loading = false;

            });
        }
    }

}());


;
(function(undefined) {

    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .directive('lxRangeEngineVariant', RangeEngineVariantDirective);

    RangeEngineVariantDirective.$inject = ['$location', '$rootScope', 'UserPreferencesService'];

    function RangeEngineVariantDirective($location, $rootScope, UserPreferencesService) {

        var engineVariants = null;
        var showSeats = false;

        rangeEngineVariantController.$inject = ['$scope'];
        return {
            scope: true,
            restrict: 'A',
            controller: rangeEngineVariantController,
            controllerAs: 'revModal',
            link: link
        };

        function selectVariant(variantName) {
            var selectedIndex = null;
            for (var index = 0; index < engineVariants.length; index++) {
                if (engineVariants[index].engineVariant === variantName) {
                    engineVariants[index].selected = true;
                    selectedIndex = index;
                    $rootScope.$broadcast('vehicle-preference-change', {
                        model: engineVariants[index].model,
                        engineVariant: engineVariants[index].engineVariant,
                        grade: engineVariants[index].grade,
                    });
                } else {
                    engineVariants[index].selected = false;
                }
            }

            $rootScope.$broadcast('broadcast.lazyLoadRevalidate');
            return selectedIndex;
        }

        function link(scope, element, attrs) {
            engineVariants = angular.fromJson(attrs.engineVariants);
            showSeats = attrs.showSeats == 'true';

            for (var index = 0; index < engineVariants.length; index++) {
                engineVariants[index].selected = false;
            }

            var dataVehicle = UserPreferencesService.getLexusVehicle($location.search());

            if (dataVehicle) {
                var foundVariant = null;
                var variantIndex = null;

                for (var index = 0; index < engineVariants.length; index++) {
                    if (engineVariants[index].engineVariant === dataVehicle.engineVariant) {
                        foundVariant = dataVehicle.engineVariant;
                        break;
                    }
                }

                if (foundVariant) {
                    variantIndex = selectVariant(dataVehicle.engineVariant);
                } else {
                    variantIndex = selectVariant(engineVariants[0].engineVariant);
                }
            } else {
                variantIndex = selectVariant(engineVariants[0].engineVariant);
            }

            if (variantIndex != null) {
                scope.setFilterKey(engineVariants[variantIndex].seats, engineVariants[variantIndex].engineVariant);
            }
        }

        function rangeEngineVariantController($scope) {
            var revModal = this;

            $scope.select = selectVariant;

            $scope.isSelected = function(variantName) {
                for (var index = 0; index < engineVariants.length; index++) {
                    if (engineVariants[index].engineVariant === variantName) {
                        return engineVariants[index].selected;
                    }
                }
            }

            $scope.setFilterKey = function(seats, variantName) {
                $scope.filterKey = seats;
                if (!$scope.isSelected(variantName)) {
                    $scope.select(variantName);
                }
            }

            $scope.displayTab = function(seats) {
                return seats == $scope.filterKey;
            }
        }
    }
}());

;
"use strict";
angular.module('Lexus.Directives')
    .directive('lxLifestyleEngineVariant', function() {
        lxLifestyleEngineVariantController.$inject = ['$scope', '$attrs', '$filter', '$rootScope'];
        return {
            scope: true,
            restrict: 'A',
            controller: lxLifestyleEngineVariantController,
            controllerAs: 'lev',
            bindToController: true,
            link: function(scope, element, attrs, controller) {
                scope.lifestyleSlider = element.find('.lx-lifestyle-engine-variant__lifestyles');
                scope.itemWidth = scope.lifestyleSlider.find('.lx-lifestyle-engine-variant__lifestyle-image').first().width();

                scope.lifestyleTabs = element.find('.lx-lifestyle-engine-variant__lifestyle-selector__inner');
                scope.tabContainerWidth = scope.lifestyleTabs.first().width();
            }
        }

        function lxLifestyleEngineVariantController($scope, $attrs, $filter, $rootScope) {
            $scope.lifestyles = [];
            $scope.selectedLifestyleIndex = 0;

            $scope.variants = [];
            $scope.selectedVariant = null;
            $scope.selectedVariantImage = null;
            $scope.selectedVariantDescription = null;

            this.addLifeStyle = function(lifestyle) {
                $scope.lifestyles.push(lifestyle);
                if ($scope.selectedLifestyleIndex == 0) {
                    broadcastLifestyle($scope.lifestyles[$scope.selectedLifestyleIndex]);
                }
            }

            this.setSelectedLifestyle = function(lifestyleIndex) {
                if (lifestyleIndex >= 0 && lifestyleIndex < $scope.lifestyles.length) {
                    scrollTabsToIndex(lifestyleIndex);
                    scrollToIndex(lifestyleIndex);
                    $scope.selectedLifestyleIndex = lifestyleIndex;
                    var lifestyle = $scope.lifestyles[$scope.selectedLifestyleIndex];
                    broadcastLifestyle(lifestyle);
                }
            }

            this.addVariant = function(variant) {
                $scope.variants.push(variant);
                if ($scope.selectedVariant == null) {
                    setSelectedVariant(variant);
                }
            }

            this.setSelectedVariant = function(variant) {
                var filtered = $filter("filter")($scope.variants, {
                    name: variant
                });
                var item = filtered != null && filtered.length > 0 ? filtered[0] : null;
                if (item != null) {
                    setSelectedVariant(item);
                }
            }

            this.prevLifestyle = function() {
                this.setSelectedLifestyle($scope.selectedLifestyleIndex - 1);
            }

            this.nextLifestyle = function() {
                this.setSelectedLifestyle($scope.selectedLifestyleIndex + 1);
            }

            $scope.$on("variant-selected", function(event, args) {
                var item = $scope.variants[args.selectedVariantIndex];
                if (item != null) {
                    setSelectedVariant(item);
                }
            });

            var _window = angular.element(window);

            _window.resize(function() {
                $scope.itemWidth = $scope.lifestyleSlider.find('.lx-lifestyle-engine-variant__lifestyle-image').first().width();
                $scope.tabContainerWidth = $scope.lifestyleTabs.first().width();
            });

            function setSelectedVariant(variant) {
                $scope.selectedVariant = variant.name;
                $scope.selectedVariantDescription = variant.description;
                broadcastVehicle();

                var _size = 1200;
                if (_window.width() <= Lexus.Breakpoint.ExtraExtraSmall) {
                    _size = Lexus.Breakpoint.ExtraExtraSmall;
                } else if (_window.width() <= Lexus.Breakpoint.ExtraSmall) {
                    _size = Lexus.Breakpoint.ExtraSmall;
                } else if (_window.width() <= Lexus.Breakpoint.Small) {
                    _size = Lexus.Breakpoint.Small;
                }

                var resolvedImage = variant.image + '?q=95&w=' + _size;
                $scope.selectedVariantImage = resolvedImage;
            }

            function scrollToIndex(lifestyleIndex) {
                var left = $scope.itemWidth * lifestyleIndex;
                TweenLite.to($scope.lifestyleSlider, 1, {
                    scrollTo: {
                        x: (left)
                    },
                    ease: $scope.easingFunction
                });
            }

            function scrollTabsToIndex(lifestyleIndex) {
                var tabItems = $scope.lifestyleTabs.find('.lx-tabs__item');
                var left = 0;
                if (lifestyleIndex > 0) {
                    left = tabItems[lifestyleIndex].offsetLeft - ($scope.tabContainerWidth * Lexus.Tabs.CenterFactor);
                }
                TweenLite.to($scope.lifestyleTabs, 1, {
                    scrollTo: {
                        x: (left)
                    },
                    ease: $scope.easingFunction
                });
            }

            function broadcastVehicle() {
                $rootScope.$broadcast('vehicle-preference-change', {
                    model: 'UX', //get model
                    engineVariant: $scope.selectedVariant,
                });
            }

            function broadcastLifestyle(lifestyle) {
                if (!lifestyle)
                    return;

                $rootScope.$broadcast('personalization-change', {
                    lifestyle: {
                        name: lifestyle.name,
                        image: lifestyle.image,
                    },
                });
            }
        }
    })
    .directive('lxLifestyle', ['$window', '$timeout', '$filter', '$http', '$location', '$rootScope', function($window, $timeout, $filter, $http, $location, $rootScope) {
        return {
            scope: true,
            restrict: 'A',
            require: '^lxLifestyleEngineVariant',
            link: function(scope, element, attrs, lxLifestyleEngineVariantController) {
                lxLifestyleEngineVariantController.addLifeStyle(attrs);
            }
        }
    }])
    .directive('lxVariant', ['$window', '$timeout', '$filter', '$http', '$location', '$rootScope', function($window, $timeout, $filter, $http, $location, $rootScope) {
        return {
            scope: true,
            restrict: 'A',
            require: '^lxLifestyleEngineVariant',
            link: function(scope, element, attrs, lxLifestyleEngineVariantController) {
                lxLifestyleEngineVariantController.addVariant(attrs);
            }
        }
    }]);;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxRangeExploreBodyTypeSelector', function() {
        exploreRangeBodyTypeSelectorController.$inject = ['$scope', '$window', '$rootScope'];
        return {
            scope: true,
            restrict: 'A',
            controller: exploreRangeBodyTypeSelectorController,
            controllerAs: 'erbts',
            bindToController: true,
            link: function(scope, element, attrs) {}
        };

        function exploreRangeBodyTypeSelectorController($scope, $window, $rootScope) {
            var erbts = this;

            $scope.init = function() {
                $scope.erbts.bodyTypeSelectors = [];
                $scope.highlightBox(angular.element('.lx-explore-range__body-type-item:eq(0)'));
            }

            $scope.addBodyType = function(index, bodyType) {
                $scope.erbts.bodyTypeSelectors[index] = {};
                $scope.erbts.bodyTypeSelectors[index].bodyType = bodyType
                $scope.erbts.bodyTypeSelectors[index].active = (index == 0 ? true : false);
            }

            $scope.switchActiveBodyType = function($event, index) {
                $scope.highlightBox(angular.element($event.currentTarget));

                angular.forEach($scope.erbts.bodyTypeSelectors, function(value, key) {
                    if (key == index) {
                        value.active = true;
                        $rootScope.$broadcast('filter-body-type', value.bodyType);
                    } else {
                        value.active = false;
                    }
                });
            }

            $scope.highlightBox = function(target) {
                var myTarget = target;
                var left = myTarget.offset().left - myTarget.parent().offset().left;

                angular.element('.lx-explore-range__body-type-box').css({
                    'width': myTarget[0].clientWidth,
                    'transform': 'translate3d(' + left + 'px,0,0)'
                });
                angular.element('.lx-explore-range__body-type-box').css({
                    'opacity': 1
                });
            }

            angular.element($window).bind('resize', function() {
                $scope.highlightBox(angular.element('.lx-explore-range__body-type-item.is-active'));
            });

            $rootScope.$on('set-body-type', function(event, args) {
                angular.forEach($scope.erbts.bodyTypeSelectors, function(value, key) {
                    if (value.bodyType == args) {
                        $scope.switchActiveBodyType(key);
                    }
                });

            });

        }

    })
    .directive('lxRangeExploreHero', ['$window', '$timeout', '$filter', '$http', '$location', '$rootScope', function($window, $timeout, $filter, $http, $location, $rootScope) {
        exploreRangeController.$inject = ['$scope', '$http', '$filter', '$timeout', '$window', '$interval', '$location'];
        return {
            scope: true,
            restrict: 'A',
            controller: exploreRangeController,
            controllerAs: 'er',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {}
        };


        function exploreRangeController($scope, $http, $filter, $timeout, $window, $interval, $location) {
            var er = this,
                _window = angular.element(window),
                _currentSize = 0,
                _newSize = 0,
                _sizeFilter = '',
                _panelBkg = angular.element('.lx-explore-range__image-panel').attr('data-background');

            $scope.resolvedImage = null;

            function init() {
                updateBackgroundImage();
            }

            $rootScope.$on('change-active-vehicle', function(event, args) {
                $scope.er.activeVehicle = args;
                updateBackgroundImage(args.imageSrc);
            });

            function updateBackgroundImage(imageSrc) {

                if (_window.width() <= Lexus.Breakpoint.ExtraExtraSmall) {
                    _newSize = Lexus.Breakpoint.ExtraExtraSmall;
                } else if (_window.width() <= Lexus.Breakpoint.ExtraSmall) {
                    _newSize = Lexus.Breakpoint.ExtraSmall;
                } else if (_window.width() <= Lexus.Breakpoint.Small) {
                    _newSize = Lexus.Breakpoint.Small;
                } else {
                    _newSize = Lexus.Breakpoint.Medium;
                }

                if (_currentSize != _newSize) {
                    _sizeFilter = '?q=95&w=' + _newSize;
                    _currentSize = _newSize;
                    if (_newSize <= Lexus.Breakpoint.Small) {
                        _sizeFilter = '';
                    }
                }

                if ($scope.resolvedImage != (imageSrc + _sizeFilter)) {
                    if (_sizeFilter == '') {
                        $scope.resolvedimage = null;
                    } else {
                        $scope.resolvedImage = imageSrc + _sizeFilter;
                    }
                    //console.log(' resolvedBackground: ', _sizeFilter, '\n imageSrc: ', imageSrc, '\n imageSrc + _sizeFilter: ',imageSrc + _sizeFilter, '\n $scope.resolvedImage: ', $scope.resolvedImage);
                }

            }

            _window.resize(function() {
                updateBackgroundImage($scope.er.activeVehicle.imageSrc);
            });


            $scope.init = function() {
                $scope.er = {
                    activeVehicle: {}
                };
            }

        }
    }])
    .directive('lxRangeExploreSlider', ['$window', '$timeout', '$filter', '$http', '$location', '$rootScope', function($window, $timeout, $filter, $http, $location, $rootScope) {
        exploreRangeSliderController.$inject = ['$scope', '$http', '$filter', '$timeout', '$window', '$interval', '$location', '$rootScope'];
        return {
            scope: true,
            restrict: 'A',
            controller: exploreRangeSliderController,
            controllerAs: 'ers',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {

                $rootScope.$on('calculate-widths', function(event, args) {
                    scope.carouselSlider = element;
                    scope.activeMarker = element.find('.lx-explore-range__marker-js');
                    scope.$innerContainer = scope.carouselSlider.children().first('.lx-explore-range__scroll-container');
                    scope.itemWidth = scope.$innerContainer.find('.lx-explore-range__subpanel').first().width();

                    scope.outerContainerWidth = scope.carouselSlider.width();
                    scope.maxScrollX = scope.$innerContainer.width() - scope.outerContainerWidth;


                    //use native swipe scrolling for touch devices, If its a laptop with touch and wide screen assume they are using K&M
                    if (!Modernizr.touchevents || angular.element($window).width() >= Lexus.Breakpoint.Medium) {
                        scope.carouselSlider.mousemove(function(event) {
                            scope.smoothScrollTo(event);
                        });
                        scope.carouselSlider.mouseleave(function(event) {
                            scope.smoothSnapToNearest(event);
                        });
                    }


                    angular.forEach(scope.$innerContainer.children('.lx-explore-range__subpanel'), function(value, key) {
                        value.className = value.className;
                    });
                    //scope.smoothSnapToNearest(event);
                });

                angular.element($window).bind('resize', function() {
                    $rootScope.$broadcast('calculate-widths');
                });
            }
        }


        function exploreRangeSliderController($scope, $http, $filter, $timeout, $window, $interval, $location, $rootScope) {
            var ers = this;

            $scope.init = function(overscrollPadding, markerRadius) {
                $scope.overscrollPadding = overscrollPadding;
                $scope.markerRadius = markerRadius;
                $scope.carouselTweenTime = 1;
                $scope.markerTweenTime = 1;
                $scope.easingFunction = Power2.easeOut;
                $scope.sliderItemCollection = [];
            }

            $scope.smoothScrollToIndex = function(index) {
                var left = $scope.itemWidth * index;
                left = left + $scope.overscrollPadding;
                TweenLite.to($scope.carouselSlider, $scope.carouselTweenTime, {
                    scrollTo: {
                        x: (left)
                    },
                    ease: $scope.easingFunction
                });
                $rootScope.$broadcast('pause-smooth-scroll-to', '');
            }

            $rootScope.$on('pause-smooth-scroll-to', function(event, args) {
                $rootScope.pauseSmoothScrollTo = true;
                setTimeout(function() {
                    $rootScope.pauseSmoothScrollTo = false;
                }, 1500);
            });

            $scope.smoothScrollTo = function(event) {
                if ($rootScope.pauseSmoothScrollTo === true) {
                    return;
                }
                var offsetX = $scope.carouselSlider.position().left;
                var posInPc = (event.clientX - offsetX) / $scope.outerContainerWidth;
                $scope.carouselPos = $scope.maxScrollX * posInPc;
                TweenLite.to($scope.carouselSlider, $scope.carouselTweenTime, {
                    scrollTo: {
                        x: ($scope.carouselPos)
                    },
                    ease: $scope.easingFunction
                });
            }

            $scope.smoothSnapToNearest = function(event) {
                var offset = $scope.overscrollPadding;
                var snapWidth = $scope.itemWidth;

                var misalignment = ($scope.carouselPos % snapWidth) - offset;
                var previousSnapPoint = $scope.carouselPos - misalignment;
                var nextSnapPoint = $scope.carouselPos - misalignment + snapWidth;

                if (misalignment === 0) {
                    return;
                } else if (misalignment < (snapWidth / 2)) {
                    TweenLite.to($scope.carouselSlider, $scope.carouselTweenTime, {
                        scrollTo: {
                            x: previousSnapPoint
                        },
                        ease: $scope.easingFunction
                    });
                } else {
                    TweenLite.to($scope.carouselSlider, $scope.carouselTweenTime, {
                        scrollTo: {
                            x: nextSnapPoint
                        },
                        ease: $scope.easingFunction
                    });
                }
            }

            $scope.setMarkerPosition = function(failCount) {
                var i = failCount || 0;
                if (!$scope.activeMarker && i < 10) {
                    setTimeout(function() {
                        $scope.setMarkerPosition(i + 1);
                    }, 100);
                    return;
                }
                var newPosition = Math.round($scope.overscrollPadding + ($scope.carouselPos * $scope.itemWidth) + ($scope.itemWidth * 0.5) - $scope.markerRadius);
                $scope.activeMarker.css('left', newPosition + 'px');
                //why? $scope.smoothScrollToIndex($scope.carouselPos);
            }

            $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                $scope.sliderItemCollection[0].style = {
                    "margin-left": $scope.overscrollPadding + "px"
                };
                $scope.sliderItemCollection[$scope.sliderItemCollection.length - 1].style = {
                    "margin-right": $scope.overscrollPadding + "px"
                };
                $timeout(function() {
                    $rootScope.$broadcast('calculate-widths')
                }, 100);
                $scope.setMarkerPosition();
            });

            this.addSliderItem = function(data) {
                $scope.sliderItemCollection[data.index] = data;
                $scope.sliderItemCollection[data.index].disabled = false;
                $scope.sliderItemCollection[data.index].style = {};
                if (data.init) {
                    $scope.carouselPos = parseInt(data.index);
                    $scope.sliderItemCollection[data.index].active = true;
                    $timeout(function() {
                        $rootScope.$broadcast('change-active-vehicle', data)
                    }, 100);
                } else {
                    $scope.sliderItemCollection[data.index].active = false;
                }
            }

            $scope.changeActiveVehicleClick = function(index) {

                if ($scope.sliderItemCollection[index].disabled) {
                    $rootScope.$broadcast('set-body-type', 'all');
                }

                $scope.carouselPos = index;
                angular.forEach($scope.sliderItemCollection, function(value, key) {
                    value.active = (key == index);
                });
                $scope.setMarkerPosition();
                $timeout(function() {
                    $rootScope.$broadcast('change-active-vehicle', $scope.sliderItemCollection[index])
                }, 100);



            }



            $rootScope.$on('filter-body-type', function(event, args) {
                var newActiveIndex = 0;
                var needtoApplyNewIndex = false;
                angular.forEach($scope.sliderItemCollection, function(value, key) {
                    var isDisabled = !(args == 'all' || args == value.bodyType);
                    value.disabled = isDisabled;
                    if (isDisabled && value.active) {
                        value.active = false;
                        needtoApplyNewIndex = true;
                    }
                });
                if (needtoApplyNewIndex) {
                    var keepGoing = true;
                    angular.forEach($scope.sliderItemCollection, function(value, key) {
                        if (keepGoing) {
                            if (!value.disabled) {
                                value.active = true;
                                $scope.smoothScrollToIndex(key);
                                keepGoing = false;
                                $timeout(function() {
                                    $rootScope.$broadcast('change-active-vehicle', value);
                                    $scope.changeActiveVehicleClick(value.index);
                                }, 100);
                            }
                        }
                    });
                }
            });


        }
    }])
    .directive('lxRangeExploreSliderItem', ['$window', '$timeout', '$filter', '$http', '$location', '$rootScope', function($window, $timeout, $filter, $http, $location, $rootScope) {
        return {
            scope: true,
            restrict: 'AE',
            require: '^lxRangeExploreSlider',
            link: function(scope, element, attrs, exploreRangeSliderController) {
                exploreRangeSliderController.addSliderItem(attrs);
            }
        }

    }]);;
(function(undefined) {
    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .directive('lxRangeTechData', RangeTechDataDirective);

    RangeTechDataDirective.$inject = ['$http', '$filter', '$timeout', '$interval',
        '$location', '$rootScope', 'UserPreferencesService', 'API', '$sce', '$log'
    ];

    function RangeTechDataDirective($http, $filter, $timeout, $interval, $location, $rootScope, UserPreferencesService, API, $sce, $log) {
        rangeTechDataController.$inject = ['$scope'];
        return {
            scope: true,
            restrict: 'A',
            controller: rangeTechDataController,
            controllerAs: 'rtd',
            bindToController: true
        };

        function rangeTechDataController($scope) {
            var rtd = this;
            $scope.rtd.urlParameters = $location.search();

            rtd.apiService = API;

            $scope.init = function() {
                $scope.rtd = $scope.rtd || {};

                var dataVehicle = UserPreferencesService.getLexusVehicle($scope.rtd.urlParameters);
                $scope.rtd.data = {
                    model: UserPreferencesService.getLexusVehicle().model ? UserPreferencesService.getLexusVehicle().model : null,
                    grade: UserPreferencesService.getLexusVehicle() ? UserPreferencesService.getLexusVehicle().grade : null,
                    engineVariant: null,
                    featuresData: null,
                    featuresByCategory: []
                };

                $scope.rtd.data.engineVariants = [];

                $scope.rtd.featuresByCategoryRendering = false;

                if (dataVehicle) {
                    $scope.rtd.data.engineVariant = dataVehicle.engineVariant;
                }

                if ($scope.rtd.data.engineVariant) {
                    updateVehicleSelection($scope.rtd.data.model, $scope.rtd.data.engineVariant, $scope.rtd.data.grade);
                }
            };

            $scope.loadLazyImages = function() {
                $rootScope.$broadcast('broadcast.lazyLoadRevalidate');
            };

            $scope.getActiveClass = function(counter, variant, totalVariants) {

                if (counter === 0) {
                    $scope.defaultTab = variant;
                }

                if ($scope.rtd.data.engineVariant === variant || !$scope.rtd.data.engineVariant && counter === 0) {
                    $scope.defaultTab = variant;
                    if ($scope.selectedTab === undefined) {
                        $scope.updateVehicleSelectionIndex(counter, true);
                    }
                    $scope.selectedTab = counter;
                    return 'active';
                }

                if (counter === totalVariants - 1 && $scope.selectedTab === undefined) {
                    $("#" + $scope.defaultTab.replace(" ", "")).addClass("active");

                    $scope.rtd.data.engineVariant = $scope.defaultTab;

                    $scope.selectedTab = 0;
                    //update the cookie to default tab
                    $scope.updateVehicleSelectionIndex(0, true);
                }

                return '';
            };

            function updateVehicleSelection(model, engineVariant, grade) {

                $scope.rtd.data.engineVariant = engineVariant;

                $rootScope.$broadcast('vehicle-preference-change', {
                    model: model,
                    grade: grade,
                    engineVariant: engineVariant
                });

                fetchTechDataDetails();
            }

            $scope.updateVehicleSelectionIndex = function(index) {

                updateVehicleSelection($scope.rtd.data.engineVariants[index].model, $scope.rtd.data.engineVariants[index].engineVariant, $scope.rtd.data.engineVariants[index].grade);
            };

            $scope.addEngineVariant = function(index, model, engineVariant, grade) {
                $scope.rtd.data.engineVariants[index] = {
                    'model': model,
                    'engineVariant': engineVariant,
                    'grade': grade
                };
            };

            $scope.findValueByKey = function(grade, feature) {
                if (feature.specs) {
                    return feature.specs[grade];
                }
            };

            function fetchTechDataDetails() {
                $scope.rtd.featuresByCategoryLoading = true;

                API.get($filter('formatArgs')(Lexus.API.Lookup.RangeTechDataFeatures, [
                        Lexus.ID.Site,
                        $scope.rtd.data.engineVariant
                    ]))
                    .then(function(data) {
                        if (!data) {
                            return;
                        }

                        $scope.rtd.featuresByCategoryRendering = true;
                        $timeout(function() {

                            $scope.rtd.data.featuresByCategory = data.data;
                            $scope.rtd.featuresByCategoryRendering = false;
                        }, 1);

                        $rootScope.$broadcast('refresh-gtm', 'Tech Data');

                        $scope.rtd.featuresByCategoryLoading = false;
                    }, function(error) {
                        $log.error(error);
                        $scope.rtd.featuresByCategoryLoading = false;
                    });
            };
        }
    }

}());



;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxRepairerLookup', ['$rootScope', 'RepairersService', function() {
        RepairerLookupController.$inject = ['$scope', '$rootScope', '$http', 'RepairersService', 'AddressSuggestService', 'UserPreferencesService'];
        return {
            scope: true,
            restrict: 'A',
            controller: RepairerLookupController,
            controllerAs: 'dlc',
            bindToController: true,
            link: function(scope, element, attrs) {

            }
        };

        function RepairerLookupController($scope, $rootScope, $http, RepairersService, AddressSuggestService) {
            var dlc = this;

            $scope.init = function() {
                $scope.ds = {
                    state: 'nsw',
                    results: [],
                    loading: false
                };
                $scope.repairerSearch();
            }

            $scope.repairerInit = function() {

            }

            $scope.repairerSearch = function() {
                $scope.ds.loading = true;
                RepairersService.setParam('state', $scope.ds.state); //Dummy Implementation needs to be changed
                RepairersService.GetResults();
            }

            $scope.$on('repairers-search-results-received', function(event, data) {
                $scope.ds.results = data.Data;
                $scope.ds.loading = false;
            });



        }

    }]);;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxResponsiveSet', [function() {
        responsiveSetController.$inject = ['$scope', '$window'];
        return {
            scope: true,
            restrict: 'A',
            controller: responsiveSetController,
            controllerAs: 'rs',
            bindToController: true,
            link: function(scope, element, attrs) {}
        };


        function responsiveSetController($scope, $window) {
            var rs = this;
            rs.breakpoint = Lexus.Breakpoint.Small;

            function responsiveSet(type, breakPoint, set) {
                function isMobile() {
                    return (breakPoint >= window.innerWidth);
                };

                if (isMobile() && type === 'mobile') {
                    return set;
                }
                if (!isMobile() && type === 'desktop') {
                    return set;
                }

                return '';
            }

            $scope.desktopSet = function(set) {
                return responsiveSet('desktop', rs.breakpoint, set);
            };

            window.addEventListener('resize', function() {

                setTimeout(function() {
                    $scope.$digest();
                }, 50);
            });
        }
    }]);;
(function() {

    angular.module('Lexus.Directives')
        .directive("lxUnsubscribeQuestion", UnsubscribeQuestionDirective);

    function UnsubscribeQuestionDirective() {

        return {
            replace: true,
            scope: {
                name: "@",
                label: "@",
                description: "@",
                ngModel: "="
            },
            template: '<div class="lx-form-text-label lx-form-unsubscribe" for="{{name}}">' +
                '<input class="lx-form-checkbox" type="checkbox" id="{{name}}" name="{{name}}" ng-model="ngModel"/>' +
                '<label class="lx-form-checkbox-label lx-form-unsubscribe__label" for="{{name}}" data-gtm-label="{{label}}"> {{label}}</label>' +
                '<p class="lx-form-unsubscribe__explanation">{{description}}</p>' +
                '</div>'
        };
    }

}());;
(function() {

    angular.module('Lexus.Directives')
        .directive('lxFormsUnsubscribeMarketingEmails', formsUnsubscribeMarketingEmailsDirective);

    formsUnsubscribeMarketingEmailsDirective.$inject = ["EloquaService", "$http", "$filter", "FormsService", "$location", "$rootScope"];

    function formsUnsubscribeMarketingEmailsDirective(EloquaService, $http, $filter, formsService, $location, $rootScope) {
        formsUnsubscribeMarketingEmailsController.$inject = ['$scope'];
        return {
            scope: true,
            restrict: 'A',
            controllerAs: 'ffc',
            bindToController: true,
            controller: formsUnsubscribeMarketingEmailsController,
            link: link
        };

        function link(scope, element, attrs, filter, http) {
            scope.successContent = element.find('.lx-form-success');
            scope.failureContent = element.find('.lx-form-failure');

            scope.ffc.form = {
                submitting: false,
                completed: false,
                failed: false
            };

            scope.ffc.formData = JSON.parse(attrs['formData']);
            scope.ffc.fullUnsubscribe = (attrs["fullUnsubscribe"] === "true");
        }

        function formsUnsubscribeMarketingEmailsController($scope) {

            var ffc = this;

            $scope.$on('submit-unsubscribe-marketing-emails-form', function() {

                EloquaService.attachEloquaFields(ffc.formData);

                var params = $location.search();

                ffc.formData.ename = params.ename;
                ffc.formData.emailAddress = params.email;

                ffc.form.submitting = true;

                var formSubmission = '';

                if (ffc.fullUnsubscribe) {
                    formSubmission = Lexus.API.FormSubmission.UnsubscribeMarketingEmailsOwner;
                } else {
                    formSubmission = Lexus.API.FormSubmission.UnsubscribeMarketingEmailProspect;
                }

                var url = $filter('formatArgs')(formSubmission, [Lexus.ID.Site]);

                $http({
                        method: 'POST',
                        url: url,
                        data: ffc.formData
                    })
                    .then(function success(response) {
                        if (response.data.Status == "Success") {
                            ffc.form.completed = true;
                            ffc.form.failed = false;
                            ffc.form.submitting = false;
                            $rootScope.$broadcast('gtm-form-success', 'Unsubscribe Marketing Emails');
                            formsService.ShowResult($scope.successContent[0]);
                        } else {
                            submissionFail(response.data);
                        }
                    }, function error(response) {
                        submissionFail(response.data);
                    })
                    .finally(function() {
                        $rootScope.$broadcast('form-result');
                    });
            });

            function submissionFail(data) {
                ffc.form.failed = true;
                ffc.form.submitting = false;
                ffc.form.completed = true;

                formsService.ShowResult($scope.failureContent[0]);
            }
        }

    }


}());;
//Only allowed to watch rangeBuildPrice.collections.enhancementpacks[]
//Only allowed to emit the enhancement pack selected
(function(undefined) {

    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .directive('lxBuildPriceEnhancementPack', [function() {
            buildPriceEnhancementPackController.$inject = ['$scope', '$q', 'VehicleService', 'BuildPriceService', 'BuildPriceAPIService', 'PricingService', '$log', '$timeout'];
            return {
                scope: {
                    engineVariant: '<variant',
                    grade: '<grade',
                    enhancementPack: '<enhancement',
                    trim: '<trim',
                    colour: '<colour',
                    paintId: '<paintId',
                    specifics: '<specifics',
                    postCode: '<postcode',
                    pricingZone: '<pricingZone',
                    vehicleImage: '<vehicleImage',
                    disableDiffPricing: '<disableDiffPricing',
                    enablePricingByZone: '<enablePricingZone',
                },
                restrict: 'A',
                controller: buildPriceEnhancementPackController,
                controllerAs: 'bpEnPack',
                bindToController: true,
                transclude: true,
                link: function(scope, element, attrs, ctrl, transclude) {
                    transclude(scope, function(clone) {
                        element.append(clone);
                    });
                    scope.init();
                }
            }


            function buildPriceEnhancementPackController($scope, $q, VehicleService, BuildPriceService, BuildPriceAPIService, PricingService, $log, $timeout) {
                var bpEnPack = this;
                bpEnPack.variants = [];

                bpEnPack.setSelection = setSelection;
                bpEnPack.isSelected = isSelected;
                bpEnPack.isNotSelected = isNotSelected;
                bpEnPack.previousPage = previousPage;
                bpEnPack.nextPage = nextPage;
                //bpEnPack.image = '';
                bpEnPack.gradeObj = null;
                bpEnPack.pricingSuccess = true;
                bpEnPack.holdPricingCalls = true;

                $scope.BuildPriceService = BuildPriceService;

                $scope.$on(BuildPriceService.events.postcodeChanged, function(event, data) {
                    getDifferentialPrices();
                });

                $scope.$on(BuildPriceService.events.holdPricingCallsRelay, function(event, data) {
                    //console.info("bpEnPack received holdPricingCalls " + data)
                    bpEnPack.holdPricingCalls = data;
                });

                $scope.$watch('bpEnPack.specifics', $scope.BuildPriceService.watchDebounce(function(newValue, oldValue) {
                    if (newValue != null) {
                        calculateDifferentialPrices();
                    }
                }, 50), true);

                $scope.$watch('bpEnPack.grade', $scope.BuildPriceService.watchDebounce(function(newValue, oldValue) {
                    if (newValue != null) {
                        console.info("%c 2. buildPriceEnhancementPackController received GRADE: ", "color: mediumvioletred;", newValue + " (with VARIANT: " + bpEnPack.engineVariant + ")", bpEnPack);
                        getSelectedGrade(bpEnPack.engineVariant, newValue);
                    }
                }, 50), true);

                function getSelectedGrade(engineVariantName, gradeName, clearDownstream) {
                    var engineVariant = BuildPriceAPIService.findEngineVariantInVehicleData(engineVariantName);
                    if (engineVariant) {

                        var grade = engineVariant.grades.find(function(grade) {
                            return grade.uriName == gradeName;
                        });

                        if (grade && grade.id) {
                            bpEnPack.gradeObj = grade; //Set it so it can be accessed by the promise response

                            bpEnPack.variants = [];

                            BuildPriceAPIService.getVariants(bpEnPack.engineVariant, grade.id, enhancementPacksReceived);
                        } else {
                            console.error("buildPriceEnhancementPackController cannot load enhancement packs for EngineVariant: " + bpEnPack.engineVariant + " + Grade: " + bpEnPack.grade);
                        }
                    }
                }

                function enhancementPacksReceived(response) {
                    bpEnPack.variants = response;

                    getDifferentialPrices();

                    $scope.$emit(BuildPriceService.events.enhancementPacksReceived, bpEnPack.enhancementPack);
                    getPackSelectionInGrade();
                }

                function getDifferentialPrices() {
                    if (bpEnPack.postCode) {
                        for (var index = 0; index < bpEnPack.variants.length; index++) {
                            bpEnPack.variants[index].showSpinner = true;
                        }
                        if (!bpEnPack.disableDiffPricing) {
                            //console.info("bpEnPack waiting for holdPricingCalls to clear");
                            BuildPriceService.waitFor.call($scope, 'bpEnPack.holdPricingCalls', BuildPriceService.waitCondition.ISSTRICTLYFALSE).
                            then(function success(value) {
                                //console.info("holdPricingCalls cleared in bpEnPack");
                                getPrices().then(calculateDifferentialPrices, ajaxFailure);
                            });
                        }
                    }
                }

                function getPrices() {
                    var promises = [];

                    for (var index = 0; index < bpEnPack.variants.length; index++) {
                        promises.push(getPromise(bpEnPack.variants[index]));
                    }

                    return $q.all(promises).then(function(responses) {
                        bpEnPack.pricingSuccess = true;

                        for (var returnIndex = 0; returnIndex < responses.length; returnIndex++) {
                            //console.log("bpEnPack -> responses[returnIndex].data.driveAway: ", responses[returnIndex].data.driveAway);
                            var resp = responses[returnIndex];
                            if (resp.status != "Success") {
                                bpEnPack.pricingSuccess = false;
                            } else if (resp.data && resp.data.driveAway) {
                                bpEnPack.variants[returnIndex].driveAwayPrice = parseFloat(resp.data.driveAway);
                            } else {
                                //success but no price
                            }
                        }
                        pricingReport();

                    }, ajaxPriceFailure);

                    function getPromise(variant) {
                        PricingService.setParam("enablePricingByZone", bpEnPack.enablePricingByZone);
                        return PricingService.driveAwayByEnhancementPack(bpEnPack.gradeObj.id, variant.mdmid, bpEnPack.postCode, bpEnPack.pricingZone);
                    }
                }

                function calculateDifferentialPrices() {

                    var selectedVariant = BuildPriceAPIService.getVariantByName(bpEnPack.engineVariant, bpEnPack.gradeObj.id, bpEnPack.enhancementPack);
                    if (!bpEnPack.variants) {
                        return;
                    }

                    for (var index = 0; index < bpEnPack.variants.length; index++) {
                        if (!isSelected(bpEnPack.variants[index]) && selectedVariant) {
                            bpEnPack.variants[index].differentialPrice = bpEnPack.variants[index].driveAwayPrice - selectedVariant.driveAwayPrice;
                        } else {
                            bpEnPack.variants[index].differentialPrice = null;
                        }

                        bpEnPack.variants[index].showSpinner = false;
                    }
                }

                function ajaxFailure(data) {
                    console.error('BuildPrice AjaxFailure -> EnPack: ', data);

                    $scope.$emit('open-modal-window', {
                        content: 'Oops, something went wrong while obtaining the details. If the problem persists, please contact your dealer directly.',
                        wrapper: ['<p class="lx-modal__paragraph">', '</p>']
                    });
                }

                function ajaxPriceFailure(data) {
                    console.error('BuildPrice AjaxPriceFailure -> EnPack: ', data);

                    //$scope.$emit('open-modal-window', {
                    //    content: 'Oops, something went wrong while obtaining the details. If the problem persists, please contact your dealer directly.',
                    //    wrapper: ['<p class="lx-modal__paragraph">', '</p>']
                    //});
                }

                function pricingReport() {
                    if (bpEnPack.pricingSuccess) {
                        angular.element('.lx-build-price-enhancement-pack').removeClass('pricing-error');
                    } else {
                        console.log("bpGrade pricingSuccess: ", bpEnPack.pricingSuccess);
                        angular.element('.lx-build-price-enhancement-pack').addClass('pricing-error');
                    }
                }

                function getPackSelectionInGrade() {
                    //check if existing selection is in valid set, if it is, don't change the selection

                    var selectionValid = false;

                    if (bpEnPack.enhancementPack) {
                        if (bpEnPack.variants.find(function(ep) {
                                return ep.uriName === bpEnPack.enhancementPack;
                            }) || bpEnPack.variants.find(function(ep) {
                                return ep.enhancementPackName === bpEnPack.enhancementPack;
                            })) {
                            selectionValid = true;
                        }
                    }

                    var selectionNotNull = bpEnPack.enhancementPack != null;

                    if (bpEnPack.variants.length > 0 && !selectionValid) {
                        var defaultSelection = getDefaultEnhancementPack();
                        if (selectionNotNull) {
                            //trigger invalid selection error
                            var invalidSelectionData = {
                                controllerName: $scope.BuildPriceService.stepIds.ENHANCEMENT_PACK,
                                $scope: $scope,
                                defaultValue: defaultSelection.uriName,
                                invalidValue: bpEnPack.enhancementPack,
                                /*
                                 * Once we have a user-initiated selection process implement these variables
                                 userInitiated: true/false,
                                 clearDownstreamFrom: userInitiated ? 3 : null
                                 */
                            };
                            $scope.BuildPriceService.emitInvalidSelection(invalidSelectionData)
                        }

                        bpEnPack.enhancementPack = defaultSelection.uriName;
                    }

                    $scope.$emit(BuildPriceService.events.enhancementPackSelected, bpEnPack.enhancementPack);

                    bpEnPack.currentPage = setCurrentPage(indexOfPack(bpEnPack.enhancementPack));
                }

                function getDefaultEnhancementPack() {
                    return bpEnPack.variants.find(function(variant) {
                        return variant.isBaseVariant == true;
                    });
                }

                function getSelectedEnhancementPack() {
                    return (bpEnPack.variants || []).find(function(item) {
                        return item.uriName == bpEnPack.enhancementPack;
                    });
                }

                function setSelection(pack) {

                    var packName = (bpEnPack.enhancementPack === pack.uriName) ? getDefaultEnhancementPack().uriName : pack.uriName;

                    bpEnPack.packIndex = (indexOfPack(packName)) ? indexOfPack(packName) : 0;
                    bpEnPack.currentPage = setCurrentPage(bpEnPack.packIndex, true);
                    if (bpEnPack.enhancementPack != packName) {

                        $scope.$emit(BuildPriceService.events.userSelection, 'Enhancement Pack selected');

                        emitPackSelection(packName, true, true, bpEnPack.trim, bpEnPack.colour);
                    }
                    return false;
                }

                function isSelected(pack) {
                    return bpEnPack.enhancementPack === pack.uriName;
                }

                function isNotSelected(pack) {
                    var notSelected = false;

                    if (getDefaultEnhancementPack()) {
                        if (bpEnPack.enhancementPack != getDefaultEnhancementPack().uriName) {
                            if (bpEnPack.enhancementPack != pack.uriName) {
                                notSelected = true;
                            }
                        }
                    }

                    return notSelected;
                }

                function isCurrentStep(current) {
                    var current = current != null ? current : false;
                    bpEnPack.isCurrentStep = current;
                }

                function indexOfPack(packName) {
                    var packs = bpEnPack.variants;
                    for (var i = 0; i < packs.length; i++) {
                        if (packs[i].uriName === packName) {
                            return i;
                        }
                    }
                    $log.error('Enhancement Pack ' + packName + ' not found');
                }

                function setCurrentPage(packIndex, user) {
                    var user = user != null ? user : false;
                    var page = (user) ? bpEnPack.currentPage : 0;
                    if (packIndex != 0) {
                        page = packIndex - 2;
                    }
                    return page;
                }

                function previousPage() {
                    if (bpEnPack.currentPage > 0) bpEnPack.currentPage--;
                }

                function nextPage() {
                    if (bpEnPack.currentPage <= ((bpEnPack.variants.length - 2) - bpEnPack.currentPage)) bpEnPack.currentPage++;
                }

                function emitPackSelection(packName, clearDownstream, userInitiated, revertTrim, revertColour) {
                    var data = {
                        clearDownstream: clearDownstream,
                        selection: packName,
                        userInitiated: userInitiated,
                        revertTrim: revertTrim,
                        revertColour: revertColour

                    };
                    $scope.$emit(BuildPriceService.events.enhancementPackSelected, data);
                }

                //#region EVENTS
                $scope.$on(BuildPriceService.events.pageNavigationBroadcast, function(e, target) {
                    var isCurrent = target.id == 'enhancement';
                    bpEnPack.isCurrentStep = isCurrent;

                    // If on phone scroll to currently selected enhancement pack. 
                    if (isCurrent && indexOfPack(bpEnPack.enhancementPack) != 0 && window.matchMedia("(max-width: 767px)").matches) {
                        setTimeout(function() {
                            window.scrollTo(0, angular.element('.' + bpEnPack.enhancementPack.replace(/ /g, ''))[0].offsetTop + 250);
                        });
                    }
                });

                $scope.$on(BuildPriceService.events.threeSixtyLoad, function(event, data) {
                    console.info("%c buildPriceEnhancementPackController received threeSixtyLoad: ", "color: mediumvioletred;", data);
                });

                $scope.init = function() {}
            }
        }]);

}());;
(function(undefined) {
    'use strict';

    /* Directives */
    angular.module('Lexus.Directives').directive('lxBuildPriceExterior', [
        function() {
            buildPriceExteriorController.$inject = [
                '$scope',
                '$timeout',
                '$element',
                'BuildPriceService',
                'BuildPriceAPIService',
                'ViewportService'
            ];

            return {
                scope: {
                    engineVariant: '<variant',
                    trim: '<trim',
                    colour: '<colour'
                },
                restrict: 'A',
                controller: buildPriceExteriorController,
                controllerAs: 'bpExterior',
                template: '<div data-ng-transclude></div>',
                bindToController: true,
                transclude: true,
                require: '^lxBuildPricePaintTrim',
                link: function(scope, element, attrs, ctrl, transclude) {
                    scope.loadingExterior = true;
                    ctrl.registerExterior(scope.bpExterior);
                }
            };

            function buildPriceExteriorController(
                $scope,
                $timeout,
                $element,
                BuildPriceService,
                BuildPriceAPIService,
                ViewportService
            ) {
                var bpExterior = this;

                bpExterior.loadExterior = function(data) {
                    $scope.loadingExterior = true;
                    $scope.$emit(BuildPriceService.events.threeSixtyLoad, data);
                    loadImages(data.gradeId, data.variantId, data.trimId, data.materialCode);
                };

                $scope.$on('bp-user-selection', function(event) {
                    console.info("%c 3. buildPriceExteriorController 'bp-user-selection': ", 'color: blue; ', event);
                });

                function loadImages(gradeId, variantId, trimId, materialCode) {
                    BuildPriceAPIService.getExteriorImages(
                        bpExterior.engineVariant,
                        gradeId,
                        variantId,
                        trimId,
                        materialCode,
                        function(images) {
                            var reelElement = $($element)
                                .find('img')
                                .first();
                            initReel(reelElement, images);
                            $scope.$emit(BuildPriceService.events.threeSixtyLoaded);
                        }
                    );
                    $scope.$emit(BuildPriceService.events.holdPricingCalls, false);
                };

                function initReel($element, images) {
                    console.log('is loading reel');
                    var bestFrame = 18;

                    images = ViewportService.isDesktop() ?
                        images.threeSixtyImagesDesktop :
                        images.threeSixtyImagesMobile;

                    // Prevent image flickering back to old one as Reel performs teardown
                    if ($element.reel('backup')) {
                        $element.reel('backup').attr.src = $element.src;
                    }

                    // Preserve angle if reel already exists
                    if ($element.reel('frame')) {
                        bestFrame = $element.reel('frame');
                    }

                    $element.unreel();
                    $element
                        .reel({
                            opening: 0,
                            speed: 0,
                            images: images,
                            frame: bestFrame,
                            frames: images.length,
                            laziness: 1, // don't "underclock" mobile framerate
                            scrollable: true,
                            wheelable: false
                        })
                        .on('loaded', function(ev) {
                            if ($scope.loadingExterior) {
                                $scope.$apply(function() {
                                    $scope.loadingExterior = false;
                                });
                            }
                        })
                        .on('pan', function() {
                            if (bpExterior.reelPanTimeout) {
                                $timeout.cancel(bpExterior.reelPanTimeout);
                            }

                            bpExterior.reelPanTimeout = $timeout(function() {
                                $scope.$emit(BuildPriceService.events.gtmEvent, {
                                    source: '360'
                                });
                            }, 50); // Don't bother showing "loading" for <100ms
                        });
                };
            }
        }
    ]);
})();;
(function(undefined) {

    "use strict";

    angular.module("Lexus.Directives")
        .directive("buildPriceGradeFeature", BuildPriceGradeFeatureDirective);

    function BuildPriceGradeFeatureDirective() {
        return {
            scope: {
                expression: "="
            },
            restrict: "E",
            replace: false,
            template: '<span class="variant-feature" ng-bind-html="expression"></span><br />'
        };
    }

})();;
//Only Allowed to watch 
//BuildPriceAPIService.data[ct200h].grades
//Only allowed to emit the grade selected
(function(undefined) {

    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .directive('lxBuildPriceGrade', [function() {
            BuildPriceGradeController.$inject = ['$scope', 'PricingService', '$q', 'VehicleService', 'BuildPriceService', 'BuildPriceAPIService'];
            return {
                scope: {},
                restrict: 'A',
                controller: BuildPriceGradeController,
                controllerAs: 'bpGrade',
                bindToController: {
                    engineVariant: '<variant',
                    grade: '<grade',
                    enhancementPack: '<enhancement',
                    trim: '<trim',
                    colour: '<colour',
                    postCode: '<postcode',
                    pricingZone: '<pricingZone',
                    specifics: '<specifics',
                    disableDiffPricing: '<disableDiffPricing',
                    enablePricingByZone: '<enablePricingZone',
                },
                transclude: true,
                link: function(scope, element, attrs, ctrl, transclude) {
                    transclude(scope, function(clone) {
                        element.append(clone);
                    });
                    scope.init();
                }
            }




            function BuildPriceGradeController($scope, PricingService, $q, VehicleService, BuildPriceService, BuildPriceAPIService) {
                var bpGrade = this;

                //bpGrade.setSelection = setSelection;
                bpGrade.getPreviousGrade = getPreviousGrade;
                bpGrade.getNextGrade = getNextGrade;
                //bpGrade.BuildPriceService = BuildPriceService; 
                //bpGrade.BuildPriceAPIService = BuildPriceAPIService;
                bpGrade.isSelected = isSelected;
                bpGrade.pricingSuccess = true;
                bpGrade.holdPricingCalls = true;

                $scope.bpGrade.setSelection = function(grade) {
                    bpGrade.gradeIndex = indexOfGrade(grade.name);

                    $scope.$emit(BuildPriceService.events.onOfferText, grade.onOfferText);

                    if (bpGrade.grade != grade.uriName) {

                        $scope.$emit(BuildPriceService.events.userSelection, 'Grade selected');

                        emitGradeSelection(grade.uriName, true, true, bpGrade.enhancementPack, bpGrade.trim, bpGrade.colour);
                    }
                    return false;
                }

                $scope.$on(BuildPriceService.events.holdPricingCallsRelay, function(event, data) {
                    //console.info("bpGrade received holdPricingCalls: ", data)
                    bpGrade.holdPricingCalls = data;
                });


                $scope.$on(BuildPriceService.events.postcodeChanged, function(event, data) {
                    getDifferentialPrices();
                });

                $scope.$watch('bpGrade.specifics', BuildPriceService.watchDebounce(function(newValue, oldValue) {
                    if (newValue && oldValue && newValue != oldValue) {
                        // if (newValue != null) {
                        console.info("%c buildPriceGradeController received SPECIFICS: ", "color: gold;", newValue);
                        VehicleService.getVehicleImages(newValue.gradeId, newValue.variantId, newValue.trimId, newValue.materialCode).then(function(response) {
                            bpEnPack.image = response.data.threeSixtyImagesDesktop[2];
                        });
                    }
                }, 50), true);

                $scope.$watch('bpGrade.grade', BuildPriceService.watchDebounce(function(newValue, oldValue) {
                    if (oldValue && newValue != oldValue) {
                        calculateDifferentialPrices();
                    }
                }, 50), true);

                $scope.$watch('bpGrade.engineVariant', BuildPriceService.watchDebounce(function(newValue, oldValue) {
                    if (newValue != null) {

                        console.info("%c 1. buildPriceGradeController $watch ENGINE VARIANT: ", "color: gold; ", newValue);

                        var previousSelectionNull = (oldValue == null);
                        var selectionChanged = (oldValue !== newValue);

                        $scope.getGradeSelectionInVariant(newValue, (selectionChanged && !previousSelectionNull), true);
                    }
                }, 50), true);


                $scope.getGradeSelectionInVariant = function(engineVariant, clearDownstream, userInitiated) {

                    var variantData = BuildPriceAPIService.findEngineVariantInVehicleData(engineVariant);

                    bpGrade.grades = variantData.grades;

                    for (var index = 0; index < bpGrade.grades.length; index++) {
                        bpGrade.grades[index].showSpinner = false;
                        bpGrade.grades[index].driveAwayPrice = 0;
                    }

                    //check if existing selection is in valid set, if it is, don't change the selection
                    var selectionValid = bpGrade.grade ? bpGrade.grades.find(function(grade) {
                        return grade.uriName === bpGrade.grade;
                    }) != null : false;
                    var selectionNotNull = bpGrade.grade != null;

                    if (bpGrade.grades.length > 0 && !selectionValid) {
                        if (selectionNotNull) {
                            //trigger invalid selection error
                            var invalidSelectionData = {
                                controllerName: BuildPriceService.stepIds.GRADE,
                                $scope: $scope,
                                defaultValue: bpGrade.grades[0].uriName,
                                invalidValue: bpGrade.grade,
                                userInitiated: userInitiated,
                                clearDownstreamFrom: userInitiated ? 2 : null
                            };
                            BuildPriceService.emitInvalidSelection(invalidSelectionData);
                        }
                        emitGradeSelection(getDefaultGrade().uriName, (clearDownstream || !selectionValid), false);
                        bpGrade.gradeIndex = indexOfGrade(getDefaultGrade().name);

                        $scope.$emit(BuildPriceService.events.onOfferText, getDefaultGrade().onOfferText);

                    } else {
                        var selectedGrade = BuildPriceAPIService.getGradeByName(engineVariant, bpGrade.grade);
                        if (selectedGrade) {
                            emitGradeSelection(selectedGrade.uriName, (clearDownstream || !selectionValid), false);
                            bpGrade.gradeIndex = indexOfGrade(selectedGrade.name);

                            $scope.$emit(BuildPriceService.events.onOfferText, selectedGrade.onOfferText);

                        }
                    }

                    getFeatures();

                    getDifferentialPrices();

                }

                $scope.isOnOffer = function(obj) {
                    var bool = obj.onOffer;
                    return bool
                }

                function getDifferentialPrices() {
                    //console.info("%c 1B. buildPriceGradeController getGradesDetails: -> bpGrade.postCode", "color: gold; ", bpGrade.postCode);
                    if (bpGrade.postCode) {
                        //console.info("bpGrade waiting for holdPricingCalls to clear");
                        BuildPriceService.waitFor.call($scope, 'bpGrade.holdPricingCalls', BuildPriceService.waitCondition.ISSTRICTLYFALSE).
                        then(function success(value) {
                            console.info("holdPricingCalls cleared in bpGrade");
                            getPrices()
                                //.then(getFeatures, ajaxFailure)
                                .then(calculateDifferentialPrices, ajaxFailure);
                        });
                    }
                }

                function getDefaultGrade() {
                    return bpGrade.grades ? bpGrade.grades[0] : undefined;
                }

                function getPrices() {
                    var promises = [];

                    for (var index = 0; index < bpGrade.grades.length; index++) {
                        promises.push(getPromise(bpGrade.grades[index]));
                        if (!isSelected(bpGrade.grades[index])) {
                            bpGrade.grades[index].showSpinner = true;
                        }
                    }

                    return $q.all(promises).then(function(responses) {

                        bpGrade.pricingSuccess = true;

                        for (var returnIndex = 0; returnIndex < responses.length; returnIndex++) {
                            var resp = responses[returnIndex];
                            if (resp.status != "Success") {
                                bpGrade.pricingSuccess = false;
                            } else if (resp.data && resp.data.driveAway) {
                                bpGrade.grades[returnIndex].driveAwayPrice = parseFloat(resp.data.driveAway);
                            } else {
                                //success but no price
                                bpGrade.pricingSuccess = false;
                            }
                        }

                        pricingReport();
                    }, ajaxPriceFailure);

                    function getPromise(grade) {
                        PricingService.setParam("enablePricingByZone", bpGrade.enablePricingByZone);
                        return PricingService.driveAwayByGrade(grade.id, bpGrade.postCode, bpGrade.pricingZone);
                    }
                }

                function getFeatures() {


                    var promises = [];

                    for (var index = 0; index < bpGrade.grades.length; index++) {
                        promises.push(getPromise(bpGrade.grades[index]));
                    }

                    return $q.all(promises).then(function(responses) {
                        for (var index = 0; index < responses.length; index++) {
                            bpGrade.grades[index].features = angular.copy(responses[index].data[0].features);

                            Object.defineProperty(bpGrade.grades[index], "featureComparisonTitle", {
                                enumerable: true,
                                configurable: false,
                                writable: false,
                                value: responses[index].data[0].featureComparisonTitle
                            });
                        }
                    }, ajaxFailure);

                    function getPromise(grade) {
                        return VehicleService.getVariants(grade.id);
                    }
                }

                function ajaxFailure(data) {
                    console.error('BuildPrice AjaxFailure -> Grade: ', data);

                    $scope.$emit('open-modal-window', {
                        content: 'Oops, something went wrong while obtaining the details. If the problem persists, please contact your dealer directly.',
                        wrapper: ['<p class="lx-modal__paragraph">', '</p>']
                    });
                }

                function ajaxPriceFailure(data) {
                    console.error('BuildPrice AjaxPriceFailure -> Grade: ', data);

                    //$scope.$emit('open-modal-window', {
                    //    content: 'Oops, something went wrong while obtaining the details. If the problem persists, please contact your dealer directly.',
                    //    wrapper: ['<p class="lx-modal__paragraph">', '</p>']
                    //});
                }

                function pricingReport() {
                    if (bpGrade.pricingSuccess) {
                        angular.element('.lx-build-price-grade').removeClass('pricing-error');
                    } else {
                        //console.log("bpGrade pricingSuccess: ", bpGrade.pricingSuccess);
                        angular.element('.lx-build-price-grade').addClass('pricing-error');
                    }
                }

                function calculateDifferentialPrices() {

                    var selectedGrade = BuildPriceAPIService.getGradeByName(bpGrade.engineVariant, bpGrade.grade) || getDefaultGrade();

                    if (!bpGrade.grades) {
                        return;
                    }

                    for (var index = 0; index < bpGrade.grades.length; index++) {
                        if (!isSelected(bpGrade.grades[index]) && selectedGrade) {
                            bpGrade.grades[index].differentialPrice =
                                bpGrade.grades[index].driveAwayPrice - selectedGrade.driveAwayPrice;
                        } else {
                            bpGrade.grades[index].differentialPrice = 0;
                        }

                        bpGrade.grades[index].showSpinner = false;
                    }
                }

                function isSelected(grade) {
                    return bpGrade.grade === grade.uriName;
                }

                function indexOfGrade(gradeName) {
                    var grades = bpGrade.grades;
                    for (var i = 0; i < grades.length; i++) {
                        if (grades[i].name === gradeName) {
                            return i;
                        }
                    }
                    throw new Error('Grade ' + gradeName + ' not found');
                }

                function getPreviousGrade(grade, wrap) {
                    var previousGradeIndex = indexOfGrade(grade) - 1;
                    if (wrap) {
                        previousGradeIndex = (previousGradeIndex + bpGrade.grades.length) % bpGrade.grades.length;
                    } else {
                        previousGradeIndex = Math.max(previousGradeIndex, 0);
                    }
                    return bpGrade.grades[previousGradeIndex];
                }

                function getNextGrade(grade, wrap) {
                    var nextGradeIndex = indexOfGrade(grade) + 1;
                    if (wrap) {
                        nextGradeIndex = nextGradeIndex % bpGrade.grades.length;
                    } else {
                        nextGradeIndex = Math.min(nextGradeIndex, bpGrade.grades.length - 1);
                    }
                    return bpGrade.grades[nextGradeIndex];
                }

                function emitGradeSelection(gradeName, clearDownstream, userInitiated, revertEnhancementPack, revertTrim, revertColour) {
                    var data = {
                        selection: gradeName,
                        clearDownstream: clearDownstream,
                        userInitiated: userInitiated,
                        revertEnhancementPack: revertEnhancementPack,
                        revertTrim: revertTrim,
                        revertColour: revertColour
                    };
                    $scope.$emit(BuildPriceService.events.gradeSelected, data);
                }

                $scope.init = function() {}

            }
        }]);

}());;
(function(undefined) {

    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .directive('lxBuildPriceInterior', [function() {
            buildPriceInteriorController.$inject = ['$scope', '$filter', 'BuildPriceService', 'VehicleService'];
            return {
                scope: {
                    engineVariant: '<variant',
                    trim: '<trim',
                    colour: '<colour',
                    paintId: '<paintId',
                    specifics: '<specifics',
                    tab: '<tab'
                },
                restrict: 'A',
                controller: buildPriceInteriorController,
                controllerAs: 'bpInterior',
                template: '<div data-ng-transclude></div>',
                bindToController: true,
                transclude: true,
                require: '^lxBuildPricePaintTrim',
                link: function(scope, element, attrs, ctrl, transclude) {
                    scope.loadingInterior = true;

                    ctrl.registerInterior(scope.bpInterior);
                }
            }


            function buildPriceInteriorController($scope, $filter, BuildPriceService, VehicleService) {
                var bpInterior = this;

                bpInterior.vlookat = null;
                bpInterior.hlookat = null;
                bpInterior.pano = {
                    id: null,
                    panoControl: null
                };

                bpInterior.ensurePanoRemoved = ensurePanoRemoved;

                //When the trim is changed the available paints need to be found 
                //which gives us new paints and Material Codes
                $scope.$watch('bpInterior.trim', BuildPriceService.watchDebounce(function(newValue, oldValue) {
                    if (newValue != null) {
                        console.info("%c 5. buildPriceInteriorController received Trim: ", "color: purple; ", newValue + " (with VARIANT: " + bpInterior.engineVariant + ")");
                    }
                }, 50));

                $scope.$watch('bpInterior.specifics', BuildPriceService.watchDebounce(function(newValue, oldValue) {
                    if (!bpInterior.tabExterior) {
                        loadPano(newValue, true);
                    } else {
                        //Warms the API call without actually loading krpano
                        loadPano(newValue, false);
                    }

                }, 50), true);


                function ensurePanoRemoved() {
                    if (bpInterior.pano) {
                        removepano(bpInterior.pano.id);
                        bpInterior.pano.panoControl = null;
                    }
                    bpInterior.pano = null;
                }

                this.loadInterior = loadInterior;

                function loadInterior(data) {
                    loadPano(data, true);
                }

                $scope.$on(BuildPriceService.events.pageNavigationBroadcast, function(e, target) {
                    //console.info("%c buildPriceInteriorController pageNaigation: ", "color: purple; ", target);
                    var isCurrent = target.id == 'colour';
                    bpInterior.isCurrentStep = isCurrent;
                    if (bpInterior.specifics) loadPano(bpInterior.specifics, true);
                });

                function loadPano(data, runEmbed) {
                    //Added this to allow us to test for web WebGL issues on mobile browsers. 
                    //To skip loading interior Pano add ?loadInterior=false
                    var loadInterior = (window.location.search.match(/loadInterior\=false/)) ? false : true;

                    if (data && data.gradeId && data.variantId && data.trimId && data.materialCode && loadInterior && bpInterior.isCurrentStep) {

                        $scope.loadingInterior = true;

                        var xml = VehicleService.getVehiclePanoXMLUrl(data.gradeId, data.variantId, data.trimId, data.materialCode);
                        if (runEmbed) {
                            // Data source didn't even change? No work to do.
                            if (bpInterior.pano && bpInterior.pano.xml === xml)
                                return;

                            ensurePanoRemoved();

                            console.info("%c buildPriceInteriorController loadPano: ", "color: purple; ", xml);

                            bpInterior.pano = bpInterior.pano || {};
                            bpInterior.pano.id = 'krpano_' + $scope.$id;
                            bpInterior.pano.xml = xml;

                            var settings = {};
                            settings["events.onviewchange"] = $scope.viewChange;
                            if (bpInterior.hlookat && bpInterior.vlookat) {
                                settings["view.hlookat"] = bpInterior.hlookat;
                                settings["view.vlookat"] = bpInterior.vlookat;
                            }

                            embedpano({
                                id: bpInterior.pano.id,
                                xml: xml,
                                target: "interiorPano",
                                html5: "only",
                                mobilescale: 1.0,
                                onready: function(krPano) {
                                    $scope.loadingInterior = false;
                                },
                                vars: settings
                            });
                        }
                    }
                }

                $scope.viewChange = function() {
                    //krpano.get("view.hlookat");
                    if (!bpInterior.pano.panoControl) {
                        bpInterior.pano.panoControl = document.getElementById(bpInterior.pano.id)
                    }

                    if (bpInterior.pano.panoControl) {
                        //console.info('Change View ' + krpano.get("view.hlookat") + ' ' + krpano.get("view.vlookat"));
                        bpInterior.hlookat = bpInterior.pano.panoControl.get("view.hlookat");
                        bpInterior.vlookat = bpInterior.pano.panoControl.get("view.vlookat");
                    }
                }
            }
        }]);

}());;
//Only Allowed to watch 
//BuildPriceAPIService.data

//Only Allowed to emit 
//model selected
//engine variant selected

(function(undefined) {

    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .directive('lxBuildPriceModel', [function() {
            buildPriceModelController.$inject = ['$scope', '$timeout', 'VehicleService', 'BuildPriceService', 'BuildPriceAPIService'];
            return {

                scope: {
                    selectedModel: '<carmodel',
                    selectedEngineVariant: '<variant'
                },
                restrict: 'A',
                controller: buildPriceModelController,
                controllerAs: 'bpModel',
                bindToController: true,
                transclude: true,
                link: function(scope, element, attrs, ctrl, transclude) {
                    transclude(scope, function(clone) {
                        element.append(clone);
                    });
                    scope.bpModel.currentPage = 0;
                }
            };



            function buildPriceModelController($scope, $timeout, VehicleService, BuildPriceService, BuildPriceAPIService) {
                var bpModel = this;
                bpModel.vehicleData = null;
                bpModel.modelSelected = false;
                bpModel.previousPage = previousPage;
                bpModel.nextPage = nextPage;

                function setCurrentPage(packIndex, user) {
                    var user = user != null ? user : false;
                    var page = (user) ? bpModel.currentPage : 0;
                    if (packIndex != 0) {
                        page = packIndex - 2;
                    }
                    return page;
                }

                function previousPage() {
                    if (bpModel.currentPage > 0) bpModel.currentPage--;
                }

                function nextPage(variantsLength) {
                    if (bpModel.currentPage <= ((variantsLength - 2) - bpModel.currentPage)) bpModel.currentPage++;
                }

                $scope.setModelHeights = function() {
                    $timeout(function() {
                        if (window.innerWidth > 767) {
                            var choosers = angular.element('.lx-build-price-model-chooser__models');

                            for (var c = 0, clen = choosers.length; c < clen; c++) {
                                var models = choosers[c].querySelectorAll('.lx-build-price-model-chooser-model');
                                var modelHeights = [],
                                    lastHeight = 0;
                                for (var m = 0, mlen = models.length; m < mlen; m++) {
                                    modelHeights.push(models[m].clientHeight);
                                }
                                modelHeights.sort();
                                lastHeight = modelHeights[modelHeights.length - 1];
                                if (modelHeights[0] != lastHeight) {
                                    for (var m = 0, mlen = models.length; m < mlen; m++) {
                                        models[m].setAttribute('style', 'height:' + lastHeight + 'px;');
                                    }
                                }
                            }
                        }
                    }, 0, false);
                }

                $scope.emitEngineVariantSelected = function(engineVariant, currentSelection, userInitiated) {
                    var data = {
                        selection: currentSelection === engineVariant.uriName ? null : engineVariant.uriName,
                        clearDownstream: (engineVariant != currentSelection && currentSelection != null),
                        userInitiated: userInitiated
                    };
                    $scope.$emit(BuildPriceService.events.userSelection, 'Model + Variant selected');

                    $scope.$emit(BuildPriceService.events.engineVariantSelected, data);
                };

                $scope.variantHasOffer = function(model) {
                    var hasOffer = false;
                    model.modelEngineVariants.forEach(function(variant) {
                        if ($scope.isOnOffer(variant)) {
                            hasOffer = true;
                        }
                    });

                    return hasOffer;
                };

                $scope.isOnOffer = function(obj) {
                    var bool = obj.onOffer;
                    return bool;
                }

                $scope.emitModelSelected = function(model, currentSelection, userInitiated, modelElement) {
                    //reset
                    bpModel.currentPage = 0;

                    if (userInitiated) {
                        var shortModel = modelElement.replace(/\s+/g, '');
                        setTimeout(function() {
                            $('html, body').animate({
                                scrollTop: $(shortModel).offset().top - 10
                            }, 250)
                        }, 500);
                    }

                    $scope.$emit(BuildPriceService.events.onOfferText, null);

                    var data = {
                        selection: currentSelection === model.uriName ? null : model.uriName,
                        clearDownstream: (model != currentSelection && currentSelection != null),
                        userInitiated: userInitiated
                    };
                    $scope.$emit(BuildPriceService.events.modelSelected, data);
                };

                $scope.ReceiveModels = function() {
                    bpModel.currentPage = setCurrentPage(0);
                    bpModel.vehicleData = BuildPriceAPIService.data;
                    console.info("%c 0. buildPriceModelController -> ReceiveModels: ", "color: darkblue; ", BuildPriceAPIService.data);
                    $scope.$emit(BuildPriceService.events.overviewDataReceived, BuildPriceAPIService.data);
                    $scope.setModelHeights();
                };

                $scope.$on(BuildPriceService.events.pageNavigationBroadcast, function(e, target) {
                    var isCurrent = target.id == 'model';
                    bpModel.isCurrentStep = isCurrent;
                });

                $scope.$watch('bpModel.selectedModel', function(newValue, oldValue) {
                    if (newValue != null && bpModel.isCurrentStep && !bpModel.modelSelected) {
                        var shortModel = '.contains-model--' + newValue.replace(/\s+/g, '');

                        setTimeout(function() {
                            $('html, body').animate({
                                scrollTop: $(shortModel).offset().top - 10
                            }, 250)
                        }, 500);

                        bpModel.modelSelected = true;
                    }
                });

                function init() {
                    //console.log('bpModel init: ', BuildPriceAPIService.getModels($scope.ReceiveModels));
                    BuildPriceAPIService.getModels().then($scope.ReceiveModels);
                }

                init();
            }
        }]);

}());;
"use strict";
/* Directives */
angular.module("Lexus.Directives").directive("lxBuildPriceNavigation", [
    function() {
        buildPriceNavigationController.$inject = ["$scope", "$window", "$interpolate", "$element", "BuildPriceService"];
        return {
            scope: {
                model: "<carmodel",
                engineVariant: "<variant",
                enhancementPack: "<enhancement",
                grade: "<grade",
                colour: "<colour",
                trim: "<trim",
                driveAwayPrice: "<price",
                driveAwayPriceLoading: "<priceLoading",
                vehicleLoading: "<vehicleLoading",
                steps: "<steps",
                activeStepIdx: "<activeIndex",
                paintResolved: "<paintresolved",
                paintId: "<paintId",
                onOfferText: "<onOfferText",
                toggleSbp: "<toggleSbp",
                hideSaveBuild: "<hideSaveBuild",
                postcode: "<postcode",
            },
            restrict: "A",
            controller: buildPriceNavigationController,
            controllerAs: "bpNav",
            bindToController: true,
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude) {
                transclude(scope, function(clone) {
                    element.append(clone);
                });
                scope.init();
            },
        };

        function buildPriceNavigationController($scope, $window, $interpolate, $element, BuildPriceService) {
            var bpNav = this;
            bpNav.activeStep = null;
            bpNav.toggleSbp = false;
            bpNav.lastEngineVariant = null;

            $scope.isLastStep = function() {
                return $scope.bpNav.activeStepIdx + 1 < $scope.bpNav.steps.length;
            };

            $scope.shiftMenu = function(targetIndex) {
                var overflow = angular.element(".lx-c-nav__menu-group");

                overflow.scrollLeft(0);

                var windowwidth = $window.innerWidth;
                var p = angular.element(".lx-bp-nav__item-" + targetIndex + "");

                var scrollPositionCenter = p.offset().left - p.width() / 2;
                var pRight = p.offset().left + p.width();

                if (overflow[0].scrollWidth > windowwidth && pRight > windowwidth / 3) {
                    if (pRight < windowwidth / 2) {
                        overflow.scrollLeft(0);
                    } else {
                        overflow.scrollLeft(scrollPositionCenter + 10);
                    }
                }
            };

            //#region EVENTS

            //allows navigation by index or id
            $scope.emitNavigation = function(data, $event) {
                console.log("emitNavigation: ", bpNav);

                if (bpNav.vehicleLoading) {
                    return;
                }
                if (typeof data == "number") {
                    if (bpNav.steps[data].disabled) {
                        return;
                    }
                } else {
                    if (
                        bpNav.steps.find(function(step) {
                            return step.id === data;
                        }).disabled
                    ) {
                        return;
                    }
                }

                $scope.$emit("bp-page-navigation", data);
            };
            //#endregion

            $scope.$watch(
                function(scope) {
                    return scope.bpNav.activeStepIdx;
                },
                function(newVal, oldVal) {
                    if (typeof newVal == "number") {
                        bpNav.activeStep = bpNav.steps[newVal];

                        $scope.shiftMenu(bpNav.activeStep.id);
                    }
                },
            );

            $scope.$watch(
                function(scope) {
                    return scope.bpNav.engineVariant;
                },
                function(newVal, oldVal) {
                    if (typeof oldVal == "string") {
                        bpNav.lastEngineVariant = oldVal;
                    }
                    if (newVal != null && newVal != oldVal) {
                        setTimeout(function() {
                            var stickyHeight = angular.element(".lx-footer-sticky")[0].clientHeight + 40 + "px";
                            angular.element(".lx-footer").css({
                                "padding-bottom": stickyHeight
                            });
                        }, 100);
                    }
                },
            );

            // SF Personaliation - Build & Price tool
            $scope.$watch(
                "bpNav.activeStep.id",
                BuildPriceService.watchDebounce(function(newVal, oldVal) {
                    let navTitle = newVal.toLowerCase();
                    if (navTitle === "colour") {
                        navTitle = "colour & trim";
                    }
                    if (typeof window !== "undefined") {
                        const sfCustomEvent = new CustomEvent("build-and-price-nav-change", {
                            detail: {
                                navTitle
                            },
                        });
                        window.document.dispatchEvent(sfCustomEvent);
                    }
                }, 600),
                true,
            );

            $scope.encodeUriFragment = function(fragment) {
                return BuildPriceService.encodeUriFragment(fragment);
            };

            $scope.getUrl = function(prefix, route) {
                return prefix + route;
            };

            $scope.init = function() {};

            $scope.openNav = function() {
                bpNav.toggleSbp ?
                    $scope.$emit(BuildPriceService.events.triggerCloseSaveBuildPriceDialog, {}) :
                    $scope.$emit(BuildPriceService.events.triggerSaveBuildPriceDialog, {});
            };

            $scope.openPostcodeModal = function() {
                $scope.$emit(BuildPriceService.events.openPostcodeDialog);
            };

            $scope.isStickyFooterVisible = function() {
                var result = (bpNav.model && bpNav.engineVariant) || !bpNav.hideSaveBuild;
                $scope.$emit("sticky-footer-visible", result);
                return result;
            };

            $scope.openPostcodeSlideout = function() {
                $scope.$emit(BuildPriceService.events.openPostcodeSlideout);
            };
        }
    },
]);;
//Only Allowed to watch 
//rangeBuildPrice.collections.trims[] 
//rangeBuildPrice.collections.colours[]
//rangeBuildPrice.collections.exteriorImages[]
//rangeBuildPrice.collections.interiorImages[]

//Only allowed to emit 
//trim selected 
//colour selected

(function(undefined) {

    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .directive('lxBuildPricePaintTrim', [function() {

            var bpInteriorCtrl = null;
            var bpExteriorCtrl = null;
            buildPricePaintTrimController.$inject = ['$scope', 'BuildPriceService', 'BuildPriceAPIService', 'VehicleService', '$timeout', '$log'];
            return {
                scope: {
                    engineVariant: '<variant',
                    grade: '<grade',
                    trim: '<trim',
                    enhancementPack: '<enhancement',
                    colour: '<colour',
                    paintId: '<paintId',
                    specifics: '<specifics'
                },
                restrict: 'A',
                controller: buildPricePaintTrimController,
                controllerAs: 'bpPaintTrim',
                bindToController: true,
                transclude: true,
                link: function(scope, element, attrs, ctrl, transclude) {
                    transclude(scope, function(clone) {
                        element.append(clone);
                    });
                }
            };


            function buildPricePaintTrimController($scope, BuildPriceService, BuildPriceAPIService, VehicleService, $timeout, $log) {
                var bpPaintTrim = this;

                bpPaintTrim.selectedPaintName = '';
                bpPaintTrim.selectedPaintCode = '';
                bpPaintTrim.selectedTrimName = '';

                bpPaintTrim.setSelectedPaint = setSelectedPaint;
                bpPaintTrim.setSelectedTrim = setSelectedTrim;
                bpPaintTrim.isTrimSelected = isTrimSelected;

                bpPaintTrim.registerInterior = function(controller) {
                    bpInteriorCtrl = controller;
                };

                bpPaintTrim.registerExterior = function(controller) {
                    bpExteriorCtrl = controller;
                };

                function setSelectedPaint(paint) {

                    bpPaintTrim.selectedPaintCode = paint.code;
                    bpPaintTrim.selectedPaintName = paint.shortName;
                    setColour(bpPaintTrim.specifics.gradeId, bpPaintTrim.specifics.variantId, bpPaintTrim.specifics.trimId);
                }

                function setSelectedTrim(trim) {

                    bpPaintTrim.selectedTrimName = trim.name;
                    if (bpPaintTrim.trim !== trim.uriName) {
                        emitTrimSelection(trim.uriName, true, true, bpPaintTrim.colour);
                    }
                }

                function isTrimSelected(trim) {
                    return bpPaintTrim.trim === trim.uriName;
                }

                BuildPriceService = BuildPriceService;

                var unloadExteriorPromise = null;

                $scope.exterior = function() {
                    //Set scope to exterior.
                    $scope.tabExterior = true;
                    if (bpInteriorCtrl) {
                        bpInteriorCtrl.ensurePanoRemoved();
                    }
                };

                $scope.interior = function() {
                    //Set scope to interior.
                    $scope.tabExterior = false;

                    if ($scope.bpPaintTrim.specifics) {
                        bpInteriorCtrl.loadInterior($scope.bpPaintTrim.specifics);
                    }
                };

                $scope.$watch('bpPaintTrim.specifics', BuildPriceService.watchDebounce(function(newValue, oldValue) {
                    if (newValue) {
                        //setColours(newValue.gradeId, newValue.variantId, newValue.trimId);
                        console.info("%c 6. BuildPricePaintTrimController received SPECIFICS: ", "color: teal; ", [newValue]);
                    }
                }, 50), true);

                //Need to rebind trims when colour changes to show which trims are available and unavailable in that colour
                //$scope.$watch('bpPaintTrim.colour', BuildPriceService.watchDebounce(function trimReceived(newValue, oldValue) {
                //    if (newValue && newValue != oldValue) {
                //        setAvailableTrimsBasedOnPaint(bpPaintTrim.engineVariant, bpPaintTrim.grade, bpPaintTrim.enhancementPack);
                //    }
                //}, 50));

                $scope.$watch('bpPaintTrim.trim', BuildPriceService.watchDebounce(function trimReceived(newValue, oldValue) {
                    if (newValue) {
                        console.info("%c 3. buildPricePaintTrimController received TRIM: ", "color: teal; ", newValue);

                        var previousSelectionNull = (oldValue == null);
                        var selectionChanged = (oldValue !== newValue);

                        getSelectedEnhancementPack(bpPaintTrim.engineVariant, bpPaintTrim.grade, bpPaintTrim.enhancementPack);

                        BuildPriceService.waitFor.call($scope, 'bpPaintTrim.availableTrims', BuildPriceService.waitCondition.NOTNULL)
                            .then(function(value) {
                                validateTrimSelection(newValue, value, (selectionChanged && !previousSelectionNull), true);
                            });
                    }
                }, 50), true);

                $scope.$watch('bpPaintTrim.grade', BuildPriceService.watchDebounce(function(newValue, oldValue) {
                    if (bpPaintTrim.allTrims) delete bpPaintTrim.allTrims;
                }, 50), true);

                $scope.$watch('bpPaintTrim.enhancementPack', BuildPriceService.watchDebounce(function(newValue, oldValue) {
                    if (newValue && newValue != oldValue) {
                        console.info("%c 4. buildPricePaintTrimController received Enhancement Pack: ", "color: teal; ", newValue);

                        getSelectedEnhancementPack(bpPaintTrim.engineVariant, bpPaintTrim.grade, newValue);
                    }
                }, 50), true);

                function setAvailableTrimsBasedOnPaint() {}

                //This method still gets called twice on load with a deeplink, wouldnt mind fixing that
                function getSelectedEnhancementPack(engineVariantName, gradeName, enhancementPack, callback) {
                    var engineVariant = BuildPriceAPIService.findEngineVariantInVehicleData(engineVariantName);
                    var grade = BuildPriceAPIService.getGradeByName(engineVariantName, gradeName);

                    BuildPriceAPIService.getVariants(engineVariantName, grade.id, function(variants) {

                        var variant = BuildPriceAPIService.getVariantByName(engineVariantName, grade.id, enhancementPack);

                        BuildPriceAPIService.getTrims(engineVariantName, grade.id, variant.mdmid, function(availableTrims, unavailableTrims, allTrims) {
                            //This is setting trims based on the MV response
                            setTrims(availableTrims, unavailableTrims, allTrims, false);

                            bpPaintTrim.allTrims = allTrims;

                            setTrim(engineVariantName, grade.id, variant.mdmid);


                            if (bpPaintTrim.trim) {
                                var trim = BuildPriceAPIService.getTrimByName(engineVariantName, grade.id, variant.mdmid, bpPaintTrim.trim);

                                BuildPriceAPIService.getPaints(engineVariantName, grade.id, variant.mdmid, trim.id, function(availableColours, unavailableColours) {

                                    setColours(availableColours, unavailableColours);
                                    setColour(grade.id, variant.mdmid, trim.id);

                                });
                            }


                        });
                    });
                }

                function validateTrimSelection(trim, trims, clearDownstream, userInitiated) {
                    var trimObj = {};

                    for (var index = 0; index < trims.length; index++) {
                        if (trims[index].uriName == trim) {
                            trimObj = trims[index];
                            break;
                        }
                    }

                    if (!trimObj) {
                        var defaultSelection = getDefaultTrim();

                        var invalidSelectionData = {
                            controllerName: BuildPriceService.stepIds.PAINT_TRIM,
                            $scope: $scope,
                            defaultValue: defaultSelection.uriName,
                            invalidValue: bpPaintTrim.trim,
                            userInitiated: userInitiated,
                            clearDownstreamFrom: userInitiated ? 4 : null
                        };

                        BuildPriceService.emitInvalidSelection(invalidSelectionData);

                        emitTrimSelection(defaultSelection.uriName, clearDownstream, userInitiated);
                    } else {
                        bpPaintTrim.selectedTrimName = trimObj.name;
                    }
                }

                function validatePaintSelection(paint) {
                    var selectedPaint = {};

                    for (var index = 0; index < bpPaintTrim.availableColours.length; index++) {
                        if (bpPaintTrim.availableColours[index].uriName == paint) {
                            selectedPaint = bpPaintTrim.availableColours[index];
                            break;
                        }
                    }

                    if (!selectedPaint) {
                        selectedPaint = getDefaultPaint();

                        var invalidSelectionData = {
                            controllerName: 'buildPricePaintTrimController (expected - incomplete)',
                            $scope: $scope,
                            defaultValue: selectedPaint.uriName,
                            invalidValue: bpPaintTrim.colour
                            /*
                            * Once we have a user-initiated selection process implement these variables
                            userInitiated: true/false,
                            clearDownstreamFrom: userInitiated ? 5 : null
                            */
                        };
                        BuildPriceService.emitInvalidSelection(invalidSelectionData);
                    }


                    bpPaintTrim.selectedPaintName = selectedPaint.shortName;
                    bpPaintTrim.selectedPaintCode = selectedPaint.code;
                    emitPaintSelection(selectedPaint);
                }

                function getDefaultPaint() {
                    return bpPaintTrim.availableColours[0];
                }

                function getDefaultTrim() {
                    return bpPaintTrim.availableTrims[0];
                }

                //#region Events 

                function emitPaintSelection(paintObj) {
                    $scope.$emit(BuildPriceService.events.paintSelected, paintObj);
                };

                function emitPaintsReceived(paints) {
                    $scope.$emit(BuildPriceService.events.paintsReceived, paints);
                };

                function emitTrimSelection(trimName, clearDownstream, userInitiated, revertColour) {
                    var data = {
                        clearDownstream: clearDownstream,
                        selection: trimName,
                        userInitiated: userInitiated,
                        revertColour: revertColour
                    };

                    $scope.$emit(BuildPriceService.events.trimSelected, data)
                };

                function emitTrimsReceived(trims) {
                    $scope.$emit(BuildPriceService.events.trimsReceived, trims);
                };

                //#endregion

                function setTrims(availableTrims, unAvailableTrims, allTrims, showTrims) {
                    //console.info("%c 3b. buildPricePaintTrimController setTrims -> allTrims: ", "color: teal; ", allTrims.map(function (v, i) { return (i + 1) + ". " + v.code + "" }).join(', '));
                    //console.info("%c 3c. buildPricePaintTrimController setTrims -> available: ", "color: teal; ", availableTrims.map(function (v, i) { return (i + 1) + ". " + v.code + "" }).join(', '));
                    //console.info("%c 3d. buildPricePaintTrimController setTrims -> unavailable: ", "color: teal; ", unAvailableTrims.map(function (v, i) { return (i + 1) + ". " + v.code + "" }).join(', '));
                    bpPaintTrim.availableTrims = availableTrims;
                    bpPaintTrim.unavailableTrims = unAvailableTrims;
                    emitTrimsReceived(bpPaintTrim.availableTrims);
                    bpPaintTrim.showTrims = showTrims;
                }

                function setTrim(engineVariant, gradeId, variantId) {
                    if (!bpPaintTrim.trim && bpPaintTrim.availableTrims.length > 0) {
                        var defaultTrim = getDefaultTrim();
                        bpPaintTrim.selectedTrimName = defaultTrim.name;
                        emitTrimSelection(defaultTrim.uriName, true, false);
                    } else {
                        var trimobj = BuildPriceAPIService.getTrimByName(engineVariant, gradeId, variantId, bpPaintTrim.trim);

                        if (trimobj) {
                            bpPaintTrim.selectedTrimName = trimobj.name;
                            emitTrimSelection(trimobj.uriName, true, false);
                        } else { //Matching Trim couldnt be found revert to the default
                            bpPaintTrim.selectedTrimName = bpPaintTrim.availableTrims[0].name;
                            emitTrimSelection(bpPaintTrim.availableTrims[0].uriName, true, false);
                        }
                    }
                }

                function setColours(availableColours, unavailableColours) {
                    var maxColoursCanBeShown = 12;
                    if (availableColours && unavailableColours && ((availableColours.length + unavailableColours.length) > maxColoursCanBeShown)) {
                        unavailableColours = null;
                    }

                    bpPaintTrim.availableColours = availableColours;
                    bpPaintTrim.unavailableColours = unavailableColours;
                    emitPaintsReceived(bpPaintTrim.availableColours);

                    if (!bpPaintTrim.colour && bpPaintTrim.availableColours.length > 0) {
                        var defaultPaint = getDefaultPaint();
                        bpPaintTrim.selectedPaintName = defaultPaint.shortName;
                    }
                    if (!bpPaintTrim.selectedPaintName) {
                        bpPaintTrim.selectedPaintName = bpPaintTrim.colour;
                    }

                    bpPaintTrim.showColours = (availableColours.length > 0) ? true : false;
                }

                function setColour(gradeId, variantMDMId, trimId) {
                    //Need to find by URI name if its being reversed from the path, 
                    //need to use shortname if its triggered by a swatch click
                    var paintobj = BuildPriceAPIService.getPaintByName(bpPaintTrim.engineVariant, gradeId, variantMDMId, trimId, bpPaintTrim.selectedPaintName);

                    if (!paintobj) {
                        paintobj = bpPaintTrim.availableColours[0];
                    }

                    //$log.info("paintobj");
                    //$log.info(paintobj);

                    bpPaintTrim.selectedPaintName = paintobj.shortName;
                    bpPaintTrim.selectedPaintCode = paintobj.code;

                    var myGrade = BuildPriceAPIService.getGradeByID(bpPaintTrim.engineVariant, gradeId);

                    emitPaintSelection(paintobj, true, false);

                    bpExteriorCtrl.loadExterior({
                        gradeId: gradeId,
                        gradeMDMId: myGrade.gradeID,
                        variantId: variantMDMId,
                        trimId: trimId,
                        materialCode: paintobj.materialCode,
                        paintId: paintobj.id
                    });


                    BuildPriceAPIService.getTrims(bpPaintTrim.engineVariant, gradeId, variantMDMId, function(availableTrims, unavailableTrims, allTrims) {

                        var currentTrims = BuildPriceAPIService.getUnavailableTrimsBasedOnPaint(bpPaintTrim.engineVariant, gradeId, variantMDMId, trimId, bpPaintTrim.selectedPaintName);

                        //This needs to be filtered so we get the nice name from Grade it isn't pretty but data is lacking.
                        var currentUnavailable = BuildPriceAPIService.GetUnAvailableCollection(allTrims, currentTrims.availableTrims);
                        var currentAvailable = BuildPriceAPIService.FilterAvailableCollection(availableTrims, currentTrims.availableTrims);
                        //This is setting trims based on the Paint Response
                        setTrims(currentAvailable, currentUnavailable, allTrims, true);
                    });

                }
            }
        }]);

}());

;
(function(undefined) {
    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .directive('lxBuildPriceSummary', [function() {
            BuildPriceSummaryController.$inject = ['$rootScope', '$scope', '$timeout', '$httpParamSerializer', 'PricingService', 'BuildPriceService', 'BuildPriceAPIService', 'VehicleService'];
            return {
                scope: {},
                restrict: 'A',
                controller: BuildPriceSummaryController,
                controllerAs: 'bpSummary',
                bindToController: {
                    emailDeeplinkUrlParameters: '<emailDeeplinkUrlParameters',
                    model: '<model',
                    engineVariant: '<variant',
                    grade: '<grade',
                    enhancementPack: '<enhancement',
                    trim: '<trim', //INTERIOR value
                    colour: '<colour', //EXTERIOR value
                    postcode: '<postcode',
                    pricingZone: '<pricingZone',
                    paintId: '<paintId',
                    specifics: '<specifics',
                    vehicleImage: '<vehicleImage',
                    enablePricingByZone: '<enablePricingZone',
                    hostOrigin: '<hostOrigin',
                },
                transclude: true,
                link: function(scope, element, attrs, ctrl, transclude) {
                    transclude(scope, function(clone) {
                        element.append(clone);
                    });

                    scope.showContactDealer = false;
                }
            };

            function BuildPriceSummaryController($rootScope, $scope, $timeout, $httpParamSerializer, PricingService, BuildPriceService, BuildPriceAPIService, VehicleService) {
                var bpSummary = this;
                bpSummary.loadingData = false;
                bpSummary.pricingSuccess = true;
                bpSummary.holdPricingCalls = true;

                $scope.$on(BuildPriceService.events.holdPricingCallsRelay, function(event, data) {
                    bpSummary.holdPricingCalls = data;
                });

                $scope.$watch("bpSummary.paintId", BuildPriceService.watchDebounce(function(newValue, oldValue) {
                    if (newValue !== null) {
                        getDetailPriceByPaint();
                    }
                }, 50), true);

                $scope.$watch('bpSummary.specifics', BuildPriceService.watchDebounce(function(newValue, oldValue) {
                    if (newValue !== null) {
                        console.info("%c 7. BuildPriceSummaryController received SPECIFICS: ", "color: green; ", newValue);
                        $rootScope.$broadcast('refresh-gtm', 'Build and Price');
                    }
                }, 50), true);

                $scope.$watch("bpSummary.postcode", BuildPriceService.watchDebounce(function(newValue, oldValue) {
                    if (newValue !== null) {
                        console.info("%c BuildPriceSummaryController received POSTCODE: ", "color: green; ", newValue);
                        getDetailPriceByPaint();
                    }
                }, 50), true);

                function getDetailPriceByPaint() {
                    PricingService.setParam("enablePricingByZone", bpSummary.enablePricingByZone);
                    if (bpSummary.paintId && bpSummary.postcode && $scope.bpSummary.specifics) {

                        BuildPriceService.waitFor.call($scope, 'bpSummary.holdPricingCalls', BuildPriceService.waitCondition.ISSTRICTLYFALSE)
                            .then(function success(val) {
                                PricingService.detailPriceByPaint(
                                        $scope.bpSummary.specifics.gradeId,
                                        $scope.bpSummary.specifics.variantId,
                                        $scope.bpSummary.specifics.trimId,
                                        bpSummary.paintId,
                                        bpSummary.postcode,
                                        bpSummary.pricingZone)
                                    .then(function(data) {
                                        if (data.status === "Success") {
                                            if (data.data && data.data.listPriceIncGST && data.data.driveAway) {
                                                if (bpSummary.driveAwayPriceLoadingTimeout) {
                                                    $timeout.cancel(bpSummary.driveAwayPriceLoadingTimeout);
                                                }

                                                bpSummary.pricingSuccess = true;
                                                bpSummary.details = data.data;
                                                emitDriveAwayPriceReceived(data.data);
                                            } else {
                                                //success but no price
                                                bpSummary.pricingSuccess = false;
                                            }

                                        } else {
                                            bpSummary.pricingSuccess = false;
                                        }
                                    }, function(reason) {
                                        ajaxPriceFailure(reason, "PricingService.detailPriceByPaint");
                                    })
                                    .finally(function(data) {

                                        emitDriveAwayPriceDidExitLoading(data);
                                        pricingReport();
                                        bpSummary.loadingData = false;
                                    });
                                emitDriveAwayPriceDidEnterLoading();
                                bpSummary.loadingData = true;
                                var variant = BuildPriceAPIService.getVariantByName(bpSummary.engineVariant, bpSummary.specifics.gradeId, bpSummary.enhancementPack);
                                var trim = BuildPriceAPIService.getTrimByName(bpSummary.engineVariant, bpSummary.specifics.gradeId, variant.mdmid, bpSummary.trim);
                                var paint = BuildPriceAPIService.getPaintByName(bpSummary.engineVariant, bpSummary.specifics.gradeId, variant.mdmid, trim.id, bpSummary.colour);
                                bpSummary.enhancementPackName = variant.enhancementPackName;
                                bpSummary.trimName = trim.name;
                                bpSummary.colourName = paint.shortName;
                            });
                    }
                }

                bpSummary.navigate = navigate;

                //#region Events
                function emitDriveAwayPriceDidEnterLoading(data) {
                    $scope.$emit(BuildPriceService.events.priceLoad, data);
                    console.log('%c $$$$$$$$   priceLoad   $$$$$$$$', 'color: limegreen; font-weight: bold;');
                }

                function emitDriveAwayPriceDidExitLoading(data) {
                    $scope.$emit(BuildPriceService.events.priceDone, data);
                    console.log('%c $$$$$$$$   priceDone   $$$$$$$$', 'color: limegreen; font-weight: bold;');
                }

                function emitDriveAwayPriceReceived(data) {
                    $scope.$emit(BuildPriceService.events.priceReceived, data);
                    console.log('%c $$$$$$$$ priceReceived $$$$$$$$', 'color: limegreen; font-weight: bold;');
                }

                function ajaxPriceFailure(data, source) {

                    bpSummary.pricingSuccess = false;
                    console.log('%c  ajaxPriceFailure  ', 'color: red; font-weight: bold;', source);

                    pricingReport();

                    $scope.$emit(BuildPriceService.events.priceError, {
                        source: "bpSummary"
                    });

                }


                function pricingReport() {
                    console.log("bpSummary -> pricingReport: ", bpSummary.pricingSuccess);

                    var delay = 500; // milliseconds to delay the loading.

                    bpSummary.driveAwayPriceLoadingTimeout = $timeout(function() {

                        console.log("bpSummary -> pricingReport: timeout finished", bpSummary.pricingSuccess);

                        if (bpSummary.pricingSuccess) {
                            angular.element('.lx-build-price-summary').removeClass('pricing-error');
                            angular.element('.lx-footer-sticky').removeClass('pricing-error');
                        } else {
                            angular.element('.lx-build-price-summary').addClass('pricing-error');
                            angular.element('.lx-footer-sticky').addClass('pricing-error');
                        }

                    }, delay); // Don't bother showing "loading" for time in delay
                }

                $scope.$on(BuildPriceService.events.vehicleDataRelay, function(event, data) {
                    bpSummary.vehicleData = data;
                });

                $scope.$on(BuildPriceService.events.threeSixtyLoad, function(event, data) {
                    console.info("%c BuildPriceSummaryController received threeSixtyLoad: ", "color: green; ", data);
                });

                //#endregion

                $scope.$on('hide-build-price-contact-dealer-form', function(event, data) {
                    $scope.toggleContactDealerForm();
                });

                $scope.toggleContactDealerForm = function() {
                    $scope.$broadcast('toggle-build-price-contact-dealer-form', getVehicleData());
                    bpSummary.showContactDealer = !(bpSummary.showContactDealer || false);
                };

                $scope.getGradeNameFromId = BuildPriceService.getGradeNameFromId;

                function navigate(page) {
                    $scope.$emit('bp-page-navigation', page);
                }

                function getVehicleData() {
                    return {
                        model: bpSummary.model,
                        engineVariant: bpSummary.engineVariant,
                        grade: bpSummary.grade,
                        enhancementPack: bpSummary.enhancementPack,
                        trim: bpSummary.trim,
                        colour: bpSummary.colour
                    };
                }

                function updateModelFromVehicle(vehicleData) {
                    bpSummary.bookTestDriveUrlParameters = $httpParamSerializer(vehicleData);
                }

                $scope.openPostcodeModal = function() {
                    $scope.$emit(BuildPriceService.events.openPostcodeDialog);
                };
            }
        }]);
}());

;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxFormsBuildPriceContactDealer', [function() {
        FormsBuildPriceContactDealerController.$inject = ['$scope', '$http', '$filter', '$timeout', '$window', '$interval', '$location', '$rootScope', 'DealersService', 'AddressSuggestService', 'UserPreferencesService', 'VehicleService', 'vcRecaptchaService', 'FormsService', 'ngDialog', 'EloquaService'];
        return {
            scope: true,
            restrict: 'A',
            controller: FormsBuildPriceContactDealerController,
            controllerAs: 'ffc',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {
                scope.successContent = element.find('.lx-form-success');
                scope.failureContent = element.find('.lx-form-failure');
                scope.initVars = {
                    showForm: attrs.showForm,
                    forceDealerId: attrs.forceDealerId,
                    dealerCompositeId: attrs.dealerCompositeId,
                    isDealerSite: attrs.isDealerSite,
                    isMultiBranchDealership: attrs.isMultiBranchDealership,

                }
            }
        };

        function FormsBuildPriceContactDealerController($scope, $http, $filter, $timeout, $window, $interval, $location, $rootScope, DealersService, AddressSuggestService, UserPreferencesService, VehicleService, vcRecaptchaService, FormsService, ngDialog, EloquaService) {
            var ffc = this;
            $scope.ffc.urlParameters = $location.search();
            $scope.ffc.formInitialized = false;
            $scope.$watch('bpSummary.showContactDealer', function(newValue, oldValue) {
                if (newValue) {
                    $scope.ffc.formInitialized = true;
                    $scope.init($scope.initVars.forceDealerId, $scope.initVars.dealerCompositeId, $scope.initVars.isDealerSite === 'true', $scope.initVars.isMultiBranchDealership === 'true');
                }
            });

            $scope.init = function(forceDealerId, dealerCompositeID, isDealerSite, isMultiBranchDealer) {
                UserPreferencesService.getLexusVisitorSession().then(function success(data) {
                    var dataVehicle = UserPreferencesService.getLexusVehicle($scope.ffc.urlParameters);
                    var dataDealer = UserPreferencesService.getLexusDealer($scope.ffc.urlParameters);
                    var dataUser = UserPreferencesService.getLexusVisitor($scope.ffc.urlParameters);
                    $scope.ffc.form = {
                        submitting: false,
                        completed: false,
                        errors: false,
                        dealers: null,
                        data: {
                            postcodes: [],
                            carmodel: dataVehicle.model,
                            grade: dataVehicle.grade,
                            enginevariant: dataVehicle.engineVariant,
                            subscribe: false,
                            postcode: "",
                            suburb: "",
                            pricingZone: "",
                            additionalcomments: "",
                            email: data.Data.email,
                            firstname: data.Data.name,
                            lastname: data.Data.surname,
                            phone: data.Data.phone,
                            captcha: "",
                            dealerId: dataDealer.dealerID,
                            dealerName: dataDealer.dealerName,
                            contextDealerSiteId: forceDealerId,
                            mcpUserId: window.SalesforceInteractions.getAnonymousId()
                        },
                    };
                    if (dataUser.suburb && dataUser.postCode && dataUser.state && dataUser.pricingZone) {
                        $scope.ffc.form.data.postcodes.push(UserPreferencesService.getAutocompleteTagFromVisitor(dataUser));
                        $scope.ffc.form.data.postcode = dataUser.postCode;
                        $scope.ffc.form.data.suburb = dataUser.suburb;
                        $scope.ffc.form.data.state = dataUser.state;
                        $scope.ffc.form.data.pricingZone = dataUser.pricingZone;
                    }
                }, function failure(data) {
                    $scope.ffc.form = {
                        submitting: false,
                        completed: false,
                        errors: false,
                        dealers: null,
                        data: {
                            postcodes: [],
                            carmodel: null,
                            grade: null,
                            subscribe: false,
                            postcode: '',
                            additionalcomments: '',
                            email: null,
                            firstname: null,
                            lastname: null,
                            phone: null,
                            captcha: '',
                            dealerId: null,
                            dealerName: null
                        }
                    };
                }).finally(function() {
                    if ($scope.ffc.form.data.carmodel) {
                        $rootScope.$broadcast('field-car-model-engine-variant-update-selected');
                    }

                    //Main Site
                    if ($scope.ffc.form.data.postcodes && $scope.ffc.form.data.postcodes.length > 0 && !isDealerSite) {
                        $scope.searchNow();
                    }

                    //Dealer Site Multi Branch
                    if (isDealerSite && isMultiBranchDealer) {
                        $scope.ffc.form.data.dealerId = null;
                        $scope.ffc.form.data.dealerName = null;
                        $scope.loadBranches(forceDealerId);
                    }

                    //Dealer Site NOT Multi Branch
                    if (isDealerSite && !isMultiBranchDealer) {
                        $scope.ffc.form.data.dealerId = dealerCompositeID;
                        $scope.ffc.form.data.dealerName = null;
                    }
                });
            }

            $scope.loadTags = function(query) {
                AddressSuggestService.setParam('term', query);
                return AddressSuggestService.GetResults();
            };

            $scope.deselectDealer = function() {
                $scope.ffc.form.data.dealerId = $scope.ffc.form.data.dealerName = null;
            }

            $scope.selectDealer = function(dealerInputId) {
                var scrollPos = $(document).scrollTop();
                var maxPos = $('#' + dealerInputId).parents('.lx-form__find-dealer-js').offset().top;
                if (scrollPos > maxPos) {
                    TweenLite.to(window, 0.5, {
                        scrollTo: {
                            y: maxPos
                        },
                        ease: Power2.easeOut
                    });
                }
            }

            $scope.loadBranches = function(dealerID) {
                $scope.ffc.form.dealersLoading = true;
                DealersService.setParam('dealerID', dealerID);
                DealersService.setParam('type', 'Sales');
                DealersService.GetDealerBranches();
            }

            $scope.searchNow = function() {
                $scope.ffc.form.dealersLoading = true;
                $rootScope.$broadcast("visitor-details-change-autocomplete", {
                    postCode: $scope.ffc.form.data.postcode,
                    suburb: $scope.ffc.form.data.suburb,
                    state: $scope.ffc.form.data.state,
                    pricingZone: $scope.ffc.form.data.pricingZone,
                });
                DealersService.setParam('postCode', $scope.ffc.form.data.postcode); //Dummy Implementation needs to be changed
                DealersService.setParam('suburb', $scope.ffc.form.data.suburb); //Dummy Implementation needs to be changed
                DealersService.setParam('type', 'Sales');
                DealersService.GetResults();

            }

            $scope.getData = function() {
                var visitor;
                if ($scope.ffc.form.data.postcodes.length > 0 && $scope.ffc.form.data.postcodes[0].text) {
                    visitor = UserPreferencesService.splitAutoCompleteResult($scope.ffc.form.data.postcodes[0].text);
                }
                var result = {
                    vehicle: {
                        url: window.location.toString(),
                        model: $scope.bpSummary.model,
                        engineVariant: $scope.bpSummary.engineVariant,
                        grade: $scope.bpSummary.grade,
                        enhancementPack: $scope.bpSummary.enhancementPack,
                        trim: $scope.bpSummary.trim,
                        paint: $scope.bpSummary.colour,
                        materialCode: $scope.bpSummary.paintId
                    },
                    pricingEstimate: {
                        driveAway: $scope.bpSummary ? .details ? .driveAway,
                        ctpInsuranceAmount: $scope.bpSummary ? .details ? .ctpInsuranceAmount,
                        dealerDelivery: $scope.bpSummary ? .details ? .dealerDelivery,
                        enhancementPackValue: $scope.bpSummary ? .details ? .enhancementPackValue,
                        listPriceIncGST: $scope.bpSummary ? .details ? .listPriceIncGST,
                        luxuryCarTax: $scope.bpSummary ? .details ? .luxuryCarTax,
                        onRoadCosts: $scope.bpSummary ? .details ? .onRoadCosts,
                        paintPrice: $scope.bpSummary ? .details ? .paintPrice,
                        registrationAmount: $scope.bpSummary ? .details ? .registrationAmount,
                        stampDuty: $scope.bpSummary ? .details ? .stampDuty,
                        finance: {
                            deposit: $scope.bpSummary.deposit,
                            interestRate: $scope.bpSummary.interestRate,
                            loanTerm: $scope.bpSummary.loanTerm,
                            loanType: $scope.bpSummary.loanType,
                            installmentPerMonth: $scope.bpSummary ? .details ? .installmentPerMonth,
                            balloonPayment: $scope.bpSummary.balloonPayment
                        }
                    },
                    dealerId: $scope.ffc.form.data.dealerId,
                    firstName: $scope.ffc.form.data.firstname,
                    lastName: $scope.ffc.form.data.lastname,
                    email: $scope.ffc.form.data.email,
                    additionalComments: $scope.ffc.form.data.additionalcomments,
                    phone: $scope.ffc.form.data.phone,
                    suburb: $scope.ffc.form.data.suburb,
                    state: $scope.ffc.form.data.state,
                    postcode: $scope.ffc.form.data.postcode,
                    captcha: $scope.ffc.form.data.captcha,
                    subscribe: $scope.ffc.form.data.subscribe,
                    contextDealerSiteId: $scope.ffc.form.data.contextDealerSiteId,
                    mcpUserId: $scope.ffc.form.data.mcpUserId
                }
                EloquaService.attachEloquaFields(result);
                return result;
            };
            $scope.resetForm = function() {
                $scope.init();
                $scope.hideContactDealerForm();
            }
            $rootScope.$on('submit-build-price-contact-dealer-form', function(event, data) {
                var formData = $scope.getData();
                $http({
                        method: 'POST',
                        url: $filter('formatArgs')(Lexus.API.FormSubmission.BuildPriceContactDealer, [Lexus.ID.Site]),
                        data: formData
                    })
                    .then(function success(response) {
                        // this callback will be called asynchronously
                        // when the response is available
                        $scope.ffc.form.completed = true;
                        $scope.ffc.form.failed = false;
                        $scope.ffc.form.submitting = false;
                        var historyState = "BuildPriceContactDealerForm=Pass";
                        $location.state(historyState);
                        FormsService.ShowResult($scope.successContent[0]);
                        $rootScope.$broadcast('visitor-details-session-change', $scope.getData());
                        $rootScope.$broadcast('gtm-form-success', 'Build Price Contact Dealer');
                    }, function error(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        $scope.ffc.form.failed = true;
                        $scope.ffc.form.errors = data.Data;
                        $scope.ffc.form.submitting = false;
                        $scope.ffc.form.completed = true;
                        var historyState = "BuildPriceContactDealerForm=Fail";
                        $location.state(historyState);
                        FormsService.ShowResult($scope.failureContent[0]);

                        $window.LexusComponents.Foundation.Shared.renderToast(true);
                    })
                    .finally(function() {
                        $rootScope.$broadcast('form-result');
                    });
            });

            $scope.$on('dealer-search-results-received', function(event, data) {
                $scope.ffc.form.dealersLoading = false;
                $scope.ffc.form.dealers = data.Data;
                $scope.checkDealersLoaded();

            });

            //Do a sanity check to see if the bound dealers match the forceDealer if not clear the force dealer
            $scope.checkDealersLoaded = function() {
                var result = $scope.ffc.form.dealers.find(function(dealer) {
                    return dealer.dealerCode == $scope.ffc.form.data.dealerId;
                });
                if (!result) {
                    $scope.ffc.form.data.dealerId = null;
                }
            }


            $scope.$on('toggle-build-price-contact-dealer-form', function(event, data) {
                var formYPos = $("#contact-dealer-btn").offset().top;
                TweenLite.to(window, 1, {
                    scrollTo: {
                        y: formYPos,
                        x: 0
                    },
                    ease: Power4.easeOut
                });
                $scope.updatePreferenceDetails(data);
            });

            $scope.hideContactDealerForm = function() {
                $scope.$emit('hide-build-price-contact-dealer-form');
                var navYPos = $("[lx-build-price-summary]").offset().top;
                TweenLite.to(window, 1, {
                    scrollTo: {
                        y: navYPos - 20,
                        x: 0
                    },
                    ease: Power4.easeOut
                });
            }

            $scope.$on('postcode-changed', function() {
                if (!($scope.initVars.isDealerSite === 'true')) {
                    var dataUser = UserPreferencesService.getLexusVisitor();
                    if (dataUser && dataUser.postCode && dataUser.suburb && $scope.ffc.form) {
                        $scope.ffc.form.data.postcodes = [];
                        $scope.ffc.form.data.postcodes.push({
                            text: dataUser.suburb + " " + dataUser.postCode
                        });
                        $scope.ffc.form.data.postcode = dataUser.postCode;
                        $scope.ffc.form.data.suburb = dataUser.suburb;
                        $scope.ffc.form.data.state = dataUser.state;
                        $scope.ffc.form.data.pricingZone = dataUser.pricingZone;
                        $scope.deselectDealer();
                        $scope.searchNow();
                    }
                }

            });

            // to do: Let's get the vehicle details directly from the model instead of the cookie change event for the sake of consistency
            /*$rootScope.$on('vehicle-preference-change', function (event, data) {
              $scope.updatePreferenceDetails(data);
              $scope.resetForm();

            });
            */

            $scope.updatePreferenceDetails = function(data) {
                if ($scope.ffc.form && $scope.ffc.form.data) {
                    $scope.ffc.form.data.vehicledetails = $filter('formatArgs')('Model: {0} \nGrade: {1} \nEngine Variant: {2} \nEnhancement Pack: {3}\nURL: {4}', [data.model, data.grade, data.enginevariant, data.enhancementPack, $location.$$absUrl]);
                }
            }

            $scope.openUpdatePostcodeDialog = function() {
                $scope.$emit('open-change-postcode');
            }

            $scope.closeUpdatePostcodeDialog = function() {
                $scope.$emit('close-change-postcode');
            }



        }
    }]);;
//How the directive communication works with an example
//Changing a enhancement Pack
//#1 Fires an event in the EP directive
//#2 EP directive EMITs the change back to the parent directive
//#3 Parent Directive then updates its model
//#4 All the other directives Watch that Model Property and do stuff

(function(undefined) {
    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .config(["$rootScopeProvider", function($rootScopeProvider) {
            $rootScopeProvider.digestTtl(1000);
        }])
        .directive('lxRangeBuildPrice', [function() {
            rangeBuildPriceController.$inject = ['$scope', '$rootScope', '$timeout', '$location', '$http', '$filter', 'UserPreferencesService', 'DealersService', 'PricingService', 'AddressSuggestService', 'BuildPriceService', 'ngDialog', '$anchorScroll', 'BuildPriceAPIService', 'EloquaService', 'HttpPendingRequestsService', 'Geodecode'];
            return {
                scope: true,
                restrict: 'A',
                controller: rangeBuildPriceController,
                controllerAs: 'bp',
                bindToController: true,
                link: function(scope, element, attrs) {
                    scope.bp = scope.bp || {};
                    try {
                        scope.bp.settings = JSON.parse(attrs.bpSettings);
                    } catch (ex) {
                        console.error(ex.message);
                    }
                    scope.bp.settings = scope.bp.settings || {};
                    scope.bp.settings.debug = scope.bp.settings.debug === 'true' ? true : false;
                    scope.bp.settings.disableDiffPricing = scope.bp.settings.disableDiffPricing === 'true' ? true : false;
                    scope.bp.settings.hideSaveBuild = scope.bp.settings.hideSaveBuild === 'true' ? true : false;
                    scope.bp.settings.enablePricingByZone = scope.bp.settings.enablePricingByZone === 'true' ? true : false;

                    scope.bp.roadblockData = {};
                    scope.bp.data = {
                        steps: $.makeArray(element.find('.lx-range-build-price__section-js').map(function(idx, item) {
                            var $item = $(item);
                            return {
                                id: $item.attr('data-id'),
                                label: $item.attr('data-label'),
                                disabled: (($item.attr('data-disabled') || '').toLowerCase() == 'true'),
                                route: $item.attr('data-route'),
                                nextLabel: $item.attr('data-label-next') || 'Next',
                                element: $item
                            }
                        })),
                        userInteraction: false,
                        activeIndex: 0,
                        paintResolved: false,

                        vehicleLoading: false,
                        overviewDataReceived: false,
                        driveAwayPriceLoading: false,
                        pricingErrors: [],
                        openSaveBuildPriceDialog: false,
                        onOfferText: null,

                        vehicle: {
                            carmodel: (scope.bp && scope.bp.data && scope.bp.data.vehicle && scope.bp.data.vehicle.carmodel) ? scope.bp.data.vehicle.carmodel : null,
                            engineVariant: (scope.bp && scope.bp.data && scope.bp.data.vehicle && scope.bp.data.vehicle.engineVariant) ? scope.bp.data.vehicle.engineVariant : null,
                            grade: (scope.bp && scope.bp.data && scope.bp.data.vehicle && scope.bp.data.vehicle.grade) ? scope.bp.data.vehicle.grade : null,
                            postcode: '',
                            enhancementPack: (scope.bp && scope.bp.data && scope.bp.data.vehicle && scope.bp.data.vehicle.enhancementPack) ? scope.bp.data.vehicle.enhancementPack : null,
                            colour: (scope.bp && scope.bp.data && scope.bp.data.vehicle && scope.bp.data.vehicle.colour) ? scope.bp.data.vehicle.colour : null,
                            trim: (scope.bp && scope.bp.data && scope.bp.data.vehicle && scope.bp.data.vehicle.trim) ? scope.bp.data.vehicle.trim : null,
                            colourId: (scope.bp && scope.bp.data && scope.bp.data.vehicle && scope.bp.data.vehicle.colourId) ? scope.bp.data.vehicle.colourId : null,
                            pricingZone: '',
                        },
                        vehicleImage: '',
                        apiResults: {
                            vehicleData: {},
                            enhancementPacks: {},
                            colours: {},
                            trims: {}
                        },
                        postcodes: [],
                        pricing: {
                            driveAway: '',
                            driveAwayPerMonth: '',
                            itemised: {
                                rrp: '',
                                premiumPaint: '',
                                enhancementPack: '',
                                dealerDelivery: ''
                            },
                            onroads: {
                                total: '',
                                registration: '',
                                ctp: '',
                                stampDuty: '',
                                luxuryCarTax: ''
                            }
                        },
                        hostOrigin: ''
                    };
                    scope.init();
                    scope.bp.showSlideOutTray = false;
                }
            };

            function rangeBuildPriceController($scope, $rootScope, $timeout, $location, $http, $filter, UserPreferencesService, DealersService, PricingService, AddressSuggestService, BuildPriceService, ngDialog, $anchorScroll, BuildPriceAPIService, EloquaService, HttpPendingRequestsService, Geodecode) {
                var bp = this;


                $scope.UserPreferencesService = UserPreferencesService;
                $scope.BuildPriceService = BuildPriceService;

                $scope.init = function() {
                    $scope.navigateToPage(0);
                    $scope.tagsLoading = false;
                    var visitor = $scope.UserPreferencesService.getLexusVisitor();
                    if (visitor && visitor.postCode && visitor.suburb && visitor.state) {
                        var postcodeSelection = UserPreferencesService.getAutocompleteTagFromVisitor(visitor);
                        $scope.bp.data.postcodes.push(postcodeSelection);
                        var postcodeData = postcodeSelection.data;
                        updateVehicleWithPostcodeData(postcodeData);

                        //$scope.bp.test.push(postcodeSelection);
                    }

                    if ($scope.bp.settings.firstVisit = !UserPreferencesService.isPageVisited($scope.bp.settings.pageGuid)) {
                        $rootScope.$broadcast('record-page-visit', $scope.bp.settings.pageGuid);
                    }

                    if ($scope.bp.data.postcodes.length != 0 && !$scope.bp.settings.firstVisit) {
                        $scope.$broadcast(BuildPriceService.events.gtmEvent, {
                            source: 'Postcode Roadblock',
                            data: {
                                dialogDisplayed: false,
                                firstVisit: $scope.bp.settings.firstVisit,
                                postcode: $scope.bp.data.postcodes
                            }
                        });
                    }

                    $scope.bp.data.hostOrigin = $location.protocol() + '://' + $location.host();
                };

                $scope.loadUserPreferences = function() {
                    var vCookie = $scope.UserPreferencesService.getLexusVehicle();
                    var sbdv = $scope.bp.data.vehicle; //For Brevity
                    //Clear mismatched downstream values between current cookie and deeplinks
                    if (sbdv.carmodel != vCookie.model) {
                        vCookie.engineVariant = vCookie.grade = vCookie.enhancementPack = vCookie.trim = vCookie.colour = null;
                    }

                    if (sbdv.engineVariant != vCookie.engineVariant) {
                        vCookie.grade = vCookie.enhancementPack = vCookie.trim = vCookie.colour = null;
                    }

                    if (sbdv.grade != vCookie.grade) {
                        vCookie.enhancementPack = vCookie.trim = vCookie.colour = null;
                    }

                    if (sbdv.enhancementPack != vCookie.enhancementPack) {
                        vCookie.trim = vCookie.colour = null;
                    }

                    if (sbdv.trim != vCookie.trim) {
                        vCookie.colour = null;
                    }

                    if (vCookie) {
                        // current value => cookie value if parent model value not null (eg. if model exists, we can use the enginevariant cookie value) => null
                        sbdv.carmodel = sbdv.carmodel ? sbdv.carmodel : vCookie.model;
                        sbdv.engineVariant = sbdv.engineVariant ? sbdv.engineVariant : (sbdv.carmodel ? vCookie.engineVariant : null);
                        sbdv.grade = sbdv.grade ? sbdv.grade : (sbdv.engineVariant ? vCookie.grade : null);
                        sbdv.enhancementPack = sbdv.enhancementPack ? sbdv.enhancementPack : (sbdv.grade ? vCookie.enhancementPack : null);
                        sbdv.trim = sbdv.trim ? sbdv.trim : (sbdv.colour ? vCookie.trim : null);
                        sbdv.colour = sbdv.colour ? sbdv.colour : (sbdv.enhancementPack ? vCookie.colour : null);

                    }
                }

                $scope.loadTags = function(query) {
                    $scope.tagsLoading = true;
                    AddressSuggestService.setParam('term', query);
                    return AddressSuggestService.GetResults($scope.tagsLoaded);
                };

                $scope.tagsLoaded = function() {
                    $scope.tagsLoading = false;
                }

                $scope.autocompleteLoading = function() {
                    return $scope.tagsLoading;
                };

                $scope.updatePostcode = function($tag, focusElement) {
                    $scope.bp.data.postcodes = [$tag];
                    focusElement = focusElement != null && focusElement.length > 0 ? focusElement : '.lx-postcode-dialog__choose';
                    var button = angular.element(focusElement)[0];
                    $timeout(function() {
                        button.focus();
                    }, 10, false);
                };

                $scope.clearPostcode = function() {
                    $scope.bp.data.postcodes = [];
                };

                $scope.navigateToPage = function(pageIdOrIdx) {
                    var userInitiated = (arguments.length > 1) ? arguments[1] : true;
                    for (var i = 0; i < $scope.bp.data.steps.length; i++) {
                        if (pageIdOrIdx === i || pageIdOrIdx === $scope.bp.data.steps[i].id) {
                            $scope.bp.data.steps[i].visible = true;
                            $scope.bp.data.activeIndex = i;
                            window.scrollTo(0, angular.element('.lx-range-build-price')[0].offsetTop);
                            $scope.$broadcast(BuildPriceService.events.pageNavigationBroadcast, $scope.bp.data.steps[i]);
                        } else {
                            $scope.bp.data.steps[i].visible = false;
                        }
                    }

                    $rootScope.$broadcast('refresh-gtm', 'Build and Price');

                    if (userInitiated && pageIdOrIdx + 1 == $scope.bp.data.steps.length || pageIdOrIdx == 'summary') {
                        $scope.$broadcast(BuildPriceService.events.gtmEvent, {
                            source: 'Summary',
                            data: { ...$scope.bp.data.vehicle,
                                dealerName: $scope.bp.settings.dealerName
                            }
                        });
                    }
                };

                $scope.clearDownstream = function(level, data) {

                    if (data.userInitiated)
                        HttpPendingRequestsService.cancelAll();

                    //Model = 5
                    if (level >= 5) $scope.bp.data.vehicle.engineVariant = null;
                    //Variant = 4
                    if (level >= 4) $scope.bp.data.vehicle.grade = null;
                    //Grade = 3
                    if (level >= 3) $scope.bp.data.vehicle.enhancementPack = null;
                    if (level >= 3) $scope.bp.data.vehicleImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAsYAAAGRCAQAAADMAr3sAAAEOUlEQVR42u3UIQEAAAzDsM+/6SsYHkkkFDQHwFwkADBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjCQDMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGoHq/RgGSYZc9owAAAABJRU5ErkJggg==';

                    //Enhancement pack = 2
                    if (level >= 2) $scope.bp.data.vehicle.colour = null;
                    if (level >= 2) $scope.bp.data.vehicle.trim = null;
                    if (level >= 2) $scope.bp.data.vehicleImageLoading = true;

                    //Trim = 1
                    if (level >= 1) $scope.bp.data.vehicle.colourId = null;

                    $scope.broadcastHoldPricingCalls(true);
                };

                $scope.broadcastHoldPricingCalls = function(val) {
                    $scope.$broadcast(BuildPriceService.events.holdPricingCallsRelay, val);
                }

                $scope.$on("sticky-footer-visible", function(evt, data) {
                    $rootScope.$broadcast("shift-promo-tiles-up", data);
                });

                $scope.closePostcodeSlideout = function() {
                    closePostcodeSlideout();
                }

                $scope.findLocation = function() {
                    Geodecode().then(
                        //success
                        function(response) {
                            if (response.isSuccessfull) {
                                console.log("Postcode-" + response.data.postcode);
                                console.log("Suburb-" + response.data.suburb);
                                response["text"] = response.data.suburb + " " + response.data.postcode;
                                $scope.bp.data.postcodes = [response];
                                savePostcodeAndBroadcastEvent();
                                closePostcodeSlideout();
                            }
                        },
                        //failed
                        function(response) {
                            console.log("Geo Location Failed");
                        }
                    ).finally(function() {});
                }
                //#region EVENTS
                $scope.$on(BuildPriceService.events.holdPricingCalls, function(event, data) {
                    //console.info("Relaying holdPricingCalls: " + data);
                    $scope.broadcastHoldPricingCalls(data);
                });

                $scope.$on(BuildPriceService.events.pageNavigation, function(event, data) {
                    $scope.navigateToPage(data);
                });

                $scope.$on(BuildPriceService.events.userInteraction, function() {
                    $scope.bp.data.userInteraction = true;
                });

                $scope.$on(BuildPriceService.events.overviewDataReceived, function() {
                    $scope.bp.data.overviewDataReceived = true;
                    $scope.loadUserPreferences();
                });

                $scope.$on(BuildPriceService.events.openPostcodeDialog, function() {
                    $scope.$broadcast(BuildPriceService.events.gtmEvent, {
                        source: 'Postcode Roadblock',
                        data: {
                            dialogDisplayed: true,
                            firstVisit: $scope.bp.settings.firstVisit,
                            postcode: $scope.bp.data.postcodes
                        }
                    });

                    $scope.ngDialog = ngDialog;
                    ngDialog.open({
                        template: 'updatePostcodeDialogTemplate',
                        controller: '',
                        className: 'ngdialog-theme-default',
                        scope: $scope, // this line wasn't here before
                        plain: false,
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        closeByEscape: true,
                        appendTo: false,
                        preCloseCallback: function(value) {
                            //setPageVisited needs to be run here to catch the click-outside / pressing ESC case


                            return (value === '$document' || value === '$closeButton' || value === '$escape') ? true : ($scope.bp.data.postcodes.length > 0) && $scope.setPageVisited();
                        }
                    });
                });

                $scope.$on(BuildPriceService.events.closePostcodeDialog, function() {
                    console.log('BuildPriceService.events.closePostcodeDialog', arguments);
                    ngDialog.close();
                    $scope.$broadcast(BuildPriceService.events.postcodeChanged);
                    savePostcodeAndBroadcastEvent();
                });

                $scope.$on(BuildPriceService.events.openPostcodeSlideout, function() {
                    $scope.$broadcast(BuildPriceService.events.gtmEvent, {
                        source: 'Postcode Roadblock',
                        data: {
                            dialogDisplayed: true,
                            firstVisit: $scope.bp.settings.firstVisit,
                            postcode: $scope.bp.data.postcodes
                        }
                    });

                    $scope.bp.showSlideOutTray = true;
                    $('body').addClass("modal-open");
                });

                $scope.$on(BuildPriceService.events.confirmPostcodeFromSlideout, function() {
                    closePostcodeSlideout();
                    console.log('BuildPriceService.events.confirmPostcodeFromSlideout', arguments);
                    savePostcodeAndBroadcastEvent();
                });

                $scope.$on(BuildPriceService.events.onOfferText, function(event, data) {
                    $scope.bp.data.onOfferText = data;
                });

                $scope.$on(BuildPriceService.events.gtmEvent, function(event, data) {
                    $rootScope.$broadcast('gtm-buildPrice', data);
                });

                $scope.errorText = function(length, min, data, value) {
                    return "Postcode required"
                }

                $scope.openUpdatePostcodeDialog = function(openDialog) {
                    if (openDialog) {
                        $scope.$broadcast(BuildPriceService.events.openPostcodeDialog);
                        return;
                    }

                    Geodecode().then(
                        //success
                        function(response) {
                            if (response.isSuccessfull) {
                                console.log("Postcode-" + response.data.postcode);
                                console.log("Suburb-" + response.data.suburb);
                                response["text"] = response.data.suburb + " " + response.data.postcode;
                                $scope.updatePostcode(response);
                            }
                        },
                        //failed
                        function(response) {
                            console.log("Geo Location Failed");
                            $scope.$broadcast(BuildPriceService.events.openPostcodeDialog);
                        }
                    ).finally(function() {});
                }

                $scope.openPostcodeSlideout = function() {
                    $scope.$emit(BuildPriceService.events.openPostcodeSlideout);
                }

                $scope.setPageVisited = function() {
                    $scope.bp.settings.firstVisit = false;
                    return true;
                }

                $scope.closeUpdatePostcodeDialog = function() {
                    console.log('BuildPriceService.events.closePostcodeDialog', arguments);
                    angular.element('tags-input').addClass('is-submitted');
                    $scope.$broadcast(BuildPriceService.events.closePostcodeDialog);
                    $scope.sendRoadblockForm();
                }

                $scope.closeUpdatePostcodeSlideout = function() {
                    console.log('BuildPriceService.events.confirmPostcodeFromSlideout', arguments);
                    angular.element('tags-input').addClass('is-submitted');
                    $scope.$broadcast(BuildPriceService.events.confirmPostcodeFromSlideout);
                }

                function closePostcodeSlideout() {
                    $scope.bp.showSlideOutTray = false;
                    $('body').removeClass("modal-open");
                }

                function savePostcodeAndBroadcastEvent() {
                    var postcodeData = $scope.bp.data.postcodes[0].data;
                    updateVehicleWithPostcodeData(postcodeData);

                    $scope.$emit('visitor-details-cookie-change', {
                        postCode: postcodeData.postcode,
                        suburb: postcodeData.suburb,
                        state: postcodeData.state,
                        pricingZone: postcodeData.pricingZone,
                    });
                    $scope.$broadcast(BuildPriceService.events.postcodeChanged);
                }

                $scope.getRoadblockData = function() {
                    var dataVehicle = UserPreferencesService.getLexusVehicle();

                    var postcode;
                    if ($scope.bp.data.postcodes && $scope.bp.data.postcodes.length > 0 && $scope.bp.data.postcodes[0].data) {
                        postcode = $scope.bp.data.postcodes[0].data.postcode;
                    }
                    var data = EloquaService.attachEloquaFields({
                        Email: $scope.bp.roadblockData.email,
                        FirstName: $scope.bp.roadblockData.firstname,
                        EngineVariant: $scope.bp.data.vehicle.engineVariant ?
                            $scope.bp.data.vehicle.engineVariant :
                            dataVehicle.engineVariant,
                        Postcode: postcode,
                        Model: $scope.bp.data.vehicle.carmodel,
                    });
                    return data;
                }

                $scope.setUserInteraction = function(data) {
                    if (data.userInitiated) {
                        $scope.bp.data.userInteraction = true;
                    }
                }

                $scope.sendRoadblockForm = function() {
                    if ($scope.bp.roadblockData.email) {
                        $http({
                                method: 'POST',
                                url: $filter('formatArgs')(Lexus.API.FormSubmission.Roadblock, [Lexus.ID.Site]),
                                data: $scope.getRoadblockData()
                            })
                            .then(function success(response) {
                                var msg = "Roadblock form sent.";
                                console.info ? console.info(msg) : console.log(msg);
                            }, function failure(response) {
                                var msg = "Roadblock form could not be sent.";
                                console.error ? console.error(response) : console.log(msg);
                            });
                    }
                }

                $scope.hasLocation = function() {
                    return bp.data.vehicle.postcode && bp.data.vehicle.postcode.length > 0;
                }

                $scope.$on(BuildPriceService.events.triggerSaveBuildPriceDialog, function() {
                    $scope.bp.data.openSaveBuildPriceDialog = true;
                    $scope.$broadcast(BuildPriceService.events.openSaveBuildPriceDialog, $scope.bp.data.vehicle);
                });

                $scope.$on(BuildPriceService.events.triggerCloseSaveBuildPriceDialog, function() {
                    $scope.bp.data.openSaveBuildPriceDialog = false;
                });

                //#region vehicle selection listeners
                //each listener sets the selected value, then sets null on all downstream vehicle selections
                $scope.$on(BuildPriceService.events.modelSelected, function(event, data) {
                    if (data.clearDownstream) $scope.clearDownstream(5, data);

                    $scope.setUserInteraction(data);
                    $scope.bp.data.vehicle.carmodel = data.selection;


                    $scope.saveCurrentState();
                });

                $scope.$on(BuildPriceService.events.engineVariantSelected, function(event, data) {
                    if (data.clearDownstream) $scope.clearDownstream(4, data);
                    $scope.setUserInteraction(data);
                    $scope.bp.data.vehicle.engineVariant = data.selection;


                    $scope.saveCurrentState();
                });

                $scope.$on(BuildPriceService.events.gradeSelected, function(event, data) {
                    if (data.clearDownstream) $scope.clearDownstream(3, data);

                    $scope.setUserInteraction(data);
                    $scope.bp.data.vehicle.grade = data.selection;

                    $scope.saveCurrentState();
                });

                $scope.$on(BuildPriceService.events.enhancementPackSelected, function(event, data) {
                    if (data.clearDownstream) $scope.clearDownstream(2, data);

                    $scope.setUserInteraction(data);
                    $scope.bp.data.vehicle.enhancementPack = (data.selection) ? data.selection : data;


                    $scope.saveCurrentState();
                    $scope.setUserInteraction(data);
                });

                $scope.$on(BuildPriceService.events.trimSelected, function(event, data) {
                    if (data.clearDownstream) $scope.clearDownstream(1, data);

                    $scope.setUserInteraction(data);
                    $scope.bp.data.vehicle.trim = data.selection;

                });

                $scope.$on(BuildPriceService.events.paintSelected, function(event, paintObj) {
                    $scope.clearDownstream(0, {
                        'userInitiated': false
                    });

                    $scope.setUserInteraction(paintObj);
                    $scope.bp.data.vehicle.colour = paintObj.uriName;
                    $scope.bp.data.vehicle.colourId = paintObj.materialCode;
                    $scope.saveCurrentState();
                });

                $scope.$on(BuildPriceService.events.threeSixtyLoad, function(event, data) {
                    $scope.bp.data.vehicle.specifics = data;

                    BuildPriceAPIService.getExteriorImages($scope.bp.data.vehicle.engineVariant, data.gradeId, data.variantId, data.trimId, data.materialCode, function(images) {
                        $scope.bp.data.vehicleImage = images.threeSixtyImagesDesktop[2];
                    });

                    $scope.bp.data.paintResolved = false;
                });

                $scope.$on(BuildPriceService.events.threeSixtyLoaded, function(event, data) {
                    $scope.bp.data.paintResolved = true;
                });

                $scope.$on(BuildPriceService.events.userSelection, function(event, data) {

                    //HttpPendingRequestsService.cancelAll();

                    var delay = 250; // milliseconds to delay the loading.

                    $scope.bp.data.driveAwayPriceLoadingTimeout = $timeout(function() {
                        $scope.bp.data.driveAwayPriceLoading = true;
                    }, delay); // Don't bother showing "loading" for time in delay

                    $scope.bp.data.vehicleLoadingTimeout = $timeout(function() {
                        $scope.bp.data.vehicleLoading = true;
                    }, delay); // Don't bother showing "loading" for time in delay

                    console.log('BuildPriceService.events.userSelection: ', data, '\n driveAwayPriceLoading', $scope.bp.data.driveAwayPriceLoading, '\n vehicleLoading: ', $scope.bp.data.vehicleLoading);
                });

                $scope.$on(BuildPriceService.events.priceLoad, function(event, data) {
                    if ($scope.bp.data.driveAwayPriceLoadingTimeout) {
                        $timeout.cancel($scope.bp.data.driveAwayPriceLoadingTimeout);
                    }
                    $scope.bp.data.driveAwayPriceLoadingTimeout = $timeout(function() {
                        $scope.bp.data.driveAwayPriceLoading = true;
                    }, 100); // Don't bother showing "loading" for <100ms
                });

                $scope.$on(BuildPriceService.events.priceDone, function(event, data) {

                    if ($scope.bp.data.driveAwayPriceLoadingTimeout) {
                        $timeout.cancel($scope.bp.data.driveAwayPriceLoadingTimeout);
                    }
                    $scope.bp.data.driveAwayPriceLoading = false;

                });

                $scope.$on(BuildPriceService.events.priceReceived, function(event, data) {
                    $scope.bp.data.apiResults.price = data;
                    $scope.bp.data.pricing.driveAway = data.driveAway;
                    $scope.bp.data.pricing.driveAwayPerMonth = data.installmentPerMonth;
                    $scope.bp.data.pricing.itemised.rrp = data.listPriceIncGST;
                    $scope.bp.data.pricing.itemised.premiumPaint = data.paintPrice;
                    $scope.bp.data.pricing.itemised.enhancementPack = data.enhancementPackValue;
                    $scope.bp.data.pricing.itemised.dealerDelivery = data.dealerDelivery;
                    $scope.bp.data.pricing.onroads.total = data.onRoadCosts;
                    $scope.bp.data.pricing.onroads.registration = data.registrationAmount;
                    $scope.bp.data.pricing.onroads.ctp = data.ctpInsuranceAmount;
                    $scope.bp.data.pricing.onroads.stampDuty = data.stampDuty;
                    $scope.bp.data.pricing.onroads.luxuryCarTax = data.luxuryCarTax;
                });

                $scope.$on(BuildPriceService.events.priceError, function(event, data) {
                    console.log('priceError: ', data);

                    $scope.bp.data.pricing.driveAway = 'n/a';

                });

                $scope.$on(BuildPriceService.events.vehicleDataReceived, function(event, data) {
                    BuildPriceService.vehicleData = data;
                    $scope.$broadcast(BuildPriceService.events.vehicleDataRelay, bp.data.apiResults.vehicleData);
                });

                $scope.$on(BuildPriceService.events.enhancementPacksReceived, function(event, data) {
                    bp.data.apiResults.enhancementPacks = data;
                });

                $scope.$on(BuildPriceService.events.trimsReceived, function(event, data) {
                    bp.data.apiResults.trims = data;
                });

                $scope.$on(BuildPriceService.events.paintsReceived, function(event, data) {
                    bp.data.apiResults.colours = data;
                    $scope.$broadcast(BuildPriceService.events.paintDataRelay, bp.data.apiResults.colours);
                });

                $scope.$on(BuildPriceService.events.invalidSelectionError, function(event, data) {
                    var clearDownstreamTargets = (data.clearDownstreamTargets != null ? data.clearDownstreamTargets : [1, 2, 3, 4, 5]);
                    var downstreamTargets = ['carmodel', 'engineVariant', 'grade', 'enhancementPack', 'trim', 'colour'];


                    if (!$scope.bp.data.userInteraction) {
                        $scope.navigateToPage(0);
                    }
                    var message;
                    if (!$scope.bp.data.userInteraction) {
                        //deep link invalid case
                        console.warn("Deep link caused validation error downstream from " + data.controllerName);
                        message = "One or more of your preferences is unavailable for your current selection. Please reconfigure your vehicle.";
                    } else {
                        switch (data.controllerName) {
                            case BuildPriceService.stepIds.MODEL:
                                console.warn("Reselection caused validation error downstream from " + data.controllerName);
                                message = "One or more of your preferences is unavailable for your current selection. Please reconfigure your vehicle.";
                                clearDownstreamTargets = $scope.bp.data.userInteraction ? [1, 2, 3, 4, 5] : clearDownstreamTargets;
                                break;
                            case BuildPriceService.stepIds.GRADE:
                                console.warn("Reselection caused validation error downstream from " + data.controllerName);
                                message = "One or more of your preferences is unavailable for your current selection. Please reconfigure your vehicle.";
                                clearDownstreamTargets = $scope.bp.data.userInteraction ? [2, 3, 4, 5] : clearDownstreamTargets;
                                break;
                            case BuildPriceService.stepIds.ENHANCEMENT_PACK:
                                console.warn("Reselection caused validation error downstream from " + data.controllerName);
                                message = "One or more of your preferences is unavailable for your current selection. Please reconfigure your vehicle.";
                                clearDownstreamTargets = $scope.bp.data.userInteraction ? [3, 4, 5] : clearDownstreamTargets;
                                break;
                            case BuildPriceService.stepIds.PAINT_TRIM:
                                console.warn("Reselection caused validation error downstream from " + data.controllerName);
                                message = "One or more of your preferences is unavailable for your current selection. Please reconfigure your vehicle.";
                                clearDownstreamTargets = $scope.bp.data.userInteraction ? [4, 5] : clearDownstreamTargets;
                                break;
                        }
                    }
                    for (var i = 0; i < clearDownstreamTargets.length; i++) {
                        $scope.bp.data.vehicle[downstreamTargets[clearDownstreamTargets[i]]] = null;
                    }

                    $scope.saveCurrentState();
                    $scope.$emit('open-modal-window', {
                        content: message,
                        wrapper: ["<p style='padding: 20px 65px 0px 20px; text-align: left'>", "</p>"]
                    });

                });
                //#endregion

                $scope.$watch('bp.data.vehicle', function(newValue, oldValue) {
                    console.log("%c bp.data.vehicle changed:", "color: blue;", newValue);
                });

                $scope.$watchGroup(['bp.data.vehicle.carmodel', 'bp.data.vehicle.engineVariant', 'bp.data.vehicle.specifics.paintId', 'bp.data.vehicle.colourId'], function(newData, oldData, $scope) {


                    for (var i in newData) {
                        if (!newData[i]) {
                            return; //I only care if all values are populated
                        }
                    }

                    if ($scope.bp.data.activeIndex == 0) {
                        $scope.$broadcast(BuildPriceService.events.gtmEvent, {
                            source: 'Default',
                            data: $scope.bp.data.vehicle
                        });
                    }

                    $timeout.cancel($scope.bp.data.vehicleLoadingTimeout);

                    //Set Vehicle loading to false if all of these items are available
                    $scope.bp.data.vehicleLoading = false;



                }, true);

                $scope.saveCurrentState = function() {
                    $scope.pushURI($scope.bp.data.vehicle);
                    $scope.$emit('vehicle-preference-change', {
                        model: $scope.bp.data.vehicle.carmodel,
                        grade: $scope.bp.data.vehicle.grade,
                        engineVariant: $scope.bp.data.vehicle.engineVariant,
                        enhancementPack: $scope.bp.data.vehicle.enhancementPack,
                        trim: $scope.bp.data.vehicle.trim,
                        colour: $scope.bp.data.vehicle.colour,
                        // colourId stores the paint's materialCode value, set in paintSelected handler via paintObj.materialCode
                        materialCode: $scope.bp.data.vehicle.colourId
                    });
                }

                //$scope.$on('bp-did-select-postcode', function (event, data) {
                //    console.log('rangeDealerLookupController on(bp-did-select-postcode): ' + data);
                //});

                //$scope.broadcastGetPostcode = function (data) {
                //    $scope.$broadcast('bp-get-postcode', data);
                //}

                $scope.$watchGroup(['bp.data.vehicle.carmodel', 'bp.data.vehicle.engineVariant', 'bp.data.postcodes'], function(newDataArray, oldDataArray, $scope) {

                    if ($scope.bp.data.vehicle.carmodel && $scope.bp.data.vehicle.engineVariant) {
                        $scope.bp.data.steps.forEach(
                            function(step) {
                                step.disabled = false;
                            });
                    } else {
                        $scope.bp.data.steps.forEach(
                            function(step) {
                                step.disabled = true;
                            });
                        $scope.bp.data.steps[0].disabled = false;
                    }

                    //A CarModel Changed happened Broadcast to the top Nav
                    if (newDataArray[0]) {
                        // create and dispatch the event
                        if (typeof document !== "undefined") {
                            const event = new CustomEvent(BuildPriceService.events.modelSelectedUpdateMenu, {
                                detail: newDataArray[0]
                            });
                            document.dispatchEvent(event);
                        }
                        $rootScope.$broadcast(BuildPriceService.events.modelSelectedUpdateMenu, newDataArray[0]);
                    }

                });

                function updateVehicleWithPostcodeData(postcodeData) {
                    $scope.bp.data.vehicle.postcode = postcodeData.postcode;
                    $scope.bp.data.vehicle.suburb = postcodeData.suburb;
                    $scope.bp.data.vehicle.state = postcodeData.state;
                    $scope.bp.data.vehicle.pricingZone = postcodeData.pricingZone;
                }
                //#endregion
            }

        }])
        .controller('lxBuildPriceRouteController', ['$scope', '$location', 'BuildPriceService', function($scope, $location, BuildPriceService) {
            $scope.bp = $scope.bp || {};
            $scope.bp.routing = BuildPriceService.routingSettings;

            $scope.routeInit = function(obj) {
                if (obj && obj.baseUrl) {
                    $scope.bp.routing.baseUrl = obj.baseUrl;
                }
                //parseURI();
            };

            function ensureSuffix(suffix, value) {
                return value + (value[value.length - 1] === suffix ? '' : suffix);
            }

            $scope.getArgPath = function() {
                var baseUrl = ensureSuffix('/', $scope.bp.routing.baseUrl);
                return ensureSuffix('/', $location.$$path).replace(baseUrl, '');
            };

            //to do: passed in variables require validation
            function parseURI() {
                var argPath = $scope.getArgPath();
                if (argPath == '') return;

                $scope.bp.routing.currentUri = BuildPriceService.encodeUriFragment(argPath);

                var args = argPath.split('/');
                //ensure object path exists
                (($scope.bp = $scope.bp || {}).data = $scope.bp.data || {}).vehicle = $scope.bp.data.vehicle || {};

                var i;
                for (i = 0; i < args.length; i++) {
                    //set values in url
                    //set upper case as the deep link steps are strict types
                    if (i === 0) {
                        $scope.bp.data.vehicle[$scope.bp.routing.argIdx[i]] = BuildPriceService.decodeUriFragment(args[i].toUpperCase());
                    } else {
                        $scope.bp.data.vehicle[$scope.bp.routing.argIdx[i]] = BuildPriceService.decodeUriFragment(args[i]);
                    }
                }
                for (i = i; i < $scope.bp.routing.argIdx.length; i++) {
                    //clear remaining values
                    $scope.bp.data.vehicle[$scope.bp.routing.argIdx[i]] = null;
                }

                //additional parameters - jump to step
                if (args.length > $scope.bp.routing.argIdx.length) {
                    var step = parseInt(args[$scope.bp.routing.argIdx.length]);
                    if (!isNaN(step)) {
                        step--;
                        BuildPriceService.waitFor.call($scope, 'bp.data.steps', BuildPriceService.waitCondition.NOTNULL)
                            .then(function(value) {
                                if (value.length > step) {
                                    $scope.navigateToPage(step, false);
                                }
                            });
                    }
                }

                $scope.$broadcast(BuildPriceService.events.gtmEvent, {
                    source: 'Initial',
                    data: $scope.bp.data.vehicle
                });

            }

            $scope.pushURI = function(vehicleModel) {
                // TODO: Migrate to use the same data as _Navigation.cshtml i.e. RangeBuildPriceRepository.GetRangeBuildPriceData()
                //
                // ...because the URIs you get from clicking each step in _Navigation.cshtml
                // do not have hyphens in them like these URIs do.
                //
                // This means email links will NOT work if you just clicked on a step, but WILL work just after
                // saveCurrentState (i.e. 'bp-did-select-engine-variant' / 'bp-did-select-model' events).

                var argPath = "";
                var fullSpecification = true;
                for (var i = 0; i < $scope.bp.routing.argIdx.length; i++) {
                    if (!$scope.bp.data.vehicle[$scope.bp.routing.argIdx[i]]) {
                        fullSpecification = false;
                        break;
                    }
                    argPath += "/" + BuildPriceService.encodeUriFragment($scope.bp.data.vehicle[$scope.bp.routing.argIdx[i]]);
                }

                //if fully specified, also push "go to last page" into url
                if (fullSpecification) {
                    argPath += "/" + $scope.bp.data.steps.length;
                }

                var uri = BuildPriceService.encodeUriPath(argPath);

                $scope.bp.routing.currentUri = uri;

                if (history.pushState) {
                    $location.path($scope.bp.routing.baseUrl + uri);
                }

            }

            $scope.$on(BuildPriceService.events.overviewDataReceived, function() {
                parseURI();
            });

        }]);

}());;

(function(undefined) {
    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .config(["$rootScopeProvider", function($rootScopeProvider) {
            $rootScopeProvider.digestTtl(1000);
        }])
        .directive('lxRangePreLaunch', [function() {
            rangePreLaunchController.$inject = ['$scope', '$rootScope', '$timeout', '$location', '$http', '$filter', 'UserPreferencesService', 'DealersService', 'PricingService', 'AddressSuggestService', 'BuildPriceService', 'ngDialog', '$anchorScroll', 'PreLaunchAPIService', 'EloquaService', 'HttpPendingRequestsService', 'Geodecode'];
            return {
                scope: true,
                restrict: 'A',
                controller: rangePreLaunchController,
                controllerAs: 'pl',
                bindToController: true,
                link: function(scope, element, attrs) {
                    scope.pl = scope.pl || {};
                    try {
                        scope.pl.settings = JSON.parse(attrs.plSettings);
                    } catch (ex) {
                        console.error(ex.message);
                    }
                    scope.pl.settings = scope.pl.settings || {};
                    scope.pl.data = {
                        vehicle: {
                            carmodel: null,
                            engineVariant: null,
                            grade: null,
                            postcode: '',
                            enhancementPack: null,
                            colour: null,
                            trim: null,
                            colourId: null,
                        },
                        lifestyle: null,
                        overviewDataReceived: false,
                    };
                    scope.init();
                }
            };

            function rangePreLaunchController($scope, $rootScope, $timeout, $location, $http, $filter, UserPreferencesService, DealersService, PricingService, AddressSuggestService, BuildPriceService, ngDialog, $anchorScroll, PreLaunchAPIService, EloquaService, HttpPendingRequestsService, Geodecode) {
                var pl = this;
                $scope.UserPreferencesService = UserPreferencesService;

                $scope.init = function() {
                    $scope.loadUserPreferences();
                    var personalization = $scope.UserPreferencesService.getPersonalizationState();
                    $scope.pl.data.lifestyle = personalization;
                    PreLaunchAPIService.getModels().then($scope.ReceiveModels);
                };

                $scope.loadUserPreferences = function() {
                    var vCookie = $scope.UserPreferencesService.getLexusVehicle();
                    var sbdv = $scope.pl.data.vehicle; //For Brevity

                    if (vCookie) {
                        sbdv.carmodel = sbdv.carmodel ? sbdv.carmodel : vCookie.model;
                        sbdv.engineVariant = sbdv.engineVariant ? sbdv.engineVariant : (sbdv.carmodel ? vCookie.engineVariant : null);
                    }
                }

                $scope.ReceiveModels = function() {
                    pl.vehicleData = PreLaunchAPIService.data;
                    pl.data.overviewDataReceived = true;
                    console.info("%c 0. lxRangePreLaunch -> ReceivedOverviewData: ", "color: darkblue; ", PreLaunchAPIService.data);
                };

                $rootScope.$on('personalization-change', function(event, data) {
                    if (data && data.lifestyle) {
                        $scope.pl.data.lifestyle = data;
                    }
                });

                $rootScope.$on('vehicle-preference-change', function(event, data) {
                    if (data && data.engineVariant) {
                        $scope.pl.data.vehicle.engineVariant = data.engineVariant;
                    }
                });

                $scope.$on('pre-launch-gtm-event', function(event, data) {
                    updateVehicle(data);
                    $rootScope.$broadcast('gtm-preLaunch', angular.copy(data));
                });

                function updateVehicle(data) {
                    var vehicle = data.data;
                    for (var vProp in vehicle) {
                        pl.data.vehicle[vProp] = vehicle[vProp];
                    }
                    data.data = pl.data.vehicle;
                }

            }

        }])
        .controller('lxPreLaunchRouteController', ['$scope', '$location', 'BuildPriceService', function($scope, $location, BuildPriceService) {
            $scope.pl = $scope.pl || {};

            $scope.routeInit = function(obj) {};

        }]);

}());;
//Only Allowed to watch 
//BuildPriceAPIService.data

//Only Allowed to emit 
//model selected
//engine variant selected

(function(undefined) {

    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .directive('lxPreLaunchInterior', [function() {
            preLaunchInteriorController.$inject = ['$scope', '$timeout', 'PreLaunchVehicleService', 'PreLaunchAPIService'];
            return {

                scope: {
                    selectedModel: '<carmodel',
                    selectedEngineVariant: '<variant',
                    overviewDataReceived: '<overview'
                },
                restrict: 'A',
                controller: preLaunchInteriorController,
                controllerAs: 'plInterior',
                bindToController: true,
                transclude: true,
                link: function(scope, element, attrs, ctrl, transclude) {
                    transclude(scope, function(clone) {
                        element.append(clone);
                    });
                }
            };



            function preLaunchInteriorController($scope, $timeout, PreLaunchVehicleService, PreLaunchAPIService) {
                var plInterior = this;
                plInterior.vehicleData = null;
                plInterior.gradesList = null;
                plInterior.trims = null;
                plInterior.currentGradeIndex = 0;

                $scope.$watch('plInterior.overviewDataReceived', function(newValue, oldValue) {
                    if (newValue != null && newValue === true) {
                        plInterior.gradesList = PreLaunchAPIService.getGradesList(plInterior.selectedEngineVariant);
                        $scope.gradeChange(plInterior.gradesList[0], true);
                    }
                });

                $scope.$watch('plInterior.selectedEngineVariant', function(newValue, oldValue) {
                    if (newValue != null && plInterior.overviewDataReceived) {
                        plInterior.gradesList = PreLaunchAPIService.getGradesList(newValue);
                        $scope.gradeChange(plInterior.gradesList[0]);
                    }
                });

                function init() {

                }

                $scope.activeTab = function(grade) {
                    return grade == $scope.filterKey;
                }

                $scope.gradeChange = function(grade, firstCall) {
                    var gradeIndex = plInterior.gradesList.indexOf(grade);
                    plInterior.currentGradeIndex = gradeIndex > 0 ? gradeIndex : 0;
                    setGrade(grade, firstCall);
                }

                $scope.nextGrade = function() {
                    if (plInterior.currentGradeIndex + 1 < plInterior.gradesList.length) {
                        plInterior.currentGradeIndex++;
                        setGrade(plInterior.gradesList[plInterior.currentGradeIndex]);
                    }
                }

                $scope.prevGrade = function() {
                    if (plInterior.currentGradeIndex - 1 >= 0) {
                        plInterior.currentGradeIndex--;
                        setGrade(plInterior.gradesList[plInterior.currentGradeIndex]);
                    }
                }

                function setGrade(grade, firstCall) {
                    $scope.filterKey = grade;
                    plInterior.trims = PreLaunchAPIService.getInteriorsByGradeName(plInterior.selectedEngineVariant, grade) ||
                        [];
                    plInterior.activeTrim = plInterior.trims[0];
                    if (plInterior.trims.length > 0) {
                        $scope.$emit('pre-launch-gtm-event', {
                            source: (firstCall == true) ? 'Initial' : 'interior',
                            data: {
                                grade: grade,
                                trim: plInterior.activeTrim.name
                            }
                        });
                    }
                }

                init();
            }
        }]);

}());;
//Only Allowed to watch 
//BuildPriceAPIService.data

//Only Allowed to emit 
//model selected
//engine variant selected

(function(undefined) {

    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .directive('lxPreLaunchExterior', [function() {
            preLaunchExteriorController.$inject = ['$scope', '$timeout', 'PreLaunchVehicleService', 'PreLaunchAPIService'];
            return {

                scope: {
                    selectedModel: '<carmodel',
                    selectedEngineVariant: '<variant',
                    overviewDataReceived: '<overview',
                    lifestyle: '<lifestyle',
                },
                restrict: 'A',
                controller: preLaunchExteriorController,
                controllerAs: 'plExterior',
                bindToController: true,
                transclude: true,
                link: function(scope, element, attrs, ctrl, transclude) {
                    transclude(scope, function(clone) {
                        element.append(clone);
                    });
                }
            };



            function preLaunchExteriorController($scope, $timeout, PreLaunchVehicleService, PreLaunchAPIService) {
                var plExterior = this;
                plExterior.gradesList = null;
                plExterior.paints = null;
                plExterior.lifestyleImg = null;
                plExterior.currentGradeIndex = 0;

                $scope.$watch('plExterior.overviewDataReceived', function(newValue, oldValue) {
                    if (newValue != null && newValue === true) {
                        plExterior.gradesList = PreLaunchAPIService.getGradesList(plExterior.selectedEngineVariant);
                        $scope.gradeChange(plExterior.gradesList[0], true);
                    }
                });

                $scope.$watch('plExterior.selectedEngineVariant', function(newValue, oldValue) {
                    if (newValue != null && plExterior.overviewDataReceived) {
                        plExterior.gradesList = PreLaunchAPIService.getGradesList(newValue);
                        $scope.gradeChange(plExterior.gradesList[0]);
                    }
                });

                $scope.$watch('plExterior.lifestyle', function(newValue, oldValue) {
                    if (newValue != null && newValue.lifestyle) {
                        plExterior.lifestyleImg = newValue.lifestyle.image;
                    }
                });

                function init() {

                }

                $scope.activeTab = function(grade) {
                    return grade == $scope.filterKey;
                }

                $scope.nextGrade = function() {
                    if (plExterior.currentGradeIndex + 1 < plExterior.gradesList.length) {
                        plExterior.currentGradeIndex++;
                        setGrade(plExterior.gradesList[plExterior.currentGradeIndex]);
                    }
                }

                $scope.prevGrade = function() {
                    if (plExterior.currentGradeIndex - 1 >= 0) {
                        plExterior.currentGradeIndex--;
                        setGrade(plExterior.gradesList[plExterior.currentGradeIndex]);
                    }
                }

                $scope.gradeChange = function(grade, firstCall) {
                    var gradeIndex = plExterior.gradesList.indexOf(grade);
                    plExterior.currentGradeIndex = gradeIndex > 0 ? gradeIndex : 0;
                    setGrade(grade, firstCall);
                }

                function setGrade(grade, firstCall) {
                    $scope.filterKey = grade;
                    plExterior.paints = PreLaunchAPIService.getExteriorsByGradeName(plExterior.selectedEngineVariant, grade) ||
                        [];
                    plExterior.activePaint = plExterior.paints[0];
                    if (plExterior.paints.length > 0) {
                        $scope.$emit('pre-launch-gtm-event', {
                            source: (firstCall == true) ? 'Initial' : 'exterior',
                            data: {
                                grade: grade,
                                colour: plExterior.activePaint.name
                            }
                        });
                    }
                }

                init();
            }
        }]);

}());;
// Only Allowed to watch
// Only Allowed to emit
// model selected
// engine variant selected

(function(undefined) {
    'use strict';

    var EVENT_CAROUSEL_ITEMS_FINISHED_RENDERING = 'EVENT_CAROUSEL_ITEMS_FINISHED_RENDERING';

    /* Directives */
    angular
        .module('Lexus.Directives')
        .directive('lxGradeSelector', [
            function() {
                gradeSelectorController.$inject = [
                    '$scope',
                    '$element',
                    '$timeout',
                    'PreLaunchVehicleService',
                    'PreLaunchAPIService'
                ];

                return {
                    scope: {
                        selectedModel: '<carmodel',
                        selectedEngineVariant: '<variant',
                        overviewDataReceived: '<overview',
                        startPosition: '=?startPosition'
                    },
                    restrict: 'A',
                    controller: gradeSelectorController,
                    controllerAs: 'gi',
                    bindToController: true,
                    transclude: true,
                    link: function(scope, element, attrs, ctrl, transclude) {
                        transclude(scope, function(clone) {
                            element.append(clone);
                        });
                    }
                };

                function gradeSelectorController(
                    $scope,
                    $element,
                    $timeout,
                    PreLaunchVehicleService,
                    PreLaunchAPIService
                ) {
                    var gi = this;
                    var $owlCarousel;
                    var carouselOptions;

                    gi.gradesList = null;
                    carouselOptions = {
                        responsive: {
                            0: {
                                items: 1,
                                autoWidth: false,
                                dots: true,
                                stagePadding: 20
                            },
                            768: {
                                items: 2
                            },
                            992: {
                                items: 3,
                                dots: false
                            }
                        },
                        margin: 10,
                        startPosition: $scope.startPosition || 0
                    };

                    $scope.$watch('gi.overviewDataReceived', function(newValue, oldValue) {
                        if (newValue !== null && newValue === true) {
                            gi.gradesList = PreLaunchAPIService.getGradesByEngineVariant('UX 200');
                        }
                    });

                    $scope.$watch('gi.selectedEngineVariant', function(newValue, oldValue) {
                        if (newValue !== null && gi.overviewDataReceived) {
                            if (typeof $owlCarousel !== 'undefined') {
                                $owlCarousel.trigger('destroy.owl.carousel');
                                $owlCarousel.find('.owl-stage-outer').children().unwrap();
                            }

                            gi.gradesList = PreLaunchAPIService.getGradesByEngineVariant(newValue);
                        }
                    });

                    $scope.$on(EVENT_CAROUSEL_ITEMS_FINISHED_RENDERING, function() {
                        if (typeof $owlCarousel === 'undefined') {
                            $owlCarousel = $($element).find('.js-owl-carousel');
                        }

                        $timeout(function() {
                            $owlCarousel.owlCarousel(carouselOptions);
                        });
                    });
                }
            }
        ])
        .directive('lxGradeSelectorCarouselItems', [
            function() {
                return {
                    restrict: 'A',
                    link: function($scope) {
                        if ($scope.$last) {
                            $scope.$emit(EVENT_CAROUSEL_ITEMS_FINISHED_RENDERING);
                        }
                    }
                };
            }
        ]);
})();;
(function() {
    "use strict";

    angular.module('Lexus.Directives')
        .directive('lxSwatchChooser', [SwatchChooserDirective]);

    function SwatchChooserDirective() {
        SwatchChooserController.$inject = ['$scope', '$window'];
        return {
            scope: {
                'swatchChooserModel': '=swatchChooserModel',
                'selectedSwatch': '=selectedSwatch'
            },
            controller: SwatchChooserController,
            controllerAs: '$ctrl',
            restrict: 'A',
            transclude: true,

            link: function(scope, element, attr, ctrl, transclude) {
                transclude(scope, function(clone, scope) {
                    element.append(clone);
                });
            }
        };


        function SwatchChooserController($scope, $window) {
            var $ctrl = this;
            $ctrl.selectedSwatch = $scope.selectedSwatch;
        }
    }
}());;
//Only Allowed to watch 
//BuildPriceAPIService.data

//Only Allowed to emit 
//models selected
//engine variants selected

(function(undefined) {

    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .directive('lxCompareVehiclesModel', [function() {
            compareVehiclesModelController.$inject = ['$scope', '$timeout', 'VehicleService', 'BuildPriceService', 'BuildPriceAPIService'];
            return {

                scope: {
                    selectedModel: '<carmodel',
                    selectedEngineVariant: '<variant',
                    modelsBrowsed: '<modelsbrowsed',
                    compareVariantsSelected: '<variantsselected',
                    compareVehiclesCount: '<compareVehiclesCount',
                    compareModelsSelected: '<modelsselected',
                    compareVehicleTriggered: '<comparecomplete'
                },
                restrict: 'A',
                controller: compareVehiclesModelController,
                controllerAs: 'cvModel',
                bindToController: true,
                transclude: true,
                link: function(scope, element, attrs, ctrl, transclude) {
                    transclude(scope, function(clone) {
                        element.append(clone);
                    });
                }
            };



            function compareVehiclesModelController($scope, $timeout, VehicleService, BuildPriceService, BuildPriceAPIService) {
                var cvModel = this;
                cvModel.vehicleData = null;
                cvModel.modelSelected = false;

                $scope.setModelHeights = function() {
                    $timeout(function() {
                        if (window.innerWidth > 767) {
                            var choosers = angular.element('.lx-range-compare-model-chooser__models');

                            for (var c = 0, clen = choosers.length; c < clen; c++) {
                                var models = choosers[c].querySelectorAll('.lx-range-compare-model-chooser-model');
                                var modelHeights = [],
                                    lastHeight = 0;
                                for (var m = 0, mlen = models.length; m < mlen; m++) {
                                    modelHeights.push(models[m].clientHeight);
                                }
                                modelHeights.sort();
                                lastHeight = modelHeights[modelHeights.length - 1];
                                if (modelHeights[0] != lastHeight) {
                                    for (var m = 0, mlen = models.length; m < mlen; m++) {
                                        models[m].setAttribute('style', 'height:' + lastHeight + 'px;');
                                    }
                                }
                            }
                        }
                    }, 0, false);
                }

                $scope.emitEngineVariantSelected = function(engineVariant, currentSelection, userInitiated, carModel) {
                    var data = {
                        selection: engineVariant.uriName,
                        clearDownstream: (engineVariant != currentSelection && currentSelection != null),
                        userInitiated: userInitiated,
                        carModel: {
                            name: carModel.name,
                            imageSrc: carModel.imageSrc,
                            imageAlt: carModel.imageAlt
                        }
                    };
                    $scope.$emit(BuildPriceService.events.engineVariantSelected, data);
                };

                $scope.variantHasOffer = function(model) {
                    var hasOffer = false;
                    model.modelEngineVariants.forEach(function(variant) {
                        if ($scope.isOnOffer(variant)) {
                            hasOffer = true;
                        }
                    });

                    return hasOffer;
                };

                $scope.isOnOffer = function(obj) {
                    var bool = obj.onOffer;
                    return bool;
                }

                $scope.emitModelSelected = function(model, currentSelection, userInitiated, modelElement, bodyType) {

                    if (userInitiated) {
                        var shortModel = modelElement.replace(/\s+/g, '');
                        setTimeout(function() {
                            $('html, body').animate({
                                scrollTop: $(shortModel).offset().top - 10
                            }, 250)
                        }, 500);
                    }

                    $scope.$emit(BuildPriceService.events.onOfferText, null);

                    var data = {
                        selection: currentSelection === model.uriName ? null : model.uriName,
                        clearDownstream: (model != currentSelection && currentSelection != null),
                        userInitiated: userInitiated,
                        modelTouched: model.uriName,
                        bodyType: bodyType
                    };
                    $scope.$emit(BuildPriceService.events.modelSelected, data);
                };

                $scope.ReceiveModels = function() {

                    cvModel.vehicleData = BuildPriceAPIService.data;
                    console.info("%c 0. buildPriceModelController -> ReceiveModels: ", "color: darkblue; ", BuildPriceAPIService.data);
                    $scope.$emit(BuildPriceService.events.overviewDataReceived, BuildPriceAPIService.data);
                    $scope.setModelHeights();
                };

                $scope.$on(BuildPriceService.events.pageNavigationBroadcast, function(e, target) {
                    var isCurrent = target.id == 'model';
                    cvModel.isCurrentStep = isCurrent;
                });

                $scope.$watch('cvModel.selectedModel', function(newValue, oldValue) {
                    if (newValue != null && !cvModel.modelSelected) {
                        var shortModel = '.contains-model--' + newValue.replace(/\s+/g, '');
                        setTimeout(function() {
                            $('html, body').animate({
                                scrollTop: $(shortModel).offset().top - 10
                            }, 250);
                        }, 600);

                        cvModel.modelSelected = true;
                    }
                });

                function init() {
                    BuildPriceAPIService.getModels().then($scope.ReceiveModels);
                }

                init();
            }
        }]);

}());;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxCompareVehiclesFooter', [function() {
        compareVehiclesFooterController.$inject = ['$scope', '$window', '$element', 'BuildPriceService'];
        return {
            scope: {
                compareVariantsSelected: '<variantsselected',
                compareVehiclesCount: '<compareVehiclesCount',
                vehicleData: '<vehicleData',
                removeVariant: '&removeSelectedVariant',
                hideFooter: '<hideFooter'
            },
            restrict: 'A',
            controller: compareVehiclesFooterController,
            controllerAs: 'cvFtr',
            bindToController: true,
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude) {
                transclude(scope, function(clone) {
                    element.append(clone);
                });
                scope.init();
            }
        }


        function compareVehiclesFooterController($scope, $window, $element, BuildPriceService) {
            var cvFtr = this;

            $scope.init = function() {

            }

            $scope.compareVehicles = function() {
                $scope.$emit(BuildPriceService.events.onCompareVehicles, {});
            }

            $scope.getImageSource = function(index) {
                if (!cvFtr.compareVariantsSelected)
                    return Lexus.Paths.RangeCompareSilhouette + '?w=600';

                return ((cvFtr.compareVariantsSelected.length > index && cvFtr.compareVariantsSelected[index] != '' &&
                        cvFtr.vehicleData[cvFtr.compareVariantsSelected[index]] != 'undefined') ?
                    cvFtr.vehicleData[cvFtr.compareVariantsSelected[index]].imageSrc : Lexus.Paths.RangeCompareSilhouette) + '?w=600';
            }

            $scope.getImageAlt = function(index) {
                if (!cvFtr.compareVariantsSelected)
                    return '';

                return ((cvFtr.compareVariantsSelected.length > index && cvFtr.compareVariantsSelected[index] != '') ?
                    cvFtr.vehicleData[cvFtr.compareVariantsSelected[index]].imageAlt : '');
            }
        }
    }]);;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxCompareVehiclesVehicle', [function() {
        compareVehiclesVehicleController.$inject = ['$scope', '$rootScope', '$window', '$element', '$timeout', 'BuildPriceAPIService', 'BuildPriceService', 'PricingService'];
        return {
            scope: {
                compareModelsSelected: '<modelsselected',
                compareVariantsSelected: '<variantsselected',
                compareVehiclesCount: '<compareVehiclesCount',
                vehicleData: '<vehicleData',
                removeVariant: '&removeSelectedVariant',
                activeVehicleIndex: '<activeVehicleIndex',
                postcode: '<postcode',
                vehicleSelected: '&onVehicleSelected',
            },
            restrict: 'A',
            controller: compareVehiclesVehicleController,
            controllerAs: 'ffc',
            bindToController: true,
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude) {
                transclude(scope, function(clone) {
                    element.append(clone);
                });
                scope.ffc = scope.ffc || {};
                scope.ffc.vehicleIndex = attrs.vehicleIndex || "0";
                scope.ffc.engineVariant = null;
                scope.ffc.carModelObject = null;
                scope.ffc.variantInit = false;
                scope.ffc.imageTransitionInProgress = false;
                scope.ffc.grade = null;
                scope.ffc.gradeId = null;
                scope.ffc.driveAwayPrice = null;
                scope.ffc.driveAwayPriceLoading = false;
                scope.ffc.pricingSuccess = true;

                //defaults
                scope.ffc.form = {
                    data: {
                        carmodel: null,
                        grade: null,
                        engineVariant: null,
                        engineVariantAndGrade: null,
                        enhancementPack: null,
                        trim: null,
                        colour: null,
                    },
                    settings: {
                        hideDefaultSelectOption: true
                    },
                };
                scope.init();
            }
        }


        function compareVehiclesVehicleController($scope, $rootScope, $window, $element, $timeout, BuildPriceAPIService, BuildPriceService, PricingService) {
            var cvv = this;

            $scope.$watch("ffc.postcode", BuildPriceService.watchDebounce(function(newValue, oldValue) {
                if (newValue != null) {
                    console.info("%c compareVehiclesVehicleController received POSTCODE: ", "color: green; ", newValue);
                    getPriceByGrade();
                }
            }, 50), true);

            $scope.$watch("ffc.gradeId", BuildPriceService.watchDebounce(function(newValue, oldValue) {
                if (newValue != null) {
                    console.info("%c compareVehiclesVehicleController gradeID Changed: ", "color: blue; ", newValue);
                    getPriceByGrade();
                }
            }, 50), true);

            function getPriceByGrade() {

                if ($scope.ffc.gradeId && $scope.ffc.postcode) {
                    $scope.ffc.driveAwayPriceLoading = true;
                    PricingService.driveAwayByGrade($scope.ffc.gradeId,
                        $scope.ffc.postcode).then(function(data) {
                        if (data.status === "Success") {
                            if (data.data && data.data.driveAway) {
                                $scope.ffc.driveAwayPrice = data.data.driveAway;
                                $scope.ffc.pricingSuccess = true;
                            } else {
                                $scope.ffc.driveAwayPrice = 'n/a';
                                $scope.ffc.pricingSuccess = false;
                            }
                        } else {
                            $scope.ffc.driveAwayPrice = 'n/a';
                            $scope.ffc.pricingSuccess = false;
                        }
                    }, function(reason) {
                        $scope.ffc.driveAwayPrice = 'n/a';
                        $scope.ffc.pricingSuccess = false;
                    }).finally(function(data) {
                        $scope.ffc.driveAwayPriceLoading = false;
                        pricingReport();
                    });;
                }
            }

            function pricingReport() {
                if ($scope.ffc.pricingSuccess) {
                    $element.removeClass('pricing-error');
                } else {
                    $element.addClass('pricing-error');
                }
            }

            function getImageSource(index) {
                if (!cvv.compareVariantsSelected)
                    return Lexus.Paths.RangeCompareSilhouette + '?w=600';

                return ((cvv.compareVariantsSelected.length > index && cvv.compareVariantsSelected[index] != '' &&
                        cvv.vehicleData[cvv.compareVariantsSelected[index]] != 'undefined') ?
                    cvv.vehicleData[cvv.compareVariantsSelected[index]].imageSrc : Lexus.Paths.RangeCompareSilhouette) + '?w=600';
            }

            function updateVehicleImageAndAnimate() {
                $scope.ffc.imageTransitionInProgress = true;
                $timeout(function() {
                    $scope.ffc.vehicleImageSource = $scope.ffc.carModelObject.imageSrc + '?w=600';
                }, 250);
                $timeout(function() {
                    $scope.ffc.imageTransitionInProgress = false;
                }, 500);
            }

            function setEngineVariantObjects() {

                if (!$scope.ffc.variantInit) {
                    //OnInit Get details from compareState
                    if ($scope.ffc.compareVariantsSelected && $scope.ffc.compareVariantsSelected.length > 0) {
                        $scope.ffc.variantInit = true;
                        $scope.ffc.engineVariant = BuildPriceAPIService.findEngineVariantInVehicleData($scope.ffc.compareVariantsSelected[$scope.ffc.vehicleIndex]);
                    }
                } else if ($scope.ffc.form.data.engineVariantAndGrade == null) {
                    //When Updated Model
                    $scope.ffc.engineVariant = ($scope.ffc.carModelObject && $scope.ffc.carModelObject.modelEngineVariants &&
                        $scope.ffc.carModelObject.modelEngineVariants.length > 0) ? $scope.ffc.carModelObject.modelEngineVariants[0] : null;
                } else {
                    //From FormsCarModelEngineVariantGradeAndPacks variant dropdown model
                    $scope.ffc.engineVariant = BuildPriceAPIService.findEngineVariantInVehicleData($scope.ffc.form.data.engineVariant);
                    $scope.ffc.grade = getGradeFromVariant($scope.ffc.form.data.grade);
                    $scope.ffc.gradeId = $scope.ffc.grade.gradeID;
                    return; //do not set
                }

                $scope.ffc.form.data.engineVariantAndGrade = getEngineVariantAndGrade();
                $scope.ffc.grade = getGradeFromVariant(null);
                $scope.ffc.gradeId = $scope.ffc.grade.gradeID;

            }

            function getGradeFromVariant(grade) {
                //Default Grade
                if ($scope.ffc.engineVariant && $scope.ffc.engineVariant.grades &&
                    $scope.ffc.engineVariant.grades.length > 0) {

                    var gradeMappedArray = $scope.ffc.engineVariant.grades.map(function(currentValue, index, array) {
                        return {
                            name: currentValue.name,
                            gradeID: currentValue.id,
                            gradeMDM: currentValue.gradeID,
                            paints: currentValue.availablePaints,
                            trims: currentValue.availableTrims
                        }
                    });

                    return (grade == null) ? gradeMappedArray[0] : findGradeInGrades(grade, gradeMappedArray);
                }

                return null;
            }

            function findGradeInGrades(grade, grades) {
                var gradeObj = grades.find(function(gradeItem) {
                    return gradeItem.name === grade;
                });
                return gradeObj;
            };

            function getEngineVariantAndGrade() {
                //For FormsCarModelEngineVariantGradeAndPacks support
                var grade = getGradeFromVariant(null);
                return $scope.ffc.engineVariant.name + ";" + ((grade) ? grade.name : '');
            }

            function enhancementPacksReceived(response) {
                if (response && response.length > 0) {
                    $scope.ffc.form.data.enhancementPack = response[0].uriName;

                    $scope.$emit(BuildPriceService.events.enhancementPackSelected, {
                        enhancementPack: $scope.ffc.form.data.enhancementPack,
                        vehicleIndex: $scope.ffc.vehicleIndex
                    });
                }
            }

            $rootScope.$on('vehicle-preference-change', function(event, data) {
                //This is a global Event, Update only if it is meant for this vehicle
                if (data.vehicleIndex == $scope.ffc.vehicleIndex) {
                    $scope.ffc.carModelObject = BuildPriceAPIService.findModelInVehicleData(data.model);
                    updateVehicleImageAndAnimate($scope);
                    setEngineVariantObjects();
                    BuildPriceAPIService.getVariants($scope.ffc.engineVariant.name, $scope.ffc.gradeId, enhancementPacksReceived);

                    $scope.$emit(BuildPriceService.events.gradeSelected, {
                        carmodel: $scope.ffc.carModelObject.name,
                        engineVariant: $scope.ffc.engineVariant.name,
                        grade: $scope.ffc.grade.name,
                        enhancementPack: $scope.ffc.form.data.enhancementPack,
                        trim: $scope.ffc.grade.trims[0].shortName,
                        colour: $scope.ffc.grade.paints[0].shortName,
                        gradeId: $scope.ffc.grade.gradeMDM,
                        vehicleIndex: $scope.ffc.vehicleIndex
                    });
                }
            });

            $scope.init = function() {
                $scope.ffc.vehicleImageSource = getImageSource($scope.ffc.vehicleIndex);
                $scope.ffc.form.data.carmodel = ($scope.ffc.compareModelsSelected && $scope.ffc.compareModelsSelected.length > 0) ?
                    $scope.ffc.compareModelsSelected[$scope.ffc.vehicleIndex] : '';
                $scope.ffc.carModelObject = BuildPriceAPIService.findModelInVehicleData($scope.ffc.form.data.carmodel);
                $scope.ffc.engineVariant = BuildPriceAPIService.findEngineVariantInVehicleData($scope.ffc.compareVariantsSelected[$scope.ffc.vehicleIndex]);
                $rootScope.$broadcast('field-car-model-engine-variant-update-selected', {
                    vehicleIndex: $scope.ffc.vehicleIndex
                });
                setTimeout(function() {
                    window.scrollTo(0, angular.element('.lx-range-compare-vehicles')[0].offsetTop);
                }, 600);

            }

            $scope.getImageAlt = function(index) {
                if (!cvv.compareVariantsSelected)
                    return '';

                return ((cvv.compareVariantsSelected.length > index && cvv.compareVariantsSelected[index] != '') ?
                    cvv.vehicleData[cvv.compareVariantsSelected[index]].imageAlt : '');
            }

            $scope.onVehicleSectionClick = function() {
                $scope.$emit(BuildPriceService.events.compareVehicleActiveSelection, $scope.ffc.vehicleIndex);
            }

            $scope.updatePostCode = function() {
                $scope.$emit(BuildPriceService.events.openPostcodeDialog);
            }

            $scope.headerLink = function(configuredPath, fallBack) {
                if (!configuredPath) {
                    return fallBack + "/" + $scope.getBuildPriceLink();
                }
                return configuredPath;
            }

            $scope.getBuildPriceLink = function() {
                //No deeplink if epack is not set
                if ($scope.ffc.form && $scope.ffc.form.data && $scope.ffc.form.data.enhancementPack) {
                    var vehicle = {
                        carmodel: $scope.ffc.carModelObject.name,
                        engineVariant: $scope.ffc.engineVariant.name,
                        grade: $scope.ffc.grade.name,
                        enhancementPack: $scope.ffc.form.data.enhancementPack,
                        colour: ($scope.ffc.grade.paints.length > 0) ? $scope.ffc.grade.paints[0].shortName : '',
                        trim: ($scope.ffc.grade.trims.length > 0) ? $scope.ffc.grade.trims[0].shortName : ''
                    };

                    return BuildPriceService.getBuildPriceLink(vehicle, 3);

                }
                return '';
            }


        }
    }]);;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxCompareRangeSpec', [function() {
        compareRangeSpecController.$inject = ['$scope', '$http', '$filter', '$timeout', '$interval',
            '$location', '$rootScope', 'API', '$sce', '$log', 'BuildPriceService'
        ];
        return {
            scope: {
                compareGradesSelected: '<gradesselected',
            },
            restrict: 'A',
            controller: compareRangeSpecController,
            controllerAs: 'rtd',
            bindToController: true,
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude) {
                transclude(scope, function(clone) {
                    element.append(clone);
                });
                scope.init();
                scope.rtd.mdmIds = attrs.mdmList || "";
            }
        }

        function compareRangeSpecController($scope, $http, $filter, $timeout, $interval, $location, $rootScope, API, $sce, $log, BuildPriceService) {
            var rtd = this;
            var APPEND_GRADE_ID = "_V2";

            $scope.rtd.urlParameters = $location.search();

            $scope.$watch("rtd.compareGradesSelected", BuildPriceService.watchDebounce(function(newValue, oldValue) {
                if (newValue != null) {
                    console.info("%c compareGradesSelected grade updated: ", "color: green; ", newValue.join('+'));
                    fetchTechDataDetails();
                }
            }, 50), true);

            rtd.apiService = API;

            $scope.init = function() {
                $scope.rtd = $scope.rtd || {};

                $scope.rtd.data = {
                    featuresData: null,
                    featuresByCategory: []
                };
                $scope.rtd.filteredFeatures = [];
                $scope.rtd.rawCustomizedFeatures = [];
                $scope.rtd.data.engineVariants = [];
                $scope.rtd.comparingSameVehicle = false;
                $scope.rtd.allFilter = true;

                $scope.rtd.featuresByCategoryRendering = false;

                if ($scope.rtd.compareGradesSelected.length >= 2) {
                    fetchTechDataDetails();
                }
            };

            $scope.findValueByKey = function(grade, feature) {
                if (feature.specs) {
                    return (grade.indexOf(APPEND_GRADE_ID) > -1) ? feature.specs[grade.replace(APPEND_GRADE_ID, '')] : feature.specs[grade];
                }

            }

            $scope.filterFeatures = function(diff) {
                if (diff) {
                    $scope.rtd.allFilter = false;
                    var filteredArray = [];

                    $scope.rtd.rawCustomizedFeatures.map(function(arr) {
                        var filteredFeatures = [];
                        var modifiedArray = angular.copy(arr, {});

                        var same = false;

                        var keys = Object.keys(arr.grades);
                        var filteredFeatures = [];
                        arr.features.map(function(feature) {

                            if (feature.specs) {
                                same = $scope.findValueByKey(keys[0], feature) == $scope.findValueByKey(keys[1], feature);
                            }
                            if (!same) {
                                filteredFeatures.push(feature);
                                same = false;
                            }

                        });
                        modifiedArray.features = filteredFeatures;
                        filteredArray.push(modifiedArray);

                    });
                    $scope.rtd.filteredFeatures = filteredArray;
                    return;
                }

                $scope.rtd.allFilter = true;
                $scope.rtd.filteredFeatures = $scope.rtd.rawCustomizedFeatures.map(function(a) {
                    return angular.copy(a, {});
                });
            }

            function fetchTechDataDetails() {
                if ($scope.rtd.compareGradesSelected.length < 2) {
                    return;
                }

                $scope.rtd.featuresByCategoryLoading = true;
                $scope.rtd.comparingSameVehicle = $scope.rtd.compareGradesSelected[0] == $scope.rtd.compareGradesSelected[1];

                var getRequest = ($scope.rtd.comparingSameVehicle) ? API.get($filter('formatArgs')(Lexus.API.Lookup.RangeTechDataByGrade, [
                    Lexus.ID.Site,
                    $scope.rtd.compareGradesSelected[0]
                ])) : API.get($filter('formatArgs')(Lexus.API.Lookup.RangeTechDataByGrade, [
                    Lexus.ID.Site,
                    $scope.rtd.compareGradesSelected[0],
                    $scope.rtd.compareGradesSelected[1]
                ]));

                getRequest
                    .then(function(data) {
                        if (!data) {
                            return;
                        }

                        $scope.rtd.featuresByCategoryRendering = true;

                        $timeout(function() {

                            $scope.rtd.data.featuresByCategory = data.data;

                            var cloneData = data.data.map(function(a) {
                                return angular.copy(a, {});
                            });

                            $scope.rtd.rawCustomizedFeatures = filterKeyFeatures(cloneData, "id", $scope.rtd.mdmIds);

                            $scope.filterFeatures(!$scope.rtd.allFilter);

                            $scope.rtd.featuresByCategoryRendering = false;
                        }, 1);

                        $scope.rtd.featuresByCategoryLoading = false;
                    }, function(error) {
                        $log.error(error);
                        $scope.rtd.featuresByCategoryLoading = false;
                    });
            };

            function filterKeyFeatures(rawArray, propId, filterContent) {
                //if empty returns the raw
                if (!filterContent) {
                    if ($scope.rtd.comparingSameVehicle) {
                        transformSpecsForSameVehicle(rawArray);
                    }
                    return rawArray;
                }


                var filteredArray = [];

                rawArray.map(function(arr) {
                    var filteredFeatures = [];
                    var content = false;

                    arr.features.map(function(feature) {

                        if (!feature.hasOwnProperty(propId))
                            return;

                        var matchExpr = new RegExp("(?:^|\\b)(" + feature[propId] + ")(?=\\b|$)");

                        if (filterContent.match(matchExpr) != null) {
                            filteredFeatures.push(feature);
                            content = true;
                        }

                    });
                    if (content) {
                        //update features
                        arr.features = filteredFeatures;
                        //Duplicate the grades - FE
                        if ($scope.rtd.comparingSameVehicle) {
                            transformSpecsForSameVehicle([arr]);
                        }

                        filteredArray.push(arr);
                        content = false;
                    }

                });

                return filteredArray;
            };

            function transformSpecsForSameVehicle(arr) {
                arr.map(function(a) {
                    var keys = Object.keys(a.grades);
                    if (keys.length == 1) {
                        a.grades[keys[0] + APPEND_GRADE_ID] = a.grades[keys[0]];
                    }
                });


                return arr;
            }
        }
    }]);



;
"use strict";
/* Directives */
angular.module('Lexus.Directives')
    .directive('lxCompareVehiclesCta', [function() {
        compareVehiclesCtaController.$inject = ['$scope', '$rootScope', '$window', '$element', '$timeout', 'BuildPriceAPIService', 'BuildPriceService', 'PricingService'];
        return {
            scope: {
                compareModelsSelected: '<modelsselected',
                compareVariantsSelected: '<variantsselected',
                compareGradesSelected: '<gradesselected',
                compareEpacksSelected: '<epacksselected',
                comparePaintsSelected: '<paintsselected',
                compareTrimsSelected: '<trimsselected',
                vehicleSelected: '&onVehicleSelected',
            },
            restrict: 'A',
            controller: compareVehiclesCtaController,
            controllerAs: 'cvcta',
            bindToController: true,
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude) {
                transclude(scope, function(clone) {
                    element.append(clone);
                });
                scope.cvcta = scope.cvcta || {};
            }
        }


        function compareVehiclesCtaController($scope, $rootScope, $window, $element, $timeout, BuildPriceAPIService, BuildPriceService, PricingService) {
            var cvcta = this;

            $scope.headerLink = function(configuredPath, fallBack, vehicleIndex) {
                if (!configuredPath) {
                    return fallBack + "/" + $scope.getBuildPriceLink(vehicleIndex);
                }
                return configuredPath;
            }

            $scope.getBuildPriceLink = function(vehicleIndex) {

                var vehicle = {
                    carmodel: $scope.cvcta.compareModelsSelected[vehicleIndex],
                    engineVariant: $scope.cvcta.compareVariantsSelected[vehicleIndex],
                    grade: $scope.cvcta.compareGradesSelected[vehicleIndex],
                    enhancementPack: $scope.cvcta.compareEpacksSelected[vehicleIndex],
                    colour: $scope.cvcta.comparePaintsSelected[vehicleIndex],
                    trim: $scope.cvcta.compareTrimsSelected[vehicleIndex],
                };

                return BuildPriceService.getBuildPriceLink(vehicle, 3);
            }


        }
    }]);;

(function(undefined) {
    "use strict";
    /* Directives */
    angular.module('Lexus.Directives')
        .config(["$rootScopeProvider", function($rootScopeProvider) {
            $rootScopeProvider.digestTtl(1000);
        }])
        .directive('lxRangeCompareVehicles', [function() {
            rangeCompareVehiclesController.$inject = ['$scope', '$rootScope', '$timeout', '$location', '$http', '$filter', 'UserPreferencesService', 'BuildPriceService', '$anchorScroll', 'BuildPriceAPIService', 'HttpPendingRequestsService', 'ngDialog', 'AddressSuggestService'];
            return {
                scope: true,
                restrict: 'A',
                controller: rangeCompareVehiclesController,
                controllerAs: 'cv',
                bindToController: true,
                link: function(scope, element, attrs) {
                    scope.cv = scope.cv || {};
                    try {
                        scope.cv.settings = JSON.parse(attrs.bpSettings);
                    } catch (ex) {
                        console.error(ex.message);
                    }
                    scope.cv.settings = scope.cv.settings || {};
                    scope.cv.settings.debug = scope.cv.settings.debug === 'true' ? true : false;
                    scope.cv.settings.disableDiffPricing = scope.cv.settings.disableDiffPricing === 'true' ? true : false;
                    scope.cv.data = {
                        userInteraction: false,
                        activeIndex: 0,
                        activeVehicleIndex: 0,
                        compareVehiclesTriggered: false,
                        vehicleLoading: false,
                        onOfferText: null,
                        compareVehicles: {
                            selectedCount: 0,
                            variantsAdded: [],
                            modelsBrowsed: [],
                            modelsAdded: [],
                            gradesAdded: [],
                            trimsAdded: [],
                            paintsAdded: [],
                            ePacksAdded: [],
                            gradeIdsAdded: [],
                            vehiclesData: {}
                        },
                        vehicle: {
                            carmodel: (scope.cv && scope.cv.data && scope.cv.data.vehicle && scope.cv.data.vehicle.carmodel) ? scope.cv.data.vehicle.carmodel : null,
                            engineVariant: (scope.cv && scope.cv.data && scope.cv.data.vehicle && scope.cv.data.vehicle.engineVariant) ? scope.cv.data.vehicle.engineVariant : null,
                            grade: (scope.cv && scope.cv.data && scope.cv.data.vehicle && scope.cv.data.vehicle.grade) ? scope.cv.data.vehicle.grade : null,
                            postcode: '',
                            enhancementPack: (scope.cv && scope.cv.data && scope.cv.data.vehicle && scope.cv.data.vehicle.enhancementPack) ? scope.cv.data.vehicle.enhancementPack : null,
                            colour: (scope.cv && scope.cv.data && scope.cv.data.vehicle && scope.cv.data.vehicle.colour) ? scope.cv.data.vehicle.colour : null,
                            trim: (scope.cv && scope.cv.data && scope.cv.data.vehicle && scope.cv.data.vehicle.trim) ? scope.cv.data.vehicle.trim : null,
                            colourId: (scope.cv && scope.cv.data && scope.cv.data.vehicle && scope.cv.data.vehicle.colourId) ? scope.cv.data.vehicle.colourId : null,
                            bodyType: (scope.cv && scope.cv.data && scope.cv.data.vehicle && scope.cv.data.vehicle.bodyType) ? scope.cv.data.vehicle.bodyType : null,
                        },
                        vehicleImage: '',
                        postcodes: []
                    };
                    scope.init();
                }
            };

            function rangeCompareVehiclesController($scope, $rootScope, $timeout, $location, $http, $filter, UserPreferencesService, BuildPriceService, $anchorScroll, BuildPriceAPIService, HttpPendingRequestsService, ngDialog, AddressSuggestService) {
                var cv = this;


                $scope.UserPreferencesService = UserPreferencesService;
                $scope.BuildPriceService = BuildPriceService;

                $scope.init = function() {
                    var visitor = $scope.UserPreferencesService.getLexusVisitor();
                    $scope.tagsLoading = false;
                    if (visitor && visitor.postCode && visitor.suburb && visitor.state) {
                        var postcodeSelection = UserPreferencesService.getAutocompleteTagFromVisitor(visitor);
                        $scope.cv.data.postcodes.push(postcodeSelection);
                        $scope.cv.data.vehicle.postcode = visitor.postCode;
                    }
                };

                function getBodyTypeByModel(carmodel, vehicleData) {
                    var bodyType = "";
                    if (!carmodel) return bodyType;

                    for (var i = 0; i < vehicleData.length; i++) {

                        var modelMap = vehicleData[i].models.map(function(model) {
                            return model.uriName == carmodel;
                        })

                        if (modelMap.length > 0 && modelMap.indexOf(true) > -1) {
                            return vehicleData[i].uriName;
                        }
                    }
                    return bodyType;
                }

                $scope.loadUserPreferences = function(vehicledata) {
                    var sbdv = $scope.cv.data.vehicle;

                    //TODO: If carmodel is preselected then add that car as default model to compare.
                    var vCookie = $scope.UserPreferencesService.getLexusVehicle();
                    var params = (vCookie.model) ? {
                        model: vCookie.model
                    } : null;
                    var vCompareVehicleCookie = $scope.UserPreferencesService.getCompareVehiclesState(params);

                    if (vCompareVehicleCookie) {
                        sbdv.carmodel = sbdv.carmodel ? sbdv.carmodel : vCompareVehicleCookie.model;
                    }
                    if (!sbdv.bodyType) {
                        sbdv.bodyType = getBodyTypeByModel(sbdv.carmodel, vehicledata);
                    }
                    $scope.cv.data.compareVehicles.modelsBrowsed.push(sbdv.carmodel + ":" + sbdv.bodyType);
                }

                $scope.loadTags = function(query) {
                    $scope.tagsLoading = true;
                    AddressSuggestService.setParam('term', query);
                    return AddressSuggestService.GetResults($scope.tagsLoaded);
                };

                $scope.tagsLoaded = function() {
                    $scope.tagsLoading = false;
                }

                $scope.autocompleteLoading = function() {
                    return $scope.tagsLoading;
                };

                $scope.updatePostcode = function($tag) {
                    $scope.cv.data.postcodes = [$tag];
                    $scope.cv.data.vehicle.postcode = $tag.data.postcode;
                    $scope.$emit('visitor-details-cookie-change', {
                        postCode: $tag.data.postcode,
                        suburb: $tag.data.suburb,
                        state: $tag.data.state
                    });
                    //close after update
                    $timeout(function() {
                        ngDialog.close();
                    }, 300);
                };

                $scope.clearPostcode = function() {
                    $scope.cv.data.postcodes = [];
                    $scope.cv.data.vehicle.postcode = '';
                };


                $scope.clearDownstream = function(level, data) {

                    if (data.userInitiated)
                        HttpPendingRequestsService.cancelAll();

                    //Model = 5
                    if (level >= 5) $scope.cv.data.vehicle.engineVariant = null;
                    //Variant = 4
                    if (level >= 4) $scope.cv.data.vehicle.grade = null;
                    //Grade = 3
                    if (level >= 3) $scope.cv.data.vehicle.enhancementPack = null;
                    if (level >= 3) $scope.cv.data.vehicleImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAsYAAAGRCAQAAADMAr3sAAAEOUlEQVR42u3UIQEAAAzDsM+/6SsYHkkkFDQHwFwkADBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjCQDMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAHMGAAzBjBjAMwYwIwBMGMAMwbAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwAzBsCMAcwYADMGMGMAzBjAjAEwYwDMGMCMATBjADMGwIwBzBgAMwYwYwDMGMCMATBjADMGoHq/RgGSYZc9owAAAABJRU5ErkJggg==';

                    //Enhancement pack = 2
                    if (level >= 2) $scope.cv.data.vehicle.colour = null;
                    if (level >= 2) $scope.cv.data.vehicle.trim = null;
                    if (level >= 2) $scope.cv.data.vehicleImageLoading = true;

                    //Trim = 1
                    if (level >= 1) $scope.cv.data.vehicle.colourId = null;

                };


                //#region EVENTS                       

                $scope.$on(BuildPriceService.events.userInteraction, function() {
                    $scope.cv.data.userInteraction = true;
                });

                $scope.$on(BuildPriceService.events.overviewDataReceived, function(event, vehicledata) {
                    $scope.loadUserPreferences(vehicledata);
                });


                $scope.$on(BuildPriceService.events.onOfferText, function(event, data) {
                    $scope.cv.data.onOfferText = data;
                });

                $scope.$on(BuildPriceService.events.openPostcodeDialog, function() {
                    $scope.ngDialog = ngDialog;
                    ngDialog.open({
                        template: 'cvPostcodeDialogTemplate',
                        controller: '',
                        className: 'ngdialog-theme-default',
                        scope: $scope, // this line wasn't here before
                        plain: false,
                        showClose: true,
                        closeByDocument: true,
                        closeByEscape: true,
                        appendTo: false,
                        preCloseCallback: function(value) {

                        }
                    });
                });


                $scope.setPageVisited = function() {
                    $scope.cv.settings.firstVisit = false;
                    return true;
                }

                $scope.setUserInteraction = function(data) {
                    if (data.userInitiated) {
                        $scope.cv.data.userInteraction = true;
                    }
                }
                //#region vehicle selection listeners
                function SetModelsBrowsedState(data) {
                    if (!data.selection) {
                        var index = $scope.cv.data.compareVehicles.modelsBrowsed.indexOf(data.modelTouched + ":" + data.bodyType);
                        if (index > -1) {
                            $scope.cv.data.compareVehicles.modelsBrowsed.splice(index, 1);
                        }
                    } else {
                        if ($scope.cv.data.compareVehicles.modelsBrowsed.indexOf(data.modelTouched + ":" + data.bodyType) < 0) {
                            var match = [];
                            angular.forEach($scope.cv.data.compareVehicles.modelsBrowsed, function(model) {
                                var existingBodyType = model.split(":")[1];

                                if (existingBodyType == data.bodyType) {
                                    match.push(model);
                                }
                            });
                            angular.forEach(match, function(model) {
                                var index = $scope.cv.data.compareVehicles.modelsBrowsed.indexOf(model);
                                if (index > -1) {
                                    $scope.cv.data.compareVehicles.modelsBrowsed.splice(index, 1);
                                }
                            });
                            $scope.cv.data.compareVehicles.modelsBrowsed.push(data.modelTouched + ":" + data.bodyType);
                        } else {
                            var index = $scope.cv.data.compareVehicles.modelsBrowsed.indexOf(data.modelTouched + ":" + data.bodyType);
                            if (index > -1) {
                                $scope.cv.data.compareVehicles.modelsBrowsed.splice(index, 1);
                            }
                        }
                    }
                }

                function SetCompareVariantsState(data) {
                    if ($scope.cv.data.compareVehicles.selectedCount >= 2) {
                        $scope.cv.data.compareVehicles.variantsAdded.splice(1, 1);
                        $scope.cv.data.compareVehicles.modelsAdded.splice(1, 1);
                        $scope.cv.data.compareVehicles.selectedCount--;
                    } else {
                        $scope.cv.data.compareVehicles.variantsAdded.splice($scope.cv.data.activeIndex, 1, data.selection);
                        $scope.cv.data.compareVehicles.modelsAdded.splice($scope.cv.data.activeIndex, 1, data.carModel.name);
                        $scope.cv.data.activeIndex++;
                        $scope.cv.data.compareVehicles.vehiclesData[data.selection] = data.carModel;
                        $scope.cv.data.compareVehicles.selectedCount++;
                    }
                }

                function SetCompareGradesState(data) {
                    $scope.cv.data.compareVehicles.modelsAdded.splice(+data.vehicleIndex, 1, data.carmodel);
                    $scope.cv.data.compareVehicles.variantsAdded.splice(+data.vehicleIndex, 1, data.engineVariant);
                    $scope.cv.data.compareVehicles.gradesAdded.splice(+data.vehicleIndex, 1, data.grade);
                    $scope.cv.data.compareVehicles.paintsAdded.splice(+data.vehicleIndex, 1, data.colour);
                    $scope.cv.data.compareVehicles.trimsAdded.splice(+data.vehicleIndex, 1, data.trim);
                    $scope.cv.data.compareVehicles.gradeIdsAdded.splice(+data.vehicleIndex, 1, data.gradeId);
                }
                //each listener sets the selected value, then sets null on all downstream vehicle selections
                $scope.$on(BuildPriceService.events.modelSelected, function(event, data) {
                    if (data.clearDownstream) $scope.clearDownstream(5, data);

                    $scope.setUserInteraction(data);
                    $scope.cv.data.vehicle.carmodel = data.selection;
                    $scope.cv.data.vehicle.bodyType = data.bodyType;

                    SetModelsBrowsedState(data);
                    $scope.saveCurrentState();
                });

                $scope.$on(BuildPriceService.events.engineVariantSelected, function(event, data) {
                    if (data.clearDownstream) $scope.clearDownstream(4, data);
                    $scope.setUserInteraction(data);
                    $scope.cv.data.vehicle.engineVariant = data.selection;

                    SetCompareVariantsState(data);
                    $scope.saveCurrentState();
                });

                $scope.$on(BuildPriceService.events.gradeSelected, function(event, data) {
                    if (data.clearDownstream) $scope.clearDownstream(3, data);

                    $scope.setUserInteraction(data);
                    $scope.cv.data.vehicle.grade = data.grade;
                    SetCompareGradesState(data);
                    $scope.saveCurrentState();
                });

                $scope.$on(BuildPriceService.events.enhancementPackSelected, function(event, data) {
                    $scope.cv.data.vehicle.enhancementPack = data.grade;
                    $scope.cv.data.compareVehicles.ePacksAdded.splice(+data.vehicleIndex, 1, data.enhancementPack);
                    $scope.saveCurrentState();
                });

                //#endregion

                $scope.$on(BuildPriceService.events.onCompareVehicles, function() {
                    $scope.cv.data.compareVehiclesTriggered = true;
                });

                $scope.$on(BuildPriceService.events.compareVehicleActiveSelection, function(evenet, index) {
                    $scope.cv.data.activeVehicleIndex = index;
                });

                $scope.$watch('cv.data.vehicle', function(newValue, oldValue) {
                    console.log("%c cv.data.vehicle changed:", "color: blue;", newValue);
                });

                $scope.saveCurrentState = function() {
                    //$scope.pushURI($scope.cv.data.vehicle);
                    $scope.$emit('compare-vehicle-change', {
                        model: $scope.cv.data.vehicle.carmodel,
                        bodyType: $scope.cv.data.vehicle.bodyType,
                        modelsBrowsed: $scope.cv.data.compareVehicles.modelsBrowsed.join("|"),
                        variantsSelected: $scope.cv.data.compareVehicles.variantsAdded.join("|")
                    });

                }
                //#endregion
                function SetActiveIndex(index) {
                    //Check if needs to reset
                    if ($scope.cv.data.compareVehicles.variantsAdded.join("") == "") {
                        $scope.cv.data.activeIndex = 0;
                        return;
                    }
                    $scope.cv.data.activeIndex = index;
                }

                $scope.removeSelectedVariant = function(index) {
                    if (index < 0) return;
                    $scope.cv.data.compareVehicles.variantsAdded.splice(index, 1, "");
                    $scope.cv.data.compareVehicles.modelsAdded.splice(index, 1, "");
                    $scope.cv.data.compareVehicles.selectedCount--;
                    SetActiveIndex(index);
                    $scope.saveCurrentState();
                }

                $scope.onVehicleSelected = function(vehicleIndex) {
                    $scope.$emit('vehicle-preference-change', {
                        model: $scope.cv.data.compareVehicles.modelsAdded[vehicleIndex],
                        engineVariant: $scope.cv.data.compareVehicles.variantsAdded[vehicleIndex],
                        grade: $scope.cv.data.compareVehicles.gradesAdded[vehicleIndex]
                    });
                }

            }

        }])
}());;
"use strict";
angular.module('Lexus.Directives')
    .directive('lxSaveBuildPrice', [function() {
        saveBuildPriceController.$inject = ['$scope', '$rootScope', '$filter', 'UserPreferencesService', 'API', 'BuildPriceService', 'BuildPriceAPIService'];
        return {
            scope: {
                model: '<carmodel',
                engineVariant: '<variant',
                enhancementPack: '<enhancement',
                grade: '<grade',
                colour: '<colour',
                trim: '<trim',
                vehicle: '<vehicle',
                buildPriceUri: '<baseUri',
                vehicleData: '<overviewData',
                vehicleImage: '<vehicleImage',
                openSbp: '<openSbp'
            },
            restrict: 'A',
            controllerAs: 'sbp',
            bindToController: true,
            controller: saveBuildPriceController,
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude) {
                transclude(scope, function(clone) {
                    element.append(clone);
                });
                scope.sbp = scope.sbp || {};
                scope.sbp.loggedIn = false;
                scope.sbp.status = "Retrieve Saved Vehicles";
                scope.sbp.initState = false;
                scope.sbp.loadingVehicles = false;
                scope.sbp.imageTransitionInProgress = false;
                scope.sbp.showCurrentVehicle = true;
                scope.sbp.vehicleMaxSavedId = 0;
                scope.sbp.vehicleMaxLimitToSave = 3;
                scope.sbp.data = {
                    vehicleToSave: {
                        carmodel: null,
                        engineVariant: null,
                        grade: null,
                        postcode: null,
                        enhancementPack: null,
                        colour: null,
                        trim: null,
                        colourId: null,
                        carImageSource: null,
                        id: null,
                        timeStamp: null
                    },
                    currentVehicle: {
                        name: null,
                        imgSrc: null
                    },
                    savedVehicles: [],
                    engineVariantObj: null,
                };

                scope.init(attrs);
            }
        }

        function saveBuildPriceController($scope, $rootScope, $filter, UserPreferencesService, API, BuildPriceService, BuildPriceAPIService) {
            var sbp = this;

            function getDefaultVehicleState() {
                //TODO: Sitecore
                return {
                    name: "Configure",
                    imgSrc: "Assets/Lexus/MainSite/images/placeholders/save-build/placeholder.png",
                    buildPriceLink: $scope.sbp.buildPriceUri,
                    id: null
                };
            }

            function updateStatus(savedVehicles) {
                $scope.sbp.status = (!$scope.sbp.loggedIn) ? "Retrieve Saved Vehicles" : (savedVehicles && savedVehicles.length > 0) ? "Saved Vehicle(S)" : "No Saved Vehicle(S)";
            }

            function getSavedVehiclesRendering(vehicles) {
                var savedArr = [];
                if (!vehicles)
                    return savedArr;

                vehicles.map(function(vehicle) {
                    savedArr.push(getSavedVehicleRendering(vehicle, vehicle.id));
                });

                return savedArr;
            }

            function getSavedVehicleRendering(vehicle, id) {
                try {
                    $scope.sbp.data.engineVariantObj = BuildPriceAPIService.findEngineVariantInVehicleData(vehicle.engineVariant);
                    return {
                        name: vehicle.engineVariant,
                        imgSrc: vehicle.carImageSource,
                        buildPriceLink: $scope.sbp.buildPriceUri + "/" + BuildPriceService.getBuildPriceLink(vehicle, 5),
                        id: id,
                    }
                } catch (e) {
                    return getDefaultVehicleState();
                }
                return null;
            }

            function paintsResolved(vehicleId) {
                console.info("%c 9. Exterior Images  Resolved", "color: blue; ", "Complete");
                //Mutate the DOM saved Vehicles section
                $scope.sbp.data.savedVehicles = getSavedVehiclesRendering($scope.virtualSavedStates);
                $scope.sbp.loadingVehicles = false;
            }

            function callVehicleTree(vehicle, vehicleId) {
                //if (!vehicle) return;
                $scope.sbp.loadingVehicles = true;
                //save car image source , need not cal vehicle tree to dig the paint
                paintsResolved();
                return;

                //Deep Nesting is required if we do not save the Vehicle Image in xDB

                console.info("%c 2. Loading Vehicles  ", "color: blue; ", $scope.sbp.loadingVehicles);
                try {
                    var grade = BuildPriceAPIService.getGradeByName(vehicle.engineVariant, vehicle.grade);
                    console.info("%c 2.1.Grade  ", "color: blue; ", vehicle.grade);
                    var variant = BuildPriceAPIService.getVariantByName(vehicle.engineVariant, grade.id, vehicle.enhancementPack);
                    console.info("%c 2.2.Variant  ", "color: blue; ", grade.id);
                    if (!variant) {
                        var ep = function(variantsResp) {
                            console.info("%c 4. Variants Resolved  ", "color: blue; ", "");
                            variant = BuildPriceAPIService.getVariantByName(vehicle.engineVariant, grade.id, vehicle.enhancementPack);
                            var trim = null;
                            if (!trim) {
                                var tr = function(trimsResp) {
                                    console.info("%c 5. Trims Resolved  ", "color: blue; ", "");
                                    trim = BuildPriceAPIService.getTrimByName(vehicle.engineVariant, grade.id, variant.mdmid, vehicle.trim);
                                    var paint = null;
                                    if (!paint) {
                                        var pt = function(paintResponse) {
                                            console.info("%c 7. paints resolved  ", "color: blue; ", "");
                                            paint = BuildPriceAPIService.getPaintByName(vehicle.engineVariant, grade.id, variant.mdmid, trim.id, vehicle.colour);
                                            console.info("%c 8. Calling Exterior Images  ", "color: blue; ", paint.materialCode);
                                            BuildPriceAPIService.getExteriorImages(vehicle.engineVariant, grade.id, variant.mdmid, trim.id, paint.materialCode, paintsResolved.bind(null, vehicleId));
                                        };
                                        console.info("%c 6. Calling paints  ", "color: blue; ", trim.id);
                                        BuildPriceAPIService.getPaints(vehicle.engineVariant, grade.id, variant.mdmid, trim.id, pt);
                                    }
                                };
                                console.info("%c 5. Calling Trims  ", "color: blue; ", variant.mdmid);
                                BuildPriceAPIService.getTrims(vehicle.engineVariant, grade.id, variant.mdmid, tr);
                            }
                        };
                        console.info("%c 3. Calling Variants  ", "color: blue; ", vehicle.engineVariant);
                        BuildPriceAPIService.getVariants(vehicle.engineVariant, grade.id, ep);
                    } else {
                        //Resolve Paints as the tree might have fetched
                        paintsResolved(vehicleId);
                    }

                } catch (e) {
                    return null;
                } finally {}
                return null;

            }

            $scope.init = function(attrs) {
                //Virtual DOM for saved states
                $scope.virtualSavedStates = [];

                var analyticsCookie = UserPreferencesService.getAnalyticsCookie();

                if (analyticsCookie) {
                    $scope.userEmail = analyticsCookie.identifier;
                    $scope.sbp.loggedIn = analyticsCookie.identifier != null && analyticsCookie.identifier != "";
                    console.info("%c Logged in  ", "color: green; ", $scope.userEmail);
                }
                if (attrs) {
                    $scope.vehicleState = attrs.vehicleState;
                    $scope.sbp.vehicleMaxLimitToSave = +attrs.vehicleMaxLimit || $scope.sbp.vehicleMaxLimitToSave;
                    var vIds = (attrs.vehicleIds) ? attrs.vehicleIds.split("|") : null;
                    var sArr = (attrs.vehicleState) ? attrs.vehicleState.split("|") : null;

                    if (sArr && sArr.length > 0) {
                        for (var i = 0; i < sArr.length; i++) {
                            if (sArr[i]) {
                                $scope.virtualSavedStates.push(JSON.parse(sArr[i] ? sArr[i] : null));
                                $scope.virtualSavedStates[i].id = vIds[i];
                            }
                        }
                    }
                    updateStatus($scope.virtualSavedStates);
                }

            };

            $scope.$watch(function(scope) {
                return scope.sbp.vehicleData;
            }, function(newVal, oldVal) {
                if (newVal && $scope.sbp.loggedIn) {
                    //call vehicleTree for saved Vehicles                    
                    callVehicleTree();
                }
            });

            $scope.$watch(function(scope) {
                return scope.sbp.vehicleImage;
            }, function(newVal, oldVal) {
                if (newVal) {

                    if (newVal.indexOf("data:image") > -1)
                        return;

                    $scope.sbp.showCurrentVehicle = true;
                    $scope.sbp.loadingVehicles = false;
                    $scope.sbp.imageTransitionInProgress = false;
                    $scope.sbp.data.currentVehicle = {
                        name: $scope.sbp.vehicle.engineVariant,
                        imgSrc: newVal.indexOf("data:image") > -1 ? null : newVal.replace(/jpg/g, 'png')
                    };
                    setVehicle($scope.sbp.vehicle);
                }
            })

            $scope.$watch(function(scope) {
                return scope.sbp.model;
            }, function(newVal, oldVal) {
                if (newVal) {
                    if (!$scope.sbp.vehicle.engineVariant) {
                        $scope.sbp.showCurrentVehicle = false;
                        $scope.sbp.data.currentVehicle = getDefaultVehicleState();
                        $scope.sbp.imageTransitionInProgress = true;
                    }
                } else {
                    $scope.sbp.showCurrentVehicle = false;
                    $scope.sbp.data.currentVehicle = getDefaultVehicleState();
                }
            })

            $scope.$watch(function(scope) {
                return scope.sbp.engineVariant;
            }, function(newVal, oldVal) {
                if (newVal) {
                    $scope.sbp.imageTransitionInProgress = false;
                    $scope.sbp.loadingVehicles = true;
                } else {
                    setVehicle($scope.sbp.vehicle);
                    $scope.sbp.showCurrentVehicle = false;
                }
            })

            $scope.$on(BuildPriceService.events.openSaveBuildPriceDialog, function(e, vehicle) {
                openNav(vehicle);
            });

            $scope.$watch(function(scope) {
                return scope.sbp.openSbp;
            }, function(newVal, oldVal) {
                if (newVal === false) {
                    $scope.closeNav();
                }
            });

            $scope.$on(BuildPriceService.events.closeSaveBuildPriceDialog, function(e, vehicle) {
                $scope.closeNav();
            });

            $scope.saveBuildAndPrice = function(email, close) {

                if (!email || $scope.sbp.data.currentVehicle.name == "Configure") {
                    return;
                }
                //disable Add vehicle until current request processed .
                $scope.sbp.showCurrentVehicle = false;

                UserPreferencesService.setAnalyticsCookie({
                    identifier: email
                });

                var postData = {
                    VehicleId: updateAndRetrieveVehicleId(),
                    EmailId: email,
                    DeepLink: getData()
                };
                var postAnalytics = API.post(Lexus.API.Analytics.PostSavedVehicles,
                    postData);

                postAnalytics
                    .then(function(data) {
                        if (data.Data) {
                            console.log('save B&P' + data.Data);

                            $scope.sbp.loggedIn = true;
                            $scope.userEmail = email;
                            mutateSavedVehicles(getSavedVehicleRendering(JSON.parse(data.Data.DeepLink), data.Data.VehicleId), data.Data.VehicleId);
                            updateStatus($scope.sbp.data.savedVehicles);
                            updateAndRetrieveVehicleId();
                            if (close) {
                                $scope.closeNav();
                            }
                        }

                    }, function(error) {
                        $log.error(error);
                    }).finally(function() {
                        $scope.sbp.showCurrentVehicle = true;
                    });
            };

            $scope.deleteSaveBuildEntry = function(id) {

                var postData = {
                    VehicleId: id,
                    EmailId: $scope.userEmail,
                    DeepLink: null
                };
                var postAnalytics = API.del($filter('formatArgs')(Lexus.API.Analytics.DeleteSavedVehicle, [id, $scope.userEmail]));
                $scope.sbp.showCurrentVehicle = false;

                postAnalytics
                    .then(function(data) {
                        mutateSavedVehicles(null, postData.VehicleId);
                        updateStatus($scope.sbp.data.savedVehicles);
                        $scope.sbp.activeModel = null;
                    }, function(error) {
                        $log.error(error);
                    }).finally(function() {
                        $scope.sbp.showCurrentVehicle = true;
                    });
            };

            function getData() {
                //Set the ID and Time Stamp before Save/Update
                $scope.sbp.data.vehicleToSave.id = getVehicleId();
                $scope.sbp.data.vehicleToSave.timeStamp = (new Date()).getTime();

                if ($scope.sbp.data.vehicleToSave) {
                    return JSON.stringify($scope.sbp.data.vehicleToSave);
                }

                var vCookie = UserPreferencesService.getLexusVehicle() || {
                    model: ''
                };
                var seperator = "~";
                var vts = $scope.sbp.data.vehicleToSave;

                if (vCookie) {
                    if (vCookie.model)
                        vts.carmodel = vCookie.model;
                    if (vCookie.engineVariant)
                        vts.engineVariant = vCookie.engineVariant;
                    if (vCookie.grade)
                        vts.grade = vCookie.grade;
                    if (vCookie.enhancementPack)
                        vts.enhancementPack = vCookie.enhancementPack;
                    if (vCookie.trim)
                        vts.trim = vCookie.trim;
                    if (vCookie.colour)
                        vts.colour = vCookie.colour;
                }

                return JSON.stringify(vts);
            }

            function getVehicleId() {
                return ($scope.sbp.activeModel) ? $scope.sbp.activeModel : null;
            }

            //do not call this outside of AJAX calls
            function updateAndRetrieveVehicleId() {
                //active selection
                if ($scope.sbp.activeModel)
                    return $scope.sbp.activeModel;

                if ($scope.sbp.data.savedVehicles.length >= $scope.sbp.vehicleMaxLimitToSave) {
                    //Set to first vehicle if max limit reached
                    $scope.sbp.activeModel = $scope.sbp.data.savedVehicles[0].id;
                    return $scope.sbp.activeModel;
                }

                return null;
            }

            function mutateSavedVehicles(vehicle, vehicleId) {
                var isExisting = false;
                var changedIdx = 0;

                //mutation
                $scope.sbp.data.savedVehicles.map(function(savedVehicle, index) {
                    if (savedVehicle.id == vehicleId) {
                        isExisting = true;
                        savedVehicle = vehicle;
                        changedIdx = index;
                    }
                });
                //insert at last
                if (!isExisting) {
                    var index = $scope.sbp.data.savedVehicles.length;
                    (vehicle) ? $scope.sbp.data.savedVehicles.splice(index, 1, vehicle): $scope.sbp.data.savedVehicles.splice(index, 1);
                } //update
                else {
                    (vehicle) ? $scope.sbp.data.savedVehicles.splice(changedIdx, 1, vehicle): $scope.sbp.data.savedVehicles.splice(changedIdx, 1);
                }
            }

            function onGetVehicleInfoResponse(response) {
                $scope.sbp.changeEmail = false;

                if (response && response.Data && response.Data.Vehicles.length == 0) {
                    $scope.virtualSavedStates = [];
                    $scope.sbp.data.savedVehicles = [];
                    $scope.sbp.activeModel = null;
                    updateStatus($scope.sbp.data.savedVehicles);
                    return;
                }

                $scope.vehicleState = response.Data.Vehicles[0].DeepLink;
                $scope.virtualSavedStates = [];
                var vehicleCount = response.Data.Vehicles.length;

                for (var i = 0; i < vehicleCount; i++) {
                    //To support old data n/a in live
                    var _v = JSON.parse(response.Data.Vehicles[i].DeepLink);

                    if (_v && !_v.id) {
                        _v.id = response.Data.Vehicles[i].VehicleId;
                    }
                    $scope.virtualSavedStates.push(_v);
                }

                $scope.sbp.activeModel = (vehicleCount >= $scope.sbp.vehicleMaxLimitToSave) ? $scope.virtualSavedStates[0].id : null;
                callVehicleTree(JSON.parse(response.Data.Vehicles[0].DeepLink), response.Data.Vehicles[0].VehicleId);
                updateStatus($scope.sbp.data.savedVehicles);
            }

            $scope.getVehicleInfo = function(email) {
                if (!email) {
                    return;
                }

                $scope.sbp.showCurrentVehicle = false;
                var getAnalytics = API.get($filter('formatArgs')(Lexus.API.Analytics.GetSavedVehicles, ["1", email]));

                getAnalytics
                    .then(function(response) {
                        $scope.sbp.loggedIn = true;
                        $scope.userEmail = email;
                        UserPreferencesService.setAnalyticsCookie({
                            identifier: email
                        });
                        onGetVehicleInfoResponse(response);
                    }, function(error) {
                        $scope.sbp.loggedIn = false;
                        updateStatus($scope.sbp.data.savedVehicles);
                        $log.error(error);
                    }).finally(function() {
                        $scope.sbp.showCurrentVehicle = true;
                    });
            };

            function openNav(vehicle) {
                $("#slide-out-tray").addClass("show");
                $('body').removeClass("save-modal-open").addClass("save-modal-open");
                onNavOpened(vehicle);
            }

            function onNavOpened(vehicle) {
                setVehicle(vehicle);
            }

            function setVehicle(vehicle) {
                if (!vehicle) {
                    return;
                }

                var vts = $scope.sbp.data.vehicleToSave;
                vts.carmodel = vehicle.carmodel;
                vts.engineVariant = vehicle.engineVariant;
                vts.grade = vehicle.grade;
                vts.enhancementPack = vehicle.enhancementPack;
                vts.trim = vehicle.trim;
                vts.colour = vehicle.colour;
                vts.id = $scope.sbp.activeModel;
                vts.carImageSource = $scope.sbp.data.currentVehicle.imgSrc;

                $scope.sbp.data.currentVehicle = (vehicle.carmodel && vehicle.engineVariant) ? getSavedVehicleRendering(vts) : getDefaultVehicleState();
                $scope.sbp.imageTransitionInProgress = false;

                if (!$scope.sbp.initState && !$scope.sbp.loadingVehicles) {
                    $scope.sbp.data.savedVehicles = getSavedVehiclesRendering($scope.virtualSavedStates);
                    updateAndRetrieveVehicleId();
                    $scope.sbp.initState = true;
                }
            }

            /* Set the width of the side navigation to 0 */
            $scope.closeNav = function() {
                $scope.$emit(BuildPriceService.events.triggerCloseSaveBuildPriceDialog, {});
                $("#slide-out-tray").removeClass("show");
                $('body').removeClass("save-modal-open");
            }
        }
    }]);;
"use strict";
angular.module('Lexus.Directives')
    .directive('lxTranslate', function() {
        lxTranslateToastController.$inject = ['$scope', '$attrs', '$window', '$rootScope', '$cookies', '$timeout', 'UserPreferencesService', 'TranslationService'];
        return {
            scope: true,
            restrict: 'C',
            controller: lxTranslateToastController,
            controllerAs: 'ltt',
            bindToController: true
        }

        function lxTranslateToastController($scope, $attrs, $window, $rootScope, $cookies, $timeout, UserPreferencesService, TranslationService) {
            var translateUrl = $attrs.translateUrl;
            var pageGuid = $attrs.pageGuid;
            var window = angular.element($window);
            var throttlescroll;

            $scope.showToast = false;

            var languagePref = UserPreferencesService.getLanguagePref(pageGuid);
            if (languagePref == null || languagePref.translate == null) {
                $scope.showToast = true;
            }

            $scope.translate = function(translate) {
                $scope.showToast = false;

                if (translate) {
                    UserPreferencesService.setLanguagePref({
                        translate: true
                    }, pageGuid);
                    $window.location.href = translateUrl + "?translate=true";
                } else {
                    UserPreferencesService.setLanguagePref({
                        translate: false
                    }, pageGuid);
                    $rootScope.$broadcast('show-confirmation');
                }
            }

            window.bind("scroll", function() {
                clearTimeout(throttlescroll);
                if ($scope.showToast == true) {
                    throttlescroll = $timeout(checkAmountScrolled, 100);
                }
            });

            function checkAmountScrolled() {
                var pageYOffset = $window.pageYOffset;
                if ($attrs.scrollOffset < pageYOffset) {
                    UserPreferencesService.setLanguagePref({
                        translate: false
                    }, pageGuid);
                    $scope.showToast = false;
                }
            }
        }
    });;
"use strict";

angular.module('Lexus.Services')
    .service('TranslationService', [
        function() {
            var self = this;
            self.isBrowserLanguageSupported = function(browserLanguages, supportedLanguagesStr) {
                var supportedLanguages = supportedLanguagesStr.split(",");
                if (browserLanguages && browserLanguages.length > 0) {
                    for (var i = 0; i < browserLanguages.length; i++) {
                        var browserLanguage = browserLanguages[i];
                        var langArray = browserLanguage.split(';');
                        if (langArray && supportedLanguages.indexOf(langArray[0].toLowerCase()) >= 0) {
                            return true;
                        }
                    }
                }
                return false;
            }

            return self;
        }
    ]);

;
"use strict";
angular.module('Lexus.Directives')
    .directive('lxLanguageCheck', ['TranslationService', function(TranslationService) {
        return {
            scope: true,
            restrict: 'A',
            link: function(scope, element, attrs) {
                var browserLanguageSupported = true;
                var supportedLanguages = attrs.lxLanguageCheck;
                if (supportedLanguages.length > 0) {
                    var browserLanguages = angular.fromJson(attrs.browserLanguages);
                    browserLanguageSupported = TranslationService.isBrowserLanguageSupported(browserLanguages, supportedLanguages);
                }
                if (browserLanguageSupported) {
                    element.addClass("visible");
                }
            }
        }
    }]);;
"use strict";
angular.module('Lexus.Directives')
    .directive('lxTranslateConfirm', function() {
        lxTranslateConfirmController.$inject = ['$scope', '$attrs', '$rootScope', '$window', '$cookies', '$timeout', '$location', 'UserPreferencesService', 'TranslationService'];
        return {
            scope: true,
            restrict: 'C',
            controller: lxTranslateConfirmController,
            controllerAs: 'ltt',
            bindToController: true
        }

        function lxTranslateConfirmController($scope, $attrs, $rootScope, $window, $cookies, $timeout, $location, UserPreferencesService, TranslationService) {
            $scope.showToast = false;
            var window = angular.element($window);
            var throttlescroll;
            var showTranslateConfirmation = $location.search().translate;
            if (showTranslateConfirmation == "true") {
                $scope.showToast = true;
            }

            window.bind("scroll", function() {
                clearTimeout(throttlescroll);
                if ($scope.showToast == true) {
                    throttlescroll = $timeout(checkAmountScrolled, 100);
                }
            });

            $rootScope.$on('show-confirmation', function(event, data) {
                $timeout(function() {
                    $scope.showToast = true;
                }, 100);
            });

            function checkAmountScrolled() {
                var pageYOffset = $window.pageYOffset;
                if ($attrs.scrollOffset < pageYOffset) {
                    $scope.showToast = false;
                }
            }
        }
    });;
"use strict";
angular.module('Lexus.Directives')
    .directive('lxOpeningHours', ['$window', '$timeout', '$filter', '$http', function($window, $timeout, $filter, $http) {
        openingHoursController.$inject = ['$scope', '$http', '$filter', '$timeout', '$window', '$interval', '$rootScope'];
        return {
            scope: true,
            restrict: 'A',
            controller: openingHoursController,
            controllerAs: 'oh',
            bindToController: true,
            link: function(scope, element, attrs, filter, http) {}
        };

        function openingHoursController($scope, $http, $filter, $timeout, $window, $interval, $rootScope) {
            var oh = this;
            $scope.init = function(openingHour, closingHour, isClosed) {
                oh.IsOpenNow = false;
                oh.OpenNowText = "Open now:";
                var openingHourElements = openingHour.split(":");
                var closingHourElements = closingHour.split(":");
                if (!isClosed === true && openingHourElements.length === 2 && closingHourElements.length === 2) {
                    var now = new Date();
                    var year = now.getFullYear();
                    var month = now.getMonth();
                    var day = now.getDate();

                    var dateOpeningHour = new Date(year, month, day, openingHourElements[0], openingHourElements[1]);
                    var dateClosingHour = new Date(year, month, day, closingHourElements[0], closingHourElements[1]);

                    oh.IsOpenNow = dateOpeningHour.getTime() < now.getTime() && dateClosingHour.getTime() > now.getTime();
                }
                oh.OpenNowText = oh.IsOpenNow ? "Open now:" : "Closed";
            };

            oh.simplifyTime = function(time) {
                var result = time;
                var timeElements = time.split(":");

                if (timeElements.length === 2) {
                    var hour = timeElements[0];
                    if (hour - 12 >= 0) {
                        result = (hour - 12) + ':' + timeElements[1] + "pm";
                    } else {
                        result = hour + ':' + timeElements[1] + "am";
                    }
                    if (timeElements[1].indexOf("00") >= 0) {
                        result = result.replace(':00', '');
                    }
                }

                return result;
            };

        }
    }]);


;
'use strict';
angular
    .module('Lexus.Components')
    .component('threeDotToggleButton', {
        bindings: {
            'isActive': '<',
            'screenReaderText': '@',
            'cssClass': '@'
        },
        template: [
            '<button class="lx-three-dot-toggle-button {{$ctrl.cssClass}}" ng-class="{\'is-active\' : $ctrl.isActive}">',
            '<span class="lx-three-dot-toggle-button__screen-reader-text">{{$ctrl.screenReaderText}}</span>',
            '<span class="lx-three-dot-toggle-button__dots"><span class="lx-three-dot-toggle-button__dot"></span></span>',
            '</button>'
        ].join('')
    });;
"use strict";
angular
    .module('Lexus.Components')
    .component('welcomeMessage', {
        bindings: {
            hoursOfDay: '@hours',
            cssClass: '@cssClass'
        },
        controller: ['API', '$filter', function(API, $filter) {
            var ctrl = this;
            this.$onInit = function() {

                API.get($filter('formatArgs')(Lexus.API.Lookup.GetWelcomeMessage, [
                    Lexus.ID.Site,
                    ctrl.hoursOfDay
                ])).then(function(data) {
                        if (data && data.Data) {
                            ctrl.message = data.Data.Message;
                        }
                    },
                    function(error) {
                        ctrl.message = null;
                    });
            };
        }],
        template: '<span class="{{$ctrl.cssClass}}">{{$ctrl.message}}</span>'
    });;
(function() {

    "use strict";

    angular.module('Lexus')
        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                rewriteLinks: 'data-route',
                requireBase: false
            });
        }])
        .config(['tagsInputConfigProvider', function(tagsInputConfigProvider) {
            tagsInputConfigProvider.setDefaults('tagsInput', {
                placeholder: '',
                addOnPaste: true,
                addOnBlur: true,
                maxTags: 1,
                replaceSpacesWithDashes: false,
                //enableEditingLastTag: true,
                selectOnBackspace: false,
                addFromAutocompleteOnly: true,
                allowLeftoverText: true,
                debounceDelay: 500
            });
            tagsInputConfigProvider.setDefaults('autoComplete', {
                minLength: 2
            });
            tagsInputConfigProvider.setActiveInterpolation('tagsInput', {
                placeholder: true
            });
        }])
}());;
(function() {

    "use strict";

    angular.module('Lexus');
    //UTM variables should not be persisted due to an incompatibility in how eloqua handles utm_campaigns
    /*.run([
		"$location", "UserPreferencesService",
		function ($location, userPreferencesService) {
			var params = $location.search();
            
			var utmParameters = userPreferencesService.getUtmParameters();

			if (params.utm_source) { utmParameters.source = params.utm_source; }

			if (params.utm_medium) { utmParameters.medium = params.utm_medium; }

			if (params.utm_campaign) { utmParameters.campaign = params.utm_campaign; }

			if (params.utm_content) { utmParameters.content = params.utm_content; }

			userPreferencesService.setUtmParameters(utmParameters); 
		}
	]);*/
}());;