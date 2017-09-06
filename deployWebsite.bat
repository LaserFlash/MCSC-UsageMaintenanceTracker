call rm -R dist
call ng build --prod --aot --base-href "https://laserflash.github.io/U23-Reports/"
call npm run precache
call ngh
