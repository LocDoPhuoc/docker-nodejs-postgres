FROM node:latest
EXPOSE 80 9229

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm install

CMD ./scripts/start.sh