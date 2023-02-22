import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import baseUrl from './helper';



@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  
  constructor(private http: HttpClient) {

	}
  
  public createOrder(user: any){
	return this.http.post(`${baseUrl}/user/create-order`, user);
	}

}
