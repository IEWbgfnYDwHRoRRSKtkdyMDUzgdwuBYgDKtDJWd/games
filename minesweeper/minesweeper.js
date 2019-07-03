function Cell( row, column, opened, flagged, mined, neighborMineCount ) 
{
	return {
		row: row,
		column: column,	
		opened: opened,
		flagged: flagged,
		mined: mined,
		neighborMineCount: neighborMineCount
	}
}

function Board( boardSize, mineCount )
{
	var board = {};
	for( var row = 0; row < boardSize; row++ )
	{
		for( var column = 0; column < boardSize; column++ )
		{
			board[row + "" + column] = Cell( row, column, false, false, false, 0 );
		}
	}
	board = randomlyAssignMines( board, mineCount );
	board = calculateNeighborMineCounts( board, boardSize );
	return board;
}


var initializeCells = function( boardSize ) 
{
	var row  = 0;
	var column = 0;
	$( ".cell" ).each( function(){
		$(this).attr( "id", row + "" + column );
		column++;
		if( column >= boardSize )
		{
			column = 0;
			row++;
		}

		$(this).off().click(function(e)
		{
		    alert('click'); // true or false
		});

		$(this).contextmenu(function(e)
		{
		    alert('right click'); // true or false
		    return false;
		});
	})
}

var randomlyAssignMines = function( board, mineCount )
{
	var mineCooridinates = [];
	for( var i = 0; i < mines; i++ )
	{
		var randomRowCoordinate = getRandomInteger( 0, boardSize );
		var randomColumnCoordinate = getRandomInteger( 0, boardSize );
		var cell = randomRowCoordinate + "" + randomColumnCoordinate;
		while( mineCooridinates.includes( cell ) )
		{
			randomRowCoordinate = getRandomInteger( 0, boardSize );
			randomColumnCoordinate = getRandomInteger( 0, boardSize );
			cell = randomRowCoordinate + "" + randomColumnCoordinate;
		}
		mineCooridinates.push( cell );
		board[cell].mined = true;
	}
	return board;
}

var calculateNeighborMineCounts = function( board, boardSize )
{
	var cell;
	var neighborMineCount = 0;
	for( var row = 0; row < boardSize; row++ )
	{
		for( var column = 0; column < boardSize; column++ )
		{
			cell = board[row + "" + column];
			if( !cell.mined )
			{
				neighborMineCount = 0;
				neighborMineCount += isMined( board, row - 1, column - 1 );
				neighborMineCount += isMined( board, row - 1, column );
				neighborMineCount += isMined( board, row - 1, column + 1 );
				neighborMineCount += isMined( board, row, column - 1 );
				neighborMineCount += isMined( board, row, column + 1 );
				neighborMineCount += isMined( board, row + 1, column - 1 );
				neighborMineCount += isMined( board, row + 1, column );
				neighborMineCount += isMined( board, row + 1, column + 1 );
				cell.neighborMineCount = neighborMineCount;
			}
		}
	}
	return board;
}

var isMined = function( board, row, column )
{	
	var cell = board[row + "" + column];
	var mined = 0;
	if( typeof cell !== 'undefined' )
	{
		mined = cell.mined ? 1 : 0;
	}
	return mined;
}

var getRandomInteger = function( min, max )
{
	return Math.floor( Math.random() * ( max - min ) ) + min;
}

var boardSize = 10;
var mines = 10;
initializeCells( boardSize );
var board = Board( boardSize, mines );