import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /*ngOnInit() est appelé une fois, après que le composant soit initialisé,
   c'est-à-dire après que le constructeur du composant ait été exécuté et que toutes les propriétés d'entrée aient été passées. */

}
