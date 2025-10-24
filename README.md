## 💫 시작 가이드
- 노드 설치(.nvmrc 파일에 지정된 버전 설치)
  ```
  nvm use
  ```
- [PNPM](https://pnpm.io/installation) 설치하기
  ```
  npm i -g pnpm
  ```
- pnpm 설치
  ```
  pnpm install
  ```
- 실행할 프로젝트로 이동 후 로컬 개발 서버 실행하기
  ex) Red-Platform-Manager로 이동하기
    ```
    cd apps/Red-Platform-Manager
    ```
  - 로컬 개발 서버 실행
    ```
    pnpm dev
    ```
  
## ✨ 배포 가이드
- 빌드할 프로젝트로 이동 후 `build`
  - 빌드 명령어는 해당 프로젝트의 `package.json` 파일 확인 
  ```
  cd apps/이동할 프로젝트
  해당 프로젝트의 빌드 명령어(ex. pnpm build:prod) 
  ```

- 배포할 파일 확인후 폴더 만들기(터미너스에서 hosts 연결 후 sftp에서 확인할 수 있음)
  ![image](https://github.com/user-attachments/assets/bd94ae1e-9b8c-427e-bc2f-1017938fdda9)

  - ex) Platform-Backoffice 프로젝트 배포를 위해 필요한 Platform-Backoffice.tar에 필요한 파일들
    - 터미너스에서 내 컴퓨터로 끌어와서 압축 풀고 어떤 파일들이 있는지 확인하면 됨
    - package.json
    - packages
    - pnpm-lock.yaml
    - pnpm-workspace.yaml
    - apps
      - Red-Platform-Manager - package.json, next.config.js
      - Red-EditReq-Manager - package.json, next.config.js
    - turbo.json
    - ecosystem.config.js
  
- 만든 파일 압축하기
  ```
  tar -cvf 압축할 폴더명
  ```
- 서버 실행하기
  ```
  ssp -i pem키가 저장된 경로 원격 서버에서 사용할 사용자 이름@localhost -p 로컬포트넘버
  
  ex) ssh -i /Users/gim-yuan/Desktop/key/prd-redprinting-apne2-key.pem ec2-user@localhost -p 5003
  ```
- 서버에 접속해서 압축을 해제하려는 파일이 기존에 있는지 확인
  ```
  pm2 ls
  ```
  -❓만약 압축할 파일이 이미 있다면 삭제하기
    ```
    rm -rf 삭제할 파일들

    ex) rm -rf RedPlatformManager.tar RedPlatformManager
    ```
- 만든 파일 서버로 전송
  ```
  cd 만든 파일이 있는 상위폴더
  scp -i pem키가 저장된 경로 -P 로컬포트넘버 압축한 폴더명.tar 원격 서버에서 사용할 사용자 이름@localhost:원격 서버에서 파일을 전송할 경로

  ex) scp -i ~gim-yuan/Desktop/key/prd-redprinting-apne2-key.pem -P 5003  RedPlatformManager.tar ec2-user@localhost:/home/ec2-user
  ```
- 실행된 서버에서 파일 압축해제
  ```
  tar -xvf 압축을 풀 대상이 되는 파일  압축 파일에서 해제하려는 폴더명

  ex) tar -xvf RedPlatformManager.tar RedPlatformManager
  ```
- 압축해제한 파일로 이동(배포할 때 필요한 파일로 이동)
  ```
  cd 압축해제한 파일로 이동

  ex) cd RedPlatformManager
  ```      
- Node 버전 확인후 다르다면 맞추기 (노드 버전이 다를 때만 하면 됨)
  ```
  nvm use 설치할 버전

  ex) nvm use 20.10.0
  ```
- 패키지 매니저 설치하기
  ```
  pnpm install
  ```
- 실행 중인 애플리케이션 재시작
  ```
  pm2 restart 포트번호
  ``` 
- ❓만약 재시작했는데 에러가 뜬다면 삭제
  ```
  pm2 delete 포트번호
  ```
- `ecosystem.config.js`에 정의된 설정을 기반으로 pm2 애플리케이션 재시작
  ```
  pm2 start ecosystem.config.js
  ```
- 새로운 포트번호에서 애플리케이션 재시작
  ```
  pm2 restart 새로운 포트번호
  ```
  
