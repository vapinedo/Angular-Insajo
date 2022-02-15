import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TareaService } from '@core/services/tarea.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '@core/services/message.service';

@Component({
  selector: 'app-tarea-admin',
  templateUrl: './tarea-admin.component.html',
  styleUrls: ['./tarea-admin.component.scss']
})
export class TareaAdminComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['titulo', 'grupo', 'descripcion', 'estado', 'acciones'];

  constructor(
    private tareaSvc: TareaService,
    private messageSvc: MessageService
  ) {}

  ngOnInit(): void {
    this.getDataSource();
  }

  async getDataSource(): Promise<void> {
    const data = await this.tareaSvc.readByGrupo();
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}