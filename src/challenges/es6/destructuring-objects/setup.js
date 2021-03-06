var app = angular.module('theSandboxChallenge.setup', ['theSandboxChallenge', 'ui.bootstrap']);

var SetupCtrl = function ($injector) {
  this.options = {};
  this.options.group = 'ES6';
  this.options.challengeId = 'destructuringObjects';
  this.options.description = 'Call <code>getAfricanSwallowStats()</code> and using destructuring assign the <code>name</code> ' +
    'property to a variable called <code>name</code> and the <code>airSpeedMetersPerSecond</code> property to a ' +
    'variable called <code>airSpeed</code>. ' +
    '<br/>' +
    'Note: you should be able to do all of this in one line.';

  this.options.testCases = [
    $injector.instantiate(TestCase, {
      description: '<code>name</code> is defined',
      expression: 'name',
      expectedValue: 'African Swallow',
      runTest: function () {
        return window.name;
      }
    }),
    $injector.instantiate(TestCase, {
      description: '<code>airSpeed</code> is defined',
      expression: 'airSpeed',
      expectedValue: 11,
      runTest: function () {
        return window.airSpeed;
      }
    })
  ];
};