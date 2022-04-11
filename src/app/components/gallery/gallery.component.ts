import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public _albums: any = [];
  apiEndPoint:any;
  constructor(
    private _lightbox: Lightbox,
    private crudService:CrudService,
    private tostr:ToastrService
    ) {
      this.apiEndPoint=environment.API_ENDPOINT;
    // for (let i = 1; i <= 33; i++) {
    //   const src = 'assets/images/gallery/' + i + '.jpg';
    //   const caption = 'Image ' + i + ' caption here';
    //   const thumb = 'assets/images/gallery/' + i + '.jpg';
    //   const album = {
    //      src: src,
    //      caption: caption,
    //      thumb: thumb
    //   };

    //   this._albums.push(album);
    // }
  }

ngOnInit(): void {
  this.getGalleryList();
}
getGalleryList(){
  let url = "/api/v1/gallery/GetGalleryList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this._albums =response.data;
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
}
  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
