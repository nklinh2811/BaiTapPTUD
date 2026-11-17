/* Tạo và chèn thêm phần tử <p> mới vào #first */
var first = document.getElementById("first");
var text = document.createTextNode("this is programmatically created");
var p = document.createElement("p");
p.appendChild(text);
first.appendChild(p);

/* Xóa phần tử <li id="deleteThisOne"> khỏi danh sách #iconList */
var icons = document.getElementById("iconList");
icons.removeChild(document.getElementById("deleteThisOne"));