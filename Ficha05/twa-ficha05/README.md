## Ficha 05

Continuação do catálogo de modelos de Inteligência Artificial desenvolvido na Ficha 04, utilizando Vue 3 e Vite.

Nesta ficha, o objetivo foi dividir a aplicação em componentes reutilizáveis e criar um formulário para adicionar novos produtos.

### Funcionalidades implementadas

- `ItemList.vue` — apresenta a lista dos produtos;
- `ItemDetail.vue` — apresenta os detalhes do produto selecionado;
- `ItemForm.vue` — permite adicionar novos produtos;
- `defineProps` — permite passar dados entre componentes;
- `defineEmits` — permite comunicar eventos ao componente principal;
- `reactive` e `v-model` — permitem gerir os dados do formulário;
- `computed` — permite validar o formulário;
- `useLoad.js` — permite reutilizar a lógica de carregamento dos dados;
- `onMounted` — carrega os dados quando o componente é montado;
- `watch` — limpa a seleção quando a pesquisa é alterada.

### Como executar

Na pasta `Ficha05/twa-ficha05`:

```bash
npm install
npm run dev
```

Para executar os testes:

```bash
node check.js
```

Para verificar a compilação:

```bash
npm run build
```

### Testes realizados

Os testes do `check.js` passaram sem erros e o projeto foi compilado com sucesso através do Vite.

### Reflexão

**1. Qual é a vantagem de dividir a aplicação em componentes?**

Permite organizar melhor o código e reutilizar os componentes noutras partes da aplicação.

**2. Qual é a diferença entre props e emits?**

As props permitem enviar dados do componente pai para o filho. Os emits permitem que o filho comunique eventos ao pai.

**3. Porque utilizámos reactive no formulário?**

Para guardar os dados do formulário e permitir que o Vue acompanhe as alterações feitas pelo utilizador.

**4. Para que serve um composable?**

Serve para reutilizar lógica entre componentes, evitando repetir o mesmo código.

**5. Qual é a diferença entre watch e computed?**

O computed calcula valores a partir do estado. O watch executa uma ação quando um valor observado muda.
