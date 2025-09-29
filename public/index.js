import { getCards } from "../src/constants/api.js";
import * as Modals from "../src/components/modal/index.js";
import Card from "../src/components/Card.js";

const loginBtn = document.querySelector(".btn-login");
const cardsContainer = document.querySelector("#cards-container");

const exitModal = new Modals.ModalExit();
const loginModal = new Modals.ModalLogin();
const createVisitModal = new Modals.ModalCreateVisit();

// токена при завантаженні
function initLoginState() {
  const token = localStorage.getItem("token");

  if (token) {
    loginBtn.textContent = "Створити візит";
    loginBtn.classList.add("create-visit");
    loadCards();
  } else {
    loginBtn.textContent = "Вхід";
    loginBtn.classList.remove("create-visit");
  }
}

// вихід
document.querySelector(".logo").addEventListener("click", (e) => {
  e.preventDefault();
  exitModal.open();
});

// створити візит
loginBtn.addEventListener("click", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    loginModal.open();
  } else {
    createVisitModal.open();
  }
});

// отримання карток
// ---- Завантаження карток ----
async function loadCards() {
  try {
    const cards = await getCards();

    // очищаємо контейнер перед рендером
    cardsContainer.innerHTML = "";

    if (!cards || cards.length === 0) {
      cardsContainer.innerHTML = `<p class="no-items">Поки що немає жодної картки...</p>`;
      return;
    }

    const cardsSection = document.createElement("div");
    cardsSection.classList.add(
      "cards-section",
      "fixed-grid",
      "has-3-cols-desktop",
      "has-2-cols-mobile"
    );
    cardsContainer.append(cardsSection);

    const cardList = document.createElement("ul");
    cardList.classList.add("cards-section-list", "grid");
    cardsSection.append(cardList);

    cards.forEach((card) => {
      new Card(card, cardList).render();
    });
  } catch (error) {
    console.error(`Помилка при отриманні карток: ${error}`);
  }
}

window.loadCards = loadCards;

initLoginState();
