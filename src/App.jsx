import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [alunos, setAlunos] = useState([]);
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const [bimestre, setBimestre] = useState("");

  const url = "https://api-aluno.vercel.app/aluno";

  const getAlunos = async () => {
    const response = await axios.get(url);
    setAlunos(response.data);
  };

  const adicionar = async (event) => {
    event.preventDefault();
    try {
      await axios.post(url, {
        nome: nome,
        matricula: matricula,
        curso: curso,
        bimestre: bimestre
      })
      limparForm();
      getAlunos();
    } catch (error) {
      alert("Erro ao cadastrar novo aluno.");
    }
  };

  const editar = (aluno) => {
    setId(aluno._id),
    setNome(aluno.nome),
    setMatricula(aluno.matricula),
    setCurso(aluno.curso),
    setBimestre(aluno.bimestre)
  }

  const salvarEditar = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${url}/${id}`,{
        id:id,
        nome:nome,
        matricula:matricula,
        curso:curso,
        bimestre:bimestre
      })
      limparForm();
      getAlunos();
      alert("Aluno editado com sucesso.")
    } catch (error) {
      alert("Não foi possivel editar o aluno.")
    }

  }

  const limparForm = () => {
    event.preventDefault()
    setId(''),
    setNome(''),
    setMatricula(''),
    setCurso(''),
    setBimestre('')
  };

  const deletar = async (aluno) => {
    try {
      if (confirm(`Deseja realmente deletar o Aluno \n"${aluno.nome} ?"`)) {
        await axios.delete(`${url}/${aluno._id}`);
        getAlunos();
      }
    } catch (error) {
      alert("Erro ao deletar o aluno");
    }
  };

  useEffect(() => {
    getAlunos();
  }, []);

  return (
    <div>
      <h1>Alunos</h1>
      <div className="wrap">
        <div className="form">
          <form>
            <p>Nome:</p>
            <input type="text" onChange={(event) => setNome(event.target.value)} value={nome} />
            <p>Matricula:</p>
            <input type="text" onChange={(event) => setMatricula(event.target.value)} value={matricula} />
            <p>Curso:</p>
            <input type="text" onChange={(event) => setCurso(event.target.value)} value={curso} />
            <p>Bimestre:</p>
            <input type="text" onChange={(event) => setBimestre(event.target.value)} value={bimestre} />
            <button id="adicionar" onClick={() => id ? salvarEditar(event) : adicionar(event)}>{id ? "Salvar" : "Adicionar"}</button>
            <button id="cancelar" onClick={() => limparForm(event)}>Cancelar</button>
          </form>
        </div>
        <div id="cards">
          {alunos.map((aluno) => (
            <div id="item" key={aluno._id}>
              <div >
                <h3>{aluno.nome}</h3>
                <p>Matricula - {aluno.matricula}</p>
                <p>{aluno.curso} - Bimestre {aluno.bimestre}</p>
                <button id="editar" onClick={() => editar(aluno)}>Editar</button>
                <button id="apagar" onClick={() => deletar(aluno)}>Apagar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
