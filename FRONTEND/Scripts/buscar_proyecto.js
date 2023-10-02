const proyectosUrl_2 = 'http://localhost:3000/api/proyectos';
const buscar_proyectoUrl = 'http://localhost:3000/api/buscar_proyecto/';


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


 const titulo_proyecto = document.getElementById('nombreEditar');
 const anno_inicio = document.getElementById('tituloEditar');
 const duracion_meses = document.getElementById('institucionEditar');
 const area_conocimiento = document.getElementById('emailEditar');
 const btnBuscar = document.getElementById('btnEditar');


 const selectProyecto = document.getElementById('selectProyecto');
 const investigadoresTable = document.getElementById('investigadoresList');
 const publicacionesTable = document.getElementById('publicacionesList');
  
 

 btnBuscar.addEventListener('click', () => {
    const idProyecto = selectProyecto.value;

    if (idProyecto) {
        // Realizar la solicitud para obtener investigadores y publicaciones relacionados con el proyecto
        get(buscar_proyectoUrl + idProyecto)
        .then((response) => {
            investigadoresTable.innerHTML = '';
            publicacionesTable.innerHTML = '';

            // Llenar la tabla de investigadores
            response.investigadores.forEach((investigador) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${investigador.nombre_completo}</td>
                    <td>${investigador.titulo_academico}</td>
                    <td>${investigador.institucion}</td>
                    <td>${investigador.email}</td>
                `;
                investigadoresTable.appendChild(row);
            });

            // Llenar la tabla de publicaciones
            response.publicaciones.forEach((publicacion) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${publicacion.titulo_publicacion}</td>
                    <td>${publicacion.anno_publicacion}</td>
                    <td>${publicacion.nombre_revista}</td>
                `;
                publicacionesTable.appendChild(row);
            });
        })
        .catch((error) => {
            console.error('Error al obtener los datos:', error);
            alert('Proyecto no encontrado o error al cargar los datos', error);
        });
    }
});

 



  get(proyectosUrl_2)
  .then((response) => {    

  // Llenar opciones del select
  response.forEach((proyecto) => {
    const option = document.createElement('option');
    option.value = proyecto.idPry;
    option.textContent = `${proyecto.idPry} - ${proyecto.titulo_proyecto}`;
    selectProyecto.appendChild(option);
  });

  titulo_proyecto.textContent = ``;
  anno_inicio.textContent = ``;
  duracion_meses.textContent = ``;
  area_conocimiento.textContent = ``;

  selectProyecto.addEventListener('change', () => {
    const selectedId = selectProyecto.value;
    // Buscar el investigador seleccionado en la lista de investigadores
    const selectedProyect = response.find(
      (proyecto) => proyecto.idPry === selectedId
    );
    if (selectedProyect) {
      // Actualizar campos de edición con los datos del investigador seleccionado

      titulo_proyecto.textContent = `Titulo: ${selectedProyect.titulo_proyecto}`;
      anno_inicio.textContent = `Año de inicio: ${selectedProyect.anno_inicio}`;
      duracion_meses.textContent = `Duracion: ${selectedProyect.duracion_meses}`;
      area_conocimiento.textContent = `Area de conocimiento: ${selectedProyect.area_conocimiento}`;
    }
  });

  

  })
  .catch((error) => {
    console.error('Error al obtener los datos:', error);
});




