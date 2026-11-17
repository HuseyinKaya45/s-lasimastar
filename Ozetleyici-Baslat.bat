@echo off
chcp 65001 >nul
echo Ollama tarayici erisimi acik olarak yeniden baslatiliyor...
taskkill /F /IM "ollama app.exe" >nul 2>&1
taskkill /F /IM ollama.exe >nul 2>&1
set OLLAMA_ORIGINS=*
start "Ollama" /min ollama serve
timeout /t 5 >nul
start "" "%~dp0Kitap-Ozetleyici.html"
echo Hazir. Bu pencereyi kapatabilirsiniz (Ollama arka planda calisir).
timeout /t 5 >nul
