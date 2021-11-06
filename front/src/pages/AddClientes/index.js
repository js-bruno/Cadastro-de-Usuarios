import { Component } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import api from '../../service/api';

export default class CadastroCliente extends Component{

    state = {
      cad_nome:'',
      cad_idade:'',
      cad_email:'',
      redirect: false,
    };


    handleNomeChange = e =>{
      this.setState({cad_nome: e.target.value});
    };

    handleIdadeChange = e =>{
      this.setState({cad_idade: e.target.value});
    };

    handleEmailChange = e =>{
      this.setState({cad_email: e.target.value});
    };

    handleOnSubmit = async e =>{
        e.preventDefault();
      
        const {cad_nome,cad_idade,cad_email} = this.state; 

        const Cliente = {'nome':cad_nome,'idade':cad_idade,'email':cad_email}

        await api.post(`/cliente`,Cliente)
        .then(() => this.setState({ redirect: true }))

        alert('usuário adicionado com sucesso.');
    }

    render(){
        const { redirect } = this.state;
        const {cad_nome,cad_idade,cad_email} = this.state;
        if (redirect) {
          return <Redirect to='/'/>
        }
        return(

            <div className="container" > 
              <div className="content-register">         
                <div id="cadastro">
                  <form onSubmit={this.handleOnSubmit}> 
                    <h1 class="linear-wipe">Cadastro</h1> 
                    <p> 
                      <label class="form-label">Seu nome</label>
                      <input required="required" class="form-control" type="text" placeholder="Digite seu nome"
                          value={cad_nome} onChange={this.handleNomeChange}/>
                    </p>

                    <p> 
                      <label class="form-label">Sua idade</label>
                      <input required="required" type="text" class="form-control" placeholder="Digite Sua Idade"
                          value={cad_idade} onChange={this.handleIdadeChange}/> 
                    </p>                  
                    
                    <p> 
                      <label class="form-label">Seu email</label>
                      <input required="required" type="email" class="form-control"placeholder="Digite Seu Endereço"
                          value={cad_email} onChange={this.handleEmailChange}/>
                    </p>            
                    <div class="button-register rounded-pill">     
                      <input class="btn text-white" type="submit" value="CADASTRAR"/> 
                    </div>
                  </form>
                </div>
              </div>
          </div>

        )
    }
}