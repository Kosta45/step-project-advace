import { deleteCard } from "../constants/api.js";

class Card {
  constructor(data, container) {
    this.data = data;
    this.container = container;
  }

  render() {
    const card = document.createElement("li");
    card.classList.add("card-item", "cell");
    card.innerHTML = `
    <div class="card">
        <header class="card-header">
        <h2 class="card-header-title">${this.data.title}</h2>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon">
             <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
       </header>
      <div class="card-content">
      <div class="content">
         <p class="card-content-text">Лікар: ${this.data.doctor}</p>
         <p>Статус: ${this.data.status || "Open"}</p>
         <p>Терміновість: ${this.data.urgency || "Normal"}</p>
        <br />
             <div class="card-details hidden">
                <p>Мета: ${this.data.description}</p>
                <p>Вік: ${this.data.age || "дані не надані"}</p>
                <p>Тиск: ${this.data.bp || "дані не надані"}</p>
                <p>Вага: ${this.data.weight || "дані не надані"}</p>
             </div>
      </div>
      </div>
         <footer class="card-footer">
          <a href="#" class="card-footer-item btn-show">Showe more</a>
          <a href="#" class="card-footer-item btn-edit">Edit</a>
          <a href="#" class="card-footer-item card-close" data-id="${
            this.data.id
          }">Delete</a>
        </footer>
      </div>`;

    this.container.append(card);

    {
      /* <button class="card-close" data-id="${this.data.id}">✖</button>
            <h2 class="card-header-title">${this.data.title}</h2>
            <p>Лікар: ${this.data.doctor}</p>
            <p>Статус: ${this.data.status || "Open"}</p>
            <p>Терміновість: ${this.data.urgency || "Normal"}</p>
            <button class="btn-show">Показати більше</button>
            <button class="btn-edit">Редагувати</button>
            <div class="card-details hidden">
                <p>Мета: ${this.data.description}</p>
                <p>Вік: ${this.data.age || "дані не надані"}</p>
                <p>Тиск: ${this.data.bp || "дані не надані"}</p>
                <p>Вага: ${this.data.weight || "дані не надані"}</p>
            </div> */
    }

    // тут при натиску на кнопку показати більше щоб показувались деталі
    const show = card.querySelector(`.btn-show`);
    const detail = card.querySelector(`.card-details`);

    show.addEventListener(`click`, () => {
      detail.classList.toggle(`hidden`);
      show.textContent = detail.classList.contains(`hidden`)
        ? `Show more`
        : "Show less";
    });

    // видалення картки
    const close = card.querySelector(`.card-close`);
    close.addEventListener(`click`, async () => {
      await deleteCard(this.data.id);
      card.remove();
    });

    // редагування картки
    const edit = card.querySelector(`.btn-edit`);
    edit.addEventListener(`click`, () => {
      //
    });

    this.container.appendChild(card);
  }
}

export default Card;
