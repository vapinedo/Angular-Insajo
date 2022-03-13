import { MatSort } from '@angular/material/sort';
import { AuthService } from '@core/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '@core/services/message.service';
import { StorageService } from '@core/services/storage.service';
import { ActividadService } from '@core/services/actividad.service';

@Component({
  selector: 'app-actividad-admin',
  templateUrl: './actividad-admin.component.html',
  styleUrls: ['./actividad-admin.component.scss']
})
export class ActividadAdminComponent implements OnInit {

  user: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['titulo', 'grupos', 'descripcion', 'estado', 'creado_por', 'acciones'];

  constructor(
    private authSvc: AuthService,
    private messageSvc: MessageService,
    private storageSvc: StorageService,
    private actividadSvc: ActividadService,
  ) {}

  ngOnInit(): void {
    this.user = this.authSvc.getCurrentUser();
    const role = this.user.role.toLowerCase();

    if (role === "docente") {
      this.getDataSourceByUserId(this.user.id);
    } else if (role === "admin") {
      this.getDataSource();
    }
  }

  async getDataSource(): Promise<void> {
    const data = await this.actividadSvc.read();
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async getDataSourceByUserId(userId: string): Promise<void> {
    const data = await this.actividadSvc.readByUserId(userId);
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
      const deleted = await this.actividadSvc.delete(id); 

      if (deleted === undefined) {
        const newUsuariosArr = usuariosArr.filter((item: any) => item.id !== id);
        this.dataSource.data = newUsuariosArr;
  
        this.messageSvc.success("Registro eliminado exitosamente");
      }
    }
  }

}