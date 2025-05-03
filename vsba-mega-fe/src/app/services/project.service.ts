import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  list: any[] = []
    
  constructor(public hs: HttpService, public gs: GlobalService) { }

  async add(value: any) {
    try {
      delete value.id;
      let response = await this.hs.post('/project/create-project', {}, value)
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      let response = await this.hs.delete('/project/delete-project?id=' + id, {})
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  async get(id: any) {
    try {
      let response = await this.hs.get('/project/get-project?id=' + id, {})
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  async get_list(filters: any) {
    try {
      let response = await this.hs.get('/project/get-project-list', filters)
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  async update(id: any, value: any) {
    try {
      let response = await this.hs.post('/project/update-project?id=' + id, {}, value)
      return response;
    } catch (error: any) {
      throw error;
    }
  }
}