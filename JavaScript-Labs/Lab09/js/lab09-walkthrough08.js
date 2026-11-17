/* Thiết lập sự kiện submit cho biểu mẫu */
function init() {
    document.getElementById("sampleForm").addEventListener("submit", checkForEmptyFields);
}

/* Khởi tạo trình lắng nghe sự kiện sau khi trang tải xong */
window.addEventListener("load", init);

/* Kiểm tra các trường dữ liệu bị bỏ trống */
function checkForEmptyFields(e) {
    // Ẩn khung thông báo lỗi trước khi kiểm tra lại
    var errorArea = document.getElementById("errors");
    errorArea.className = "hidden";

    var cssSelector = "input[type=text], input[type=password]";
    var fields = document.querySelectorAll(cssSelector);

    // Duyệt qua các ô input để tìm ô rỗng
    var fieldList = [];
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].value == null || fields[i].value == "") {
            // Ngăn form gửi đi nếu có ô bị bỏ trống
            e.preventDefault();
            fieldList.push(fields[i]);
        }
    }

    // Tạo thông báo lỗi và hiển thị ra khung #errors
    var msg = "The following fields can't be empty: ";
    if (fieldList.length > 0) {
        for (var i = 0; i < fieldList.length; i++) {
            msg += fieldList[i].id + ",";
        }
        errorArea.innerHTML = "<p>" + msg + "</p>";
        errorArea.className = "visible";
    }
}