(function () {
  var configApp = angular.module('theSandboxChallenge.config');

  configApp.factory('challengeConfig', function () {
    return {
      challenges: {
        ES6: {
          blockScopeLet: {
            jsBin: 'likum',
            name: 'Block Scopes'
          },
          arrowFunctions: {
            jsBin: 'mupone',
            name: 'Arrow Functions'
          },
          forOfLoops: {
            jsBin: 'katum',
            name: 'For...Of Loops'
          },
          destructuringArrays: {
            jsBin: 'fidig',
            name: 'Destructuring: Arrays'
          },
          destructuringSwap: {
            jsBin: 'sapuyo',
            name: 'Destructuring: Swap'
          },
          destructuringObjects: {
            jsBin: 'gagebowu',
            name: 'Destructuring: Objects'
          },
          optionalParameters: {
            jsBin: 'befey',
            name: 'Optional Parameters'
          },
          classConstructors: {
            jsBin: 'tihul',
            name: 'Class Constructors'
          },
          classInheritance: {
            jsBin: 'dodag',
            name: 'Class Inheritance'
          },
          fibonacciGenerator: {
            jsBin: 'muvan',
            name: 'Fibonacci Generator'
          },
          makeAPromise: {
            jsBin: 'diluj',
            name: 'Make a Promise'
          }
        },
        AngularFire: {
          firebaseSimpleLogin: {
            jsBin: 'qetin',
            name: 'Firebase Simple Login'
          },
          userProfile: {
            jsBin: 'mojan',
            name: 'User Profile',
            views: 'html,js,output'
          },
          firebaseService: {
            jsBin: 'kefuh',
            name: 'The $firebase Service'
          },
          collections: {
            jsBin: 'fijur',
            name: 'Collections',
            views: 'html,js,output'
          },
          priority: {
            jsBin: 'cobile',
            name: '$priority',
            views: 'html,js,output'
          },
          child: {
            jsBin: 'nogaj',
            name: '$child'
          },
          threeWayBinding: {
            jsBin: 'nozow',
            name: 'Three Way Binding'
          }
        }
      },
      order: {
        ES6: ['blockScopeLet', 'arrowFunctions', 'forOfLoops', 'optionalParameters', 'destructuringArrays', 'destructuringSwap', 'destructuringObjects', 'classConstructors', 'classInheritance', 'fibonacciGenerator', 'makeAPromise'],
        AngularFire: ['firebaseSimpleLogin', 'userProfile', 'firebaseService', 'collections', 'priority', 'child', 'threeWayBinding']
      },

      getChallenge: function (id) {
        for (var group in this.challenges) {
          for (var challengeId in this.challenges[group]) {
            if (id === challengeId) {
              return this.challenges[group][challengeId];
            }
          }
        }

        return undefined;
      }

    }
  });
}());