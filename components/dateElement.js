export default (date) => {
    const dateElement = document.createElement("li"); //crea elemento li
    dateElement.classList.add('date'); //le añade la clase
    dateElement.innerHTML = date; //la const date se va a mostrar en el HTML de la const dateElement
    return dateElement; //devuelve el elemento + clase con la fecha
};