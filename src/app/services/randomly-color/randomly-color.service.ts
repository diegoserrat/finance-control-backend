import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RandomlyColorService {

  constructor() {}

    public randomColor() {
        var letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
  
}