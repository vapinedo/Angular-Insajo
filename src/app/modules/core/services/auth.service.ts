import { Injectable } from '@angular/core';
import { firebaseDB } from '@environments/environment';
import { StorageService } from '@core/services/storage.service';
import { collection, getDocs, DocumentData } from '@firebase/firestore';

@Injectable()
export class AuthService {

    private readonly collectionRef = "usuarios";

    constructor(
        private storageSvc: StorageService,
    ) { }

    getCurrentUser() {
        return this.storageSvc.read("user");
    }

    isLogged(): boolean {
        const item = this.storageSvc.checkExists("user");
        return (item !== null) ? true : false; 
    }
    
    getRole(): string | null {
        const isLogged = this.isLogged();
        if (!isLogged) { return null }

        const user = this.storageSvc.read("user");
        return user.role;
    }

    getEstado(): string | null {
        const isLogged = this.isLogged();
        if (!isLogged) { return null }

        const user = this.storageSvc.read("user");
        return user.estado;
    }
    
    async login(email: string, password: string): Promise<boolean> {
        const request = await getDocs(collection(firebaseDB, this.collectionRef));
        const userList = request.docs.map(item => item.data());
        const userLogged = userList.find((user: any) => (
            user.email === email && user.password === password
        ));
        
        if (userLogged) {
            const { password, ...user } = userLogged; // take every less password
            this.storageSvc.create("user", user);
            return true;
        }
        return false;        
    }

    logout(): void {
        this.storageSvc.delete("user");
    }

}
