import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import firebase from "../../firebase"
import "./new.css"

class New extends Component{

    constructor(props){
        super(props)
        this.state = {
            titulo: "",
            image: null,
            url: "",
            descricao: "",
            alert: "",
            progress: ""
        }

        this.cadastrar = this.cadastrar.bind(this)
        this.handleFile = this.handleFile.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace("/login");
            return null;
        }
    }
    cadastrar = async(e) => {  
        e.preventDefault();

        if(this.state.titulo !== "" && this.state.image !== "" && this.state.descricao !== "" && this.state.image !== null && this.state.url !== ""){
            let post = firebase.app.ref("posts");
            let chave = post.push().key;
            await post.child(chave).set({
                titulo: this.state.titulo,
                image: this.state.url,
                descricao: this.state.descricao,
                autor: localStorage.nome
            });

            this.props.history.push("/dashboard")
        }else {
            this.setState({alert: "Preencha todos os campos"})
        }
    }

    handleFile = async (e) => {

        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === "image/png" || image.type === "image/jpeg"){
                await this.setState({image: image})
                this.handleUpload();

            }else {
                alert("Envie uma imagem no formato JPG ou PNG")
                this.setState({image: null})
                return null;
            }
        }
        
    }

    handleUpload = async () => {
        const {image} = this.state;
        const currentUid = firebase.getCurrentUid();
        
        const uploadTask =  firebase.storage.ref(`images/${currentUid}/${image.name}`).put(image)

        await uploadTask.on("state_changed",
            (snapshot)=>{
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100;

                this.setState({progress});
            },
            (error)=>{
                console.log("Error image " + error)
            },
            ()=>{
                firebase.storage.ref(`images/${currentUid}`)
                .child(image.name).getDownloadURL()
                .then(url => {
                    this.setState({url: url})
                })
            }
        )

    }
    render(){
        return(
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.cadastrar} id="new-post">

                    <input type="file"
                    onChange={this.handleFile}
                    /><br/>

                    {this.state.url !== "" ? 
                        <img src={this.state.url}  width="250" height="150"/>
                    :
                        <progress value={this.state.progress} max="100"/>
                    }
                    

                    <label>Titulo:</label><br/>
                    <input type="text" placeholder="Nome do post"
                     value={this.state.titulo} autoFocus
                    onChange={(e)=>this.setState({titulo: e.target.value})}
                    /><br/>

                    <label>Descrição:</label><br/>
                    <textarea type="text" placeholder="Conteudo do post"
                     value={this.state.descricao} autoFocus
                    onChange={(e)=>this.setState({descricao: e.target.value})}
                    /><br/>
                    <span>{this.state.alert}</span>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        )
    }
}

export default withRouter(New)