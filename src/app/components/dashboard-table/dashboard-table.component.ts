
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from '../../core/imports/material.imports';
import { DashboardService } from '../../core/services/dashboard.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Product } from '../../core/models/products.model';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogTsComponent } from '../details-dialog.ts/details-dialog.ts.component';



@Component({
  selector: 'app-dashboard-table',
  standalone: true,
  imports: [
    MATERIAL_MODULES,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.scss'
})
export class DashboardTableComponent {

  @Output()
  productoEliminadoOu =
    new EventEmitter<number | null>();

  @Input()
  productoEliminado: number | null = null;

  selectedCategorias: number[] = [];

  filterText = '';

  products: Product[] = [];

  filteredProducts: Product[] = [];

  sortOption = '';

  readonly dialog = inject(MatDialog);


  constructor(
    private readonly dashbService: DashboardService
  ) { }

  ngOnInit(): void {
    this.loadProducts();

    this.dashbService.pedido$.subscribe(carrito => { this.actualizarStock(carrito); });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['productoEliminado'] &&
      changes['productoEliminado'].currentValue !== null
    ) {
      this.actualizarProductoEnTabla(
        changes['productoEliminado'].currentValue,
        false
      );
    }
  }

  loadProducts(): void {
    this.dashbService
      .getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
        this.filteredProducts = data;
      });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesText =
        product.title
          .toLowerCase()
          .includes(this.filterText.toLowerCase());

      return matchesText;
    });
    this.sortProducts();

  }

  addProduct(producto: Product): void { if (producto.stock <= 0) { return; } this.dashbService.agregarProducto({ ...producto, quantity: 1 }); }

  actualizarProductoEnTabla(
    id: number,
    agregar: boolean
  ): void {
    this.products = this.products.map(producto =>
      producto.id === id
        ? {
          ...producto,
          agregado: agregar
        }
        : producto
    );
    this.applyFilters();
    this.productoEliminado = null;
    this.productoEliminadoOu.emit(null);
  }

  actualizarStock(carrito: Product[]): void {

    this.filteredProducts = this.products.map(product => {

      const enCarrito = carrito.find(
        item => item.id === product.id
      );

      const cantidad =
        enCarrito?.quantity || 0;

      return {

        ...product,

        stock:
          product.stock - cantidad,

        agregado:
          (product.stock - cantidad) <= 0

      };

    });

  }



  sortProducts(): void {

    switch (this.sortOption) {

      case 'priceAsc':

        this.filteredProducts.sort(
          (a, b) => a.price - b.price
        );

        break;

      case 'priceDesc':

        this.filteredProducts.sort(
          (a, b) => b.price - a.price
        );

        break;

      case 'ratingAsc':

        this.filteredProducts.sort(
          (a, b) => a.rating - b.rating
        );

        break;

      case 'ratingDesc':

        this.filteredProducts.sort(
          (a, b) => b.rating - a.rating
        );

        break;

    }

    this.filteredProducts = [
      ...this.filteredProducts
    ];

  }


  openDialog(product: Product) {
    this.dialog.open(DetailsDialogTsComponent, { data: product });
  }

}

