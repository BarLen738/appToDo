const checkComplete = (id) => { //cada vez que se le da clic al ícono de checked se llama a la función completeTask y recibe el id
  const i = document.createElement('i');
  i.classList.add('far', 'fa-check-square', 'icon');
  i.addEventListener('click', (event) => completeTask(event, id)); //al hacer clic recibe una función
  return i;
};
// Immediately invoked function expression IIFE
const completeTask = (event, id) => {
  const element = event.target;
  element.classList.toggle('fas');
  element.classList.toggle('completeIcon');
  element.classList.toggle('far');
  console.log('check id', id);
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const index = tasks.findIndex(item => item.id == id); //encontrar la posición dentro del arreglo
  console.log(index);
  tasks[index]['complete'] = !tasks[index] ['complete']; //negar el complete, queda true
  localStorage.setItem('tasks', JSON.stringify(tasks)); //almacena de nuevo en el localStorage ya actualizado
};

export default checkComplete;
