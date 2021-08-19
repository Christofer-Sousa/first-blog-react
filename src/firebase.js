import app from "firebase/app"
import "firebase/database"
import "firebase/auth"
import "firebase/storage"


let firebaseConfig = {
    apiKey: "AIzaSyA5ZHC2y_VpGcuwZUwzw8_-SPihZ68ddsU",
    authDomain: "blog-app-b7c79.firebaseapp.com",
    projectId: "blog-app-b7c79",
    storageBucket: "blog-app-b7c79.appspot.com",
    messagingSenderId: "992518210211",
    appId: "1:992518210211:web:692d3db874f0047c35f516"
};

class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig);

        this.app = app.database();
        this.storage = app.storage();
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout(){
        return app.auth().signOut()
    }
    async register(name, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid;

        return app.database().ref("usuarios").child(uid).set({
            nome: name
        })
    }

    isInitialized(){
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve)
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid;
    }
    
    async getUserName(callback){
        if(!app.auth().currentUser){
            return null;
        }

        const uid = app.auth().currentUser.uid
        await app.database().ref("usuarios").child(uid)
        .once("value").then(callback)
    }
}

export default new Firebase();