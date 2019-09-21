// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD-n420r0NQWndnyzzPEtdjT-TgDTCSPik",
  authDomain: "progect-two.firebaseapp.com",
  databaseURL: "https://progect-two.firebaseio.com",
  projectId: "progect-two",
  storageBucket: "",
  messagingSenderId: "101712574560",
  appId: "1:101712574560:web:ad9081b8cf53884a8b6b05"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var name = "";
  var destination = "";
  var firstTrain ;
  var frequency = 1;

  $("#add-train").on("click", function(event) {
        // Don't refresh the page!
        event.preventDefault();

        // YOUR TASK!!!
        // Code in the logic for storing and retrieving the most recent user.
        // Don't forget to provide initial data to your Firebase database.
        name = $("#train-name").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrain = $("#first-train").val().trim();
        frequency = $("#frequency-input").val().trim();

        database.ref().push({
          name: name,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset();
      });

      // Firebase watcher + initial loader HINT: .on("value")
      database.ref().on("child_added", function(childSnapshot) {
      
      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val());
      var firstTrain = "03:30";

      // Chang year so first train comes before now
      var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
      // Difference between the current and firstTrain
      var diffTime = moment().diff(moment(firstTrainNew), "minutes");
      var remainder = diffTime % childSnapshot.val().frequency;
      // Minutes until next train
      var minAway = childSnapshot.val().frequency - remainder;
      // Next train time
      var nextTrain = moment().add(minAway, "minutes");
      nextTrain = moment(nextTrain).format('LT');
    
      $("#train-table").append("<tr><th>" + childSnapshot.val().name +
              "</th><th>" + childSnapshot.val().destination +
              "</th><th>" + childSnapshot.val().frequency +
              "</th><th>" + nextTrain + 
              "</th><th>" + minAway + "</th></tr>");
      // Handle the errors
      }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
      });
