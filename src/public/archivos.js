function inicio(){
    zonadatos = document.getElementById("zonaDatos");
    var archivos = document.getElementById("archivos");
    archivos.addEventListener("change", procesar, false);
}

function procesar(e){
    var archivos = e.target.files;
    var miArchivo = archivos[0];
    var lector = new FileReader();
    lector.readAsText(miArchivo);
    lector.addEventListener("load", mostrar, false);
}

function mostrar(e){
    var resultado = e.target.result;
    zonadatos.innerHTML = resultado;
}




window.addEventListener("load", inicio, false);