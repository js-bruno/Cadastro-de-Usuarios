import { Component } from "react";  
import {FaTrash, FaEdit} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import api from '../../service/api';


export default class Home extends Component{

    state = {
        registros:[],
    };
    
    componentDidMount = async () =>{

        const response = await api.get(`/cliente`); 
        // eslint-disable-next-line
        response.data.map(res => {
            const {registros} = this.state;
            
            this.setState({
                registros :[...registros, res],     
            });    
        })

    }

    deleteCliente = async (id) =>{

        await api.delete(`/cliente/${id}`).then(window.location.reload()); 
        
        alert('Usuário deletado com sucesso.');

    }
    
    render(){

        const {registros} = this.state;
        
            return(
                <div className="content">
                <div class="text-center">
                    <img src="https://64.media.tumblr.com/14b1a8ac96d048814880b629f9d5b347/56ddd074e31816ab-6f/s1280x1920/1963a7cf9e536a928a989ef76fe081de00774f1f.png" class="rounded-circle miku-image" alt="..."/>
                </div>
                <h1 class="linear-wipe">LISTA DE CLIENTES</h1>
                <div>
                    <table class="table text-white table-hover table-borderless">
                        <thead class="thead-dark">
                            <tr>
                            <th>ID</th>    
                            <th>NOME</th>
                            <th>IDADE</th>
                            <th>EMAIL</th>
                            <th></th>
                            </tr>
                        </thead>

                        <tbody>
                        {registros.map(registro=>(
                                <tr key={registro.id}>
                                <td data-label="Id" >{registro.id}</td>
                                <td data-label="Nome" >{registro.nome}</td>
                                <td data-label="Idade" >{registro.idade}</td>
                                <td data-label="Endereco">{registro.email}</td>
                                <td>
                                    
                                    {/* <Link to={`/edit/${encodeURIComponent(registro.id)}`}><button class="btn text-white btn-info rounded-circle"><FaEdit/></button></Link>
                                    <button class="btn text-white bg-danger rounded-circle" onClick={()=>this.deleteCliente(registro.id)}><FaTrash/></button> */}
                                    <Link to={`/edit/${encodeURIComponent(registro.id)}`}><button class="btn text-warning"><FaEdit/></button></Link>
                                    <button class="btn text-danger" onClick={()=>this.deleteCliente(registro.id)}><FaTrash/></button>
                                </td>
                                </tr>
                            ))}
                    </tbody>
                    </table>
                </div>
                <Link class="button-register rounded-pill" to='/add'>
                    <button type="button" class="btn text-white">
                        <strong>CADASTRAR NOVO CLIENTE</strong>
                    </button>
                </Link>
            </div>
        );
    }
}