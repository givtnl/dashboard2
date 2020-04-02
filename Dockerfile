FROM trion/ng-cli

ARG CONFIGURATION=""

RUN mkdir -p /app
COPY ./ /app

WORKDIR /app
RUN npm install \
    && ng build --configuration $CONFIGURATION 

FROM givt/base-nginx-image

WORKDIR /home/site/wwwroot
COPY --from=0 /app/dist ./
