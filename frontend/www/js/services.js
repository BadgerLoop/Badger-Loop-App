angular.module('starter.services', [])

.factory('Chats', function($riffle, $ionicScrollDelegate) {
    // Might use a resource here that returns a JSON array
    var d = new Date();
    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Betsy',
        face: 'img/thumb/logobl.png',
        messages: [{
            type: 'received',
            text: 'Hey! This is Betsy, the BadgerLoop\'s Pod',
            image: '',
            time: d.toLocaleTimeString()
        }, {
            type: 'received',
            text: 'Is there something I can help you with?',
            image: '',
            time: d.toLocaleTimeString()
        }]
    }];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        addMsg: function(msg) {
            var d = new Date();
            chats[0].messages.push(msg); //push input message
            $riffle.call("message", msg.text).then(function(result) {
                chats[0].messages.push({
                    'type': 'received',
                    'text': result,
                    'time': d.toLocaleTimeString()
                });
                $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
            });
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
})

.factory('Posts', function($http, $q) {
    // Might use a resource here that returns a JSON array

    var posts = [];

    return {
        all: function() {
            return $http.get('js/data/posts.json').then(function(response){
                posts = response.data;
                return response.data;
            });
        },
        remove: function(post) {
            posts.splice(posts.indexOf(post), 1);
        },
        get: function(postId) {
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].id === parseInt(postId)) {
                    return posts[i];
                }
            }
            return null;
        }
    };
})

.factory('Notifications', function() {
        // fake data
        var notifications = [{
            id: 1,
            type: 'liked',
            user_id: 2,
            name: 'Max Lynx',
            face: 'img/thumb/max.png',
            read: false,
            time: 'Just now'
        }, {
            id: 2,
            type: 'commented',
            user_id: 2,
            name: 'Adam Bradleyson',
            face: 'img/thumb/adam.jpg',
            read: true,
            time: '3 minutes ago'
        }, {
            id: 3,
            type: 'friend_request',
            user_id: 2,
            name: 'Perry Governor',
            face: 'img/thumb/perry.png',
            read: true,
            time: '5 minutes ago'
        }, {
            id: 4,
            type: 'liked',
            user_id: 2,
            name: 'Ben Sparrow',
            face: 'img/thumb/ben.png',
            read: false,
            time: '6 minutes ago'
        }, {
            id: 5,
            type: 'friend_request',
            user_id: 2,
            name: 'Perry Governor',
            face: 'img/thumb/perry.png',
            read: true,
            time: '5 minutes ago'
        }, {
            id: 6,
            type: 'liked',
            user_id: 2,
            name: 'Ben Sparrow',
            face: 'img/thumb/ben.png',
            read: false,
            time: '6 minutes ago'
        }];

        return {
            all: function() {
                return notifications
            }
        };

    })
    .factory('Contacts', function() {
        // Some fake testing data
        var contacts = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/thumb/ben.png',
            group: 'Friend'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/thumb/max.png',
            group: 'Family'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/thumb/adam.jpg',
            group: 'Friend'
        }, {

            d: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/thumb/perry.png',
            group: 'Friend'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/thumb/mike.png',
            group: 'Family'
        }, {
            id: 5,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/thumb/ben.png',
            group: 'Friend'
        }, {
            id: 6,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/thumb/max.png',
            group: 'Family'
        }];

        return {
            all: function() {
                return contacts
            },
            get: function(contactId) {
                for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i].id === parseInt(contactId)) {
                        return contacts[i];
                    }
                }
                return null;
            }
        }
    });
