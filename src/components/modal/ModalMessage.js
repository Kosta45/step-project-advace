import Modal from "./Modal.js";

class ModalMessage extends Modal {
    constructor(message, isError = false) {
        super({
            id: "modal-message",
        });
        this.message = message;
        this.isError = isError;
    }

    create() {
        if (this.modal || !document.body) return;

        this.modal = document.createElement("div");
        this.modal.classList.add("modal-message", "hidden");
        if (this.id) this.modal.id = this.id;

        this.modal.innerHTML = `
        <div class="modal-content-message">
            <span class="modal-close-message">✖</span>
            <p class="${this.isError ? 'message-error' : 'message'}">${this.message}</p>
        </div>
    `;

        const closeBtn = this.modal.querySelector(".modal-close-message");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => this.close());
        }

        this.modal.addEventListener("click", (e) => {
            if (e.target === this.modal) this.close();
        });

        document.body.appendChild(this.modal);

        setTimeout(() => {
            this.close();
        }, 3000);
    }
}

export default ModalMessage;


