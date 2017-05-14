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
  debugger
  console.log(state.results);
  debugger

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

  var displayOne = '<h2>' + state.selected.playerOne + '</h2><h3>Look at My Awesome Stats:</h3>' + '<ul>';
    for (var k = 0; k < 10; k++){
      var statKeyOne = Object.keys(playerOneStats)[k];
      var statValueOne = playerOneStats[statKeyOne];

      if (statValueOne === false){
        statValueOne = 0;
      }
      displayOne += '<li class="stat1">' + statKeyOne + ': ' + statValueOne + '</li>';
    }
  displayOne += '</ul>';

  var displayTwo = '<h2>' + state.selected.playerTwo + '</h2><h3>No, Look at MY Awesome Stats:</h3>' + '<ul>';
    for (var k = 0; k < 10; k++){
      var statKeyTwo = Object.keys(playerTwoStats)[k];
      var statValueTwo = playerTwoStats[statKeyTwo];

      if (statValueTwo === false){
        statValueTwo = 0;
      }
      displayTwo += '<li class="stat2">' + statKeyTwo + ': ' + statValueTwo + '</li>';
    }
  displayTwo += '</ul>';

  compare(playerOneStats, playerTwoStats);

  $('#playerOne-stat-display').html(displayOne);
  $('#playerTwo-stat-display').html(displayTwo);

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
      $('.stat1').addClass('highlight');
      //highlight statValueOne - add a class to that list item - how do I add that class when it is not part of the original HTML?
    }
    else if (statValueOne < statValueTwo){
      $('.stat2').addClass('highlight');
      //highlightstatValueTwo
    }
    else{
      console.log('how do i highlight both?');
      //highlight both stat values
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
    e.preventDefault();
    state.selected.playerOne = $('#player-one').find('option:selected').val();
    state.selected.playerTwo = $('#player-two').find('option:selected').val();
    displayStats(state);
  });
}

//don't use live, use on
//Try it with a "dummy" button to see if it works.
// $('a.popup').live('click', function(){
//     newwindow=window.open($(this).attr('href'),'','height=200,width=150');
//     if (window.focus) {newwindow.focus()}
//     return false;
//   });

// $("a.demo-2").simplePopup({
//   type: "html",
//   htmlSelector: "#myPopup"
// });


$(function(){initialSelect();});
selectCompare();
