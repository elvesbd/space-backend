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

## Rodando a Aplicação com Containers

Agora, também oferecemos suporte para executar a aplicação SpaceX API usando Docker e Docker Compose. Isso facilita a configuração e execução da aplicação em qualquer ambiente. Siga os passos abaixo para iniciar a aplicação usando Docker:

### Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em seu sistema.

### Passos

Abra um terminal e navegue até o diretório raiz do projeto onde está localizado o arquivo `docker-compose.yml`.

Execute o seguinte comando para construir as imagens Docker e iniciar os contêineres:

```bash
docker-compose up
```

Isso criará e inicializará os contêineres necessários com base nas configurações fornecidas no arquivo docker-compose.yml.
Após a conclusão, a aplicação estará acessível através do host e porta (geralmente http://localhost:3000).

Sinta-se à vontade para explorar as rotas implementadas, testar os endpoints da API e visualizar as estatísticas de lançamento.

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

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

[⬆ Voltar ao topo](#SpaceXAPI)<br>
