import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firebaseDB } from '@environments/environment';
import { GradoI } from '@core/interfaces/grado.interface';
import { collection, doc, setDoc, getDocs, getDoc, deleteDoc, updateDoc, DocumentData } from '@firebase/firestore';

@Injectable()
export class GradoService {

    private readonly collectionName = "grados";
    private readonly collectionRef = collection(firebaseDB, "grados");

    constructor(
        private httpClient: HttpClient
    ) { }

    async create(item: GradoI) {   
        return await setDoc(doc(this.collectionRef, item.id), item);
    }

    async read(): Promise<any[]> {
        const request = await getDocs(this.collectionRef);
        const itemList = request.docs.map(item => item.data());
        return itemList;
    }

    async readbyId(docId: string): Promise<DocumentData | undefined> {
        const docRef = doc(this.collectionRef, docId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : undefined;
    }

    async chechExistsById(docId: string) {  
        const docRef = doc(this.collectionRef, docId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? true : false;
    }

    async update(item: any) {
        return await updateDoc(doc(this.collectionRef, item.id), item);
    }

    async delete(docID: string) {
        return await deleteDoc(doc(firebaseDB, this.collectionName, docID));
    }

}