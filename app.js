// This object was missing so i added it to standardise the json. \\
window.addEventListener('load', function() {

  var playerSelector1 = document.getElementById('playerSelector1');
  var playersList = document.getElementById('playersList');
  var playerImage = document.getElementById('playerImage');
  var teamBadge = document.getElementById('teamBadge');
  var playerStatsWrapper = document.getElementById('playerStats');

  var playersArray;
  var getPlayersDataJson = new XMLHttpRequest();
  
  getPlayersDataJson.onreadystatechange = function() {

    if(this.readyState === 4 && this.status === 200) {

      playersArray = JSON.parse(this.responseText).players;
      
      for(var i = 0; i < playersArray.length; i++) {
        
        var listElement = new domEle('li', ['list_item'], playersList);
        listElement.apendElementContent(playersArray[i].player.name.first + ' ' + playersArray[i].player.name.last);
        listElement.setAtrib('value', i);

        listElement.listenForEvent('click', function() {

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
    this.apendElementContent = function(content) {

      ele.innerHTML = content;
    }
    this.listenForEvent = function(ev, callBack) {

      ele.addEventListener(ev, callBack);
    }
    this.createChild = function(elementType, cls, content) {

      var child = document.createElement(elementType);
      child.classList.add(cls);
      child.innerHTML = content;
      ele.appendChild(child);
    }

    if(elementClasses !== undefined) {

      elementClasses.forEach(function(cls) {

        ele.classList.add(cls);
      });
    }
  }

  function updatePlayerInfo(playerIndex) {

    playerStatsWrapper.innerHTML = ''; 

    var player = playersArray[playerIndex].player;
    var playerInfoStatsArray = [];
    var badgeSpritePosition;

    var goalsPerMatch = playersArray[playerIndex].stats[0].value / (playersArray[playerIndex].stats[1].value + playersArray[playerIndex].stats[2].value + playersArray[playerIndex].stats[3].value);
    var PassesPerMinute = (playersArray[playerIndex].stats[4].value + playersArray[playerIndex].stats[8].value) / playersArray[playerIndex].stats[7].value;
   
    playerInfoStatsArray.push(
      {'Appearances': playersArray[playerIndex].stats[6].value},
      {'Goals': playersArray[playerIndex].stats[0].value},
      {'Assists': playersArray[playerIndex].stats[5].value},
      {'Goals per match': goalsPerMatch.toFixed(2)},
      {'Passes per minute': PassesPerMinute.toFixed(2)}
    );

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

    playerImage.style.backgroundImage = 'url(images/player_images/p' + player.id + '.png)';

    teamBadge.style.backgroundPosition = badgeSpritePosition;

    playerInfoStatsArray.forEach(function(item) {

      elem = new domEle('p', ['stat_panel'], playerStatsWrapper);

      for(var key in item){

        elem.createChild('span', 'stat_name', key);
        elem.createChild('span', 'stat_value', item[key]);
      }

      elem.appendEleToParent();
    });
  }
});

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