import { login } from "../../constants/api.js";
import Modal from "./Modal.js";

export default class ModalLogin extends Modal {
    constructor() {
        const content = `
            <form class="login-form">
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Пароль" required>
                <button type="submit">Увійти</button>
            </form>
        `;
        super({ id: "modal-login", title: "Вхід", content });
    }

    create() {
        super.create();

        const form = this.modal.querySelector(".login-form");
        const loginBtn = document.querySelector(".btn-login");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = form.querySelector('input[type="email"]').value;
            const password = form.querySelector('input[type="password"]').value;

            try {
                const token = await login(email, password);
                localStorage.setItem("token", token);

                loginBtn.textContent = "Створити візит";
                loginBtn.classList.add("create-visit");

                this.close();

                // виклик функції для завантаження карток
                if (typeof window.loadCards === "function") {
                    window.loadCards();
                }
            } catch (error) {
                alert("Невірний логін або пароль");
            }
        });
    }
}
