$(document).ready(function(){
    //alert('document');
    var $myTags = $('#myTags');
    var tag_list=[];
    //Define global Api variable
    window.Api = {
        get_bookmarks: function(){ //will add user log_in later
            var url = '/bookmarks/api/info/bookmark/?format=json';
            return $.ajax(url, {type: 'GET'});
        },
        post_bookmark: function(data){
            var url = '/bookmarks/api/info/bookmark/?format=json';
            return $.ajax(url, {type: 'POST', data: data, dataType: 'json', processData: false, contentType: 'application/json'});
        },
        delete_bookmark: function(delete_id){
            var url = '/bookmarks/api/info/bookmark/'+delete_id+'/?format=json';
            return $.ajax(url, {type:'DELETE'});
        }
    };


// GET existing bookmarks from the server
    window.Api.get_bookmarks().success(function(data){
        //console.table(bookmarks);
        for (var i=0; i<data['objects'].length; i++){
            var where = data['objects'][i]['where'];
            //delete url trailing slash
            var re = new RegExp('/$');
            if (where.match(re)) {
                where = where.substring(0,where.length-1);
                };
            var description = data['objects'][i]['description'];
            var id = data['objects'][i]['id']
            var tag_name = data['objects'][i]['tag']['tag_name'];
            if (tag_list.indexOf(tag_name)>-1){
                $('#'+tag_name).append("<li><a href="+where+">"+description+"</a><button class='delete' id='"+id+"'>delete</button></br></li>");
            } else {
                tag_list.push(data['objects'][i]['tag']['tag_name']);
                $myTags.append("<ul class='tag' id="+tag_name+">"+tag_name+"</br></ul>");
                $('#'+tag_name).append("<li><a href="+where+">"+description+"</a><button class='delete' id='"+id+"'>delete</button></br></li>");
            }
        }

    });


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
        window.Api.post_bookmark(inputData).error(function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
        });

        $('#button_add').show();

    });

/////////////////////////////////////////////////delete bookmark work on console but not here/////////////////////////////////
    $('.delete').on('click', function(ev){
        $(this).parent().remove();
        delete_id = $(this).attr('id');
        alert(delete_id);
        window.Api.delete_bookmark(delete_id).success(function(ev){
            console.log('delete');
        })
    });
})


