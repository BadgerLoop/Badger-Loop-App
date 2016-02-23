app.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
})

.controller('AICtrl', function($scope, $timeout, $ionicScrollDelegate, $riffle) {

  $scope.hideTime = true;

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  //Formats and sends message to UI
  $scope.sendMsg = function(id, message){
    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    $scope.messages.push({
      userId: id,
      text: message,
      time: d
    });
  }  

  //Called when response from backend is received
  $scope.returnMsg = function(s){
    $scope.sendMsg('54321', s);
  }

  //Called when user inputs message in UI
  $scope.userMessage = function() {
    
    $scope.sendMsg('12345', $scope.data.message);

    //Send to Exis node the message and get response
    var p = $riffle.call("message", $scope.data.message);
    p.then($scope.returnMsg);

    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);
  };


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.myId = '12345';
  $scope.messages = [];

});