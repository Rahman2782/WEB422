const request = require("supertest");
const app = require("../src/app");

describe("Car API", () => {
  let carId;

  it("GET /api/cars - should return all cars", async () => {
    const res = await request(app).get("/api/cars");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/cars - should add a new car", async () => {
    const res = await request(app)
      .post("/api/cars")
      .send({ make: "Ford", model: "Focus", year: 2020, price: 13000 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    carId = res.body.id;
  });

  it("PUT /api/cars/:id - should update a car", async () => {
    const res = await request(app)
      .put(`/api/cars/${carId}`)
      .send({ price: 12500 });
    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(12500);
  });

  it("DELETE /api/cars/:id - should delete a car", async () => {
    const res = await request(app).delete(`/api/cars/${carId}`);
    expect(res.statusCode).toBe(200);
  });
});
