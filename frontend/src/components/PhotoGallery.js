import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/photos');
        setPhotos(response.data);
      } catch (err) {
        console.error('Error al obtener las fotos:', err);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div>
      {photos.map((photo) => (
        <div key={photo._id} style={{ marginBottom: '20px' }}>
          <img src={photo.imageUrl} alt={photo.description} style={{ width: '300px', height: 'auto' }} />
          <p>{photo.description}</p>
          <p>Subido por: {photo.user.username}</p>
          <p>Ubicación: {photo.location}</p>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;