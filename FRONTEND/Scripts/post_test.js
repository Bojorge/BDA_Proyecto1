const apiUrl = 'http://localhost:3000/api/investigadores';  

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

      // Realiza una solicitud POST para agregar el investigador
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(investigador),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al agregar investigador');
          }
          return response.json();
        })
        .then((data) => {
          // Procesa los datos como desees (por ejemplo, muestra una confirmación)
          successMessage.style.display = 'block'; // Muestra el mensaje de éxito
          errorMessage.style.display = 'none'; // Oculta el mensaje de error

          // Oculta el mensaje de éxito después de 3 segundos
          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 3000);
        })
        .catch((error) => {
          console.error('Error:', error);
          errorMessage.style.display = 'block'; // Muestra el mensaje de error
          successMessage.style.display = 'none'; // Oculta el mensaje de éxito
        });
    });
});



