import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppService } from './app.service';
import { UserModel } from './user.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: UserModel;
  link: any;
  detailsForm: FormGroup;
  userName: string;

  constructor(private formBuilder: FormBuilder, private apiService: AppService ) { }

  ngOnInit() {
    this.generateUserForm(this.user);
  }


  generateUserForm(user) {
    this.detailsForm = this.formBuilder.group({
      name: [user && user.name ? user.name : null, [Validators.required, Validators.maxLength(40)]],
    });
    this.userName = user && user.name ? user.name : null;
  }

  save() {
    if (this.detailsForm.valid) {
      // console.log(this.detailsForm);
      this.apiService.get('login/' + this.userName).subscribe({
        next: data => {
          if (data) {
            this.link = data;
            window.location.href = this.link;
            this.userName = ' ';
          }
        }
      });
    }

  }
}
