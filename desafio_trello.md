# Consignas

### **Desafío: Crear una aplicación tipo Trello con Redux y React 16 (clases)**

#### **Objetivo**

Construir una aplicación web que permita a los usuarios gestionar tableros, listas, tarjetas de tareas y manejar usuarios de forma interactiva. Basar el desarrollo en Trello.

#### **Requisitos Funcionales**

1. **Gestión de usuarios**:

   - Crear (alta) usuarios con nombre y correo electrónico.
   - Listar los usuarios existentes.
   - Editar (modificar) los datos de un usuario.
   - Eliminar (baja) usuarios.
   - Asignar usuarios a tableros específicos.

2. **Gestión de tableros**:

   - Crear un nuevo tablero con un nombre.
   - Listar los tableros disponibles.
   - Eliminar tableros existentes.
   - Mostrar los usuarios asignados a cada tablero.

3. **Gestión de listas**:

   - Dentro de un tablero, agregar listas con títulos.
   - Reordenar listas mediante arrastrar y soltar (drag-and-drop).
   - Eliminar listas.

4. **Gestión de tarjetas**:

   - Agregar tarjetas con un título a cualquier lista.
   - Editar el contenido de una tarjeta.
   - Mover tarjetas entre listas mediante arrastrar y soltar.
   - Eliminar tarjetas.

5. **Persistencia temporal**:

   - Almacenar los datos en el estado global manejado por Redux.

6. **Interfaz de usuario**:
   - Barra de navegación con el nombre de la aplicación y acceso al ABM de usuarios.
   - Vista principal mostrando los tableros.
   - Dentro de cada tablero, vista de las listas y tarjetas.
   - Una vista adicional para gestionar usuarios (CRUD).

#### **Tecnologías y Requisitos Técnicos**

- React 16 (Componentes basados en clases).
- Redux para manejar el estado global.
- Librería para drag-and-drop, como `react-beautiful-dnd` (opcional).
- Manejo de formularios para alta y modificación de usuarios (puedes usar componentes controlados).

#### **Duración estimada**

Maximo 5 días laborales, con 6 horas diarias de trabajo.

#### **Entrega**

- Código del proyecto (repositorio GitHub).
- Instrucciones para ejecutar la aplicación.
- Un breve video (opcional) explicando el funcionamiento de la aplicación.
