FROM mongo:5.0
LABEL author="ayriko"

ARG DATABASE_URI
ENV DATABASE_URI ${DATABASE_URI}

COPY filtered_hikes_epsg.json /filtered_hikes_epsg.json

CMD mongoimport --uri ${DATABASE_URI} --collection hikes --jsonArray --drop --file /filtered_hikes_epsg.json