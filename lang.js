(function () {
  var STORAGE_KEY = "mariusz-portfolio-lang";

  function storedLang() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      if (value === "pl" || value === "en") return value;
    } catch (err) {}
    return null;
  }

  function remember(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {}
  }

  function hashLang() {
    var value = (window.location.hash || "").replace(/^#/, "");
    if (value === "pl" || value === "en") return value;
    return null;
  }

  function apply(lang) {
    document.documentElement.lang = lang;

    var nodes = document.querySelectorAll("[data-pl][data-en]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = nodes[i].getAttribute(lang === "en" ? "data-en" : "data-pl");
    }

    var buttons = document.querySelectorAll(".lang-switch [data-lang]");
    for (var j = 0; j < buttons.length; j++) {
      var active = buttons[j].getAttribute("data-lang") === lang;
      buttons[j].classList.toggle("is-active", active);
      buttons[j].setAttribute("aria-pressed", active ? "true" : "false");
    }

    var links = document.querySelectorAll("a[data-nav]");
    for (var k = 0; k < links.length; k++) {
      var file = links[k].getAttribute("href").split("#")[0].split("?")[0];
      links[k].setAttribute("href", file + "#" + lang);
    }

    var downloads = document.querySelectorAll("a[data-href-pl][data-href-en]");
    for (var d = 0; d < downloads.length; d++) {
      downloads[d].setAttribute(
        "href",
        downloads[d].getAttribute(lang === "en" ? "data-href-en" : "data-href-pl")
      );
    }

    var switcher = document.querySelector(".lang-switch");
    if (switcher) {
      switcher.setAttribute("aria-label", lang === "en" ? "Language" : "Język");
    }

    remember(lang);

    try {
      if ((window.location.hash || "") !== "#" + lang) {
        history.replaceState(null, "", window.location.pathname + window.location.search + "#" + lang);
      }
    } catch (err) {}
  }

  var initial = hashLang() || storedLang() || "pl";
  apply(initial);

  var controls = document.querySelectorAll(".lang-switch [data-lang]");
  for (var n = 0; n < controls.length; n++) {
    controls[n].addEventListener("click", function () {
      apply(this.getAttribute("data-lang"));
    });
  }
})();
