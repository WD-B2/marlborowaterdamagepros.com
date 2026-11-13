(function () {
  "use strict";
  var BP = 768;
  var doc = document.documentElement;
  var toggle = document.getElementById("mob-toggle");
  var drawer = document.getElementById("mob-drawer");
  var closeBtn = document.getElementById("drawer-close");

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    doc.style.overflow = "hidden";
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    doc.style.overflow = "";
  }
  if (toggle && drawer) {
    toggle.addEventListener("click", openDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    drawer.addEventListener("click", function (e) {
      if (e.target === drawer) closeDrawer();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > BP) closeDrawer();
    });
  }

  var dds = document.querySelectorAll(".has-dropdown > a");
  Array.prototype.forEach.call(dds, function (a) {
    a.addEventListener("click", function (e) {
      if (window.matchMedia("(hover: none)").matches) {
        var li = a.parentNode;
        if (!li.classList.contains("open")) {
          e.preventDefault();
          li.classList.add("open");
        }
      }
    });
  });
  document.addEventListener("click", function (e) {
    Array.prototype.forEach.call(document.querySelectorAll(".has-dropdown.open"), function (li) {
      if (!li.contains(e.target)) li.classList.remove("open");
    });
  });

  var qs = document.querySelectorAll(".faq-q");
  Array.prototype.forEach.call(qs, function (q) {
    q.addEventListener("click", function () {
      var panel = q.nextElementSibling;
      var open = q.getAttribute("aria-expanded") === "true";
      q.setAttribute("aria-expanded", open ? "false" : "true");
      panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
    });
  });
  window.addEventListener("resize", function () {
    Array.prototype.forEach.call(document.querySelectorAll('.faq-q[aria-expanded="true"]'), function (q) {
      q.nextElementSibling.style.maxHeight = q.nextElementSibling.scrollHeight + "px";
    });
  });
})();
