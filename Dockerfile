FROM givt/base-nginx-image

WORKDIR /home/site/wwwroot
COPY ./dist ./
