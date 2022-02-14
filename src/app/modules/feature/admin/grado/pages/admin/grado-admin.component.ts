import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GradoService } from '@core/services/grado.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '@core/services/message.service';

@Component({
  selector: 'app-grado-admin',
  templateUrl: './grado-admin.component.html',
  styleUrls: ['./grado-admin.component.scss']
})
export class GradoAdminComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['grado', 'estado', 'acciones'];

  constructor(
    private messageSvc: MessageService,
    private gradoSvc: GradoService,
  ) {}

  ngOnInit(): void {
    this.getDataSource();
  }

  async getDataSource(): Promise<void> {
    const data = await this.gradoSvc.read();
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
      const itemsArr = this.dataSource.data;
      const deleted = await this.gradoSvc.delete(id); 

      if (deleted === undefined) {
        const newItemsArr = itemsArr.filter((item: any) => item.id !== id);
        this.dataSource.data = newItemsArr;
  
        this.messageSvc.success("Registro eliminado exitosamente");
      }
    }
  }

}