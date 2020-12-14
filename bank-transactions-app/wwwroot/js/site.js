// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// Loading Animation
$(function () {
    $('#loaderbody').addClass('hide');
    $(document).bind('ajaxStart', function () {
        $('#loaderbody').removeClass('hide');
    }).bind('ajaxStop', function () {
        $('#loaderbody').addClass('hide');
    });
})


//Dynamcially Renders Modal Popup via injection of new or existing transaction model
showInPop = (url, title) => {
    $.ajax({
        type: 'GET', 
        url: url, 
        success: function (res) {
            //res is a view with an attached transactionmodel()
            $('#form-modal .modal-body').html(res);
            $('#form-modal .modal-title').html(title);
            $('#form-modal').modal('show');
        }
    });
}

//Add or edits a transaction and returns html string to be rendered in #view-all in _ViewAll
jQueryAjaxPost = form => {

    try
    {
        $.ajax({
            type: 'POST', 
            url: form.action, 
            data: new FormData(form), 
            contentType: false, 
            processData: false, 
            success: function (res) {
               
                if (res.isValid)
                {                   
                    //response is an html string Helper.RenderRazerViewToString()
                    $('#view-all').html(res.html);

                    $('#form-modal .modal-body').html('');
                    $('#form-modal .modal-title').html('');
                    $('#form-modal').modal('hide');
                }
                else
                {
                    //response is an html string Helper.RenderRazerViewToString()
                    $('#form-modal .modal-body').html(res.html);
                }
            },
            error: function (err) {              
                console.log(err);
            }
        });
        //To prevent form submit event
        return false;
    } catch (e)
    {
        console.log(e)
    }


}

//Deletes transaction record and returns html string to be injected into #view-all partial view _ViewAll
jQueryAjaxDelete = form =>
{
    if (confirm("Are you sure you want to delte this record?"))
    {
        try
        {
            $.ajax({
                type: 'POST',
                url: form.action,  
                data: new FormData(form),
                contentType: false,
                processData: false, 
                success: function (res) {
                    //response is an html string Helper.RenderRazerViewToString()
                    $('#view-all').html(res.html);
                  
                },
                error: function (err) {
                    console.log(err);
                }
            });
            //To prevent form submit event
            return false;
        } catch (e)
        {
            console.log(e);
        }
    }
}