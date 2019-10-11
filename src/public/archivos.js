const getButton = document.querySelector("#getButton");
const postButton = document.querySelector("#postButton");                        //Se obtienen la ruta de los botones 
var datos = document.getElementById("historial");
var datos2 = document.getElementById("div2");

const url = "http://localhost:3000/users";
const urlp = "http://localhost:3000/pusers";                                    // rutas para hacer el Get y Post


var input = myForm.myInput;                                                     //Se obtiene el archivo seleccionado en la pagina

var reader = new FileReader;                                                    //Variable que lee el archivo subido

input.addEventListener('change', onChange);                                     //Cuando detecta un cambio en el boton para subir archivos llama al metodo onChange.

function onChange(event) {
  var file = event.target.files[0];                                             //Del arreglo de archivos que se selecciona solo guardara el primero en una variable

  reader.readAsText(file);                                                      //Declara que el archivo que leera sera un archivo de texto

  reader.onload = onLoad;                                                       //Lee el texto con la variable anterior
}


var array = [];                                                                 //Variable para almacenar los datos del archivo leido

function onLoad() {

  var tmpo = [];                                                                //Variable para alamacenar temporalmente cada linea del archivo
  var result = reader.result;

  var lineas = result.split('\n');                                              //Se separan los datos del archivo respecto a saltos de linea
  for (var linea of lineas) {
    if (linea != '') {
      tmpo.push(linea);                                                         //Almacena cada linea separada
      datos2.innerHTML = datos2.innerHTML + linea + "<br>"                      // imprimir el texto en la pagina principal (pagina de lectura)
    }
  }

  for (let index = 0; index < tmpo.length; index++) {                           
    var temporal = tmpo[index].split(' ');                                      //Al tener cada linea ahora se separan por palabras 
    for (let i = 0; i < temporal.length; i++) {
      try {
        var numero = temporal[i].length;                                        //Se buscan los espacios vacios para eliminarlos
        if (numero == 0) {
        } else {
          array.push(temporal[i]);                                              //Se agregan los datos sin espacios vacios a la variable incial 
          }
      } catch (error) {
      }
    }
  }
}

var count = 0;
var tmp;

const sendData = () => {                                                         //Envia los datos al servidor por cada solicitud

  if (count < array.length) {
    tmp = array[count];
  }

  else {
    tmp = 'vacio';
  }

  axios.post('http://localhost:3000/postusers', {                               //Envia la palabra al servidor con la ruta /postusers
    firstName: 'Dylan',
    lastName: 'garcia',
    text: tmp
  }, {
    'Content-Type': 'application/json'
  })
    .then(response => {

    })
    .catch(error => {
      console.log(error);
    });
  count++;
};

const getData = () => {                                                         //Metodo para obtener el token de la letra enviada 
  axios.get(url).then(response => {

    if (tmp != 'vacio') {
      var htmlTexto = "<tr>" + "<td>" + tmp + "</td>" + "<td style=" +          
                      "color:gray" + ">" + response.data.carne + "</td><td>" 
                      + count + "</td></tr>";                                 
      datos.innerHTML = datos.innerHTML + htmlTexto;                             //Agregar a la tabla de tokens la palabra

    }
  })
    .catch(error => {
      console.log(error);
    });
};

postButton.addEventListener('click', sendData);                                 //Llama a los eventos enviar y recibir datos al escuchar un click 
getButton.addEventListener('click', getData);                                   //de los botones para manejar los tokens

