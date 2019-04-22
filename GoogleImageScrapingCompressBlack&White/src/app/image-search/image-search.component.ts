import { Component, OnInit } from '@angular/core';
import { ImageServiceService } from '../image-service.service';
import { search_data } from '../keyword';
import { Router } from '@angular/router'

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})

export class ImageSearchComponent implements OnInit {

  constructor(private router: Router, private imageService: ImageServiceService) { }

  keywords: search_data = {
    keyword: ""
  }

  keyword: any[];
  var1: any;
  show : boolean = false;

  ngOnInit() {
    "keywords={gShrch: ''}"
  }

  Search_download() {
    return this.imageService.download(this.keywords).subscribe(
      data => {
        this.var1 = data['message'];
        console.log(this.var1);
        this.keyword = data['data']
        if (data['message'] == 'google') {
          console.log(data['message'] == 'google');
        }
        if (data['message'] == 'local') {
          console.log(data['message'] == 'local');
        }
        console.log("search ts Response ", data)
      });
  }

  
  cmp_img() {
    return this.imageService.imgscraper(this.keywords).subscribe(
      data => {
        this.keyword = data['data']
        console.log("compress ts Response ", data)
        // this.router.navigate(["/search_history"], { skipLocationChange: true });
      });
  }

  history() {
    this.router.navigate(['/SearchHistory']);
  }
}