document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const file = document.getElementById('fileInput').files[0];
    const description = document.getElementById('descriptionInput').value;
    const location = document.getElementById('locationInput').value;
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('location', location);
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/photos/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      console.log('Foto subida:', data);
      alert('Foto subida correctamente');
    } catch (err) {
      console.error('Error al subir la foto:', err);
      alert('Error al subir la foto');
    }
  });