# **Media Compose Dashboard: Monitoramento e Inteligência para Ilhas de Edição**

Este projeto é um ecossistema inteligente projetado para transformar a atividade bruta das ilhas de edição em dados estratégicos e previsões em tempo real. Ele resolve o desafio de gestores que precisam saber quem está operando, em qual projeto e, principalmente, quando o trabalho será concluído, sem interromper o fluxo criativo dos editores.

## **Como o Sistema Funciona: O Fluxo de Trabalho**

O sistema opera de forma silenciosa e automática, seguindo quatro grandes etapas que conectam a estação de trabalho do editor à tela do gestor.

![Diagrama](./img/diagram.png)
### **1\. Captura Invisível (A Ponta)**

Tudo começa na estação de trabalho onde o **Avid Media Composer** está rodando. Um componente chamado **Agente de Coleta** fica vigilante no plano de fundo.

* **Ação**: Sempre que o editor salva o projeto ou o Avid faz um backup automático, o Agente detecta essa movimentação no armazenamento (storage).  
* **Diferencial**: O editor não precisa apertar nenhum botão extra; o monitoramento é feito por meio dos eventos do próprio sistema operacional.

### **2\. Processamento Instantâneo (O Agora)**

Assim que o Agente percebe uma mudança, ele envia um sinal para o **Coração do Sistema (API)**.

* **Atualização em Milissegundos**: A informação de que o "Editor X" está trabalhando no "Projeto Y" é gravada em uma memória de alta velocidade (Redis).  
* **Visualização Reativa**: O Dashboard para os gestores é atualizado instantaneamente via WebSockets. Se um editor parar de salvar por um longo período, o sistema consegue sinalizar que aquela ilha pode estar ociosa ou livre.

### **3\. Memória Institucional (O Passado)**

Enquanto o Dashboard mostra o que está acontecendo "agora", o sistema organiza esses dados para o futuro.

* **Histórico Detalhado**: Cada sessão de edição é registrada em um banco de dados robusto (PostgreSQL).  
* **Dados Armazenados**: Início da edição, fim da edição, tempo total de uso e o tamanho dos arquivos manipulados. Isso elimina a necessidade de preenchimento manual de planilhas de produtividade.

### **4\. Predição com Inteligência Artificial (O Futuro)**

O grande diferencial deste projeto é a sua capacidade de prever prazos utilizando **Scikit-Learn**.

* **Aprendizado**: A Inteligência Artificial analisa os meses de histórico armazenados no banco de dados. Ela aprende, por exemplo, que o "Editor João" costuma levar 4 horas para finalizar um projeto de 2GB no Avid.  
* **Estimativa de Entrega (ETC)**: Quando uma nova edição começa, o sistema cruza o tamanho do arquivo com o comportamento histórico do editor e exibe no Dashboard: *"Previsão de término: 15h30"*.

---

## **Os Componentes e Suas Funções**

Para que tudo isso aconteça, o projeto utiliza uma arquitetura moderna baseada em containers (**Docker**), onde cada parte tem uma responsabilidade única:

| Componente | Papel no Ecossistema |
| :---- | :---- |
| **Agente (Watchdog)** | O vigia que detecta quando o Avid Media Composer salva arquivos. |
| **Cérebro (Flask)** | Recebe os alertas do Agente e distribui para o resto do sistema. |
| **Memória Flash (Redis)** | Garante que o status "Ocupado/Livre" apareça na tela em tempo real. |
| **Arquivo (PostgreSQL)** | Guarda todo o histórico para relatórios de produtividade e auditoria. |
| **IA (Scikit-Learn)** | Calcula o tempo que falta para o editor terminar o trabalho. |
| **Dashboard (Front-end)** | A interface visual onde o gestor acompanha tudo de forma clara. |

## **1\. Visão Geral da Arquitetura**

O sistema baseia-se em uma arquitetura orientada a eventos, onde a detecção de alterações em arquivos de projeto dispara uma cadeia de processamento que resulta em visualizações em tempo real e predições baseadas em IA.

| Camada | Tecnologia | Justificativa Técnica |
| :---- | :---- | :---- |
| **Coleta (Agente)** | Python (Watchdog) | Monitoramento leve de eventos do SO (criação/edição) sem sobrecarga de storage. |
| **Backend (API)** | Flask | Alta performance assíncrona, ideal para WebSockets e documentação automática. |
| **Mensageria/Cache** | Redis | Intermediário ultrarrápido para estados transitórios (Livre/Ocupado) em memória. |
| **Banco de Dados** | PostgreSQL | Persistência de dados históricos para auditoria e treinamento de modelos. |
| **Inteligência (IA)** | Scikit-Learn / Pandas | Predição de tempo de conclusão (ETC) com base em regressão histórica. |
| **Processamento (ETL)** | Python Worker | Container dedicado para limpeza de dados e transformação de eventos em métricas. |
| **Dashboard** | Streamlit / Next.js | Interface reativa para acompanhamento gerencial. |

## **2\. Estrutura de Diretórios**

