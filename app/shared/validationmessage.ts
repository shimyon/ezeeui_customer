import { Injectable } from '@angular/core';
@Injectable()
export class validationMessage {
  
    constructor() { }
    error = {
        root: () => '/',
        
        email: [
            { type: 'required', message: 'Email is required.' },
            { type: 'pattern', message: 'Please enter a valid email.' }
        ],
        
        flat_building_name: [
            { type: 'required', message: 'flat,floor and building is required.' }
        ],
        phone: [
            { type: 'required', message: 'Contact is required.' },
            { type: 'pattern', message: 'It is not a valid contact number.' }
        ],
       
    };

    goTo() {
        return this.error;
    }
}
