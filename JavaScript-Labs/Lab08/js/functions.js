/* 1. Hàm in danh sách Continents */
function outputContinents() {
    document.write('<ul class="list-group">');
    for (var i = 0; i < continents.length; i++) {
        document.write('<li class="list-group-item"><a href="#">' + continents[i] + '</a></li>');
    }
    document.write('</ul>');
}

/* 2. Hàm in danh sách Popular Countries */
function outputCountries() {
    document.write('<ul class="list-group">');
    for (var i = 0; i < countries.length; i++) {
        if (countries[i] === "Canada") {
            document.write('<li class="list-group-item active">' + countries[i] + '</li>');
        } else {
            document.write('<li class="list-group-item"><a href="#">' + countries[i] + '</a></li>');
        }
    }
    document.write('</ul>');
}

/* 3. Hàm in từng bài viết Post */
function outputPostRow(post) {
    document.write('<div class="row">');
    document.write('  <div class="col-md-2">');
    document.write('    <a href="post.php?id=' + post.id + '"><img src="images/travel/' + post.thumb + '" alt="' + post.title + '" class="img-thumbnail"/></a>');
    document.write('  </div>');
    document.write('  <div class="col-md-10">');
    document.write('    <h2>' + post.title + '</h2>');
    document.write('    <div class="details">Posted by ' + post.user + ' <span class="pull-right">' + post.postdate + '</span></div>');
    document.write('    <p class="excerpt">' + post.excerpt + '</p>');
    document.write('    <p><a href="post.php?id=' + post.id + '" class="btn btn-primary btn-sm">Read more</a></p>');
    document.write('  </div>');
    document.write('</div>');
    document.write('<hr/>');
}

function outputPosts() {
    for (var i = 0; i < posts.length; i++) {
        outputPostRow(posts[i]);
    }
}

/* 4. Hàm in thanh phân trang Pagination */
function outputPagination() {
    document.write('<ul class="pagination">');
    document.write('  <li><a href="#">&laquo;</a></li>');
    for (var i = 1; i <= 9; i++) {
        if (i === 4) {
            document.write('  <li class="active"><a href="#">' + i + '</a></li>');
        } else {
            document.write('  <li><a href="#">' + i + '</a></li>');
        }
    }
    document.write('  <li><a href="#">&raquo;</a></li>');
    document.write('</ul>');
}