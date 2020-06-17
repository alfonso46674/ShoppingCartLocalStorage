let carrito = document.getElementById('carrito')
let cursos = document.getElementById('lista-cursos')
let listaCursos = document.querySelector('#lista-carrito tbody')
let vaciarCorritoBtn = document.getElementById('vaciar-carrito')

//**** */
//event listeners
//******* */

cargarEventListeners();
function cargarEventListeners(){

    //al presionara agregar carrito
    cursos.addEventListener('click',cargarCurso);

    //al eliminar un curso del carrito
    carrito.addEventListener('click',eliminarCurso);

    //vaciar carritp
    vaciarCorritoBtn.addEventListener('click', vaciarCarrito);

    //mostrar cursos en carrito al cargar el documento
    document.addEventListener('DOMContentLoaded', leerLocalStorage);

}

//******* */
//funciones
//******** */

//añade el curso al carrito
function cargarCurso(event){
    event.preventDefault();

    if(event.target.classList.contains('agregar-carrito')){
        let curso = event.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}


//leer los datos del curso
function leerDatosCurso(curso){
    //revisa el atributo data-added para saber si ya fue añadido al carrito
    if(curso.getAttribute('data-added') === 'false'){

        curso.setAttribute('data-added', 'true')
        
        let informacionCurso = {
            imagen: curso.querySelector('img').src,
            titulo: curso.querySelector('h4').textContent,
            precio: curso.querySelector('.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id')
        }
    
        insertarCarrito(informacionCurso);

    //si ya esta en el carrito el curso, no se añade nada    
    }else{
        return false;
    }
    
}


//Inserta el curso seleccionado en el html
function insertarCarrito(curso){
    let row = document.createElement('tr')
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>
            ${curso.titulo}
        </td>
        <td>
            ${curso.precio}
        </td>
        <td>
            <a href="#" class="borrar-curso" 
            data-id = "${curso.id}">X</a>
        </td>
    `;

    listaCursos.appendChild(row);

    guardarCursoLocalStorage(curso);
}

//elimina un curso del carrito
function eliminarCurso(event){
    event.preventDefault();
    let cursoId,  curso;

    if(event.target.classList.contains('borrar-curso')){
        curso = event.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id')
        event.target.parentElement.parentElement.remove();
    }
    eliminarCursoLocalStorage(cursoId)
}


//vacia todo el carrito
function vaciarCarrito(){
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild)
    }

    //vaciar localStorage
    vaciarLocalStorage();

    return false;
}


//Guardar curso del carrito en local storage
function guardarCursoLocalStorage(curso){

    let cursos = obtenerCursosLocalStorage();
    //verificar que el curso no exista ya en el arreglo
    if(cursos.find(cursoBuscar => cursoBuscar.id == curso.id) != undefined){
        return false;
    }else{
        //añadir el curso al arreglo de objetos
        cursos.push(curso)
        //guardar el arreglo en local storage
        localStorage.setItem('cursos', JSON.stringify(cursos));
    }
}


//regresa los cursos que esten en el local storage
function obtenerCursosLocalStorage(){
    let cursos

    if(localStorage.getItem('cursos') === null){
        cursos = [];
    }else{
        cursos = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursos;
}


//muestra los cursos guardados en local storage en el carrito
function leerLocalStorage(){
    let cursos = obtenerCursosLocalStorage();

    cursos.forEach((curso)=>{
        let row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                <a href="#" class="borrar-curso" 
                data-id = "${curso.id}">X</a>
            </td>
        `;
        listaCursos.appendChild(row);
    })
}


//eliminar curso por id en local storage
function eliminarCursoLocalStorage(cursoId){
    let cursos = obtenerCursosLocalStorage();

    cursos.forEach((curso,index)=>{
        if(curso.id === cursoId){
            cursos.splice(index, 1);
        }
    });

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

//elimina todo el local storage
function vaciarLocalStorage(){
    localStorage.clear();
}