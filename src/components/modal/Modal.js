class Modal {
    // очікуємо об'єкт або без аргументів
    constructor({ id = "", title = "", content = "" } = {}) {
        this.id = id;
        this.title = title;
        this.content = content; // ВАЖЛИВО: ім'я має збігатися з тим, що передаєш
        this.modal = null;
    }

    create() {
        if (this.modal) return; // якщо вже створено — не створюємо вдруге

        this.modal = document.createElement("div");
        this.modal.classList.add("modal", "hidden");
        if (this.id) this.modal.id = this.id;

        this.modal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close" aria-label="Закрити">✖</button>
          ${this.title ? `<h2>${this.title}</h2>` : ""}
          ${this.content}
        </div>
      `;

        // кнопка закриття
        const closeBtn = this.modal.querySelector(".modal-close");
        if (closeBtn) closeBtn.addEventListener("click", () => this.close());

        // клік поза контентом — закрити
        this.modal.addEventListener("click", (e) => {
            if (e.target === this.modal) this.close();
        });

        document.body.appendChild(this.modal);
    }

    open() {
        if (!this.modal) this.create();
        this.modal.classList.remove("hidden");
    }

    close() {
        if (!this.modal) return;
        this.modal.classList.add("hidden");
    }
}
export default Modal;
