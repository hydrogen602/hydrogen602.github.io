function includeHTML() {

    var z = document.getElementsByTagName("*");

    var elem
    for (var i = 0; i < z.length; i++) {
      elem = z[i];

      fileToGet = elem.getAttribute("custom-include-html");
      if (fileToGet) {

        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {elem.innerHTML = this.responseText;}
            if (this.status == 404) {elem.innerHTML = "404: Page not found";}

            elem.removeAttribute("custom-include-html");
            includeHTML();
          }
        }
        request.open("GET", fileToGet, true);
        request.send();

        return;
      }
    }
}