$(document).ready(function(){

var Game = {

	initialize: function(){
		Game.cardLength = 4;
		Game.card = {};
		Game.pair = [];
		Game.cardsList = Game.getCardList();
		Game.shuffleCards();
		Game.startGame();
	},

	generateBoard: function(){
		var grid = [];
		for (var i = 0; i < Game.cardLength; i++){
			var row = [];
			for (var j = 0; j < Game.cardLength; j++){
				var card = {
					position: [i, j],
					front: "MONKEY!!!",
					back: Game.getCard(),
					flipped: false
				}
				row.push(card);
			};
			grid.push(row);	
		};
		Game.board = grid;
		return grid;
	},

	printBoard: function(){
		var grid = Game.board;

		var gameWindow = document.getElementsByClassName('game-window')[0];
		
		for (var i = 0; i < grid.length; i++){
			var row = document.createElement('div');
			row.className = 'row'

			for (var j = 0; j < grid.length; j++){
				var card = document.createElement('div');
				card.className = grid[i][j].flipped ? 'card flipped' : 'card unflipped';
				card.xPos = j;
				card.yPos = i;

				var front = document.createElement('div');
				front.className = 'front';
				front.innerHTML = grid[i][j].front

				var back = document.createElement('div');
				back.className = 'back';
				back.innerHTML = grid[i][j].back

				card.appendChild(front);
				card.appendChild(back);
				row.appendChild(card);
			}

		gameWindow.appendChild(row);
		}
	},

	getCardList: function(){
		var cards = [];
		// var get = $.ajax({
 	// 			url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=10',
  // 				type: 'GET',
  // 				dataType: 'json',
  // 				success: function(data){
  //   				for (e in data){
  //   					cards.push(data[e].quote);
  //   				}
		// 		Game.cardsList = cards;
		// 		Game.shuffleCards();
		// 		Game.startGame();
  // 				},
  // 				error: function(err) {
  //   				console.log(err)
  // 				},
  // 				beforeSend: function(xhr) {
  //   				xhr.setRequestHeader("X-Mashape-Authorization", "KrCNQkmqjjmshkLXQpxX0GsjXJAZp15JW8cjsnWbYZAvIO19Zm"); 
  //   			}
  //   		});
		for (var i = 0; i < ((Game.cardLength * Game.cardLength)/2); i++){
			cards.push(i);
			cards.push(i);
		}
		return cards;
	},

	shuffleCards: function(){
		//Durstenfeld Shuffle
		for (var i = Game.cardsList.length - 1; i > 0; i--){
			var j = Math.floor(Math.random() * (i+1));
			var temp = Game.cardsList[i]
			Game.cardsList[i] = Game.cardsList[j];
			Game.cardsList[j] = temp;
		}
		return;
	},

	getCard: function(){
		return Game.cardsList.pop();
	},

	startGame: function(){
		Game.board = Game.generateBoard();
		Game.printBoard();
	},

	checkMatch: function(){

	},

	unflipCards: function(){		
		for (card in Game.pair){
			Game.pair[card].className = 'card unflipped';
		}
		Game.pair = [];
	},

	initEvents: function(){
		console.log("EVENTS INITIALIZED");
		var flips = 0;
		var lastCard;
		var clickDisabled = false;
		$('.card').click(function( event ){
			var currentCard = Game.board[event.currentTarget.yPos][event.currentTarget.xPos];
			Game.pair.push(event.currentTarget);
			if (clickDisabled)
				return;
			if (event.currentTarget.className == 'card unflipped'){
					currentCard.flipped = true;
					event.currentTarget.className = 'card flipped'
					flips++;
					if (flips != 2){
						lastCard = currentCard
					}
					if (flips == 2) {
						if (currentCard.back == lastCard.back){
							console.log("MATCH!");
							flips = 0;
							Game.pair = [];
						} else {
							console.log("NO MATCH");
							flips = 0;
							clickDisabled = true;
							setTimeout(function() { 
								Game.unflipCards();
								clickDisabled = false;
							}, 2000);
						}
					}
				}

		});	
	
	}
}

Game.initialize();
Game.initEvents();
});