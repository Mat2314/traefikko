# Dockerfile.traefik

FROM traefik:v2.2

COPY traefik.prod.toml ./etc/traefik/traefik.toml