//var train_data = {
var name, destination, departure = "";
var freq = 0;
var minAway=0;
//};

//Validate form inputs
bootstrapValidate("#train-name","required:Please fill out this field!");
bootstrapValidate("#train-destination","required:Please fill out this field!");
bootstrapValidate("#train-time","required:Please fill out this field!");
bootstrapValidate("#train-freq","required:Please fill out this field!");    

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBjEKkbNqPZTBx5v-ek11nB0SE-f4fIZdg",
    authDomain: "traindata-8d85f.firebaseapp.com",
    databaseURL: "https://traindata-8d85f.firebaseio.com",
    projectId: "traindata-8d85f",
    storageBucket: "",
    messagingSenderId: "38397374657",
    appId: "1:38397374657:web:e330e6c523bdfa1bec2440"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
database = firebase.database();
var dataRef = database.ref();
console.log("dataRef=", dataRef);

function saveTrainData() {

    var trname = $("#train-name").val().trim();
    var trdestination = $("#train-destination").val().trim();
    var trdeparture_time = $("#train-time").val();
    var trfreq = $("#train-freq").val().trim();
    var minAway = 0;
    dataRef.push({
        name: trname,
        destination: trdestination,
        departure_time: trdeparture_time,
        freq: trfreq,
        minAway:minAway
    });

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("_ _ :_ _ _ _");
    $("#train-freq").val("");
}

$("#submit").on("click", function (event) {
    event.preventDefault();
    saveTrainData();
});

dataRef.on("child_added", function (childsnapshot) {

    //Store submitted data into variable
    var child_name = childsnapshot.val().name;
    var child_destination = childsnapshot.val().destination;
    var child_departure = childsnapshot.val().departure_time;
    var child_freq = childsnapshot.val().freq;
    var child_minAway = 0;
    //Create the new row
    var newRow = $('<tr scope="row">').append(
        $("<td>").text(child_name),
        $("<td>").text(child_destination),
        $("<td>").text(child_departure),
        $("<td>").text(child_freq),
        $("<td>").text(child_minAway)
    );

    // Append the new row to the table
    $("#schedule-table > tbody").append(newRow);
});