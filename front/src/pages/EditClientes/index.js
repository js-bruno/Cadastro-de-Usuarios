import { Component } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import api from '../../service/api';

export default class EditCliente extends Component{
    
    state = {
      id:this.props.match.params.id,
      cad_nome:'',
      cad_idade:'',
      cad_email:'',
      redirect: false,
    };

    componentDidMount = async e =>{
   
      const response = await api.get(`/cliente/${this.state.id}`)
      
      this.setState({
        cad_nome:response.data.nome,
        cad_idade:response.data.idade,
        cad_email:response.data.email,

      });
    
      console.log(response);

    }

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
      
        const {id, cad_nome,cad_idade,cad_email} = this.state;  
      
        const Cliente = {'id': id,'nome':cad_nome,'idade':cad_idade,'email':cad_email}

        await api.put(`/cliente`,Cliente)
        .then(() => this.setState({ redirect: true }))

        alert('usuário alterado com sucesso.');

    }

    render(){
      const { redirect } = this.state;
      const {id,cad_nome,cad_idade,cad_email} = this.state;
      if (redirect) {
        return <Redirect to='/'/>
      }
      return(

          <div className="container" > 
            <div className="content">         
              <div id="cadastro">
                <form class="form-edit" onSubmit={this.handleOnSubmit}> 
                  <h1 class="linear-wipe">Alterar cadastro</h1> 
                  
                  <p> 
                    <label class="form-label">Id</label>
                    <input class="form-control" type="number" value={id} readOnly/>
                  </p>

                  <p> 
                    <label class="form-label">Seu nome</label>
                    <input class="form-control"required="required" type="text" placeholder="Digite seu nome"
                        value={cad_nome} onChange={this.handleNomeChange}/>
                  </p>

                  <p> 
                    <label class="form-label">Sua idade</label>
                    <input class="form-control"required="required" type="text" placeholder="Digite seu endereço"
                        value={cad_idade} onChange={this.handleIdadeChange}/> 
                  </p>                  
                  
                  <p> 
                    <label class="form-label">Seu email</label>
                    <input class="form-control" required="required" type="text" placeholder="Digite sua idade"
                        value={cad_email} onChange={this.handleEmailChange}/>
                  </p>                 
                  <div class="button-register rounded-pill"> 
                    <input class="btn text-white" type="submit" value="Alterar"/> 
                  </div>
                </form>
              </div>
            </div>
        </div>

      )
  }
}