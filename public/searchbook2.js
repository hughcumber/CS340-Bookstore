function searchBookByBookName2() {
  
    var book_name  = document.getElementById('book_name').value
   
    window.location = '/search/esult/' + encodeURI(book_name)
}


