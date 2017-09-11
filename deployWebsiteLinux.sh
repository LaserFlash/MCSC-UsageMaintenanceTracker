rm -R dist
ng build --prod --aot --base-href "https://laserflash.github.io/U23-Reports/"
npm run precache
sudo ngh
