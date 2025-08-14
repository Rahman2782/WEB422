import React from 'react';
import { Table, Button } from 'react-bootstrap'; 

const DrugList = ({ drugs, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
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
              <Button variant="warning" size="sm" onClick={() => onEdit(drug)} className="me-2">Edit</Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(drug.uuid)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DrugList;