// asignar un nombre y versión al cache
const NOMBRE_CACHE = 'tribu-v0.0.5';
    
    
//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install',(evento) => {
    console.log('instalado');
    const cacheProm = caches.open(NOMBRE_CACHE)
    .then(cache => {
        console.log('agregando archivos')
        cache.addAll([
            './',
            './estilos/estilo.css',
            './imágenes/fuego-sin-leña.svg',
            './index.html',
            './guiones/índice.js'
            ]);
        });
        evento.waitUntil(cacheProm)
    });
//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate',(evento) => {
    const CacheListaBlanca = [NOMBRE_CACHE]
    evento.waitUntil(
        caches.keys()
        .then(NombresCache => {
            return Promise.all(
                NombresCache.map(NombreCache =>{
                    //Eliminamos lo que ya no se nececita en cache
                    if (CacheListaBlanca.indexOf(NombreCache)=== -1){
                        return caches.delete(NombreCache)
                    }
                })
            )
        })
        //le indica al Trabajador de Servicio activar el cache actual
        .then(() => self.clients.claim())
    )
})
// Cuando el Navegador recupera una url
self.addEventListener('fetch', evento => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    evento.respondWith(
        caches.match(evento.request)
            .then(respuesta => {
                if(respuesta){
                    //recuperar del cache
                    return respuesta
                }
                // recuperar de la petición a la url
                return fetch(evento.request)
            })
    )
})