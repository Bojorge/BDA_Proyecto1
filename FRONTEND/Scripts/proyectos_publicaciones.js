const proyectos_Url = 'http://localhost:3000/api/proyectos';
const publicaciones_Url = 'http://localhost:3000/api/publicaciones';
const articulos_proy_Url = 'http://localhost:3000/api/asociar_proy_art';


let proyectosData = [];
const selectProyecto = document.getElementById('selectProyecto');
const btnAsociar = document.getElementById('btnAsociar');
const articuloCheckboxes = [];

function get(Url) {
  return fetch(Url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
}

function create(Url, data) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
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
      console.log('Respuesta de la API:', data);
      return data;
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
      throw error;
    });
}

async function fetchData() {
  try {
    // Obtener datos de proyectos desde la base de datos
    proyectosData = await get(proyectos_Url);

    // Llena el select de proyectos con los datos obtenidos
    proyectosData.forEach((proyecto) => {
      const option = document.createElement('option');
      option.value = proyecto.idPry;
      option.textContent = `${proyecto.idPry} - ${proyecto.titulo_proyecto}`;
      selectProyecto.appendChild(option);
    });
 
    const articulosData = await get(publicaciones_Url);

    // Crear checkboxes de artículos y detalles de proyectos con los datos obtenidos
    articulosData.forEach((articulo, index) => {
      const articuloItem = document.createElement('div');
      articuloItem.classList.add('articulo-item');

      const articuloLabel = document.createElement('label');
      articuloLabel.classList.add('articulo-label');
      articuloLabel.textContent = articulo.titulo_proyecto;

      const articuloDetails = document.createElement('div');
      articuloDetails.classList.add('articulo-details');
      articuloDetails.innerHTML = `
        <hr>
        <p>ID: ${articulo.idPub}</p>
        <p>Título de la publicacion: ${articulo.titulo_publicacion}</p>
        <p>Año de publicación: ${articulo.anno_publicacion}</p>
        <p>Nombre de la revista: ${articulo.nombre_revista}</p>
      `;

      const articuloCheckbox = document.createElement('input');
      articuloCheckbox.setAttribute('type', 'checkbox');
      articuloCheckbox.setAttribute('data-articulo-id', articulo.idPub); // Agrega el ID del articulo como atributo data

      articuloItem.appendChild(articuloLabel);
      articuloItem.appendChild(articuloDetails);
      articuloItem.appendChild(articuloCheckbox);

      
      // Agregar el proyecto al contenedor de proyectos
      document.querySelector('.column:nth-child(2)').appendChild(articuloItem);

      articuloCheckboxes.push(articuloCheckbox);
    });

    selectProyecto.addEventListener('change', () => {
      const selectedId = selectProyecto.value;
      selectedProyecto = proyectosData.find((proyecto) => proyecto.idPry == selectedId);
      if (selectedProyecto) {
        // Muestra los detalles del proyecto
        proyectoDetails.innerHTML = `
          <h3>Detalles del Proyecto</h3>
          <p>ID: ${selectedProyecto.idPry}</p>
          <p>Título del proyecto: ${selectedProyecto.titulo_proyecto}</p>
          <p>Año de inicio: ${selectedProyecto.anno_inicio}</p>
          <p>Duración en meses: ${selectedProyecto.duracion_meses}</p>
          <p>Área de conocimiento: ${selectedProyecto.area_conocimiento}</p>
        `;
      } else {
        // Si no se selecciona un proyecto, limpia los detalles
        proyectoDetails.innerHTML = '';
      }
    });

  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}

btnAsociar.addEventListener('click', () => {
  // Obtén el ID del proyecto seleccionado
  const selectedProyectoId = selectProyecto.value;
  
  // Crea un arreglo para almacenar los IDs de los artículos seleccionados
  const selectedArticulos = [];

  // Itera a través de los checkboxes de artículo para encontrar los seleccionados
  articuloCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const articuloId = checkbox.getAttribute('data-articulo-id'); // Obtiene el ID del artículo desde el atributo data
      selectedArticulos.push(articuloId);
    }
  });

  // Verifica las condiciones antes de enviar los datos al servidor
  if (selectedProyectoId && selectedArticulos.length > 0) {
    // Ambos criterios se cumplen, puedes enviar los datos al servidor
    const data = {
      proyectoId: selectedProyectoId,
      articulosIds: selectedArticulos
    };


    console.log(data);


    // Llama a la función para enviar los datos al servidor (aquí puedes usar la función "create" que ya tienes)
    create(articulos_proy_Url, data)
      .then(() => {
        // Éxito, puedes mostrar un mensaje de éxito o realizar otras acciones
        alert('Asociación exitosa');
      })
      .catch((error) => {
        // Ocurrió un error al enviar los datos al servidor, muestra un mensaje de error o maneja el error de otra manera
        console.error('Error al asociar:', error);
      });
  } else {
    // Al menos uno de los criterios no se cumple, muestra una alerta
    alert('Debes seleccionar un proyecto y al menos un artículo antes de asociar.');
  }
});

// También agrega controladores de eventos para los checkboxes de artículo
articuloCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    // Verifica si al menos un artículo está seleccionado para habilitar o deshabilitar el botón "Asociar"
    const alMenosUnArticuloSeleccionado = [...articuloCheckboxes].some((cb) => cb.checked);
    btnAsociar.disabled = !alMenosUnArticuloSeleccionado;
  });
});

// Llamar a la función para obtener datos
fetchData();
