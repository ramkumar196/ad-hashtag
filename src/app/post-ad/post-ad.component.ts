import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material';



import {ApiService} from '../services/api.service';
import {UserService} from '../services/user.service';
import { JwtService } from '../services/jwt.service';


@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent implements OnInit {

  formControlValue = '';
  postAdForm :FormGroup;
  isSubmitting;
  errors = {};
  files='';
  imageUrl=[];
  imageno=0;
  

  constructor(private fb: FormBuilder,private router :Router, private snackBar :MatSnackBar ,private jwt :JwtService) { 
  	    this.createForm();
  }

  createForm()
  {
  	this.postAdForm = this.fb.group({
  		adtextarea: ['', Validators.required]
  	  });
  }

  validateFile(name: String) {
  	console.log(name);
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpeg'  || ext.toLowerCase() == 'jpg'  || ext.toLowerCase() == 'gif' ) {
        return true;
    }
    else {
        return false;
    }
	}
	
	onFileChanged(event: any) {
	 if(this.imageno > 3)
	 {
	 	this.openSnackBar('You have maximum limit for upload');
	 	return false;
	 }

	  if (event.target.files && event.target.files[0]) {

	  	if (!this.validateFile(event.target.files[0].name)) {
	 	this.openSnackBar('File Format not supported');
		return false;
		}

      const fileReader: FileReader = new FileReader();

        fileReader.readAsDataURL(event.target.files[0]); // read file as data url

			fileReader.onload = (event: Event) => {
				this.imageUrl.splice(this.imageno, 0, fileReader.result);
				this.imageno++;
				console.log('image no',this.imageno)
			}
		}
	}

	removeImage(item :any)
	{
			var index = this.imageUrl.indexOf(item);
			if (index !== -1) this.imageUrl.splice(index, 1);
			this.imageUrl.sort();
			this.imageno--;

			//this.imageUrl.splice(index, 1);
	}

  ngOnInit() {
  }

  postAd()
  {

  }

  findChoices(searchText: string) {
    return ['John', 'Jane', 'Jonny'].filter(item =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  getChoiceLabel(choice: string) {
    return `#${choice} `;
  }

   openSnackBar(msg) {
    this.snackBar.open(msg)
    }


}
