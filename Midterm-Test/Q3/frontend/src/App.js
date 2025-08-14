import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'; 
import DrugList from './components/DrugList';
import DrugForm from './components/DrugForm';
import { getDrugs, createDrug, updateDrug, deleteDrug } from './api/drugs';
import './App.css';

function App() {
  const [drugs, setDrugs] = useState([]);
  const [editingDrug, setEditingDrug] = useState(null);

  useEffect(() => {
    fetchDrugs();
  }, []);

  const fetchDrugs = async () => {
    try {
      const drugsData = await getDrugs();
      setDrugs(drugsData);
    } catch (error) {
      console.error('Error fetching drugs:', error);
    }
  };

  const handleAddOrUpdate = async (drugData) => {
    try {
      if (editingDrug) {
        await updateDrug(editingDrug.uuid, drugData);
        setEditingDrug(null);
      } else {
        await createDrug(drugData);
      }
      fetchDrugs();
    } catch (error) {
      console.error('Error adding/updating drug:', error);
    }
  };

  const handleDelete = async (uuid) => {
    try {
      await deleteDrug(uuid);
      fetchDrugs();
    } catch (error) {
      console.error('Error deleting drug:', error);
    }
  };

  const handleEdit = (drug) => {
    setEditingDrug(drug);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">💊 Drugstore Admin Panel 📋</h1>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                {editingDrug && editingDrug.uuid ? 'Edit Drug' : 'Add New Drug'}
              </Card.Title>
              <DrugForm onSubmit={handleAddOrUpdate} initialData={editingDrug || {}} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Current Drug Inventory</Card.Title>
              <DrugList drugs={drugs} onEdit={handleEdit} onDelete={handleDelete} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;