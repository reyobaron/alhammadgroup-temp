const yearElement = document.getElementById("year");
const nav = document.getElementById("siteNav");
const menuToggle = document.querySelector(".menu-toggle");
const languageButtons = document.querySelectorAll(".lang-btn");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  for (const navLink of nav.querySelectorAll("a")) {
    navLink.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  }
}

for (const languageButton of languageButtons) {
  languageButton.addEventListener("click", () => {
    const targetLanguage = languageButton.dataset.langTarget;
    if (!targetLanguage) {
      return;
    }

    document.body.dataset.lang = targetLanguage;

    for (const button of languageButtons) {
      button.classList.toggle("is-active", button === languageButton);
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    }
  },
  {
    threshold: 0.12,
  }
);

for (const element of document.querySelectorAll(".reveal")) {
  revealObserver.observe(element);
}