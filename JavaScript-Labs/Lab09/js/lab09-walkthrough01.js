/* Thay đổi tiêu đề và lấy nội dung DOM */
document.getElementById("pageTitle").innerHTML = "Even newer title";

var msg = document.getElementById("msgArea");
msg.value = "My class is " + msg.getAttribute("class");

var elem = document.getElementsByTagName("textarea");
elem[0].value = "selected by tag name";

/* Lấy nội dung các thẻ span */
elem = document.getElementsByTagName("span");
for (var i = 0; i < elem.length; i++) {
    document.getElementById("msgArea").value += "\n" + elem[i].innerText;
}

/* Lấy nội dung các phần tử có class count-number */
document.getElementById("msgArea").value = "";
var counts = document.getElementsByClassName("count-number");
for (var i = 0; i < counts.length; i++) {
    document.getElementById("msgArea").value += "\n" + counts[i].innerText;
}

/* Dùng querySelector và querySelectorAll */
var ps = document.querySelector("#first p");
document.getElementById("msgArea").value = ps.innerHTML;

ps = document.querySelectorAll("#first p");
document.getElementById("msgArea").value = "";
for (var i = 0; i < ps.length; i++) {
    document.getElementById("msgArea").value += ps[i].innerHTML + "\n";
}

/* Thay đổi thuộc tính và CSS inline */
// document.getElementById("msgArea").setAttribute("class", "hidden");
document.getElementById("features").style.backgroundColor = "green";