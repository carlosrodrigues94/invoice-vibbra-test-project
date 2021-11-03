## Bem-vindo à Shuri :rocket:
Você também pode acessar essa documentação em Inglês clicando [aqui](readmeEN.md)

#### Este documento tem como objetivo explicar alguns passos inicias para iniciar  a rotina de trabalho  do projeto. Aqui você encontrará as seguintes instruções:

  - Como baixar o projeto e começar a trabalhar -> [Baixando o Projeto](#baixando-o-projeto)
  - Como utilizar o ambiente de Dev para adicionar novas funcionalidades  -> [Iniciando no ambiente de Desenvolvimento](#iniciando-no-ambiente-de-desenvolvimento)
  - Como funciona o GitFlow do Projeto -> [Seguindo o GitFlow da Shuri](#seguindo-o-gitflow-da-shuri)
  - Como enviar as novas funcionalidades para o time de QCA -> [Subindo as novas funcionalidades para o Ambiente de Teste](#subindo-para-teste)
  - Como subir as novas funcionalides para o Ambiente de Produção -> [Subindo as novas funcionalides para o Ambiente de Produção](#subindo-para-prod)



### [Baixando o Projeto](#baixando-o-projeto)


#### Para inicializar o projeto, basta seguir os passos do checklist a seguir:
  - [Clone o Repositório](#clonando-o-repo)
  - [Abra o Projeto Localmente](#abrindo-o-projeto)
  - [NPM || YARN start no Projeto](#rodando-o-projeto)

-
### [Clonando o Repositório](#clonando-o-repo)


Para clonar o repositório, você necessitará ter acesso ao repositório da Shuri, na sequência, basta realizar o seguinte comando
em seu terminal



>     git clone git@bitbucket.org:wisereducacao/shuri-front.git

Aqui temos um exemplo de como realizar o clone do projeto em sua máquina:
![Clonando um Repositório no terminal](https://i.ibb.co/cwNt09Q/clone.png)




### [Iniciando o Projeto Localmente](#abrindo-o-projeto)
   Após clonar o projeto, para iniciar o repositório em sua máquina, basta realizar as seguintes ações em seu terminal:

```
$ cd shuri-front
```
Após abrir a pasta do repositório em sua máquina, baixe os pacotes:

    $ yarn || npm install

Aqui temos um exemplo de como baixar os pacotes:
![Exemplo iniciando projeto](https://i.ibb.co/cL2YZ2M/yarninstall.png)




### [Rodando o Projeto Localmente](#rodando-o-projeto)
Após baixar todos os pacotes do projeto em sua máquina, para inicar a aplicação é simples, basta realizar os seguintes comandos em seu terminal:


    $ yarn start || npm start


Atenção: Solicite acesso as variáveis de ambiente e as adicione em seu arquivo .env .


Seu arquivo **.env** deverá ter a seguinte estrutura:

    REACT_APP_SHURI_API_BASE_URL=https://example-example.wiser.cloud/api




### [Iniciando no ambiente de Desenvolvimento](#iniciando-no-ambiente-de-desenvolvimento)

O ambiente de desenvolvimento, nesse projeto, está localizado na branch **develop** e funciona como a raíz do projeto, ou seja, branchs  que irão incluir novas funcionalides, resolução de bugs ou adição de testes, devem ser feitas a partir de develop.

Com o projeto já baixado em sua máquina, siga os seguintes comandos para migrar de branch e acessar develop:

    $ git checkout develop

Não esqueça de atualizar a branch, para que todas as funcionalidades de **develop** estejam inclusas em sua máquina. Para atualizar a branch, realize o seguinte comando em seu terminal:

    $ git pull


#### Adicionando novas funcionalidades no projeto
Todas as novas funcionalidades, ou *bugs*, possuem uma respectiva *task* no Jira, dessa maneira, será criado uma branch, a partir de **develop**, que seguirá um padrão de nomenclatura. A seguir, observa-se a estrutura:


> prefixo/SHURI-Nº_DA_TASK_NO_JIRA-funcionalide

A lista a seguir, demonstra alguns **prefixos** mais utilizados para a criação da branch:

 - FEATURE: Para criação de branchs que adicionaram novas funcionalidades;
 - FIX: Para criação de branchs que solucionaram *bugs*;
 - RELEASE: Para criação de branchs que faram a liberação das funcionalides para produção;

 Para adicionar o número da *task*, basta acessar o Jira, e buscar o número da *task* no *card*, que está localizado no local destacado, na seguinte imagem:
 ![Número da task](https://i.ibb.co/85J7TJ7/exemplo-jira.png)

Em relação a funcionalidade, basta descrever, resumidamente o que será feito na branch.
Observe um exemplo de branch, que fará referência a imagem anterior:

> feature/SHURI-275-create-documentation

Nesse projeto é utilizado [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0-beta.4/), que estabelece padrões ao commits, para saber mais, basta clicar [aqui](https://www.conventionalcommits.org/pt-br/v1.0.0-beta.4/).

###  [Seguindo o GitFlow da Shuri](#seguindo-o-gitflow-da-shuri)
O Fluxo do Git da Shuri, funciona da seguinte maneira:
![Git Flow Shuri](https://i.ibb.co/bLz8Qwt/gitFlow.png)

Resumidamente, a branch **Master**, possui o ambiente atual de *produção*, enquanto **Develop** carrega uma cópia de master e as novas funcionalidades que ainda não estão em produção. Assim sendo, é necessário criar uma branch a partir de **develop**, após a conclusão da tarefa e a aprovação das funcionalidades pelo time de QCA, será aberto um *pull request* para **develop**, (não esqueça, só poderá ser realizado o merge em **develop**, se, e somente se, ao menos um outro desenvolvedor tenha aprovado o *PR*). Após todas as novas funcionalidades estarem em **develop**, é criado uma branch de **release**, branch que possui todas as novas funcionalidades que vão subir para produção, após a criação da branch **release**, abre-se *PR* para **master**.

### [Subindo as novas funcionalidades para o Ambiente de Teste](#subindo-para-teste)

Como explicado no tópico anterior, as funcionalidades que irão para o ambiente de teste, estão em **develop**, dessa maneira, para subir as funcionalides para o ambiente de teste, ou seja, para que o time de QCA possa testar, basta rodar uma **pipeline** para o ambiente de teste. A seguir, observe como subir as funcionalidades para o ambiente de teste:

 - Já no repositório da SHURI, vá até a aba **Branches**
 - ![branch pages](https://i.ibb.co/0JJmdn6/branchspage.png)

 - Em seguida, encontre a linha em que a branch develop encontra-se, e selecione a coluna **Actions**
 - ![develop row](https://i.ibb.co/MV72QBs/develop.png)
![actions column](https://i.ibb.co/7R5TXM2/actions.png)

 - Já com o *select box* da coluna *Actions* aberto, selecione **Run pipeline for a branch**
 - ![run pipeline](https://i.ibb.co/sRXZK5Y/actions-1.png)

 - Ao selecionar **Run pipeline for a branch**, será aberto um modal,  que possui um *select box*, com todos os ambientes que é possível rodar a pipeline, selecione **custom: deploy-to-staging**. Após selecionado, clique em **Run** e aguarde o **Deploy**, no ambiente de teste.
 - ![run](https://i.ibb.co/0Qtwkdf/deploy-staging.png)


### [Subindo as novas funcionalides para o Ambiente de Produção](#subindo-para-prod)

Com todas as novas features aprovadas e já em **develop**, basta criar uma branch de **release**, como no exemplo a seguir:

> release/SHURI.20210608.1.7.0

Em seguida, abrir PR para **master**, e na sequência rodar pipeline para **custom:deploy-to-homolog**, e com todas as features já aprovadas e testadas, rodar a pipeline para **branches: master**
