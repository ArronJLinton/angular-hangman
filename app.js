
// First thing you want to do with angular is to declare a variable equal to angular.module
// First parameter is the name of the app
// 2nd parameter is left blank because we are not going to have any dependencies in this example
var app = angular.module("HangmanApp", []);

// Need to define a controller
// This will be linked to the body of the index page
// We pass in $scope which will be used in the entire app controller and also be available in index.html
// Dependency injections? 
app.controller("GameController", ['$scope', '$timeout', function($scope, $timeout){
// any parameter assigned to $scope will be available in the html page

var words = ["judith", "renford", "brittany", "jon", "arron"];

// Anything assigned to $scope is considered a variable that will be called in the html
// need to use camel case to present variable names
$scope.incorrectLettersChosen=[];
$scope.correctLettersChosen=[];
$scope.guesses = 6;
$scope.displayWord = "";
// here we create an input object
$scope.input = {
	letter : ''
}

// function that will select random word
function selectRandomWord(){
	var index = Math.floor(Math.random()*words.length);
	console.log(index);
	return words[index];
	}

// Once this function is called the game is excuted
function newGame() {
	// everything a tossigned scope is reset equal to the default values 
	$scope.incorrectLettersChosen=[];
	$scope.correctLettersChosen=[];
	$scope.guesses = 6;
	$scope.displayWord = "";

	selectWord = selectRandomWord();
	console.log(selectWord);
	var tempDisplayedWord = '';
	for (var i = 0; i < selectWord.length; i++) {
		tempDisplayedWord += '_ ';
		$scope.displayWord = tempDisplayedWord;
		}
	}

 $scope.letterChosen= function (){
		
		// The for loops below identifies whether or not a letter choosen is already in the correctLetters or incorrectLetters array
		for (var i = 0; i < $scope.correctLettersChosen.length; i++) {
			if($scope.correctLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()){
				$scope.input.letter="";
				return;
			}
		}
		for (var i = 0; i < $scope.incorrectLettersChosen.length; i++) {
			if($scope.incorrectLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()){
				$scope.input.letter="";
				return;
			}
		}


	var correct = false;
	for (var i = 0; i < selectWord.length; i++) {
		// If user choice is equal to any letter within the selected word, then replace the underscore with the correct letter
		if(selectWord[i].toLowerCase()==$scope.input.letter.toLowerCase()){

			// Why is this written as such?
			$scope.displayWord = $scope.displayWord.slice(0, i) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(i+2);

			correct = true;
		}
	}
	// 
	if(correct){
		$scope.correctLettersChosen.push($scope.input.letter.toLowerCase());
	}else{
		$scope.guesses--;
		$scope.incorrectLettersChosen.push($scope.input.letter.toLowerCase());
	}
	$scope.input.letter = "";


	if($scope.guesses == 0){
		alert("You Lost! Oh no..")
		$timeout(function() {
			newGame();
		}, 1000);
	}
	// If the index of the underscore placeholer is -1, then this means the user guessed all the correct letters and they win
	else if($scope.displayWord.indexOf("_ ") == -1){
		alert("You Win! Oh Yes Oh Yes!")
		$timeout(function() {
			newGame();
		}, 1000);
	}

}

	newGame();
}]);
