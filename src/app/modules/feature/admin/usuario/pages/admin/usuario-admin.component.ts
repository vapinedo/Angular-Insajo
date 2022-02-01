import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '@core/services/message.service';
import { UsuarioFirebaseService } from '@core/services/usuario-firebase.service';

@Component({
  selector: 'app-usuario-admin',
  templateUrl: './usuario-admin.component.html',
  styleUrls: ['./usuario-admin.component.scss']
})
export class UsuarioAdminComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['nombres', 'apellidos', 'email', 'rol', 'estado', 'acciones'];

  constructor(
    private messageSvc: MessageService,
    private usuarioFirebaseSvc: UsuarioFirebaseService,
  ) {}

  ngOnInit(): void {
    this.getDataSource();
  }

  async getDataSource(): Promise<void> {
    const data = await this.usuarioFirebaseSvc.read();
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async onDelete(id: string): Promise<void> {
    const confirm = this.messageSvc.confirmSwal();
    const { isConfirmed } = await confirm;

    if (isConfirmed) {
      const usuariosArr = this.dataSource.data;
      const deleted = await this.usuarioFirebaseSvc.delete(id); 

      if (deleted === undefined) {
        const newUsuariosArr = usuariosArr.filter((item: any) => item.id !== id);
        this.dataSource.data = newUsuariosArr;
  
        this.messageSvc.success("Registro eliminado exitosamente");
      }
    }
  }

}