```plaintext
GLOBO2-PE
│
├── docker-compose.yml
├── .env
│
├── agent/                # Watchdog (captura eventos)
│   ├── monitor.py
│   └── requirements.txt
│
├── backend/              # API Flask (cérebro)
│   ├── main.py
│   ├── database.py
│   └── requirements.txt
│
├── data_ia/              # ETL + IA
│   ├── etl_process.py
│   ├── predictor.py
│   └── requirements.txt
│
├── frontend/             # Dashboard
│   ├── app.py
│   └── requirements.txt
│
├── redis_config/
│   └── redis.conf
│
└── postgres/
    └── init.sql

---

## **3\. Fluxo de Dados (Data Journey)**

O "Caminho do Dado" segue cinco etapas fundamentais para garantir a baixa latência no Dashboard e a integridade no banco de dados:

1. **Detecção:** O **Agente** identifica que um editor salvou um arquivo (ex: `.prproj`) no storage.  
2. **Notificação:** A **API** recebe o evento e atualiza o **Redis** instantaneamente.  
3. **Persistência:** O **Worker de ETL** captura o evento e o salva no **PostgreSQL**.  
4. **Predição:** A **IA** analisa o volume do arquivo e o histórico do editor para calcular o tempo restante.  
5. **Visualização:** O **Dashboard** exibe: *"Editor X: Ocupado | Previsão de entrega: 15min"*.

---

## **4\. Componentes de Armazenamento e Inteligência**

### **4.1 Redis: O Estado em Tempo Real**

O Redis é utilizado para gerenciar estados voláteis. Ao utilizar a estrutura de `HSET` ou `Pub/Sub`, o dashboard recebe atualizações sem a necessidade de requisições constantes (polling).

* **Exemplo de Comando:** `SET editor:joao "ocupado"`  
* **Vantagem:** Resposta em \~1ms, comparado aos 10-100ms de bancos convencionais.

### **4.2 PostgreSQL: O Cérebro Histórico**

Diferente do Redis, o Postgres armazena a estrutura para análise de longo prazo.

| CREATE TABLE edicoes (     id SERIAL PRIMARY KEY,     editor VARCHAR(100),     arquivo VARCHAR(255),     inicio\_edicao TIMESTAMP,     fim\_edicao TIMESTAMP,     duracao\_segundos INT  ); |
| :---- |

### **4.3 Scikit-Learn: Predição de Produtividade**

O modelo de Machine Learning utiliza os dados do PostgreSQL para prever o tempo de entrega.

Python

| import pandas as pdfrom sklearn.linear\_model import LinearRegression\# Exemplo de lógica do predictor.pydef predict\_editing\_time(tamanho\_arquivo\_novo):    \# Dados extraídos do PostgreSQL    data \= pd.DataFrame({       "tamanho\_arquivo": \[500, 700, 300\],       "duracao": \[1500, 1800, 1200\]    })    X \= data\[\["tamanho\_arquivo"\]\]    y \= data\["duracao"\]    model \= LinearRegression()    model.fit(X, y)    return model.predict(\[\[tamanho\_arquivo\_novo\]\]) |
| :---- |

---

## **5\. Resumo de Responsabilidades**

| Componente | Função Principal |
| :---- | :---- |
| **Redis** | Estado momentâneo (Agora) |
| **PostgreSQL** | Histórico e Auditoria (Passado) |
| **Scikit-Learn** | Inteligência e Previsão (Futuro) |
| **Flask** | Orquestração e Lógica |
| **Watchdog** | Gatilho de eventos |

---

A parte de Inteligência Artificial (IA) é o diferencial estratégico deste projeto, pois ela transforma o monitoramento passivo em uma ferramenta de **análise preditiva**. Em vez de apenas dizer o que está acontecendo agora, a IA projeta o futuro.

Aqui está o detalhamento de como essa camada funciona, do aprendizado à previsão:

### **1\. A Fonte do Conhecimento (Dados Históricos)**

A IA não "adivinha"; ela calcula com base em evidências.

* **Coleta de Dados**: O sistema utiliza o **PostgreSQL** para armazenar o histórico de todas as edições finalizadas no **Avid Media Composer**.  
* **Variáveis Analisadas (Features)**: Para o modelo aprender, ele observa principalmente duas informações: o **tamanho do arquivo de projeto** (volume de dados) e o **tempo real que o editor levou** para concluir aquela tarefa.

### **2\. O Modelo de Aprendizado (Scikit-Learn)**

O projeto utiliza a biblioteca **Scikit-Learn**, focada em um algoritmo chamado **Regressão Linear**.

* **Treinamento**: O modelo analisa o passado (ex: "Sempre que o Editor João pegou um arquivo de 500MB, ele levou cerca de 25 minutos").  
* **Padrões Individuais**: A IA consegue identificar que editores diferentes possuem ritmos diferentes, criando uma base de comparação justa e precisa para cada profissional.

### **3\. O Cálculo da Previsão (Inferência)**

Quando uma nova edição começa, o fluxo de inteligência entra em ação:

* **Entrada de Dados**: O **Agente** detecta que o editor abriu um novo projeto no Avid e identifica o tamanho inicial desse arquivo.  
* **Processamento**: A API consulta o modelo de IA pré-treinado, passando os dados atuais da ilha de edição.  
* **Saída (ETC)**: A IA gera o **ETC (Estimated Time of Completion)**, ou seja, a estimativa de término.

### **4\. Ciclo de Melhoria Contínua**

Diferente de uma regra fixa, a IA deste projeto é dinâmica:

* **Retroalimentação**: Toda vez que uma edição termina, os dados reais (tempo que levou de fato) são salvos no banco de dados.  
* **Re-treinamento**: O modelo pode ser atualizado periodicamente com esses novos dados, tornando as previsões cada vez mais precisas conforme o sistema é utilizado.

### **Resumo do Papel da IA no Dashboard**

No painel visual do gestor, a IA converte dados frios em informações acionáveis:

* **Sem IA**: "Editor João: Ocupado há 10 minutos."  
* **Com IA**: "Editor João: Ocupado. **Previsão de entrega: 15 minutos restantes**."

---

