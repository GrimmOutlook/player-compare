var endpointURLScoring = "http://api.fantasy.nfl.com/v1/players/scoringleaders";
var endpointURLPhoto = "http://api.fantasy.nfl.com/v1/players/weekvideos";

var state = {
  selected:{
    year: '',
    position:'',
    week:'',
    playerOne:'',
    playerTwo:''
  },
  results: null
};


// ---------------------------  API Call fxns.  ---------------------------------

// Fxn to GET list of players from API scoringleaders endpoint
function getPlayersFromAPI(state, callback){
  debugger
  var settings = {
    url: endpointURLScoring,
    data: {
      season: state.selected.year,
      week: state.selected.week,
      position: state.selected.position,
      format: 'json'
    },
    dataType: 'json',
    method: 'GET',
    success: callback
  };
  $.ajax(settings);
}

// Fxn to GET stats from API scoringleaders endpoint  - USE ONE GET API FXN
// function getStatsFromAPI(position, year, callback){
//   debugger
//   var settings = {
//     url: endpointURLScoring,
//     data: {
//       season: year,
//       position: position,
//       format: 'json'
//     },
//     dataType: 'json',
//     method: 'GET',
//     success: callback
//   };
//   $.ajax(settings);
// }

// -------------------------  Callback Display fxns.  ---------------------------------

// Callback Fxn that displays a list of players in a dropdown menu for user selection for both Player 1 and Player 2.
function displayDropdown(playerData){
debugger
  var player = {};
  var players = [];
  var resultElement = '';
  debugger
  var selectedPosition = Object.keys(playerData.positions)[0];
  console.log(selectedPosition);
  debugger
  var selectedPlayers = playerData.positions[selectedPosition]; //array of objects
  console.log(selectedPlayers);
  debugger
  state.results = selectedPlayers;

  for(var i = 0; i < selectedPlayers.length; i++){
    player = {
      name: selectedPlayers[i].firstName + ' ' + selectedPlayers[i].lastName,
      team: selectedPlayers[i].teamAbbr,
      alpha: selectedPlayers[i].lastName
    };
    players.push(player);
  }

  players.sort(alphaSort);

  for(var x = 0; x < players.length; x++){
    resultElement += '<option>' + players[x].name + ',  ' + players[x].team + '</option>'
  }

  $('.player-list').html(resultElement);
}

// Sort names alphabetically
function alphaSort(a, b) {
    var playerA = a.alpha.toUpperCase();
    var playerB = b.alpha.toUpperCase();

    var comparison = 0;
      if (playerA > playerB) {
        comparison = 1;
      } else if (playerA < playerB) {
        comparison = -1;
      }
      return comparison;
  }


function displayStats(state){

  var playerArrayOne = state.selected.playerOne.split(' ');
  var playerOneFN = playerArrayOne.shift();
  var playerOneLN = playerArrayOne.shift().slice(0, -1);

  var playerArrayTwo = state.selected.playerTwo.split(' ');
  var playerTwoFN = playerArrayTwo.shift();
  var playerTwoLN = playerArrayTwo.shift().slice(0, -1);

  for (var i = 0; i < state.results.length; i++){
    if ((playerOneFN === state.results[i].firstName) && (playerOneLN === state.results[i].lastName)){
      var playerOneStats =  state.results[i].stats;
      // if state.results[i].stats.WHATEVERSTAT = false, display 0
    }

    if ((playerTwoFN === state.results[i].firstName) && (playerTwoLN === state.results[i].lastName)){
      var playerTwoStats =  state.results[i].stats;
      // if playerTwoStats.keys
    }
  }
debugger
  console.log(playerOneStats); // is a key equal to: stats.  stats is an object, that has as its value another object containing 10 k-v pairs.
  // How to loop through those keys to obtain each of the corresp. values?
  // playerOneStats.PassYds should give me the value of the PassYds key

//  How do I loop through all the keys?!?!?!?!?! Like this?
  //   for (var k = 0; k < 10; k++){
  //     var playerOneKeys = Object.keys(playerOneStats)[k];
  //     var valueToTest = playerOneStats[playerOneKeys];

  //     if(valueToTest === false){
  //       valueToTest = 0;
  //     }

  //     console.log(valueToTest);
  //   }

  // console.log(playerOneStats);

  var keyArray = ['PassYds', 'FumTD'];

  console.log(keyArray[0]);
  debugger

  if (playerOneStats.PassYds === false){
    playerOneStats.PassYds = 0;
  }
  if (playerOneStats.PassTDs === false){
    playerOneStats.PassTDs = 0;
  }
  if (playerOneStats.Int === false){
    playerOneStats.Int = 0;
  }
  if (playerOneStats.RushYds === false){
    playerOneStats.RushYds = 0;
  }
  if (playerOneStats.RushTDs === false){
    playerOneStats.RushTDs = 0;
  }
  if (playerOneStats.RecYds === false){
    playerOneStats.RecYds = 0;
  }
  if (playerOneStats.RecTDs === false){
    playerOneStats.RecTDs = 0;
  }
  if (playerOneStats.FumTD === false){
    playerOneStats.FumTD = 0;
  }
  if (playerOneStats.TwoPt === false){
    playerOneStats.TwoPt = 0;
  }
  if (playerOneStats.FumLost === false){
    playerOneStats.FumLost = 0;
  }



debugger

var displayOne = '<h2>' + state.selected.playerOne + '</h2>' + '<ul><li>' + playerOneStats.PassYds + '</li><li>' + playerOneStats.PassTDs + '</li><li>' + playerOneStats.Int + '</li><li>' + playerOneStats.RushYds + '</li><li>' + playerOneStats.RushTDs + '</li><li>' + playerOneStats.RecYds + '</li><li>' + playerOneStats.RecTDs + '</li><li>' + playerOneStats.FumTD + '</li><li>' + playerOneStats.TwoPt + '</li><li>' + playerOneStats.FumLost + '</li></ul>';

var displayTwo = '<h2>' + state.selected.playerTwo + '</h2>' + '<ul><li>' + playerTwoStats.PassYds + '</li><li>' + playerTwoStats.PassTDs + '</li><li>' + playerTwoStats.Int + '</li><li>' + playerTwoStats.RushYds + '</li><li>' + playerTwoStats.RushTDs + '</li><li>' + playerTwoStats.RecYds + '</li><li>' + playerTwoStats.RecTDs + '</li><li>' + playerTwoStats.FumTD + '</li><li>' + playerTwoStats.TwoPt + '</li><li>' + playerTwoStats.FumLost + '</li></ul>';


  $('#playerOne-stat-display').html(displayOne);
  $('#playerTwo-stat-display').html(displayTwo);
}


// ---------------------------  User Event fxns.  ---------------------------------

function initialSelect(){
  $('.initial-select').click(function(e){
    e.preventDefault();
    state.selected.position = $('#position-choice').val();
    state.selected.year = $('#year').val();
    state.selected.week = $('#week').val();
    debugger
    getPlayersFromAPI(state, displayDropdown);
  });
}

function selectCompare(){
  $('.compare-initial').click(function(e){
    e.preventDefault();

    state.selected.playerOne = $('#player-one').find('option:selected').val();
    state.selected.playerTwo = $('#player-two').find('option:selected').val();

    console.log(state);
    debugger
    displayStats(state);
  });
}

// $("a.demo-2").simplePopup({
//   type: "html",
//   htmlSelector: "#myPopup"
// });


$(function(){initialSelect();});
selectCompare();
