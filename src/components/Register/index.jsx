import React, {Component} from "react"
import "./register.css"
import firebase from "../../firebase"

export default class Register extends Component{

    constructor(props){
        super(props)
        this.state = {
            nome: "", 
            email: "",
            password: ""
        }

        this.register = this.register.bind(this)
        this.onRegister = this.onRegister.bind(this)
    }

    register(e){
        e.preventDefault()
        this.onRegister()
    }

    onRegister = async () => {
        try{
            const {nome, email, password} = this.state;

            await firebase.register(nome, email, password)
            this.props.history.replace("/dashboard")
        }catch(error){
            alert(error.message)
        }
    }
    render(){
        return(
            <div>
                <h1 className="register-h1">Novo usuario</h1>

                <form onSubmit={this.register} id="register">
                    <label>Nome: </label>
                    <input type="text" value={this.state.nome} autoFocus autoComplete="off" placeholder="Digite seu nome"
                        onChange={e => this.setState({nome: e.target.value})}
                    />

                    <label>Email: </label>
                    <input type="email" value={this.state.email} autoComplete="off" placeholder="teste@teste.com"
                        onChange={e => this.setState({email: e.target.value})}
                    />

                    <label>Senha: </label>
                    <input type="password" value={this.state.password} autoComplete="off" placeholder="Sua senha"
                        onChange={e => this.setState({password: e.target.value})}
                    />

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        )
    }
}