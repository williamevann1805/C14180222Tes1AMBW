import { Component } from '@angular/core';
import { FotoService } from '../foto.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public fotoservice : FotoService) {}

  tambahfoto(){
    this.fotoservice.tambahfoto();
  }

  async ngOnInit(){
    await this.fotoservice.loadFoto();
  }

}
