import { staff } from "../support/selector";

describe("Staff CRUD Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.branchAdminLogin();

    cy.xpath(staff.management).click();
  });

  it("Verify staff can be added with valid details", () => {
    cy.xpath(staff.staffpage).click();
    cy.xpath(staff.addstaff).eq(0).click({ force: true });

    cy.get(staff.firstname).type("Sarah");
    cy.get(staff.lastname).type("Stha");
    cy.get(staff.phone).clear().type("+977 9786543212");
    cy.get(staff.email).type("sarahanastha03@gmail.com");

    cy.xpath(staff.staffrole).should("be.visible").click();
    cy.get('input[placeholder="Search"]').filter(":visible").first().clear().type("Facial Massage");
    cy.get('button[role="checkbox"]').filter(':contains("Facial Massage")').first().should("be.visible").click();
    cy.get('button[role="checkbox"]').filter(':contains("Facial Massage")').first().should("have.attr", "aria-checked", "true");

    cy.get(staff.joineddate).click();
    cy.get('button[aria-label="Choose the Nepali month"]').click();
    cy.contains('[role="option"]', "Asar").click();
    cy.get('button[aria-label="Choose the Nepali year"]').click();
    cy.contains('[role="option"]', "2082").should("be.visible").click();
    cy.contains("button", /^3$/).click();
 
    cy.xpath(staff.roleDropdown).should("be.visible").click();
    cy.contains('[role="option"]', "Receptionist").should("be.visible").click();

    cy.xpath(staff.createstaff).should("be.visible").click();

    cy.contains("Add staff only").click();
    cy.get("body").should("contain.text","Staff Added");
  });

});