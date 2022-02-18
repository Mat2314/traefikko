# Dockerfile.traefik

FROM traefik:v2.2

# When in dev mode
COPY traefik.dev.toml ./etc/traefik/traefik.toml