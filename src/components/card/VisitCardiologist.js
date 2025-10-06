import Visit from "./Visit.js";

class VisitCardiologist extends Visit {
    render() {
        const extraFields = `
            <p><strong>Normal pressure:</strong> ${this.data.bp || "-"}</p>
            <p><strong>Body mass index:</strong> ${this.data.bmi || "-"}</p>
            <p><strong>Past illnesses:</strong> ${this.data.diseases || "-"}</p>
            <p><strong>Age:</strong> ${this.data.age || "-"}</p>
        `;
        this.renderBase(extraFields);
    }
}

export default VisitCardiologist;