(function () {
  var newsList = document.getElementById("aktualnosci-list");
  var lifeList = document.getElementById("poza-praca-list");
  if (!newsList && !lifeList) return;

  function currentLang() {
    return document.documentElement.lang === "en" ? "en" : "pl";
  }

  function pick(item, plKey, enKey) {
    var pl = item[plKey] || "";
    var en = item[enKey] || "";
    return currentLang() === "en" ? en || pl : pl || en;
  }

  function setBilingual(node, pl, en) {
    node.setAttribute("data-pl", pl || "");
    node.setAttribute("data-en", en || "");
    node.textContent = currentLang() === "en" ? en || pl || "" : pl || en || "";
  }

  function linkedinCard(item) {
    var card = document.createElement(item.url ? "a" : "article");
    card.className = "feed-card";
    if (item.url) {
      card.href = item.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }

    var head = document.createElement("div");
    head.className = "feed-head";
    var avatar = document.createElement("img");
    avatar.className = "feed-avatar";
    avatar.src = "cv_zdjecie.jpg";
    avatar.alt = "";
    var meta = document.createElement("div");
    meta.className = "feed-meta";
    var name = document.createElement("p");
    name.className = "feed-name";
    name.textContent = "Adela Hopek";
    var role = document.createElement("p");
    role.className = "feed-role";
    role.textContent = "Quality Assurance Engineer / Business Analyst";
    meta.appendChild(name);
    meta.appendChild(role);
    head.appendChild(avatar);
    head.appendChild(meta);
    card.appendChild(head);

    var body = document.createElement("p");
    body.className = "feed-text";
    setBilingual(body, item.text_pl, item.text_en);
    card.appendChild(body);

    var more = document.createElement("p");
    more.className = "feed-more";
    setBilingual(more, "więcej", "see more");
    card.appendChild(more);

    if (item.image) {
      var photo = document.createElement("img");
      photo.className = "feed-photo";
      photo.src = item.image;
      photo.alt = "";
      card.appendChild(photo);
    }
    return card;
  }

  function instagramCard(item) {
    var card = document.createElement(item.url ? "a" : "article");
    card.className = "feed-card";
    if (item.url) {
      card.href = item.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }
    if (item.image) {
      var photo = document.createElement("img");
      photo.className = "feed-photo";
      photo.src = item.image;
      photo.alt = pick(item, "caption_pl", "caption_en") || "Pracownia ceramiczna";
      card.appendChild(photo);
    }
    var body = document.createElement("p");
    body.className = "feed-text";
    setBilingual(body, item.caption_pl, item.caption_en);
    card.appendChild(body);
    return card;
  }

  function fill(list, emptyId, items, build) {
    var empty = document.getElementById(emptyId);
    list.textContent = "";
    if (!items.length) {
      if (empty) empty.classList.remove("is-hidden");
      return;
    }
    if (empty) empty.classList.add("is-hidden");
    for (var i = 0; i < items.length && i < 2; i++) {
      list.appendChild(build(items[i]));
    }
  }

  fetch("aktualnosci.json", { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("aktualnosci");
      return response.json();
    })
    .then(function (data) {
      fill(newsList, "aktualnosci-empty", data.linkedin || [], linkedinCard);
      fill(lifeList, "poza-praca-empty", data.instagram || [], instagramCard);
    })
    .catch(function () {});
})();
