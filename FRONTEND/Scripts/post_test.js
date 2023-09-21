const apiUrl = 'http://localhost:3000/api/investigadores';

function getData(){
    document.addEventListener('DOMContentLoaded', () => {
        const addUserForm = document.getElementById('addUserForm');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
      
        addUserForm.addEventListener('submit', (e) => {
          e.preventDefault(); // Evita que el formulario se envíe automáticamente
      
          const formData = new FormData(addUserForm);
      
          // Convierte los datos del formulario en un objeto JSON
          const investigador = {};
          formData.forEach((value, key) => {
            investigador[key] = value;
          });
      
         post(apiUrl, investigador);
         
        });
    });
}






function post(Url, data) {
    // Configura las opciones para la solicitud POST
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Cambia el tipo de contenido según corresponda
        // Puedes agregar encabezados adicionales aquí si es necesario
      },
      body: JSON.stringify(data), // Convierte el objeto de datos a formato JSON
    };
  
    // Realiza la solicitud POST a la API
    return fetch(Url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no se pudo completar correctamente');
        }
        return response.json(); // Parsea la respuesta JSON si la hay
      })
      .then(data => {
        // Maneja los datos de respuesta aquí
        console.log('Respuesta de la API:', data);
        return data;
      })
      .catch(error => {
        // Maneja errores de la solicitud aquí
        console.error('Error en la solicitud:', error);
        throw error; // Puedes personalizar cómo manejar los errores según tus necesidades
      });
  }



  getData();