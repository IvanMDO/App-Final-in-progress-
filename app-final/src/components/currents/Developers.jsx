import React, { Component } from 'react';
import LogoDevelopers from '../../assets/logoDevelopers.png'
import '../../css/developers.css'

class Developers extends Component {
    render() {
        return (
            <div id="developersBg">
                <div id="developers">
                    <img className="logoCuchufli" src={LogoDevelopers} alt="logoCuchufli"/>
                    <div>
                        <h2 id="titulo">Team Cuchuflí</h2>
                        <div>
                            <h4>Integrantes:</h4>
                            <p><strong>Nicolás Fresco</strong> (Codigo principal y base de datos)</p>
                            <p><strong>Nahuel Jovine</strong> (Aplicación diseños y corrección de errores)</p>
                            <p><strong>Nicolás Sauco</strong> (Codigo principal y base de datos)</p>
                            <p><strong>Iván De oli</strong> (Diseño principal y aplicación de componentes)</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Developers;