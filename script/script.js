//Puede hacerse modifivando visibility en un div oculto,
//pero así practico diferentes métodos del DOM

//para no repetir código creo una función que según los parámetros
//modificará un elemento diferente con una clase diferente y 
//mostrará el mensaje que se le diga al invocarla
function showAlert(id, myclass, message) {
    //creo el párrafo
    const alertName = document.createElement("p");
    //añado la clase al párrafo
    alertName.classList.add(myclass);
    //añado el mensaje
    alertName.innerText = message;
    //añado el párrafo al div correspondiente
    document.querySelector(id).appendChild(alertName);
    //cambio la clase del input correspondiente usando
    //el mismo parámetro clase pero cambiándolo por interpolación
    document.querySelector(`${id} :nth-child(1)`).classList.add(`switch_${myclass}`);
}

let redElements = document.getElementsByClassName("red");
let redInputs = document.getElementsByClassName("switch_red");
//creo todo lo que sucede al hacer click en el botón
document.querySelector("#myform").addEventListener("submit", function(event) {
    event.preventDefault();
    const vnombre = event.target.nombre.value;
    const vtlf = event.target.tlf.value;
    const vemail = event.target.email.value;
    const vselect = event.target.select.value;
    //pregunto: el valor del input está vacio? && su div padre no tiene un segundo hijo?
    //el segundo hijo es el que se crea si se cumple la condición
    if (vnombre === '' && !document.querySelector("#dnombre :nth-child(2)")) {
        showAlert("#dnombre", "red", "El campo nombre es obligatorio");
    }
    if (vtlf === '' && !document.querySelector("#dtlf :nth-child(2)")) {
        showAlert("#dtlf", "red", "El campo teléfono es obligatorio");
    }
    const re= /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    //
    if (!re.exec(vemail) && !document.querySelector("#demail :nth-child(2)")) {
        showAlert("#demail", "red", "El campo email es obligatorio");
    }
    if (vselect === '' && document.querySelector("select").className !== "switch_red") {
        showAlert("#dselect", "red", "El tipo de proyecto es obligatorio");
    }
    //si todos los campo están cubiertos
    if (vnombre !== '' && vtlf !== '' && re.exec(vemail) && vselect !== '') {
        //bucle para eliminar los párrafos alerta creados
        for (let i = redElements.length - 1; i >= 0; i--) {
            redElements[i].remove();
        }
        //bucle para eliminar la clase añadida a los input
        for (let i = redInputs.length - 1; i >= 0; i--) {
            redInputs[i].removeAttribute("class");
        }
        event.target.nombre.value = ''
        event.target.tlf.value = '';
        event.target.email.value = '';
        event.target.select.value = '';
        //eliminar el formulario para que el usuario no pueda volver a enviar nada y se vea claramente el cambio
        document.querySelector("#myform").remove();
        showAlert(".contact", "green", 'Hablamos pronto');
    }
});
const inputs = document.querySelectorAll("#myform div");

//añadir evento de cambio a todos los inputs medianto for
// for (let i = 0; i < inputs.length - 1; i ++) {
//     inputs[i].addEventListener("change", function() {
//         console.log(this.secondChild);
//     })
// }
