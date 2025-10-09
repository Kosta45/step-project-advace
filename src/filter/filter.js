import { getCards } from "../constants/api.js";

const filterBtn = document.querySelector(".btn-filter");

export async function filterCards(event) {
  event.preventDefault();
  const doctorSelect = document.getElementById("filter-doctor");
  const urgencySelect = document.getElementById("filter-priority");

  const selectedDoctor = doctorSelect.value;
  const selectedUrgency = urgencySelect.value;
  //   const selectedStates = statusSelect.value;

  const dataCards = await getCards();
  const filteredCards = dataCards.filter((card) => {
    const matchDoctor = selectedDoctor === "" || card.doctor === selectedDoctor;
    const matchUrgency =
      selectedUrgency === "" || card.urgency === selectedUrgency;
    // const matchStatus = "";
    return matchDoctor && matchUrgency;
  });

  console.log(dataCards);
  console.log(filteredCards);
  return filteredCards;
}

filterBtn.addEventListener("click", filterCards);
