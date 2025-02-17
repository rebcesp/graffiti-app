import React, { useState } from 'react';
import axios from 'axios';

const UploadPhoto = () => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(''); // Para mostrar una vista previa de la imagen

  // Manejar la selección de archivos
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Mostrar vista previa
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('location', location);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/photos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Foto subida:', response.data);
      alert('Foto subida correctamente');
    } catch (err) {
      console.error('Error al subir la foto:', err);
      alert('Error al subir la foto');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} required />
      {preview && <img src={preview} alt="Vista previa" style={{ width: '200px', height: 'auto' }} />}
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Ubicación"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <button type="submit">Subir Foto</button>
    </form>
  );
};

export default UploadPhoto;