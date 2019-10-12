const express = require('express');
const router = express.Router();
router.use(express.json());
const path = require('path');

let bolean = true;
let tipo;

var arrayObjeto = [];                                                                         //Alamacena la palabra que le envian 


router.post('/postusers', (req, res) => {                                                   //Ruta a la que fue enviada la palabras

    bolean = true;
    tipo = "ERROR";

    const palabra = req.body.text;                                                               //Variable que recibe la palabra que le mandaron 

    automata(palabra);                                                                          //Llama al metodo que analiza la palabra

    res.status(200).send('wrong');
});


function automata(textoA) {                                                                   // funcion para obtener la expresion con que se movera en el automata
    var aux = textoA.split("");                                                               //Se separa la palabra obtenida en letras

    var count = 0;

    var estados = [];                                                                    //Almacena el estado al que se  movio el automata     
    estados.push('A');                                                                 //Inicia en A


    while (count < aux.length) {                                                            //Se ejecutara hasta que el contador sea igual a la longitud de la palabra 
        //Que le envian

        switch (detectarPalabra(aux[count])) {
            case 'OPERADOR':                                                                //Evalua si es un operdaor y de ser asi hace un nuevo push para cambiar de estado

                if (estados[count] == 'A') {

                    estados.push('B');
                }

                break;

            case 'SIGNO':                                                                   //Evalua si es un signp y de ser asi hace un nuevo push para cambiar de estado
                if (estados[count] == 'A') {

                    estados.push('C');
                }
                break;

            case 'AGRUPACION':                                                              //Evalua si es un agrupacion y de ser asi hace un nuevo push para cambiar de estado
                if (estados[count] == 'A') {
                    estados.push('D');
                }

                break;

            case 'DIGITO':                                                                  //Evalua si es un digito y de ser asi hace un nuevo push para cambiar de estado
                if (estados[count] == 'G' || estados[count] == 'A') {
                    estados.push('G');
                }
                if (estados[count] == 'H') {
                    estados.push('L');
                }
                if (estados[count] == 'L') {
                    estados.push('L');
                }
                if (estados[count] == 'F') {
                    estados.push('I');
                }
                if (estados[count] == 'I') {
                    estados.push('M');
                }
                if (estados[count] == 'M') {
                    estados.push('M');
                }


                break;

            case 'LETRA':                                                             //Evalua si es una letra y de ser asi hace un nuevo push para cambiar de estado
                if (estados[count] == 'A') {
                    estados.push('F');
                }
                if (estados[count] == 'F') {
                    estados.push('K');
                }
                if (estados[count] == 'K') {
                    estados.push('O');
                }
                if (estados[count] == 'O') {
                    estados.push('O');
                }

                break;


        }
        count++;
    }

    var varTmp = estados[aux.length];                                          //Alamacena en una variable el ultimo estado que hizo push a los estados
    
    if (estados.length = aux.length) {
                                                                                
        const aceptacion = ['B', 'C', 'D', 'F','G', 'k','L', 'J', 'O', 'M'];                            //Array con los estados de aceptacion
        for (var i = 0; i < aceptacion.length; i++) {
            
            if (varTmp == aceptacion[i]) {                                      //Revisa si el estado final es de aceptacion
                if (varTmp == 'B') {
                    tipo = 'Operador';
                } else if (varTmp == 'C') {
                    tipo = 'Signo';
                } else if (varTmp == 'D') {
                    tipo = 'Agrupacion';
                } else if (varTmp == 'G') {
                    tipo = 'Numero';
                } else if (varTmp == 'L') {
                    tipo = 'Flotante';
                } else if (varTmp == 'J' || varTmp == 'F' || varTmp == 'K' || varTmp == 'O' || varTmp == 'M') {
                    if (textoA == 'VERDADERO' || textoA == 'FALSO')
                        tipo = 'Booleano';
                    else tipo = 'Identificador';
                }

                var objeto = new Object();
                objeto.palabra = textoA;
                objeto.tipo = tipo;
                arrayObjeto.push(objeto);

                break;
            }


        }

    }

}

function detectarPalabra(textoTxt) {                                                    //Fucion que revisa que tipo de caracter fue enviado al separar la palabra

    const operadores = ['+', '-', '*', '/', '%', '=', '==', '<', '>', '>=', '<='];
    const signos = ['"', ';'];
    const agrupaciones = ['(', ')', '{', '}'];
    const numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var tipoLetra = "";
    var validar = true;


    for (var i = 0; i < operadores.length; i++) {                                              //Revisa si el caracter enviado pertenece al array de operadores
        if (textoTxt == operadores[i]) {
            tipoLetra = "OPERADOR";
            validar = false;
            break;
        }
    }


    if (validar) {                                                                        //Revisa si el caracter enviado es un signo
        for (var i = 0; i < signos.length; i++) {
            if (textoTxt == signos[i]) {
                tipoLetra = "SIGNO";
                validar = false;
                break;
            }
        }
    }

    if (validar) {
        for (var i = 0; i < agrupaciones.length; i++) {                                     //Revisa si el caracter enviado pertenece al array de agupaciones
            if (textoTxt == agrupaciones[i]) {
                tipoLetra = "AGRUPACION";
                validar = false;
                break;
            }
        }
    }

    if (validar) {
        for (var i = 0; i < numeros.length; i++) {                                         //Revisa si el caracter enviado pertenece al array de numeros
            if (textoTxt == numeros[i]) {
                tipoLetra = "DIGITO";
                validar = false;
                break;
            }
        }
    }

    //letra
    if (validar) {
        var tmporal = textoTxt.toLowerCase();                                             //Convierte las letras revibidas en minusculas para que eso no afecte 
        for (var i = 0; i < letras.length; i++) {                                              //Revisa si el caracter enviado pertenece al array de letras
            if (tmporal == letras[i]) {
                tipoLetra = "LETRA";
                validar = false;
                break;
            }
        }
    }
    return tipoLetra;
}

// metodo para obtener el token
router.get('/users', (req, res) => {

    setTimeout(() => {
        res.status(200).json({
            usurio: 'Jhonny',
            // envio del token
            carne: tipo
        });
    }, 500);

});

module.exports = router;