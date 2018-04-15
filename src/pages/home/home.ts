import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES }  from "../../data/data.animales";
import { Animal } from "../../interfaces/animal.interface";
import { Refresher, reorderArray  } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal [] = [];

  audio = new Audio();
  audioTiempo: any;

  ordenando: boolean = false;

  constructor() {
    this.animales = ANIMALES.slice(0);
    //splice es para que cree un clon del objeto ANIMALES
    // de lo contrario si borro en animales lo borra en ANIMALES tambien

  }

  reproducir(animal: Animal){

    this.pausar_audio( animal );

    if(animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo = setTimeout( ()=> animal.reproduciendo = false, animal.duracion * 1000);

  }

  private pausar_audio( animalSel: Animal){

      clearTimeout ( this.audioTiempo );

      this.audio.pause();
      this.audio.currentTime = 0;

      for ( let animal of this.animales ){

        if( animal.nombre != animalSel.nombre ){
          animal.reproduciendo = false;
        }
      }
  }

  borrar(i:number){
    this.animales.splice(i,1);
  }

  doRefresh(refresher: Refresher){

    setTimeout(() => {
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    },1500);
  }

  reordenarItems(indices:any){
    this.animales = reorderArray (this.animales, indices);
  }

}
