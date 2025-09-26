import { Modal } from "./index.js"
import { createCard } from "../../../src/constants/api.js";


export default class ModalCreateVisit extends Modal {
    constructor() {
        super({
            id: "create-visit",
            title: "Створення візиту",
            content: `
        <form class="visit-form">
          <div class="form-group">
            <label for="visit-doctor">Лікар</label>
            <select id="visit-doctor" name="doctor" required>
              <option value="">Оберіть лікаря</option>
              <option value="cardiologist">Кардіолог</option>
              <option value="dentist">Стоматолог</option>
              <option value="therapist">Терапевт</option>
            </select>
          </div>

          <div class="form-group">
            <label for="visit-purpose">Мета візиту</label>
            <input type="text" id="visit-purpose" name="purpose" required />
          </div>

          <div class="form-group">
            <label for="visit-description">Короткий опис</label>
            <textarea id="visit-description" name="description"></textarea>
          </div>

          <div class="form-group">
            <label for="visit-urgency">Терміновість</label>
            <select id="visit-urgency" name="urgency" required>
              <option value="low">Низька</option>
              <option value="normal">Звичайна</option>
              <option value="high">Висока</option>
            </select>
          </div>

          <div class="modal-actions">
            <button type="submit" class="btn-create-visit">Створити</button>
            <button type="button" class="btn-cancel-visit">Скасувати</button>
          </div>
        </form>
      `
        });
    }

    create() {
        super.create();

        const form = this.modal.querySelector(".visit-form");
        const cancelBtn = this.modal.querySelector(".btn-cancel-visit");

        if (form) {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();

                const formData = new FormData(form);
                const visit = Object.fromEntries(formData.entries());

                try {
                    const newVisit = await createCard(visit); // виклик API
                    console.log("✅ Візит створено:", newVisit);

                    // 🔹 Можна одразу оновити список візитів у UI
                    // renderCard(newVisit);

                    this.close();
                } catch (err) {
                    console.error("❌ Помилка створення візиту:", err.message);
                    alert("Не вдалося створити візит. Перевірте дані.");
                }
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener("click", () => this.close());
        }
    }
}
