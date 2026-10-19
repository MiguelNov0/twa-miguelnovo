# Tecnologias Web Avançadas

Repositório dos trabalhos realizados na unidade curricular de Tecnologias Web Avançadas.

## Ficha 01

### twa-ficha01

Exercícios introdutórios de Node.js e módulos ES:

- Utilização de `import` e `export`;
- Consumo de uma API pública com `fetch`;
- Escrita de dados JSON utilizando `fs/promises`.

### twa-vite

Projeto criado com Vite utilizando o template Vanilla JavaScript.

O contador foi alterado para contar para baixo e o valor atual é apresentado no título do separador.

## Ficha 02

Projeto em JavaScript moderno baseado num catálogo de modelos de Inteligência Artificial.

Foram utilizados:

- `map`, `filter` e `reduce`;
- `toSorted`;
- Destructuring e spread;
- Módulos ES;
- Funções puras;
- Argumentos da linha de comandos;
- Escrita de ficheiros JSON;
- Testes com `node:assert/strict`.

## Ficha 03

Desenvolvimento de uma interface web para o catálogo de modelos de Inteligência Artificial, utilizando JavaScript e Vite.

Foram implementados:

- Carregamento dos dados de `items.json` com `fetch`;
- Tratamento de erros com `try`, `catch` e `finally`;
- Estados de carregamento, sucesso e erro;
- Pesquisa e filtragem por categorias;
- Ordenação dos produtos por preço;
- Seleção de produtos e apresentação dos detalhes;
- Manipulação do DOM com JavaScript;
- Testes das funções do catálogo com `check.js`.

A interface é atualizada através da função `render()`.

### Como executar

Na pasta `Ficha03/twa-ficha03`:

```bash
npm install
npm run dev
```

Para executar os testes:

```bash
node check.js
```

## Ficha 04

Desenvolvimento do mesmo catálogo da Ficha 03, mas utilizando Vue 3 e Vite.

Foram implementados:

- Estado reativo utilizando `ref`;
- Carregamento dos produtos com `fetch`;
- Tratamento dos estados de carregamento e erro;
- Três propriedades `computed`: `visible`, `cats` e `selected`;
- Pesquisa e filtragem com `v-model`;
- Ordenação dos produtos por preço;
- Apresentação dos produtos com `v-for` e `:key`;
- Apresentação condicional com `v-if`, `v-else-if` e `v-else`;
- Seleção de produtos e visualização dos detalhes;
- Estilos CSS com `<style scoped>`;
- Reutilização do `catalog.js`, `items.json` e `check.js` da Ficha 03.

Nesta ficha, o Vue atualiza automaticamente a interface quando o estado muda, sem necessidade de utilizar a função `render()`.

### Como executar

Na pasta `Ficha04/twa-ficha04`:

```bash
npm install
npm run dev
```

Para executar os testes:

```bash
node check.js
```

### Verificações realizadas

- Pesquisa em tempo real;
- Filtragem por categoria;
- Ordenação ascendente e descendente;
- Seleção e visualização dos detalhes;
- Tratamento de erros e botão para tentar novamente;
- Apresentação segura de texto HTML;
- Execução dos testes de `check.js`.


## Utilização de IA generativa

Foi utilizada IA generativa como apoio na realização dos trabalhos em casa, nomeadamente para esclarecer conceitos, interpretar os enunciados, compreender o código, identificar erros e apoiar a implementação e os testes dos exercícios.

Os trabalhos foram executados e testados localmente.