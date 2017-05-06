var endpointURLScoring = "http://api.fantasy.nfl.com/v1/players/scoringleaders";
var endpointURLPhoto = "http://api.fantasy.nfl.com/v1/players/weekvideos";


// ---------------------------  API Call fxns.  ---------------------------------

// Fxn to GET list of players from API scoringleaders endpoint
function getPlayersFromAPI(year, week, position, count, callback){
  debugger
  var settings = {
    url: endpointURLScoring,
    data: {
      season: year,
      week: week,
      position: position,
      count: count,
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
      alpha: selectedPlayers[i].lastName,
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
  var selectedPosition = Object.keys(statData.positions)[0];
  var selectedPlayers = statData.positions[Object.keys(statData.positions)[0]];

  var testingOutputOne = '<div>' + selectedPlayers[1].firstName + ' ' + selectedPlayers[1].lastName + '</div>';
  debugger
  var testingOutputTwo = '<div>' + selectedPlayers[16].firstName + ' ' + selectedPlayers[16].lastName + '</div>';

  console.log(testingOutputOne);
  console.log(testingOutputTwo);

  $('#player-one-stuff').html(testingOutputOne);
  $('#player-two-stuff').html(testingOutputTwo);
}

// ---------------------------  User Event fxns.  ---------------------------------

function pickPosition(){
  $('#position-choice').click(function(e){
    e.preventDefault();
    var position = $(this).find('option:selected').val();
    getPlayersFromAPI("2016", "1", position, "50", displayDropdown);
  });
}

function selectCompare(){
  $('.compare-initial').click(function(e){
    debugger
    e.preventDefault();
    // var playerOne = $(this).find('option:selected').val();
    // var playerTwo = $(this).find('option:selected').val();
    var position = $('#position-choice').find('option:selected').val();
    var year = $('#player-one-year').find('option:selected').val();
    debugger
    getStatsFromAPI(position, year, displayStats);
    // getStatsFromAPI("RB", "2015", displayStats);
  });
}

$(function(){pickPosition();});
selectCompare();


