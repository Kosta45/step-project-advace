import { getCards } from "../constants/api.js";
import * as Visit from "../components/card/index.js";
import { searchAndRenderCards } from "../search/search.js";

export async function filterCards(event) {
  event.preventDefault();
  const cardsContainer = document.querySelector("#cards-container");
  const doctorSelect = document.getElementById("filter-doctor");
  const urgencySelect = document.getElementById("filter-urgency");
  const statusSelect = document.getElementById("filter-status");
  const searchInput = document.getElementById("search-input");

  const selectedDoctor = doctorSelect.value;
  const selectedUrgency = urgencySelect.value;
  const selectedStates = statusSelect.value;

  const searchValue = searchInput.value.trim().toLowerCase();

  const dataCards = await getCards();
  const filteredCards = dataCards.filter((card) => {
    const matchDoctor = selectedDoctor === "" || card.doctor === selectedDoctor;
    const matchStatus = selectedStates === "" || card.status === selectedStates;
    const matchUrgency =
      selectedUrgency === "" || card.urgency === selectedUrgency;

    return matchDoctor && matchUrgency && matchStatus;
  });

  console.log(dataCards);
  console.log(filteredCards);

  cardsContainer.innerHTML = "";

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

  filteredCards.forEach((card) => {
    // если в поиске что-то введено
    if (searchValue !== "") {
      // проверяем, есть ли совпадения в тексте карточки
      const hasMatch =
        (card.fullName && card.fullName.toLowerCase().includes(searchValue)) ||
        (card.description &&
          card.description.toLowerCase().includes(searchValue)) ||
        (card.purpose && card.purpose.toLowerCase().includes(searchValue));

      // если нет совпадений — просто пропускаем карточку
      if (!hasMatch) return;
    }

    // если фильтр и поиск прошли — рендерим карточку
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
}
