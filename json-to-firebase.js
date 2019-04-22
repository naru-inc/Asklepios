const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyBEytp47XOhxHHKSn5qQhyfEElIkI3GW18',
    authDomain: 'asklepios-189516.firebaseapp.com',
    projectId: 'asklepios-189516',
});
  
var db = firebase.firestore();

var sex=["M","F"]
var names=["Hang Lemoine",  
    "Ai Applin",  
    "Lelia Chestnut",  
    "Evelynn Thormahlen",  
    "Shin Campanella",  
    "Billy Schroder",  
    "Sid Raiford",  
    "Delbert Thrash",  
    "Joannie Thorp",  
    "Estrella Roundtree",  
    "Cassy Galante",  
    "Geralyn Marcus",  
    "Shannon Polin",  
    "Zulma Jagger",  
    "Particia Jines",  
    "Gavin Tetzlaff",  
    "Milan Prevatte",  
    "Eleonore Bertone",  
    "Charmaine Capasso",  
    "Bess Espitia"  ];

    var patient=[];
for (var i = 0; i < names.length; i++) {
    patient[i]={
        "id": i+1,
        "name":names[i],
        "age": Math.floor(Math.random() * 45) + 55,
        "sex":sex[Math.floor(Math.random() * 2) + 0]
    }
  }


 patient.forEach(function(obj) {
    db.collection("Patient").add({
        id:obj.id,
        name: obj.name,
        age: obj.age,
        sex:obj.sex
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});