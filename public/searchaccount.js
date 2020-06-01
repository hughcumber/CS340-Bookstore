function searchAccountByLastName() {
  
    var last_name  = document.getElementById('last_name').value
   
    window.location = '/account/search/' + encodeURI(last_name)
}

function searchAccountByEmail() {
  
    var email  = document.getElementById('email').value
   
    window.location = '/account/search/' + encodeURI(email)
}

