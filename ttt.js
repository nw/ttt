$(document).ready(function(){

  var board = [];
  var players = [ 'x', 'o' ];
  var current = 0;
  var msg = $('#msg');
  var whos_turn = $('#whos_turn');
  var game_over = false;

  $('tr').each(function(){
    board.push($(this).find('td').toArray());
  });

  reset();

  $('td').on('click', click);
  $('#reset').on('click', reset);
  
  function click(){
    var el = $(this);
  
    if(game_over) return;
  
    if(el.text() !== '') return msg.text('already set');
    
    msg.text("");
  
    el.text(players[current]);
  
    current = (current < players.length-1) ? current + 1 : 0;
  
    whos_turn.text('player '+ (current+1));
  
    checkForWin();
    checkForNoMoreMoves();
  }

   function checkForNoMoreMoves(){
       if(game_over) return;
       already_played = 0;
       $('td').each(function(){
           if($(this).text()) already_played++;
       });

       if(already_played === 9){
           game_over = true;
           msg.text("game over. no moves left");
       }

   }

  function checkForWin(){ 
    // horizontal rows
    board.forEach(function(row){
      if(checkRow(row)) markRow(row);
    });
    
    // verticals
    transpose(board).forEach(function(row){
      if(checkRow(row)) markRow(row);
    });
    
    var diangle1 = [board[0][0], board[1][1], board[2][2] ];
    var diangle2 = [board[0][2], board[1][1], board[2][0] ];
    
    if(checkRow(diangle1)) markRow(diangle1);
    if(checkRow(diangle2)) markRow(diangle2);
    
  }
  
  function checkRow(row){
    var matches = 0
      , val = $(row[0]).text();
    row.forEach(function(cell){
      if($(cell).text() === val) matches++;
    });
    
    return (matches === 3 && val);
  }
  
  function markRow(row){
    row.forEach(function(cell){
      $(cell).addClass('red');
    });
    
    msg.text('player ' + ( players.indexOf(row[0].innerText) + 1 ) + ' wins!' );
    whos_turn.text("");
    game_over = true;
  }
  
  function transpose(rows){
    var board = [];
    for(var i = 0; i < rows[0].length; i++){
      var row = [rows[0][i]];
      for(var j = 1; j < rows.length; j++ ){
        row.push(rows[j][i]);
      }
      board.push(row);
    }
    return board;
  }
  
  
  function reset(){
    $('td').removeClass('red').text('');
    current = 0;
    msg.text('');
    whos_turn.text('player '+ (current+1));
    game_over = false;
  }

});

