"use strict";

const adviceContainer = document.querySelector(".advice");
const adviceDice = document.querySelector(".advice__dice");
const spanElement = document.querySelector(".advice__id");
const adviceText = document.querySelector(".advice__text");

// Fetch API
const getAdvices = async function () {
  try {
    const idNum = Math.floor(Math.random() * 200 + 1);

    const response = await fetch(`https://api.adviceslip.com/advice/${idNum}`);
    const data = await response.json();

    if (!response.ok) throw new Error("An error occurred with the API");

    renderHtmlMarkup(data.slip);
  } catch {
    renderErr();
  }
};

// Set the HTML contents in the UI
const renderHtmlMarkup = function (data) {
  spanElement.textContent = `#${data.id}`;
  adviceText.textContent = `\"${data.advice}\"`;
};

// Handle when the Fetching encountered an error
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

  adviceContainer.innerHTML = "";
  adviceContainer.insertAdjacentHTML("beforeend", errHtml);
};

adviceDice.addEventListener("click", getAdvices);
getAdvices();
