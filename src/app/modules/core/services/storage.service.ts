import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  create(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  } 

  read(key: string): any {
    return JSON.parse(localStorage.getItem(key) || "[]");
  }   
  
  checkExists(key: string) {
    return localStorage.getItem(key);
  }

  delete(key: string): void {
    localStorage.removeItem(key);
  } 

  deleteAll(): void {
    localStorage.clear();
  }
}