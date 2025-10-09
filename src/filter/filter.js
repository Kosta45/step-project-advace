import { getCards } from "../constants/api.js";
import * as Visit from "../components/card/index.js";

export async function filterCards(event) {
  event.preventDefault();
  const cardsContainer = document.querySelector("#cards-container");
  const doctorSelect = document.getElementById("filter-doctor");
  const urgencySelect = document.getElementById("filter-urgency");
  const statusSelect = document.getElementById("filter-status");

  const selectedDoctor = doctorSelect.value;
  const selectedUrgency = urgencySelect.value;
  const selectedStates = statusSelect.value;

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
