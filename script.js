/* ========================================
   NOVAWEB STUDIO - JAVASCRIPT
======================================== */

// 1. MOBILE HAMBURGER MENU

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close the menu after clicking a navigation link.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.textContent = "☰";
    });
  });

  // Close the menu if the user presses Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.textContent = "☰";
    }
  });
}

// 2. AUTOMATIC COPYRIGHT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// 3. CONTACT FORM

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const formData = new FormData(contactForm);

    const name = formData.get("name").trim();
    const business = formData.get("business").trim();
    const email = formData.get("email").trim();
    const service = formData.get("service");
    const message = formData.get("message").trim();

    const enquiry = [
      "Hello NovaWeb Studio!",
      "",
      `Name: ${name}`,
      `Business: ${business}`,
      `Email: ${email}`,
      `Service: ${service}`,
      `Project details: ${message || "Not provided"}`
    ].join("\n");

    formStatus.textContent =
      "Your enquiry is ready. Choose how you'd like to send it.";

    // Create a temporary button to copy the enquiry.
    let copyButton = document.getElementById("copy-enquiry");

    if (!copyButton) {
      copyButton = document.createElement("button");
      copyButton.id = "copy-enquiry";
      copyButton.type = "button";
      copyButton.className = "btn btn-outline";
      copyButton.textContent = "Copy enquiry";
      formStatus.insertAdjacentElement("afterend", copyButton);
    }

    copyButton.onclick = async () => {
      try {
        await navigator.clipboard.writeText(enquiry);
        formStatus.textContent =
          "Enquiry copied. You can now paste it into your email or WhatsApp.";
      } catch {
        formStatus.textContent =
          "Copy wasn't available. Please select and copy your enquiry details manually.";
        window.prompt("Copy your enquiry below:", enquiry);
      }
    };

    // Offer an email draft without pretending it has been sent.
    let emailButton = document.getElementById("email-enquiry");

    if (!emailButton) {
      emailButton = document.createElement("a");
      emailButton.id = "email-enquiry";
      emailButton.className = "btn btn-primary";
      emailButton.textContent = "Open email draft";
      emailButton.style.marginTop = "8px";
      copyButton.insertAdjacentElement("afterend", emailButton);
    }

    emailButton.href =
      "mailto:?subject=" +
      encodeURIComponent("Website enquiry from " + name) +
      "&body=" +
      encodeURIComponent(enquiry);

    emailButton.target = "_self";
  });
}

// 4. CONSOLE MESSAGE FOR DEVELOPERS

console.log(
  "NovaWeb Studio loaded successfully. Remember to test every link and form."
);