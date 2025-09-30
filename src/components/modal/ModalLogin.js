import { login } from "../../constants/api.js";
import Modal from "./Modal.js";
import ModalMessage from "./ModalMessage.js"

export default class ModalLogin extends Modal {
    constructor() {
        const content = `
            <form class="login-form">
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Password" required>
                <button type="submit">Submit</button>
                <p class="forgotPassword">
                    <a href="#" class="forgotPassword-link">forgot password?</a>
                </p>
            </form>
        `;
        super({ id: "modal-login", title: "Exit", content });
    }


    create() {
        super.create();

        const form = this.modal.querySelector(".login-form");
        const loginBtn = document.querySelector(".btn-login");
        const forgotPassword = document.querySelector('.forgotPassword');

        if (forgotPassword) {
            forgotPassword.addEventListener('click', (e) => {
                e.preventDefault()
                const message = new ModalMessage("this button will not help you, you need to remember the password");

                message.create();
                message.open();
            });
        }

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = form.querySelector('input[type="email"]').value;
            const password = form.querySelector('input[type="password"]').value;

            try {
                const token = await login(email, password);
                const message = new ModalMessage("You have visited your page!");
                message.create();
                message.open();

                localStorage.setItem("token", token);

                loginBtn.textContent = "Create a visit";
                loginBtn.classList.add("create-visit");

                this.close();

                if (typeof window.loadCards === "function") {
                    window.loadCards();
                }

            } catch (error) {
                let incorrectPassword = forgotPassword.querySelector('.incorrect-password');

                if (!incorrectPassword) {
                    const message = new ModalMessage("Incorrect password, try again.", error.message);
                    message.create();
                    message.open();
                }
            }
        });
    }
}
