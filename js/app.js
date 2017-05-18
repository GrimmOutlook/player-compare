var endpointURLScoring = "http://api.fantasy.nfl.com/v1/players/scoringleaders";

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
  var selectedPlayers = playerData.positions[selectedPosition]; //array of objects

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
  // $(<some class>)
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
      var playerOneObject = state.results[i];
      var playerOneStats =  state.results[i].stats;
    }

    if ((playerTwoFN === state.results[i].firstName) && (playerTwoLN === state.results[i].lastName)){
      var playerTwoObject = state.results[i];
      var playerTwoStats =  state.results[i].stats;
    }
  }

  var displayOne = '<h2>Stats for ' + state.selected.year + ', Week ' + state.selected.week + ':</h2>' + '<ul>';
    for (var k = 0; k < 10; k++){
      var statKeyOne = Object.keys(playerOneStats)[k];
      var statValueOne = playerOneStats[statKeyOne];
        if (statValueOne === false){
          statValueOne = 0;
        }
        switch (state.selected.position){
            case "QB":
              if (k <= 4 || k >= 8){
                displayOne += '<li class="stat1-' + statKeyOne + '">' + statKeyOne + ': ' + statValueOne + '</li>';
              }
              break;
            case "RB":
            case "WR":
            case "TE":
              if ((k >=3 && k <= 6) || k >= 8){
                displayOne += '<li class="stat1-' + statKeyOne + '">' + statKeyOne + ': ' + statValueOne + '</li>';
              }
              break;
            default:   // for kicker:
              if (k <= 5){
                displayOne += '<li class="stat1-' + statKeyOne + '">' + statKeyOne + ': ' + statValueOne + '</li>';
              }
         }
    }
  displayOne += '</ul>';

  var displayTwo = '<h2>Stats for ' + state.selected.year + ', Week ' + state.selected.week + ':</h2>' + '<ul>';
    for (var k = 0; k < 10; k++){
      var statKeyTwo = Object.keys(playerTwoStats)[k];
      var statValueTwo = playerTwoStats[statKeyTwo];

      if (statValueTwo === false){
        statValueTwo = 0;
      }
      switch (state.selected.position){
            case "QB":
              if (k <= 4 || k >= 8){
                displayTwo += '<li class="stat2-' + statKeyTwo + '">' + statKeyTwo + ': ' + statValueTwo + '</li>';
              }
              break;
            case "RB":
            case "WR":
            case "TE":
              if ((k >=3 && k <= 6) || k >= 8){
                displayTwo += '<li class="stat2-' + statKeyTwo + '">' + statKeyTwo + ': ' + statValueTwo + '</li>';
              }
              break;
            default:   // for kicker:
              if (k <= 5){
                displayTwo += '<li class="stat2-' + statKeyTwo + '">' + statKeyTwo + ': ' + statValueTwo + '</li>';
              }
         }
    }
  displayTwo += '</ul>';

  $('.playerOne-bio').html('<h1>' + playerOneFN + ' ' + playerOneLN + '</h1><h2>' + playerOneObject.teamAbbr + '</h2><h2>' + state.selected.position + '</h2>')
  $('.playerTwo-bio').html('<h1>' + playerTwoFN + ' ' + playerTwoLN + '</h1><h2>' + playerTwoObject.teamAbbr + '</h2><h2>' + state.selected.position + '</h2>')

  $('#playerOne-stat-display').html(displayOne);
  $('#playerTwo-stat-display').html(displayTwo);

  compare(playerOneStats, playerTwoStats);

  displayPhoto(playerOneObject, playerTwoObject);
}

function compare(playerOneStats, playerTwoStats){
debugger

  for (var k = 0; k < 10; k++){
    var statKeyOne = Object.keys(playerOneStats)[k];
    var statValueOne = playerOneStats[statKeyOne];

    var statKeyTwo = Object.keys(playerTwoStats)[k];
    var statValueTwo = playerTwoStats[statKeyTwo];
debugger
    if (statValueOne > statValueTwo){
      $('.stat1-' + statKeyOne).addClass('highlight');
    }
    else if (statValueOne < statValueTwo){
      $('.stat2-' + statKeyTwo).addClass('highlight');
    }
    else{
      console.log('do i highlight both?');
      //highlight both stat values or not?
    }
  }
}

function displayPhoto(playerOneObject, playerTwoObject){
  var headshotOne = '<img src="http://s.nflcdn.com/static/content/public/static/img/fantasy/transparent/200x200/' + playerOneObject.esbid + '.png">';
  var teamLogoOne = '<img src="http://fantasy.nfl.com/static/img/clubs/' + playerOneObject.teamAbbr.toLowerCase() + '/280x240_1494349607.png">';

  var headshotTwo = '<img src="http://s.nflcdn.com/static/content/public/static/img/fantasy/transparent/200x200/' + playerTwoObject.esbid + '.png">';
  var teamLogoTwo = '<img src="http://fantasy.nfl.com/static/img/clubs/' + playerTwoObject.teamAbbr.toLowerCase() + '/280x240_1494349607.png">';

  $('#playerOne-headshot').html(headshotOne);
  $('#playerOne-logo').html(teamLogoOne);
  $('#playerTwo-headshot').html(headshotTwo);
  $('#playerTwo-logo').html(teamLogoTwo);
}

// ---------------------------  User Event fxns.  ---------------------------------

function initialSelect(){
  $('.initial-select').click(function(e){
    e.preventDefault();
    state.selected.position = $('#position-choice').val();
    state.selected.year = $('#year').val();
    state.selected.week = $('#week').val();
    getPlayersFromAPI(state, displayDropdown);
  });
}

function selectCompare(){
  $('.compare-initial').click(function(e){
    $('.overlay').addClass('is-on');
    // e.preventDefault();
    state.selected.playerOne = $('#player-one').find('option:selected').val();
    state.selected.playerTwo = $('#player-two').find('option:selected').val();
    displayStats(state);
  });
}

function closePopup(){
  $('#close').on('click', function() {
  $('.overlay').removeClass('is-on');
  });
}


$(function(){
  initialSelect();
  selectCompare();
  closePopup();
});







