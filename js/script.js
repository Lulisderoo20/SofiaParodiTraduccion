const CONTACT_EMAIL = "sofiaparoditraduccion@gmail.com";

const navBtn = document.getElementById("nav-btn");
const navLinks = document.getElementById("nav-links");
const toTop = document.getElementById("to-top");
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

function closeMenu() {
  navLinks.classList.add("nav-links--hidden");
  navBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
}

if (navBtn && navLinks) {
  navBtn.addEventListener("click", () => {
    const opening = navLinks.classList.toggle("nav-links--hidden") === false;
    navBtn.setAttribute("aria-expanded", String(opening));
    document.body.classList.toggle("nav-open", opening);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 900) {
        closeMenu();
      }
    });
  });
}

if (toTop) {
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("form-name").value.trim();
    const email = document.getElementById("form-email").value.trim();
    const message = document.getElementById("form-message").value.trim();

    if (!name || !email || !message) {
      formNote.textContent = "Completá todos los campos obligatorios.";
      return;
    }

    const subject = encodeURIComponent(`Consulta de traducción - ${name}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    formNote.textContent = "Se abrió tu cliente de correo para enviar la consulta.";
  });
}
