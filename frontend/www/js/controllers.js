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

.controller('HomeCtrl', function($scope, TDCardDelegate, $state) {
    console.log('CARDS CTRL');
    var cardTypes = [
        { image: 'img/podoverview.png', link: 'https://sketchfab.com/models/3767339accc642268061291457c2a21f/embed?autostart=1', name: 'Pod Overview'},
        { image: 'img/trophy.jpg', link: 'https://sketchfab.com/models/3767339accc642268061291457c2a21f/embed?autostart=1', name: 'Trophy'},
        { image: 'img/BadgerLoopLogo.png', link: 'https://sketchfab.com/models/3767339accc642268061291457c2a21f/embed?autostart=1', name: 'BadgerLoop Logo'}
    ];

    $scope.timeline = [
      { id: 1, title: 'BadgerLoop Founded', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus laoreet lacus quis tempor.', icon: 'icon ion-home', time: '28-08-2015'},
      { id: 2, title: 'First KickOff Meeting', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices aliquam est sed pharetra.', icon: 'icon ion-ios-heart', time: '20-08-2015'},
      { id: 3, title: 'Preliminary Design Briefing Due', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a velit ac eros suscipit lobortis.', icon: 'icon ion-ios-star', time: '19-08-2015'},
      { id: 4, title: 'Final Design Package Due', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus enim nec convallis convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: 'icon ion-plane', time: '18-08-2015'},
      { id: 5, title: 'Design Weekend', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus enim nec convallis convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: 'icon ion-ios-game-controller-a', time: '10-08-2015'},
      { id: 6, title: 'Competition Weekend', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus laoreet lacus quis tempor.', icon: 'icon ion-home', time: '02-08-2015'},
    ];

    $scope.cards = Array.prototype.slice.call(cardTypes, 0);

    $scope.cardDestroyed = function(index) {
        $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
        var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        newCard.id = Math.random();
        $scope.cards.push(angular.extend({}, newCard));
    }
    $scope.cardSwipedLeft = function(index) {
        console.log('LEFT SWIPE');
        $scope.addCard();
    };
    $scope.cardSwipedRight = function(index) {
        console.log('RIGHT SWIPE');
        $scope.addCard();
        $state.go('render', { link: $scope.cards[index].link, name: $scope.cards[index].name });
    };
})

// Render controller
.controller('RenderCtrl', function($scope, $state, $sce, $stateParams) {
    $scope.link = $sce.trustAsResourceUrl($stateParams.link);
    $scope.name = $stateParams.name;
})

// News controller
.controller('NewsCtrl', function($scope, Posts, $state, $cordovaSocialSharing, $http) {
    // get list posts froms service
    Posts.all().then(function(data) {
        $scope.posts = data;
    });

    $scope.sharePost = function(post) {
        if (post.isArticle) {
            $cordovaSocialSharing
                .share("Check out the article BadgerLoop was mentioned in!", "The BadgerLoop team knows what they're doing!", null, post.link) // Share via native share sheet
                .then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occured. Show a message to the user
                });
        } else {
            $cordovaSocialSharing
                .share("Check out the BadgerLoop Team!", "The BadgerLoop team knows what they're doing!", null, 'https://badgerloop.com') // Share via native share sheet
                .then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occured. Show a message to the user
                });
        }
    }

    // view post
    $scope.viewPost = function(post) {
        //Open in different viewer
        if (post.isArticle) {
            $state.go('articles', { link: post.link, name: post.name });
        } else {
            $state.go('post', { postId: post.id });
        }
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
            buttons: [{
                text: 'Copy Text'
            }, {
                text: 'Delete Message'
            }],
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
})

.controller('ArticlesCtrl', function($scope, Posts, $state, $stateParams, $sce) {
    // set up variables
    $scope.link = $sce.trustAsResourceUrl($stateParams.link);
    $scope.name = $stateParams.name;
    console.log($scope.link, $scope.name);
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
        $state.go('user', { userId: contactId });
    }
})

// Funding controller
.controller('FundCtrl', function($scope, StripeCharge) {
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
        if (typeof amount === "string") {
            $scope.ProductMeta.priceUSD = parseInt(amount);
        } else {
            $scope.ProductMeta.priceUSD = amount;
        }
        console.log($scope.ProductMeta.priceUSD);
        $scope.status['loading'] = true;
        $scope.status['message'] = "Retrieving your Stripe Token...";

        // first get the Stripe token
        StripeCharge.getStripeToken($scope.ProductMeta).then(
            function(stripeToken) {
                // -->
                proceedCharge(stripeToken);
            },
            function(error) {
                console.log(error)

                $scope.status['loading'] = false;
                if (error != "ERROR_CANCEL") {
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
                function(StripeInvoiceData) {
                    $scope.status['loading'] = false;
                    $scope.status['message'] = "Success! Check your Stripe Account";
                    console.log(StripeInvoiceData)
                },
                function(error) {
                    console.log(error);

                    $scope.status['loading'] = false;
                    $scope.status['message'] = "Oops... something went wrong";
                }
            );

        }; // ./ proceedCharge

    };
})
