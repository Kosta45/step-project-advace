// src/components/modal/ModalExit.js
import Modal from "./Modal.js";

export default class ModalExit extends Modal {
    constructor() {
        super({
            id: "modal-out-account",
            title: "Ви впевнені, що хочете вийти з акаунта?",
            content: `
        <div class="modal-actions">
          <button type="button" class="btn-logout-yes">Так</button>
          <button type="button" class="btn-logout-no">Ні</button>
        </div>
      `
        });
    }

    // перевизначаємо create, щоб після рендера прикріпити слухачі до кнопок
    create() {
        super.create();

        // Невеликий захист — інпутів може не бути, тому перевіряємо
        const yes = this.modal.querySelector(".btn-logout-yes");
        const no = this.modal.querySelector(".btn-logout-no");

        if (yes) {
            yes.addEventListener("click", () => {
                // тут робимо реальний логаут: видалити токен, оновити UI і т.д.
                localStorage.removeItem("token");
                console.log("Вийшли з акаунта");
                this.close();
                // наприклад, можна перезавантажити сторінку або оновити кнопку
                // location.reload();
            });
        }

        if (no) {
            no.addEventListener("click", () => this.close());
        }
    }
}
