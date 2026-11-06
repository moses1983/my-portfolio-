
(() => {
  // Hide navbar while scrolling down, show it when scrolling up.
  const navbar = document.querySelector(".site-navbar");
  let previousScroll = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll < 80 || currentScroll < previousScroll) {
      navbar.classList.remove("navbar-hidden");
    } else if (currentScroll > previousScroll + 4) {
      navbar.classList.add("navbar-hidden");
    }

    previousScroll = currentScroll;
  }, { passive: true });

  // Close mobile menu after clicking a navigation link.
  document.querySelectorAll("#navbarNav a").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.querySelector("#navbarNav");

      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Automatically update copyright year.
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Contact form with Formspree.
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  if (form && status) {
    form.addEventListener("submit", async event => {
      event.preventDefault();

      const button = form.querySelector(".send-button");
      const buttonText = button.querySelector(".send-text");

      status.textContent = "";
      status.className = "form-status";
      button.disabled = true;
      buttonText.textContent = "Sending...";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          form.reset();
          status.textContent =
            "Thanks! Your message has been sent successfully.";
          status.classList.add("success");
        } else {
          status.textContent =
            "Message could not be sent. Please try again.";
          status.classList.add("error");
        }
      } catch (error) {
        status.textContent =
          "Network error. Please check your connection or email me directly.";
        status.classList.add("error");
      } finally {
        button.disabled = false;
        buttonText.textContent = "Send message";
      }
    });
  }
})();
