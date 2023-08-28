# SpaceXAPI

![GitHub repo size](https://img.shields.io/github/repo-size/elvesbd/space-backend?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/elvesbd/space-backend?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/elvesbd/space-backend?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues-raw/elvesbd/space-backend?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/elvesbd/space-backend?style=for-the-badge)

<img src="https://i.imgur.com/mVfMOTb.png" alt="exemplo imagem">

# Projeto SpaceX API

Bem-vindo ao README do projeto SpaceX API! Este projeto tem como objetivo fornecer informações sobre os lançamentos da SpaceX e estatísticas dos foguetes por meio de vários endpoints de API. Abaixo, você encontrará detalhes sobre as rotas implementadas, as estruturas de dados, a integração com uma API externa e um cron job agendado.

## Rotas Implementadas

### \[GET\] /

- Esta rota retorna uma simples mensagem de boas-vindas.
- Endpoint: `/`
- Resposta: "Desafio Fullstack 🏅 - SpaceX API"

### \[GET\] /launches

- Esta rota lista dados de lançamentos com suporte para paginação e funcionalidade de busca.
- Endpoint: `/launches`
- Parâmetros de Consulta:
  - `search` (opcional): Termo de busca para filtrar lançamentos.
  - `limit` (opcional): Limite do número de lançamentos por página.
- Resposta: Lista de dados de lançamento.

### \[GET\] /launches/stats/bar

- Esta rota fornece estatísticas anuais de lançamento de foguetes em formato de gráfico de barras.
- Endpoint: `/launches/stats/bar`
- Resposta: Contagens anuais de lançamento de foguetes com IDs de foguetes associados e totais de lançamento.

### \[GET\] /launches/stats/pie

- Esta rota oferece estatísticas de sucesso e falha de lançamento de foguetes em formato de gráfico de pizza.
- Endpoint: `/launches/stats/pie`
- Resposta: Contagens específicas do foguete de sucesso e falha, juntamente com totais gerais de sucesso e falha.

## Integração com API Externa

Na primeira execução do aplicativo, um script é acionado para integrar com a [API SpaceX](https://github.com/r-spacex/SpaceX-API). Essa integração popula o banco de dados local com dados relevantes de lançamento e foguete. Isso garante que o aplicativo comece com informações precisas e atualizadas.

## Cron Job Agendado

Um cron job foi implementado para ser executado diariamente às 9:00 da manhã. Esse cron job busca os dados de lançamento mais recentes da API externa e atualiza o banco de dados local. Isso mantém o aplicativo atualizado e alinhado com os lançamentos mais recentes da SpaceX.

## Swagger

O projeto também possui uma documentação Swagger implementada. Você pode acessar a documentação em [http://localhost:3000/api/v1](http://localhost:3000/api/v1) após iniciar o aplicativo.

## Pré-requisitos

- Node.js e npm instalados: [Node.js Downloads](https://nodejs.org/)
- Docker instalado: [Docker](https://www.docker.com/)

## Passos para Execução

1. **Clonar o Projeto:**

Abra um terminal e execute o seguinte comando para clonar o projeto:

```bash
git clone https://github.com/elvesbd/space-backend.git
cd space-backend
```

2. **Instalar Dependências:**

Abra um terminal e execute o seguinte comando para clonar o projeto:

```bash
npm install
cd space-backend
```

3. **Configurar o Banco de Dados com Docker:**

Abra um terminal e execute o seguinte comando para clonar o projeto:

```bash
docker run --name space-mongo -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=ebd123 -e MONGO_INITDB_DATABASE=space -p 27017:27017 -d mongo

cd space-backend
```

4. **Iniciar o servidor:**

Abra um terminal e execute o seguinte comando para clonar o projeto:

```bash
npm run start:dev
```

## Conclusão

Este projeto demonstra o uso da API SpaceX para fornecer dados informativos sobre os lançamentos da SpaceX e estatísticas dos foguetes. Com as rotas implementadas, integração com API externa e um cron job agendado, o aplicativo garante que os usuários tenham acesso às informações mais recentes e estatísticas relevantes.

Para quaisquer dúvidas ou comentários, sinta-se à vontade para entrar em contato!

Aproveite a exploração do cosmos com a SpaceX API! 🚀🌌

## 🤝 Colaborador

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://github.com/elvesbd.png" width="100px;" alt="Foto do Elves Brito no GitHub"/><br>
        <sub>
          <b>Elves Brito</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## Referência

Este projeto é parte de um desafio proposto pela Coodesh. Para mais informações sobre o desafio, consulte [link para o desafio](https://coodesh.com).

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

[⬆ Voltar ao topo](#SpaceXAPI)<br>
