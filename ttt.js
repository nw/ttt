$(function(){
  
  var table = $('table');
  var board = [];

  createTable(table);

  

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


})


function times(count, fn){
  for(var i = 0; i < count; i++) fn(i);
}