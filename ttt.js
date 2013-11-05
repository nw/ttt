'use strict';
var player1 = { active: true },
    player2 = { active: false },
    savedPieces = [[],[],[]],
    $board = $('table'),
    
    app = {
    init: function() {
        $board
            .on('click', 'td', app.placePiece);
    },
    
    placePiece: function(ev) {
        var $target = $(ev.target);
        
        if($target.html() === '') {
            $(ev.target).html(player1.active ? 'X' : 'O');
        
            app.updatePieces();
            player1.active = !player1.active;
            player2.active = !player2.active;
        }
    },
    
    updatePieces: function() {
        $('tr').each(function(i) {
            $(this).find('td').each(function(i2) {
                savedPieces[i][i2] = $(this).html();
            });
        });
    },
    
    clearPieces: function() {
        $('td').each(function() {
            $(this).html('');
        });
    }          
};
 
$(function() {
    app.init();
});