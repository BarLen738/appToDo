import { createTask } from "./addTask.js";
import dateElement from "./dateElement.js";
import { uniqueDates, orderDates} from "../services/date.js";

export const displayTask = () => {

    const list = document.querySelector('[data-list]'); //seleccionar la lista a la que le vamos a agregar las tareas almacenadas

    const taskList = JSON.parse(localStorage.getItem('tasks')) || []; //tomar la info ya almacenada en el local y convertirla a un objeto JS 
    const dates = uniqueDates(taskList);
    const order = orderDates(dates);
    orderDates(dates);

    dates.forEach((date) => { //separar fechas y agruparlas, y también agrupar las nuevas tareas y fechas que se agreguen
        const dateMoment = moment(date, 'DD/MM/YYYY');
            list.appendChild(dateElement(date));
            taskList.forEach((task) => { //recorrer el arreglo y devuelve cada elemento que existe dentro del arreglo (par clave valor, texto y fecha)
        const taskDate = moment(task.dateFormat, 'DD/MM/YYYY');
        const diff = dateMoment.diff(taskDate);
            if (diff == 0) {
                list.appendChild(createTask(task)); //agregar cada elemento a la lista
            }
        });
    });
}