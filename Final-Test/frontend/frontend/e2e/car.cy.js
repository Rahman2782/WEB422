describe("Car Inventory App", () => {
  it("loads the main page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Used Car Inventory");
  });

  it("adds a new car", () => {
    cy.visit("http://localhost:3000/add");
    cy.get('input[name="make"]').type("BMW");
    cy.get('input[name="model"]').type("X5");
    cy.get('input[name="year"]').type("2021");
    cy.get('input[name="price"]').type("50000");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.contains("BMW");
  });
});
