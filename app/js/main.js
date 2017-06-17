document.getElementById("search-btn").onclick = function() {
  wikiReader();
};

function wikiReader() {
  // e.preventDefault();
  var title = document.getElementById("search").value;
  var api = 'https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=15&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&generator=search&origin=*&gsrsearch=';

  var link = api + title;

  var context;

  getJSON(link, function(err, data) {
    if (err !== null) {
      alert('Something went wrong: ' + err);
    } else {
      context = data.query;

      // Pass our data to the template
      var theCompiledHtml = Handlebars.templates.wiki(context);

      // Add the compiled html to the page
      document.getElementById("content-wrapper").innerHTML = theCompiledHtml;
    }
  });
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};
