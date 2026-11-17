/* Exercise 10.7: More jQuery Animation - Image Hover Preview */
$(function () {
    $('figure img').on('mouseover', function (e) {
        // Tạo đường dẫn ảnh cỡ trung bình từ ảnh nhỏ hiện tại
        var alt = $(this).attr('alt');
        var src = $(this).attr('src');
        var newsrc = src.replace("small", "medium");

        // Tạo phần tử preview động chứa ảnh lớn và chú thích
        var preview = $('<div id="preview"></div>');
        var image = $('<img src="' + newsrc + '">');
        var caption = $('<p>' + alt + '</p>');

        preview.append(image);
        preview.append(caption);
        $('body').append(preview);

        // Làm xám ảnh nhỏ gốc
        $(this).addClass("gray");

        // Hiển thị dần khung preview
        $("#preview").fadeIn(1000);
    });

    function removePreview() {
        // Xóa khung preview động và bỏ hiệu ứng xám
        $(this).removeClass("gray");
        $("#preview").remove();
    }

    function movePreview(e) {
        // Cập nhật vị trí khung preview theo tọa độ con trỏ chuột
        $("#preview")
            .css("top", (e.pageY - 10) + "px")
            .css("left", (e.pageX + 30) + "px");
    }

    $("figure img").on("mouseleave", removePreview);
    $("figure img").on("mousemove", movePreview);
});
