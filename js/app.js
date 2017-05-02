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

// Callback Fxn that displays the player in a dropdown menu for user selection
function displayDropdown(data){
  var player = {};
  var resultElement = '';

  for(var i = 0; i < data.positions.QB.length; i++){
    player = {
      name: data.positions.QB[i].firstName + ' ' + data.positions.QB[i].lastName,
      team: data.positions.QB[i].teamAbbr
    };

    resultElement += '<option>' + player.name + ',  ' + player.team + '</option>'
  }

  $('.practice').html(resultElement);

}

function watchSubmit(){
  $('.player-stats').submit(function(e){
    debugger
    e.preventDefault();
    getScoringFromAPI("2016", "1", "QB", displayDropdown);
  });
}

$(function(){watchSubmit();});


