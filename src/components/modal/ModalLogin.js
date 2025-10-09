import { login } from "../../constants/api.js";
import { loadCards } from "../../../public/index.js";
import Modal from "./Modal.js";
import ModalMessage from "./ModalMessage.js";

export default class ModalLogin extends Modal {
  constructor() {
    const content = `
            <form class="login-form">
                <div class="form-group">
                    <label for="login-email">Email:</label>
                    <input type="email" id="login-email" name="email" placeholder="Enter your email" aria-label="Email" required>
                </div>
                <div class="form-group">
                    <label for="login-password">Password:</label>
                    <input type="password" id="login-password" name="password" placeholder="Enter your password" aria-label="Password" required>
                </div>
                <button type="submit" class="button is-primary">Login</button>
                <p class="forgotPassword">
                    <a href="#" class="forgotPassword-link">Forgot password?</a>
                </p>
            </form>
        `;
    super({ id: "modal-login", title: "Login", content });
  }

  create() {
    super.create();

    const form = this.modal ? this.modal.querySelector(".login-form") : null;
    const loginBtn = document.querySelector(".btn-login");
    const forgotPassword = this.modal ? this.modal.querySelector(".forgotPassword") : null;

    if (forgotPassword) {
      forgotPassword.addEventListener("click", (e) => {
        e.preventDefault();
        const message = new ModalMessage("This button will not help you, you need to remember the password", true);
        message.create();
        message.open();
      });
    }

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const { email, password } = Object.fromEntries(formData.entries());

        try {
          const token = await login(email, password);
          localStorage.setItem("token", token);

          const message = new ModalMessage("You have successfully logged in!");
          message.create();
          message.open();

          if (loginBtn) {
            loginBtn.textContent = "Create a visit";
            loginBtn.classList.add("create-visit");
          } else {
            console.error("Кнопка .btn-login не знайдена");
          }

          this.close();
          await loadCards();
        } catch (error) {
          console.error("Помилка логіну:", error.message);
          const message = new ModalMessage(`Помилка: ${error.message}`, true);
          message.create();
          message.open();
        }
      });
    } else {
      console.error("Форма .login-form не знайдена");
      const message = new ModalMessage("Помилка: форма логіну не ініціалізована", true);
      message.create();
      message.open();
    }
  }
}