import { waiting } from "../support/selector";

describe("Waiting Functionality", () => {
  beforeEach(() => {
    cy.visit("https://qa02.stage.chairlyo.com/login");
    cy.branchAdminLogin();
  });

  it("Verify waiting can be added with valid details", () => {
    cy.xpath(waiting.waiting).click();
    cy.xpath(waiting.addWaiting).click({ force: true, multiple: true });

    cy.get(waiting.searchCustomer).type("Sarah Stha", { force: true });
    cy.contains("Sarah Stha").click({ force: true });

    cy.xpath(waiting.nextButton)
      .should("be.visible")
      .and("not.be.disabled")
      .click();
    cy.xpath(waiting.addService).click({ force: true });
    cy.xpath(waiting.serviceSearch).type("Facial Massage", { force: true });
    cy.contains("Facial Massage").click({ force: true });
    cy.xpath(waiting.searchdone).click({ force: true });
    cy.xpath(waiting.assignstaff).click({ force: true });
    cy.xpath(waiting.selectstaff).click({ force: true});
    // cy.contains("Sarah Stha").click({ force: true });
    cy.xpath(waiting.addToWaiting).click({ force: true });
    cy.get("body").should("contain.text", "Added to waiting");

    cy.xpath(waiting.sessionstart).click({ force: true });
    cy.xpath(waiting.completesession).click({ force: true });
    cy.xpath(waiting.submit).click({ force: true });
    cy.get("body").should("contain.text", "Session Completed");
  });
});

