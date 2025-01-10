# Instabytes API

Instabytes API é um projeto desenvolvido com Node.js que fornece uma interface para gerenciar posts e realizar uploads de imagens. Ele também utiliza a API Gemini para gerar descrições automáticas para imagens enviadas.

## Visão Geral

A API suporta:

- Listagem de posts.
- Criação de posts enviando apenas uma imagem.
- Upload e atualização de imagens associadas aos posts.
- Geração automática de descrições para imagens usando a API Gemini.

A API está publicada no Google Cloud e pode ser acessada por meio da URL:

```
https://backend-instabytes-668468799247.southamerica-east1.run.app/posts
```

---

## Tecnologias Utilizadas

- **Node.js** (>=14.0.0)
- **Express**
- **MongoDB** para armazenamento de dados
- **Multer** para manipulação de uploads de arquivos
- **CORS** para controle de acesso entre domínios
- **dotenv** para configurações de ambiente
- **@google/generative-ai** para integração com o modelo Gemini

---

## Como Rodar o Projeto Localmente

1. **Clone o repositório:**

   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-diretorio>
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis:

   ```env
   PORT=3000
   MONGO_URI=<sua-string-de-conexão-MongoDB>
   GOOGLE_API_KEY=<sua-chave-para-o-Gemini>
   ```

4. **Inicie o servidor em modo de desenvolvimento:**

   ```bash
   npm run dev
   ```

5. Acesse a API localmente em:

   ```
   http://localhost:3000
   ```

---

## Rotas Disponíveis

### **1. Listar Posts**

- **Endpoint:** `GET /posts`
- **Descrição:** Recupera uma lista de todos os posts registrados.

### **2. Criar um Novo Post**

- **Endpoint:** `POST /posts`
- **Descrição:** Permite criar um novo post enviando apenas uma imagem.
- **Body esperado:**
  - `multipart/form-data` com o campo `imagem` (contendo o arquivo a ser enviado).

### **3. Upload de Imagem**

- **Endpoint:** `POST /upload`
- **Descrição:** Permite realizar o upload de uma imagem associada a um post.
- **Body esperado:**
  - `multipart/form-data` com o campo `imagem` (contendo o arquivo a ser enviado).

### **4. Atualizar Post**

- **Endpoint:** `PUT /upload/:id`
- **Descrição:** Atualiza os dados de um post já existente (incluindo a descrição gerada para a imagem).
- **Funcionamento:**
  - Lê a imagem já enviada e gera uma descrição usando a API Gemini.
  - Atualiza a URL da imagem e o texto alternativo (campo `alt`).

---

## Função de Geração de Descrição de Imagens

A API utiliza a biblioteca `@google/generative-ai` para gerar descrições automáticas para imagens. A função `gerarDescricaoComGemini` processa a imagem recebida e retorna uma descrição curta em português.

---





