# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies using package‑lock for reproducibility
COPY frontend/package*.json ./
RUN npm ci

# Copy source code
COPY frontend/ ./

# Inject the API URL at build time (Vite reads VITE_*)
ARG VITE_API_ROOT
ENV VITE_API_ROOT=${VITE_API_ROOT}
RUN npm run build

# ---------- Runtime stage (nginx) ----------
FROM nginx:alpine

# Remove the default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy the built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Minimal nginx config that serves the SPA and adds aggressive caching
COPY <<'NGINX_CONF' /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # SPA fallback – always serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets aggressively
    location ~* \.(js|css|png|jpg|jpeg|svg|gif|ico|ttf|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
NGINX_CONF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]