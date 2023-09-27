const investigadores_Url = 'http://localhost:3000/api/investigadores';
const proyectos_Url = 'http://localhost:3000/api/proyectos';
const inv_proy_Url = 'http://localhost:3000/api/asociar_inv_proy';

let investigadoresData = [];
const selectInvestigador_ = document.getElementById('selectInvestigador_');

const btnAsociar = document.getElementById('btnAsociar');
const projectCheckboxes = [];


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
    // Obtener datos de investigadores desde la base de datos
    investigadoresData = await get(investigadores_Url);

    // Llena el select de investigadores con los datos obtenidos
    investigadoresData.forEach((investigador) => {
      const option = document.createElement('option');
      option.value = investigador.id;
      option.textContent = `${investigador.id} - ${investigador.nombre_completo}`;
      selectInvestigador_.appendChild(option);
    });

    // Obtener datos de proyectos desde la base de datos
    const proyectosData = await get(proyectos_Url);




    //const projectCheckboxes = [];


    // Crear checkboxes y detalles de proyectos con los datos obtenidos
   proyectosData.forEach((proyecto, index) => {
    const projectItem = document.createElement('div');
    projectItem.classList.add('project-item');

    const projectLabel = document.createElement('label');
    projectLabel.classList.add('project-label');
    projectLabel.textContent = proyecto.nombre;

    const projectDetails = document.createElement('div');
    projectDetails.classList.add('project-details');
    projectDetails.innerHTML = `
      <p>ID: ${proyecto.idPry}</p>
      <p>Titulo del proyecto: ${proyecto.titulo_proyecto}</p>
      <p>Año de inicio: ${proyecto.anno_inicio}</p>
      <p>Duración en meses: ${proyecto.duracion_meses}</p>
      <p>Área de conocimiento: ${proyecto.area_conocimiento}</p>
      <hr>
    `;

    const projectCheckbox = document.createElement('input');
    projectCheckbox.setAttribute('type', 'checkbox');
    projectCheckbox.setAttribute('data-proyecto-id', proyecto.idPry); // Agrega el ID del proyecto como atributo data

    projectItem.appendChild(projectLabel);
    projectItem.appendChild(projectDetails);
    projectItem.appendChild(projectCheckbox);

    // Agregar el proyecto al contenedor de proyectos
    document.querySelector('.column:nth-child(2)').appendChild(projectItem);

    projectCheckboxes.push(projectCheckbox);
    });


    selectInvestigador_.addEventListener('change', () => {
        const selectedId = selectInvestigador_.value;
        selectedInvestigador = investigadoresData.find((investigador) => investigador.id == selectedId);
        if (selectedInvestigador) {
          // Muestra los detalles del investigador
          investigadorDetails.innerHTML = `
            <h3>Detalles del Investigador</h3>
            <p>ID: ${selectedInvestigador.id}</p>
            <p>Nombre: ${selectedInvestigador.nombre_completo}</p>
            <p>Título Académico: ${selectedInvestigador.titulo_academico}</p>
            <p>Institución: ${selectedInvestigador.institucion}</p>
            <p>Email: ${selectedInvestigador.email}</p>
          `;
        } else {
          // Si no se selecciona un investigador, limpia los detalles
          investigadorDetails.innerHTML = '';
        }
    });

  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}




btnAsociar.addEventListener('click', () => {
  // Obtén el ID del investigador seleccionado
  const selectedInvestigadorId = selectInvestigador_.value;
  
  // Crea un arreglo para almacenar los IDs de los proyectos seleccionados
  const selectedProyectos = [];

  // Itera a través de los checkboxes de proyecto para encontrar los seleccionados
  projectCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const projectId = checkbox.getAttribute('data-proyecto-id'); // Obtiene el ID del proyecto desde el atributo data
      selectedProyectos.push(projectId);
    }
  });


  // Verifica las condiciones antes de enviar los datos al servidor
  if (selectedInvestigadorId && selectedProyectos.length > 0) {
      // Ambos criterios se cumplen, puedes enviar los datos al servidor
      const data = {
          investigadorId: selectedInvestigadorId,
          proyectosIds: selectedProyectos,
      };
      
      // Llama a la función para enviar los datos al servidor (aquí puedes usar la función "create" que ya tienes)
      create(inv_proy_Url, data)
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
      alert('Debes seleccionar un investigador y al menos un proyecto antes de asociar.');
  }
});

// También agrega controladores de eventos para los checkboxes de proyecto
projectCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
      // Verifica si al menos un proyecto está seleccionado para habilitar o deshabilitar el botón "Asociar"
      const alMenosUnProyectoSeleccionado = [...projectCheckboxes].some((cb) => cb.checked);
      btnAsociar.disabled = !alMenosUnProyectoSeleccionado;
  });
});




// Llamar a la función para obtener datos
fetchData();
