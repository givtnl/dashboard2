FROM nginx:mainline-alpine-perl

# COPY index.html /usr/share/nginx/html
# Copy the default extended nginx config files
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf

# Copy the built files
COPY ./dist /usr/share/nginx/html

EXPOSE 80