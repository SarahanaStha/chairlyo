import { dashboardselector } from "../support/selector";

describe('Validate Super Admin dashboard functionality', () => {
  beforeEach(() => {
    cy.visit('https://qa02.stage.chairlyo.com/login');
    cy.login();
  });

  afterEach(() => {
    cy.log('Test execution completed');
  });

  it('Verify admin dashboard page is displayed after login', () => {
    cy.get("body").should("contain.text", "Branch");
  });

  it('Verify logout from dashboard page', () => {
    cy.xpath(dashboardselector.profileicon).click();
    cy.xpath(dashboardselector.logout).click();
    cy.xpath(dashboardselector.logoutclick).click();
    cy.get("body").should("contain.text", "Login");
  });
});