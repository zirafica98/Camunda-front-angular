import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor() { }

  isProcessCreated(): boolean {
    return localStorage.getItem('processCreated') === 'true';
  }

  markProcessCreated(): void {
    localStorage.setItem('processCreated', 'true');
  }
}
