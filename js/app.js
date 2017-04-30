var endpointURL = "http://api.fantasy.nfl.com/v1/players/stats";


// ----------------------  Initial retrieval & display fxns.  ------------------------

// Fxn to GET data from API
function getDataFromAPI(year, position, callback){
  debugger
  var settings = {
    url: endpointURL,
    data: {
      statType: 'seasonStats',
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

// Callback Fxn that displays the data from API upon successful retrieval
function display(data){
  var player = {};
  var resultElement = '';

  // console.log(data.players);

  for(var i = 0; i < data.players.length; i++){
    player = {
      name: data.players[i].name,
      position: data.players[i].position,
      team: data.players[i].teamAbbr
    };

    console.log(player.name);

    resultElement += '<li>' + player.name + ', ' + player.position + ', ' + player.team + '</li>'

  }

  $('.practice').html(resultElement);

}

function watchSubmit(){
  $('.player-stats').submit(function(e){
    debugger
    e.preventDefault();
    getDataFromAPI("2016", "QB", display);
  });
}

$(function(){watchSubmit();});






// function display(data){
//   var resultElement = '';
//   console.log(data.players.name);
//   debugger
//   data.players.name.forEach(function(){
//     resultElement += '<li>' + players.name + '</li>'
//   });

//   $('.practice').html(resultElement);

// }


