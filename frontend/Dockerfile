FROM nginx:alpine

# Copie l'intégralité du contenu du dossier ./frontend de votre machine
# vers le répertoire de service de Nginx à l'intérieur du conteneur.
COPY . /usr/share/nginx/html/
# Dans frontend/Dockerfile
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Expose le port par défaut de Nginx (80)
EXPOSE 80

# Commande par défaut : Démarre Nginx en premier plan.
CMD ["nginx", "-g", "daemon off;"]