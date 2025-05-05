import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // base_url = 'http://localhost:3000'
  base_url = environment.url

  constructor(public http: HttpClient, public gs: GlobalService, public router: Router) { }

  async get(url: string, query_params: any) {
    try {
      let params = { ...query_params }
      // if (this.gs.keycloak_user_data?.token)
      //   params.token = this.gs.keycloak_user_data?.token;
      // params = this.removeEmptyValues(params)
      let response: any = await firstValueFrom(this.http.get(this.base_url + url, { params: params }))
      return response
    } catch (error: any) {
      throw error;
    }
  }


  async delete(url: string, query_params: any) {
    try {
      let params = { ...query_params }
      // if (this.gs.keycloak_user_data?.token)
      //   params.token = this.gs.keycloak_user_data?.token;
      let response: any = await firstValueFrom(this.http.delete(this.base_url + url, { params: params }))
      return response
    } catch (error: any) {
      throw error;
    }
  }

  async post(url: string, query_params: any, body: any) {
    try {
      let params = { ...query_params }
      if (url.includes('set-password') || url.includes('forgot-password')) {
        // console.log((url.includes('set-password')), "TOKEN", params);
        let response: any = await firstValueFrom(this.http.post(this.base_url + url, body, { params: params }))
        return response
      }
      // if (this.gs.keycloak_user_data?.token && !(url.includes('sign-in')))
      //   params.token = this.gs.keycloak_user_data?.token;
      let response: any = await firstValueFrom(this.http.post(this.base_url + url, body, { params: params }))
      return response
    } catch (error: any) {
      throw error;
    }
  }
  async put(url: string, body: any) {
    try {
      let response: any = await firstValueFrom(this.http.put(url, body))
      return response
    } catch (error: any) {
      throw error;
    }
  }

  removeEmptyValues(data: any) {
    // Helper function to handle objects
    let cleanObject = (obj: any) => {
      // Iterate through each key-value pair in the object
      for (const [key, value] of Object.entries(obj)) {
        if (value === null || value === '' || value === undefined) {
          // Delete the key if the value is empty
          delete obj[key];
        } else if (typeof value === 'object') {
          // Recursively clean nested objects and arrays
          this.removeEmptyValues(value);
          // Remove the key if the resulting object or array is empty
          if (Object.keys(value).length === 0 && !Array.isArray(value)) {
            delete obj[key];
          } else if (Array.isArray(value) && value.length === 0) {
            delete obj[key];
          }
        }
      }
    }

    // Helper function to handle arrays
    let cleanArray = (arr: any[]) => {
      // Iterate through each item in the array
      for (let i = 0; i < arr.length; i++) {
        const value = arr[i];
        if (value === null || value === '' || value === undefined) {
          // Remove empty items from the array
          arr.splice(i, 1);
          i--; // Adjust index after removal
        } else if (typeof value === 'object') {
          // Recursively clean nested objects and arrays
          this.removeEmptyValues(value);

          // Remove empty objects or arrays
          if (Object.keys(value).length === 0 && !Array.isArray(value)) {
            arr.splice(i, 1);
            i--; // Adjust index after removal
          } else if (Array.isArray(value) && value.length === 0) {
            arr.splice(i, 1);
            i--; // Adjust index after removal
          }
        }
      }
    }
    // Determine if the input is an object or array
    if (Array.isArray(data)) {
      cleanArray(data);
    } else if (typeof data === 'object' && data !== null) {
      cleanObject(data);
    }
    return data;
  }

  customUpload(url: string, file: File): Observable<any> {
    // console.log("ffffffffffffff", file);

    return new Observable((observer) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        // const base64String = reader.result as string;
        // // console.log(file)
        // You can now use the base64String in your POST request
        // const formData = {
        //   file: base64String,
        //   file_name: file.name,
        //   size: file.size,
        // };
        // 
        let formData = {
          content_type: file.type,
          file_extension: file.name.split('.').pop(),
          file_size: file.size,
        };

        this.post('/attachment/upload-attachment', formData, {}).then((data: any) => {
          const formData = new FormData();
          formData.append('file', file);
          const headers = new HttpHeaders({
            'Content-Type': file.type
          });
          this.http.put(url, formData, { headers }).subscribe(
            (response) => {
              observer.next(response);
              observer.complete();
            },
            (error) => {
              observer.error(error);
              observer.complete();
            }
          );
        })

      };

      reader.readAsDataURL(file);
    });
  }

  async gets(url: string, query_params: any, body: any) {
    try {
      let params = { ...query_params };
      // if (this.gs.keycloak_user_data?.token)
      //   params.token = this.gs.keycloak_user_data?.token;

      // params = this.removeEmptyValues(params);

      let response: any = await firstValueFrom(
        this.http.post(this.base_url + url, body, { params: params }) // Use POST with params + body
      );
      return response;
    } catch (error: any) {
      throw error;
    }
  }

}
