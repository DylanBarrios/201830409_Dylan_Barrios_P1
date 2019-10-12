router.post('/separador',(request,response) => {
    var texto = request.body.texto;
    var arrayTokens=[];
    var palabra='';
    var contador = 0;
    while(contador<texto.length){
        console.log('analizando : '+texto.charAt(contador));
        if((texto.charAt(contador)==' '&&palabra!='')){console.log(1);
            
            arrayTokens.push(palabra);
            palabra='';
        }else if(texto.charAt(contador)==' '&&palabra==''){console.log(2);
            palabra='';
        }else if(texto.charAt(contador)=='\n'&&palabra==''){console.log(3);
            palabra='';
        }else if(texto.charAt(contador)=='\n'&&palabra!=''){console.log(4);
            arrayTokens.push(palabra);
            palabra='';
        }else if((texto.charAt(contador+1)=='=')&&(texto.charAt(contador)=='='||texto.charAt(contador)=='<'||texto.charAt(contador)=='>'||texto.charAt(contador)=='!'||texto.charAt(contador)=='+'||texto.charAt(contador)=='-')){
            palabra+=texto.charAt(contador)+texto.charAt(contador+1);
            arrayTokens.push(palabra);
            palabra='';
            contador++;
        }else if(texto.charAt(contador)==' '&&(texto.charAt(contador+1)==';'||texto.charAt(contador+1)=='“'||texto.charAt(contador+1)=='”'||texto.charAt(contador+1)=='('||texto.charAt(contador+1)==')'||texto.charAt(contador+1)=='{'||texto.charAt(contador+1)=='}'||texto.charAt(contador+1)=='<='||texto.charAt(contador+1)=='>='||texto.charAt(contador+1)=='<'||texto.charAt(contador+1)=='>'||texto.charAt(contador+1)=='='||texto.charAt(contador+1)=='++'||texto.charAt(contador+1)=='--'||texto.charAt(contador+1)=='+'||texto.charAt(contador+1)=='-'||texto.charAt(contador+1)=='/'||texto.charAt(contador+1)=='*')){
            console.log(5);
            palabra='';
        }else if(texto.charAt(contador)!=' '&&(texto.charAt(contador+1)==';'||texto.charAt(contador+1)=='“'||texto.charAt(contador+1)=='”'||texto.charAt(contador+1)=='('||texto.charAt(contador+1)==')'||texto.charAt(contador+1)=='{'||texto.charAt(contador+1)=='}'||texto.charAt(contador+1)=='<='||texto.charAt(contador+1)=='>='||texto.charAt(contador+1)=='<'||texto.charAt(contador+1)=='>'||texto.charAt(contador+1)=='='||texto.charAt(contador+1)=='++'||texto.charAt(contador+1)=='--'||texto.charAt(contador+1)=='+'||texto.charAt(contador+1)=='-'||texto.charAt(contador+1)=='/'||texto.charAt(contador+1)=='*')){
            console.log(6);
            palabra+=texto.charAt(contador);
            arrayTokens.push(palabra);
            palabra='';
        }else if(texto.charAt(contador)==';'||texto.charAt(contador)=='“'||texto.charAt(contador)=='”'||texto.charAt(contador)=='('||texto.charAt(contador)==')'||texto.charAt(contador)=='{'||texto.charAt(contador)=='}'||texto.charAt(contador)=='<='||texto.charAt(contador)=='>='||texto.charAt(contador)=='<'||texto.charAt(contador)=='>'||texto.charAt(contador)=='='||texto.charAt(contador)=='++'||texto.charAt(contador)=='--'||texto.charAt(contador)=='+'||texto.charAt(contador)=='-'||texto.charAt(contador)=='/'||texto.charAt(contador)=='*'){
            console.log(7);
            palabra+=texto.charAt(contador);
            arrayTokens.push(palabra);
            palabra='';
        }else{
            console.log(8);
            palabra+=texto.charAt(contador);
        }
        contador++;
    }


    //este codigo solo es para mostrar en consola el array
    contador=0;
    while(contador<arrayTokens.length){
        console.log('|'+arrayTokens[contador]+'|');
        contador++;
    }
    response.status(200).send(arrayTokens);
}
);