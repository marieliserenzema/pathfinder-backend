FROM mongo:5.0
LABEL author="ayriko"

ARG DATABASE_URI
ENV DATABASE_URI ${DATABASE_URI}

COPY filtered_hikes_epsg.json /filtered_hikes_epsg.json
COPY admin.json /admin.json

CMD mongoimport --uri ${DATABASE_URI} --collection hikes --jsonArray --drop --file /filtered_hikes_epsg.json && \
    mongoimport --uri ${DATABASE_URI} --collection users --jsonArray --drop --file /admin.json
