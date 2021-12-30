import { Injectable, EventEmitter } from "@angular/core";
import { AppRepository } from "../repositories/app.repository";
const CLIENT_ID = "********.apps.googleusercontent.com";
const API_KEY = "*******";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive';

@Injectable()
export class GapiSession {
    googleAuth: gapi.auth2.GoogleAuth;

    constructor(
        private appRepository: AppRepository

    ) {
    }

    initClient() {
        return new Promise<void>((resolve,reject)=>{
            gapi.load('client:auth2', async () => {
                await gapi.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES,
                });
                this.googleAuth = gapi.auth2.getAuthInstance();
                resolve();
            });
        });
        
    }
    get isSignedIn(): boolean {
        return this.googleAuth.isSignedIn.get();
    }

    async signIn() {
        const googleUser = await this.googleAuth.signIn({
            prompt: 'consent'
        });
        this.appRepository.User.add(googleUser.getBasicProfile());
    }

    signOut(): void {
        this.googleAuth.signOut();
    }
}
