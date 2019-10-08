$(document).ready(function(){

// Declare variables to store form data
var name, destination, departure = "";
var freq = 0;
var minAway = 0;
var index = 0;

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
    //console.log("childSnapshot=",childSnapshot);
    //Store submitted data into variable
    var child_name = childSnapshot.val().name;
    var child_destination = childSnapshot.val().destination;
    var child_departure = childSnapshot.val().departure_time;
    var child_freq = parseInt(childSnapshot.val().freq);
    var frequency = parseInt(child_freq);

    var currentTime = moment().format();
    console.log("Current time:",currentTime);

    /*var dateConvert = moment(childSnapshot.val().departure_time, "HHmm").subtract(1, "years");
    console.log("dateConvert=",dateConvert);

    var trainTime = moment(dateConvert).format("HHmm");
    console.log("trainTime=",trainTime);

    //difference bw the times
    var timeConvert = moment(trainTime, "HHmm").subtract(1, "years");
    console.log("timeConvert=",timeConvert);

    var timeDifference = moment().diff(moment(timeConvert), "minutes");
    console.log("timeDifference=",timeDifference);

    //remainder
    var timeRemaining = timeDifference % frequency;
    console.log("timeRemaining=",timeRemaining);

    //time until next train
    var timeAway = frequency - timeRemaining;
    console.log("timeAway=",timeAway);

    //next train arrival
    var nextArrival = moment().add(timeAway, "minutes");
    console.log("nextArrival=",nextArrival);

    var arrivalDisplay = moment(nextArrival).format("HHmm");
    console.log("arrivalDisplay=",arrivalDisplay);*/
    var currentTime = moment();
    var currentTimeCalc = moment().subtract(1, "years");
    var diffTime = moment().diff(moment(child_departure), "minutes");
    var tRemainder = diffTime%frequency;
    var minutesRemaining = frequency - tRemainder;
    var nextTRain = moment().add(minutesRemaining, "minutes").format ("hh:mm A");
    var beforeCalc = moment(child_departure).diff(currentTimeCalc, "minutes");
    var beforeMinutes = Math.ceil(moment.duration(beforeCalc).asMinutes());

    if ((currentTimeCalc - child_departure) < 0) {
      nextTrain = childSnapshot.val().child_departure;
      console.log("Before First Train");
      minutesRemaining = beforeMinutes;
    }
    else {
      nextTrain = moment().add(minutesRemaining, "minutes").format("hh:mm A");
      minutesRemaining = frequency - tRemainder;
      console.log("Working");
    }

    //Create the new row
    var updateButton = $("<button>").html("Edit").addClass("updateButton").attr("data-index", index).attr("data-key", childSnapshot.key);
    var removeButton = $("<button>").html("Remove").addClass("removeButton").attr("data-index", index).attr("data-key", childSnapshot.key);
    var newRow = $('<tr scope="row">');
    newRow.addClass("row-" + index);
    newRow.append(
        $("<td>").text(child_name),
        $("<td>").text(child_destination),
        $("<td>").text(moment(child_departure, "hhmm").format('LT')),
        $("<td>").text(child_freq),
        $("<td>").text(minutesRemaining),
        $("<td>").append(removeButton)
        //$("<td>").html("<button class='btn btn-secondary plus' id="+child_name+">+</button>"+"<button class='btn btn-secondary minus' onclick='deleteRow(this)'>-</button>")
    );
    // Append the new row to the table
    $("#schedule-table > tbody").append(newRow);
    index++;
});
//reset functionality
$(".resetInput").on("click", function (event) {
    location.reload();
});

//Remove a row
function removeRow() {
    $(".row-" + $(this).attr("data-index")).remove();
    dataRef.child($(this).attr("data-key")).remove();
}

//When 'Romove' button is clicked call method 'removeRow'
$(document).on("click", ".removeButton", removeRow);

//auto refresh per 1 minute passed
//updates the train data upon refresh
//setInterval(function(){"window.location.reload(1)"}, 60000);

});