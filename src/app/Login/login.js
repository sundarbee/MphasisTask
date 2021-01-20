import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular/router";
import { SnackBar } from "nativescript-snackbar";
import * as AppSettings from '@nativescript/core/application-settings';
import { ApplicationSettings } from "@nativescript/core";

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit {

    // public input: any;

    constructor(router = RouterExtensions) {
        this.input = {
            "email": "",
            "password": ""
        }
    }

    login() {
        if(this.input.email && this.input.password) {
            let account = JSON.parse(ApplicationSettings.getString("account", "{}"));
            if(this.input.email == "test@test.com" && this.input.password == "12345678") {
                ApplicationSettings.setBoolean("authenticated", true);
                this.router.navigate(["/list"], { clearHistory: true });
            } else {
                (new SnackBar()).simple("Incorrect Credentials!");
            }
        } else {
            (new SnackBar()).simple("All Fields Required!");
        }
    }

}
