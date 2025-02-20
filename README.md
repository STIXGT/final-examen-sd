# Mi Aplicación - Proyecto Distribuido

Este proyecto se compone de una aplicación web desarrollada con Next.js, que utiliza Supabase para gestionar la base de datos y autenticación, y se despliega en un entorno orquestado por Kubernetes. Además, se integra Minicuke para pruebas y validación del comportamiento de la aplicación.

## Tecnologías

- **Next.js**: Framework de React para aplicaciones del lado del servidor y generación de sitios estáticos.
- **Supabase**: Plataforma Backend as a Service (BaaS) que proporciona base de datos, autenticación y almacenamiento.
- **Kubernetes**: Sistema de orquestación de contenedores para despliegue, escalado y administración de la aplicación.
- **Minicuke**: Herramienta enfocada en pruebas de integración y validación, que facilita la verificación de escenarios en el entorno distribuido.

## Arquitectura

La aplicación sigue una arquitectura distribuida en la que:

- El frontend se construye con Next.js, ofreciendo una experiencia interactiva y optimizada para SEO.
- Supabase actúa como backend, gestionando los datos y autenticación de usuarios.
- Kubernetes se encarga de desplegar y escalar los diferentes servicios que componen la aplicación.
- Minicuke se integra para ejecutar pruebas automatizadas que aseguran la integridad del sistema durante cambios y despliegues.

## Despliegue

1. **Configuración del entorno**  
   Asegúrate de tener configuradas las herramientas necesarias:

   - Node.js y npm para Next.js.
   - Acceso a una instancia de Supabase.
   - Kubernetes configurado (minikube o un clúster en la nube).
   - Minicuke instalado para pruebas automatizadas.

2. **Construcción y Despliegue**

   - Desarrolla y prueba la aplicación localmente con Next.js utilizando:
     > npm run dev
   - Configura el CI/CD para integrar los despliegues en Kubernetes.
   - Para desplegar en Kubernetes, puedes usar comandos como:
     > kubectl apply -f deployment.yaml  
     > kubectl apply -f service.yaml
   - Ejecuta las pruebas con Minicuke para validar la integridad de la aplicación antes de despliegues en producción.

3. **Ejemplo de Archivo YAML para Despliegue**

   A continuación se muestra un ejemplo básico de un archivo YAML para desplegar la aplicación en Kubernetes:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: mi-aplicacion-deployment
     labels:
       app: mi-aplicacion
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: mi-aplicacion
     template:
       metadata:
         labels:
           app: mi-aplicacion
       spec:
         containers:
           - name: mi-aplicacion
             image: mi-aplicacion:latest
             ports:
               - containerPort: 3000

   ```

   Y un ejemplo de archivo YAML para el servicio:

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: mi-aplicacion-service
   spec:
     selector:
       app: mi-aplicacion
     ports:
       - protocol: TCP
         port: 80
         targetPort: 3000
     type: LoadBalancer
   ```

4. **Monitoreo y Escalabilidad**
   - Utiliza las herramientas de monitoreo de Kubernetes para observar el rendimiento y el estado de la aplicación.
   - Ajusta la configuración del escalado automático en Kubernetes según la demanda.

## Imagenes del despliegue
### 1. 
![image](https://github.com/user-attachments/assets/3de092ad-1f0e-454b-b429-bddf5d9bbdb9)
### 2.
![image](https://github.com/user-attachments/assets/d310f2e7-90e5-4206-ad34-ba2e03acb27d)
### 3.
![image](https://github.com/user-attachments/assets/f126ea9d-4c36-46a0-965d-df3ff82ece4d)
### 4.
![image](https://github.com/user-attachments/assets/9ba0c49c-fc7a-4d9a-950f-221103f22612)

