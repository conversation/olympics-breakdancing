gsap.registerPlugin(ScrollTrigger);

function createScrollFades() {
  gsap.utils.toArray(".pinned_section").forEach((pinnedSection) => {
    const bgArr = pinnedSection.querySelector(".pinned_media").children;

    const parTriggersArr = pinnedSection.querySelectorAll(".step");

    parTriggersArr.forEach((par, index) => {
      ScrollTrigger.create({
        fastScrollEnd: true,
        trigger: par,
        start: `top ${par.classList.contains("delay") ? "70" : "90"}%`,
        onEnter: () => {
          bgArr[par.dataset.imageIndex || index + 1].classList.add(
            "make_visible"
          );
        },
        onLeaveBack: () => {
          bgArr[par.dataset.imageIndex || index + 1].classList.remove(
            "make_visible"
          );
        },
      });
    });
  });
}

function animateTitle() {
  const titlePics = document.querySelectorAll(".title_pic_wrapper img");

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".title_wrapper",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })
    .fromTo(
      titlePics[0],
      { xPercent: 20, scale: 1.3 },
      { xPercent: 10, scale: 1.3 },
      0
    )
    .fromTo(
      titlePics[1],
      { xPercent: 0, scale: 1.3 },
      { xPercent: 0, scale: 1.3 },
      0
    )
    .fromTo(
      titlePics[2],
      { xPercent: -30, scale: 1, yPercent: 10 },
      { xPercent: -20, scale: 1 },
      0
    );
}

function randomiseHistory() {
  function randomNum(minScale, maxScale) {
    return Math.random() * (maxScale - minScale) + minScale;
  }

  function getWindowSize() {
    return { height: window.innerHeight, width: window.innerWidth };
  }

  gsap.utils.toArray(".history_media").forEach((el, index) => {
    let x = randomNum(-15, 15);
    let y = randomNum(-30, 30);
    let min = window.innerWidth < 599 ? -50 : -100;
    let max = window.innerWidth < 599 ? 50 : 100;

    if (index % 5 === 3 || index % 6 === 5) {
      // 4th or 6th el
      x = randomNum(min, 20);
    } else if (index % 5 === 4 || index % 6 === 2) {
      // 5th or 3rd el
      x = randomNum(-20, max);
    }

    let scale = 0.95 + randomNum(-0.07, 0.07);
    let rotate = randomNum(-3, 3);

    gsap.set(el, {
      x: 0,
      y: 0,
      scale: 1,
      // opacity: 0,
      rotate: 0,
    });

    ScrollTrigger.create({
      trigger: el,
      start: `top ${randomNum(
        getWindowSize().width < 599 ? 90 : 90,
        getWindowSize().width < 599 ? 95 : 95
      )}%`,
      // start: `top bottom`,
      onEnter: () => {
        gsap.to(el, {
          x: x,
          y: y,
          scale: scale,
          rotate: rotate,
          opacity: 1,
          duration: randomNum(0.6, 1), // Example duration
          delay: randomNum(0.08, 0.15), // Example duration
        });
      },
    });
    ScrollTrigger.create({
      trigger: el,
      start: `top bottom`,
      onLeaveBack: () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 0,
          rotate: 0,
        });
      },
    });
  });
}

function animateEventExplainer() {
  const eventExplainerSection = document.querySelector(".event_explainer");
  const bgMedia = eventExplainerSection.querySelector(".pinned_background>div");

  gsap.utils
    .toArray(".event_explainer .chapter")
    .forEach((chapter, index, arr) => {
      // const tl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: chapter,
      //     start: 'top 80%',
      //     scrub: true,
      //   }
      // }).to
      ScrollTrigger.create({
        // markers: true,
        trigger: chapter,
        start: "center center",
        end: "bottom top",
        endTrigger: arr[index - 1],
        onEnter: () => {
          switch (index) {
            case 0:
              gsap.to(bgMedia, { xPercent: 100 });

              break;
            case 1:
              gsap.to(bgMedia, { xPercent: 0 });

              break;
            case 2:
              gsap.to(bgMedia, { xPercent: 50 });

              break;
            case 3:
              gsap.to(bgMedia, { xPercent: -50 });

              break;

            default:
              break;
          }
        },
        onLeaveBack: () => {
          switch (index) {
            case 0:
              gsap.to(bgMedia, { xPercent: 100 });

              break;
            case 1:
              gsap.to(bgMedia, { xPercent: 0 });

              break;
            case 2:
              gsap.to(bgMedia, { xPercent: 50 });

              break;
            case 3:
              gsap.to(bgMedia, { xPercent: -50 });

              break;

            default:
              break;
          }
        },
      });
    });
}

