document.addEventListener("DOMContentLoaded", () => {
  const motionOK = window.matchMedia("(prefers-reduced-motion: reduce)").matches === false;
  const animated = [...document.querySelectorAll("[data-rr4-animate]")];
  const interactive = [...document.querySelectorAll(".rr4-btn, .rr4-chip, .rr4-control, .rr4-menu-item")];

  const buildAppearFrame = (element) => {
    if (element.dataset.rr4Prepared === "true") return;
    element.dataset.rr4Prepared = "true";
    element.classList.add("rr4-appear-frame");
    const computed = window.getComputedStyle(element);
    const hasBoxSurface =
      computed.backgroundImage !== "none" ||
      (computed.backgroundColor !== "rgba(0, 0, 0, 0)" && computed.backgroundColor !== "transparent") ||
      ["borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"].some(
        (prop) => parseFloat(computed[prop]) > 0
      ) ||
      computed.boxShadow !== "none";

    if (hasBoxSurface) {
      element.classList.add("rr4-appear-surface");
    }

    const childElements = [...element.children];
    const hasDirectText = [...element.childNodes].some(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
    );

    if (childElements.length === 0 || hasDirectText) {
      element.classList.add("rr4-appear-self");
    } else {
      childElements.forEach((child) => {
        child.classList.add("rr4-appear-child");
      });
    }

    ["top", "right", "bottom", "left"].forEach((edge) => {
      const border = document.createElement("span");
      border.className = `rr4-appear-border is-${edge}`;
      border.setAttribute("aria-hidden", "true");
      element.appendChild(border);
    });
  };

  if (!window.anime || !motionOK) {
    animated.forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });
  } else if (animated.length) {
    animated.forEach(buildAppearFrame);

    const revealElement = (element) => {
      if (element.dataset.rr4Revealed === "true") return;
      element.dataset.rr4Revealed = "true";

      const content = element.querySelectorAll(":scope > .rr4-appear-child");
      const selfTarget = element.classList.contains("rr4-appear-self") ? element : null;
      const top = element.querySelector(":scope > .rr4-appear-border.is-top");
      const right = element.querySelector(":scope > .rr4-appear-border.is-right");
      const bottom = element.querySelector(":scope > .rr4-appear-border.is-bottom");
      const left = element.querySelector(":scope > .rr4-appear-border.is-left");

      anime
        .timeline({ easing: "easeOutCubic" })
        .add({
          targets: top,
          width: ["0%", "100%"],
          duration: 180
        })
        .add(
          {
            targets: right,
            height: ["0%", "100%"],
            duration: 180
          },
          "-=10"
        )
        .add(
          {
            targets: bottom,
            width: ["0%", "100%"],
            duration: 180
          },
          "-=10"
        )
        .add(
          {
            targets: left,
            height: ["0%", "100%"],
            duration: 180
          },
          "-=10"
        )
        .add({
          targets: selfTarget ?? content,
          opacity: [0, 1],
          translateY: [18, 0],
          translateX: element.dataset.rr4Axis === "x" ? [18, 0] : 0,
          duration: 420,
          easing: "easeOutExpo",
          begin: () => {
            element.classList.remove("rr4-appear-surface");
          }
        })
        .add({
          targets: [top, right, bottom, left],
          opacity: [1, 0],
          duration: 220,
          easing: "linear",
          complete: () => {
            [top, right, bottom, left].forEach((border) => border?.remove());
          }
        });
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            revealElement(entry.target);
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -8% 0px"
        }
      );

      animated.forEach((element) => observer.observe(element));
    } else {
      animated.forEach((element, index) => {
        setTimeout(() => revealElement(element), 120 * index);
      });
    }
  }

  if (!motionOK || !window.anime) {
    animated.forEach((element) => {
      element.classList.remove("rr4-appear-surface");
      if (element.classList.contains("rr4-appear-self")) {
        element.style.opacity = "1";
        element.style.transform = "none";
      }
      element.querySelectorAll(":scope > .rr4-appear-child").forEach((child) => {
        child.style.opacity = "1";
        child.style.transform = "none";
      });
    });
  }

  if (window.anime && motionOK) {
    interactive.forEach((element) => {
      const hoverAnimation = anime({
        targets: element,
        scale: 1.015,
        translateX: -2,
        translateY: -2,
        boxShadow: ["0 0 0 rgba(0,0,0,0)", "10px 10px 0 rgba(0,0,0,0.22)"],
        easing: "easeOutQuad",
        duration: 180,
        autoplay: false
      });

      const pressAnimation = anime({
        targets: element,
        scale: 0.985,
        translateX: 1,
        translateY: 1,
        duration: 110,
        easing: "easeOutQuad",
        autoplay: false
      });

      element.addEventListener("mouseenter", () => {
        pressAnimation.pause();
        hoverAnimation.play();
      });

      element.addEventListener("mouseleave", () => {
        hoverAnimation.pause();
        anime({
          targets: element,
          scale: 1,
          translateX: 0,
          translateY: 0,
          boxShadow: "0 18px 60px rgba(0,0,0,0)",
          duration: 180,
          easing: "easeOutQuad"
        });
      });

      element.addEventListener("mousedown", () => {
        hoverAnimation.pause();
        pressAnimation.play();
      });

      ["mouseup", "blur"].forEach((eventName) => {
        element.addEventListener(eventName, () => {
          pressAnimation.pause();
          anime({
            targets: element,
            scale: 1,
            translateX: 0,
            translateY: 0,
            duration: 140,
            easing: "easeOutQuad"
          });
        });
      });
    });
  }

  document.querySelectorAll("[data-rr4-scroll]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: motionOK ? "smooth" : "auto", block: "start" });
    });
  });

  const clockDigits = {
    hh: document.querySelector('[data-rr4-clock="hh"]'),
    mm: document.querySelector('[data-rr4-clock="mm"]'),
    ss: document.querySelector('[data-rr4-clock="ss"]'),
    ms: document.querySelector('[data-rr4-clock="ms"]')
  };

  if (Object.values(clockDigits).every(Boolean)) {
    const updateClock = () => {
      const now = new Date();
      clockDigits.hh.textContent = String(now.getHours()).padStart(2, "0");
      clockDigits.mm.textContent = String(now.getMinutes()).padStart(2, "0");
      clockDigits.ss.textContent = String(now.getSeconds()).padStart(2, "0");
      clockDigits.ms.textContent = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, "0");
    };

    updateClock();
    window.setInterval(updateClock, 50);
  }
});
