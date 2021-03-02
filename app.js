import lottie from "lottie-web";

// Returns a list of loaded Lottie objects
function loadLottieAnimations(list) {
  return list.map((item) => {
    return lottie.loadAnimation({
      ...item,
      renderer: "svg",
      loop: true,
      autoplay: false,
    });
  });
}

// Lottie data
const configList = [
  {
    container: document.getElementById("lottie-1"),
    path:
      "https://raw.githubusercontent.com/andrenavarre/LottieFixer/master/_lottie/anim_inspect.json?token=AE2WVR5PEXSU4XPHTWMU6ILAI2MKA",
  },
  {
    container: document.getElementById("lottie-2"),
    path:
      "https://raw.githubusercontent.com/andrenavarre/LottieFixer/master/_lottie/anim_profile.json?token=AE2WVRZM3AHOC6EEEJBKEWDAI2MKE",
  },
  {
    container: document.getElementById("lottie-3"),
    path:
      "https://raw.githubusercontent.com/andrenavarre/LottieFixer/master/_lottie/anim_casual.json?token=AE2WVRZOHUIVZXKP5MCVXX3AI2MKI",
  },
];

const animations = loadLottieAnimations(configList);

// Intersection Observer
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
function callback(entries) {
  entries.forEach((entry) => {
    const { target, isIntersecting } = entry;
    const animation = animations.find((anim) => anim.wrapper == target);
    const { name, animationID } = animation;

    if (isIntersecting) {
      console.log(name || animationID, "playing");
      animation.play();
    }
    if (!isIntersecting) {
      console.log(name || animationID, "paused");
      animation.pause();
    }
  });
}

const observer = new IntersectionObserver(callback, {});
configList.forEach((config) => observer.observe(config.container));
