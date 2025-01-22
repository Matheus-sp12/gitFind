import {useState} from 'react'; //*import do hooks / estado de uso*/;
import { Header } from "../../components/Header";
import background from "../../assets/background.png";
import  ItemList from '../../components/ItemList'

//importação css
import './styles.css';

function App() {
const [user, setUser] = useState(''); //criamos um estado
const [currentUser, setCurrentUser] = useState(null); //para armazenar os dados do gitHub
const [repos, setRepos] = useState(null); // para buscar os repositorios

  const handleGetData = async () => { // async buscando dados externos e não sabemos quanto tempo vai demorar
    const userData = await fetch(`https://api.github.com/users/${user}`); //pegamos a api DO GitHub com o estado user (user pq vai ser dinamico  pegando o valor que o usuario digitar no imput)
    const newUser = await userData.json(); // o Fetch traz muitas informações, só que queremos só alguns dados

    if(newUser.name) {// se o newUser tiver um name quer dizr que a resposta deu certo achou o usuario
      const {avatar_url, name, bio, login} = newUser; // salvando os dados que quero da API
      setCurrentUser({ avatar_url, name, bio, login }); // os campos da API que quero usar

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`); // aquisição para pega os dados da minha API repositorio
      const newRepos = await reposData.json(); // o Fetch traz muitas informações, só que queremos só alguns dados

      if(newRepos.length)  { // se newRepos ele é um array com dados retorna
        setRepos(newRepos); //
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="conteudo"> 

        <img src={background} className="background" alt="background app"/>
        <div className="info">

          <div>
            <input name="usuario" value={user} //vai ser o valor aonde vamos pesquisar
             onChange={event => setUser(event.target.value)} // pegue o evento e seta, para atualizar o valor do estado
            placeholder="@username" /> 
            <button onClick={handleGetData}>Buscar</button> {/*Aqui ele chama a função handleGetData pra quando clicar pegar os dados da API */}
          </div>

          {currentUser?.name ? ( // se tiver o name se não não vai aparecer ( e coloca tudo dentro! lá ele kkkkkkkk)
            <>
            <div className="perfil">
          <img src={currentUser.avatar_url} className="profile" alt="fotodeperfil"/> {/*Aqui pegamos o cuurentUser e usamos o . para usar a propriedade que salvamos */}
          <div>
            <h3>{currentUser.name}</h3> {/*Aqui pegamos o cuurentUser e usamos o . para usar a propriedade que salvamos */}
            <span>@{currentUser.login}</span> {/*Aqui pegamos o cuurentUser e usamos o . para usar a propriedade que salvamos */}
            <p>{currentUser.bio}</p> {/*Aqui pegamos o cuurentUser e usamos o . para usar a propriedade que salvamos */}
          </div>
        </div>
        <hr />
        </>
          ): null}
                {repos?.length ? ( // se tiver o name se não não vai aparecer ( e coloca tudo dentro! lá ele kkkkkkkk)
        <div>
          <h4 className="repositorio">Repositorios</h4>
          {repos.map(repo => ( //usamos o map para que le possa circular todo o arquivo
          <ItemList title={repo.name} description={repo.description}/>  //*Aqui pegamos o cuurentUser e usamos o . para usar a propriedade que salvamos */
          ))}
        </div>
  ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
