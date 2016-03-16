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
            text: 'Hey! This is Betsy, the BadgerLoop Pod',
            image: '',
            time: d.toLocaleTimeString(),
            read: false
        }, {
            type: 'received',
            text: 'Click on the info button to see what you can ask me!',
            image: '',
            time: d.toLocaleTimeString(),
            read: false
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
                    'time': d.toLocaleTimeString(),
                    'read': false
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
        },
        getNumUnread: function() {
        var num_unread = 0;
         for (var i = 0; i < chats[0].messages.length; i++) {
                if (chats[0].messages[i].read == false) {
                    num_unread++;
                }
            }
            return num_unread;
        },
        markAllRead: function() {
         for (var i = 0; i < chats[0].messages.length; i++) {
                chats[0].messages[i].read = true;
            }
            return null;
        }
    };
})

.factory('PhotoService', function($http, $q) {
    var BASE_URL = "https://api.instagram.com/v1/tags/badgerloop/media/recent?client_id=f4eb26f36e924426b533c1c9e57867a9&callback=JSON_CALLBACK";
    var items = [];
    var nextUrl = 0;  // next max tag id - for fetching older photos
    var NewInsta = 0; // min tag id - for fetching newer photos

    return {
      GetFeed: function() {
        return $http.jsonp(BASE_URL).then(function(response) {

          items = response.data.data;
          nextUrl = response.data.pagination.next_max_tag_id;
          NewInsta = response.data.pagination.min_tag_id;
          console.log(nextUrl, NewInsta);

          return items;

        });
      },
      GetNewPhotos: function() {
        return $http.jsonp(BASE_URL + '&min_tag_id=' + NewInsta).then(function(response) {

          items = response.data.data;
          if(response.data.data.length > 0){
            NewInsta = response.data.pagination.min_tag_id;
          }

          return items;

        });
      },
      
      /**
       * Always returns a promise object. If there is a nextUrl, 
       * the promise object will resolve with new instragram results, 
       * otherwise it will always be resolved with [].
       **/
      GetOldPhotos: function() {
        if (typeof nextUrl != "undefined") {
          return $http.jsonp(BASE_URL + '&max_tag_id=' + nextUrl).then(function(response) {
  
            if(response.data.data.length > 0){
              nextUrl = response.data.pagination.next_max_tag_id;
            }
            
            items = response.data.data;
  
  
            return items;
  
          });
        } else {
          var deferred = $q.defer();
          deferred.resolve([]);
          return deferred.promise;
        }
      }
  }
      
})

.factory('Posts', function($http, $q) {
    // Might use a resource here that returns a JSON array

    var posts = [];

    return {
        all: function() {
            return $http.get('js/data/posts.json').then(function(response) {
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

.factory('Contacts', function() {
    // Some fake testing data
    var contacts = [{
        id: 0,
        name: 'Alex Ballister',
        lastText: '',
        face: 'img/team/Alex.jpg',
        group: 'Safety Lead',
        link: null
    }, {
        id: 1,
        name: 'Austin Jeffries',
        lastText: '',
        face: 'img/team/Austin.jpg',
        group: 'Mechanical Lead',
        link: null
    }, {
        id: 2,
        name: 'Bill Carpenter',
        lastText: '',
        face: 'img/team/Bill.jpg',
        group: 'Levitation Lead',
        link: null
    }, {
        id: 3,
        name: 'Brett Sjorstrom',
        lastText: '',
        face: 'img/team/Brett.jpg',
        group: 'Co-President',
        link: null
    }, {
        id: 4,
        name: 'Chase Roossin',
        lastText: '',
        face: 'img/team/Chase_Roossin_Professional_Photo_SmallerCopy.jpeg',
        group: 'Software Lead',
        link: null
    }, {
        id: 5,
        name: 'Patrick Cummings',
        lastText: '',
        face: 'img/team/cummings.png',
        group: 'Project Management',
        link: null
    }, {
        id: 6,
        name: 'David Van Veen',
        lastText: '',
        face: 'img/team/Dave.jpg',
        group: 'Operations Director',
        link: null
    }, {
        id: 7,
        name: 'Michael Dircz',
        lastText: '',
        face: 'img/team/dircz.jpg',
        group: 'Marketing Lead',
        link: null
    }, {
        id: 8,
        name: 'Duncan Adams',
        lastText: '',
        face: 'img/team/Duncan.jpg',
        group: 'Technical Director',
        link: null
    }, {
        id: 9,
        name: 'Eric Amikam',
        lastText: '',
        face: 'img/team/Eric.jpg',
        group: 'Electrical Lead',
        link: null
    }, {
        id: 10,
        name: 'Evan Bauch',
        lastText: '',
        face: 'img/team/Evan.jpg',
        group: 'Mechanical Team',
        link: null
    }, {
        id: 11,
        name: 'Alec Fischer',
        lastText: '',
        face: 'img/team/fisher.png',
        group: 'Dynamic Modeling Lead',
        link: null
    }, {
        id: 12,
        name: 'James Olson',
        lastText: '',
        face: 'img/team/James.jpg',
        group: 'Financial Director',
        link: null
    }, {
        id: 13,
        name: 'Johnnie Wagman',
        lastText: '',
        face: 'img/team/Johnnie.jpg',
        group: 'Team Coordinator',
        link: null
    }, {
        id: 14,
        name: 'Michael Knippen',
        lastText: '',
        face: 'img/team/Michael.jpg',
        group: 'Project Management',
        link: null
    }, {
        id: 15,
        name: 'Seth Rueter',
        lastText: '',
        face: 'img/team/rueter.jpg',
        group: 'Braking Lead',
        link: null
    }, {
        id: 16,
        name: 'Brandon Schadrie',
        lastText: '',
        face: 'img/team/schadrie.jpg',
        group: 'Mechanical Team',
        link: null
    }, {
        id: 16,
        name: 'Eric Schirtzinger',
        lastText: '',
        face: 'img/team/schirtzinger.jpg',
        group: 'Media Lead',
        link: null
    }, {
        id: 17,
        name: 'Jayce Schmidtknecht',
        lastText: '',
        face: 'img/team/schmidtknecht.jpg',
        group: 'Fabrication Co-Lead',
        link: null
    }, {
        id: 18,
        name: 'Sid Smith',
        lastText: '',
        face: 'img/team/Sid.jpg',
        group: 'Industry Relations',
        link: null
    }, {
        id: 19,
        name: 'Tieler Callazo',
        lastText: '',
        face: 'img/team/Tieler.jpg',
        group: 'Co-President',
        link: null
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
