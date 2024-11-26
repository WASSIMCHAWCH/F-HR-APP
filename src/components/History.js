import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoriquePage = () => {
  const [previewFile, setPreviewFile] = useState(null); // Stocke le fichier à prévisualiser
  const [previewType, setPreviewType] = useState(null); // Stocke le type du fichier
  const [matricule, setMatricule] = useState(null); // Store matricule
  const [data, setData] = useState([]);

  // Fetch user matricule
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
          setMatricule(data.matricule); // Store matricule
        } else {
          alert('Erreur lors du chargement des informations utilisateur.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };

    fetchUserData();
  }, []);

  // Fetch history data when matricule is set
  useEffect(() => {
    if (!matricule) return; // Wait until matricule is available

    const fetchHistoryData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/history_maladie', {
          params: { matricule }, // Pass matricule as a query parameter
        });

        setData(response.data); // Set fetched data
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchHistoryData();
  }, [matricule]); // Depend on matricule






  const handlePreview = (fileData, fileType) => {
    if (!fileData) {
      console.error("Aucune donnée de fichier disponible pour la prévisualisation.");
      return;
    }
    setPreviewFile(`data:${fileType};base64,${fileData}`);
    setPreviewType(fileType);
  };


  

  const closePreview = () => {
    setPreviewFile(null);
    setPreviewType(null);
  };

  return (
    <div className="container">
      <h1>Historique des Congés Maladie</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Matricule</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Commentaire</th>
            <th>Fichier</th>
            <th>Actions</th>
            <th>Créé le</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.matricule}</td>
              <td>{item.date_debut}</td>
              <td>{item.date_fin}</td>
              <td>{item.commentaire}</td>
              <td>
                {item.file_data && (
                  <a
                    href={`data:${item.file_type};base64,${item.file_data}`}
                    download={item.name}
                  >
                    Télécharger
                  </a>
                )}
              </td>
              <td>
                {item.file_data && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handlePreview(item.file_data, item.file_type)}
                  >
                    Afficher
                  </button>
                )}
              </td>
              <td>{new Date(item.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal pour afficher la pièce jointe */}
      {previewFile && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Aperçu de la pièce jointe</h5>
                <button type="button" className="btn-close" onClick={closePreview}></button>
              </div>
              <div className="modal-body text-center">
                {previewType.startsWith('image') ? (
                  <img src={previewFile} alt="Pièce jointe" style={{ maxWidth: '100%' }} />
                ) : previewType === 'application/pdf' ? (
                  <iframe
                    src={previewFile}
                    title="Pièce jointe"
                    style={{ width: '100%', height: '500px' }}
                  ></iframe>
                ) : (
                  <p>Ce type de fichier ne peut pas être prévisualisé.</p>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closePreview}>
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoriquePage;
