let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    hueRotate: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg",
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px",
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%",
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
}

const imageCanvas = document.querySelector("#image-canvas");
const imginput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
let file = null;
let image = null;
const resetButton = document.querySelector("#reset-btn");
const downloadButton = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");


const filtersContainer = document.querySelector(".filters");

function createFilterElement(name, unit = "%", value, min, max) {
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.id = name;
    input.value = value;
    input.min = min;
    input.max = max;

    const p = document.createElement("p");
    p.textContent = name;
    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (e) => {
        filters[name].value = input.value;
        applyFilters();
    });


    return div;
}

function createFilters(){
    Object.keys(filters).forEach(key => {

    const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
    filtersContainer.appendChild(filterElement);


})
}
createFilters();



imginput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const imageplaceholder = document.querySelector(".placeholder");
    imageCanvas.style.display = "block";
    imageplaceholder.style.display = "none";


    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {

        image = img;

        imageCanvas.width = img.width;
        imageCanvas.height = img.height;

        canvasCtx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
    }
});

function applyFilters() {

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotate.value}${filters.hueRotate.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
        `.trim();

    canvasCtx.drawImage(image, 0, 0);
}

resetButton.addEventListener("click", () => {
    filters =
    {
        brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%",
        },
        contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%",
        },
        saturation: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%",
        },
        hueRotate: {
            value: 0,
            min: 0,
            max: 360,
            unit: "deg",
        },
        blur: {
            value: 0,
            min: 0,
            max: 20,
            unit: "px",
        },
        grayscale: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%",
        },
        sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%",
        },
        opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: "%",
        },
        invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%",
        },
    }

    applyFilters();
    filtersContainer.innerHTML = "";
    createFilters();
})

downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
})

const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotate: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    drama: {
        brightness: 95,
        contrast: 140,
        saturation: 120,
        hueRotate: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 105,
        contrast: 90,
        saturation: 80,
        hueRotate: 10,
        blur: 0,
        grayscale: 0,
        sepia: 40,
        opacity: 100,
        invert: 0
    },

    // oldSchool: {
    //     brightness: 100,
    //     contrast: 110,
    //     saturation: 70,
    //     hueRotate: 0,
    //     blur: 1,
    //     grayscale: 20,
    //     sepia: 30,
    //     opacity: 100,
    //     invert: 0
    // },
    soft: {
        brightness: 105,
        contrast: 90,
        saturation: 95,
        hueRotate: 0,
        blur: 1,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    warm: {
        brightness: 105,
        contrast: 105,
        saturation: 115,
        hueRotate: 10,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    cool: {
        brightness: 100,
        contrast: 110,
        saturation: 90,
        hueRotate: -15,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    fade: {
        brightness: 110,
        contrast: 85,
        saturation: 80,
        hueRotate: 0,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    blackWhite: {
        brightness: 100,
        contrast: 120,
        saturation: 0,
        hueRotate: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    cinematic: {
        brightness: 95,
        contrast: 130,
        saturation: 110,
        hueRotate: -10,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
};

Object.keys(presets).forEach(presetName => {
    const presetButton = document.createElement("button");
    presetButton.classList.add("btn");
    presetButton.textContent = presetName;

    presetsContainer.appendChild(presetButton);

    presetButton.type = "button"; //  IMPORTANT

    
    presetButton.addEventListener("click", () => {
        const preset = presets[presetName];

        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName];
        });
        applyFilters();
        filtersContainer.innerHTML = "";
        createFilters();
    })
    
})