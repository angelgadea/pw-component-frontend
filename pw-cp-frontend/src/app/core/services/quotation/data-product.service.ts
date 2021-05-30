import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// interface
import { DataProduct,
         DataMode,
         DataProducts} from '../../models/data-product-model';
import { DataUser } from '../../models/login-model';
// microservice
import { IPBackend } from '../../../microservices/ip-development';
import { componentProduct } from '../../../microservices/components-backend';
import { endpointProduct,
         endpointSubproduct,
         endpointSubproductMode,
         endpointSubproductCurrency } from '../../../microservices/endpoints';
// configuration
import { productId } from '../../../config/configuration-file';

@Injectable({
  providedIn: 'root'
})
export class DataProductService {
  API_URL_PRODUCTS = `${IPBackend}${componentProduct}${endpointProduct}`;
  API_URL_SUBPRODUCTS = `${IPBackend}${componentProduct}${endpointSubproduct}`;
  API_URL_MODE = `${IPBackend}${componentProduct}${endpointSubproductMode}`;
  API_URL_CURRENCY = `${IPBackend}${componentProduct}${endpointSubproductCurrency}`;

  public dataSubproducts: Observable<any>;
  public dataMode: Observable<DataMode[]>;

  public activeProduct = new BehaviorSubject(true);
  product = this.activeProduct.asObservable();

  public stateProduct = new BehaviorSubject(true);
  state = this.stateProduct.asObservable();

  public stateReset = new BehaviorSubject(false);
  reset = this.stateReset.asObservable();

  public newCalculateRate = new BehaviorSubject(false);
  newCalculate = this.newCalculateRate.asObservable();

  constructor(private http: HttpClient) {
  }

  getDataSubproducts(dataOfUser: DataUser) {
    const headers = new HttpHeaders()
    .set('userLoggedIn', dataOfUser.username);
    return this.dataSubproducts = this.http.get<DataProduct[]>(`${this.API_URL_SUBPRODUCTS}${productId}`, {headers});
  }

  getDataMode(dataProduct: DataProducts, dataOfUser: DataUser) {
    const subproductId = dataProduct.productId;
    const headers = new HttpHeaders()
    .set('userLoggedIn', dataOfUser.username);
    return this.dataMode = this.http.get<DataMode[]>(`${this.API_URL_MODE}${subproductId}`, {headers});
  }
}
