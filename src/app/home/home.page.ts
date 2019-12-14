import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  video: any;
  relatedVideos: any;

  constructor(
  	private httpClient: HttpClient
  ) {
  	this.getVideos().then((data: any) => {
  		this.video = data.video;
  		this.relatedVideos = data.relatedVideos;  
  		console.log(this.video);
  	});
  }

	getVideos() { 
	  return new Promise((resolve, reject) => {
	    this.httpClient.get("http://tekkadanholding.com/api/videos/15d8530379feca").subscribe((data: any) => {
	    	resolve(data.data);
	    });
	  });
	}

}
