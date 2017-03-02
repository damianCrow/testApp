window.addEventListener('load', function() {

  var playersArray;
  var getPlayersDataJson = new XMLHttpRequest();
  
  getPlayersDataJson.onreadystatechange = function() {

    if(this.readyState === 4 && this.status === 200) {

      playersArray = JSON.parse(this.responseText).players;
      
      for(var i = 0; i < playersArray.length; i++) {
        console.log(playersArray[i]);
      }
    }
    else if(this.status > 200) {

     console.log('ERROR! ' + responseText);
    }
  }

  getPlayersDataJson.open("GET", "player-stats.json", true);
  getPlayersDataJson.send();
  
  function domEle(elementType, elementClasses, elementParent) {
    
    this.elementType = elementType;
    this.elementClasses = elementClasses;
    this.elementParent = elementParent;
    this.appendEleToParent = function() {

      elementParent.appendChild(ele);
    }

    var ele = document.createElement(elementType);

    if(elementClasses !== undefined) {

      elementClasses.forEach(function(cls) {

        ele.classList.add(cls);
      });
    }
  }

  var elet = new domEle('div', ['test'], document.getElementById('playerInfo'));
  elet.appendEleToParent();
  console.log(elet);
});