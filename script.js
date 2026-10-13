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
const formEndpoint = "https://formsubmit.app/f/cwrkzmsczm";
if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) {
      return;
    }
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const business = String(formData.get("business") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const service = String(formData.get("service") || "");
    const message = String(formData.get("message") || "").trim();
    const enquiry = [
      "Hello NovaWeb Studio!",
      "",
      `Name: ${name}`,
      `Business: ${business}`,
      `Email: ${email}`,
      `Service: ${service}`,
      `Project details: ${message || "Not provided"}`
    ].join("\n");
    // Include all existing form fields in the submission.
    formData.set("name", name);
    formData.set("business", business);
    formData.set("email", email);
    formData.set("service", service);
    formData.set("message", message);
    formData.set("_subject", `Website enquiry from ${name}`);
    formStatus.textContent = "Sending your enquiry...";
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
        formStatus.textContent = "Enquiry copied. You can paste it into an email or WhatsApp.";
      } catch {
        window.prompt("Copy your enquiry below:", enquiry);
      }
    };
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
      "mailto:novawebstudio.za@gmail.com?subject=" +
      encodeURIComponent("Website enquiry from " + name) +
      "&body=" +
      encodeURIComponent(enquiry);
    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });
      const result = await response.json();
      if (!response.ok || result.ok === false) {
        throw new Error("Submission was not accepted.");
      }
      formStatus.textContent =
        "Thank you! Your enquiry has been submitted. We'll be in touch soon.";
      contactForm.reset();
    } catch (error) {
      formStatus.textContent =
        "We couldn't confirm your enquiry was sent. Please use Open email draft or Copy enquiry below.";
    }
  });
}

