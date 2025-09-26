// import Modal from "./Modal.js";

// class ModalVisit extends Modal {
//     constructor() {
//         const content = `
//             <form>
//                 <select required id="doctor-select">
//                     <option value="">Оберіть лікаря</option>
//                     <option value="cardio">Кардіолог</option>
//                     <option value="dentist">Стоматолог</option>
//                     <option value="therapist">Терапевт</option>
//                 </select>
//                 <div id="doctor-fields"></div>
//                 <input type="text" placeholder="Мета візиту" required>
//                 <textarea placeholder="Короткий опис"></textarea>
//                 <select required>
//                     <option value="">Терміновість</option>
//                     <option value="normal">Звичайна</option>
//                     <option value="priority">Пріоритетна</option>
//                     <option value="urgent">Невідкладна</option>
//                 </select>
//                 <input type="text" placeholder="ПІБ" required>
//                 <button type="submit">Створити</button>
//             </form>
//         `;
//         super("Створити візит", content);

//         // Додаткові поля для конкретного лікаря можна додати після створення
//         this.additionalFields = {
//             cardio: `
//                 <input type="text" placeholder="Звичайний тиск" required>
//                 <input type="text" placeholder="Індекс маси тіла" required>
//                 <input type="text" placeholder="Перенесені захворювання серця" required>
//                 <input type="text" placeholder="Вік" required>
//             `,
//             dentist: `
//                 <input type="date" placeholder="Дата останнього відвідування" required>
//             `,
//             therapist: `
//                 <input type="text" placeholder="Вік" required>
//             `
//         };
//     }

//     create() {
//         super.create();

//         const doctorSelect = this.modal.querySelector("#doctor-select");
//         const doctorFields = this.modal.querySelector("#doctor-fields");

//         doctorSelect.addEventListener("change", () => {
//             const doctor = doctorSelect.value;
//             doctorFields.innerHTML = this.additionalFields[doctor] || "";
//         });
//     }
// }

// export default ModalVisit;
