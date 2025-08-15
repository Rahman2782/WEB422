import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Button, Container } from "react-bootstrap";

export default function EditCar() {
  const [form, setForm] = useState({ make: "", model: "", year: "", price: "" });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/cars/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, year: parseInt(form.year), price: parseInt(form.price) })
    });
    router.push("/");
  };

  return (
    <Container>
      <h1 className="my-4">Edit Car</h1>
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
        <Button type="submit" variant="success">Update Car</Button>
      </Form>
    </Container>
  );
}
