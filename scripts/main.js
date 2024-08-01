gsap.registerPlugin(ScrollTrigger);

function playVideo(video) {
  var isPlaying =
    video.currentTime > 0 &&
    !video.paused &&
    !video.ended &&
    video.readyState > video.HAVE_CURRENT_DATA;

  if (!isPlaying) {
    video.play();
  }
}

function animateTitle() {
  const titlePics = document.querySelectorAll(".title_pic_wrapper img");

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".title_wrapper",
        start: "top-=50px top",
        end: "bottom top",
        scrub: 1,
      },
    })
    .fromTo(
      titlePics[0],
      { xPercent: 20, scale: 1.3 },
      { xPercent: 0, scale: 1.3 },
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
      { xPercent: -10, scale: 1 },
      0
    );
}

function randomiseHistory() {
  function randomNum(minScale, maxScale) {
    return Math.random() * (maxScale - minScale) + minScale;
  }

  gsap.utils.toArray(".history_media").forEach((el, index) => {
    let historyVideo = el.querySelector("video");
    let x = randomNum(-15, 15);
    let y = randomNum(-30, 30);
    let min = window.innerWidth < 599 ? -10 : -100;
    let max = window.innerWidth < 599 ? 50 : 100;

    historyVideo.pause();

    if (index % 5 === 3 || index % 6 === 5) {
      // 4th or 6th el
      x = randomNum(min, 10);
    } else if (index % 5 === 4 || index % 6 === 2) {
      // 5th or 3rd el
      x = randomNum(-20, max);
    }

    let rotate = randomNum(-3, 3);

    gsap.set(el, {
      x: 0,
      y: 0,
      rotate: 0,
    });

    ScrollTrigger.create({
      trigger: el,
      start: `top ${randomNum(
        window.innerWidth < 599 ? 90 : 90,
        window.innerWidth < 599 ? 95 : 95
      )}%`,
      onEnter: () => {
        gsap.to(el, {
          x: x,
          y: y,
          // scale: scale,
          rotate: rotate,
          opacity: 1,
          duration: randomNum(0.6, 1),
          delay: randomNum(0.08, 0.15),
        });
      },
    });

    ScrollTrigger.create({
      trigger: historyVideo,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => playVideo(historyVideo),
      // onEnter: () => historyVideo.play(),
      onLeave: () => historyVideo.pause(),
      onEnterBack: () => playVideo(historyVideo),
      // onEnterBack: () => historyVideo.play(),
      onLeaveBack: () => historyVideo.pause(),
    });

    // ScrollTrigger.create({
    //   trigger: el,
    //   start: `top bottom`,
    //   onLeaveBack: () => {
    //     gsap.to(el, {
    //       x: 0,
    //       y: 0,
    //       scale: 1,
    //       opacity: 0,
    //       rotate: 0,
    //     });
    //   },
    // });
  });
}

function animateCriteria() {
  const spans = gsap.utils.toArray("#criteria span");
  const criteriaSection = document.querySelector(".criteria");
  const video = document.querySelector(".criteria_video");
  const annotationWrappers = document.querySelectorAll(".criteria_annotations");
  video.pause();
  const annotationsClasses = [
    "technique_annotations",
    "execution_annotations",
    "vocabulary_annotations",
    "musicality_annotations",
    "originality_annotations",
  ];

  const annotationsTimeslines = [];

  // Create timelines for annotation text
  annotationWrappers.forEach((div, index, arr) => {
    const spans = div.querySelectorAll("span");

    let spanTl = gsap.timeline().pause();

    spans.forEach((span, index, arr) => {
      spanTl.fromTo(span, { alpha: 0 }, { alpha: 1 }, ">");
    });

    annotationsTimeslines.push(spanTl);
  });

  // Video scrub on scroll
  video.onloadedmetadata = function () {
    let videoDuration = this.duration;

    ScrollTrigger.create({
      trigger: criteriaSection,
      start: "top top",
      end: "bottom bottom",
      onEnter: (self) => {
        // get annotation index
        let index = Math.floor(self.progress * annotationsClasses.length);

        annotationWrappers.forEach((span, ind) => {
          if (ind === index) {
            span.classList.add("full_opacity");
          }
        });

        spans.forEach((span, ind) => {
          span.classList.add("low_opacity");
          if (ind === index) {
            span.classList.add("full_opacity");
          }
        });
      },
      onLeaveBack: () => {
        spans.forEach((span) => {
          span.classList.remove("low_opacity");
        });
        annotationWrappers.forEach((span, ind) => {
          span.classList.remove("full_opacity");
        });
      },
      onUpdate: (self) => {
        // set video time
        video.currentTime = videoDuration * self.progress;

        video.pause();

        // get annotation index
        let index = Math.floor(self.progress * annotationsClasses.length);

        if (index !== spans.length) {
          let subProgress = gsap.utils.mapRange(
            0.2 * index,
            0.2 * index + 0.2 - 0.05,
            0,
            1,
            self.progress
          );

          annotationsTimeslines[index].progress(subProgress);

          spans.forEach((span, ind) => {
            if (ind === index) {
              span.classList.add("full_opacity");
            } else {
              span.classList.remove("full_opacity");
            }
          });

          annotationWrappers.forEach((span, ind) => {
            if (ind === index) {
              span.classList.add("full_opacity");
            } else {
              span.classList.remove("full_opacity");
            }
          });
        }
      },
    });
  };
}

function animateMoves() {
  let moveCards = gsap.utils.toArray(".move_card");
  let textElements = gsap.utils.toArray(
    ".physical_attributes .pinned_foreground_content_wrapper"
  );

  moveCards.forEach((card, index, arr) => {
    const tl = gsap.timeline({ ease: "power2.in" });

    if (index === 0) {
      tl.fromTo(
        card,
        {
          xPercent: 0,
          scale: 1,
          alpha: 1,
          rotationY: 0,
          duration: 1,
        },
        {
          xPercent: -100,
          scale: 0.8,
          alpha: 0,
          rotationY: 45,
          duration: 1,
        }
      );

      ScrollTrigger.create({
        animation: tl,
        trigger: textElements[index],
        start: "center top",
        end: `bottom top`,
        scrub: true,
        fastScrollEnd: true,
      });
    } else {
      let isLast = index === arr.length - 1;

      tl.from(card, {
        xPercent: 100,
        scale: 0.8,
        alpha: 0,
        rotationY: -45,
        duration: 1,
      })
        .to(card, {
          xPercent: 0,
          scale: 1,
          alpha: 1,
          rotationY: 0,
          duration: 1,
        })
        .to(card, {
          xPercent: isLast ? 0 : -100,
          scale: isLast ? 1 : 0.8,
          alpha: isLast ? 1 : 0,
          rotationY: isLast ? 0 : 45,
          duration: 1,
        });

      ScrollTrigger.create({
        animation: tl,
        trigger: textElements[index - 1],
        start: "center top",
        end: `bottom+=100% top`,
        scrub: true,
        fastScrollEnd: true,
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // document.documentElement.style.setProperty(
  //   "--vh",
  //   window.outerHeight * 0.01 + "px"
  // );

  // if (window.visualViewport) {
  //   document.documentElement.style.setProperty(
  //     "--vh",
  //     window.visualViewport.height * 0.01 + "px"
  //   );
  // }

  animateTitle();

  randomiseHistory();

  animateCriteria();

  animateMoves();

  ScrollTrigger.refresh();

  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    img.addEventListener("load", function () {
      ScrollTrigger.refresh();
    });
  });

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
});
