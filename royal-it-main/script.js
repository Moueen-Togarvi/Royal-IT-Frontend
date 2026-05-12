function createInfiniteScroll(rowElement, speed, direction = 1) {
  if (!rowElement || !rowElement.children.length) {
    return;
  }

  let pos = 0;

  function step() {
    if (!rowElement.isConnected || !rowElement.children.length) {
      return;
    }

    pos += speed * direction;
    rowElement.style.transform = `translateX(${pos}px)`;

    const firstChild = rowElement.children[0];
    const lastChild = rowElement.children[rowElement.children.length - 1];

    if (!firstChild || !lastChild) {
      requestAnimationFrame(step);
      return;
    }

    const firstRect = firstChild.getBoundingClientRect();
    const lastRect = lastChild.getBoundingClientRect();

    if (direction === 1) {
      if (firstRect.right < 0) {
        rowElement.appendChild(firstChild);
        pos += firstRect.width + 40;
        rowElement.style.transform = `translateX(${pos}px)`;
      }
    } else if (lastRect.left > window.innerWidth) {
      rowElement.insertBefore(lastChild, rowElement.children[0]);
      pos -= lastRect.width + 40;
      rowElement.style.transform = `translateX(${pos}px)`;
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

window.addEventListener("load", () => {
  const rowLeft = document.getElementById("row-left");
  const rowRight = document.getElementById("row-right");

  if (rowLeft) {
    createInfiniteScroll(rowLeft, 1.5, 1);
  }

  if (rowRight) {
    createInfiniteScroll(rowRight, 1.5, -1);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const viewMoreBtn = document.getElementById("viewMoreBtn");
  const viewLessBtn = document.getElementById("viewLessBtn");
  const extraServices = document.querySelectorAll(".extra-service");

  if (viewMoreBtn && viewLessBtn && extraServices.length) {
    viewMoreBtn.addEventListener("click", () => {
      extraServices.forEach((card) => card.classList.remove("d-none"));
      viewMoreBtn.classList.add("d-none");
      viewLessBtn.classList.remove("d-none");
    });

    viewLessBtn.addEventListener("click", () => {
      extraServices.forEach((card) => card.classList.add("d-none"));
      viewLessBtn.classList.add("d-none");
      viewMoreBtn.classList.remove("d-none");
    });
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm && typeof emailjs !== "undefined") {
    emailjs.init("xzBpQi5U68rp562Lu");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const selectedServices = document.getElementById("selected_services");
      const checkedServices = document.querySelectorAll(".service-chk:checked");
      if (selectedServices) {
        const servicesArray = Array.from(checkedServices, (checkbox) => checkbox.value);
        selectedServices.value = servicesArray.join(", ");
      }

      const statusMsg = document.getElementById("status-message");
      const btn = document.getElementById("submitBtn");
      if (!statusMsg || !btn) {
        return;
      }

      const originalBtnText = btn.innerText;
      btn.innerText = "Sending...";
      btn.disabled = true;
      statusMsg.innerText = "";

      emailjs
        .sendForm("service_kkw0omk", "template_t4n5g19", this)
        .then(() => {
          statusMsg.innerText = "✅ Inquiry Sent Successfully!";
          statusMsg.className = "success-msg";
          this.reset();
        })
        .catch((err) => {
          statusMsg.innerText = "❌ Failed to send. Check internet connection.";
          statusMsg.className = "error-msg";
          console.error("EmailJS Error:", err);
        })
        .finally(() => {
          btn.innerText = originalBtnText;
          btn.disabled = false;
        });
    });
  }

  if (typeof bootstrap !== "undefined") {
    const navbarCollapseEl = document.getElementById("mainNavbar");
    if (navbarCollapseEl) {
      const collapseInstance =
        bootstrap.Collapse.getOrCreateInstance(navbarCollapseEl, { toggle: false });
      const mobileNavTriggers = navbarCollapseEl.querySelectorAll(
        '[data-bs-toggle="offcanvas"], a, .language-menu button'
      );

      mobileNavTriggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
          if (window.innerWidth < 992 && navbarCollapseEl.classList.contains("show")) {
            collapseInstance.hide();
          }
        });
      });
    }
  }
});

if (typeof AOS !== "undefined") {
  AOS.init({ duration: 800, once: true });
}
