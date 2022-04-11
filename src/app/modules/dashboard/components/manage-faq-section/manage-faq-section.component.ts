import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-manage-faq-section',
  templateUrl: './manage-faq-section.component.html',
  styleUrls: ['./manage-faq-section.component.css']
})
export class ManageFaqSectionComponent implements OnInit {
  ngOnInit(): void {
    
  }

}
