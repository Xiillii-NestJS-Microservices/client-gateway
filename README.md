# Client Gateway

## DEV

1. Clonar el repositorio
1. Instalar dependencias
1. Crear un archivo .env basado en el `env.template`
1. Levantar el servidor de NATS

```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```

1. Ejecutar `npm run start:dev` para levantar la aplicación
