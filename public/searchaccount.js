function searchPeopleByLastName() {
    //get the last name 
    var first_name_search_string  = document.getElementById('Last_name_search_string').value
    //construct the URL and redirect to it
    window.location = '/accout/search/' + encodeURI(last_name_search_string)
}
