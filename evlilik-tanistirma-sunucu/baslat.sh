#!/usr/bin/env bash
# Evlilik Tanıştırma Sistemi — birim bilgisayarında başlatma (Linux/macOS)
set -e
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then echo "Node.js bulunamadı. Node.js 22.13 veya üstünü kurun (https://nodejs.org)."; exit 1; fi
MAJOR=$(node -p "process.versions.node.split('.')[0]"); MINOR=$(node -p "process.versions.node.split('.')[1]")
if [ "$MAJOR" -lt 22 ] || { [ "$MAJOR" -eq 22 ] && [ "$MINOR" -lt 13 ]; }; then echo "Node.js $(node -v) çok eski; 22.13 veya üstü gerekli."; exit 1; fi
if [ ! -f .env ]; then
  echo "İlk kurulum yapılmamış. Sihirbaz başlatılıyor..."
  node --disable-warning=ExperimentalWarning cli.js setup
  echo; echo "Şimdi ilk yöneticiyi oluşturun:"
  node --disable-warning=ExperimentalWarning cli.js init-admin
  echo; echo "Birim imza anahtarı üretiliyor (açık anahtarı otoriteye iletin):"
  node --disable-warning=ExperimentalWarning cli.js sign-keygen
  echo; echo "Yukarıda yazan SIGNING_KEY_FILE / AUTHORITY_PUBKEY_FILE / LOCK_PARAMS satırlarını .env dosyasına ekleyin, sonra bu betiği yeniden çalıştırın."
  exit 0
fi
exec node --disable-warning=ExperimentalWarning server.js
