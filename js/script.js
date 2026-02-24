const OWNER_WHATSAPP = "5491126601086";
const SOFIA_WHATSAPP = "";

// Reemplazar por tu email para que el formulario tambien abra un correo dirigido a vos.
const OWNER_EMAIL = "lulisdero20@gmail.com";

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
      formNote.textContent = "Completa todos los campos obligatorios.";
      return;
    }

    const plainBody = [
      "Consulta de traduccion",
      `Nombre: ${name}`,
      `Email: ${email}`,
      "",
      "Mensaje:",
      message,
    ].join("\n");

    const encodedSubject = encodeURIComponent(`Consulta de traduccion - ${name}`);
    const encodedBody = encodeURIComponent(plainBody);

    const whatsappTargets = [OWNER_WHATSAPP, SOFIA_WHATSAPP]
      .map((value) => value.trim())
      .filter(Boolean);

    whatsappTargets.forEach((phone) => {
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(plainBody)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });

    if (OWNER_EMAIL.trim()) {
      window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
    }

    if (!OWNER_EMAIL.trim()) {
      formNote.textContent =
        "WhatsApp abierto. Para enviar tambien por email, configura OWNER_EMAIL en js/script.js.";
      return;
    }

    formNote.textContent = "Se abrio correo y WhatsApp con la consulta cargada.";
  });
}
