import { getCards } from '../constants/api.js';
import * as Visit from '../components/card/index.js';

const cardsContainer = document.querySelector("#cards-container");

// Функція для підсвітки збігів у тексті
function highlightText(text, search) {
  if (!search) return text;
  const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

export async function searchAndRenderCards(searchValue = "") {
  const cards = await getCards();
  const lowerSearch = searchValue.toLowerCase();

  const filteredCards = cards.filter(card => {
    const fullName = card.fullName?.toLowerCase() || "";
    const purpose = card.purpose?.toLowerCase() || "";
    const description = card.description?.toLowerCase() || "";
    return (
      fullName.includes(lowerSearch) ||
      purpose.includes(lowerSearch) ||
      description.includes(lowerSearch)
    );
  });

  cardsContainer.innerHTML = "";

  if (!filteredCards.length) {
    cardsContainer.innerHTML = `<p class="no-items">Нічого не знайдено...</p>`;
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

  filteredCards.forEach(card => {
    const highlightedCard = {
      ...card,
      fullName: highlightText(card.fullName || "", searchValue),
      purpose: highlightText(card.purpose || "", searchValue),
      description: highlightText(card.description || "", searchValue)
    };

    switch (card.doctor) {
      case "dentist":
        new Visit.VisitDentist(highlightedCard, cardList).render();
        break;
      case "cardiologist":
        new Visit.VisitCardiologist(highlightedCard, cardList).render();
        break;
      case "therapist":
        new Visit.VisitTherapist(highlightedCard, cardList).render();
        break;
    }
  });
}
