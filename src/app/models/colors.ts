import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Colors {	
	public colorsMap = [
    {
      name: 'Red',
      value: '#c00'
    },
    {
      name: 'Orange',
      value: '#fb940b'
    },
    {
      name: 'Yellow',
      value: '#ff0'
    },
    {
      name: 'Green',
      value: '#0c0'
    },
    {
      name: 'Cyan',
      value: '#03c0c6'
    },
    {
      name: 'Blue',
      value: '#00f'
    },
    {
      name: 'Purple',
      value: '#762ca7'
    },
    {
      name: 'Pink',
      value: '#ff98bf'
    },
    {
      name: 'Gray',
      value: '#999'
    },
    {
      name: 'Black',
      value: '#000000'
    }
  ];
}