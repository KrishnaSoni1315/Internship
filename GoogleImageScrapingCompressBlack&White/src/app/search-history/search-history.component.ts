import { Component, OnInit } from '@angular/core';
import { ImageServiceService } from '../image-service.service';
import { Router } from '@angular/router'
import { search_data } from '../keyword';


@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})

export class SearchHistoryComponent implements OnInit {

  constructor(private router: Router, private imageService: ImageServiceService) { }

  keywords: search_data = {
    keyword: ""
  }
  keyword: any[];
  images: any[];
  msg: any;

  ngOnInit() {
    this.get_imgList();
  }

  get_imgList(): void {
    this.imageService.getImages().subscribe(
      data => {
        this.keyword = data;
        console.log("TS file Response ", data)
      });
  };


  click(key) {
    this.keywords.keyword = key
    return this.imageService.imageDisplay(this.keywords).subscribe(
      data => {
        this.msg = data['message'];
        console.log(this.msg);
        // console.log(this.keyword = data['data']);
        this.images = data['data']
        console.log("search ts Response ", data)
      });
  }

  
  back() {
    this.router.navigate(['/ImageSearch']);
  }

}



