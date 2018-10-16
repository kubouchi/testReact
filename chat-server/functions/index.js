const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Functions and Admin SDK modules import
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Express modules import
const express = require('express');
const app = express();

// CORS modules import / load
const cors = require('cors')({origin: true});
app.use(cors);

// ユーザ情報取得
const anonymousUser = {
  id: "anon",
  name: "Anonymous",
  avatar: ""
};
const checkUser = (req, res, next) => {
  req.user = anonymousUser;
  if (req.query.auth_token !== undefined) {
    let idToken = req.query.auth_token;
    admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
      let authUser = {
        id: decodedIdToken.user_id,
        name: decodedIdToken.name,
        avatar: decodedIdToken.picture
      };
      req.user = authUser;
      next();
    }).catch(error => {
      next();
    });
  } else {
    next();
  };
};
app.use(checkUser);

// チャンネル作成
function createChannel(cname) {
  let channelsRef = admin.database().ref('channels');　// 特定のノード参照は .ref()
  let date1 = new Date();
  let date2 = new Date();
  date2.setSeconds(date2.getSeconds() + 1);
  const defaultData = `{
    "messages" : {
      "1" : {
        "body" : "Welcome to #${cname} channel!",
        "date" : "${date1.toJSON()}",
        "user" : {
          "avatar" : "",
          "id" : "robot",
          "name" : "Robot"
        }
      },
      "2" : {
        "body" : "はじめてのメッセージを投稿してみましょう。",
        "date" : "${date2.toJSON()}",
        "user" : {
          "avatar" : "",
          "id" : "robot",
          "name" : "Robot"
        }
      } 
    }
  }`;
  channelsRef.child(cname).set(JSON.parse(defaultData));
}

/*
** Post Channel Data API（post）
** チャンネル作成
*/ 
app.post('/channels', (req, res) => {
  let cname = req.body.cname;
  createChannel(cname);

  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).json({result: 'ok'});
});

/*
** Get Channel API（get）
** チャンネル取得
*/
app.get('/channels', (req, res) => {
  let channelsRef = admin.database().ref('channels');
  channelsRef.once('value', function(snapshot) {
    let items = new Array();
    snapshot.forEach(function(childSnapshot) {
      let cname = childSnapshot.key;
      items.push(cname);
    });

    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send({channels: items});
  });
});

/*
** Add Message API（post）
** メッセージ追加
*/
app.post('/channels/:cname/messages', (req, res) => {
  let cname = req.params.cname;
  let message = {
    date: new Date().toJSON(),
    body: req.body.body,
    user: req.user
  };
  let messagesRef = admin.database().ref(`channels/${cname}/messages`);
  messagesRef.push(message);
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).send({result: "ok"});
});

/*
** Get Message List API（get）
** メッセージ一覧取得
*/
app.get('/channels/:cname/messages', (req, res) => {
  let cname = req.params.cname;
  let messagesRef = admin.database().ref(`channels/${cname}/messages`).orderByChild('date').limitToLast(20);
  messagesRef.once('value', function(snapshot) {
    let items = new Array();
    snapshot.forEach(function(childSnapshot) {
      let message = childSnapshot.val();
      message.id = childSnapshot.key;
      items.push(message);
    });
    items.reverse();
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send({messages: items});
  });
});

/*
** 初期状態 API（post）
*/
app.post('/reset', (req, res) => {
  createChannel('general');
  createChannel('random');
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).send({result: "ok"});
});

exports.v1 = functions.https.onRequest(app);