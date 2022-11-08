import { uniqueDates } from '../services/date.js';
import checkComplete from './checkComplete.js'
import deleteIcon from './deleteIcon.js'
import { displayTask } from './readTasks.js';

//evento que genera el form, para agregar a la lista de las tareas, toma la informacion que ingresa el usuario (texto y fecha)
export const addTask = (evento) => {
    evento.preventDefault();

    const list = document.querySelector('[data-list]'); //elemento donde se agregan las tareas
    const input = document.querySelector('[data-form-input]'); //tarea a hacer
    const calendar = document.querySelector('[data-form-date]'); //calendario donde seleccionar la fecha

    const value = input.value; //capturar tarea a hacer
    const date = calendar.value; //capturar fecha
    const dateFormat = moment(date).format("DD/MM/YYYY"); //importacion de libreria moment para formatar la fecha

    if (value === '' || date === '') { //si se hace clic sin escribir nada o sólo agregando la tarea sin poner la fecha o sólo poniendo la fecha sin la tarea, que no se agregue nada a la lista
        return;
    }


    input.value = ''; //limpiar tarea a realizar
    calendar.value = ''; //limpiar fecha

    const complete = false;

    const taskObject = { //genera el objeto en donde se va a almacenar la tarea y la fecha
        value,
        dateFormat,
        complete,
        id: uuid.v4(),
    }

    list.innerHTML = '';

    const taskList = JSON.parse(localStorage.getItem('tasks')) || []; //lee la info almacenada en localStorage con la llave tasks y lo pasa por JSON.parse() para que genere un objeto JS que podamos usar. En caso de que localStorage este con datos se comportara asi, si estuviera vacío, la constante tasks empezaría como un arreglo vacío
    taskList.push(taskObject); //llenado con cada tarea
    localStorage.setItem("tasks", JSON.stringify(taskList)); //volver a almacenar el arreglo de las tareas ya actualizado. Usar JSON.stringify() para transformarlo de nuevo en string
    displayTask();
}



export const createTask = ({ value, dateFormat, complete, id }) => { //genera estructura HTML, agrega clases y contenido de cada elemento. Agrega tareas. Se lo llama cuando el usuario da clic en la tarea y cuando el programa muestra automáticamente las tareas

    //const list = document.querySelector('[data-list]');
    const task = document.createElement('li'); //genera un elemento li
    task.classList.add('card'); //le agrega la clase card

    const taskContent = document.createElement('div'); //genera un elemento de tipo div

    const check = checkComplete(id);

    if (complete) { //si complete es true, cambia las clases, para cambiar la apariencia
        check.classList.toggle('fas');
        check.classList.toggle('completeIcon');
        check.classList.toggle('far');
    }

    const titleTask = document.createElement('span'); //genera un elemento de tipo span
    titleTask.classList.add('task'); //le agrega la tarea task
    titleTask.innerText = value; //agregarle el texto de la tarea, ingresado por el usuario
    taskContent.appendChild(check); //agrega elemento hijo checkbox
    taskContent.appendChild(titleTask); //agrega elemento hijo tarea

    //pantalla nav
    const dateElement = document.createElement("span"); //crea la tag HTML elemento span
    dateElement.innerHTML = dateFormat; //agrega la fecha ingresada por el usuario
    task.appendChild(taskContent); //agrega elemento hijo con contenido de la tarea
    task.appendChild(dateElement); //agrega elemento hijo con fecha
    task.appendChild(deleteIcon(id)); //agrega elemento hijo con icono de borrar tarea
    return task; //devolver tarea

};