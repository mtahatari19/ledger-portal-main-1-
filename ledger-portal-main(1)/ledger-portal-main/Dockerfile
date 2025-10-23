ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine AS builder
RUN apk add --no-cache bash jq
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN --mount=type=cache,target=/root/.npm --mount=type=cache,target=/root/.yarn --mount=type=cache,target=/root/.pnpm \
    if [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile; elif [ -f yarn.lock ]; then corepack enable && yarn install --frozen-lockfile --non-interactive; else npm ci --prefer-offline --no-audit --no-fund; fi
COPY . .
ENV NODE_ENV=production CI=true
RUN set -euo pipefail; if jq -e '.scripts.build // empty' package.json >/dev/null 2>&1; then if [ -f pnpm-lock.yaml ]; then corepack enable && pnpm build; elif [ -f yarn.lock ]; then corepack enable && yarn build; else npm run build; fi; else if jq -e '(.dependencies//{} + .devDependencies//{}) | has("@angular/core")' package.json >/dev/null; then npx ng build --configuration production || npx nx build || npm run build; elif jq -e '(.dependencies//{} + .devDependencies//{}) | has("next")' package.json >/dev/null; then npx next build && if jq -e '.scripts | has("export")' package.json >/dev/null 2>&1; then npm run export; fi; elif jq -e '(.dependencies//{} + .devDependencies//{}) | has("vite")' package.json >/dev/null; then npx vite build; elif jq -e '(.dependencies//{} + .devDependencies//{}) | has("react-scripts")' package.json >/dev/null; then npx react-scripts build; else echo "no build script"; exit 1; fi; fi; OUT="build"; if [ -f angular.json ]; then DEFAULT_PROJECT=$(jq -r '.defaultProject // empty' angular.json); if [ -z "$DEFAULT_PROJECT" ] || [ "$DEFAULT_PROJECT" = "null" ]; then DEFAULT_PROJECT=$(jq -r '.projects | keys[0]' angular.json); fi; OUT=$(jq -r --arg p "$DEFAULT_PROJECT" '.projects[$p].architect.build.options.outputPath // .projects[$p].targets.build.options.outputPath // "dist"' angular.json); elif [ -d dist ]; then OUT="dist"; elif [ -d build ]; then OUT="build"; elif [ -d out ]; then OUT="out"; elif [ -d .next ]; then if [ -d out ]; then OUT="out"; else OUT=".next"; fi; fi; echo "$OUT" > /tmp/OUT_DIR
FROM nginx:alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /tmp/OUT_DIR /tmp/OUT_DIR
COPY --from=builder /app /app
RUN OUT="$(cat /tmp/OUT_DIR)"; if [ -d "/app/${OUT}" ]; then rm -rf /usr/share/nginx/html/* && cp -r "/app/${OUT}/." /usr/share/nginx/html/; else exit 1; fi
EXPOSE 80
HEALTHCHECK --interval=15s --timeout=3s --start-period=10s --retries=6 CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
