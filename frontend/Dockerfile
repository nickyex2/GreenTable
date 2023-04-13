# set working directory
FROM node:16.15.1 as build
WORKDIR /app
ENV REACT_APP_GOOGLE_MAPS_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
FROM nginx:1.19
COPY ./nginx.conf /etc/nginx/nginx.conf
ENV REACT_APP_GOOGLE_MAPS_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
COPY --from=build /app/build /usr/share/nginx/html
