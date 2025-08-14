import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'; 

const DrugForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    summary: '',
    availableQuantity: 0,
    ...initialData,
  });

  useEffect(() => {
    setFormData({ ...initialData });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'availableQuantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', summary: '', availableQuantity: 0 });
  };

  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Summary</Form.Label>
        <Form.Control
          type="text"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Available Quantity</Form.Label>
        <Form.Control
          type="number"
          name="availableQuantity"
          value={formData.availableQuantity}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        {initialData.uuid ? 'Update Drug' : 'Add Drug'}
      </Button>
    </Form>
  );
};

export default DrugForm;