import { deleteCard, updateCard } from "../../constants/api.js";
import { ModalCreateVisit } from "../modal/index.js";
import ModalMessage from "../modal/ModalMessage.js";

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
            <div class="card-content hidden-info">
                <p class="card-content-info"><strong>Doctor:</strong> ${this.data.doctor}</p>
                <p class="card-content-info"><strong>Full name:</strong> ${this.data.fullName}</p>
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
      const message = new ModalMessage("deleted card", true);
      message.create();
      message.open();
    });

    if (this.data.urgency === "urgent") {
      card.classList.add("card-urgent");
    }

    card.querySelector(".btn-show").addEventListener("click", (e) => {
      e.preventDefault();
      const cardContent = card.querySelector(".card-content");
      if (!cardContent.dataset.expanded) {
        cardContent.innerHTML = `
            <p class="card-content-info"><strong>Doctor:</strong> ${
              this.data.doctor || "-"
            }</p>
            <p class="card-content-info"><strong>Full name:</strong> ${
              this.data.fullName || "-"
            }</p>
            <p class="card-extra-info"><strong>Purpose:</strong> ${
              this.data.purpose || "-"
            }</p>
            <p class="card-extra-info"><strong>Description:</strong> ${
              this.data.description || "-"
            }</p>
            <p class="card-extra-info"><strong>Urgency:</strong> ${
              this.data.urgency || "-"
            }</p>
            <p class="card-extra-info"><strong>Status:</strong> ${
              this.data.status || "open"
            }</p>
            ${
              this.data.doctor === "cardiologist"
                ? `
                <p class="card-extra-info"><strong>Normal pressure:</strong> ${
                  this.data.bp || "-"
                }</p>
                <p class="card-extra-info"><strong>Body mass index:</strong> ${
                  this.data.bmi || "-"
                }</p>
                <p class="card-extra-info"><strong>Past diseases:</strong> ${
                  this.data.diseases || "-"
                }</p>
            `
                : ""
            }
            ${
              this.data.doctor === "dentist"
                ? `
                <p><strong>Last visit:</strong> ${
                  this.data.lastVisit || "-"
                }</p>
            `
                : ""
            }
            ${
              this.data.doctor === "therapist"
                ? `
                <p><strong>Age:</strong> ${this.data.age || "-"}</p>
            `
                : ""
            }
        `;
        cardContent.dataset.expanded = "true";
        cardContent.classList.toggle("hidden-info");
        e.target.textContent = "Show less";
      } else {
        cardContent.classList.toggle("hidden-info");
        delete cardContent.dataset.expanded;
        e.target.textContent = "Show more";
      }
    });

    card.querySelector(".btn-edit").addEventListener("click", (e) => {
      e.preventDefault();
      const modal = new ModalCreateVisit(
        "Edit visit",
        async (formData) => {
          try {
            await updateCard(this.data.id, formData);
            await loadCards();
          } catch (err) {
            const message = new ModalMessage("deleted card", err.message);
            message.create();
            message.open();
          }
        },
        this.data
      );
      modal.create();
      modal.open();
    });

    this.container.appendChild(card);
  }
}

export default Visit;
