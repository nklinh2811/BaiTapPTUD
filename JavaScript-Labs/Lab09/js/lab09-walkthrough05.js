
// this variable has global scope
var boxClass = 'movingDiv';

function outputBox(num) {
   var box = "<div class='" + boxClass + "' id='div" + num + "'>";
   box += "This is div " + num;
   box += "</div>";
   return box;
}

/* Exercise 9.6: Gắn sự kiện mouseover cho tất cả thẻ div có class movingDiv */
window.addEventListener("load", function() {
    var divs = document.querySelectorAll(".movingDiv");
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener("mouseover", function(e) {
            alert("triggered by " + e.target.id);
        });
    }
});