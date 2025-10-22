{ pkgs, ... }: {
  # Entorno de desarrollo para VetiSync
  # Este archivo define los paquetes y servicios disponibles en tu workspace.

  # Canales de Nix que usa el entorno.
  channel = "stable-23.11";

  # Paquetes de Nix disponibles en el entorno.
  packages = [
    pkgs.nodejs_20 # Node.js 20 para el backend y el frontend
  ];

  # Servicios de NixOS que se ejecutan en segundo plano.
  services.mongodb.enable = false;

  # Variables de entorno para el workspace.
  env = {};

  # Exponer puertos a la máquina local para que el navegador pueda acceder a ellos.
  ports = {
    # Puerto para la aplicación de frontend (Next.js)
    client = {
      port = 3000;
      onOpen = "open"; # Abrir automáticamente en una pestaña del navegador
    };
    # Puerto para el servidor de backend (Node.js)
    server = {
      port = 5000;
      onOpen = "ignore"; # No hacer nada al abrir
    };
  };
}
