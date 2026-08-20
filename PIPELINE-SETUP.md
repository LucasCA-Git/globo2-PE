# Como ativar o pipeline de PR

Estes arquivos por si só rodam os checks no GitHub Actions, mas **não bloqueiam** o merge até você configurar a proteção de branch. Passos:

## 1. Onde colocar cada arquivo

```
globo2-PE/
├── .github/
│   ├── workflows/
│   │   └── pr-pipeline.yml        ← o workflow em si
│   ├── CODEOWNERS
│   └── pull_request_template.md
└── .commitlintrc.json             ← na raiz do repositório
```

## 2. Ajustar CODEOWNERS

Troque cada `@globo2-pe/xxxx-lead` pelo usuário real do GitHub do sublíder (ex.: `@LucasCA-Git`) ou crie times na organização/conta (Settings → Teams) com esses nomes e adicione os sublíderes a cada um.

## 3. Ativar branch protection na `main`

No GitHub: **Settings → Branches → Add branch protection rule** para `main`:

- Marque **Require a pull request before merging**.
- Marque **Require approvals** (mínimo 1) e **Require review from Code Owners**.
- Marque **Require status checks to pass before merging** e selecione os checks: `Valida commits semanticos`, `Lint - frontend (Next.js)`, `Lint - backend (Python)`, `Lint - agent (Python)`, `Lint - data_ia (Python)`, `Build - frontend (next build)`, `Build - backend (Docker)`, `Build - data_ia (Docker)`.
  - **Não** marque o job `qa-placeholder` como obrigatório ainda — ele existe só para dar visibilidade até QA criar os primeiros testes.
- Marque **Do not allow bypassing the above settings** (inclui admins) para a regra valer para todo mundo.

## 4. Instalar o ruff (lint Python) localmente, opcional

```bash
pip install ruff
ruff check backend agent data_ia
```

## 5. Próximo passo natural: testes reais

Quando o subgrupo de QA escrever os primeiros testes (ex.: `pytest` para `/health`, para o parser `<PROJETO> <CODIGO> <ILHA>` do agente, ou para o fallback do `predictor.py`), edite `pr-pipeline.yml`:

1. Substitua o conteúdo do job `qa-placeholder` pelos comandos reais (`pytest`, `npm test`, etc.), removendo `continue-on-error: true`.
2. Adicione esse job aos "required status checks" da branch `main` (passo 3 acima).
