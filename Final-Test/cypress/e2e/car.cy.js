// cypress/e2e/car.cy.js

describe("Car Inventory App E2E Tests", () => {
  beforeEach(() => {
    cy.clearLocalStorage(); 
    cy.visit("http://localhost:3000/"); 
  });

  it("loads the main page and displays the header", () => {
    cy.contains("Used Car Dealership Inventory").should("be.visible");
    cy.contains("Current Inventory").should("be.visible");
    cy.contains("No cars in inventory. Add some!").should("not.exist");
  });

  it("adds a new car successfully", () => {
    cy.get("button").contains("Add New Car").click();
    cy.get(".modal-title").should("contain", "Add New Car");
    cy.get('input[name="make"]').type("BMW");
    cy.get('input[name="model"]').type("X5");
    cy.get('input[name="year"]').type("2021");
    cy.get('input[name="price"]').type("50000");
    cy.get('input[name="color"]').type("Black");
    cy.get(".modal-footer button").contains("Add Car").click();
    cy.contains("Car added successfully!").should("be.visible");
    cy.contains("BMW X5").should("be.visible");
    cy.contains("Year: 2021").should("be.visible");
    cy.contains("Price: $50,000").should("be.visible");
    cy.contains("Color: Black").should("be.visible");
  });

  it("edits an existing car", () => {
    cy.contains("Honda Civic")
      .parents(".card")
      .find("button")
      .contains("Edit")
      .click();

    cy.get(".modal-title").should("contain", "Edit Car Details");
    cy.get('input[name="price"]').should("have.value", "18500");

    cy.get('input[name="price"]').clear().type("19500");
    cy.get('input[name="color"]').clear().type("Dark Blue");

    cy.get(".modal-footer button").contains("Update Car").click();

    cy.contains("Car updated successfully!").should("be.visible");

    cy.contains("Honda Civic")
      .parents(".card")
      .contains("Price: $19,500")
      .should("be.visible");
    cy.contains("Honda Civic")
      .parents(".card")
      .contains("Color: Dark Blue")
      .should("be.visible");
  });

  it("deletes a car after confirmation", () => {
    cy.get("button").contains("Add New Car").click();
    cy.get('input[name="make"]').type("Nissan");
    cy.get('input[name="model"]').type("Altima Test Car");
    cy.get('input[name="year"]').type("2018");
    cy.get('input[name="price"]').type("12000");
    cy.get('input[name="color"]').type("Gray");
    cy.get(".modal-footer button").contains("Add Car").click();
    cy.contains("Car added successfully!").should("be.visible");
    cy.contains("Nissan Altima Test Car").should("be.visible");

    cy.contains("Nissan Altima Test Car")
      .parents(".card")
      .find("button")
      .contains("Delete")
      .click();

    cy.get(".modal-title").should("contain", "Confirm Deletion");

    cy.get(".modal-footer button").contains("Delete").click();

    cy.contains("Car deleted successfully!").should("be.visible");

    cy.contains("Nissan Altima Test Car").should("not.exist");
  });

  it("handles form validation for adding a car", () => {
    cy.get("button").contains("Add New Car").click();
    cy.get(".modal-title").should("contain", "Add New Car");

    cy.get(".modal-footer button").contains("Add Car").click();

    cy.get(".alert.alert-danger")
      .should("be.visible")
      .and("contain", "All fields are required.");

    cy.get(".alert-danger button.btn-close").click();
    cy.contains("All fields are required.").should("not.exist");
  });
});