
        const firebaseConfig = {
          apiKey: "AIzaSyBlYeqZuD9vIOb8INu-1UQjexF0iMj6RPA",
          authDomain: "chrononote-1wdcs.firebaseapp.com",
          projectId: "chrononote-1wdcs",
          storageBucket: "chrononote-1wdcs.firebasestorage.app",
          messagingSenderId: "780510215684",
          appId: "1:780510215684:web:6b18cb274fc1078af3ff51"
        };
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

        const DB = {
        "schedule": [
                {
                        "SEMANA": "1",
                        "FECHAS": "10/8 al 14/8",
                        "TSAS 1C": "SALÓN PB",
                        "TSAS 2C": "",
                        "TSAS 3C": "",
                        "TSAS 4C": "",
                        "TSAS 5C": "",
                        "TSCDIA 1C": "",
                        "TSCDIA 2C": "",
                        "TSCDIA 3C": "201 2° Piso",
                        "TSCDIA 4C": "",
                        "TSCDIA 5C": "",
                        "TSDS 1C": "",
                        "TSDS 2C": "",
                        "TSDS 3C": "",
                        "TSDS 4C": "",
                        "TSDS 5C": "202 2° Piso"
                },
                {
                        "SEMANA": "2",
                        "FECHAS": "17/8 al 21/8",
                        "TSAS 1C": "",
                        "TSAS 2C": "",
                        "TSAS 3C": "",
                        "TSAS 4C": "",
                        "TSAS 5C": "",
                        "TSCDIA 1C": "",
                        "TSCDIA 2C": "",
                        "TSCDIA 3C": "",
                        "TSCDIA 4C": "",
                        "TSCDIA 5C": "202 2° Piso",
                        "TSDS 1C": "SALÓN PB",
                        "TSDS 2C": "",
                        "TSDS 3C": "201 2° Piso",
                        "TSDS 4C": "",
                        "TSDS 5C": ""
                },
                {
                        "SEMANA": "3",
                        "FECHAS": "24/8 al 28/8",
                        "TSAS 1C": "",
                        "TSAS 2C": "",
                        "TSAS 3C": "",
                        "TSAS 4C": "202 2° Piso",
                        "TSAS 5C": "",
                        "TSCDIA 1C": "SALÓN PB",
                        "TSCDIA 2C": "",
                        "TSCDIA 3C": "",
                        "TSCDIA 4C": "",
                        "TSCDIA 5C": "",
                        "TSDS 1C": "",
                        "TSDS 2C": "",
                        "TSDS 3C": "",
                        "TSDS 4C": "201 2° Piso",
                        "TSDS 5C": ""
                },
                {
                        "SEMANA": "4",
                        "FECHAS": "31/8 al 4/9",
                        "TSAS 1C": "",
                        "TSAS 2C": "SALÓN PB",
                        "TSAS 3C": "",
                        "TSAS 4C": "",
                        "TSAS 5C": "201 2° Piso",
                        "TSCDIA 1C": "",
                        "TSCDIA 2C": "",
                        "TSCDIA 3C": "",
                        "TSCDIA 4C": "",
                        "TSCDIA 5C": "",
                        "TSDS 1C": "",
                        "TSDS 2C": "",
                        "TSDS 3C": "",
                        "TSDS 4C": "",
                        "TSDS 5C": ""
                },
                {
                        "SEMANA": "5",
                        "FECHAS": "7/9 al 11/9",
                        "TSAS 1C": "",
                        "TSAS 2C": "",
                        "TSAS 3C": "",
                        "TSAS 4C": "",
                        "TSAS 5C": "",
                        "TSCDIA 1C": "",
                        "TSCDIA 2C": "SALÓN PB",
                        "TSCDIA 3C": "",
                        "TSCDIA 4C": "201 2° Piso",
                        "TSCDIA 5C": "",
                        "TSDS 1C": "",
                        "TSDS 2C": "",
                        "TSDS 3C": "",
                        "TSDS 4C": "",
                        "TSDS 5C": ""
                },
                {
                        "SEMANA": "6",
                        "FECHAS": "14/9 al 18/9",
                        "TSAS 1C": "",
                        "TSAS 2C": "",
                        "TSAS 3C": "201 2° Piso",
                        "TSAS 4C": "",
                        "TSAS 5C": "",
                        "TSCDIA 1C": "",
                        "TSCDIA 2C": "",
                        "TSCDIA 3C": "",
                        "TSCDIA 4C": "",
                        "TSCDIA 5C": "",
                        "TSDS 1C": "",
                        "TSDS 2C": "SALÓN PB",
                        "TSDS 3C": "",
                        "TSDS 4C": "",
                        "TSDS 5C": ""
                },
                {
                        "SEMANA": "7",
                        "FECHAS": "21/9 al 25/9",
                        "TSAS 1C": "Disp. Docente",
                        "TSAS 2C": "Disp. Docente",
                        "TSAS 3C": "Disp. Docente",
                        "TSAS 4C": "Disp. Docente",
                        "TSAS 5C": "Disp. Docente",
                        "TSCDIA 1C": "Disp. Docente",
                        "TSCDIA 2C": "Disp. Docente",
                        "TSCDIA 3C": "Disp. Docente",
                        "TSCDIA 4C": "Disp. Docente",
                        "TSCDIA 5C": "Disp. Docente",
                        "TSDS 1C": "Disp. Docente",
                        "TSDS 2C": "Disp. Docente",
                        "TSDS 3C": "Disp. Docente",
                        "TSDS 4C": "Disp. Docente",
                        "TSDS 5C": "Disp. Docente"
                },
                {
                        "SEMANA": "8",
                        "FECHAS": "28/9 al 2/10",
                        "TSAS 1C": "Disp. Docente",
                        "TSAS 2C": "Disp. Docente",
                        "TSAS 3C": "Disp. Docente",
                        "TSAS 4C": "Disp. Docente",
                        "TSAS 5C": "Disp. Docente",
                        "TSCDIA 1C": "Disp. Docente",
                        "TSCDIA 2C": "Disp. Docente",
                        "TSCDIA 3C": "Disp. Docente",
                        "TSCDIA 4C": "Disp. Docente",
                        "TSCDIA 5C": "Disp. Docente",
                        "TSDS 1C": "Disp. Docente",
                        "TSDS 2C": "Disp. Docente",
                        "TSDS 3C": "Disp. Docente",
                        "TSDS 4C": "Disp. Docente",
                        "TSDS 5C": "Disp. Docente"
                },
                {
                        "SEMANA": "9",
                        "FECHAS": "5/10 al 9/10",
                        "TSAS 1C": "SALÓN PB",
                        "TSAS 2C": "",
                        "TSAS 3C": "",
                        "TSAS 4C": "",
                        "TSAS 5C": "",
                        "TSCDIA 1C": "",
                        "TSCDIA 2C": "",
                        "TSCDIA 3C": "201 2° Piso",
                        "TSCDIA 4C": "",
                        "TSCDIA 5C": "",
                        "TSDS 1C": "",
                        "TSDS 2C": "",
                        "TSDS 3C": "",
                        "TSDS 4C": "",
                        "TSDS 5C": "202 2° Piso"
                },
                {
                        "SEMANA": "10",
                        "FECHAS": "12/10 al 16/10",
                        "TSAS 1C": "",
                        "TSAS 2C": "",
                        "TSAS 3C": "",
                        "TSAS 4C": "",
                        "TSAS 5C": "",
                        "TSCDIA 1C": "",
                        "TSCDIA 2C": "",
                        "TSCDIA 3C": "",
                        "TSCDIA 4C": "",
                        "TSCDIA 5C": "202 2° Piso",
                        "TSDS 1C": "SALÓN PB",
                        "TSDS 2C": "",
                        "TSDS 3C": "201 2° Piso",
                        "TSDS 4C": "",
                        "TSDS 5C": ""
                },
                {
                        "SEMANA": "11",
                        "FECHAS": "19/10 al 23/10",
                        "TSAS 1C": "",
                        "TSAS 2C": "",
                        "TSAS 3C": "",
                        "TSAS 4C": "202 2° Piso",
                        "TSAS 5C": "",
                        "TSCDIA 1C": "SALÓN PB",
                        "TSCDIA 2C": "",
                        "TSCDIA 3C": "",
                        "TSCDIA 4C": "",
                        "TSCDIA 5C": "",
                        "TSDS 1C": "",
                        "TSDS 2C": "",
                        "TSDS 3C": "",
                        "TSDS 4C": "201 2° Piso",
                        "TSDS 5C": ""
                },
                {
                        "SEMANA": "12",
                        "FECHAS": "26/10 al 30/10",
                        "TSAS 1C": "",
                        "TSAS 2C": "SALÓN PB",
                        "TSAS 3C": "",
                        "TSAS 4C": "",
                        "TSAS 5C": "201 2° Piso",
                        "TSCDIA 1C": "",
                        "TSCDIA 2C": "",
                        "TSCDIA 3C": "",
                        "TSCDIA 4C": "",
                        "TSCDIA 5C": "",
                        "TSDS 1C": "",
                        "TSDS 2C": "",
                        "TSDS 3C": "",
                        "TSDS 4C": "",
                        "TSDS 5C": ""
                },
                {
                        "SEMANA": "13",
                        "FECHAS": "2/11 al 6/11",
                        "TSAS 1C": "",
                        "TSAS 2C": "",
                        "TSAS 3C": "",
                        "TSAS 4C": "",
                        "TSAS 5C": "",
                        "TSCDIA 1C": "",
                        "TSCDIA 2C": "SALÓN PB",
                        "TSCDIA 3C": "",
                        "TSCDIA 4C": "201 2° Piso",
                        "TSCDIA 5C": "",
                        "TSDS 1C": "",
                        "TSDS 2C": "",
                        "TSDS 3C": "",
                        "TSDS 4C": "",
                        "TSDS 5C": ""
                },
                {
                        "SEMANA": "14",
                        "FECHAS": "9/11 al 13/11",
                        "TSAS 1C": "",
                        "TSAS 2C": "",
                        "TSAS 3C": "201 2° Piso",
                        "TSAS 4C": "",
                        "TSAS 5C": "",
                        "TSCDIA 1C": "",
                        "TSCDIA 2C": "",
                        "TSCDIA 3C": "",
                        "TSCDIA 4C": "",
                        "TSCDIA 5C": "",
                        "TSDS 1C": "",
                        "TSDS 2C": "SALÓN PB",
                        "TSDS 3C": "",
                        "TSDS 4C": "",
                        "TSDS 5C": ""
                },
                {
                        "SEMANA": "15",
                        "FECHAS": "16/11 al 20/11",
                        "TSAS 1C": "Disp. Docente",
                        "TSAS 2C": "Disp. Docente",
                        "TSAS 3C": "Disp. Docente",
                        "TSAS 4C": "Disp. Docente",
                        "TSAS 5C": "Disp. Docente",
                        "TSCDIA 1C": "Disp. Docente",
                        "TSCDIA 2C": "Disp. Docente",
                        "TSCDIA 3C": "Disp. Docente",
                        "TSCDIA 4C": "Disp. Docente",
                        "TSCDIA 5C": "Disp. Docente",
                        "TSDS 1C": "Disp. Docente",
                        "TSDS 2C": "Disp. Docente",
                        "TSDS 3C": "Disp. Docente",
                        "TSDS 4C": "Disp. Docente",
                        "TSDS 5C": "Disp. Docente"
                },
                {
                        "SEMANA": "16",
                        "FECHAS": "23/11 al 27/11",
                        "TSAS 1C": "Disp. Docente",
                        "TSAS 2C": "Disp. Docente",
                        "TSAS 3C": "Disp. Docente",
                        "TSAS 4C": "Disp. Docente",
                        "TSAS 5C": "Disp. Docente",
                        "TSCDIA 1C": "Disp. Docente",
                        "TSCDIA 2C": "Disp. Docente",
                        "TSCDIA 3C": "Disp. Docente",
                        "TSCDIA 4C": "Disp. Docente",
                        "TSCDIA 5C": "Disp. Docente",
                        "TSDS 1C": "Disp. Docente",
                        "TSDS 2C": "Disp. Docente",
                        "TSDS 3C": "Disp. Docente",
                        "TSDS 4C": "Disp. Docente",
                        "TSDS 5C": "Disp. Docente"
                }
        ],
        "professors": {
                "TSAS 1C": {
                        "Lunes": [
                                {
                                        "Profesor": "Bonini",
                                        "Materia": "Técnicas de Programación"
                                }
                        ],
                        "Martes": [],
                        "Miércoles": [
                                {
                                        "Profesor": "Lussiano",
                                        "Materia": "Administración de Base de Datos"
                                }
                        ],
                        "Jueves": [
                                {
                                        "Profesor": "Pillón",
                                        "Materia": "Elementos de Análisis Matemático"
                                }
                        ],
                        "Viernes": [
                                {
                                        "Profesor": "Ziccardi",
                                        "Materia": "Lógica Computacional"
                                }
                        ]
                },
                "TSAS 2C": {
                        "Lunes": [
                                {
                                        "Profesor": "Tirado",
                                        "Materia": "PP1 Aproximación al Campo Laboral"
                                }
                        ],
                        "Martes": [
                                {
                                        "Profesor": "Celi",
                                        "Materia": "Inglés"
                                }
                        ],
                        "Miércoles": [
                                {
                                        "Profesor": "Villariño",
                                        "Materia": "Desarrollo de Sistemas Orientado a Objetos"
                                }
                        ],
                        "Jueves": [
                                {
                                        "Profesor": "Reynoso",
                                        "Materia": "Estadística y Probabilidad para el Análisis de Sistemas"
                                }
                        ],
                        "Viernes": [
                                {
                                        "Profesor": "Escobar",
                                        "Materia": "Modelado y Diseño de Software"
                                }
                        ]
                },
                "TSAS 3C": {
                        "Lunes": [
                                {
                                        "Profesor": "León",
                                        "Materia": "Análisis de Sistemas"
                                }
                        ],
                        "Martes": [
                                {
                                        "Profesor": "Perez",
                                        "Materia": "Diseño e Implementación de Pruebas de Software"
                                }
                        ],
                        "Miércoles": [
                                {
                                        "Profesor": "Marchetti",
                                        "Materia": "PP2 Relevamiento de Requerimientos de Usuario"
                                }
                        ],
                        "Jueves": [
                                {
                                        "Profesor": "Conti",
                                        "Materia": "Ingeniería de Software"
                                }
                        ],
                        "Viernes": [
                                {
                                        "Profesor": "Blasco",
                                        "Materia": "Taller de Comunicación"
                                }
                        ]
                },
                "TSAS 4C": {
                        "Lunes": [
                                {
                                        "Profesor": "Litovicius",
                                        "Materia": "PP3 Diseño de Arquitectura de Sistemas"
                                }
                        ],
                        "Martes": [
                                {
                                        "Profesor": "Muotri",
                                        "Materia": "Gestión de Proyectos"
                                },
                                {
                                        "Profesor": "Litovicius",
                                        "Materia": "PP3 Diseño de Arquitectura de Sistemas"
                                }
                        ],
                        "Miércoles": [
                                {
                                        "Profesor": "Santoro",
                                        "Materia": "Redes y Ciberseguridad"
                                }
                        ],
                        "Jueves": [
                                {
                                        "Profesor": "Straccia",
                                        "Materia": "Trabajo, Tecnología y Sociedad"
                                },
                                {
                                        "Profesor": "Santoro",
                                        "Materia": "Redes y Ciberseguridad"
                                }
                        ],
                        "Viernes": [
                                {
                                        "Profesor": "Filippi Farmar",
                                        "Materia": "Seminario de Actualización en Tecnologías Web"
                                }
                        ]
                },
                "TSAS 5C": {
                        "Lunes": [
                                {
                                        "Profesor": "Eckerdt",
                                        "Materia": "Liderazgo y Gestión de Equipos"
                                }
                        ],
                        "Martes": [
                                {
                                        "Profesor": "Farioli",
                                        "Materia": "PP4 Proyecto Integrador"
                                }
                        ],
                        "Miércoles": [
                                {
                                        "Profesor": "Arroyo Díaz",
                                        "Materia": "Aseguramiento de Calidad de los Sistemas"
                                },
                                {
                                        "Profesor": "Farioli",
                                        "Materia": "PP4 Proyecto Integrador"
                                }
                        ],
                        "Jueves": [
                                {
                                        "Profesor": "Rusatti",
                                        "Materia": "Arquitectura de Sistemas en la Nube"
                                }
                        ],
                        "Viernes": [
                                {
                                        "Profesor": "Lussiano",
                                        "Materia": "Sistemas de Gestión"
                                }
                        ]
                },
                "TSCDIA 1C": {
                        "Lunes": [
                                {
                                        "Profesor": "Presumido",
                                        "Materia": "Lógica Computacional"
                                }
                        ],
                        "Martes": [
                                {
                                        "Profesor": "Marchetti",
                                        "Materia": "Administración de Base de Datos"
                                }
                        ],
                        "Miércoles": [],
                        "Jueves": [
                                {
                                        "Profesor": "Presumido",
                                        "Materia": "Elementos de Análisis Matemático"
                                }
                        ],
                        "Viernes": [
                                {
                                        "Profesor": "Capara",
                                        "Materia": "Técnicas de Programación"
                                }
                        ]
                },
                "TSCDIA 2C": {
                        "Lunes": [
                                {
                                        "Profesor": "Cendra",
                                        "Materia": "PP1 Aproximación al Campo Laboral"
                                }
                        ],
                        "Martes": [
                                {
                                        "Profesor": "León",
                                        "Materia": "Desarrollo de Sistemas de Inteligencia Artificial"
                                }
                        ],
                        "Miércoles": [
                                {
                                        "Profesor": "Reynoso",
                                        "Materia": "Estadística y Probabilidad para la Gestión de Datos"
                                }
                        ],
                        "Jueves": [
                                {
                                        "Profesor": "Ferrero",
                                        "Materia": "Taller de Comunicación"
                                }
                        ],
                        "Viernes": [
                                {
                                        "Profesor": "León",
                                        "Materia": "Desarrollo de Sistemas de Inteligencia Artificial"
                                }
                        ]
                },
                "TSCDIA 3C": {
                        "Lunes": [
                                {
                                        "Profesor": "Polcán",
                                        "Materia": "Gestión de Proyectos"
                                }
                        ],
                        "Martes": [
                                {
                                        "Profesor": "Planiscig",
                                        "Materia": "Ciencia de Datos"
                                },
                                {
                                        "Profesor": "Villagra",
                                        "Materia": "Seminario de Actualización"
                                }
                        ],
                        "Miércoles": [
                                {
                                        "Profesor": "León",
                                        "Materia": "Modelizado de Sistemas de IA"
                                }
                        ],
                        "Jueves": [
                                {
                                        "Profesor": "Fassio",
                                        "Materia": "Procesamiento de Aprendizaje Automático"
                                }
                        ],
                        "Viernes": [
                                {
                                        "Profesor": "Planiscig",
                                        "Materia": "Ciencia de Datos"
                                }
                        ]
                },
                "TSCDIA 4C": {
                        "Lunes": [
                                {
                                        "Profesor": "Pita",
                                        "Materia": "PP3 Análisis y Exploración de Datos"
                                }
                        ],
                        "Martes": [
                                {
                                        "Profesor": "Pita",
                                        "Materia": "Modelado y Minería de Datos"
                                }
                        ],
                        "Miércoles": [
                                {
                                        "Profesor": "Pita",
                                        "Materia": "Modelado y Minería de Datos"
                                }
                        ],
                        "Jueves": [
                                {
                                        "Profesor": "Escobar",
                                        "Materia": "Técnicas de Procesamiento de Habla"
                                }
                        ],
                        "Viernes": [
                                {
                                        "Profesor": "Bachoer",
                                        "Materia": "Trabajo, Tecnología y Sociedad"
                                },
                                {
                                        "Profesor": "Escobar",
                                        "Materia": "Técnicas de Procesamiento de Habla"
                                }
                        ]
                },
                "TSCDIA 5C": {
                        "Lunes": [
                                {
                                        "Profesor": "Planiscig",
                                        "Materia": "PP4 Proyecto Integrador"
                                }
                        ],
                        "Martes": [],
                        "Miércoles": [
                                {
                                        "Profesor": "Bonini",
                                        "Materia": "Técnicas de Procesamiento Digital de Imágenes"
                                }
                        ],
                        "Jueves": [],
                        "Viernes": []
                },
                "TSDS 1C": {
                        "Lunes": [
                                {
                                        "Profesor": "Vilariño",
                                        "Materia": "Técnicas de Programación"
                                }
                        ],
                        "Martes": [
                                {
                                        "Profesor": "Salico",
                                        "Materia": "Lógica Computacional"
                                }
                        ],
                        "Miércoles": [
                                {
                                        "Profesor": "Vilariño",
                                        "Materia": "Técnicas de Programación"
                                },
                                {
                                        "Profesor": "Odstrcil",
                                        "Materia": "Administración de Base de Datos"
                                }
                        ],
                        "Jueves": [
                                {
                                        "Profesor": "Odstrcil",
                                        "Materia": "Administración de Base de Datos"
                                }
                        ],
                        "Viernes": [
                                {
                                        "Profesor": "Reynoso",
                                        "Materia": "Elementos de Análisis Matemático"
                                }
                        ]
                },
                "TSDS 2C": {
                        "Lunes": [
                                {
                                        "Profesor": "Cefali",
                                        "Materia": "Inglés"
                                }
                        ],
                        "Martes": [
                                {
                                        "Profesor": "Murua",
                                        "Materia": "Estadística y Probabilidad para el Desarrollo de Software"
                                }
                        ],
                        "Miércoles": [
                                {
                                        "Profesor": "Romitelli",
                                        "Materia": "PP1 Aproximación al Campo Laboral"
                                }
                        ],
                        "Jueves": [
                                {
                                        "Profesor": "Mercado",
                                        "Materia": "Desarrollo de Sistemas Orientado a Objetos"
                                }
                        ],
                        "Viernes": [
                                {
                                        "Profesor": "Malvacio",
                                        "Materia": "Modelado y Diseño de Software"
                                },
                                {
                                        "Profesor": "Mercado",
                                        "Materia": "Desarrollo de Sistemas Orientado a Objetos"
                                }
                        ]
                },
                "TSDS 3C": {
                        "Lunes": [
                                {
                                        "Profesor": "Santoro",
                                        "Materia": "PP2 Desarrollo de Sistemas de Información Orientados a la Gestión y Apoyo a las Decisiones"
                                }
                        ],
                        "Martes": [
                                {
                                        "Profesor": "Planiscig",
                                        "Materia": "Metodología de Prueba de Sistemas"
                                }
                        ],
                        "Miércoles": [
                                {
                                        "Profesor": "Litovicius",
                                        "Materia": "Desarrollo de Aplicaciones para Dispositivos Móviles"
                                },
                                {
                                        "Profesor": "Ferraro",
                                        "Materia": "Taller de Comunicación"
                                }
                        ],
                        "Jueves": [
                                {
                                        "Profesor": "Santoro",
                                        "Materia": "Tecnologías de la Información y de la Comunicación"
                                },
                                {
                                        "Profesor": "Planiscig",
                                        "Materia": "Metodología de Prueba de Sistemas"
                                }
                        ],
                        "Viernes": [
                                {
                                        "Profesor": "Litovicius",
                                        "Materia": "Desarrollo de Aplicaciones para Dispositivos Móviles"
                                }
                        ]
                },
                "TSDS 4C": {
                        "Lunes": [
                                {
                                        "Profesor": "Lussiano",
                                        "Materia": "Ingeniería de Software"
                                }
                        ],
                        "Martes": [],
                        "Miércoles": [
                                {
                                        "Profesor": "Malvacio",
                                        "Materia": "Desarrollo de Sistemas Web (Front End)"
                                },
                                {
                                        "Profesor": "Uñates",
                                        "Materia": "Desarrollo e Implementación de Sistemas en la Nube"
                                }
                        ],
                        "Jueves": [
                                {
                                        "Profesor": "Uñates",
                                        "Materia": "Desarrollo e Implementación de Sistemas en la Nube"
                                }
                        ],
                        "Viernes": [
                                {
                                        "Profesor": "Bonini",
                                        "Materia": "Desarrollo de Sistemas Web (Back End)"
                                }
                        ]
                },
                "TSDS 5C": {
                        "Lunes": [
                                {
                                        "Profesor": "Campagna",
                                        "Materia": "PP4 Proyecto Integrador"
                                }
                        ],
                        "Martes": [
                                {
                                        "Profesor": "Rusatti",
                                        "Materia": "Programación Sobre Redes"
                                }
                        ],
                        "Miércoles": [
                                {
                                        "Profesor": "Cuñarro",
                                        "Materia": "Trabajo, Tecnología y Sociedad"
                                },
                                {
                                        "Profesor": "Fassio",
                                        "Materia": "Seminario de Actualización"
                                }
                        ],
                        "Jueves": [
                                {
                                        "Profesor": "Polcán",
                                        "Materia": "Gestión de Proyectos"
                                }
                        ],
                        "Viernes": []
                }
        }
};
        let schedule = DB.schedule;
        let professors = DB.professors;
        let allComisiones = Object.keys(professors);
        
        // Fetch real-time data from Firebase
        async function fetchFromFirebase() {
            try {
                const scheduleSnap = await db.collection('config').doc('schedule').get();
                const professorsSnap = await db.collection('config').doc('professors').get();
                
                if (scheduleSnap.exists) {
                    schedule = scheduleSnap.data().data;
                }
                if (professorsSnap.exists) {
                    professors = professorsSnap.data().data;
                    allComisiones = Object.keys(professors);
                }
                renderResults(); // Refresh UI with Firebase data
            } catch(e) {
                console.error("Error fetching from Firebase", e);
            }
        }
        fetchFromFirebase();

        

        const inputSearch = document.getElementById('s-profesor');
        const container = document.getElementById('results');
        const summary = document.getElementById('filtersSummary');

        function isPresencial(value) {
            if (!value) return false;
            // Evaluamos Disp. Docente como no requiere aula presencial estándar.
            if (value.toLowerCase().includes("docente")) return false; 
            return true;
        }

        function getExactDate(dia, rangeStr) {
            const dayMap = { 'Lunes': 0, 'Martes': 1, 'Miércoles': 2, 'Jueves': 3, 'Viernes': 4 };
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            // Specific holidays provided by user
            const holidays = ["23/3", "24/4", "2/4", "3/4", "1/5", "25/5", "15/6", "9/7", "10/7", "17/8", "12/10", "23/11"];
            
            // Extract HH/MM from range "DD/MM al DD/MM" or similar
            const match = rangeStr.match(/(\d+)\/(\d+)/);
            if (!match) return { short: dia, full: dia, isHoliday: false }; 

            let day = parseInt(match[1]);
            let month = parseInt(match[2]) - 1; // 0-indexed month
            
            // We use 2026 as the reference year for date arithmetic
            const d = new Date(2026, month, day);
            
            // Add offset based on day of week
            const offset = dayMap[dia] || 0;
            d.setDate(d.getDate() + offset);
            
            const finalDay = d.getDate();
            const finalMonthNum = d.getMonth();
            const finalMonthName = monthNames[finalMonthNum];
            
            // Check if this date is in our holiday list
            const dateStr = `${finalDay}/${finalMonthNum + 1}`;
            const isHoliday = holidays.includes(dateStr);
            
            const fullDate = `${dia} ${finalDay} de ${finalMonthName}`;
            return {
                short: `${dia} ${finalDay}`,
                full: fullDate,
                formatted: fullDate,
                isHoliday: isHoliday
            };
        }

        function renderResults() {
            if (!inputSearch) return;
            const searchStr = inputSearch.value.trim().toLowerCase();
            
            if (!searchStr) {
                summary.innerHTML = '';
                container.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1;">
                        <i class="fas fa-keyboard"></i>
                        Ingresa un nombre de profesor para visualizar el cronograma presencial.
                    </div>
                `;
                return;
            }

            let teacherClasses = [];
            let foundNames = new Set();
            
            allComisiones.forEach(com => {
                Object.entries(professors[com]).forEach(([dia, clases]) => {
                    clases.forEach(c => {
                        if (c.Profesor.toLowerCase().includes(searchStr)) {
                            foundNames.add(c.Profesor);
                            teacherClasses.push({
                                profesor: c.Profesor,
                                materia: c.Materia,
                                comision: com,
                                dia: dia
                            });
                        }
                    });
                });
            });

            if (teacherClasses.length === 0) {
                summary.innerHTML = '';
                container.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1; color: var(--danger)">
                        <i class="fas fa-search-minus" style="color: var(--danger)"></i>
                        No se encontró ningún resultado que coincida con "${searchStr}".
                    </div>
                `;
                return;
            }

            let presencialAssignments = [];
            
            teacherClasses.forEach(tc => {
                let hasPresencial = false;
                schedule.forEach(week => {
                    const value = week[tc.comision];
                    if (isPresencial(value)) {
                        hasPresencial = true;
                        const dateDetails = getExactDate(tc.dia, week.FECHAS);
                        
                        let displayAula = value;
                        let isCancelled = false;
                        if ((week.SEMANA === "1" && tc.comision === "TSAS 1C" && (tc.dia === "Lunes" || tc.dia === "Martes")) ||
                            (week.SEMANA === "1" && tc.comision.endsWith("1C") && tc.dia === "Miércoles")) {
                            displayAula = "No hay clases";
                            isCancelled = true;
                        }

                        presencialAssignments.push({
                            ...tc,
                            semana: parseInt(week.SEMANA), 
                            semanaStr: week.SEMANA,
                            fechas: week.FECHAS,
                            exactDate: dateDetails.full,
                            isHoliday: dateDetails.isHoliday,
                            isCancelled: isCancelled,
                            aula: displayAula
                        });
                    }
                });

                if (!hasPresencial) {
                    presencialAssignments.push({
                        ...tc,
                        semana: 999, 
                        semanaStr: "-",
                        fechas: "Cursada habitual",
                        exactDate: tc.dia,
                        isHoliday: false,
                        aula: "Modalidad Virtual / Disp. Docente",
                        isVirtual: true
                    });
                }
            });

            if (presencialAssignments.length === 0) {
                const names = Array.from(foundNames).join(", ");
                summary.innerHTML = `Profesor(es): ${names}`;
                container.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1; color: var(--warning)">
                        <i class="fas fa-laptop-house" style="color: var(--warning)"></i>
                        El profesor tiene asignaciones, pero ninguna requiere presencialidad directa según la matriz de aulas.
                    </div>
                `;
                return;
            }

            presencialAssignments.sort((a, b) => a.semana - b.semana);

            const namesDisp = Array.from(foundNames).join(" | ");
            summary.innerHTML = `
                <div><i class="fas fa-calendar-check"></i> Mostrando clases para: <strong>${namesDisp}</strong></div>
                <button class="download-btn" onclick="downloadPdf()"><i class="fas fa-file-pdf"></i> Guardar como PDF</button>
            `;

            let html = '';
            presencialAssignments.forEach((item, index) => {
                const isVirtualBadge = item.isVirtual ? 'background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1;' : '';
                html += `
                    <div class="card" style="animation: slideUp 0.5s ease-out forwards; opacity: 0; animation-delay: ${Math.min(index * 0.05, 1)}s; ${item.isVirtual ? 'border-left-color: #94a3b8;' : ''}">
                        <div class="card-header">
                            <span><i class="fas fa-users"></i> ${item.comision}</span>
                            <span class="badge" style="${isVirtualBadge}"><i class="fas ${item.isVirtual ? 'fa-laptop-house' : 'fa-school'}"></i> ${item.isVirtual ? 'Virtual' : 'Semana ' + item.semanaStr}</span>
                        </div>
                        <div class="card-title">${item.materia}</div>
                        
                        <div class="detail-row">
                            <i class="fas fa-calendar-day"></i> ${item.exactDate}
                        </div>
                        
                        <div class="detail-row">
                            <i class="fas fa-map-marker-alt"></i> 
                            <span>Aula: ${item.isHoliday ? '<strong style="color: var(--danger); text-transform: uppercase;">Feriado</strong>' : (item.isCancelled ? '<strong style="color: var(--danger);">' + item.aula + '</strong>' : item.aula)}</span>
                        </div>
                        
                        <div class="detail-row" style="font-size:0.95rem; color:var(--text-muted); margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
                            <i class="fas fa-user-tie"></i> ${item.profesor}
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
        }

        function downloadPdf() {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            const profName = inputSearch.value.trim();
            
            pdf.setFontSize(16);
            pdf.setFont("helvetica", "bold");
            pdf.text(`Cronograma Presencial - ${profName.toUpperCase()}`, 14, 20);
            
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "normal");
            
            let y = 30;
            const cards = document.querySelectorAll('.card');
            
            if (cards.length === 0) {
                pdf.text("No se encontraron clases presenciales.", 14, y);
            } else {
                cards.forEach(card => {
                    const headerTxt = card.querySelector('.card-header').innerText.trim().replace(/\n/g, ' - ');
                    const titleTxt = card.querySelector('.card-title').innerText.trim();
                    const details = card.querySelectorAll('.detail-row');
                    const fechaTxt = details[0].innerText.trim(); // Now contains the exact date string
                    const aulaTxt = details[1].innerText.trim();
                    const profTxt = details[2].innerText.trim();
                    
                    // Add new page if content exceeds A4 length
                    if (y > 270) {
                        pdf.addPage();
                        y = 20;
                    }
                    
                    // Print structured text block
                    pdf.setFont("helvetica", "bold");
                    pdf.text(headerTxt, 14, y);
                    y += 6;
                    
                    pdf.setFont("helvetica", "normal");
                    pdf.text(`Materia: ${titleTxt}`, 14, y);
                    y += 6;
                    
                    pdf.text(`Fecha: ${fechaTxt}`, 14, y);
                    y += 6;
                    
                    pdf.text(aulaTxt, 14, y);
                    y += 6;
                    
                    pdf.text(`Docente: ${profTxt}`, 14, y);
                    y += 10;
                    
                    // Separator line
                    pdf.setDrawColor(200);
                    pdf.line(14, y - 3, 196, y - 3);
                    y += 6;
                });
            }
            
            pdf.save(`cronograma_${profName}.pdf`);
        }

        function showCareer(careerPrefix) {
            inputSearch.value = '';
            
            let presencialAssignments = [];
            
            const comisiones = allComisiones.filter(c => c.startsWith(careerPrefix));
            
            schedule.forEach(week => {
                comisiones.forEach(com => {
                    const aula = week[com];
                    if (isPresencial(aula)) {
                        Object.entries(professors[com]).forEach(([dia, clases]) => {
                            clases.forEach(c => {
                                const dateDetails = getExactDate(dia, week.FECHAS);
                                
                                let displayAula = aula;
                                let isCancelled = false;
                                if ((week.SEMANA === "1" && com === "TSAS 1C" && (dia === "Lunes" || dia === "Martes")) ||
                                    (week.SEMANA === "1" && com.endsWith("1C") && dia === "Miércoles")) {
                                    displayAula = "No hay clases";
                                    isCancelled = true;
                                }

                                presencialAssignments.push({
                                    profesor: c.Profesor,
                                    materia: c.Materia,
                                    comision: com,
                                    dia: dia,
                                    semana: parseInt(week.SEMANA),
                                    semanaStr: week.SEMANA,
                                    fechas: week.FECHAS,
                                    exactDate: dateDetails.full,
                                    isHoliday: dateDetails.isHoliday,
                                    isCancelled: isCancelled,
                                    aula: displayAula
                                });
                            });
                        });
                    }
                });
            });

            if (presencialAssignments.length === 0) {
                summary.innerHTML = '';
                container.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1; color: var(--danger)">
                        <i class="fas fa-search-minus" style="color: var(--danger)"></i>
                        No se encontraron clases presenciales para la carrera "${careerPrefix}".
                    </div>
                `;
                return;
            }
            
            presencialAssignments.sort((a, b) => a.semana - b.semana);

            summary.innerHTML = `
                <div><i class="fas fa-calendar-check"></i> Mostrando cronograma presencial para: <strong>${careerPrefix}</strong></div>
                <button class="download-btn" onclick="downloadPdf()"><i class="fas fa-file-pdf"></i> Guardar como PDF</button>
            `;

            let html = '';
            presencialAssignments.forEach((item, index) => {
                html += `
                    <div class="card" style="animation: slideUp 0.5s ease-out forwards; opacity: 0; animation-delay: ${Math.min(index * 0.05, 1)}s;">
                        <div class="card-header">
                            <span><i class="fas fa-users"></i> ${item.comision}</span>
                            <span class="badge"><i class="fas fa-school"></i> Semana ${item.semanaStr}</span>
                        </div>
                        <div class="card-title">${item.materia}</div>
                        
                        <div class="detail-row">
                            <i class="fas fa-calendar-day"></i> ${item.exactDate}
                        </div>
                        
                        <div class="detail-row">
                            <i class="fas fa-map-marker-alt"></i> 
                            <span>Aula: ${item.isHoliday ? '<strong style="color: var(--danger); text-transform: uppercase;">Feriado</strong>' : (item.isCancelled ? '<strong style="color: var(--danger);">' + item.aula + '</strong>' : item.aula)}</span>
                        </div>
                        
                        <div class="detail-row" style="font-size:0.95rem; color:var(--text-muted); margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
                            <i class="fas fa-user-tie"></i> ${item.profesor}
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
        }

        if (inputSearch) {
            inputSearch.addEventListener('input', renderResults);
        }

        document.addEventListener('DOMContentLoaded', () => {
            if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
                
            }

            document.getElementById('excelUpload').addEventListener('change', handleExcelUpload);
        });


        // CRUD Logic
        let currentCrudType = '';
        let currentCrudId = null;

        
        function renderAdminMatrix() {
            const thead = document.getElementById('adminMatrixHead');
            const tbody = document.getElementById('adminMatrixBody');
            
            // Generate Headers
            let headHtml = '<tr><th>Semana / Fechas</th>';
            allComisiones.forEach(c => {
                headHtml += `<th>${c}</th>`;
            });
            headHtml += '</tr>';
            thead.innerHTML = headHtml;

            // Generate Body
            let bodyHtml = '';
            schedule.forEach(week => {
                bodyHtml += `<tr><td><strong>Semana ${week.SEMANA}</strong><br><span style="font-size:0.8rem; font-weight:normal;">${week.FECHAS}</span></td>`;
                
                allComisiones.forEach(com => {
                    let aula = week[com];
                    if (isPresencial(aula)) {
                        // Presencial Cell
                        let profsHtml = '';
                        if (professors[com]) {
                            ['Lunes','Martes','Miércoles','Jueves','Viernes'].forEach(dia => {
                                if (professors[com][dia] && professors[com][dia].length > 0) {
                                    professors[com][dia].forEach(clase => {
                                        profsHtml += `<li><strong>${dia}:</strong> ${clase.Profesor} <i>(${clase.Materia})</i></li>`;
                                    });
                                }
                            });
                        }
                        
                        let isCancelled = false;
                        let displayAula = aula;
                        if ((week.SEMANA === "1" && com === "TSAS 1C") || (week.SEMANA === "1" && com.endsWith("1C"))) {
                            // We can use a simplified check or keep the original logic. 
                            // For simplicity, we just display the aula, since cancellations might be day-specific.
                        }
                        
                        bodyHtml += `
                            <td class="matrix-cell-presencial">
                                <span class="matrix-aula">${displayAula}</span>
                                <ul class="matrix-prof-list">
                                    ${profsHtml}
                                </ul>
                            </td>
                        `;
                    } else {
                        // Virtual Cell
                        bodyHtml += `<td class="matrix-cell-virtual">Virtual</td>`;
                    }
                });
                bodyHtml += '</tr>';
            });
            tbody.innerHTML = bodyHtml;
        }

        function switchAdminTab(tabId) {
            document.querySelectorAll('.admin-section').forEach(sec => sec.style.display = 'none');
            document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabId).style.display = 'block';
            event.target.classList.add('active');
            const wrapper = document.getElementById('adminMainWrapper');
            
            if(tabId === 'tab-matrix') {
                wrapper.classList.add('matrix-mode');
            } else {
                wrapper.classList.remove('matrix-mode');
            }

            if(tabId === 'tab-professors') renderAdminProfessors();
            if(tabId === 'tab-schedule') renderAdminSchedule();
            if(tabId === 'tab-matrix') renderAdminMatrix();
            if(tabId === 'tab-stats') renderAdminStats();
        }

        function renderAdminProfessors() {
            const tbody = document.getElementById('adminProfessorsBody');
            let flatClasses = [];
            
            Object.keys(professors).forEach(comision => {
                ['Lunes','Martes','Miércoles','Jueves','Viernes'].forEach(dia => {
                    if(professors[comision][dia]) {
                        professors[comision][dia].forEach((clase, idx) => {
                            flatClasses.push({
                                profesor: clase.Profesor,
                                materia: clase.Materia,
                                comision: comision,
                                dia: dia,
                                idx: idx
                            });
                        });
                    }
                });
            });

            flatClasses.sort((a, b) => a.profesor.localeCompare(b.profesor));

            let html = '';
            flatClasses.forEach(item => {
                html += `
                    <tr>
                        <td><strong>${item.profesor}</strong></td>
                        <td>${item.materia}</td>
                        <td>${item.comision}</td>
                        <td>${item.dia}</td>
                        <td>
                            <button class="action-btn edit" onclick="openProfessorModal('${item.comision}', '${item.dia}', ${item.idx})"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete" onclick="deleteProfessor('${item.comision}', '${item.dia}', ${item.idx})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
            });
            tbody.innerHTML = html;
        }

        function renderAdminSchedule() {
            const tbody = document.getElementById('adminScheduleBody');
            let html = '';
            schedule.forEach((week, idx) => {
                let aulas = Object.keys(week).filter(k => k !== 'SEMANA' && k !== 'FECHAS' && week[k]).map(k => `${k}: ${week[k]}`).join(', ');
                html += `
                    <tr>
                        <td>Semana ${week.SEMANA}</td>
                        <td>${week.FECHAS}</td>
                        <td style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${aulas}">${aulas || '-'}</td>
                        <td>
                            <button class="action-btn edit" onclick="openScheduleModal(${idx})"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete" onclick="deleteSchedule(${idx})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
            });
            tbody.innerHTML = html;
        }

        async function renderAdminStats() {
            const tbody = document.getElementById('adminStatsBody');
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Cargando estadísticas...</td></tr>';
            
            try {
                // Get the last 1000 visits to compute stats locally
                const snapshot = await db.collection('visits').orderBy('timestamp', 'desc').limit(1000).get();
                
                let html = '';
                let countToday = 0;
                let countWeek = 0;
                let countMonth = 0;
                let countAllTime = snapshot.size;
                
                const now = new Date();
                const todayStr = now.toDateString();
                
                const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const ts = data.timestamp ? data.timestamp.toDate() : new Date();
                    
                    if (ts.toDateString() === todayStr) countToday++;
                    if (ts >= oneWeekAgo) countWeek++;
                    if (ts >= oneMonthAgo) countMonth++;
                    
                    const dateFmt = ts.toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
                    
                    let uaShort = data.userAgent || 'Desconocido';
                    if(uaShort.includes('Windows')) uaShort = 'Windows';
                    else if(uaShort.includes('Mac OS')) uaShort = 'Mac OS';
                    else if(uaShort.includes('Linux')) uaShort = 'Linux';
                    else if(uaShort.includes('Android')) uaShort = 'Android';
                    else if(uaShort.includes('iPhone')) uaShort = 'iPhone';
                    
                    html += `
                        <tr>
                            <td>${dateFmt}</td>
                            <td>${data.ip || '-'}</td>
                            <td>${data.city || '-'}, ${data.country || '-'}</td>
                            <td title="${data.userAgent}">${uaShort}</td>
                        </tr>
                    `;
                });
                
                if (html === '') {
                    html = '<tr><td colspan="4" style="text-align:center;">No hay visitas registradas aún.</td></tr>';
                }
                
                document.getElementById('statToday').innerText = countToday;
                document.getElementById('statWeek').innerText = countWeek;
                document.getElementById('statMonth').innerText = countMonth;
                document.getElementById('statAllTime').innerText = countAllTime + (countAllTime === 1000 ? '+' : '');
                
                tbody.innerHTML = html;
            } catch (err) {
                console.error("Error fetching stats:", err);
                tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:red;">Error cargando estadísticas. Revisa la consola.</td></tr>';
            }
        }

        function closeCrudModal() {
            document.getElementById('crudModal').style.display = 'none';
        }

        function openProfessorModal(comision = '', dia = '', idx = -1) {
            currentCrudType = 'professor';
            currentCrudId = { comision, dia, idx };
            
            let prof = '', mat = '';
            if(idx !== -1) {
                prof = professors[comision][dia][idx].Profesor;
                mat = professors[comision][dia][idx].Materia;
            }

            document.getElementById('crudModalTitle').innerText = idx === -1 ? 'Nueva Clase' : 'Editar Clase';
            document.getElementById('crudModalBody').innerHTML = `
                <div class="modal-form-group">
                    <label>Comisión</label>
                    <input type="text" id="crudComision" value="${comision}" placeholder="Ej: TSAS 1C">
                </div>
                <div class="modal-form-group">
                    <label>Día</label>
                    <select id="crudDia">
                        <option value="Lunes" ${dia==='Lunes'?'selected':''}>Lunes</option>
                        <option value="Martes" ${dia==='Martes'?'selected':''}>Martes</option>
                        <option value="Miércoles" ${dia==='Miércoles'?'selected':''}>Miércoles</option>
                        <option value="Jueves" ${dia==='Jueves'?'selected':''}>Jueves</option>
                        <option value="Viernes" ${dia==='Viernes'?'selected':''}>Viernes</option>
                    </select>
                </div>
                <div class="modal-form-group">
                    <label>Profesor</label>
                    <input type="text" id="crudProfesor" value="${prof}">
                </div>
                <div class="modal-form-group">
                    <label>Materia</label>
                    <input type="text" id="crudMateria" value="${mat}">
                </div>
            `;
            document.getElementById('crudModal').style.display = 'flex';
        }

        function deleteProfessor(comision, dia, idx) {
            if(!confirm('¿Seguro que deseas eliminar esta clase?')) return;
            professors[comision][dia].splice(idx, 1);
            saveProfessorsToFirebase();
        }

        function openScheduleModal(idx = -1) {
            currentCrudType = 'schedule';
            currentCrudId = idx;
            
            let week = idx !== -1 ? schedule[idx] : { SEMANA: schedule.length + 1, FECHAS: '' };
            let comisionesInputs = '';
            allComisiones.forEach(c => {
                let val = week[c] || '';
                comisionesInputs += `
                    <div class="modal-form-group" style="margin-bottom: 0.5rem;">
                        <label style="font-size: 0.9rem;">${c}</label>
                        <input type="text" id="crud_sch_${c}" value="${val}" placeholder="Aula">
                    </div>
                `;
            });

            document.getElementById('crudModalTitle').innerText = idx === -1 ? 'Nueva Semana' : `Editar Semana ${week.SEMANA}`;
            document.getElementById('crudModalBody').innerHTML = `
                <div class="modal-form-group">
                    <label>Número de Semana</label>
                    <input type="text" id="crudSemana" value="${week.SEMANA}">
                </div>
                <div class="modal-form-group">
                    <label>Fechas (ej: 10/8 al 14/8)</label>
                    <input type="text" id="crudFechas" value="${week.FECHAS}">
                </div>
                <h4 style="margin: 1rem 0 0.5rem 0;">Aulas por Comisión</h4>
                <div style="max-height: 300px; overflow-y: auto; border: 1px solid var(--border-color); padding: 1rem; border-radius: 8px;">
                    ${comisionesInputs}
                </div>
            `;
            document.getElementById('crudModal').style.display = 'flex';
        }

        function deleteSchedule(idx) {
            if(!confirm('¿Seguro que deseas eliminar esta semana?')) return;
            schedule.splice(idx, 1);
            saveScheduleToFirebase();
        }

        function saveCrudForm() {
            if(currentCrudType === 'professor') {
                const com = document.getElementById('crudComision').value.trim();
                const dia = document.getElementById('crudDia').value;
                const prof = document.getElementById('crudProfesor').value.trim();
                const mat = document.getElementById('crudMateria').value.trim();
                
                if(!com || !prof || !mat) return alert('Completa todos los campos');

                if(!professors[com]) {
                    professors[com] = { 'Lunes':[], 'Martes':[], 'Miércoles':[], 'Jueves':[], 'Viernes':[] };
                    if(!allComisiones.includes(com)) allComisiones.push(com);
                }

                // If editing and moved to another day/comision, delete old
                if(currentCrudId.idx !== -1) {
                    const oldCom = currentCrudId.comision;
                    const oldDia = currentCrudId.dia;
                    if(oldCom !== com || oldDia !== dia) {
                        professors[oldCom][oldDia].splice(currentCrudId.idx, 1);
                        professors[com][dia].push({ Profesor: prof, Materia: mat });
                    } else {
                        professors[com][dia][currentCrudId.idx] = { Profesor: prof, Materia: mat };
                    }
                } else {
                    professors[com][dia].push({ Profesor: prof, Materia: mat });
                }
                saveProfessorsToFirebase();

            } else if(currentCrudType === 'schedule') {
                let weekObj = {
                    SEMANA: document.getElementById('crudSemana').value.trim(),
                    FECHAS: document.getElementById('crudFechas').value.trim()
                };
                allComisiones.forEach(c => {
                    let val = document.getElementById(`crud_sch_${c}`).value.trim();
                    if(val) weekObj[c] = val;
                    else weekObj[c] = "";
                });

                if(currentCrudId !== -1) {
                    schedule[currentCrudId] = weekObj;
                } else {
                    schedule.push(weekObj);
                }
                saveScheduleToFirebase();
            }
            closeCrudModal();
        }

        async function saveProfessorsToFirebase() {
            try {
                await db.collection('config').doc('professors').set({data: professors});
                renderAdminProfessors();
                renderResults();
                alert('Profesores guardados correctamente');
            } catch(e) {
                console.error(e);
                alert('Error al guardar en Firebase');
            }
        }

        async function saveScheduleToFirebase() {
            try {
                await db.collection('config').doc('schedule').set({data: schedule});
                renderAdminSchedule();
                renderAdminMatrix();
                renderResults();
                alert('Cronograma guardado correctamente');
            } catch(e) {
                console.error(e);
                alert('Error al guardar en Firebase');
            }
        }

        function handleExcelUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: 'array'});
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const rows = XLSX.utils.sheet_to_json(worksheet, {header: 1, defval: ""});
                
                // Parse schedule
                let semanaIdx = rows.findIndex(r => r[0] === 'SEMANA');
                let headers_1 = rows[semanaIdx];
                let newSchedule = [];
                for(let i = semanaIdx + 1; i < semanaIdx + 17; i++) {
                    let r = rows[i];
                    if(r && r[0] && !isNaN(r[0])) {
                        let obj = {};
                        for(let j=0; j<headers_1.length; j++) {
                            if(headers_1[j]) {
                                obj[headers_1[j]] = r[j] ? String(r[j]).trim() : '';
                            }
                        }
                        newSchedule.push(obj);
                    }
                }
                
                // Parse professors
                let profIdx = rows.findIndex(r => r[2] === 'Profesor');
                let newProfessors = {};
                let currentComision = null;
                
                for(let i = profIdx + 1; i < rows.length; i++) {
                    let r = rows[i];
                    if(!r) continue;
                    
                    let comision = r[1] ? String(r[1]).trim() : '';
                    if(comision) {
                        currentComision = comision;
                        newProfessors[currentComision] = {
                            'Lunes': [], 'Martes': [], 'Miércoles': [], 'Jueves': [], 'Viernes': []
                        };
                    }
                    
                    if(!currentComision) continue;
                    
                    if(r[2] || r[3]) newProfessors[currentComision]['Lunes'].push({'Profesor': String(r[2]||'').trim(), 'Materia': String(r[3]||'').trim()});
                    if(r[4] || r[5]) newProfessors[currentComision]['Martes'].push({'Profesor': String(r[4]||'').trim(), 'Materia': String(r[5]||'').trim()});
                    if(r[6] || r[7]) newProfessors[currentComision]['Miércoles'].push({'Profesor': String(r[6]||'').trim(), 'Materia': String(r[7]||'').trim()});
                    if(r[8] || r[9]) newProfessors[currentComision]['Jueves'].push({'Profesor': String(r[8]||'').trim(), 'Materia': String(r[9]||'').trim()});
                    if(r[10] || r[11]) newProfessors[currentComision]['Viernes'].push({'Profesor': String(r[10]||'').trim(), 'Materia': String(r[11]||'').trim()});
                }
                
                // Upload to Firebase
                Promise.all([
                    db.collection('config').doc('schedule').set({data: newSchedule}),
                    db.collection('config').doc('professors').set({data: newProfessors})
                ]).then(() => {
                    alert('Base de datos actualizada exitosamente con el Excel.');
                    schedule = newSchedule;
                    professors = newProfessors;
                    allComisiones = Object.keys(professors);
                    renderResults();
                }).catch(err => {
                    console.error(err);
                    alert('Error al subir a Firebase.');
                });
            };
            reader.readAsArrayBuffer(file);
        }

        function showAdminLogin(e) {
            if (e) e.preventDefault();
            document.getElementById('adminModal').style.display = 'flex';
            document.getElementById('adminError').style.display = 'none';
        }

        function closeAdminLogin() {
            document.getElementById('adminModal').style.display = 'none';
            document.getElementById('adminUser').value = '';
            document.getElementById('adminPass').value = '';
        }

        function doAdminLogin() {
            const u = document.getElementById('adminUser').value;
            const p = document.getElementById('adminPass').value;
            if (u === 'admin' && p === 'Terciario2016!') {
                closeAdminLogin();
                const mc = document.getElementById('mainContainer');
                if (mc) mc.style.display = 'none';
                document.getElementById('adminPanel').style.display = 'flex';
                if(typeof renderAdminStats === 'function') renderAdminStats();
            } else {
                document.getElementById('adminError').style.display = 'block';
            }
        }

        function logoutAdmin() {
            document.getElementById('adminPanel').style.display = 'none';
            const mc = document.getElementById('mainContainer');
            if (mc) mc.style.display = 'flex';
        }

        function getClassesForDate(targetDateObj) {
            let results = [];
            const targetYMD = targetDateObj.getFullYear() + '-' + targetDateObj.getMonth() + '-' + targetDateObj.getDate();
            const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const diaName = dayNames[targetDateObj.getDay()];

            if (targetDateObj.getDay() === 0 || targetDateObj.getDay() === 6) return results;

            schedule.forEach(week => {
                allComisiones.forEach(com => {
                    const aula = week[com];
                    if (isPresencial(aula)) {
                        if (professors[com] && professors[com][diaName]) {
                            professors[com][diaName].forEach(c => {
                                const dateDetails = getExactDate(diaName, week.FECHAS);
                                if (!dateDetails.isHoliday && dateDetails.formatted) {
                                    const match = week.FECHAS.match(/(\d+)\/(\d+)/);
                                    if(match) {
                                        const d = new Date(2026, parseInt(match[2]) - 1, parseInt(match[1]));
                                        const dayMap = { 'Lunes': 0, 'Martes': 1, 'Miércoles': 2, 'Jueves': 3, 'Viernes': 4 };
                                        d.setDate(d.getDate() + (dayMap[diaName] || 0));
                                        const classYMD = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
                                        
                                        if (classYMD === targetYMD) {
                                            results.push({
                                                fecha: `${d.getDate()}/${d.getMonth()+1}`,
                                                carrera: com.split(' ')[0],
                                                materia: c.Materia,
                                                profesor: c.Profesor,
                                                aula: aula
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            });
            return results;
        }

        async function renderAndDownloadCartelera(targetDateObj) {
            const classes = getClassesForDate(targetDateObj);
            
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            
            const formattedTitle = `Clases Presenciales - ${dayNames[targetDateObj.getDay()]} ${targetDateObj.getDate()} de ${monthNames[targetDateObj.getMonth()]}`;
            document.getElementById('carteleraTitle').innerText = formattedTitle;
            
            const tbody = document.getElementById('carteleraBody');
            if (classes.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No hay clases presenciales este día.</td></tr>';
            } else {
                tbody.innerHTML = classes.map(c => `
                    <tr>
                        <td>${c.fecha}</td>
                        <td>${c.carrera}</td>
                        <td>${c.materia}</td>
                        <td>${c.profesor}</td>
                        <td>${c.aula}</td>
                    </tr>
                `).join('');
            }

            const canvasObj = document.getElementById('carteleraCanvas');
            canvasObj.style.display = 'block'; 

            try {
                const canvas = await html2canvas(canvasObj, { scale: 2 });
                const dataUrl = canvas.toDataURL('image/png');
                
                const link = document.createElement('a');
                link.download = `Cartelera_${targetDateObj.getFullYear()}-${targetDateObj.getMonth()+1}-${targetDateObj.getDate()}.png`;
                link.href = dataUrl;
                link.click();
            } catch (err) {
                console.error("Error generating canvas", err);
                alert("Hubo un error al generar la imagen.");
            }
        }

        async function generateDailyCartelera() {
            const dateStr = document.getElementById('carteleraDate').value;
            if(!dateStr) {
                alert('Por favor selecciona una fecha');
                return;
            }
            
            const [y, m, d] = dateStr.split('-');
            const targetDateObj = new Date(parseInt(y), parseInt(m)-1, parseInt(d));
            
            await renderAndDownloadCartelera(targetDateObj);
        }

        async function generateWeeklyCartelera() {
            const dateStr = document.getElementById('carteleraDate').value;
            if(!dateStr) {
                alert('Por favor selecciona una fecha de la semana que deseas generar');
                return;
            }
            
            const [y, m, d] = dateStr.split('-');
            let baseDate = new Date(parseInt(y), parseInt(m)-1, parseInt(d));
            
            const dayOfWeek = baseDate.getDay();
            if(dayOfWeek === 0) baseDate.setDate(baseDate.getDate() - 6);
            else if(dayOfWeek !== 1) baseDate.setDate(baseDate.getDate() - (dayOfWeek - 1));

            for(let i=0; i<5; i++) {
                const targetDate = new Date(baseDate);
                targetDate.setDate(baseDate.getDate() + i);
                await renderAndDownloadCartelera(targetDate);
                await new Promise(r => setTimeout(r, 500));
            }
        }
    