"use strict";



if ('serviceWorker'in navigator){
    navigator.serviceWorker.register('./Trabajador.js')
    .then(registro => console.log("Registro de Trabajador Exitoso",registro))
    .catch(error => console.warn("Error al Registrar el Trabajador",error))
}




    let updateButton = document.getElementById('updateDetails');
    let favDialog = document.getElementById('favDialog');
    let outputBox = document.getElementById('salida');
    let selectEl = document.querySelector('select');
    let confirmBtn = document.getElementById('confirmBtn');

    // "Update details" el botón abre el modal <dialog>
    updateButton.addEventListener('click', function onOpen() {
        if(typeof favDialog.showModal === "function"){
            favDialog.showModal();
        }else{
            alert("La API <dialog> no es soportada por este navegador");
        }
    });
    // "Favorite animal" input sets the value of the submit button
selectEl.addEventListener('change', function onSelect(e) {
    confirmBtn.value = selectEl.value;
  });
    // "Confirm" este botón dispara el evento "close" en <dialog> debido a [method="dialog"]
    favDialog.addEventListener('close', function onClose(){
        outputBox.value = favDialog.returnValue + " botón apretado - " + (new Date()).toString();
    });