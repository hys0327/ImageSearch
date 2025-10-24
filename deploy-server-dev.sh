tar -xvf Platform-BackOffice.tar
cd Dev-Platform-BackOffice
source $NVM_DIR/nvm.sh;
nvm use v20.10.0
pnpm install

if grep -q "Dev-Platform-Manager" ecosystem.config.js; then
  pm2 restart Dev-Platform-Manager || pm2 start ecosystem.config.js --only Dev-Platform-Manager --update-env
fi

if grep -q "Dev-EditReq-Manager" ecosystem.config.js; then
  pm2 restart Dev-EditReq-Manager || pm2 start ecosystem.config.js --only Dev-EditReq-Manager --update-env
fi

rm -rf ../Platform-BackOffice.tar