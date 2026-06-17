import React from "react";

export default function RelatorioPetDono() {
  const usuarios = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao@gmail.com",
      tipo: "Administrador"
    },
    {
      id: 2,
      nome: "Maria Souza",
      email: "maria@gmail.com",
      tipo: "Cliente"
    }
  ];

  const pets = [
    {
      id: 1,
      nome: "Rex",
      tipo: "Cachorro",
      raca: "Labrador",
      idade: 4,
      porte: "Grande",
      usuarioId: 1
    },
    {
      id: 2,
      nome: "Mimi",
      tipo: "Gato",
      raca: "Persa",
      idade: 2,
      porte: "Pequeno",
      usuarioId: 2
    }
  ];

  const relatorio = pets.map((pet) => {
    const dono = usuarios.find(
      usuario => usuario.id === pet.usuarioId
    );

    return {
      ...pet,
      donoNome: dono?.nome,
      donoEmail: dono?.email,
      donoTipo: dono?.tipo
    };
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Relatório Pet + Dono</h1>

      {relatorio.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px"
          }}
        >
          <h2> Dados do Pet</h2>

          <p><strong>Nome:</strong> {item.nome}</p>
          <p><strong>Tipo:</strong> {item.tipo}</p>
          <p><strong>Raça:</strong> {item.raca}</p>
          <p><strong>Idade:</strong> {item.idade} anos</p>
          <p><strong>Porte:</strong> {item.porte}</p>

          <hr />

          <h2>Dados do Dono</h2>

          <p><strong>Nome:</strong> {item.donoNome}</p>
          <p><strong>Email:</strong> {item.donoEmail}</p>
          <p><strong>Tipo:</strong> {item.donoTipo}</p>
        </div>
      ))}
    </div>
  );
}
