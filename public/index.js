/*
  index.js
  Task: manage the dummy results that we will implement with a DBMS

*/


function returnResult(){






}



function subReturn(){

}




window.addEventListener('DOMContentLoaded', function(){               //  DOMContentLoaded event fires after page is loaded in browser


  if(document.getElementById("returnInput")){                         //  for the submit button on results page

    var returnInputButton = document.getElementById("returnInput");

    returnInputButton.addEventListener("click", searchResult())

  }

  if(document.getElementById("subReturn")){                         //  for the submit button on results page

    var returnInputButton = document.getElementById("returnInput");

    returnInputButton.addEventListener("click", searchResult())

  }



})
