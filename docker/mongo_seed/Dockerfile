FROM mongo:5.0
LABEL author="ayriko"

ARG DATABASE_URI
ENV DATABASE_URI ${DATABASE_URI}

COPY filtered_hikes.json /filtered_hikes.json

CMD mongoimport --uri ${DATABASE_URI} --collection pathfinder --jsonArray --drop --file /filtered_hikes.json