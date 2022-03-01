import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firebaseDB } from '@environments/environment';
import { collection, doc, setDoc, getDocs, getDoc, deleteDoc, updateDoc, DocumentData } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService {

    private readonly collectionRef = "usuarios";
    private readonly usuariosRef = collection(firebaseDB, "usuarios");

    constructor(
        private httpClient: HttpClient
    ) { }
    
    async create(item: any) {   
        try {
            const docId = item.id.toString();
            return await setDoc(doc(this.usuariosRef, docId), item);
            
        } catch (err) {
            console.error("Error adding document: ", err);
            return err;
        }
    }

    async read(): Promise<any[]> {
        const request = await getDocs(collection(firebaseDB, this.collectionRef));
        const itemList = request.docs.map(item => item.data());
        return itemList;
    }

    async readbyId(docId: string): Promise<any> {
        const docRef = doc(firebaseDB, this.collectionRef, docId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : undefined;
    }

    async chechExistsById(docId: string) {  
        const docRef = doc(firebaseDB, this.collectionRef, docId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? true : false;
    }

    async update(item: any) {
        try {
            const docId = item.id.toString();
            return await updateDoc(doc(this.usuariosRef, docId), item);
            
        } catch (err) {
            console.error("Error updating document: ", err);
            return err;
        }
    }

    async delete(docID: string) {
        return await deleteDoc(doc(firebaseDB, this.collectionRef, docID));
    }

}