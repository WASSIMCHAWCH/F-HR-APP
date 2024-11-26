import React, { useState, useEffect } from 'react';
import './demande.css';

const Maladie = () => {
  const initialFormData = {
    name: '',
    matricule: '',
    dateDebut: '',
    dateFin: '',
    numberdejour: '',
    commentaire: '',
    uploadedFile: null, // For file upload (img/pdf)
  };

  const [formData, setFormData] = useState(initialFormData);
  const [dragging, setDragging] = useState(false);

  // Fetch user data (name and matricule) when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/profilName', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setFormData((prevFormData) => ({
            ...prevFormData,
            name: data.name,
            matricule: data.matricule,
          }));
        } else {
          alert('Erreur lors du chargement des informations utilisateur.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };

    fetchUserData();
  }, []);

  // Handle field value changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.dateDebut ||
      !formData.dateFin ||
      !formData.numberdejour ||
      !formData.uploadedFile
    ) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const formPayload = new FormData();
    for (let key in formData) {
      formPayload.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:5000/conge-maladie', {
        method: 'POST',
        body: formPayload,
      });

      if (response.ok) {
        alert('Congé maladie enregistré avec succès!');
        setFormData(initialFormData); // Reset the form
      } else {
        alert('Erreur lors de la soumission.');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  // Handle file drop
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

  // Drag and drop events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Congé Maladie (Par Jours)</h2>

      {/* Name */}
      <div className="form-group">
        <label>Nom</label>
        <input type="text" name="name" value={formData.name} disabled />
      </div>

      {/* Matricule */}
      <div className="form-group">
        <label>Matricule</label>
        <input type="text" name="matricule" value={formData.matricule} disabled />
      </div>

      {/* Date Debut */}
      <div className="form-group">
        <label>Date Début</label>
        <input type="date" name="dateDebut" value={formData.dateDebut} onChange={handleChange} />
      </div>

      {/* Date Fin */}
      <div className="form-group">
        <label>Date Fin</label>
        <input type="date" name="dateFin" value={formData.dateFin} onChange={handleChange} />
      </div>

      {/* Number de Jour */}
      <div className="form-group">
        <label>Nombre de Jours</label>
        <input
          type="number"
          name="numberdejour"
          value={formData.numberdejour}
          onChange={handleChange}
        />
      </div>

      {/* Commentaire */}
      <div className="form-group">
        <label>Commentaire</label>
        <textarea
          name="commentaire"
          value={formData.commentaire}
          onChange={handleChange}
          placeholder="Ajoutez un commentaire"
        />
      </div>

      {/* File Upload */}
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

      {/* Submit Button */}
      <button className="btn" type="submit">
        Enregistrer
      </button>
    </form>
  );
};

export default Maladie;
