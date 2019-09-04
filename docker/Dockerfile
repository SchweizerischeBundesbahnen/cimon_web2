# Dockerfile for ESTA Web
FROM PATH_TO_NGINX_IMAGE
MAINTAINER Reto Lehmann <reto.lehmann@sbb.ch>

# Download sources from Repository
ADD "PATH_TO_ARTIFACTORY_TAR.GZ" cimon-web.tar.gz

# Extract and move to nginx html folder
RUN tar -xzf cimon-web.tar.gz
RUN mv dist/* /usr/share/nginx/html

# Start nginx via script, which replaces static urls with environment variables
ADD start.sh /usr/share/nginx/start.sh
RUN chmod +x /usr/share/nginx/start.sh

# Fix permissions for runtime
RUN chmod 777 /var/log/nginx /usr/share/nginx/html

CMD /usr/share/nginx/start.sh
