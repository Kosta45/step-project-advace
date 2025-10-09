import { Modal } from "./index.js";
import { createCard, updateCard } from "../../../src/constants/api.js";
import { loadCards } from "../../../public/index.js";
import ModalMessage from "./ModalMessage.js";

class ModalCreateVisit extends Modal {
  constructor(title = "Створення візиту", onSubmit = null, editData = null) {
    super({
      id: "create-visit",
      title,
      content: `
            <form class="visit-form">
                <div class="form-group">
                    <label for="visit-doctor">Choose a doctor:</label>
                    <select class="select is-link" id="visit-doctor" name="doctor" aria-label="Choose a doctor" required>
                        <option value="">Choose a doctor</option>
                        <option value="cardiologist">cardiologist</option>
                        <option value="dentist">dentist</option>
                        <option value="therapist">therapist</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="visit-fullName">Full name:</label>
                    <input class="input is-link" type="text" id="visit-fullName" name="fullName" placeholder="Enter your full name" aria-label="Full name" required />
                </div>
                
                <div class="form-group">
                    <label for="visit-purpose">Purpose:</label>
                    <input class="input is-link" type="text" id="visit-purpose" name="purpose" placeholder="Purpose of the visit" aria-label="purpose of the visit" required />
                </div>

                <div class="form-group">
                    <label for="Description">Description:</label>
                    <textarea class="textarea" id="Description" name="description" placeholder="Describe the problem" aria-label="Description"></textarea>
                </div>

                <div class="form-group">
                    <label for="visit-urgency">Urgency of the visit:</label>
                    <select class="select is-link" id="visit-urgency" name="urgency" aria-label="Choose urgency" required>
                        <option value="">Urgency</option>
                        <option value="ordinary">ordinary</option>
                        <option value="priority">priority</option>
                        <option value="urgent">urgent</option>
                    </select>
                </div>

                <div class="form-group doctor-field" data-doctor="cardiologist" style="display:none;">
                    <label for="visit-bp">Normal pressure:</label>
                    <input class="input is-link" type="text" id="visit-bp" name="bp" placeholder="for example..., 120/80" aria-label="Normal pressure" />
                </div>

                <div class="form-group doctor-field" data-doctor="cardiologist" style="display:none;">
                    <label for="visit-bmi">Body mass index:</label>
                    <input class="input is-link" type="text" id="visit-bmi" name="bmi" placeholder="for example..., 25" aria-label="Body mass index" />
                </div>

                <div class="form-group doctor-field" data-doctor="cardiologist" style="display:none;">
                    <label for="visit-diseases">Past cardiovascular diseases:</label>
                    <input class="input is-link" type="text" id="visit-diseases" name="diseases" placeholder="for example..., hypertension" aria-label="Past illnesses" />
                </div>

                <div class="form-group doctor-field" data-doctor="dentist" style="display:none;">
                    <label for="visit-lastVisit">Date of last visit:</label>
                    <input class="input is-link" type="date" id="visit-lastVisit" name="lastVisit" placeholder="Виберіть дату" aria-label="Date of last visit" />
                </div>

                <div class="form-group doctor-field" data-doctor="therapist" style="display:none;">
                    <label for="visit-age">Age:</label>
                    <input class="input is-link" type="text" id="visit-age" name="age" placeholder="for example..., 30" aria-label="Age" />
                </div>

                <div class="modal-actions">
                    <button type="submit" class="btn-create-visit button is-primary">${editData ? "Save" : "Create"}</button>
                    <button type="button" class="btn-cancel-visit button is-danger">Cancel</button>
                </div>
            </form>
        `,
    });
    this.onSubmit = onSubmit;
    this.editData = editData;
    this.mode = editData ? "edit" : "create";
  }



  create() {
    super.create();

    const form = this.modal.querySelector(".visit-form");
    const cancelBtn = this.modal.querySelector(".btn-cancel-visit");
    const doctorSelect = this.modal.querySelector("#visit-doctor");
    const doctorFields = this.modal.querySelectorAll(".doctor-field");

    // Додаємо поле статусу в режимі редагування
    if (this.mode === "edit") {
      const statusField = document.createElement("div");
      statusField.classList.add("form-group");
      statusField.innerHTML = `
            <label for="visit-status">Status:</label>
            <select class="select is-link" id="visit-status" name="status" aria-label="Visit status" required>
                <option value="open">Open</option>
                <option value="done">Done</option>
            </select>
        `;
      form.insertBefore(statusField, form.querySelector(".modal-actions"));
    }

    if (doctorSelect) {
      doctorSelect.addEventListener("change", () => {
        const selected = doctorSelect.value;
        doctorFields.forEach((field) => {
          field.style.display = field.dataset.doctor === selected ? "block" : "none";
        });
      });
    }

    if (this.editData) {
      this.setFormValues(this.editData);
    }

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const visit = Object.fromEntries(formData.entries());
        if (this.mode === "create") {
          visit.status = "open"; // Автоматично додаємо статус open
        }
        try {
          if (this.mode === "edit" && this.editData?.id) {
            await updateCard(this.editData.id, visit);
            await loadCards();
            const message = new ModalMessage("Візит оновлено!");
            message.create();
            message.open();
          } else {
            await createCard(visit);
            await loadCards();
            const message = new ModalMessage("Візит створено!");
            message.create();
            message.open();
          }
          this.resetForm();
          this.close();
        } catch (err) {
          console.error("Помилка збереження візиту:", err.message);
          const message = new ModalMessage(`Помилка: ${err.message}`, true);
          message.create();
          message.open();
        }
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        this.resetForm();
        this.close();
      });
    }

    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.resetForm();
        this.close();
      }
    });
  }
  setFormValues(data) {
    const form = this.modal.querySelector(".visit-form");
    if (!form) return;
    for (const [key, value] of Object.entries(data)) {
      const input = form.querySelector(`[name="${key}"]`);
      if (input) {
        input.value = value || "";
      }
    }
    const doctorSelect = form.querySelector("#visit-doctor");
    if (doctorSelect && data.doctor) {
      doctorSelect.value = data.doctor;
      doctorSelect.dispatchEvent(new Event("change"));
    }
  }

  resetForm() {
    const form = this.modal.querySelector(".visit-form");
    if (form) {
      form.reset();
      const doctorFields = this.modal.querySelectorAll(".doctor-field");
      doctorFields.forEach((field) => {
        field.style.display = "none";
      });
      const doctorSelect = form.querySelector("#visit-doctor");
      if (doctorSelect) {
        doctorSelect.value = "";
      }
    }
  }
}

export default ModalCreateVisit;