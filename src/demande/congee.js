import React, { useState, useEffect } from 'react';
import './demande.css'; 

const Congee = () => {
  const [formData, setFormData] = useState({
    name: '',
    matricule: '',
    dateDebut: '',
    dateFin: '',
    nombreDeJours: null,
    commentaire: '',
  });

  // Fetch name and matricule when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/profilName', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // If your API uses cookies or sessions for authentication
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
  }, []); // Empty dependency array to run only once when the component mounts

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/congeeparjour', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Congé enregistré avec succès!');
      } else {
        alert('Erreur lors de la soumission.');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Congé Par Jours</h2>

      <div className="form-group">
        <label>Nom</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled
        />
      </div>

      <div className="form-group">
        <label>Matricule</label>
        <input
          type="text"
          name="matricule"
          value={formData.matricule}
          onChange={handleChange}
          disabled
        />
      </div>

      <div className="form-group">
        <label>Date Début</label>
        <input
          type="date"
          name="dateDebut"
          value={formData.dateDebut}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Date Fin</label>
        <input
          type="date"
          name="dateFin"
          value={formData.dateFin}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Nombre Des Jours</label>
        <input
          type="number"
          name="nombreDeJours"
          value={formData.nombreDeJours}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Commentaire</label>
        <textarea
          name="commentaire"
          value={formData.commentaire}
          onChange={handleChange}
          placeholder="Ajoutez un commentaire"
        />
      </div>

      <button className="btn" type="submit">Enregistrer</button>
    </form>
  );
};

export default Congee;
