import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firebaseDB } from '@environments/environment';
import { AuthService } from '@core/services/auth.service';
import { collection, getDocs } from '@firebase/firestore';

@Injectable()
export class TareaService {

    private readonly collectionName = "actividades";
    private readonly collectionRef = collection(firebaseDB, "actividades");

    constructor(
        private httpClient: HttpClient,
        private authSvc: AuthService
    ) { }
    
    async readByGrupo(): Promise<any[]> {
        const request = await getDocs(this.collectionRef);
        const itemList = request.docs.map(item => item.data());
        const grupo = this.authSvc.getGrupo();
        const tasks = itemList.filter(item => item["grupo"].includes(grupo));
        return tasks;
    }

}