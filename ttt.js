/**
  We need to wait for the page to fully load before we can do anything with it.
  This jquery function does exactly that for us.
  
  We put our code inside this function callback in order to wait.
*/
$(document).ready(function(){
  // Decalare the variables we need
  var board = []; // this will be three rows of three cells (see html table)
  var players = ['x', 'o']; // our players
  var current = 0; // we use an index to lookup the player in our players var
  var msg = $('#msg'); // select the id #msg from the html (an element) - see html
  var whos_turn = $('#whos_turn'); // select the id #whos_turn from html (an element) - see html
  var total_moves = 0; // how many moves have been made in the game
  var game_over = false; // indicates if the game is over or in progress.

  // We want to populate our 'board' array defined above.
  $('tr').each(function(idx, row){ // select all 'tr' tags and do something with each one.
    // Select all the 'td' inside of the current 'tr'.
    // This returns a jquery array like object of all the td elements inside that row.
    // the .toArray converts it to a normal javascript array.
    var cells = $(row).find('td').toArray(); // we assign this array to 'cells'
    board.push( cells ); // push the array of cells for that row into our board array.
  });
  // this will result in board = [ [td, td, td], [td, td, td], [td, td, td]] (where td is the element in the page)

  // sanity, we want to make sure our game is in an expected state.
  reset(); // see the reset function below.

  // Setup our event listeners
  
  $('td').on('click', click); // listen for clicks on any cells in our tic-tac-toe board.
  $('#reset').on('click', reset); // listen for a click on the reset button.



  // If a click happens on a td element we do this.
  function click(){
    
    var el = $(this); // This gives up a jquery object of that 'td' element that was clicked.

    if(game_over) return; // if game_over is true then we need to exits. (reset needs to happen before we can go farther).

    // check to make sure that the square the user is clicking on is empty.
    // if it is not empty we need to stop and tell the user.
    if(el.text() !== '') return msg.text('already set'); 

    total_moves++; // if we made it here then the move is valid. We count the move.

    // in our current td element we need to mark it with the player piece.
    // we write a simple text value into the html element.
    // we lookup in our players array using the current variable as in index.
    // this would return the string value 'x' or 'o'
    el.text(players[current]); // write it to the element.

    // This updates which players turn it is. 
    if(current < players.length-1){ // if current player index is not the last player in our players array
      current++; // increment the current player index
    } else { // if it was the last index in the players array
      current = 0; // reset and go back to the first index
    }

    // we updates the current player index above. Now we need to communicate to the players whos turn it is.
    // we add 1 to the current index since arrays are based off a 0 index.
    // we right this into our whos_turn element.
    whos_turn.text('player ' + (current + 1)); // note: setting text like this overrides any previous values, it does not append.

    // since a play has happened we need to check to see if we have a winner.
    checkForWin(); // see the checkForWin function below.

    // Handle the edge case where there is no winner.
    // if there has been 9 moves and the game is not over then we need to end it.
    if(total_moves == 9 && game_over == false){
      game_over = true; // end the game.
      msg.text("game over. no moves left."); // communicate that there was a tie.
    }


  }


  function checkForWin(){

    // checks horizontal rows for a win
    board.forEach(checkAndMark);

    // check vertical rows for a win
    transpose(board).forEach(checkAndMark); // see transpose.

    // convert diangle matches to rows so we can easily compare them.
    var diangle1 = [board[0][0], board[1][1], board[2][2]];
    var diangle2 = [board[0][2], board[1][1], board[2][0]];

    checkAndMark(diangle1);
    checkAndMark(diangle2);

    // Regardless of horizontal, vertical or diangle we use this function
    // to check for a match and handle the match.
    // this simple function works because we made our data look the same for all scenerios.
    function checkAndMark(row){
      if(checkRow(row)) markRow(row); // if checkrow return true we need to mark the row using markRow function.
    }


  }
  
  
  // Takes an array of elements (in this case 3 td elements).
  // If all of the elements have the same value and are not blank we return true
  // else return false
  
  // It is important to note that checkRow does not care about what it is comparing.
  // This is why the diangle rows works with this function.
  function checkRow(row){
    // since the element is just that. We wrap it with jquery so it is easier to use.
    var cell1 = $(row[0]).text(); // we grab the text value out of the first td element.

    if( cell1 && // does the first cell have a text value. remember if it is blank '' this will evaluate as false
        cell1 === $(row[1]).text() && // we compare with the second td text value
        cell1 === $(row[2]).text()) { // and the third
          return true; // we have a match.
        }
    else {
      return false
    }
  }

  // Takes a single array of elements.
  function markRow(row){

    // loop over each element in the row.
    row.forEach(function(cell){ // assign each item in the row to the variable 'cell'
      $(cell).addClass('red'); // wrap the 'cell' element with jquery and add the html class attribute 'red'
    });

    // we need to figure out who the winner is.
    // we look into any one of the elements from the row that was passed into the function.
    var winner = $(row[0]).text(); // wrap with jquery and grab the text value of the element

    // display text to indicate the game is over and a player has won.
    // we use the 'text' value to find our player in the players array. This will return a zero (0) based index.
    // we add one to it.
    msg.text('player ' + ( players.indexOf(winner) + 1) + ' wins!'); // concatenate the string and display
    whos_turn.text(""); // game is over. no more turns. Clear this text in the html by setting it blank.
    game_over = true; // this will prevent any future clicks on the game board from doing anything (until reset).

  }

  // After we started to play a game or a game is over we need a way to restart.
  // reset does exactly that.
  function reset(){
    $('td').removeClass('red').text(''); // select all the td elements in the page. remove the html class 'red' and set the text in all cells to '' (empty).
    current = 0; // make sure the current player index is set to 0 (first player)
    msg.text(''); // clear all messages like "Player 1 won!"
    whos_turn.text('player ' + (current +1)); // communicate which players turn it is.
    game_over = false; // its a new game now, so the game is not over.
    total_moves = 0; // since we just cleared everything no moves have been made yet.
  }

  // Takes an array of arrays and returns an array of arrays.
  /**
    input: [['1', '2'],['1', '2']] output: [['1', '1'],['2', '2']]
    
    We use this to create 'vertical' rows. It looks at the matching index of each row and creates an array of those values
    
  */
  function transpose(rows){
    var board = [];
    for(var i = 0; i < rows[0].length; i++){
      var row = [rows[0][i]];
      for(var j = 1; j < rows.length; j++){
        row.push(rows[j][i]);
      }
      board.push(row);
    }
    return board;
  }

});
