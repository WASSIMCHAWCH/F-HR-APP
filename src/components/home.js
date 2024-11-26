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
    nombreDeJours: '',
    justificationJour: '',
    nombreDHeures: '',
    justificationHeure: '',
    uploadedFile: null, // New state for uploaded file
  });

  const [isParHeure, setIsParHeure] = useState(false); // Determines if "par heure" is selected
  const [dragging, setDragging] = useState(false); // State for drag-over effect

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setIsParHeure(value === 'parHeure');
    setFormData({
      ...formData,
      typeConge: value,
      heureDebut: '',
      heureFin: '',
      dateDebut: '',
      dateFin: '',
      nombreDeJours: '',
      justificationJour: '',
      nombreDHeures: '',
      justificationHeure: '',
      uploadedFile: null,
    });
  };

  const calculateTimeOff = () => {
    let totalTimeOff = '';
    if (isParHeure) {
      const start = parseFloat(formData.heureDebut);
      const end = parseFloat(formData.heureFin);
      totalTimeOff = `${end - start} heures`;
    } else {
      const startDate = new Date(formData.dateDebut);
      const endDate = new Date(formData.dateFin);
      const timeDifference = Math.abs(endDate - startDate);
      const daysOff = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;
      totalTimeOff = `${daysOff} jours`;
    }
    setFormData({ ...formData, totalTimeOff });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    calculateTimeOff();

    const formPayload = new FormData();
    for (let key in formData) {
      formPayload.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:5000/demande', {
        method: 'POST',
        body: formPayload,
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

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setFormData({ ...formData, uploadedFile: file });
    } else {
      alert('Seuls les fichiers PDF et images sont acceptés.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
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

          <div className="form-group">
            <label>Nombre de jour</label>
            <input
              type="number"
              name="nombreDeJours"
              value={formData.nombreDeJours}
              onChange={handleChange}
              placeholder="Nombre de jours"
            />
          </div>

          <div className="form-group">
            <label>Commentaire comme justif</label>
            <textarea
              name="justificationJour"
              value={formData.justificationJour}
              onChange={handleChange}
              placeholder="Justification"
            />
          </div>

          {/* Drag-and-drop upload */}
          <div
            className={`form-group drop-zone ${dragging ? 'drag-over' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <p>Glissez-déposez une image ou un PDF ici, ou cliquez pour sélectionner un fichier.</p>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
                  setFormData({ ...formData, uploadedFile: file });
                } else {
                  alert('Seuls les fichiers PDF et images sont acceptés.');
                }
              }}
            />
            {formData.uploadedFile && <p>Fichier: {formData.uploadedFile.name}</p>}
          </div>
        </>
      )}

      {/* Display the total time off */}
      <div className="form-group">
        <label>Total Congé: {formData.totalTimeOff}</label>
      </div>

      <button className="btn" type="submit">Enregistrer</button>
    </form>
  );
};

export default DemandeConge;
