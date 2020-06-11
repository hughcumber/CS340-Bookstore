function searchOrderByEmail() {
  
    var email  = document.getElementById('email').value
   
    window.location = '/order/search/' + encodeURI(email)
}


