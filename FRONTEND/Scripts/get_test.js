// JavaScript en tu frontend (puede ser en un archivo .js separado)
const apiUrl = 'http://localhost:3000'; // Cambia esto por la URL de tu servidor Node.js

document.addEventListener('DOMContentLoaded', () => {
  const getUsersButton = document.getElementById('getUsersButton');
  const userList = document.getElementById('userList');

  getUsersButton.addEventListener('click', () => {
    fetch(`${apiUrl}/consulta`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then((data) => {
        // Procesa los datos y muestra en tu frontend
        userList.innerHTML = ''; // Limpia la lista anterior
        data.forEach((user) => {
          const listItem = document.createElement('li');
          listItem.textContent = user.name; // Supongamos que los usuarios tienen un campo "name"
          userList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});
