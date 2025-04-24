# Chuck Citations API

Une application simple express pour notre application chuck-citations

## Commandes

```bash
# Builder l'image de production
docker build -t chuck-citations-api .

# Lancer l'application
docker run \
-p 3000:3000 \
-e PGUSER=<user> \
-e PGPASSWORD=<password> \
-e PGHOST=<host> \
-e PGDATABASE=<database> \
-e PGPORT=<port> \
 chuck-citations-api

# Uploader l'image sur le registry
docker tag chuck-citations-api <registry>/chuck-citations-api
docker push <registry>/chuck-citations-api
```
