FROM nginx:mainline-alpine-perl

# COPY index.html /usr/share/nginx/html
# Copy the default extended nginx config files
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the built files
COPY ./dist /usr/share/nginx/html

EXPOSE 80