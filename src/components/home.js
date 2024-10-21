import React, { useState } from 'react';
import './app.css'; // Import CSS

const DemandeConge = () => {
  const [formData, setFormData] = useState({
    typeConge: 'parJour', // Default to "par jour"
    heureDebut: '',
    heureFin: '',
    dateDebut: '',
    dateFin: '',
    totalTimeOff: '',
  });

  const [isParHeure, setIsParHeure] = useState(false); // Determines if "par heure" is selected

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setIsParHeure(value === 'parHeure');
    setFormData({ ...formData, typeConge: value, heureDebut: '', heureFin: '', dateDebut: '', dateFin: '' });
  };

  const calculateTimeOff = () => {
    let totalTimeOff = '';
    if (isParHeure) {
      const start = parseFloat(formData.heureDebut);
      const end = parseFloat(formData.heureFin);
      totalTimeOff = `${end - start} heures`; // Simplified calculation
    } else {
      const startDate = new Date(formData.dateDebut);
      const endDate = new Date(formData.dateFin);
      const timeDifference = Math.abs(endDate - startDate);
      const daysOff = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1; // Add 1 to include both start and end dates
      totalTimeOff = `${daysOff} jours`;
    }
    setFormData({ ...formData, totalTimeOff });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    calculateTimeOff(); // Calculate time off when the form is submitted

    try {
      const response = await fetch('http://localhost:5000/demande', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Demande de congé enregistrée avec succès!');
      } else {
        alert('Erreur lors de la soumission.');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Demande de Congé</h2>

      {/* Select type of conge */}
      <div className="form-group">
        <label>Type de congé</label>
        <div>
          <input
            type="radio"
            name="typeConge"
            value="parJour"
            checked={!isParHeure}
            onChange={handleTypeChange}
          />
          <label>Par jour</label>
          <input
            type="radio"
            name="typeConge"
            value="parHeure"
            checked={isParHeure}
            onChange={handleTypeChange}
          />
          <label>Par heure</label>
        </div>
      </div>

      {/* Case 1: Par Heure */}
      {isParHeure && (
        <>
          <div className="form-group">
            <label>Heure début</label>
            <input
              type="number"
              name="heureDebut"
              value={formData.heureDebut}
              onChange={handleChange}
              min="0"
              max="24"
              step="0.5"
              placeholder="Ex: 9.5 pour 9h30"
            />
          </div>

          <div className="form-group">
            <label>Heure fin</label>
            <input
              type="number"
              name="heureFin"
              value={formData.heureFin}
              onChange={handleChange}
              min="0"
              max="24"
              step="0.5"
              placeholder="Ex: 18 pour 18h"
            />
          </div>
        </>
      )}

      {/* Case 2: Par Jour */}
      {!isParHeure && (
        <>
          <div className="form-group">
            <label>Date début</label>
            <input
              type="date"
              name="dateDebut"
              value={formData.dateDebut}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date fin</label>
            <input
              type="date"
              name="dateFin"
              value={formData.dateFin}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {/* Display the total time off */}
      <div className="form-group">
        <label>Total Congé: {formData.totalTimeOff}</label>
      </div>

      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default DemandeConge;
