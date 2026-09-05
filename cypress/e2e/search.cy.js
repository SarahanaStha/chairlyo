
import { search } from "../support/selector";

describe ('Validate search functionality', () => {
    beforeEach(() => {
        cy.visit('https://qa02.stage.chairlyo.com/login');
        cy.login();
    });

    afterEach(function () {
    if (this.currentTest.state === "failed") {
      cy.log("failed " + this.currentTest.title);
    } 
    else {
      cy.log("passed " + this.currentTest.title);
    }
  });

    it('Verify search functionality with valid data', () => {
        cy.xpath(search.searchclick).type("Bhaktapur");
        cy.get("body").should("contain.text", "Bhaktapur");
    });
    
    it ('Verify search with partial branch name', () => {
        cy.xpath(search.searchclick).type("bh");
        cy.get("body").should("contain.text", "Bhaktapur");
    });

    it ('Verify search with non-existing branch name', () => {
        cy.xpath(search.searchclick).type("abcd");
        cy.get("body").should("contain.text", "Sorry");
    });

    it ('Verify search with numbers', () => {
        cy.xpath(search.searchclick).type("123");
        cy.get("body").should("contain.text", "123");
    });

    it ('Verify search with special characters', () => {
        cy.xpath(search.searchclick).type("@");
        cy.get("body").should("contain.text", "Sorry");
    }); 

    it ('verify search is case insensitive', () => {
        cy.xpath(search.searchclick).type("BHAKTAPUR");
        cy.get("body").should("contain.text", "Bhaktapur");
    });

    it ('Verify search with special characters and numbers', () => {
        cy.xpath(search.searchclick).type("Bhaktapur@123");
        cy.get("body").should("contain.text", "No results found");
    });

    it ('Verify search with empty data', () => {
        cy.xpath(search.searchclick).click();
        cy.get("body").should("contain.text", "No results found");
    });
});



 
 