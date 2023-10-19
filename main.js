var image = document.getElementsByClassName("parallax-img");
new simpleParallax(image, {
  scale: 1.4,
  delay: 0.7,
  transition: "cubic-bezier(0,0,0,0.4)",
});

// faq
const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});

gsap.registerPlugin(ScrollTrigger);

gsap.config({ trialWarn: false });

// nav-link animation
ScrollTrigger.create({
  animation: gsap.from(".menu-items li", {
    yPercent: -150,
    opacity: 0,
    stagger: 0.2052,
    duration: 1.1,
  }),
  trigger: ".navbar",
  start: "top 30%",
  ease: "power3.easeInOut",
});

// footer-link animation
ScrollTrigger.create({
  animation: gsap.from(".footer-links li", {
    xPercent: 30,
    stagger: 0.252,
    duration: 1.1,
    opacity: 0,
  }),
  trigger: ".cta",
  start: "bottom 90%",
  ease: "power3.easeInOut",
});

// faq
ScrollTrigger.create({
  animation: gsap.from(".faq", {
    stagger: 0.152,
    duration: 1,
    yPercent: -100,
    opacity: 0,
  }),
  trigger: ".faq-section .grid",
  start: "top 70%",
  ease: "power3.easeInOut",
});

// split text animation
window.addEventListener("load", function () {
  let revealText = document.querySelectorAll(".reveal-text");
  let results = Splitting({ target: revealText, by: "lines" });

  results.forEach((splitResult) => {
    const wrappedLines = splitResult.lines
      .map(
        (wordsArr) => `
        <span class="line"><div class="words">
          ${wordsArr
            .map(
              (word) => `${word.outerHTML}<span class="whitespace"> 
         </span>`
            )
            .join("")}
        </div></span>`
      )
      .join("");
    splitResult.el.innerHTML = wrappedLines;
  });

  gsap.registerPlugin(ScrollTrigger);
  let revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".line .words");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        toggleActions: "restart none none reset",
      },
    });
    tl.set(revealText, { autoAlpha: 1 });
    tl.from(lines, 1, {
      yPercent: 270,
      ease: Power3.out,
      stagger: 0.25,
      delay: 0.2,
    });
  });
});

jQuery(document).ready(function () {
  let splitLines = jQuery("[data-line]");
  splitLines.each(function (i, j) {
    let x = new SplitText(j, {
      type: j.getAttribute("data-line"),
      linesClass: "line",
      wordsClass: "word",
      charsClass: "char",
    });
    let delay = j.getAttribute("data-delay");

    x.chars.forEach((ele, index) => {
      if (delay) {
        gsap.to(ele, { "--delay": index + parseInt(delay) + "s" });
      } else {
        gsap.to(ele, { "--delay": index + "s" });
      }
    });
  });
  let splitLines2 = jQuery("[data-line-no-animation]");
  splitLines2.each(function (i, j) {
    new SplitText(j, {
      type: j.getAttribute("data-line-no-animation"),
      linesClass: "line",
      wordsClass: "word",
      charsClass: "char",
    });
  });

  let splitLines3 = jQuery("[data-line-within-line]");
  splitLines3.each(function (i, j) {
    let x = new SplitText(j, { type: "lines", linesClass: "line-inner" });
    new SplitText(jQuery(j).find(".line-inner"), {
      type: "lines",
      linesClass: "line-mask",
    });
    let delay = j.getAttribute("data-delay");

    x.lines.forEach((ele, index) => {
      if (delay) {
        let delaytamp = index + parseInt(delay);
        gsap.to(ele, { "--delay": delaytamp + "s" });
      } else {
        gsap.to(ele, { "--delay": index + "s" });
      }
    });
  });
});

jQuery(window).on("load", function () {
  document.body.classList.add("loaded");
});
