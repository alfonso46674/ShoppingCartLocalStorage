let carrito = document.getElementById('carrito')
let cursos = document.getElementById('lista-cursos')
let listaCursos = document.querySelector('#lista-carrito tbody')


//**** */
//event listeners
//******* */

cargarEventListeners();
function cargarEventListeners(){

    //al presionara agregar carrito
    cursos.addEventListener('click',cargarCurso);

    //al eliminar un curso del carrito
    carrito.addEventListener('click',eliminarCurso);
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
    let informacionCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(informacionCurso);
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
}

//elimina un curso del carrito
function eliminarCurso(event){
    event.preventDefault();
    
    let curso;
    if(event.target.classList.contains('borrar-curso')){
        event.target.parentElement.parentElement.remove();
    }
}