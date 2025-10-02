# 🌌 Exoplanet Data to CSV

Script em **Node.js** que consome a API do **NASA Exoplanet Archive (TAP Service)**, extrai dados da tabela `cumulative` e gera arquivos **CSV** automaticamente.

---

## 📦 Tecnologias usadas

* [Axios](https://www.npmjs.com/package/axios) → requisições HTTP
* [json2csv](https://www.npmjs.com/package/json2csv) → conversão de JSON para CSV
* [Node.js FS](https://nodejs.org/api/fs.html) → manipulação de arquivos

---

## ⚙️ Funções

### 🔹 `getDataWithLimit(limit)`

Busca os primeiros `limit` registros da tabela `cumulative`.

```js
const planets = await getDataWithLimit(5);
```

**Exemplo de retorno:**

```json
[
  {
    "kepid": 757076,
    "kepoi_name": "K00001.01",
    "koi_disposition": "CONFIRMED",
    "koi_period": 2.4706131,
    "koi_prad": 1.68
  }
]
```

---

### 🔹 `getData()`

Busca **todos os registros** da tabela `cumulative`.

```js
const planets = await getData();
```

---

### 🔹 `getDataByDescription(desc)`

Filtra registros pelo campo `koi_disposition`. Valores aceitos:

* `"CONFIRMED"`
* `"CANDIDATE"`
* `"FALSE POSITIVE"`

```js
const confirmed = await getDataByDescription("CONFIRMED");
```

---

### 🔹 `generateCSV(data, filename = "output", fields = null)`

Gera um arquivo CSV a partir dos dados.

* `data` → array de objetos JSON
* `filename` → nome do arquivo (sem extensão, default = `"output"`)
* `fields` → array opcional com colunas específicas

Se `fields` não for informado, exporta todas as colunas automaticamente.

```js
const data = await getDataWithLimit(1);
generateCSV(data, "new1", ["kepid", "kepoi_name"]);
```

📂 **Saída (`new1.csv`):**

```csv
kepid,kepoi_name
757076,K00001.01
```

---

## 🚀 Como usar

1. Instale as dependências:

```bash
npm install axios json2csv
```

2. Rode o script:

```bash
node index.js
```

3. Arquivos `.csv` serão salvos na mesma pasta.

---

## 📌 Observações

* O endpoint oficial usado é **TAP (`/TAP/sync`)**, que suporta consultas ADQL.
* Para exportar apenas algumas colunas, use o parâmetro `fields` em `generateCSV`.
* Para buscar planetas filtrados por classificação, use `getDataByDescription`.

---
