import React, { useState, useEffect } from 'react';
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
    <div className="App">
      <header>
        <h1>💊 Drugstore Admin Panel 📋</h1>
      </header>
      <main>
        <section>
          <h2>{editingDrug ? 'Edit Drug' : 'Add New Drug'}</h2>
          <DrugForm onSubmit={handleAddOrUpdate} initialData={editingDrug} />
        </section>
        <section>
          <h2>Current Drug Inventory</h2>
          <DrugList drugs={drugs} onEdit={handleEdit} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}

export default App;