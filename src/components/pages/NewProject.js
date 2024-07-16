import React from "react";
import ProjectForm from "../projects/ProjectForm";
import styles from "./NewProject.module.css";
import { useNavigate } from "react-router-dom";

function NewProject() {
  const navigate = useNavigate();

  function createPost(project) {
    project.cost = 0;
    project.services = [];

    fetch("http://100.26.204.192:3000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => {
        console.log('Response status:', resp.status);
        return resp.text().then(text => {
          console.log('Response text:', text);
          return JSON.parse(text); // Você pode modificar isso se o texto não for um JSON válido
        });
      })
      .then((data) => {
        console.log(data);
        navigate("/projects", {
          state: { message: "Projeto Criado Com Sucesso!" },
        });
      })
      .catch((err) => console.error('Error:', err));
    
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projetos</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  );
}

export default NewProject;
