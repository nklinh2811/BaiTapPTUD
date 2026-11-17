var daysOfWeek = new Array("Mon", "Tues", "Wed", "Thur", "Fri");
daysOfWeek.push("Sat");
daysOfWeek.unshift("Sun");

document.write("<table border=1>");
document.write("<tr>");
for (var i = 0; i < daysOfWeek.length; i++) {
    if (daysOfWeek[i].length < 4) {
        day = daysOfWeek[i];
    } else {
        day = "<em>" + daysOfWeek[i] + "</em>";
    }
    document.write("<th>" + day + "</th>");
}
document.write("</tr>");

/* In các ngày từ 1 đến 30 */
for (var j = 1; j <= 30; j++) {
    if (j % 7 == 1) {
        document.write("<tr>");
    }
    document.write("<td>" + j + "</td>");
    if (j % 7 == 0) {
        document.write("</tr>");
    }
}
document.write("</table>");