# Inicio de sesion

```ts
// HTTP POST
// Url: /login

// Frontend envia el correo del usuario
{
    correo_usuario: string
}

// Backend responde con una lista de matriculas 
//  Si el correo es valido y el usuario tiene alguna matricula
{
    matriculas: Array<number>  // Un array de id_laboratorio
}
//  Si el correo es valido pero el usuario no tiene matriculas
{
    matriculas: []  // Un array vacio
}
//  Si el correo es invalido: Se envia HTTP 401
```





# Lista cursos

```ts
// HTTP GET
// Url: /cursos

// El frontend pide una lista de la informacion de todos los cursos

// Backend responde con una lista de todos los cursos
[
    {
        id_curso: number,
        id_datos_carrera: any, // Opcional
        nombre_curso: string,
        curso_anio: number | string, // Numero o string, dependiendo de como este en DB
        abreviado: string,
    }
]
```





# Carga de horarios

```ts
// HTTP GET
// Url: /horarios?cursos=...

// El frontend envia una lista de cursos, de los cuales recuperar sus datos
{
    cursos: Array<number> // Un array de id_curso
}

// Backend responde con los cursos especificados y sus horarios
[
    // Cada objeto dentro del array sera un Curso
    {
        id_curso: number,
        id_datos_carrera: any, // Opcional
        nombre_curso: string,
        curso_anio: number | string,
        abreviado: string,
        // Un array de objetos, estos objetos son de la entidad Laboratorio
        laboratorios: [
            {
                id_laboratorio: number,
                id_curso: number,
                id_horario: number,
                grupo: string,
                docente: string,
                // Array de objetos de la entidad Horario
                horario: [
                    {
                        id_horario: number,
                        dia: string,
                        hora_inicio: string,
                        hora_fin: string,
                    }
                ]
            }
        ]
    }
]

```




# Matricula

```ts
// HTTP POST
// Url: /matricula

// Frontend envia una lista de horarios en los cuales se matricula y el usuario
{
    correo_usuario: string,  // Correo del usuario
    horarios: Array<number>  // Array de id_laboratorio
}

// Backend devuelve HTTP 200 si exitoso, HTTP 400 si hay error (no hay cupos)
```





# Recuperacion de matricula

```ts
// HTTP POST
// Url: /recuperacion

// Frontend envia una lista de id_laboratorio
{
    matriculas: Array<number>  // Array de id_laboratorio
}

// Backend devuelve:
//  Por cada id_laboratorio: datos del curso y el laboratorio 
[
    // Un objeto asi por cada id_laboratorio
    {
        nombre_curso: string, // Este es el campo `nombre_curso` de la entidad Curso
        grupo: string,  // Campo `grupo` de la entidad Laboratorio
        docente: string,  // Campo `docente` de la entidad Laboratorio
    }
]
```





# Creacion de datos

Endpoints para insertar datos a la db

```ts
// POST  /crear-carrera

// Front
{
    nombre_carrera: string
}

// Backend
{
    id_carrera: number // id de la carrera creada
}
```

```ts
// POST  /crear-curso

// Front
{
    id_datos_carrera: number,
    nombre_curso: string,
    curso_anio: string,   // Ejm: "1er", "2do", etc
    abreviado: string
}

// Backend
{
    id_curso: number // id del curso creado
}
```

```ts
// POST  /crear-laboratorio

// Front
{
    id_curso: number,
    grupo: string, // Una letra
    docente: string,
    max_estudiantes: number
}

// Backend
{
    id_laboratorio: number // id del lab creado
}
```

```ts
// POST  /crear-horario

// Front
{
    id_laboratorio: number,
    dia: string,  // "Lunes", "Martes", etc
    hora_inicio: string,  // "07:00"
    hora_fin: string,  // "08:50"
}

// Backend
{
    id_horario: number // id del horario creado
}
```





