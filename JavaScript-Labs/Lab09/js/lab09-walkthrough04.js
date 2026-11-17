/* Xử lý sự kiện click nút Hide/Show có hiệu ứng chuyển cảnh */
function simpleHandler(event) {
    var content = document.getElementById("content");
    if (btn.innerHTML == "Hide") {
        btn.innerHTML = "Show";
        content.className = "makeItDisappear";
        // đổi chế độ hiển thị sau 1000ms
        setTimeout(function() {
            content.style.display = "none";
        }, 1000);
    } else {
        btn.innerHTML = "Hide";
        content.style.display = "block";
        // đổi lại class ban đầu sau 500ms
        setTimeout(function() {
            content.className = "makeItNormal";
        }, 500);
    }
}

var btn = document.getElementById("testButton");
btn.addEventListener("click", simpleHandler);

/* Xử lý sự kiện di chuột qua ảnh */
var img = document.getElementById("mainImage");

img.addEventListener("mouseover", function(event) {
    img.className = "makeItGray";
});

img.addEventListener("mouseout", function(event) {
    img.className = "makeItNormal";
});
