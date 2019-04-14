// when the page is done loading, apply click handlers
$(document).ready(function() {
  // host-join button takes in #game-id value and appends it to the route
  $("#host-join").on("click", function() {
    //capturing the entered id
    let gameId = $("#game-id").val().trim();

    // get request for an /arena/ game of the entered id
    $.get("/arena/" + gameId, function(data, status) {
      console.log("Connecting to game...",data,status);
    });
  });

  // host-create button routes to api/arena and creates a new game
  $("#host-create").on("click", function() {
    //get request to randomly generate an ID
    $.get("/arena/:gameid", function(data, status) {
      console.log("Hosting game...",data,status);
    });
  });
  
});
