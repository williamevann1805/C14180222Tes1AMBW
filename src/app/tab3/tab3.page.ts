import { Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../foto.service';

export interface fileFoto {
  name : string;
  path : string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  urlImageStorage  : string[] = [];
  constructor(
    private afStorage : AngularFireStorage,
    public fotoService : FotoService
  ) {}

  uploadFoto()
  {
    this.urlImageStorage = [];
    for (var index in this.fotoService.dataFoto)
    {
      const imgFilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`;
      this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url)=> {
          
        });
      });
    }
  }

  async ionViewDidEnter(){

    this.tampilkanData();
  }

  tampilkanData(){
    this.urlImageStorage = [];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll().then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then(url => {
          this.urlImageStorage.unshift(url)
        })
      });
    }).catch((error) => {
      console.log(error);
    });
  }
}
