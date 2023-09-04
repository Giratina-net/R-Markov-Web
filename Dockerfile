FROM nginx:1.25.2
COPY www /var/www/html
COPY default.conf /etc/nginx/conf.d/default.conf