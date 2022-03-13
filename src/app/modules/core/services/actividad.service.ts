import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firebaseDB } from '@environments/environment';
import { ActividadI } from '@core/interfaces/actividad.interface';
import { collection, doc, setDoc, getDocs, getDoc, deleteDoc, updateDoc, DocumentData } from '@firebase/firestore';
import { UsuarioService } from './usuario.service';

@Injectable()
export class ActividadService {

    private readonly collectionName = "actividades";
    private readonly collectionRef = collection(firebaseDB, "actividades");

    constructor(
        private httpClient: HttpClient,
        private usuarioSvc: UsuarioService
    ) { }
    
    async create(item: ActividadI) {   
        return await setDoc(doc(this.collectionRef, item.id), item);
    }

    async read(): Promise<any[]> {
        const request = await getDocs(this.collectionRef);
        const itemList = request.docs.map(item => item.data());
    
        const userList = this.createByFromIdToString(itemList);
        const newItemList = await Promise.all(userList);
        return newItemList;
    }

    async readByUserId(userId: string): Promise<any[]> {
        const request = await getDocs(this.collectionRef);
        const itemList = request.docs.map(item => item.data());
        const itemListByUserId = itemList.filter(item => item["creado_por"] === userId);

        const userList = this.createByFromIdToString(itemListByUserId);
        const newItemList = await Promise.all(userList);
        return newItemList;
    }

    async readbyId(docId: string): Promise<DocumentData | undefined> {
        const docRef = doc(this.collectionRef, docId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : undefined;
    }

    createByFromIdToString(itemList: any): any {
        const userList = itemList.map(async (item: any) => {
            const userId = item["creado_por"];
            const { nombres, apellidos } = await this.usuarioSvc.readbyId(userId);
            item["creado_por"] = `${nombres} ${apellidos}`;
            item["actualizado_por"] = `${nombres} ${apellidos}`;

            return item;
        });
        return userList
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