import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

	private readonly MILISECONDS_TO_RESPONSE = 0;

	private readonly menu: any[] = [
		{
			path: '/admin/dashboard',
			icon: 'bx bx-grid-alt',
			linkName: 'Dashboard',
			roles: ["admin", "docente", "estudiante"]
		},
		{
			path: '/admin/usuarios',
			icon: 'bx bx-user',
			linkName: 'Usuarios',
			roles: ["admin"]
		},
		{
			path: '/admin/actividades',
			icon: 'bx bx-task',
			linkName: 'Actividades',
			roles: ["admin", "docente"]
		},
		{
			path: '/admin/tareas',
			icon: 'bx bx-task',
			linkName: 'Tareas',
			roles: ["estudiante"]
		},
		{
			path: '/admin/grados',
			icon: 'bx bx-category',
			linkName: 'Grados',
			roles: ["admin"]
		},
		{
			path: '/admin/grupos',
			icon: 'bx bx-male-female',
			linkName: 'Grupos',
			roles: ["admin"]
		}
	];

    getAll(): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.menu);
                observer.complete();
            }, this.MILISECONDS_TO_RESPONSE)
        });
    }

	getMenu(): Promise<any[]> {
		return new Promise((resolve, reject) => {
			resolve(this.menu);
		})
	}
}
