import CarCard from "../components/CarCard"

export default function CarList({ cars, carsLoading, onEdit, onDelete }) {
  return (
    <section className="bg-light p-4 rounded shadow-sm">
      <h2 className="mb-4">Current Inventory</h2>
      {carsLoading ? (
        <p className="text-center">Loading cars...</p>
      ) : cars.length === 0 ? (
        <p className="text-center">No cars in inventory. Add some!</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </section>
  )
}
