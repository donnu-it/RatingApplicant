
$(".subjectcheck").click(function() {
    var selected_value = []; // initialize empty array
    $(".subjectcheck:checked").each(function(){
        selected_value.push($(this).val());
    });
    console.log(selected_value);


    var data = {};
    data.title = selected_value;

    $.ajax({
        type: 'Post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:3000/',
        success: function(data) {
            console.log('success');
            console.log(JSON.stringify(data));
            $('table').css("display","block");
            $('table').html(data);
        }
    });
});