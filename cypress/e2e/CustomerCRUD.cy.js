import { customer } from "../support/selector";

describe("Customer CRUD Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.branchAdminLogin();
    cy.xpath(customer.management).click();
  });
  it("Verify Customer can be added with Valid details", () => {
    cy.xpath(customer.customerpage).click();
    cy.xpath(customer.addcustomer).eq(0).should("be.visible").click();
    cy.get(customer.firstname).type("Sarah");
    cy.get(customer.lastname).type("Stha");
    cy.get(customer.phone).clear().type("+977 9876543210");
    cy.get(customer.email).type("sarah@gmail.com");

    cy.contains('button[role="combobox"]', "Select Gender").should("be.visible").click();
    cy.get('[role="option"]').contains("Female").click();

    cy.get(customer.dob).should("be.visible").click();
    cy.get('button[aria-label="Choose the Nepali month"]').should("be.visible").click();
    cy.contains('[role="option"]', "Poush").should("be.visible").click();
    cy.get('button[aria-label="Choose the Nepali year"]').should("be.visible").click();
    cy.contains('[role="option"]', "2059").should("be.visible").click();
    cy.contains("button", /^3$/).should("be.visible").click();

    cy.get(customer.address).type("Bhaktapur, Nepal");
    cy.get(customer.note).type("Staff is very good");

    cy.xpath(customer.createcustomer).click();
  });
});