var hangmanGame = {

	// variables
	wins: 0,
	losses: 0,
	word: '',
	image: '',
	test: '',
	userGuess: "",
	letterGuesses: [],
	wrongLetters: [],
	remainingGuesses: 0,
	wordArr: [],
	hiddenWordArr: [],
	options: {
			words: ['CHICKEN', 'BEEF', 'PASTOR', 'STEAK', 'BARBACOA', 'CARNITAS'],
			images: ['assets/images/chicken.png', 'assets/images/beef.png', 'assets/images/pastor.png', 'assets/images/steak.png', 'assets/images/barbacoa.png', 'assets/images/carnitas.png'],
		},
	restart: false,

	// functions
	start: function() {
		// set number of guesses
		this.remainingGuesses = 6; // change allowed guesses here to adjust difficulty
		document.querySelector('#remainingGuesses').innerHTML = this.remainingGuesses;
		// set wrong letter guesses
		this.wrongLetters = [];
		this.letterGuesses = [];
		document.querySelector('#letterGuesses').innerHTML = this.wrongLetters;
		// set image
		document.querySelector('#image').setAttribute('src', 'assets/images/question-mark.png');
		if (this.restart) {
			this.reset();
		}
	},
	reset: function() {
		// reset wins/losses
		this.wins = 0;
		document.querySelector('#wins').innerHTML = this.wins;
		this.losses = 0;
		document.querySelector('#losses').innerHTML = this.losses;
	},
	getWord: function() {
		// randomly selecting a word
		this.word = this.options.words[Math.floor(Math.random() * this.options.words.length)];
		this.wordArr = this.word.split('');
		// get image file
		var index = this.options.words.indexOf(this.word);
		this.image = this.options.images[index];
	},
	writeWordHidden: function() {
		// write "_ _ _" to screen
		this.hiddenWordArr = [];
		for (var i = 0; i < this.wordArr.length; i++) {
			this.hiddenWordArr.push('_');
		}
		document.querySelector('#word').innerHTML = this.hiddenWordArr.join(' ');
	},
	testIfLetter: function() {
		// test if input is a letter
		var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		if (letters.indexOf(this.test) >=0 && this.letterGuesses.indexOf(this.test) == -1) {
			this.userGuess = this.test;
			this.letterGuesses.push(this.userGuess);
			this.checkIfLetterInWord();
		}
	},
	checkIfLetterInWord: function() {
		// check if guess is a letter in word
		if (this.wordArr.indexOf(this.userGuess) >=0) {
			for (var i = 0; i < this.wordArr.length; i++) {
				if (this.wordArr[i] === this.userGuess) {
					this.hiddenWordArr[i] = this.userGuess
				}
			}
			document.querySelector('#word').innerHTML = this.hiddenWordArr.join(' ');
		} else {
			this.remainingGuesses--;
			document.querySelector('#remainingGuesses').innerHTML = this.remainingGuesses;
			this.wrongLetters.push(this.userGuess);
			document.querySelector('#letterGuesses').innerHTML = this.wrongLetters.join(', ');
		} // end if/else check
	},
	checkIfLost: function() {
		if (this.remainingGuesses == 0) {
			this.losses++;
			document.querySelector('#losses').innerHTML = this.losses;
			document.getElementById('loseAudio').play();
			document.querySelector('#image').setAttribute('src', this.image);
			setTimeout(this.lost, 500);
		}
	},
	checkIfWon: function() {
		if (this.hiddenWordArr.join() == this.wordArr.join()) {
			this.remainingGuesses = 0;
			this.wins++;
			document.querySelector('#wins').innerHTML = this.wins;
			document.getElementById('winAudio').play();
			document.querySelector('#image').setAttribute('src', this.image);
			setTimeout(this.won, 500);
		}
	},
	lost: function() {
		var again = confirm('You lose. The word was ' + hangmanGame.word.toLowerCase() + '. Do you want to play again?');
		if (again) {
			startGame();
		} else {
			hangmanGame.restart = true;
		}
	},
	won: function() {
		var again = confirm('You win! The word was ' + hangmanGame.word.toLowerCase() + '. Do you want to play again?');
		if (again) {
			startGame();
		} else {
			hangmanGame.restart = true;
		}
	},
} // object end

function startGame() {
	hangmanGame.start();
	hangmanGame.getWord();
	hangmanGame.writeWordHidden();
	// function to get user's guess
	document.onkeyup = function(event) {
		hangmanGame.test = event.key.toUpperCase();	
		if (hangmanGame.remainingGuesses > 0) {
		hangmanGame.testIfLetter();
		hangmanGame.checkIfLost();
		hangmanGame.checkIfWon();
		}
	}
} // end startGame()