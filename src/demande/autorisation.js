import React, { useState, useEffect } from 'react';
import './demande.css'; // Import CSS

const Autorisation = () => {
  const [formData, setFormData] = useState({
    name: '',
    matricule: '',
    date: '',
    heureDebut: '',
    heureFin: '',
    nombredeheure: '',
    commentaire: '',
  });

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/profilName', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include credentials if required
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
  }, []); // Run once on mount

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const { date, heureDebut, heureFin, nombredeheure } = formData;
    if (!date || !heureDebut || !heureFin || !nombredeheure) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/autorisation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Autorisation enregistrée avec succès!');
        // Optionally reset the form after submission
        setFormData({
          name: '',
          matricule: '',
          date: '',
          heureDebut: '',
          heureFin: '',
          nombredeheure: '',
          commentaire: '',
        });
      } else {
        alert('Erreur lors de la soumission.');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Autorisation par Heure</h2>

      {/* Name */}
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

      {/* Matricule */}
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

      {/* Date */}
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      {/* Heure Début */}
      <div className="form-group">
        <label>Heure Début</label>
        <input
          type="time"
          name="heureDebut"
          value={formData.heureDebut}
          onChange={handleChange}
          required
        />
      </div>

      {/* Heure Fin */}
      <div className="form-group">
        <label>Heure Fin</label>
        <input
          type="time"
          name="heureFin"
          value={formData.heureFin}
          onChange={handleChange}
          required
        />
      </div>

      {/* Nombre de Heures */}
      <div className="form-group">
        <label>Nombre de Heures</label>
        <input
          type="number"
          name="nombredeheure"
          value={formData.nombredeheure}
          onChange={handleChange}
          required
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

      {/* Submit Button */}
      <button className="btn" type="submit">
        Enregistrer
      </button>
    </form>
  );
};

export default Autorisation;
