# Ficha 06 — Vue III: Router e Paginação

**Unidade Curricular:** Tecnologias Web Avançadas  
**Ano Letivo:** 2026/2027  
**Tema:** Catálogo de Modelos de Inteligência Artificial

## Objetivo

O objetivo desta ficha foi evoluir o catálogo desenvolvido na Ficha 05, introduzindo navegação entre páginas com Vue Router, rotas dinâmicas, partilha de dados e paginação de uma API pública.

## Funcionalidades Implementadas

- Navegação entre páginas utilizando Vue Router.
- Página principal com catálogo de modelos de IA, pesquisa, filtros e ordenação por preço.
- Página de detalhes de cada modelo através do seu ID.
- Formulário para adicionar novos modelos, com validação dos campos.
- Utilização de `store.js` para partilhar dados entre páginas.
- Página de erro 404 para endereços inexistentes.
- Página de demonstração com paginação de Pokémon através da PokéAPI.
- Navegação entre páginas de resultados com botões Anterior e Seguinte.
- Atualização do URL através do parâmetro `?page=`.

## Estrutura do Projeto

```text
src/
├── api/
│   ├── getJSON.js
│   └── pokeapi.js
├── components/
│   ├── ItemList.vue
│   ├── ItemDetail.vue
│   └── ItemForm.vue
├── composables/
│   └── useLoad.js
├── pages/
│   ├── CatalogPage.vue
│   ├── ItemPage.vue
│   ├── NewItemPage.vue
│   ├── NotFound.vue
│   └── PokemonPage.vue
├── App.vue
├── catalog.js
├── main.js
├── router.js
├── store.js
└── style.css
```

## Como Executar

Na pasta `twa-ficha06`, executar:

```bash
npm install
npm run dev
```

Abrir o endereço indicado pelo Vite, normalmente `http://localhost:5173/`.

## Testes

Foram executados os seguintes comandos:

```bash
node check.js
npm run build
```

Os testes automáticos passaram e a compilação de produção foi concluída com sucesso.

A navegação entre o catálogo e os detalhes dos modelos, assim como a paginação da PokéAPI, também foi testada no navegador.

## Reflexão

**1. Para que serve o Vue Router?**

Permite navegar entre diferentes páginas da aplicação, associando componentes a endereços URL.

**2. O que é uma rota dinâmica?**

É uma rota que recebe parâmetros, como `/items/3`, permitindo mostrar os detalhes do modelo com ID 3.

**3. Para que serve o store.js?**

Permite partilhar dados entre diferentes páginas, evitando perder o estado quando navegamos entre componentes.

**4. Qual é a vantagem de guardar a página atual no URL?**

Permite atualizar a página, utilizar o histórico do navegador e partilhar o endereço sem perder a página selecionada.

**5. Qual é a diferença entre limit e offset?**

O `limit` indica quantos resultados queremos receber. O `offset` indica quantos resultados devemos saltar antes de começar a apresentar os dados.

## Utilização de Inteligência Artificial Generativa

Foi utilizada como apoio à interpretação do enunciado, compreensão dos conceitos de Vue Router, implementação das rotas.

A IA também foi utilizada para ajudar na identificação e resolução de erros durante o desenvolvimento. O código foi executado e testado localmente.