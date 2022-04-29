# Assets Frontend
A frontend for [assets API](https://github.com/anmolsekhon590/assetAPI) built using React JS and Tailwind CSS framework.

# Cloning this repo

You can clone this repo by:

```shell
$ git clone https://github.com/anmolsekhon590/assets-frontend
```

Resolve dependencies by running:
```shell
$ npm install
```

# Building
```shell
$ npm run build
```

# Docker
A Dockerfile has been included in this project. To build a Docker image run in root directory:

```shell
$ docker build -t assets_frontend .
```

To create a docker container run:
```shell
$ docker run -d -p 8085:80 --name assets_frontend_instance assets_frontend
``` 

This will create a docker container and map 80 port in the container to port 8085 on the host.

Note: You might need to run docker with sudo privileges