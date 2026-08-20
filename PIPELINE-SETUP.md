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

## 3. Fluxo de branches

```
backend/frontend/design/qa/dados/ia/devops/docs  --PR-->  staging  --PR-->  main
```

- `main`: produção. Só recebe merge de `staging`.
- `staging`: branch de integração ("semi-original" da main), recebe os PRs de cada subgrupo.
- Uma branch por subgrupo (`backend`, `frontend`, `design`, `qa`, `dados`, `ia`, `devops`, `docs`), criada a partir de `staging`.

Criação inicial das branches (rodar uma vez, a partir de uma `main` atualizada):

```bash
git checkout main
git pull origin main

git checkout -b staging
git push -u origin staging

for grupo in backend frontend design qa dados ia devops docs; do
  git checkout staging
  git checkout -b "$grupo"
  git push -u origin "$grupo"
done

git checkout staging
```

## 4. Ativar branch protection na `main` e na `staging`

No GitHub: **Settings → Branches → Add branch protection rule**, repita para os dois branch name patterns `main` e `staging`:

- Marque **Require a pull request before merging**.
- Marque **Require approvals** (mínimo 1) e **Require review from Code Owners**.
- Marque **Require status checks to pass before merging** e selecione os checks: `Valida commits semanticos`, `Lint - frontend (Next.js)`, `Lint - backend (Python)`, `Lint - agent (Python)`, `Lint - data_ia (Python)`, `Build - frontend (next build)`, `Build - backend (Docker)`, `Build - data_ia (Docker)`.
  - **Não** marque o job `qa-placeholder` como obrigatório ainda — ele existe só para dar visibilidade até QA criar os primeiros testes.
- Marque **Do not allow bypassing the above settings** (inclui admins) para a regra valer para todo mundo.
- Em `main`, considere marcar também **Restrict who can push to matching branches** deixando só você (ou ninguém) — força até você mesmo a subir via PR vindo de `staging`.

## 5. Instalar o ruff (lint Python) localmente, opcional

```bash
pip install ruff
ruff check backend agent data_ia
```

## 6. Próximo passo natural: testes reais

Quando o subgrupo de QA escrever os primeiros testes (ex.: `pytest` para `/health`, para o parser `<PROJETO> <CODIGO> <ILHA>` do agente, ou para o fallback do `predictor.py`), edite `pr-pipeline.yml`:

1. Substitua o conteúdo do job `qa-placeholder` pelos comandos reais (`pytest`, `npm test`, etc.), removendo `continue-on-error: true`.
2. Adicione esse job aos "required status checks" das branches `staging` e `main` (passo 4 acima).
