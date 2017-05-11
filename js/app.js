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
  var selectedPosition = Object.keys(playerData.positions)[0];
  var selectedPlayers = playerData.positions[selectedPosition];
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
   console.log(state.results);
debugger

//Get players first and last name out of state.selected.playerOne
// ... and save into an Array? or an Object?

  var playerInfo = {};

  var playerArray = state.selected.playerOne.split(' ');
  var playerFN = playerArray.shift();
  var playerLN = playerArray.shift().slice(0, -1);
  playerInfo = {
    firstName: playerFN,
    lastName: playerLN
  }
  debugger
  console.log(playerInfo);

  // if playerInfo.firstName === state.results[0].firstName
  // && playerInfo.lastName === state.results[0].lastName
  // then display state.results[0].stats
  console.log(state.results[0]);

  if ((playerInfo.firstName === state.results[0].firstName) && (playerInfo.lastName === state.results[0].lastName)){
    console.log('Hi there' + state.results[0].stats.RecYds);
  }
  else{
    console.log('Bummer');
  }

  debugger


  $('#player-stat-display').html(testingOutputTwo);
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
