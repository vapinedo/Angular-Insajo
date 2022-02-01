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
			linkName: 'Usuarios',
			icon: 'bx bx-user',
			path: '/admin/usuarios',
			roles: ["admin"]
		},
		{
			linkName: 'Docentes',
			icon: 'bx bx-group',
			submenu: [
				{ title: 'Detalle', path: '/admin/docentes' },
			],
			isOpen: false,
			roles: ["admin", "docente"]
		},
		{
			linkName: 'Estudiantes',
			icon: 'bx bxs-contact',
			submenu: [
				{ title: 'Detalle', path: '/admin/estudiantes' },
			],
			isOpen: false,
			roles: ["admin", "estudiante"]
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
