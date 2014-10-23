
$(document).ready(function(){

  var board = []; // three rows of three
  var players = ['x', 'o'];
  var current = 0;
  var msg = $('#msg'); // TODO this will be where we insert game message
  var whos_turn = $('#whos_turn'); // TODO displays which players turn it is
  var total_moves = 0;
  var game_over = false;

  $('tr').each(function(idx, row){
    board.push( $(row).find('td').toArray() );
  });

  reset();

  $('td').on('click', click);
  $('#reset').on('click', reset);

  function click(){
    var el = $(this);

    if(game_over) return;

    if(el.text() !== '') return msg.text('already set');

    total_moves++;

    el.text(players[current]);

    if(current < players.length-1){
      current++;
    } else {
      current = 0;
    }

    whos_turn.text('player ' + (current + 1));

    checkForWin();

    if(total_moves == 9 && game_over == false){
      game_over = true;
      msg.text("game over. no moves left.");
    }


  }


  function checkForWin(){

    // checks horizontal rows for a win
    board.forEach(checkAndMark);

    // check vertical rows for a win
    transpose(board).forEach(checkAndMark);

    var diangle1 = [board[0][0], board[1][1], board[2][2]];
    var diangle2 = [board[0][2], board[1][1], board[2][0]];

    checkAndMark(diangle1);
    checkAndMark(diangle2);

    function checkAndMark(row){
      if(checkRow(row)) markRow(row);
    }


  }

  function markRow(row){

    row.forEach(function(cell){
      $(cell).addClass('red');
    });

    var winner = $(row[0]).text();

    msg.text('player ' + ( players.indexOf(winner) + 1) + ' wins!');
    whos_turn.text("");
    game_over = true;

  }

  function checkRow(row){
    var cell1 = $(row[0]).text();

    if( cell1 &&
        cell1 === $(row[1]).text() &&
        cell1 === $(row[2]).text()) {
          return true;
        }
    else {
      return false
    }
  }

  function reset(){
    $('td').removeClass('red').text('');
    current = 0;
    msg.text('');
    whos_turn.text('player ' + (current +1));
    game_over = false;
    total_moves = 0;
  }


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
