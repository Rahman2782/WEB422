"use client"

import { useState, useEffect } from "react"
import AddEditCar from "../components/AddEditCar"
import CarList from "../components/CarList"
import DeleteConfirmCar from "../components/DeleteConfirmCar"

import 'bootstrap/dist/css/bootstrap.css';


const CarDealershipApp = () => {
  const [cars, setCars] = useState([])
  const [currentCar, setCurrentCar] = useState({
    id: null,
    make: "",
    model: "",
    year: "",
    price: "",
    color: "",
  })
  const [carsLoading, setCarsLoading] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [carToDeleteId, setCarToDeleteId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nextId, setNextId] = useState(1)

  // --- Simulated Backend API Functions ---
  const showTemporaryMessage = (msg, type = "success") => {
    setMessage({ text: msg, type: type })
    setTimeout(() => setMessage(null), 3000)
  }

  const simulateFetchCars = async () => {
    setCarsLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const storedCars = JSON.parse(localStorage.getItem("cars_inventory")) || [
        { id: 1, make: "Toyota", model: "Camry", year: 2020, price: "22000", color: "Silver" },
        { id: 2, make: "Honda", model: "Civic", year: 2019, price: "18500", color: "Blue" },
        { id: 3, make: "Ford", model: "F-150", year: 2021, price: "35000", color: "Black" },
      ]
      setCars(storedCars)
      const maxId = storedCars.reduce((max, car) => Math.max(max, car.id), 0)
      setNextId(maxId + 1)
    } catch (err) {
      setError("Failed to fetch cars.")
      showTemporaryMessage("Failed to fetch cars.", "danger")
    } finally {
      setCarsLoading(false)
    }
  }

  const simulateAddCar = async (car) => {
    setFormLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newCar = { ...car, id: nextId }
      const updatedCars = [...cars, newCar]
      setCars(updatedCars)
      localStorage.setItem("cars_inventory", JSON.stringify(updatedCars))
      setNextId((prevId) => prevId + 1)
      return newCar
    } catch (err) {
      setError("Failed to add car.")
      showTemporaryMessage("Failed to add car.", "danger")
      throw err
    } finally {
      setFormLoading(false)
    }
  }

  const simulateUpdateCar = async (id, updatedCar) => {
    setFormLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const updatedCars = cars.map((car) => (car.id === id ? { ...updatedCar, id: id } : car))
      setCars(updatedCars)
      localStorage.setItem("cars_inventory", JSON.stringify(updatedCars))
      return updatedCars.find((car) => car.id === id)
    } catch (err) {
      setError("Failed to update car.")
      showTemporaryMessage("Failed to update car.", "danger")
      throw err
    } finally {
      setFormLoading(false)
    }
  }

  const simulateDeleteCar = async (id) => {
    setFormLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const updatedCars = cars.filter((car) => car.id !== id)
      setCars(updatedCars)
      localStorage.setItem("cars_inventory", JSON.stringify(updatedCars))
      return { success: true }
    } catch (err) {
      setError("Failed to delete car.")
      showTemporaryMessage("Failed to delete car.", "danger")
      throw err
    } finally {
      setFormLoading(false)
    }
  }

  useEffect(() => {
    simulateFetchCars()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentCar({ ...currentCar, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!currentCar.make || !currentCar.model || !currentCar.year || !currentCar.price || !currentCar.color) {
      setError("All fields are required.")
      return
    }

    try {
      if (currentCar.id) {
        await simulateUpdateCar(currentCar.id, currentCar)
        showTemporaryMessage("Car updated successfully!")
      } else {
        await simulateAddCar(currentCar)
        showTemporaryMessage("Car added successfully!")
      }
      resetForm()
      setIsModalOpen(false)
    } catch (err) {
      console.error("Submission error:", err)
    }
  }

  const handleEditClick = (car) => {
    setCurrentCar({ ...car })
    setIsModalOpen(true)
  }

  const handleDeleteClick = (id) => {
    setCarToDeleteId(id)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    if (carToDeleteId) {
      try {
        await simulateDeleteCar(carToDeleteId)
        showTemporaryMessage("Car deleted successfully!")
      } catch (err) {
        console.error("Deletion error:", err)
      } finally {
        setShowDeleteConfirm(false)
        setCarToDeleteId(null)
      }
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setCarToDeleteId(null)
  }

  const resetForm = () => {
    setCurrentCar({ id: null, make: "", model: "", year: "", price: "", color: "" })
    setError(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  return (
    <div className="container-fluid py-4">


      <header className="bg-primary text-white p-4 rounded mb-4 shadow-sm">
        <h1 className="text-center">Used Car Dealership Inventory</h1>
      </header>

      <main className="container">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> {error}
            <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close"></button>
          </div>
        )}

        {message && (
          <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
            {message.text}
            <button type="button" className="btn-close" onClick={() => setMessage(null)} aria-label="Close"></button>
          </div>
        )}

        <button
          onClick={() => {
            resetForm()
            setIsModalOpen(true)
          }}
          className="btn btn-success mb-4"
        >
          Add New Car
        </button>

        <CarList
          cars={cars}
          carsLoading={carsLoading}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </main>

      <AddEditCar
        isOpen={isModalOpen}
        currentCar={currentCar}
        formLoading={formLoading}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
      />

      <DeleteConfirmCar
        isOpen={showDeleteConfirm}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
}

export default CarDealershipApp