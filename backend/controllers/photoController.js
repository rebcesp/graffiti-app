const Photo = require('../models/Photo');
const cloudinary = require('cloudinary').v2;

// Configurar Cloudinary (agrega esto al inicio del archivo)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Subir una foto
exports.uploadPhoto = async (req, res) => {
  const { description, location } = req.body;
  const { path } = req.file; // path es la ruta temporal del archivo subido

  try {
    // Subir la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(path, {
      folder: 'graffiti-app', // Carpeta en Cloudinary
    });

    // Crear una nueva foto en la base de datos
    const photo = new Photo({
      user: req.user.id, // ID del usuario autenticado
      description,
      imageUrl: result.secure_url, // URL de la imagen en Cloudinary
      location,
    });

    await photo.save();

    res.status(201).json(photo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error al subir la foto');
  }
};

// Obtener todas las fotos
exports.getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().populate('user', 'username'); // Populate para obtener el nombre del usuario
    res.json(photos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error al obtener las fotos');
  }
};