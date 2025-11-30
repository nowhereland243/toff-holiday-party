document.addEventListener("DOMContentLoaded", () => {
  // Handle promo code from URL parameters
  // Supports: ?code=ABC123 or ?promo=ABC123 or ?promocode=ABC123
  const urlParams = new URLSearchParams(window.location.search);
  const promoCode =
    urlParams.get("code") ||
    urlParams.get("promo") ||
    urlParams.get("promocode");

  if (promoCode) {
    // Update all Givebutter links to include the promo code
    const givebutterLinks = document.querySelectorAll(
      'a[href*="givebutter.com"]'
    );
    givebutterLinks.forEach((link) => {
      const url = new URL(link.href);
      // Givebutter parameter name - adjust if needed
      // Common options: 'code', 'promo', 'coupon', 'discount'
      // If 'code' doesn't work, change this to the correct parameter name
      const givebutterParam = "code";
      url.searchParams.set(givebutterParam, promoCode);
      link.href = url.toString();
    });
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optional: Stop observing once visible if you only want it to animate once
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll(".fade-in-scroll");
  fadeElements.forEach((element) => {
    observer.observe(element);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Hide scroll indicator on scroll
  const scrollIndicator = document.querySelector(".scroll-indicator");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      scrollIndicator.style.opacity = "0";
    } else {
      scrollIndicator.style.opacity = "1";
    }

    lastScroll = currentScroll;
  });

  // Custom Cursor Logic
  const cursor = document.querySelector(".custom-cursor");
  const hoverTargets = document.querySelectorAll(".hover-target");

  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    hoverTargets.forEach((target) => {
      target.addEventListener("mouseenter", () => {
        cursor.classList.add("active");
      });
      target.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
      });
    });
  }
});
