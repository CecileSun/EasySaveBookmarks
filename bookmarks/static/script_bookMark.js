jQuery(function($){
	//Code using $ aliasing to jQuery
	$('#button_add').on('click', function(){
	    $('#bm_info').css('visibility', 'visible');
	});

    $('#bm_infoForm').submit(function(ev) {
        ev.preventDefault();
        $(this).hide();
        var tag_name_obj = {"tag_name":document.bm_infoForm.tag_name.value};
        var inputData = JSON.stringify({
            "tag": tag_name_obj,
            "description": document.bm_infoForm.description.value,
            "where": document.bm_infoForm.where.value,
        });
        //console.log(inputData);

        $.ajax({
            type: 'POST',
            url: '/bookmarks/api/info/bookmark/?format=json',
            data: inputData,//JSON.stringify({"description": "test", "tag": {"tag_name": "test"}, "where": "https://www.linux.com/"}),//JSON.stringify(values),
            dataType: 'json',
            processData: false,
            contentType: 'application/json',
            success: function(data) {
                console.log('post success');
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR);
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
-               var re = new RegExp('/$')
-               if (url.match(re)) {
-                   url = url.substring(0,url.length-1)
-               }
                $('#myBookmarks').append("<a href="+url+">"+description+"</a></br>");
            }
        },

        error: function(){alert("Error loading bookmarks!")},
    })

});

//() (jQuery);

//Code using $ aliasing to other lib 