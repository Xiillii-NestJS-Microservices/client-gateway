# Client Gateway

## DEV

1. Clonar el repositorio
2. Instalar dependencias
3. Crear un archivo .env basado en el `env.template`
4. Ejecutar `npm run start:dev` para levantar la aplicación

## Nats

```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```
