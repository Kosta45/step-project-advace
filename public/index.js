import { getCards, updateCard } from "../src/constants/api.js";
import * as Modals from "../src/components/modal/index.js";
import * as Visit from "../src/components/card/index.js";
import { searchAndRenderCards } from "../src/search/search.js";
import { filterCards } from "../src/filter/filter.js";

const loginBtn = document.querySelector(".btn-login");
const filterBtn = document.querySelector(".btn-filter");
const searchBtn = document.querySelector(".btn-search");
const searchInput = document.querySelector("#search-input");
const cardsContainer = document.querySelector("#cards-container");

const exitModal = new Modals.ModalExit();
const loginModal = new Modals.ModalLogin();
const createVisitModal = new Modals.ModalCreateVisit();

function initLoginState() {
  const token = localStorage.getItem("token");

  if (token) {
    loginBtn.textContent = "Create visit";
    loginBtn.classList.add("create-visit");
    searchAndRenderCards();
  } else {
    loginBtn.textContent = "Login";
    loginBtn.classList.remove("create-visit");
  }
}

document.querySelector(".logo").addEventListener("click", (e) => {
  e.preventDefault();
  exitModal.open();
});

loginBtn.addEventListener("click", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    loginModal.open();
  } else {
    createVisitModal.open();
  }
});

filterBtn.addEventListener("click", filterCards);

export async function loadCards() {
  try {
    const cards = await getCards();
    cardsContainer.innerHTML = "";

    if (!cards || cards.length === 0) {
      cardsContainer.innerHTML = `<p class="no-items">No items have been added...</p>`;
      return;
    }

    const cardsSection = document.createElement("div");
    cardsSection.classList.add(
      "cards-section",
      "fixed-grid",
      "has-3-cols-desktop",
      "has-1-cols-mobile"
    );
    cardsContainer.append(cardsSection);

    const cardList = document.createElement("ul");
    cardList.classList.add("cards-section-list", "grid", "is-centered");
    cardsSection.append(cardList);

    cards.forEach((card) => {
      switch (card.doctor) {
        case "dentist":
          new Visit.VisitDentist(card, cardList).render();
          break;
        case "cardiologist":
          new Visit.VisitCardiologist(card, cardList).render();
          break;
        case "therapist":
          new Visit.VisitTherapist(card, cardList).render();
          break;
      }
    });
  } catch (error) {
    console.error(`Error while receiving cards: ${error}`);
  }
}

// Викликати спочатку, щоб завантажити всі карти
searchAndRenderCards();

// Додаємо подію на пошук
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchAndRenderCards(searchInput.value.trim());
});

window.loadCards = loadCards;

initLoginState();
