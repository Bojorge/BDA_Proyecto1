const investigadoresUrl_2 = 'http://localhost:3000/api/investigadores';
const buscar_investigadorUrl = 'http://localhost:3000/api/buscar_investigador/';


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


 const selectInv = document.getElementById('selectInvestigador');

 const nombreInv = document.getElementById('nombreEditar');
 const tituloAcademico = document.getElementById('tituloEditar');
 const institucion = document.getElementById('institucionEditar');
 const email = document.getElementById('emailEditar');
 const btnBuscar = document.getElementById('btnEditar');


 



 btnBuscar.addEventListener('click', () => {
    const idInvestigador = selectInv.value;

    if (idInvestigador) {
        // Realizar la solicitud para obtener proyectos relacionados con el investigador
        get(buscar_investigadorUrl + idInvestigador)
            .then((response) => {
                proyectosList.innerHTML = '';

                // Llenar la tabla con los datos de los proyectos
                response.forEach((proyecto) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${proyecto.idPry}</td>
                        <td>${proyecto.titulo_proyecto}</td>
                        <td>${proyecto.anno_inicio}</td>
                        <td>${proyecto.duracion_meses}</td>
                        <td>${proyecto.area_conocimiento}</td>
                    `;
                    proyectosList.appendChild(row);
                });
            })
            .catch((error) => {
                console.error('Error al obtener los datos:', error);
                alert('Investigador no encontrado', error);
            });
    }
});

 



  get(investigadoresUrl_2)
  .then((response) => {    

  // Llenar opciones del select
  response.forEach((investigador) => {
    const option = document.createElement('option');
    option.value = investigador.id;
    option.textContent = `${investigador.id} - ${investigador.nombre_completo}`;
    selectInv.appendChild(option);
  });

  nombreInv.textContent = ``;
  tituloAcademico.textContent = ``;
  institucion.textContent = ``;
  email.textContent = ``;

  selectInv.addEventListener('change', () => {
    const selectedId = selectInv.value;
    // Buscar el investigador seleccionado en la lista de investigadores
    const selectedInvestigador = response.find(
      (investigador) => investigador.id === selectedId
    );
    if (selectedInvestigador) {
      // Actualizar campos de edición con los datos del investigador seleccionado

      nombreInv.textContent = `Nombre Completo: ${selectedInvestigador.nombre_completo}`;
      tituloAcademico.textContent = `Título Académico: ${selectedInvestigador.titulo_academico}`;
      institucion.textContent = `Institución: ${selectedInvestigador.institucion}`;
      email.textContent = `Email: ${selectedInvestigador.email}`;
    }
  });

  })
  .catch((error) => {
    console.error('Error al obtener los datos:', error);
});




