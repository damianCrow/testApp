// NOTE: // The "goal_assist" object was missing from Mertesacker's json object so i added it to standardise the json. \\ \\

// WAIT FOR WINDOW TO LOAD BEFORE PROCESSING LOGIC. \\
window.addEventListener('load', function() {

  var playerSelector1 = document.getElementById('playerSelector1');
  var playersList = document.getElementById('playersList');
  var playerImage = document.getElementById('playerImage');
  var teamBadge = document.getElementById('teamBadge');
  var playerStatsWrapper = document.getElementById('playerStats');
  var nameAndPosition = document.getElementById('nameAndPosition');
  var playerSelectorText = document.getElementById('playerSelectorText');

  var playersArray;
  var getPlayersDataJson = new XMLHttpRequest();
// GET AND PARSE THE PLAYER JSON DATA. \\
  getPlayersDataJson.onreadystatechange = function() {

    if(this.readyState === 4 && this.status === 200) {
// LOOP THROUGH JSON AND POPULATE THE PLAYER SELECT DROPDOWN. \\
      playersArray = JSON.parse(this.responseText).players;
      
      for(var i = 0; i < playersArray.length; i++) {
        
        var listElement = new domEle('li', ['list_item'], playersList);
        listElement.appendElementContent(playersArray[i].player.name.first + ' ' + playersArray[i].player.name.last);
        listElement.setAtrib('value', i);
// AD CLICK EVENT LISTENER TO THE PLAYER'S NAMES IN THE LIST. \\
        listElement.listenForEvent('click', function() {
// PASS THE ELEMENT VALUE TO THE UPDATE FUNCTION. THE VALU IS THE PLAYER INDEX IN THE PLAYERSARRAY. \\
          updatePlayerInfo(this.value);
        });

        listElement.appendEleToParent();
      }
    }
    else if(this.status > 200) {

     console.log('ERROR! ' + responseText);
    }
  }

  getPlayersDataJson.open("GET", "player-stats.json", true);
  getPlayersDataJson.send();
// THIS CONSTRUCTOR CREATES DOM ELEMENTS WITH METHODS. \\  
  function domEle(elementType, elementClasses, elementParent) {
    
    var ele = document.createElement(elementType);

    this.elementType = elementType;
    this.elementClasses = elementClasses;
    this.elementParent = elementParent;
    this.appendEleToParent = function() {

      elementParent.appendChild(ele);
    }
    this.setAtrib = function(atribute, atributeValue) {

      ele.setAttribute(atribute, atributeValue);
    }
    this.appendElementContent = function(content) {

      ele.innerHTML = content;
    }
    this.listenForEvent = function(ev, callBack) {

      ele.addEventListener(ev, callBack);
    }
    this.createChild = function(elementType, cls, content) {
// CREATE AND APPEND CHILD ELEMENT TO "ele". \\
      var child = document.createElement(elementType);
      child.classList.add(cls);
      child.innerHTML = content;
      ele.appendChild(child);
    }
// LOOP THROUG ELEMENT CLASSES ARRAY AND ADD EACH CLASS TO "ele". \\
    if(elementClasses !== undefined) {

      elementClasses.forEach(function(cls) {

        ele.classList.add(cls);
      });
    }
  }
// RUNS WHEN PLAYER NAME IN LIST IS CLICKED. \\
  function updatePlayerInfo(playerIndex) {
// EMPTY PARENT ELEMENTS. \\
    playerStatsWrapper.innerHTML = '';
    nameAndPosition.innerHTML = '';

    var player = playersArray[playerIndex].player;
    var playerInfoStatsArray = [];
    var badgeSpritePosition, playerName, position;
    var playerNameText = player.name.first + ' ' + player.name.last;
// DO PLAYER STATS CALCULATIONS. //
    var goalsPerMatch = playersArray[playerIndex].stats[0].value / (playersArray[playerIndex].stats[1].value + playersArray[playerIndex].stats[2].value + playersArray[playerIndex].stats[3].value);
    var PassesPerMinute = (playersArray[playerIndex].stats[4].value + playersArray[playerIndex].stats[8].value) / playersArray[playerIndex].stats[7].value;
// PLACE REQUIRED VALUES IN ARRAY. \\  
    playerInfoStatsArray.push(
      {'Appearances': playersArray[playerIndex].stats[6].value},
      {'Goals': playersArray[playerIndex].stats[0].value},
      {'Assists': playersArray[playerIndex].stats[5].value},
      {'Goals_per_match': goalsPerMatch.toFixed(2)},
      {'Passes_per_minute': PassesPerMinute.toFixed(2)}
    );
// WORKOUT PLAYER POSITION NAME BASED ON POSITION SHORT CODE. \\
    switch(player.info.position) {

      case "M":

       position = 'Midfielder';
      break;

      case "D":

       position = 'Defender';
      break;

      case "F":

       position = 'Striker';
      break;
    }
// SET BADGE SPRITE POSSION BASED ON TEAM ID. \\
    switch(player.currentTeam.id) {

      case 1:

        badgeSpritePosition = '-100% -100%';
      break;

      case 11:

        badgeSpritePosition = '-800% -700%';
      break;

      case 12:

        badgeSpritePosition = '-600% -800%';
      break;

      case 21:

        badgeSpritePosition = '-500% -1000%';
      break;

      case 26:

        badgeSpritePosition = '0% 0%';
      break;
    }
// SET THE PLAYER IMAGE SRC BADED ON PLAYER ID. \\
    playerImage.style.backgroundImage = 'url(images/player_images/p' + player.id + '.png)';
    playerSelectorText.innerHTML = playerNameText;
    teamBadge.style.backgroundPosition = badgeSpritePosition;
// CREATE, POPULATE AND APPEND TO DOM, PLAYER NAME AND POSITION ELEMENTS. \\
    var playerName = new domEle('p', ['primary_info'], nameAndPosition);
    playerName.appendElementContent(playerNameText);
    playerName.appendEleToParent();

    var playerPosition = new domEle('p', ['primary_info'], nameAndPosition);
    playerPosition.appendElementContent(position);
    playerPosition.appendEleToParent();
// LOOP THROUGH STATS ARRAY AND CREATE, POPULATE AND APPEND TO DOM, PLAYER STATS. \\
    playerInfoStatsArray.forEach(function(item) {

      elem = new domEle('p', ['stat_panel'], playerStatsWrapper);

      for(var key in item) {

        elem.createChild('span', 'stat_name', key.replace(/_/g, ' '));
        elem.createChild('span', 'stat_value', item[key]);
      }

      elem.appendEleToParent();
    });
  }
});
// FUNCTION GETS CALLED ON DROPDOWN MENU CLICK.\\
function showHideList(ele) {

  if(ele.children[0].classList.contains('list_open')) {

    for(var e = 0; e < ele.children.length; e++) {

      ele.children[e].classList.remove('list_open');
    }
  }
  else {

    for(var e = 0; e < ele.children.length; e++) {

      ele.children[e].classList.add('list_open');
    }
  }
}