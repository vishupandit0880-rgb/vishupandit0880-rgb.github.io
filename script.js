/* =========================================================
   SCROLL REVEAL
========================================================= */

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }

    });

  },
  {
    threshold: 0.10
  }
);


document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));


/* =========================================================
   FLIP CARDS
========================================================= */

function flip(card) {
  card.classList.toggle("flipped");
}


document
  .querySelectorAll(".flip-card")
  .forEach((card) => {

    card.setAttribute("tabindex", "0");

    card.addEventListener("keydown", (event) => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        card.classList.toggle("flipped");
      }

    });

  });


/* =========================================================
   NAVIGATION
========================================================= */

const navLinks =
  document.querySelectorAll(".bottom-nav a");


const sections = [
  "home",
  "about",
  "lab",
  "profiles",
  "projects",
  "achievements",
  "contact"
];


function updateNavigation() {

  let currentSection = "home";

  sections.forEach((id) => {

    const section =
      document.getElementById(id);

    if (!section) return;


    const sectionTop =
      section.getBoundingClientRect().top;


    if (sectionTop <= 250) {
      currentSection = id;
    }

  });


  navLinks.forEach((link) => {

    const target =
      link.getAttribute("href");

    link.classList.toggle(
      "active",
      target === "#" + currentSection
    );

  });

}


window.addEventListener(
  "scroll",
  updateNavigation,
  {
    passive: true
  }
);


window.addEventListener(
  "load",
  updateNavigation
);


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

navLinks.forEach((link) => {

  link.addEventListener("click", (event) => {

    const target =
      link.getAttribute("href");

    const section =
      document.querySelector(target);

    if (!section) return;

    event.preventDefault();

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
  document.getElementById("contactForm");


const formStatus =
  document.getElementById("formStatus");


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      if (formStatus) {

        formStatus.textContent =
          "Sending your message...";

        formStatus.classList.add("show");

      }


      const formData =
        new FormData(contactForm);


      try {

        const response =
          await fetch(
            contactForm.action,
            {
              method: "POST",
              body: formData,
              headers: {
                Accept: "application/json"
              }
            }
          );


        const result =
          await response.json();


        if (result.success) {

          formStatus.textContent =
            "✓ Message sent successfully! I'll get back to you soon.";

          contactForm.reset();

        } else {

          formStatus.textContent =
            "Something went wrong. Please try again.";

        }

      } catch (error) {

        formStatus.textContent =
          "Unable to send message. Please try again.";

      }

    }
  );

}


/* =========================================================
   3D GLASS TILT — DESKTOP
========================================================= */

document
  .querySelectorAll(".project-card, .stat-card")
  .forEach((card) => {

    card.addEventListener("mousemove", (event) => {

      if (window.innerWidth <= 700) return;


      const rect =
        card.getBoundingClientRect();


      const x =
        event.clientX - rect.left;


      const y =
        event.clientY - rect.top;


      const centerX =
        rect.width / 2;


      const centerY =
        rect.height / 2;


      const rotateX =
        ((y - centerY) / centerY) * -2;


      const rotateY =
        ((x - centerX) / centerX) * 2;


      card.style.transform =
        `perspective(800px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-4px)`;

    });


    card.addEventListener("mouseleave", () => {

      card.style.transform = "";

    });

  });