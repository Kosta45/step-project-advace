import { deleteCard } from "../constants/api.js";

class Card {
    constructor(data, container) {
        this.data = data;
        this.container = container;
    }

    render() {
        const card = document.createElement(`section`);
        card.classList.add(`card`);

        card.innerHTML = `
            <button class="card-close" data-id="${this.data.id}">✖</button>
            <h2>${this.data.title}</h2>
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
            </div>
        `;

        // тут при натиску на кнопку показати більше щоб показувались деталі
        const show = card.querySelector(`.btn-show`);
        const detail = card.querySelector(`.card-details`);

        show.addEventListener(`click`, () => {
            detail.classList.remove(`hidden`);
            show.textContent = detail.classList.contains(`hidden`)
                ? `показати більше`
                : 'сховати';
        });

        // видалення картки
        const close = card.querySelector(`.card-close`);
        close.addEventListener(`click`, async () => {
            await deleteCard(this.data.id);
            card.remove();
        })

        // редагування картки
        const edit = card.querySelector(`.btn-edit`);
        edit.addEventListener(`click`, () => {
            // 
        })

        this.container.appendChild(card)
    }
}

export default Card;