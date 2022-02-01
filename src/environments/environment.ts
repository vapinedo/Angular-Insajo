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
  apiKey: "AIzaSyAos2CFbma6L4tOWMrqAAYhRvQSKBjK7t4",
  authDomain: "react-insajo.firebaseapp.com",
  projectId: "react-insajo",
  storageBucket: "react-insajo.appspot.com",
  messagingSenderId: "153339830729",
  appId: "1:153339830729:web:4c501f54b80dc334190818",
  measurementId: "G-W8KL88T9MH"
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
