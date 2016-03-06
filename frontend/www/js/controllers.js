angular.module('starter.controllers', [])

// Authentication controller
// Put your login, register functions here
.controller('AuthCtrl', function($scope, $ionicHistory, $ionicSideMenuDelegate) {
  // hide back butotn in next view
  $ionicHistory.nextViewOptions({
    disableBack: true
  });

  // disabled swipe menu
  $ionicSideMenuDelegate.canDragContent(false);
})
// News controller
.controller('HomeCtrl', function($scope, Posts, $state) {

  // Ionic.io(); 
  // var deploy = new Ionic.Deploy();


  
  // // Update app code with new release from Ionic Deploy
  // $scope.doUpdate = function() {
  //   deploy.update().then(function(res) {
  //     console.log('Ionic Deploy: Update Success! ', res);
  //   }, function(err) {
  //     console.log('Ionic Deploy: Update error! ', err);
  //   }, function(prog) {
  //     console.log('Ionic Deploy: Progress... ', prog);
  //   });
  // };

  // // Check Ionic Deploy for new code
  // $scope.checkForUpdates = function() {
  //   console.log('Ionic Deploy: Checking for updates');
  //   deploy.check().then(function(hasUpdate) {
  //     console.log('Ionic Deploy: Update available: ' + hasUpdate);
  //     $scope.hasUpdate = hasUpdate;
  //   }, function(err) {
  //     console.error('Ionic Deploy: Unable to check for updates', err);
  //   });
  // }
})

// News controller
.controller('NewsCtrl', function($scope, Posts, $state, $cordovaSocialSharing) {
  // get list posts froms service
  $scope.posts = Posts.all();

  $scope.sharePost = function(){
    $cordovaSocialSharing
    .share("Check out the BadgerLoop Team!", null, null, 'https://badgerloop.com') // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    });
  }

  // view post
  $scope.viewPost = function(postId) {
    $state.go('post', {postId: postId});
  }

  // view user
  $scope.viewUser = function(userId) {
    $state.go('user', {userId: userId});
  }
})

// Chat controller, view list chats and chat detail
.controller('ChatCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();

  // remove a conversation
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  // mute a conversation
  $scope.mute = function(chat) {
    // write your code here
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $ionicScrollDelegate, $ionicActionSheet, $timeout) {
  $scope.chatadd = Chats;
  $scope.chat = Chats.get(0);

  $scope.sendMessage = function() {
    var d = new Date();
    var message = {
      type: 'sent',
      time: d.toLocaleTimeString(),
      text: $scope.input.message
    };

    $scope.input.message = '';

    // push to massages list
    Chats.addMsg(message);
  };

  // hover menu
  $scope.onMessageHold = function(e, itemIndex, message) {
    // show hover menu
    $ionicActionSheet.show({
      buttons: [
        {
          text: 'Copy Text'
        }, {
          text: 'Delete Message'
        }
      ],
      buttonClicked: function(index) {
        switch (index) {
          case 0: // Copy Text
            //cordova.plugins.clipboard.copy(message.text);

            break;
          case 1: // Delete
            // no server side secrets here :~)
            $scope.chat.messages.splice(itemIndex, 1);
            break;
        }

        return true;
      }
    });
  };

})

.controller('PostCtrl', function($scope, Posts, $state, $stateParams) {

  console.log($stateParams.postId);

  // get list posts froms service
  $scope.post = Posts.get($stateParams.postId);

  // toggle like button
  $scope.toggleLike = function (post) {
    // if user liked
    if(post.liked) {
      post.likeCount--;
    } else {
      post.likeCount++;
    }
    post.liked = !post.liked;
  };

  // view user function
  $scope.viewUser = function(userId) {
    $state.go('user', {userId: userId});
  }
})

// Notifications controller
.controller('NotificationsCtrl', function($scope, Notifications) {
  // get list posts from service
  $scope.notifications = Notifications.all();
})

// ContactsCtrl controller
.controller('TeamCtrl', function($scope, Contacts, $state) {
  // get list posts froms service
  $scope.contacts = Contacts.all();

  // view contact function
  $scope.viewContact = function(contactId) {
    $state.go('user', {userId: contactId});
  }
})

// UserCtrl controller
.controller('UserCtrl', function($scope, Contacts, Posts, $stateParams) {
  // get contact from Contacts service
  // set the userId here
  $scope.user = Contacts.get(0);
  // attach post to this contact
  angular.extend($scope.user, {
    'followers': 199,
    'following': 48,
    'favorites': 14,
    'posts': Posts.all()
  });
})

// Funding controller
.controller('FundCtrl', function($scope, StripeCharge){
  $scope.ProductMeta = {
    title: "BadgerLoop Fundraising",
    description: "Thank you!",
    priceUSD: 1,
  };

  $scope.status = {
    loading: false,
    message: "",
  };

  $scope.charge = function(amount) {
    if(typeof amount === "string"){
      $scope.ProductMeta.priceUSD = parseInt(amount);
    }else{
      $scope.ProductMeta.priceUSD = amount;  
    }
    console.log($scope.ProductMeta.priceUSD);
    $scope.status['loading'] = true;
    $scope.status['message'] = "Retrieving your Stripe Token...";

    // first get the Stripe token
    StripeCharge.getStripeToken($scope.ProductMeta).then(
      function(stripeToken){
        // -->
        proceedCharge(stripeToken);
      },
      function(error){
        console.log(error)

        $scope.status['loading'] = false;
        if(error != "ERROR_CANCEL") {
          $scope.status['message'] = "Oops... something went wrong";
        } else {
          $scope.status['message'] = "";
        }
      }
    ); // ./ getStripeToken

    function proceedCharge(stripeToken) {

      $scope.status['message'] = "Processing your payment...";

      // then chare the user through your custom node.js server (server-side)
      StripeCharge.chargeUser(stripeToken, $scope.ProductMeta).then(
        function(StripeInvoiceData){
          $scope.status['loading'] = false;
          $scope.status['message'] = "Success! Check your Stripe Account";
          console.log(StripeInvoiceData)
        },
        function(error){
          console.log(error);

          $scope.status['loading'] = false;
          $scope.status['message'] = "Oops... something went wrong";
        }
      );

    }; // ./ proceedCharge

  };
})
