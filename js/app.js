var endpointURLScoring = "http://api.fantasy.nfl.com/v1/players/scoringleaders";
var endpointURLPhoto = "http://api.fantasy.nfl.com/v1/players/weekvideos";

var state = {
  selected:{
    year: '',
    position:'',
    week:'',
    playerOne:'',
    playerTwo:'',
  },
  results:null;
  // , week: ''
};


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
  state.results=playerData;
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
   console.log(state);
   console.log(statData);
debugger

  var playerInfo = {};

  var playerArray = player.split(' ');
  var playerFN = playerArray.shift();
  var playerLN = playerArray.shift().slice(0, -1);
  playerInfo = {
    season: state.year,
    positions: position,
    firstName: playerFN,
    lastName: playerLN
  }
  debugger
  console.log(playerInfo);

  var selectedPosition = Object.keys(statData.positions)[0];
  var selectedPlayer = statData.positions[Object.keys(statData.positions)[0]];


  $('#player-stat-display').html(testingOutputTwo);
}


// ---------------------------  User Event fxns.  ---------------------------------

function pickPosition(){
  $('#position-choice').change(function(e){
    e.preventDefault();

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
    state.selected.year = $('#player-one-year').find('option:selected').val();
    var playerTwo = $('#player-two').find('option:selected').val();
    var yearTwo = $('#player-two-year').find('option:selected').val();
    debugger
    state.playerOne = playerOne;
    state.yearOne = yearOne;
    state.playerTwo = playerTwo;
    state.yearTwo = yearTwo;
    debugger
    console.log(state);
    debugger
    getStatsFromAPI(position, state.year, displayStats);
  });
}

// $("a.demo-2").simplePopup({
//   type: "html",
//   htmlSelector: "#myPopup"
// });


$(function(){pickPosition();});
selectCompare();
