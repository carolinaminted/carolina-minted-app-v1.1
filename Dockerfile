FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY index.html index.tsx collector-home.tsx collector-home.css en.json tsconfig.json vite.config.ts ./
RUN npx --no-install tsc --noEmit && npm run build

FROM nginx:stable-alpine
ENV PORT=8080
ENV NGINX_ENVSUBST_FILTER=^PORT$
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
