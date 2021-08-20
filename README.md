# Horarios UNSA

Horarios UNSA es una página que permite a los alumnos de la Universidad Nacional de San Agustin
crear fácilmente sus horarios, sin que se crucen horas.

https://horarios.araozu.dev

## Configuración

Requisitos:

- Node.js LTS
- pnpm, npm o yarn
- Conocimientos de pnpm/npm/yarn, TypeScript, JSX, Solid.js y Aphrodite css

Instalación:

- Clonar el repositorio
- Instalar dependencias
- Ejecutar script `start` para ejecutar el servidor, o `build` para compilarlo

## Arquitectura

## Formato de horarios

La información de los horarios se almacena en public/horarios/ en formato YAML.

El formato es el siguiente:

```ts
interface DatosCarrera {
    titulo: string,
    // Contiene información adicional del horario
    descripcion: string,
    // Fecha de creación del horario en formato YYYYMMDD
    version: number,
    // Datos de los años de las carreras
    años: {
        // key es el nombre del año: 1er año, 2do año, etc
        [key: string]: {
            // nombre es el nombre del curso.
            // Este nombre es referencial, no se muestra
            // en el programa
            [nombre: string]: Curso,
        },
    },
}

interface Curso {
    // Nombre completo del curso
    nombre: string,
    // Nombre del curso abreviado
    abreviado: string,
    // Información de las horas de teoria
    Teoria: {
        // grupo es una letra: A, B, C, D
        [grupo: string]: DatosGrupo,
    },
    // Información de las horas de laboratorio
    Laboratorio?: {
        // grupo es una letra: A, B, C, D
        [grupo: string]: DatosGrupo,
    },
}

interface DatosGrupo {
    // Nombre del docente de este grupo
    Docente: string,
    /*
        Las horas del curso en el siguiente formato: DD_HHMM
        DD puede ser Lu, Ma, Mi, Ju, Vi
        Ejm: Ma0850, Vi1640, Ju1550
    */
    Horas: string[]
}
```

## Versiones anteriores

Con Vue.js (legacy): 
- [Página web](https://horarios-legacy.araozu.dev)
- [Repositorio](https://github.com/Araozu/horarios-unsa/)

Con JavaScript puro (descontinuado):
- [Página web](http://unsasystem.atwebpages.com/)
