import Visit from "./Visit.js";

class VisitTherapist extends Visit {
  render() {
    const extraFields = `
            <p><strong>Age:</strong> ${this.data.age || "-"}</p>
        `;
    this.renderBase(extraFields);
  }
}

export default VisitTherapist;