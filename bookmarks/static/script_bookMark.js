jQuery(function($){
	//Code using $ aliasing to jQuery
	$('#addBookmark').click(function(){
		var newBookmark = document.addBookmarkForm.newBookmark.value;
		$.ajax({
		    type: 'POST',
		    url: '/bookmarks/api/info/bookmark/?format=json',
		    data: newBookmark,
		    success: function(newBookmark){
		       $('#newBookmark').append('<li>'+newBookmark+'</li>');
		    },
		    error: function(e){
		        //alert("Error adding bookmark!");
		        //console.log(JSON.stringify(arguments, null, 4));
		        console.log(e.responseJSON.error_message);
		        console.log(e.responseJSON.traceback);
		        // console.error(e.responseText);
		    }
		})

	});

    $.ajax({
        type: 'GET',
        url: '/bookmarks/api/info/bookmark/?format=json',
        success: function(data) {
            $.each(data["objects"], function(object){
                $('.myBookmarks').append(object["where"])
            })
        },
        error: function(){alert("Error loading bookmarks!")},
    })

});

//() (jQuery);

//Code using $ aliasing to other lib 