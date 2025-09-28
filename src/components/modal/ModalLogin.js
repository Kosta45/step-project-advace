import { login } from "../../constants/api.js";
import Modal from "./Modal.js";

export default class ModalLogin extends Modal {
    constructor() {
        const content = `
            <form class="login-form">
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Пароль" required>
                <button type="submit">Увійти</button>
                <p class="forgotPassword">
                    <a href="#" class="forgotPassword-link"> забули пароль ?</a>
                    <span class="joke-login">дуже-дуже шкода :-(</span>
                </p>
            </form>
        `;
        super({ id: "modal-login", title: "Вхід", content });
    }

    fan() {

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
                const forgotPassword = document.querySelector('.forgotPassword');

                let incorrectPassword = forgotPassword.querySelector('.incorrect-password');

                if (!incorrectPassword) {
                    incorrectPassword = document.createElement('p');
                    incorrectPassword.classList.add('incorrect-password');
                    incorrectPassword.textContent = 'не вірний пароль';

                    const link = forgotPassword.querySelector('.forgotPassword-link');
                    forgotPassword.insertBefore(incorrectPassword, link);
                }

                forgotPassword.addEventListener('click', (e) => {
                    e.preventDefault();
                    const joke = document.querySelector('.joke-login');
                    const isHidden = getComputedStyle(joke).display === 'none';
                    joke.style.display = isHidden ? 'block' : 'none';
                });

            }
        });
    }
}
