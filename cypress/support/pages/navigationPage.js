function selectGroupMenuItem(groupName) {
  cy.contains("a", groupName).then((menu) => {
    cy.wrap(menu)
      .find(".expand-state")
      .invoke("attr", "ng-reflect-icon")
      .then((attr) => {
        if (attr.includes("left")) {
          cy.wrap(menu).click();
        }
      });
  });
}

export class NavigationPage {
  formLayoutPage() {
    selectGroupMenuItem("Forms");
    cy.contains("Form Layouts").click();
  }


  datepickerPage() {
    selectGroupMenuItem("Forms");
    cy.contains("Datepicker").click();
  }

  toastrPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Toastr").click();
  }

  tooltipPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Tooltip").click();
  }

  smartTablePage() {
    selectGroupMenuItem("Tables & Data");
    cy.contains("Smart Table").click();
  }
}

export const navigateTo = new NavigationPage();
