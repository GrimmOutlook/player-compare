var endpointURLScoring = "http://api.fantasy.nfl.com/v1/players/scoringleaders";
var endpointURLPhoto = "http://api.fantasy.nfl.com/v1/players/weekvideos";

// var state = {
//   player: '',
//   year: ''
//   , week: ''
// };


// ---------------------------  API Call fxns.  ---------------------------------

// Fxn to GET list of players from API scoringleaders endpoint
function getPlayersFromAPI(year, week, position, callback){
  debugger
  var settings = {
    url: endpointURLScoring,
    data: {
      season: year,
      week: week,
      position: position,
      format: 'json'
    },
    dataType: 'json',
    method: 'GET',
    success: callback
  };
  $.ajax(settings);
}

// Fxn to GET stats from API scoringleaders endpoint
function getStatsFromAPI(position, year, callback){
  debugger
  var settings = {
    url: endpointURLScoring,
    data: {
      season: year,
      position: position,
      format: 'json'
    },
    dataType: 'json',
    method: 'GET',
    success: callback
  };
  $.ajax(settings);
}

// -------------------------  Callback Display fxns.  ---------------------------------

// Callback Fxn that displays a list of players in a dropdown menu for user selection for both Player 1 and Player 2.
function displayDropdown(playerData){
  var player = {};
  var players = [];
  var resultElement = '';
  var selectedPosition = Object.keys(playerData.positions)[0];
  var selectedPlayers = playerData.positions[Object.keys(playerData.positions)[0]];

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


function displayStats(statData){
  debugger
  // var playerOneInfo = {};
  // debugger
  var x = relevantInfo(playerOneInfo);
  debugger
  // var playerTwoInfo = {};
  console.log(playerOneInfo);
  console.log(x);
  // console.log(playerTwoInfo);
  debugger
  var selectedPosition = Object.keys(statData.positions)[0];
  var selectedPlayerOne = statData.positions[Object.keys(statData.positions)[0]];
  // var selectedYearOne = ;
  // var selectedPlayerTwo = ;
  // var selectedYearTwo = ;

  // console.log(playerOne);

  var testingDynamicInput = '<div>' + selectedPlayerOne.firstName + ' ' + selectedPlayerOne.lastName + '</div>';

  var testingOutputOne = '<div>' + selectedPlayers[1].firstName + ' ' + selectedPlayers[1].lastName + '</div>';
  debugger
  var testingOutputTwo = '<div>' + selectedPlayers[16].firstName + ' ' + selectedPlayers[16].lastName + '</div>';

  // console.log(testingOutputOne);
  // console.log(testingOutputTwo);

  $('#player-one-stuff').html(testingOutputOne);
  $('#player-two-stuff').html(testingOutputTwo);
}

function relevantInfo(position, playerOne, yearOne, playerTwo, yearTwo){
  var playerOneInfo = {};
  var playerTwoInfo = {};

  var playerOneArray = playerOne.split(' ');
  var playerOneFN = playerOneArray.shift();
  var playerOneLN = playerOneArray.shift().slice(0, -1);
  playerOneInfo = {
    season: yearOne,
    positions: position,
    firstName: playerOneFN,
    lastName: playerOneLN
  }

  var playerTwoArray = playerTwo.split(' ');
  var playerTwoFN = playerTwoArray.shift();
  var playerTwoLN = playerTwoArray.shift().slice(0, -1);
  playerTwoInfo = {
    season: yearTwo,
    positions: position,
    firstName: playerTwoFN,
    lastName: playerTwoLN
  }
  debugger

  // displayStats(playerOneInfo, playerTwoInfo);

}
// ---------------------------  User Event fxns.  ---------------------------------

function pickPosition(){
  $('#position-choice').click(function(e){
    e.preventDefault();
    debugger
    var position = $('#position-choice').val();
    debugger
    console.log("Why can't the fucking position be selected " + position);
    getPlayersFromAPI("2016", "1", position, displayDropdown);
  });
}

function selectCompare(){
  $('.compare-initial').click(function(e){
    e.preventDefault();
    var position = $('#position-choice').find('option:selected').val();
    var playerOne = $('#player-one').find('option:selected').val();
    var yearOne = $('#player-one-year').find('option:selected').val();
    var playerTwo = $('#player-two').find('option:selected').val();
    var yearTwo = $('#player-two-year').find('option:selected').val();
    debugger
    // state.player = playerOne;
    // state.year = yearOne;
    getStatsFromAPI(position, yearOne, displayStats);
    relevantInfo(position, playerOne, yearOne, playerTwo, yearTwo);
  });
}

$(function(){pickPosition();});
selectCompare();
