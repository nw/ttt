'use strict';
var player1 = { active: true },
    player2 = { active: false },
    savedPieces = [],
    $board = $('table'),
    app = {
    init: function() {
        $board
            .on('click', 'td', app.placePiece);
    },
    
    placePiece: function(ev) {
        $(ev.target).html(player1.active ? 'X' : 'O');
        
        player1.active = !player1.active;
        player2.active = !player2.active;
    },
    
    updatePieces: function() {
        $board.each(function() {
            
};
 
$(function() {
    app.init();
});