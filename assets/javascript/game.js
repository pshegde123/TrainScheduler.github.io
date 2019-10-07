// Declare variables to store form data
var name, destination, departure = "";
var freq = 0;
var minAway = 0;

//Validate form inputs
bootstrapValidate("#train-name", "required:Please fill out this field!");
bootstrapValidate("#train-destination", "required:Please fill out this field!");
bootstrapValidate("#train-time", "required:Please fill out this field!");
bootstrapValidate("#train-freq", "required:Please fill out this field!");

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

function saveTrainData() {

    var trname = $("#train-name").val().trim();
    var trdestination = $("#train-destination").val().trim();
    var trdeparture_time = $("#train-time").val().trim();
    var trfreq = $("#train-freq").val().trim();

    dataRef.push({
        name: trname,
        destination: trdestination,
        departure_time: trdeparture_time,
        freq: trfreq
    });

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("_ _ _ _ ");
    $("#train-freq").val("");
}

$("#submit").on("click", function (event) {
    event.preventDefault();
    saveTrainData();
});

dataRef.on("child_added", function (childSnapshot) {
    console.log("childSnapshot=",childSnapshot);
    //Store submitted data into variable
    var child_name = childSnapshot.val().name;
    var child_destination = childSnapshot.val().destination;
    var child_departure = childSnapshot.val().departure_time;
    
    console.log("Departure=",child_departure);

    var child_freq = parseInt(childSnapshot.val().freq);
    var frequency = parseInt(child_freq);
    
    console.log("frequency=",frequency);
    
    var child_minAway = 0;
    var currentTime = moment();
    var dateConvert = moment(childSnapshot.val().time, "HHmm").subtract(1, "years");

    var trainTime = moment(dateConvert).format("HHmm");

    //difference bw the times
    var timeConvert = moment(trainTime, "HHmm").subtract(1, "years");
    var timeDifference = moment().diff(moment(timeConvert), "minutes");

    //remainder
    var timeRemaining = timeDifference % frequency;

    //time until next train
    var timeAway = frequency - timeRemaining;

    //next train arrival
    var nextArrival = moment().add(timeAway, "minutes");

    var arrivalDisplay = moment(nextArrival).format("HHmm");

    //Create the new row
    var newRow = $('<tr scope="row">').append(
        $("<td>").text(child_name),
        $("<td>").text(child_destination),
        $("<td>").text(moment(child_departure,"hhmm").format('LT')),
        $("<td>").text(child_freq),
        $("<td>").text(arrivalDisplay)
    );
    // Append the new row to the table
    $("#schedule-table > tbody").append(newRow);
});
	//reset functionality
	$(".resetInput").on("click", function(event){
    	location.reload();
	});
