var endpointURLScoring = "http://api.fantasy.nfl.com/v1/players/scoringleaders";
var endpointURLPhoto = "http://api.fantasy.nfl.com/v1/players/weekvideos";


// ----------------------  Initial retrieval & display fxns.  ------------------------

// Fxn to GET data from API scoringleaders endpoint
function getScoringFromAPI(year, week, position, callback){
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

// Callback Fxn that displays a list of players in a dropdown menu for user selection for both Player 1 and Player 2.
function displayDropdown(playerData){
  var player = {};
  var players = [];
  var resultElement = '';
  var selectedPosition = Object.keys(playerData.positions)[0];
  var selectedPlayers = playerData.positions[Object.keys(playerData.positions)[0]];
  debugger

  for(var i = 0; i < selectedPlayers.length; i++){
    player = {
      name: selectedPlayers[i].firstName + ' ' + selectedPlayers[i].lastName,
      team: selectedPlayers[i].teamAbbr,
      alpha: selectedPlayers[i].lastName
    };

    players.push(player);

  }

  players.sort(alphaSort);
  debugger

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

function pickPosition(){
  $('#position-choice').click(function(e){
    debugger
    e.preventDefault();
    var position = $(this).find('option:selected').val();
    debugger
    getScoringFromAPI("2016", "1", position, displayDropdown);
  });
}

// function selectCompare(){
//   $('.compare-initial').click(function(e){
//     debugger
//     e.preventDefault();
//     var playerOne =
//     var playerTwo =
//     var year = $(this).find('option:selected').val();
//     getScoringFromAPI(year, "1", position, displayDropdown);
//   });
// }

$(function(){pickPosition();});


