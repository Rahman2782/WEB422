const cars = require("../data/carData");

let nextId = cars.length + 1;

const getCars = (req, res) => {
  res.json(cars);
};

const getCarById = (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: "Car not found" });
  res.json(car);
};

const addCar = (req, res) => {
  const { make, model, year, price } = req.body;
  if (!make || !model || !year || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newCar = { id: nextId++, make, model, year, price };
  cars.push(newCar);
  res.status(201).json(newCar);
};

const updateCar = (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: "Car not found" });

  const { make, model, year, price } = req.body;
  if (make) car.make = make;
  if (model) car.model = model;
  if (year) car.year = year;
  if (price) car.price = price;

  res.json(car);
};

const deleteCar = (req, res) => {
  const index = cars.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Car not found" });
  const deletedCar = cars.splice(index, 1);
  res.json(deletedCar[0]);
};

module.exports = { getCars, getCarById, addCar, updateCar, deleteCar };
