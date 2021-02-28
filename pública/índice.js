
console.info("hola soy índice.js")
/*---------------------------------------------------
Registro de Trabajador de Servicio */
if ('serviceWorker'in navigator){
    navigator.serviceWorker.register('./internuncio.js')
    .then(registro => console.log("Registro de Trabajador Exitoso",registro))
    .catch(error => console.warn("Error al Registrar el Trabajador",error))
}
/*--------------------------------------------------
ejemplo de dialog */
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
/*-------------------------------------------------------------
formulario para prueba con indexeddb */
let botón = document.getElementById('add');
let Dialog = document.getElementById('addlista');
let cajaSalida = document.getElementById('out');
let sEl = document.querySelector('priority');
let confBtn = document.getElementById('confBtn');
// "add" el botón abre el modal <dialog>
botón.addEventListener('click', function onOpen() {
    if(typeof addlista.showModal === "function"){
        addlista.showModal();
    }else{
        alert("La API <dialog> no es soportada por este navegador");
    }
});
/*----------------------------------------------------------
codigo indexeddb */

//const formulario = document.getElementById('formulario')

//verificar compatibilidad en navegador
if (!('indexedDB'in window)){
    console.warn('¡IndexedDB no es soportado!');    
    }
const nombreBase = 'mibase'
const nombreAlmacén = 'almacén1'
const versión = 1 //usar un número (unsigned long)
var bd;
const customerData = [
    { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
    { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
  ];
(()=>{
  //abrimos nuestra base de datos
const apertura = window.indexedDB.open(nombreBase,versión);
//manejar errores
bd.onerror = (evento) => {
    // manejador general de errores para la base de datos
    console.log('Error en la Base de Datos: ' + evento.target.errorCode);
};
apertura.onsuccess = (evento) => {
    //hacer algo con apertura.result!
    bd = apertura.result;
};
//Creación o actualización de la versión de la base de datos
apertura.onupgradeneeded = (evento) => {
    const bd = evento.target.result;
    //Crea un almacén de objetos (objectStore) para esta base de datos
    const almacénObjeto = bd.createObjectStore(nombreAlmacén,{keyPath:"ssn"});
    // Se crea un índice para buscar clientes por nombre. Se podrían tener duplicados
    // por lo que no se puede usar un índice único.
    almacénObjeto.createIndex("name", "name", { unique: false });
    // Se crea un índice para buscar clientespor email. Se quiere asegurar que
    // no puedan haberdos clientes con el mismo email, asi que se usa un índice único.
    almacénObjeto.createIndex("email", "email", { unique: true });
    // Se usa transaction.oncomplete para asegurarse que la creación del almacén 
    // haya finalizado antes de añadir los datos en el.
    almacénObjeto.transaction.oncomplete = (evento) => {
    // Guarda los datos en el almacén recién creado.
    const customerObjectStore = bd.transaction(nombreAlmacén, "readwrite").objectStore(nombreAlmacén);
    for (var i in customerData) {
      customerObjectStore.add(customerData[i]);
    }
  }
};
})();
