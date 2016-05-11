$(".subjectcheck").click(function() {
    var selected_value = [];
    $(".subjectcheck:checked").each(function(){
        selected_value.push($(this).val());
    });
    selected_value.push('Art competition');
    var data = {};
    data.title = selected_value;
    $.ajax({
        type: 'Post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/',
        success: function(data) {
            $('.content').html(data);
            $('table').css("display","block");
        }
    });
});

$('input:checkbox.subjectcheck').click(function() {
    var isCheck = $(this).is(':checked');
    var index = $(this).index('.subjectcheck');
    $('#form-control'+index).prop('disabled', !isCheck);

    var k = 0;
    $('input:checkbox.subjectcheck').each(function() {
        if($(this).is(':checked'))
            k++;
    });

    if(k > 2)
        $('#btnRating').removeAttr('disabled');
    if(k < 3)
        $('#btnRating').attr("disabled", "disabled");
});

$('input.form-control').on('change keyup', function() {
    var value = $(this).val();
    if(value < 100 || value > 200 ) {
        $(this).css("border-color", "red");
    }
    else {
        $(this).css("border-color", "#ccc");
     }
    $('table').find('.td-info-rating .rating_value').text("");
    $('table').find('.td-info-rating .rating_text').text("");
});

$('#btnRating').click(function()  {
    $('tr').each(function(){
        var sum = 0;
        var koef_value = [];
        var min_value = [];
        var subject_no_requere = [];
        var subject_no_requere_value = [];
        var subject_requere = 0;
        var selected_value = 0;
        var i = 0;
        var flag = 0;


        // отримати коефіцієнти предметів для кожного напряму підготоввки
        $(this).find('.td-info-ball .weight').each(function() {
            koef_value.push($(this).text());
        });
        $(this).find('.td-info-ball .minball').each(function() {
            min_value.push($(this).text());
        });
        // отримати вибрані обов"язкові предмети та по них розрахувати конкурсний бал
        $(this).find('input.require-idsubject').each(function() {
            subject_requere = $(this).val();
            if ( (subject_requere == 'Art competition')){
                flag = 1;
            }
            $(".subjectcheck:checked").each(function(){
                selected_value = $(this).val();
                var index = $(this).index('.subjectcheck');
                if(subject_requere == selected_value) {
                    sum += $('#form-control' + index).val() * koef_value[i];
                    if ($('#form-control' + index).val() < min_value[i]) {
                        flag = 1;
                    }
                    i++;
                }
            });
        });
        // отримати вибрані необов"язкові предмети та їхні бали
        $(this).find('input.no-require-idsubject').each(function() {
                subject_no_requere = ($(this).val());
                $(".subjectcheck:checked").each(function(){
                    selected_value = $(this).val();
                    var index = $(this).index('.subjectcheck');
                    if(subject_no_requere == selected_value) {
                        subject_no_requere_value.push($('#form-control' + index).val());
                        i++;
                    }
                });
            });
        // розрахувати по найбільшому балові із необов"якових предметів конкурсний бал та отримати загальний конкурсний бал по напряму
        subject_no_requere_value.sort().reverse();
        sum += subject_no_requere_value[0] * koef_value[2];
        console.log("flag", flag);
        if( flag == 0 ) {
            $(this).find('.td-info-rating .rating_value').text(sum);
            $(this).find('.td-info-rating .rating_text').text("Конкурсний бал: ");
        }
        flag = 0;
        console.log("tr");
    });
});


