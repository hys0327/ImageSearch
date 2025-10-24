tar -xvf Platform-BackOffice.tar
cd Platform-BackOffice
source $NVM_DIR/nvm.sh;
nvm use v20.10.0
pnpm install

if grep -q "Red-Platform-Manager" ecosystem.config.js; then
  pm2 restart Red-Platform-Manager || pm2 start ecosystem.config.js --only Red-Platform-Manager --update-env
fi

if grep -q "Red-EditReq-Manager" ecosystem.config.js; then
  pm2 restart Red-EditReq-Manager || pm2 start ecosystem.config.js --only Red-EditReq-Manager --update-env
fi

rm -rf ../Platform-BackOffice.tar