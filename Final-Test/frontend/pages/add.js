import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useRouter } from "next/router";

export default function AddCar() {
  const [form, setForm] = useState({ make: "", model: "", year: "", price: "" });
  const router = useRouter();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, year: parseInt(form.year), price: parseInt(form.price) })
    });
    router.push("/");
  };

  return (
    <Container>
      <h1 className="my-4">Add Car</h1>
      <Form onSubmit={handleSubmit}>
        {["make","model","year","price"].map(field => (
          <Form.Group className="mb-3" key={field}>
            <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
            <Form.Control
              type={field === "year" || field === "price" ? "number" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </Form.Group>
        ))}
        <Button type="submit" variant="success">Add Car</Button>
      </Form>
    </Container>
  );
}
