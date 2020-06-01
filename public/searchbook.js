function searchBookByBookName() {
  
    var book_name  = document.getElementById('book_name').value
   
    window.location = '/book/search/' + encodeURI(book_name)
}


