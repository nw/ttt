'use strict';
var player1 = { active: true, win: false },
    player2 = { active: false, win: false },
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
            app.check.allConditions();
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
        
        app.updatePieces();
        player1.active = true;
        player1.active = false;
    },
    
    check: {
        winCondition: function(piece, params) {
            return ( (savedPieces[params.p1x][params.p1y] === piece) && (savedPieces[params.p2x][params.p2y] === piece) && (savedPieces[params.p3x][params.p3y] === piece) );
        },
        
        horizontal: function(piece) {
            var params = [ {p1x:0, p1y:0, p2x:0, p2y:1, p3x:0, p3y:2}, {p1x:1, p1y:0, p2x:1, p2y:1, p3x:1, p3y:2}, {p1x:2, p1y:0, p2x:2, p2y:1, p3x:2, p3y:2} ];
            return ( app.check.winCondition(piece, params[0]) || app.check.winCondition(piece, params[1]) || app.check.winCondition(piece, params[2]) );
        },
        
        vertical: function(piece) {
            var params = [ {p1x:0, p1y:0, p2x:1, p2y:0, p3x:2, p3y:0}, {p1x:0, p1y:1, p2x:1, p2y:1, p3x:2, p3y:1}, {p1x:0, p1y:2, p2x:1, p2y:2, p3x:2, p3y:2} ];
            return ( app.check.winCondition(piece, params[0]) || app.check.winCondition(piece, params[1]) || app.check.winCondition(piece, params[2]) );
        },
        
        diagonal: function(piece) {
            var params = [ {p1x:0, p1y:0, p2x:1, p2y:1, p3x:2, p3y:2}, {p1x:0, p1y:2, p2x:1, p2y:1, p3x:2, p3y:0} ];
            return ( app.check.winCondition(piece, params[0]) || app.check.winCondition(piece, params[1]) );
        },
        
        allConditions: function() {
            player1.win = (app.check.horizontal('X') || app.check.vertical('X') || app.check.diagonal('X'));
            player2.win = (app.check.horizontal('O') || app.check.vertical('O') || app.check.diagonal('O'));
        
            if(player1.win || player2.win) {
                alert(player1.win ? 'Player 1 Wins!' : 'Player 2 Wins!');
                app.clearPieces();
            }
        }
    }
};
 
$(function() {
    app.init();
});