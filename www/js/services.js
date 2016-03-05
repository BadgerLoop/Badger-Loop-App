angular.module('starter.services', [])

  .factory('Chats', function ($riffle) {
    // Might use a resource here that returns a JSON array
    var d = new Date();
    // Some fake testing data
    var chats = [
      {
        id: 0,
        name: 'Betsy',
        face: 'img/thumb/logobl.png',
        messages: [
          {
            type: 'received',
            text: 'Hey! This is Betsy, the BadgerLoop\'s Pod',
            image: '',
            time: d.toLocaleTimeString()
          },
          {
            type: 'received',
            text: 'Is there something I can help you with?',
            image: '',
            time: d.toLocaleTimeString()
          }
        ]
      }
    ];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      addMsg: function(msg){
        var d = new Date();
        chats[0].messages.push(msg); //push input message
        $riffle.call("message", msg.text).then(function(result){
          chats[0].messages.push({
            'type': 'received',
            'text': result,
            'time': d.toLocaleTimeString()
          });
        });
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  })

  .factory('Posts', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var posts = [
      {
        id: 0,
        user_id: 2,
        name: 'Ben Sparrow',
        content: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so...',
        image: 'img/pizza.jpg',
        face: 'img/thumb/ben.png',
        time: 'Thursday 05:57 PM',
        liked: false,
        likeCount: 2,
        commentCount: 5,
        comments: [
          {
            id: 0,
            user_id: 2,
            name: 'Max Lynx',
            face: 'img/thumb/max.png',
            liked: false,
            likeCount: 2,
            time: 'Thursday 05:57 PM',
            content: 'A wonderful serenity has taken possession'
          },
          {
            id: 1,
            user_id: 2,
            name: 'Adam Bradleyson',
            face: 'img/thumb/adam.jpg',
            liked: true,
            likeCount: 1,
            time: 'Thursday 05:57 PM',
            content: 'I should buy a boat'
          },
          {
            id: 2,
            user_id: 2,
            name: 'Perry Governor',
            face: 'img/thumb/perry.png',
            liked: true,
            likeCount: 3,
            time: 'Thursday 05:57 PM',
            content: 'Look at my mukluks!'
          },
          {
            id: 3,
            user_id: 2,
            name: 'Ben Sparrow',
            face: 'img/thumb/ben.png',
            liked: true,
            likeCount: 1,
            time: 'Thursday 05:57 PM',
            content: 'You on your way?'
          }
        ]
      },
      {
        id: 1,
        user_id: 2,
        name: 'Max Lynx',
        content: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
        image: '',
        face: 'img/thumb/max.png',
        time: 'Thursday 05:59 PM',
        liked: true,
        likeCount: 2,
        commentCount: 7,
        comments: []
      },
      {
        id: 2,
        user_id: 2,
        name: 'Adam Bradleyson',
        content: 'Far far away, behind the word mountains.',
        image: 'img/burger.jpg',
        face: 'img/thumb/adam.jpg',
        time: 'Thursday 06:06 PM',
        liked: false,
        likeCount: 2,
        commentCount: 2,
        comments: []
      },
      {
        id: 3,
        user_id: 2,
        name: 'Perry Governor',
        content: 'There live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
        image: '',
        face: 'img/thumb/perry.png',
        time: 'Thursday 06:50 PM',
        liked: false,
        likeCount: 2,
        commentCount: 7,
        comments: []
      }
    ];

    return {
      all: function () {
        return posts;
      },
      remove: function (post) {
        posts.splice(posts.indexOf(post), 1);
      },
      get: function (postId) {
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
    var notifications = [
      {
        id: 1,
        type: 'liked',
        user_id: 2,
        name: 'Max Lynx',
        face: 'img/thumb/max.png',
        read: false,
        time: 'Just now'
      },
      {
        id: 2,
        type: 'commented',
        user_id: 2,
        name: 'Adam Bradleyson',
        face: 'img/thumb/adam.jpg',
        read: true,
        time: '3 minutes ago'
      },
      {
        id: 3,
        type: 'friend_request',
        user_id: 2,
        name: 'Perry Governor',
        face: 'img/thumb/perry.png',
        read: true,
        time: '5 minutes ago'
      },
      {
        id: 4,
        type: 'liked',
        user_id: 2,
        name: 'Ben Sparrow',
        face: 'img/thumb/ben.png',
        read: false,
        time: '6 minutes ago'
      },
      {
        id: 5,
        type: 'friend_request',
        user_id: 2,
        name: 'Perry Governor',
        face: 'img/thumb/perry.png',
        read: true,
        time: '5 minutes ago'
      },
      {
        id: 6,
        type: 'liked',
        user_id: 2,
        name: 'Ben Sparrow',
        face: 'img/thumb/ben.png',
        read: false,
        time: '6 minutes ago'
      }
    ];

    return {
      all: function() {
        return notifications
      }
    };

  })
  .factory('Contacts', function() {
    // Some fake testing data
    var contacts = [
      {
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/thumb/ben.png',
        group: 'Friend'
      },
      {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/thumb/max.png',
        group: 'Family'
      },
      {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/thumb/adam.jpg',
        group: 'Friend'
      },
      {

        d: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/thumb/perry.png',
        group: 'Friend'
      },
      {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/thumb/mike.png',
        group: 'Family'
      },
      {
        id: 5,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/thumb/ben.png',
        group: 'Friend'
      },
      {
        id: 6,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/thumb/max.png',
        group: 'Family'
      }
    ];

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
