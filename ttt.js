$(function(){
  
  var table = $('table');
  var board = [];
  var players = [ 'x', 'o' ];
  var current = 0;
  var msg = $('#msg');
  var whos_turn = $('#whos_turn');

  createTable(table);
  reset();

  $('td').on('click', function(){
    var el = $(this);
    
    if(el.text() !== '') return msg.text('already set');
    
    el.text(players[current]);
    
    current = (current < players.length-1) ? current + 1 : 0;
    
    whos_turn.text('player '+ (current+1));
    
  });
  
  $('#reset').on('click', reset);

  function createTable(el){
    times(3, function(ridx){
      var row = [];
      var tr = $("<tr>");
      
      times(3, function(cidx){
      
        var col = {
          el: $('<td>'),
          idx: cidx,
          val: null
        };
        
        tr.append(col.el);
        row.push(col);
        
      });
    
      el.append(tr);
      board.push(row);
    });
    
  }
  
  function reset(){
      $('td').text('');
      current = 0;
      msg.text('');
      whos_turn.text('player '+ (current+1));
    }


})


function times(count, fn){
  for(var i = 0; i < count; i++) fn(i);
}