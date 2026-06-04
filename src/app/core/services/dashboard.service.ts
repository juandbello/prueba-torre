import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = environment.products.url;

  private readonly pedido = new BehaviorSubject<any[]>([]);
  pedido$ = this.pedido.asObservable();

  constructor(private http: HttpClient) { }

  // Obtener los productos actuales
  getpedido() {
    return this.pedido.getValue();
  }

  // Agregar producto al pedido

  agregarProducto(producto: Product): void {
    const productos = this.getpedido();
    const productoExistente = productos.find(
      item => item.id === producto.id
    );
    if (productoExistente) {
      const productosActualizados = productos.map(item =>
        item.id === producto.id
          ? {
            ...item,
            quantity: item.quantity! + 1
          }
          : item
      );
      this.pedido.next(productosActualizados);
    } else {
      this.pedido.next([
        ...productos,
        {
          ...producto,
          quantity: 1
        }
      ]);

    }

  }



  // Quitar producto por id (opcional)
  quitarProducto(id: number) {
    const productos = this.getpedido().filter(p => p.id !== id);
    this.pedido.next(productos);
  }

  actualizarCantidad(id: number, tipo: 'aumentar' | 'disminuir') {
    const productosActuales = this.getpedido();
    const productosActualizados = productosActuales.map(producto =>
      producto.id === id ? {
        ...producto, quantity:
          tipo === 'disminuir' ? producto.quantity - 1 : producto.quantity + 1
      } : producto
    );
    this.pedido.next(productosActualizados);
  }

  // Vaciar el pedido
  vaciarpedido() {
    this.pedido.next([]);
  }



  getProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(
      this.apiUrl).pipe(map(response => response.products)
      );
  }

}
