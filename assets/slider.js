const min = document.querySelector("#min");
const max = document.querySelector("#max");
const span = document.querySelector("#val");
const slide = document.querySelector("#slide");
const button = document.querySelector("#limitButton");

displayValue.call(slide, {});

function displayValue(e) {
  const inp = e.target || this;
  const value = +inp.value;
  const min = inp.min;
  const max = inp.max;
  const width = inp.offsetWidth;
  const offset = -20;
  const percent = (value - min) / (max - min);
  const pos = percent * (width + offset) - 40;
  span.style.left = `${pos}px`;

  const sliderImg = document.getElementById("slider-img");
  const sliderContent = document.getElementById("slider-content");
  switch (value) {
    case 1:
      sliderImg.src = "../img/per1.png";
      sliderContent.innerHTML =
        "<span>[98 nSv/a - Radiación de un plátano,</span><br><span>1 mSv/a - Radiación emitida por un humano]</span>";
      break;
    case 2:
      sliderImg.src = `../img/p${value}.png`;
      sliderContent.innerHTML =
        "<span>46 mSv/a - Vivir cerca de Chernobyl.</span>";
      break;
    case 3:
      sliderImg.src = `../img/p${value}.png`;
      sliderContent.innerHTML =
        "<span>50 mSv/a -  Máxima carga radioactiva legal en el ambiente laboral para un año.</span>";
      break;
    case 4:
      sliderImg.src = `../img/p${value}.png`;
      sliderContent.innerHTML =
        "<span>100 mSv/a - Máxima carga radioactiva legal en el ambiente laboral para cinco años. Radiación promedio absorbida por un rescatista de Chernobyl.</span>";
      break;
    case 5:
      sliderImg.src = `../img/p${value}.png`;
      sliderContent.innerHTML =
        "<span>350 mSv/a - Vivir cerca del epicentro del desastre de Chernobyl</span>";
      break;
    case 6:
      sliderImg.src = `../img/p${value}estasi.png`;
      sliderContent.innerHTML =
        "<span>1 Sv/a - Se contrae Síndrome de Irradiación Aguda</span>";
      break;
    case 7:
      sliderImg.src = `../img/p${value}estasi.png`;
      sliderContent.innerHTML =
        "<span>[5 Sv/a - Dosis letal; probabilidad del 50% de morir en treinta días,</span><br><span>36 mSv/a - Dosis letal; la muerte ocurre en menos de 36 horas,</span><br><span>5.6 MSv/a - Radiación promedio dentro de un reactor nuclear]</span>";
      break;
    default:
      break;
  }
}

function changeLimits() {
  const minVal = +min.value;
  const maxVal = +max.value;
  const value = Math.floor(
    (maxVal - minVal) * (Math.random() * (0.8 - 0.2) + 0.2) + minVal
  );
  slide.setAttribute("min", minVal);
  slide.setAttribute("max", maxVal);
  slide.setAttribute("value", value);
  displayValue.call(slide, {});
}

function checkPostiveInteger(e) {
  let c = e.keyCode;
  if (
    (c < 37 && c != 8 && c != 9) ||
    (c > 40 && c < 48 && c != 46) ||
    (c > 57 && c < 96) ||
    (c > 105 && c != 109 && c != 189)
  ) {
    e.preventDefault();
  }
  if (c === 13 && checkValidLimits()) {
    changeLimits();
  }
}

function checkValidLimits() {
  return !min.value || !max.value || +max.value <= +min.value
    ? ((button.disabled = true), false)
    : ((button.disabled = false), true);
}
