// when the page is done loading, apply click handlers
$(document).ready(function() {
  // host-join button takes in #game-id value and appends it to the route
  $("#host-join").on("click", function() {
    //capturing the entered id
    let gameId = $("#game-id")
      .val()
      .trim();
    if (gameId) {
      window.location = `/arena/${gameId}`;
    } else {
      window.location = "/lobby";
    }
  });

  // host-create button routes to api/arena and creates a new game
  $("#host-create").on("click", function() {
    //get request to randomly generate an ID
    let gameId = Math.floor(Math.random() * 10000000000);
    window.location = `/arena/${gameId}`;
  });
});
