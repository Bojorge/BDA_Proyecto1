const proyectosUrl_2 = 'http://localhost:3000/api/proyectos';
const buscar_area_conocimientoUrl = 'http://localhost:3000/api/buscar_area_conocimiento/';


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
 const proyectosTable = document.getElementById('proyectosList');
 const publicacionesTable = document.getElementById('publicacionesList');
  
 

 btnBuscar.addEventListener('click', () => {
    const area = selectProyecto.value;

    if (area) {
        // Realizar la solicitud para obtener investigadores y publicaciones relacionados con el proyecto
        get(buscar_area_conocimientoUrl + area)
        .then((response) => {
            proyectosTable.innerHTML = '';
            publicacionesTable.innerHTML = '';

            // Llenar la tabla de investigadores
            response.proyectos.forEach((proyecto) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${proyecto.titulo_proyecto}</td>
                    <td>${proyecto.anno_inicio}</td>
                    <td>${proyecto.duracion_meses}</td>
                    <td>${proyecto.area_conocimiento}</td>
                `;
                proyectosTable.appendChild(row);
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
    option.value = proyecto.area_conocimiento;
    option.textContent = `${proyecto.area_conocimiento}`;
    selectProyecto.appendChild(option);
  });

  
  area_conocimiento.textContent = ``;

  selectProyecto.addEventListener('change', () => {
    const selectedArea = selectProyecto.value;
    // Buscar el investigador seleccionado en la lista de investigadores
    const selectedProyectArea = response.find(
      (proyecto) => proyecto.area_conocimiento === selectedArea
    );
    if (selectedProyectArea) {
      // Actualizar campos de edición con los datos del investigador seleccionado

      
      area_conocimiento.textContent = `Area de conocimiento: ${selectedProyectArea.area_conocimiento}`;
    }
  });

  

  })
  .catch((error) => {
    console.error('Error al obtener los datos:', error);
});




