# Evlilik Tanıştırma Sistemi — konteyner imajı (bağımlılıksız; yalnız Node.js 22)
# Not: bu Dockerfile bu çalışma ortamında derlenip denenmemiştir; kendi ortamınızda doğrulayın.
FROM node:22-alpine
ENV NODE_ENV=production DATA_DIR=/data HOST=0.0.0.0 PORT=8080 TRUST_PROXY=1
WORKDIR /app
COPY package.json server.js cli.js authority.js authority-server.js ./
COPY lib ./lib
COPY public ./public
COPY public-authority ./public-authority
# Root olmayan kullanıcı; veri birimi yalnız bu kullanıcıya açık
RUN addgroup -S ets && adduser -S ets -G ets && mkdir /data && chown ets:ets /data && chmod 700 /data
USER ets
VOLUME ["/data"]
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
# DATA_KEYS ve DATA_KEY_ID çalıştırma sırasında (secret olarak) verilmelidir; imaja gömmeyin.
CMD ["node", "--disable-warning=ExperimentalWarning", "server.js"]
