// Función para cargar y enviar el archivo CSV
async function uploadCSV() {
    const csvFileInput = document.getElementById('csvFile');
    const file = csvFileInput.files[0];
  
    if (!file) {
      alert('Por favor, selecciona un archivo CSV.');
      return;
    }
  
    // Lee el contenido del archivo CSV
    const csvData = await readFile(file);
  
    // Convierte el contenido CSV en un array de objetos
    const dataObjects = parseCSV(csvData);
  
    // Envía los datos al API
    sendDataToAPI(dataObjects);
  }
  
  // Función para leer el contenido del archivo
  function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        resolve(event.target.result);
      };
  
      reader.onerror = (event) => {
        reject(event.target.error);
      };
  
      reader.readAsText(file);
    });
  }
  
  // Función para analizar el contenido CSV y convertirlo en un array de objetos
  function parseCSV(csvData) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    const dataObjects = [];
  
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].split(',');
      const dataObject = {};
  
      for (let j = 0; j < headers.length; j++) {
        dataObject[headers[j].trim()] = line[j].trim();
      }
  
      dataObjects.push(dataObject);
    }
  
    return dataObjects;
  }
  

// Función para enviar los datos al API
async function sendDataToAPI(dataObjects) {
    const apiUrl = 'http://localhost:3000/api/investigadores';
  
    for (const dataObject of dataObjects) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObject),
      };
  
      try {
        const response = await fetch(apiUrl, requestOptions);
        if (response.ok) {
          console.log(`Datos enviados al API con éxito para ID: ${dataObject.id}`);
        } else {
          console.error(`Error al enviar los datos al API para ID: ${dataObject.id}`);
        }
      } catch (error) {
        console.error(`Error al enviar los datos al API para ID: ${dataObject.id}`, error);
      }
    }
  
    alert('Todos los datos han sido enviados al API con éxito.');
  }
  
  