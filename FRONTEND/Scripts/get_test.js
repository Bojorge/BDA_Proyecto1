
const apiUrl = 'http://localhost:3000/api';

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
          listItem.textContent = `Nombre: ${user.nombre}, Profesión: ${user.profesion}, Edad: ${user.edad.low}`;
          userList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});