import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Redis {
    type: string;
    user: string;
    value: string;
}