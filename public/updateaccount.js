function updateAccount(id){
    $.ajax({
        url: '/account/' + id,
        type: 'PUT',
        data: $('#update-account').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
