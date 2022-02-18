# traefikko

## Deployment checklist

- Set environmental variables in .env files in root catalogue and django project catalogue
- Set environmental variables for frontend - src/evironment/environment.prod.ts
- Set traefik.prod.toml file properties to generate certificate
- Create proper networks and volumes

```shell
docker network create traefik_webgateway
docker network create private

docker volume create traefikko_postgres
docker volume createa traefik-public-certificates
```
