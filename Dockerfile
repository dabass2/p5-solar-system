FROM nginx:alpine

COPY ./dist /usr/share/nginx/html/solar

EXPOSE 80