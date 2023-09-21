const apiUrl = 'http://localhost:3000/api/investigadores';

function getData_from_html() {
  document.addEventListener('DOMContentLoaded', () => {
    const updateUserForm = document.getElementById('updateUserForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
  
    updateUserForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita que el formulario se envíe automáticamente
  
      const formData = new FormData(updateUserForm);
  
      // Convierte los datos del formulario en un objeto JSON
      const investigador = {};
      formData.forEach((value, key) => {
        investigador[key] = value;
      });
  
      update(apiUrl, investigador);
    });
  });
}

function update(url, data) {
  // Configura las opciones para la solicitud PUT (o POST si prefieres)
  const requestOptions = {
    method: 'PUT', // Cambia a 'POST' si tu API utiliza POST para actualizar
    headers: {
      'Content-Type': 'application/json', // Cambia el tipo de contenido según corresponda
    },
    body: JSON.stringify(data), // Convierte el objeto de datos a formato JSON
  };

  // Realiza la solicitud PUT (o POST) a la API
  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no se pudo completar correctamente');
      }
      return response.json(); // Parsea la respuesta JSON si la hay
    })
    .then(data => {
      // Maneja los datos de respuesta aquí
      console.log('Respuesta de la API:', data);
      successMessage.style.display = 'block';
      errorMessage.style.display = 'none';
    })
    .catch(error => {
      // Maneja errores de la solicitud aquí
      console.error('Error en la solicitud:', error);
      successMessage.style.display = 'none';
      errorMessage.style.display = 'block';
    });
}

getData_from_html();
