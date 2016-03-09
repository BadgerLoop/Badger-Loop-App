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

.controller('MenuCtrl', function($scope, Chats) {
    $scope.Chats = Chats;

    $scope.goToURL = function(url){
        window.open(url, '_blank', 'location=yes');
    }
})

.controller('InstaCtrl', function($scope, $timeout, PhotoService) {
    $scope.items = [];
    $scope.newItems = [];
    $scope.noMoreItemsAvailable = false;

    PhotoService.GetFeed().then(function(items) {

      $scope.items = items.concat($scope.items);

    });

    $scope.doRefresh = function() {
      if ($scope.newItems.length > 0) {
        $scope.items = $scope.newItems.concat($scope.items);

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

        $scope.newItems = [];
      } else {
        PhotoService.GetNewPhotos().then(function(items) {


          $scope.items = items.concat($scope.items);

          //Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });
      }
    };
    $scope.loadMore = function() {
      PhotoService.GetOldPhotos().then(function(items) {

        $scope.items = $scope.items.concat(items);

        $scope.$broadcast('scroll.infiniteScrollComplete');
        
        // an empty array indicates that there are no more items
        if (items.length === 0) {
          $scope.noMoreItemsAvailable = true;
        }

      });
    };
})

.controller('HomeCtrl', function($rootScope, $scope, TDCardDelegate, $state) {
    console.log('CARDS CTRL');
    var cardTypes = [

        { image: 'img/Carbon.png', link: 'https://sketchfab.com/models/831debd4b0974d3fb55e39c1318eb704/embed?autostart=1', name: 'Carbon Shell'},
        { image: 'img/Frame.png', link: 'https://sketchfab.com/models/78ff061f402948c7a9ddf34d59231f33/embed?autostart=1', name: 'Aluminum Frame'},
        { image: 'img/halbachwheel.png', link: 'https://sketchfab.com/models/753e97d889b04378abfbadd7e5e5796a/embed?autostart=1', name: 'Hallbach Wheel'},
        { image: 'img/Braking.png', link: 'https://sketchfab.com/models/7199f633568340c389c4cf1e92063c90/embed?autostart=1', name: 'Braking System'},
        { image: 'img/batterybox.png', link: 'https://sketchfab.com/models/f8afc5ddc991445e854b3f0f46374999/embed?autostart=1', name: 'Battery Box'}
    ];

    $scope.timeline = [
      { id: 1, title: 'BadgerLoop Founded', text: 'BadgerLoop was founded in July of 2015 after SpaceX announced the Hyperloop Competition', icon: 'ion-chevron-right', time: 'July 2015'},
      { id: 2, title: 'First KickOff Meeting', text: 'BadgerLoop hosted its first kickoff meeting on September 10, 2015. Our team’s goal was to recruit UW Madison students to begin formulating a design.', icon: 'ion-chevron-right', time: 'September 2015'},
      { id: 3, title: 'Preliminary Design Due', text: 'The Preliminary Design for our Hyperloop pod was due on November 13, 2015. Our team spent countless hours preparing this package for SpaceX. Details of the design covered all different teams: mechanical, electrical, software, safety, braking and levitation.', icon: 'ion-chevron-right', time: 'November 2015'},
      { id: 4, title: 'Final Design Package Due', text: 'The Final Design Package was submitted to SpaceX on January 20, 2016 before Design Weekend.', icon: 'ion-chevron-right', time: 'January 2016'},
      { id: 5, title: 'Design Weekend', text: 'Design Weekend took place at Texas A&M from January 29th to the 30th, 2016. A team of about 20 BadgerLoopers made the trip out to College Station to showcase our pod design to the SpaceX judges and public. BadgerLoop was honored to receive 3rd place and advance to Competition Weekend. ', icon: 'ion-chevron-right', time: 'January 2016'},
      { id: 6, title: 'Design Freeze', text: 'Our final design submission was submitted in late February of 2016. After hearing feedback from both the SpaceX judges and assigned SpaceX advisors, an official design for the pod was set in place for the team to begin fabrication.', icon: 'ion-chevron-right', time: 'February 2016'},
      { id: 7, title: 'Competition Weekend', text: 'After completing the fabrication process, BadgerLoop will travel to Hawthorne, CA in August of 2016 to test the pod in the tube that SpaceX is currently constructing. Our pod will be tested in four general categories of “Final Design and Construction”, “Safety and Reliability”, “Performance in Operations” and“Performance in Flight”.', icon: 'ion-chevron-right', time: 'August 2016'},
    ];

    $scope.cards = Array.prototype.slice.call(cardTypes, 0);
    $rootScope.unseenMsg = 2;

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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $ionicScrollDelegate, $ionicActionSheet, $timeout, $ionicModal) {
    $scope.chatadd = Chats;
    $scope.chat = Chats.get(0);
    $scope.focusManager = {focusInputOnBlur: true};

    $scope.$on('$ionicView.afterEnter', function () {
        Chats.markAllRead();
    });

    $ionicModal.fromTemplateUrl('templates/chat-info-modal.html', {        
            scope: $scope,        
            animation: 'slide-in-up'      
        }).then(function(modal) {     
            $scope.modal = modal;        
        });       
          
        $scope.openModal = function() {       
        $scope.modal.show();      
        };        
        $scope.closeModal = function() {      
        $scope.modal.hide();      
        };        
        //Cleanup the modal when we're done with it!      
        $scope.$on('$destroy', function() {       
        $scope.modal.remove();        
        });       
        // Execute action on hide modal       
        $scope.$on('modal.hidden', function() {       
        // Execute action     
        });       
        // Execute action on remove modal     
        $scope.$on('modal.removed', function() {      
        // Execute action     
        });

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

    $scope.shouldNotFocusOnBlur = function() {
        // console.log("should not focus");
      $scope.focusManager.focusInputOnBlur = false;
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
