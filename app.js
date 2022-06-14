"use strict";
var imageWrapper = null,
  imageArea = null,
  imageCanvas = null,
  imageContext = null,
  imageFile = null,
  imageMIMETypes = [],
  filterList = [],
  filterArea = null,
  imageFilter = null;

function init() {
  imageWrapper = document.querySelector("#wrapper");
  imageArea = document.querySelector("#area");
  imageCanvas = document.querySelector("#image");
  imageContext = imageCanvas.getContext("2d");
  imageFile = document.querySelector("#file");
  imageMIMETypes = ["image/jpeg", "image/png", "image/gif"];
  filterList = [
    {
      title: "BlackAndWhite",
      message:
        "Black and white filters let you control how colors are converted to shades of grey. Use them to get the right contrast and mood in your photos. A common problem in black and white photography is that certain colors look very similar when converted into greyscale.",
    },
    {
      title: "Brightness",
      message:
        "Brightness is an attribute of visual perception in which a source appears to be radiating or reflecting light. In other words, brightness is the perception elicited by the luminance of a visual target",
    },
    {
      title: "Contrast",
      message:
        "understanding Low Contrast Filters. A low contrast or 'LowCon' filter is a technique used by some cameras and cinematographers to reduce the appearance of subject contrast and soften highlights. In this article, we examine the mechanism and relative trade-offs behind these filters.",
    },
    {
      title: "Grayscale",
      message:
        "Grayscale is used for assessing the color shading in between products and the customer's approval sample or among pieces in production.",
    },
    {
      title: "Invert",
      message:
        "An 'invert colors' feature is a common way to do flips the bits that make up the pixels on the screen",
    },
    {
      title: "Sepia",
      message:
        "Sepia filter is one of the most commonly used filters while editing images. Sepia effect adds a warm brown tone to the pictures. Using a sepia filter, the images get enhanced with a warm look whose effect is very calming to the eye. Sepia tone makes the image a bit vintage.",
    },
    {
      title: "Threshold",
      message:
        "Threshold: Reduce your photo to two colors. You can define the change between dark and light colors continuously.",
    },
    {
      title: "Vintage",
      message:
        " A vintage photo filter is the ultimate effect for applying a retro look to a digital photo. Vintage photo filters recreate the vintage style to mimic the classic style of a film camera.",
    },
    {
      title: "Sharpen",
      message:
        "The Sharpen filter (old name was Unsharp Mask) sharpens edges of the elements without increasing noise or blemish. It is the king of the sharpen filters. Some imaging devices like digital cameras or scanners offer to sharpen the created images for you.",
    },
    {
      title: "Sobel",
      message:
        "The Sobel operator, sometimes called the Sobel–Feldman operator or Sobel filter, is used in image processing and computer vision, particularly within edge detection algorithms where it creates an image emphasising edges",
    },
    {
      title: "Prewitt",
      message:
        "The Prewitt operator is used in image processing, particularly within edge detection algorithms. Technically, it is a discrete differentiation operator, computing an approximation of the gradient of the image intensity function",
    },
    {
      title: "uniform",
      message: "",
    },
    {
      title: "Reset",
      message: "",
    },
  ];
  // filterList = [
  //   "BlackAndWhite",
  //   "Brightness",
  //   "Contrast",
  //   "Grayscale",
  //   "Invert",
  //   "Noise",
  //   "Sepia",
  //   "Threshold",
  //   "Vintage",

  //   "Sharpen",
  //   "Sobel",
  //   "Prewitt",
  //   "uniform",
  //   "Reset",
  // ];
  filterArea = document.querySelector("#footer");
  imageFilter = new ysFilters();

  imageWrapper.onclick = function () {
    imageFile.click();
  };

  imageWrapper.ondrop = function (evt) {
    imageFile.files = evt.dataTransfer.files;
    evt.preventDefault();
  };

  imageWrapper.ondragover = function (evt) {
    return false;
  };

  imageFile.onchange = checkAdd;

  addFilterButton();
}

function checkAdd() {
  if (this.files.length != 1) return;

  var currentFile = this.files[0];

  if (!checkMimeType(currentFile.type, imageMIMETypes)) {
    return;
  }

  imageToCanvas(currentFile);

  imageArea.style.display = "none";
  filterArea.style.display = "block";

  return;
}

function checkMimeType(currentType, allowedTypes) {
  var check = false;

  for (var index = 0, fileType; (fileType = allowedTypes[index]); index++) {
    if (currentType == fileType) {
      return true;
    }
  }

  return check;
}

function imageToCanvas(currentFile) {
  var reader = new FileReader();
  reader.readAsDataURL(currentFile);

  reader.onload = function () {
    var img = new Image();
    img.src = this.result;

    img.onload = function () {
      var maxWidth = 600;
      if (img.width < maxWidth) maxWidth = img.width;
      var ratio = img.height / maxWidth;

      imageCanvas.width = img.width / ratio;
      imageCanvas.height = img.height / ratio;

      imageWrapper.style.width = imageCanvas.width + "px";
      imageWrapper.style.height = imageCanvas.height + "px";

      imageContext.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
      var imageData = imageContext.getImageData(
        0,
        0,
        imageCanvas.width,
        imageCanvas.height
      );
      imageFilter.setImageData(imageData);
    };
  };

  return;
}

function addFilterButton() {
  for (let index = 0; index < filterList.length; index++) {
    var btn = document.createElement("button");
    var btnMessage = document.createElement("p");
    btnMessage.innerHTML = filterList[index].message;
    btn.innerHTML = filterList[index].title;
    btn.onclick = filterIt;
    filterArea.appendChild(btn);
    filterArea.appendChild(btnMessage);
  }

  return;
}

function filterIt() {
  var currentFilter = null;
  switch (this.innerHTML) {
    case "BlackAndWhite":
      currentFilter = imageFilter.blackAndWhite();
      break;
    case "Brightness":
      currentFilter = imageFilter.brightness();
      break;
    case "Contrast":
      currentFilter = imageFilter.contrast();
      break;
    case "Grayscale":
      currentFilter = imageFilter.grayscale();
      break;
    case "Invert":
      currentFilter = imageFilter.invert();
      break;
    case "Noise":
      currentFilter = imageFilter.noise();
      break;
    case "Sepia":
      currentFilter = imageFilter.sepia();
      break;
    case "Threshold":
      currentFilter = imageFilter.threshold();
      break;
    case "Vintage":
      currentFilter = imageFilter.vintage();
      break;
    case "Sharpen":
      currentFilter = imageFilter.sharpen();
      break;
    case "Sobel":
      currentFilter = imageFilter.sobel();
      break;
    case "Prewitt":
      currentFilter = imageFilter.prewitt();
      break;
    case "uniform": {
      currentFilter = imageFilter.uniform();
      break;
    }
    default:
      imageToCanvas(imageFile.files[0]);
      return;
  }

  imageContext.putImageData(currentFilter.getImageData(), 0, 0);

  return;
}

window.onload = init;
