import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '@core/services/message.service';
import { ActividadService } from '@core/services/actividad.service';

@Component({
  selector: 'app-actividad-admin',
  templateUrl: './actividad-admin.component.html',
  styleUrls: ['./actividad-admin.component.scss']
})
export class ActividadAdminComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['titulo', 'grupo', 'descripcion', 'estado', 'creado_por', 'actualizado_por', 'acciones'];

  constructor(
    private messageSvc: MessageService,
    private actividadService: ActividadService,
  ) {}

  ngOnInit(): void {
    this.getDataSource();
  }

  async getDataSource(): Promise<void> {
    const data = await this.actividadService.read();
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
      const deleted = await this.actividadService.delete(id); 

      if (deleted === undefined) {
        const newUsuariosArr = usuariosArr.filter((item: any) => item.id !== id);
        this.dataSource.data = newUsuariosArr;
  
        this.messageSvc.success("Registro eliminado exitosamente");
      }
    }
  }

}