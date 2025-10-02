import Modal from "./Modal.js";

export default class ModalExit extends Modal {
    constructor() {
        super({
            id: "modal-out-account",
            title: "Are you sure you want to log out?",
            content: `
        <div class="modal-actions">
          <button type="button" class="btn-logout-yes">Yes</button>
          <button type="button" class="btn-logout-no">No</button>
        </div>
      `
        });
    }

    // перевизначаємо create, щоб після рендера прикріпити слухачі до кнопок
    create() {
        super.create();

        const yes = this.modal.querySelector(".btn-logout-yes");
        const no = this.modal.querySelector(".btn-logout-no");

        if (yes) {
            yes.addEventListener("click", async () => {
                const loginBtn = document.querySelector(".btn-login");
                const cardsContainer = document.querySelector("#cards-container");

                localStorage.removeItem("token");

                if (cardsContainer) {
                    cardsContainer.innerHTML = `<p class="no-items">Congratulations, you have left our steppe project.</p>`
                }

                loginBtn.classList.remove(`create-visit`)
                loginBtn.textContent = `Login`;

                this.close();
            });
        }

        if (no) {
            no.addEventListener("click", () => this.close());
        }
    }
}
