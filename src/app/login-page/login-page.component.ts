import { Component } from "@angular/core";
import { AppContext } from "../../infrastructure/app.context";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(
      private appContext: AppContext,
      private router: Router
  ) { }

  signIn() {
      this.appContext.Session.Gapi.signIn()
          .then(() => {
              if (this.isLoggedIn()) {
                  this.router.navigate(["/mainpage"]);
              }
          });
  }

  public isLoggedIn(): boolean {
    return this.appContext.Session.Gapi.isSignedIn;
  }

  public logOut(): void {
    this.appContext.Session.Gapi.signOut();
  }

}
