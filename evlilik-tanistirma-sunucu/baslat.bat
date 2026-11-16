@echo off
REM Evlilik Tanistirma Sistemi - birim bilgisayarinda baslatma (Windows)
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js bulunamadi. Node.js 22.13 veya ustunu kurun: https://nodejs.org
  pause
  exit /b 1
)
node -e "const [a,b]=process.versions.node.split('.').map(Number);process.exit(a>22||(a===22&&b>=13)?0:1)"
if errorlevel 1 (
  echo Node.js surumu cok eski; 22.13 veya ustu gerekli.
  pause
  exit /b 1
)
if not exist .env (
  echo Ilk kurulum yapilmamis. Sihirbaz baslatiliyor...
  node --disable-warning=ExperimentalWarning cli.js setup
  echo.
  echo Simdi ilk yoneticiyi olusturun:
  node --disable-warning=ExperimentalWarning cli.js init-admin
  echo.
  echo Birim imza anahtari uretiliyor (acik anahtari otoriteye iletin):
  node --disable-warning=ExperimentalWarning cli.js sign-keygen
  echo.
  echo Yukarida yazan SIGNING_KEY_FILE / AUTHORITY_PUBKEY_FILE / LOCK_PARAMS satirlarini .env dosyasina ekleyin, sonra bu dosyayi yeniden calistirin.
  pause
  exit /b 0
)
node --disable-warning=ExperimentalWarning server.js
pause
