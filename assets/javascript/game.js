$(document).ready(function () {

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

        var firstTime = childSnapshot.val().departure_time;
        console.log("firstTime=", firstTime);

        var tFrequency = childSnapshot.val().freq;
        console.log("tFrequency=", tFrequency);
        
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        var arrivalDisplay = tMinutesTillTrain;

        //Create the new row
        //var updateButton = $("<button>").html("Edit").addClass("updateButton").attr("data-index", index).attr("data-key", childSnapshot.key);
        var removeButton = $("<button>").html("Remove").addClass("removeButton").attr("data-index", index).attr("data-key", childSnapshot.key);
        var newRow = $('<tr scope="row">');
        newRow.addClass("row-" + index);
        newRow.append(
            $("<td>").text(child_name),
            $("<td>").text(child_destination),
            $("<td>").text(moment(firstTime, "hhmm").format('LT')),
            $("<td>").text(tFrequency),
            $("<td>").text(arrivalDisplay),
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

});