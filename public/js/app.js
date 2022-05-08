"use strict";

const adviceContainer = document.querySelector(".advice");

const getAdvices = async function () {
  try {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();

    if (!response.ok) throw new Error("An error occurred with the API");

    renderHtmlMarkup(data.slip);
  } catch {
    renderErr();
  }
};

const renderHtmlMarkup = function (data) {
  const htmlMarkup = `
        <div class="advice__contents">
          <h1 class="heading heading--xs mb--sm">
            Advice <span class="id">#${data.id}</span>
          </h1>
          <p class="advice__text mb--lg">
          "${data.advice}"
          </p>

          <img
            src="images/pattern-divider-mobile.svg"
            alt="divider"
            class="mb--sm"
          />
        </div>

        <div class="advice__dice">
          <img src="images/icon-dice.svg" alt="dice" class="mb--md img" />
        </div>
      `;

  adviceContainer.insertAdjacentHTML("beforeend", htmlMarkup);
  diceClickEvent();
};

const renderErr = function () {
  const errHtml = `
            <div class="advice__contents">
              <h1 class="heading heading--xs mb--sm">
               Error</span>
              </h1>
              <p class="advice__text mb--lg">
                 Something went wrong!
              </p>
            </div>`;
  adviceContainer.insertAdjacentHTML("beforeend", errHtml);
};

const diceClickEvent = function () {
  const adviceDice = document.querySelector(".advice__dice");

  adviceDice.addEventListener("click", function (e) {
    adviceContainer.innerHTML = "";

    if (e.target.classList.contains("img")) reloadPage();

    reloadPage();
  });
};

const reloadPage = function () {
  // Chrome -reload
  window.location.reload();

  // Firefox -reload
  window.location.reload(true);
};

// Init
getAdvices();
