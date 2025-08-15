"use client"

import { useRef, useEffect } from "react"

export default function AddEditCar({ isOpen, currentCar, formLoading, onClose, onSubmit, onInputChange }) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.bootstrap && modalRef.current) {
      const modalInstance =
        window.bootstrap.Modal.getInstance(modalRef.current) || new window.bootstrap.Modal(modalRef.current)
      if (isOpen) {
        modalInstance.show()
      } else {
        modalInstance.hide()
      }
    }
  }, [isOpen])

  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : ""}`}
      ref={modalRef}
      tabIndex={-1}
      aria-labelledby="addEditCarModalLabel"
      aria-hidden={!isOpen}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addEditCarModalLabel">
              {currentCar.id ? "Edit Car Details" : "Add New Car"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="make" className="form-label">
                  Make
                </label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  value={currentCar.make}
                  onChange={onInputChange}
                  className="form-control"
                  placeholder="e.g., Toyota"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="model" className="form-label">
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={currentCar.model}
                  onChange={onInputChange}
                  className="form-control"
                  placeholder="e.g., Camry"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="year" className="form-label">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={currentCar.year}
                  onChange={onInputChange}
                  className="form-control"
                  placeholder="e.g., 2020"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={currentCar.price}
                  onChange={onInputChange}
                  className="form-control"
                  placeholder="e.g., 22000"
                  min="0"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="color" className="form-label">
                  Color
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={currentCar.color}
                  onChange={onInputChange}
                  className="form-control"
                  placeholder="e.g., Silver"
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={formLoading}>
                {formLoading ? "Saving..." : currentCar.id ? "Update Car" : "Add Car"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
