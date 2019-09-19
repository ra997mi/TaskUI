import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Notify {
    Id: number;
    Title: string;
    Content: string;
    Date: string;
}