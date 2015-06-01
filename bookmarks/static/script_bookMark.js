$(document).ready(function(){
    var $myTags = $('#myTags');
    var tag_list=[];
    $.ajax({
        type: 'GET',
        url: '/bookmarks/api/info/bookmark/?format=json',
        success: function(data){
            for (var i=0; i<data['objects'].length; i++){
                var where = data['objects'][i]['where'];
                //delete url trailing slash
                    var re = new RegExp('/$');
                    if (where.match(re)) {
                        where = where.substring(0,where.length-1);
                    };
                var description = data['objects'][i]['description'];
                var tag_name = data['objects'][i]['tag']['tag_name'];
                if (tag_list.indexOf(tag_name)>-1){
                    $('#'+tag_name).append('<li><a href='+where+'>'+description+'</a><button>delete</button></br></li>');
                } else {
                    tag_list.push(data['objects'][i]['tag']['tag_name']);
                    $myTags.append("<ul class='tag' id="+tag_name+">"+tag_name+"</br></ul>");
                    $('#'+tag_name).append('<li><a href='+where+'>'+description+'</a><button>delete</button></br></li>');
                }
            }
        }
    });

//--------------------------------------------DELETE bookmarks DOES NOT WORK----------------------------------------------
    $('ul').on('click', 'button', function(ev){
        ev.preventDefault();
        $(this).parent().remove();
        var id = $(this).parent().attr('id');
        console.log(id);
        $.ajax({
            type: 'DELETE',
            url: '/bookmarks/api/info/bookmark/'+id+'/?format=json',
            success: function(){
                console.log('deleted!');
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR);
            }
        })
    });
//--------------------------------------------DELETE bookmarks DOES NOT WORK----------------------------------------------



//POST new bookmarks to the server
    $('#button_add').on('click', function(){
        $(this).hide();
	    $('#bm_infoForm').css('visibility', 'visible');
	});

    $('#bm_infoForm').submit(function(ev) {
        ev.preventDefault();
        $(this).hide();
        // Form validation
        var tag_name_obj = {"tag_name":document.bm_infoForm.tag_name.value};
        var description = document.bm_infoForm.description.value;
        var where = document.bm_infoForm.where.value;
        if (tag_name_obj ==="" || description==="" || where===""){
            alert("Please enter valid data");
            $(this).show();
            return false;
        }
        var inputData = JSON.stringify({
            "tag": tag_name_obj,
            "description": description,
            "where": where,
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
//                console.log('post success');
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR);
            }
        })
        $('#button_add').show();

    });

});

