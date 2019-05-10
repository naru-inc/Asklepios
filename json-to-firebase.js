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
        "id": (i+1).toString(),
        "name":names[i],
        "age": Math.floor(Math.random() * 45) + 55,
        "sex":sex[Math.floor(Math.random() * 2) + 0]
    }
  }

  function random(){

    var valeurs = [];

    for (var i=0; i <=23; i++) {
        var rand = Math.floor(Math.random() * 10) + 0;
        valeurs[i]=rand;
    }
    return valeurs;

  }


  function SingleRandomDate() {
    end =new Date();
    start = end.setDate(end.getDate() - 1);

    startHour=0;
    endHour=23;
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  console.log(date);
  return date;
}

function generateDates(){
var valeurs = [];

for (var i=0; i <=23; i++) {
    valeurs[i]=SingleRandomDate();
}
return valeurs;
}





 patient.forEach(function(obj) {
    db.collection("Patient").add({
        id:obj.id,
        name: obj.name,
        age: obj.age,
        sex:obj.sex
    }).then(function(docRef) {
        db.collection('Patient').doc(docRef.id).collection('Symptom').add({
            pain: random(),
            painTime:generateDates(),
            fatigue: random(),
            fatigueTime:generateDates(),
            nausea: random(),
            nauseaTime:generateDates(),
            dizziness: random(),
            dizzinessTime:generateDates(),
        });
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});
