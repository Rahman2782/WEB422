"use client"

export default function CarCard({ car, onEdit, onDelete }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">
            {car.make} {car.model}
          </h5>
          <p className="card-text">
            <strong>Year:</strong> {car.year}
          </p>
          <p className="card-text">
            <strong>Price:</strong> ${Number.parseFloat(car.price).toLocaleString()}
          </p>
          <p className="card-text">
            <strong>Color:</strong> {car.color}
          </p>
          <div className="d-flex justify-content-end">
            <button onClick={() => onEdit(car)} className="btn btn-primary btn-sm me-2">
              Edit
            </button>
            <button onClick={() => onDelete(car.id)} className="btn btn-danger btn-sm">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
