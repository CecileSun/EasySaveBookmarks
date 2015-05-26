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
            for (var i=0; i<data["objects"].length; i++) {
                var url=data["objects"][i]["where"];
                var description = data["objects"][i]["description"];
                // delete url trailing slash
                var re = new RegExp('/$')
                if (url.match(re)) {
                    url = url.substring(0,url.length-1)
                }
                $('#myBookmarks').append("<a href="+url+">"+description+"</a></br>");
            }
        },

        error: function(){alert("Error loading bookmarks!")},
    })

});

//() (jQuery);

//Code using $ aliasing to other lib 