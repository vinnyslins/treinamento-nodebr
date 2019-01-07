sudo docker run \
  --name postgres \
  -p 5432:5432 \
  -e POSTGRES_USER=vinnyslins \
  -e POSTGRES_PASSWORD=my-secret-pw \
  -e POSTGRES_DB=heroes \
  -d \
  postgres

sudo docker run \
  --name adminer \
  -p 8080:8080 \
  --link postgres:postgres \
  -d \
  adminer

sudo docker run \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin \
  -d \
  mongo:4

sudo docker run \
  --name mongoclient \
  -p 3000:3000 \
  --link mongodb:mongodb \
  -d \
  mongoclient/mongoclient

sudo docker exec -it mongodb \
  mongo --host localhost -u admin -p admin --authenticationDatabase admin \
  --eval "db.getSiblingDB('heroes').createUser({ user: 'vinnyslins', pwd: 'my-secret-pw', roles: [{ role: 'readWrite', db: 'heroes' }] })"

sudo docker ps
sudo docker exec -it postgres /bin/bash
