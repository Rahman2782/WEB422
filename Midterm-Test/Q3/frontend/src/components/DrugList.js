import React from 'react';

const DrugList = ({ drugs, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Summary</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {drugs.map((drug) => (
          <tr key={drug.uuid}>
            <td>{drug.name}</td>
            <td>{drug.summary}</td>
            <td>{drug.availableQuantity}</td>
            <td>
              <button onClick={() => onEdit(drug)}>Edit</button>
              <button onClick={() => onDelete(drug.uuid)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DrugList;