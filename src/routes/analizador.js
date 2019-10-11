const express = require('express');
const router = express.Router();
router.use(express.json());
const path = require('path');
// variables
let bolean=true;  
let tipo;
// analizar palabra

var arrayObjeto=[];

// ruta que recibe la letra
router.post('/postusers', (req, res) => {
   
console.log(arrayObjeto[0]);

    bolean=true;
    tipo="ERROR";
    // obtener palabra que se envio del cliente
const palabra= req.body.text;
// funcion
automata(palabra);

res.status(200).send('wrong');
});
// automata
function automata(textoA){
    // letra obtenida
    var aux=textoA.split("");
    //contador
    var count=0;
    //array de estador
    var arrayEstador=[];
    arrayEstador.push('A');
    

    while(count<aux.length){

        // switch de movimientos de estados
        switch (detectarPalabra(aux[count])) {
            case 'OP':
                
                if(arrayEstador[count]=='A'){
                   
                    arrayEstador.push('B');
                }
              
            break;

            case 'SIG':
                    if(arrayEstador[count]=='A'){
                   
                        arrayEstador.push('C');
                    }
            break;

            case 'AG': 
            if(arrayEstador[count]=='A'){
                arrayEstador.push('D');
            }

                break;

            case 'DIG':
                    if(arrayEstador[count]=='G' ||arrayEstador[count]=='A'  ){
                        arrayEstador.push('G');
                    }
                    if(arrayEstador[count]=='H' ){
                        arrayEstador.push('L');
                    }
                    if(arrayEstador[count]=='L' ){
                        arrayEstador.push('L');
                    }
                    if(arrayEstador[count]=='F' ){
                        arrayEstador.push('I');
                    }
                    if(arrayEstador[count]=='I' ){
                        arrayEstador.push('M');
                    }
                    if(arrayEstador[count]=='M' ){
                        arrayEstador.push('M');
                    }
                   
                    
                break;

             case 'P':
                    if(arrayEstador[count]=='G' ){
                        arrayEstador.push('H');
                    }
                break; 

                case 'CERO':
                        if(arrayEstador[count]=='F' ){
                            arrayEstador.push('J');
                        }
                        if(arrayEstador[count]=='J' ){
                            arrayEstador.push('M');
                        }
                    break; 
              

            case 'LE':
                    if(arrayEstador[count]=='A'  ){
                        arrayEstador.push('F');
                    }
                    if(arrayEstador[count]=='F'  ){
                        arrayEstador.push('K');
                    }
                    if(arrayEstador[count]=='K'  ){
                        arrayEstador.push('O');
                    }
                    if(arrayEstador[count]=='O'  ){
                        arrayEstador.push('O');
                    }

                 break;

            
        }
      count++;
    }

    //almacenar estado final
    var varTmp=arrayEstador[aux.length];
    // verificar
    if(arrayEstador.length=aux.length){
//estados de aceptacion
        const aceptacion=['B','C','D','G','L','J','O','M'];
        for(var i=0; i<aceptacion.length;i++){
            // comparar estado final con alguno de aceptacion
         if(varTmp==aceptacion[i]){
            if(varTmp=='B'){
                tipo='Operador';
            }else if(varTmp=='C'){
                tipo='Signo';
            }else if(varTmp=='D'){
                tipo='Agrupacion';
            }else if(varTmp=='G'){
                tipo='Numero';
            }else if(varTmp=='L'){
                tipo='Flotante';
            }else if(varTmp=='J' || varTmp=='O' ||varTmp=='M' )
            {
                if(textoA=='VERDADERO' || textoA=='FALSO')
                tipo='Booleano';
                else tipo='Identificador';
            }

            var objeto=new Object();
            objeto.palabra=textoA;
            objeto.tipo=tipo;
            arrayObjeto.push(objeto);
            
             break;
         }
   

        }

    }

}
// funcion para obtener la expresion con que se movera en el automata
function detectarPalabra(textoTxt) {
    // Globales
    const array= ['+', '-', '*', '/', '%', '=','==','<','>','>=','<='];
    var tipoLetra="";
    var validar=true;
    // cero
    if(validar){
        if(textoTxt=="0"){
             tipoLetra="CERO";
             validar=false;
            
         }
       
 }
    // para operador
    for(var i=0; i<array.length;i++){
        if(textoTxt==array[i]){
            tipoLetra="OP";
            validar=false;
            break;
        }
        }
    // signo
    if(validar){
        const arraySigno= ['"', ';'];
        for(var i=0; i<arraySigno.length;i++){
            if(textoTxt==arraySigno[i]){
                tipoLetra="SIG";
                validar=false;
                break;
            }
        }  
    }   
    // agrupacion
    if(validar){
        const arrayAgrupacion= ['(', ')', '{', '}'];
        for(var i=0; i<arrayAgrupacion.length;i++){
            if(textoTxt==arrayAgrupacion[i]){
                tipoLetra="AG";
                validar=false;
                break;
            }
        }  
    }   
    //digito
    if(validar){
        const arrayNumero=['1','2','3','4','5','6','7','8','9','0'];
        for(var i=0; i<arrayNumero.length;i++){
            if(textoTxt==arrayNumero[i]){
                tipoLetra="DIG";
                validar=false;
                break;
            }
        }  
    }
    // punto
    if(validar){
           if(textoTxt=="."){
                tipoLetra="P";
                validar=false;
               
            }
          
    } 
    //letra
    if(validar){
        const arrayLetra=['a','b','c','d','e','f','g','h','i',
        'j','k','l','m','n','ñ','o','p','q','r',
        's','t','u','v','w','x','y','z'];
        var tmporal=textoTxt.toLowerCase();
        for(var i=0; i<arrayLetra.length;i++){
            if(tmporal==arrayLetra[i]){
                tipoLetra="LE";
                validar=false;
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

// metodo para el reporte final
router.get('/users2', (req, res) => {
  
    setTimeout(() => {
        res.status(200).json({
            usurio: 'Jhonny',
            // enviar un objeto con atributos del tipo y letra
            obj: arrayObjeto
        });
    }, 500);

});
module.exports = router;