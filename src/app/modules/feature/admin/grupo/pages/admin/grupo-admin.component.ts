import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GrupoService } from '@core/services/grupo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '@core/services/message.service';

@Component({
  selector: 'app-grupo-admin',
  templateUrl: './grupo-admin.component.html',
  styleUrls: ['./grupo-admin.component.scss']
})
export class GrupoAdminComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['grado', 'letra', 'estado', 'acciones'];

  constructor(
    private messageSvc: MessageService,
    private grupoService: GrupoService,
  ) {}

  ngOnInit(): void {
    this.getDataSource();
  }

  async getDataSource(): Promise<void> {
    const data = await this.grupoService.read();
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
      const gruposArr = this.dataSource.data;
      const deleted = await this.grupoService.delete(id); 

      if (deleted === undefined) {
        const newGruposArr = gruposArr.filter((item: any) => item.id !== id);
        this.dataSource.data = newGruposArr;
  
        this.messageSvc.success("Registro eliminado exitosamente");
      }
    }
  }

}