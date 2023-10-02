const publicacionesUrl_2 = 'http://localhost:3000/api/publicaciones';
const buscar_publicacionUrl = 'http://localhost:3000/api/buscar_publicacion/';


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


 const selectPub = document.getElementById('selectInvestigador');

 const titulo_pub = document.getElementById('nombreEditar');
 const anno = document.getElementById('tituloEditar');
 const revista = document.getElementById('institucionEditar');

 const btnBuscar = document.getElementById('btnEditar');


 



 btnBuscar.addEventListener('click', () => {
    const idPublicacion = selectPub.value;

    if (idPublicacion) {
        // Realizar la solicitud para obtener proyectos relacionados con el investigador
        get(buscar_publicacionUrl + idPublicacion)
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

 



  get(publicacionesUrl_2)
  .then((response) => {    

  // Llenar opciones del select
  response.forEach((publicacion) => {
    const option = document.createElement('option');
    option.value = publicacion.idPub;
    option.textContent = `${publicacion.idPub} - ${publicacion.titulo_publicacion}`;
    selectPub.appendChild(option);
  });

  titulo_pub.textContent = ``;
  anno.textContent = ``;
  revista.textContent = ``;


  selectPub.addEventListener('change', () => {
    const selectedId = selectPub.value;
    // Buscar el investigador seleccionado en la lista de investigadores
    const selectedInvestigador = response.find(
      (publicacion) => publicacion.idPub === selectedId
    );
    if (selectedInvestigador) {
      // Actualizar campos de edición con los datos del investigador seleccionado

      titulo_pub.textContent = `Titulo de la publicacion: ${selectedInvestigador.titulo_publicacion}`;
      anno.textContent = `Año: ${selectedInvestigador.anno_publicacion}`;
      revista.textContent = `Revista: ${selectedInvestigador.nombre_revista}`;
      
    }
  });

  })
  .catch((error) => {
    console.error('Error al obtener los datos:', error);
});




