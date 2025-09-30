class Modal {
  constructor({ id = "", title = "", content = "" } = {}) {
    this.id = id;
    this.title = title;
    this.content = content; 
    this.modal = null;
  }

  create() {
    if (this.modal) return;

    this.modal = document.createElement("div");
    this.modal.classList.add("modal", "hidden");
    if (this.id) this.modal.id = this.id;

    this.modal.innerHTML = `
        <div class="modal-content">
          ${this.title ? `<h2 class="subtitle is-5">${this.title}</h2>` : ""}
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
