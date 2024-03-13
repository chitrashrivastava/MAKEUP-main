// Section 1: GSAP Timeline Animation
var tl = gsap.timeline();
tl.from(".div1>h3, nav>a, .icons>i", {
  y: -100,
  duration: 1,
  delay: 0.4,
  stagger: 0.5,
  backgroundColor: "red",
});
 tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".inner-div3",
    start: "top center",
    end: "bottom center",
    scrub: 1,
  },
});

tl.to(".inner-div3", { opacity: 1, transform: "translateY(0)", duration: 1 })
  .to(".innerone", { opacity: 1, transform: "translateY(0)", duration: 1 }, "-=0.5")
  .to(".read", { opacity: 1, transform: "translateY(0)", duration: 1 }, "-=0.5");

// Section 2: ScrollTrigger for Box Animations
gsap.registerPlugin(ScrollTrigger);

gsap.to('.read', {
  scale: 1.1,
  duration: 1,
  yoyo: true,
  repeat: -1, // Infinite loop
});
gsap.from('.images', {
  opacity: 0,
  y: 50,
  stagger: 0.2, // Add stagger for a sequential animation
  duration: 1,
  scrollTrigger: {
    trigger: '.images',
    start: 'top 80%',
    end: 'top 50%',
    toggleActions: 'play none none reverse',
  },
});

const boxes = document.querySelectorAll('.box');
const boxAnimations = ["animate__bounceInLeft", "animate__fadeIn", "animate__flipInX"];

boxes.forEach((box, index) => {
  gsap.to(box, {
    scrollTrigger: {
      trigger: box,
      start: 'top 90%',
      end: 'bottom center',
      scrub: true,
      onEnter: () => {
        box.classList.remove('animate__hidden');
        box.classList.add(boxAnimations[index]);
      },
      onLeaveBack: () => {
        box.classList.remove(boxAnimations[index]);
        box.classList.add('animate__hidden');
      },
    },
  });
});

// Section 3: ScrollTrigger for .div6-left and .div6-right Animations
const leftAnimation = gsap.fromTo(
  ".div6-left",
  { opacity: 0, x: -50 },
  { opacity: 1, x: 0, duration: 1, paused: true }
);

const rightAnimation = gsap.fromTo(
  ".div6-right",
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1, paused: true }
);

ScrollTrigger.create({
  trigger: ".div6-left",
  start: "top center",
  onEnter: () => leftAnimation.play(),
  onEnterBack: () => leftAnimation.reverse(),
});

ScrollTrigger.create({
  trigger: ".div6-right",
  start: "top center",
  onEnter: () => rightAnimation.play(),
  onEnterBack: () => rightAnimation.reverse(),
  reverse: true,
});

// Section 4: GSAP Timeline for .div7, .div8 Animations
const tL = gsap.timeline({
  scrollTrigger: {
    trigger: ".div7, .div8",
    start: "top center",
    end: "+=400",
    scrub: 1,
  },
});

gsap.to('.upper, .lower-one, .lower-two, .lower-three', {
  opacity: 1,
  y: 90,
  duration: 1,
  ease: 'power4.out',
  scrollTrigger: {
    trigger: "footer",
    start: "top ",
    end: "bottom",
    scrub: true,
  },
});

gsap.from('.upper, .lower-one, .lower-two, .lower-three', {
  opacity: 1,
  y: 70,
  duration: 1,
  ease: 'power4.out',
  scrollTrigger: {
    trigger: "footer",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});

tL.from(".div7 h1", { opacity: 0, y: 50, duration: 1 });
tL.from(".card, .div8", { opacity: 0, y: 90, stagger: 1, duration: 4 });

// Section 5: Additional Animations
gsap.from('.lower-icons', {
  opacity: 0,
  y: 90,
  duration: 1,
});

// Section 6: Custom Cursor and Navigation
document.addEventListener('DOMContentLoaded', function () {
  
  const contentElement = document.getElementById('content');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const paragraphs = contentElement.querySelectorAll('p');

  let currentIndex = 0;

  paragraphs[currentIndex].classList.add('show');

  nextButton.addEventListener('click', function() {
    paragraphs[currentIndex].classList.remove('show');
    currentIndex = (currentIndex + 1) % paragraphs.length;
    paragraphs[currentIndex].classList.add('show');
  });

  prevButton.addEventListener('click', function() {
    paragraphs[currentIndex].classList.remove('show');
    currentIndex = (currentIndex - 1 + paragraphs.length) % paragraphs.length;
    paragraphs[currentIndex].classList.add('show');
  });
});

// Section 7: GSAP Animation for Lower Icons
gsap.registerPlugin('from', 'to');

function createAnimation() {
  const icons = document.querySelectorAll('.lower-icons i');

  gsap.from(icons, {
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    repeat: -1,
    yoyo: true,
  });
}
// GSAP Animation for div4-sec
gsap.from('.div4-one', {
  opacity: 0,
  y: 40,
  duration: 1,
  scrollTrigger: {
    trigger: '.div4-one',
    start: 'top 100%',
  }
});

gsap.from('.div4-two', {
  opacity: 0,
  y: 40,
  duration: 1,
  scrollTrigger: {
    trigger: '.div4-two',
    start: 'top 100%',
  }
});

// GSAP Animation for div4-on


gsap.fromTo('.div4-one', {
  opacity: 0,
  y: 40,
}, {
  opacity: 1,
  y: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.div4-one',
    start: 'top 100%',
    scrub: 1,
  },
});

// Animation for div4-two
gsap.fromTo('.div4-two', {
  opacity: 0,
  y: 40,
}, {
  opacity: 1,
  y: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.div4-two',
    start: 'top 100%',
    scrub: 1,
  },
});

// Animation for div4-one children
gsap.fromTo('.div4-one h1, .div4-one h4, .div4-one button', {
  opacity: 0,
  y: 40,
}, {
  opacity: 1,
  y: 0,
  stagger: 0.2,
  duration: 1,
  scrollTrigger: {
    trigger: '.div4-one',
    start: 'top 130%',
    scrub: 1,
  },
});

// Animation for div4-two children
gsap.fromTo('.div4-two h4, .div4-two .circle, .div4-two img', {
  opacity: 0,
  y: 40,
}, {
  opacity: 1,
  y: 0,
  stagger: 0.2,
  duration: 1,
  scrollTrigger: {
    trigger: '.div4-two',
    start: 'top 70%',
    scrub: 1,
  },
});

document.addEventListener('DOMContentLoaded', createAnimation);
