import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Formulario(){
    const url = "https://api-aluno.vercel.app/aluno";
    const {idAluno} = useParams();
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [curso, setCurso] = useState("");
    const [bimestre, setBimestre] = useState("");

    const cancelar = () => {
        limparForm()
        navigate('/')
    }

    const limparForm = () => {
        setId(''),
        setNome(''),
        setMatricula(''),
        setCurso(''),
        setBimestre('')
    };

    const carregarDados = (aluno) => {
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
            alert("Aluno editado com sucesso.")
            navigate('/')
            limparForm();
        } catch (error) {
            alert("Não foi possivel editar o aluno.")
        }
    }

    const adicionar = async (event) => {
        event.preventDefault();
        try {
            await axios.post(url, {
                nome: nome,
                matricula: matricula,
                curso: curso,
                bimestre: bimestre
            })
            navigate('/')
            limparForm();
        } catch (error) {
            alert("Erro ao cadastrar novo aluno.");
        }
    };

    const getAlunoId = async () => {
        try {
            const response = await axios.get(`${url}/${idAluno}`);
            carregarDados(response.data)
        } catch (error) {
            alert("Não foi possível carregar dados do aluno.")
            navigate('/')
        }
    };

    useEffect(() => {
        if(idAluno){
            getAlunoId();
        }
    }, []);

    return(
        <>
            <h1>Formulário</h1>
            <div className="wrap">
                <div className="form">
                    <form>
                        <div>
                            <label>Nome:</label>
                            <input type="text" onChange={(event) => setNome(event.target.value)} value={nome} />
                            <span className="bar"></span>
                        </div>
                        <div>
                            <label>Matricula:</label>
                            <input type="text" onChange={(event) => setMatricula(event.target.value)} value={matricula} />
                            <span className="bar"></span>
                        </div>
                        <div>
                            <label>Curso:</label>
                            <input type="text" onChange={(event) => setCurso(event.target.value)} value={curso} />
                            <span className="bar"></span>
                        </div>
                        <div>
                            <label>Bimestre:</label>
                            <input type="text" onChange={(event) => setBimestre(event.target.value)} value={bimestre} />
                            <span className="bar"></span>
                        </div>
                        <button id="adicionar" onClick={() => idAluno ? salvarEditar(event) : adicionar(event)}>{idAluno ? "Salvar" : "Adicionar"}</button>
                        <button id="cancelar" onClick={() => cancelar()}>Cancelar</button>
                    </form>
                </div>
            </div>
        </>
    );
}