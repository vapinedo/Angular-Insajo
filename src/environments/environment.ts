// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

// Firebase Api
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLfJ03S6Tz9X0mj7_48LkUg427fWogqUY",
  authDomain: "angular-insajo.firebaseapp.com",
  projectId: "angular-insajo",
  storageBucket: "angular-insajo.appspot.com",
  messagingSenderId: "904590985003",
  appId: "1:904590985003:web:e9a64a83910f752186276e",
  measurementId: "G-DY12CPLTSS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(firebaseApp);

export const appRoutes = {
  admin: {
    login: "/auth",
    tablero: "/admin/dashboard",
    
    barrios: "/admin/barrios",
    propietarios: "/admin/propietarios",
  
    propiedades: "/admin",
    propiedadCrear: "/admin/propiedades/crear",
    propiedadEditar: "/admin/propiedades/editar/:id",
    propiedadDetalle: "/admin/propiedades/detalle/:id",
  
    categorias: "/admin/propiedades/categorias",
    categoriaCrear: "/admin/propiedades/categorias/crear-categoria",
    categoriaEditar: "/admin/propiedades/categorias/editar-categoria",
  },
  home: {
    propiedades: "/home/propiedades/listar",
    propiedadDetalle: "/home/propiedades/detalle/:id"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
