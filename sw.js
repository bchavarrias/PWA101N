//Asignar nombre y version de la cache
//constante

const CACHE_NAME='v1_cache_bch_pwa';

//ficheros que se van a guardar en la aplicación para
//verlos off line

var urlsToCache= [
    './',
    './css/style.css',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/6.png',
    './img/facebook.png',
    './img/favicon-16.png',
    './img/favicon-32.png',
    './img/favicon-64.png',
    './img/favicon-96.png',
    './img/favicon-128.png',
    './img/favicon-192.png',
    './img/favicon-256.png',
    './img/favicon-385.png',
    './img/favicon-512.png',
    './img/favicon-1024.png',
    './img/favicon.png',
    './img/instagram.png',
    './img/twitter.png',
];

//consulta a lo que se va a bajar
//Evento Install- se encarga de  la instalacion del sw y guardar en cache los recursos estaticos
//evento al service W

self.addEventListener('install',e=> {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache=>{
            return cache.addAll(urlsToCache)
            .then(()=>{
                self.skipWaiting();
            });
            
        })
        .catch(err=>console.log('No se registro el cache',err))
        );
    
});
//Evento activate- permite que la aplicacion funcion offline

self.addEventListener('activate',e=>{
    const cacheWhitelist=[CACHE_NAME];
    e.waitUntil(
        //evento keys recoge todas las caches.
        caches.keys()
            .then(cacheNames=>{
                return Promise.all(
                    //recorremos todos los elementos de la cache.
                    cacheNames.map(cacheName=>{
                        if(cacheWhitelist.indexOf(cacheName)=== -1){
                        //borrar los elementos que no se necesiten
                            return caches.delete(cacheName);  
                        }
                    })
            );
        })
        .then(()=>{self.clients.claim();})
            //Activa la cache actual en el dispositivo.              
    );
    
});
//Evento fetch
//cuando recupera datos de una URL
//hacemos referencia al server worker

self.addEventListener('fetch', e=>{
    e.respondWith(
        //comprueba si ya esta cacheada
        caches.match(e.request)
        .then(res=>{
            if(res)
            {
                //Si ya esta en cache
                return res;
            }
            return fetch(e.request);
        })
    );
});