function animateCriteria() {
  const spans = gsap.utils.toArray("#criteria span");

  // spans.forEach((el, index) => {
  //   // Set initial properties for spans
  //   gsap.set(el, {
  //     y: index % 2 === 0 ? 100 : -100, // Change to -100 if you want them to animate from the top
  //     // opacity: 0,
  //   });

  //   // Reset on scroll back
  //   ScrollTrigger.create({
  //     trigger: "#criteria",
  //     start: "top bottom",
  //     // fastScrollEnd: true,
  //     onLeaveBack: () => {
  //       gsap.set(el, {
  //         y: index % 2 === 0 ? 100 : -100, // Change to -100 if you animated from the top
  //         opacity: 0,
  //         overwrite: true,
  //         // duration: 0
  //       });
  //     },
  //   });
  // });

  // // Create ScrollTrigger to animate spans on enter
  // ScrollTrigger.create({
  //   // markers: true,
  //   trigger: "#criteria",
  //   start: "top 90%",
  //   // fastScrollEnd: true,
  //   onEnter: () => {
  //     gsap.to("#criteria span", {
  //       y: 0,
  //       opacity: 1,
  //       duration: 1, // Duration for the animation
  //       ease: "power2.out",
  //       stagger: 0.1,
  //       overwrite: true,
  //     });
  //   },
  //   onEnterBack: () => {
  //     gsap.to("#criteria span", {
  //       y: 0,
  //       opacity: 1,
  //       duration: 1, // Duration for the animation
  //       ease: "power2.out",
  //       stagger: 0.1,
  //       overwrite: true,
  //     });
  //   },
  // });

  const criteriaSection = document.querySelector(".criteria");
  const parTriggersArr = criteriaSection.querySelectorAll(".chapter");
  const video = document.querySelector(".criteria_video");
  const colours = ["red", "blue", "green", "yellow", "indigo"];
  const backgroundColours = [
    "#e37169",
    "#5ebed4",
    "#66ccaa",
    "#ffc338",
    "#6d76c5",
  ];
  const annotationsClasses = [
    "technique_annotations",
    "execution_annotations",
    "vocabulary_annotations",
    "musicality_annotations",
    "originality_annotations",
  ];

  parTriggersArr.forEach((par, index) => {
    let annotations = document.querySelector(`.${annotationsClasses[index]}`);
    let annotationLength = annotations.childElementCount;
    let annotationChildren = annotations.children;

    let annotationTimeline = gsap.timeline().pause();

    for (let i = 0; i < annotationLength; i++) {
      annotationTimeline.fromTo(
        annotationChildren[i],
        { alpha: 0 },
        { alpha: 1 },
        ">"
      );
    }

    ScrollTrigger.create({
      markers: true,
      trigger: par,
      start: `${index === 0 ? "top" : "top"} ${index === 0 ? "top" : "60%"}`,
      onEnter: () => {
        gsap.to(spans, {
          opacity: 0.2,
        });

        video.classList.add(colours[index]);

        gsap.to(annotations, { opacity: 1 });
        gsap.to(spans[index], {
          opacity: 1,
        });
      },
      onLeaveBack: () => {
        if (index < 1) {
          gsap.to(spans, {
            opacity: 1,
          });
        } else {
          gsap.to(spans, {
            opacity: 0.2,
          });

          gsap.to(spans[index - 1], {
            opacity: 1,
          });
        }
        video.classList.remove(colours[index]);
        gsap.to(annotations, { opacity: 0, backgroundColor: "transparent" });
      },
      onLeave: () => {
        if (index !== parTriggersArr.length - 1) {
          gsap.to(annotations, { opacity: 0 });
        }
      },
      onEnterBack: () => {
        gsap.to(annotations, { opacity: 1 });
      },
      onUpdate: (self) => {
        annotationTimeline.progress(self.progress);

        // if (self.progress >= 0.1) {
        //   const adjustedProgress = (self.progress - 0.1) / 0.9;
        //   console.log(adjustedProgress);

        //   annotationTimeline.progress(adjustedProgress);
        // } else {
        //   annotationTimeline.progress(0);
        // }
        // if (self.progress >= 0.1 && self.progress <= 0.9) {
        //   const adjustedProgress = (self.progress - 0.1) / 0.8;

        //   annotationTimeline.progress(adjustedProgress);
        // } else if (self.progress < 0.1) {
        //   annotationTimeline.progress(0);
        // } else if (self.progress > 0.9) {
        //   annotationTimeline.progress(1);
        // }
      },
    });
  });

  // Animate video
  // -------------------

  const rows = 33;
  const columns = 33;
  const missingImages = 51; // The number of missing images in the last row
  const frame_count = rows * columns - missingImages - 1;
  // const imageWidth = 9273;
  // const imageHeight = 16500;
  const imageWidth = 11154;
  const imageHeight = 19800;
  const horizDiff = imageWidth / columns;
  const vertDiff = imageHeight / rows;

  const viewer = document.querySelector(".criteria_video");
  const ctx = viewer.getContext("2d");
  viewer.width = horizDiff;
  viewer.height = vertDiff;

  const image = new Image();
  image.src =
    "https://cdn.theconversation.com/infographics/1078/abf76fc042fd58864000cdfb91f9f347cbf63689/site/pics/sprite_sheet.png";
  // image.src = "https://cdn.theconversation.com/infographics/1079/029f997b1ac32b3cfd769864731a5654287cb5bf/site/pics/sprite_sheet_small.png";

  image.onload = () => onUpdate();

  const obj = { num: 0 };

  gsap.to(obj, {
    num: frame_count,
    ease: `steps(${frame_count})`,
    scrollTrigger: {
      trigger: ".criteria .pinned_foreground",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
    onUpdate,
  });

  function onUpdate() {
    ctx.clearRect(0, 0, horizDiff, vertDiff);
    const x = Math.round((obj.num % columns) * horizDiff);
    const y = Math.round(Math.floor(obj.num / columns) * vertDiff);
    ctx.drawImage(image, x, y, horizDiff, vertDiff, 0, 0, horizDiff, vertDiff);
  }
}

function animateMoves() {
  let listElements = gsap.utils.toArray(".cards li");

  // Initial set for all child images and paragraphs within list items
  gsap.set(".cards div", {
    rotateY: -45,
    scale: 0.8,
    opacity: 0,
  });

  const TIMELINE = gsap.timeline({
    immediateRender: false,
    ease: "linear",
    scrollTrigger: {
      trigger: ".physical_attributes .pinned_foreground",
      start: `top-=20% top`,
      end: `bottom bottom`,
      scrub: true,
      fastScrollEnd: true,
    },
  });

  listElements.forEach((box, index) => {
    let coverWrapper = box.querySelector("div");
    let isLastElement = index === listElements.length - 1;

    TIMELINE.to(
      coverWrapper,
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1,
      },
      `-=1`
    ).to(coverWrapper, {
      scale: isLastElement ? 1 : 0.8,
      opacity: isLastElement ? 1 : 0,
      rotationY: isLastElement ? 0 : 45,
      duration: isLastElement ? 0 : 1,
    });

    TIMELINE.to(
      listElements, // shift the images over
      {
        x: `${-100 * (index + 1)}%`,
        duration: 1,
      },
      isLastElement ? `-=1` : `-=2`
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  animateTitle();

  randomiseHistory();

  animateCriteria();

  animateMoves();

  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    img.addEventListener("load", function () {
      ScrollTrigger.refresh();
    });
  });
});
