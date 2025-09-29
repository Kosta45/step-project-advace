import { getCards } from "./constants/api.js";
import * as Modals from "./components/modal/index.js";
import Card from "./components/Card.js";

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
async function loadCards() {
  try {
    const cards = await getCards();
    cardsContainer.innerHTML = "";

    if (!cards.length) {
      cardsContainer.innerHTML = `<p class="no-items">No items have been added...</p>`;
      return;
    }

    cards.forEach((card) => {
      new Card(card, cardsContainer).render();
    });
  } catch (error) {
    console.error(`Помилка при отриманні карток: ${error}`);
  }
}

window.loadCards = loadCards;

initLoginState();
