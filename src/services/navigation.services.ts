import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs'; // For rxjs 6

@Injectable({
    providedIn: 'root'
})
export class Navigation {
    constructor(private route:Router) { }
    
    navigation(path){
        this.route.navigateByUrl(path);
    }


}