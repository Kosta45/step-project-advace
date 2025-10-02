import { deleteCard, updateCard } from "../../constants/api.js";
import { ModalCreateVisit } from "../modal/index.js";
import ModalMessage from "../modal/ModalMessage.js"

class Visit {
    constructor(data, container) {
        this.data = data;
        this.container = container;
    }

    renderBase(extraFields = "") {
        const card = document.createElement("li");
        card.classList.add("card-item", "cell");

        card.innerHTML = `
        <div class="card">
            <div class="card-content">
                <p><strong>Doctor:</strong> ${this.data.doctor}</p>
                <p><strong>Purpose:</strong> ${this.data.purpose}</p>
                <p><strong>Description:</strong> ${this.data.description}</p>
                <p><strong>Urgency:</strong> ${this.data.urgency}</p>
            </div>

            <footer class="card-footer">
                <a href="#" class="card-footer-item btn-show">Show more</a>
                <a href="#" class="card-footer-item btn-edit">Edit</a>
                <a href="#" class="card-footer-item card-close" data-id="${this.data.id}">Delete</a>
            </footer>
        </div>
        `;

        const cardContent = card.querySelector(".card-content");

        card.querySelector(".card-close").addEventListener("click", async (e) => {
            e.preventDefault();
            await deleteCard(this.data.id);
            card.remove();
            await loadCards();
            const message = new ModalMessage("deleted card")
            message.create();
            message.open()
        });

        card.querySelector(".btn-show").addEventListener("click", (e) => {
            e.preventDefault();
            if (!cardContent.dataset.expanded) {
                cardContent.innerHTML = `
                    <p><strong>Doctor:</strong> ${this.data.doctor}</p>
                    <p><strong>purpose:</strong> ${this.data.purpose}</p>
                    <p><strong>Description:</strong> ${this.data.description}</p>
                    <p><strong>Urgency:</strong> ${this.data.urgency}</p>
                    <p><strong>Full name:</strong> ${this.data.fullName || "-"}</p>
                    ${extraFields}
                `;
                cardContent.dataset.expanded = "true";
                e.target.textContent = "Show less";
            } else {
                cardContent.innerHTML = `
                    <p><strong>Doctor:</strong> ${this.data.doctor}</p>
                    <p><strong>purpose:</strong> ${this.data.purpose}</p>
                    <p><strong>Description:</strong> ${this.data.description}</p>
                    <p><strong>Urgency:</strong> ${this.data.urgency}</p>
                `;
                delete cardContent.dataset.expanded;
                e.target.textContent = "Show more";
            }
        });

        card.querySelector(".btn-edit").addEventListener("click", (e) => {
            e.preventDefault();
            const modal = new ModalCreateVisit("Edit visit", async (formData) => {
                try {
                    await updateCard(this.data.id, formData);
                    await loadCards();
                } catch (err) {
                    const message = new ModalMessage("deleted card", err.message)
                    message.create();
                    message.open()
                }
            }, this.data);
            modal.create();
            modal.open();
        });

        this.container.appendChild(card);
    }
}

export default Visit;