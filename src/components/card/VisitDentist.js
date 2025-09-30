import Visit from "./Visit.js";

class VisitDentist extends Visit {
  render() {
    const extraFields = `
            <p><strong>Date of last visit:</strong> ${this.data.lastVisit || "-"}</p>
        `;
    this.renderBase(extraFields);
  }
}

export default VisitDentist;