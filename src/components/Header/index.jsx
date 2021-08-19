import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./header.css"

export default class Header extends Component{
    render(){
        return(
            <header id="main-header">
                <div className="header-content">
                    <Link to="/">
                        Shaun Blog
                    </Link>
                    <div id="menu">
                        <Link to="/login">
                            Entrar
                        </Link>
                        <span>|</span>
                        <Link to="/dashboard">Dashboard</Link>
                    </div>
                </div>
            </header>
        )
    }
}