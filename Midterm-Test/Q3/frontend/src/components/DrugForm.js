import React, { useState, useEffect } from 'react';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Summary:</label>
        <input
          type="text"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Available Quantity:</label>
        <input
          type="number"
          name="availableQuantity"
          value={formData.availableQuantity}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{initialData.uuid ? 'Update Drug' : 'Add Drug'}</button>
    </form>
  );
};

export default DrugForm;