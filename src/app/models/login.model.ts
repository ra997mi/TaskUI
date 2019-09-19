import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Login {
    Id: number;
    Username: string;
    Password: string;
}