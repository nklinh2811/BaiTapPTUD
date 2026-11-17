/* Exercise 10.10: jqXHR Handling (.done, .fail, .always) */
$(function() {
    $('.animLoading').hide();

    $("#consume").click(function() {
        $('.animLoading').show();
        var url = "http://www.randyconnolly.com/funwebdev/services/travel/cities.php";

        $.get(url)
            // Thực thi trước khi tải dữ liệu thành công
            .done(function(data) {
                $("#results").html("<ul></ul>");
                $.each(data, function(index, value) {
                    var li = $('<li/>').html(value.name);
                    li.appendTo("div#results ul");
                });
            })
            // Thực thi nếu xảy ra lỗi (trước always)
            .fail(function(xhr, status, error) {
                alert("failed loading data status=" + status + " error=" + error);
            })
            // Luôn luôn thực thi sau cùng để tắt biểu tượng loading
            .always(function(data) {
                $('.animLoading').fadeOut("slow");
            });
    });
});