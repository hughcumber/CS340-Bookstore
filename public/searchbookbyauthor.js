function searchBookByAuthor() {
  
    var author  = document.getElementById('author').value
   
    window.location = '/book_author/search/' + encodeURI(author)
}


