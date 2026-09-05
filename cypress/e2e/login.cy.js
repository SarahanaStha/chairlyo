import { loginselector } from '../support/selector';

describe('Validate login functionality', () => {
  beforeEach(() => {
    cy.visit('https://qa02.stage.chairlyo.com/login');
  });

  afterEach(() => {
    cy.log('Test execution completed');
  });

  it('Verify login with valid credentials', () => {
    cy.get(loginselector.email).type("skilladmin@test.com");
    cy.get(loginselector.password).type("Skill@123");
    cy.xpath(loginselector.login).click();
    cy.get("body").should("contain.text", "Login");
  });

  it('Verify login with invalid credentials', () => {
    cy.get(loginselector.email).type("skilladmin06@test.com");
    cy.get(loginselector.password).type("Skill@456");
    cy.xpath(loginselector.login).click();
    cy.get("body").should("contain.text", "Invalid credentials");
  });

  it('Verify login with empty email', () => {
    cy.get(loginselector.email);
    cy.get(loginselector.password).type("Skill@123");
    cy.xpath(loginselector.login).click();
    cy.get("body").should("contain.text", "Invalid email address");
  });

  it('Verify login with empty password', () => {
    cy.get(loginselector.email).type("skilladmin@test.com");
    cy.get(loginselector.password);
    cy.xpath(loginselector.login).click();
    cy.get("body").should("contain.text", "Password is required");
  });

  it('Verify login with empty email and password', () => {
    cy.get(loginselector.email);
    cy.get(loginselector.password);
    cy.xpath(loginselector.login).click();
    cy.get("body").should("contain.text", "Invalid email address");
    cy.get("body").should("contain.text", "Password is required");
  });

  it('Verify with invalid email format', () => {
    cy.get(loginselector.email).type("skilladmintest.com");
    cy.get(loginselector.password).type("Skill@123");
    cy.xpath(loginselector.login).click();
    cy.get("body").should("not.contain.text", "Please include an '@' in the email address. 'skilladmintest.com' is missing an '@'.");
  });


  it('Verify with an uppercase email format', () => {
    cy.get(loginselector.email).type("SKILLADMIN@TEST.COM");
    cy.get(loginselector.password).type("Skill@123");
    cy.xpath(loginselector.login).click();
    cy.get("body").should("not.contain.text", "Login Successful");
  });

  it('Verify login with leading spaces in email and password', () => {
    cy.get(loginselector.email).type("  skilladmin@test.com");
    cy.get(loginselector.password).type("  Skill@123");
    cy.xpath(loginselector.login).click();
    cy.get("body").should("not.contain.text", "Login successful");
  });
});