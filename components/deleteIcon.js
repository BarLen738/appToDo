import { displayTask } from "./readTasks.js";

const deleteIcon = (id) => { //recibe el identificador
  const i = document.createElement('i');
  i.classList.add('fas', 'fa-trash-alt', 'trashIcon', 'icon');
  i.addEventListener('click', () => deleteTask(id)); //recibe la función con el identificador
  return i;
};

const deleteTask = (id) => {
  const li = document.querySelector('[data-list]'); //vuelve a seleccionar la lista, elemento padre de todas las tareas
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const index = tasks.findIndex( (item) => item.id == id); //encuentra el elemento con el id
  tasks.splice(index, 1); //lo borra del array
  li.innerHTML = ''; //lo muestra vacío
  localStorage.setItem('tasks', JSON.stringify(tasks)); //actualiza el localStorage y lo muestra sin el elemento
  displayTask(); //vuelve a llamar a la función display, que se ejecuta cada vez que existe un evento (si se agrega una tarea, si se recarga la página, si se completa o elimina la tarea)
};

export default deleteIcon;
