import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.css']
})
export class VolunteerListComponent implements OnInit {

  @Input() volunteerList:any;
  apiEndPoint:any;
  constructor() { 
    this.apiEndPoint=environment.API_ENDPOINT;
  }

  ngOnInit(): void {
  }

}


