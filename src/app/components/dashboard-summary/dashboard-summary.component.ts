import { Component, EventEmitter, Output } from '@angular/core';
import { MATERIAL_MODULES } from '../../core/imports/material.imports';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard.service';
import { Product } from '../../core/models/products.model';



@Component({
  selector: 'app-dashboard-summary',
  imports: [MATERIAL_MODULES, CommonModule],
  templateUrl: './dashboard-summary.component.html',
  styleUrl: './dashboard-summary.component.scss'
})
export class DashboardSummaryComponent {

  total = 0;

  @Output() productoEliminado = new EventEmitter<number>();


  productos: Product[] = [];





  constructor(
    private readonly dashboardService: DashboardService
  ) {

    this.dashboardService.pedido$
      .subscribe(productos => {

        this.productos = productos;

        this.total = productos.reduce(

          (acc, producto) =>

            acc + (
              producto.price *
              producto.quantity
            ),

          0

        );

      });

  }



  quitar(id: number) {
    this.dashboardService.quitarProducto(id);
    this.productoEliminado.emit(id);
  }

  aumentarCantidad(id: number) {
    this.dashboardService.actualizarCantidad(id, 'aumentar');
  }

  disminuorCantidad(id: number) {
    this.dashboardService.actualizarCantidad(id, 'disminuir');
  }

}
