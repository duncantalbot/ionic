import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../../shared/comment';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentForm: FormGroup;
  comment: Comment;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder) {

    this.commentForm = this.formBuilder.group({
      author: '',
      rating: 1,
      comment: '',
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    var da = new Date();
    this.comment.date = da.toISOString();
    this.viewCtrl.dismiss(this.comment);
  }

}
