/* Exercise 10.5: Inserting DOM Elements */
$(function () {
    // Tạo phần tử DOM mới
    var img = $('<img src="images/art/thumbs/13030.jpg" >');
    // Chèn phần tử mới vào trước .panel
    var panel = $('.panel');
    img.insertBefore(panel);
});