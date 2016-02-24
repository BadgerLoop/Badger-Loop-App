app

.controller('AICtrl', function($scope, $timeout, $ionicScrollDelegate, $riffle) {

  $scope.hideTime = true;

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  //Formats and sends message to UI
  // $scope.sendMsg = function(id, message){
  //   var d = new Date();
  //   d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

  //   $scope.messages.push({
  //     userId: id,
  //     text: message,
  //     time: d
  //   });
  // }  

  // //Called when response from backend is received
  // $scope.returnMsg = function(s){
  //   $scope.sendMsg('54321', s);
  // }

  // //Called when user inputs message in UI
  // $scope.userMessage = function() {
    
  //   $scope.sendMsg('12345', $scope.data.message);

  //   //Send to Exis node the message and get response
  //   var p = $riffle.call("message", $scope.data.message);
  //   p.then($scope.returnMsg);

  //   delete $scope.data.message;
  //   $ionicScrollDelegate.scrollBottom(true);
  // };
  $scope.userMessage = function() {
    alternate = !alternate;

    var d = new Date();
  d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    $scope.messages.push({
      userId: alternate ? '12345' : '54321',
      text: $scope.data.message,
      time: d
    });

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