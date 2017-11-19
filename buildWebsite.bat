call rmdir /S /Q dist
call ng build --prod --aot
call npm run precache
