import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const url = "https://api-aluno.vercel.app/aluno";
    const navigate = useNavigate();
    const [alunos, setAlunos] = useState([]);

    const getAlunos = async () => {
        const response = await axios.get(url);
        setAlunos(response.data);
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

    return(
        <div>
            <h1>
                Alunos
                <br />
                <button id="NovoAluno" onClick={() => navigate(`/formulario`)}>Novo Aluno</button>
            </h1>
            <div className="wrap">
                <div id="cards">
                    {alunos.map((aluno) => (
                        <div id="item" key={aluno._id}>
                        <div >
                            <h3>{aluno.nome}</h3>
                            <p>Matricula - {aluno.matricula}</p>
                            <p>{aluno.curso} - Bimestre {aluno.bimestre}</p>
                            <button id="editar" onClick={() => navigate(`/formulario/${aluno._id}`)}>Editar</button>
                            <button id="apagar" onClick={() => deletar(aluno)}>Apagar</button>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}