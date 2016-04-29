var APP = APP || {};

// defaults

APP.parameters = {

    // cluster parameters
    cluster_radius:       220.0,
    surface_strength:     0.0037,
    central_attraction:   91.0,
    mouse_attraction:     -14.0,
    spring_strength_interactive:     0.015, //0.022,
    spring_length_interactive:       163,    //163,
    attraction_strength_interactive: -178,   //-507,    //16,

    // global parameters:

    gravity:              0.45,     //0.75,
    background_darkness:  0.0,

    edge_force:     1195, //994, //478,     // strength of repulsion on the edges
    edge_maxDist:   261,  //680,  //500,     // max dist of repulsion on the edges

    inter_force:   0.07, //0.93,    // strength of inter-cluster springs
    inter_length:  151,  //139,     // length of inter-cluster springs

    render_lines: true,

    blooming_speed: 0.035,       // speed of the blooming effect when filtering by category

    use_dark_theme: false,
    theme_interpolation_speed: 0.02,

    line_opacity_threshold: 290

};


APP.theme = {

    light : {
        backgroundColor: new THREE.Color( 0xF2F3F4 ),
        nodesColor:      new THREE.Color( 0x000000 ),
        bottomBarColor:  new THREE.Color( 0xF2F3F4 ),
        filterInvert:    0
    },

    dark : {
        backgroundColor:  new THREE.Color( 0x1e1c26 ),
        nodesColor:       new THREE.Color( 0xffffff ),
        bottomBarColor:   new THREE.Color( 0x1e1c26 ),
        filterInvert:     1
    }

}


APP.clusterParameters = {

    default : {
        //normal nodes
        cluster_radius:       220.0,
        surface_strength:     0.0019, //0.0037,
        central_attraction:   91.0,
        mouse_attraction:     -14.0,
        // interactive nodes
        spring_strength_interactive:     0.41,   //0.015, //0.022,
        spring_length_interactive:       163,    //163,
        attraction_strength_interactive: -29,    //-70, //-177,    //16,
        // flags
        interactive_enabled:        true,
        mouse_attraction_enabled:   true
    },

    opened : {
        cluster_radius:       220.0,
        surface_strength:     0.0037,
        central_attraction:   -253, //-611,
        mouse_attraction:     -14.0,
        spring_strength_interactive:     0.052,
        spring_length_interactive:       126,
        attraction_strength_interactive: 136,
        interactive_enabled:        true,
        mouse_attraction_enabled:   true
    },

    closed : {
        cluster_radius:       220.0,
        surface_strength:     0.0019,
        central_attraction:   220,
        mouse_attraction:     -14.0,
        spring_strength_interactive:     0,
        spring_length_interactive:       0,
        attraction_strength_interactive: 345,
        interactive_enabled:        false,
        mouse_attraction_enabled:   true
    }

}

// templates

APP.templates = {

    nodeTemplate :
    '<div class="node">' +
        '<div class="circle"></div>' +
    '</div>',

    buttonTemplate :
    '<div class="button">' +
        '<div class="title"></div>' +
    '</div>'

}


// data

APP.data = [
    {
        color: 0xF39C12,
        position: new THREE.Vector3( 0.0, -0.47, 0.0 ),
        name:  "Aprendizajes",
        slug:  "aprendizajes",
        videos: [
            {
                url: 'url1',
                cover: 'url',
                slug: 'abordar-nuevo-proyecto',
                title: 'Abordar un nuevo proyecto',
                subtitle: '',
                description: 'Diseñar un proyecto educativo implica desarrollar una colaboración. Cada proyecto es, desde su inicio, una construcción compartida y consensuada que aúna los conocimientos, experiencia e ideas de los artistas y educadores implicados.',
                description2: 'Una de las primeras reuniones para abordar el diseño del taller Habitar la pintura.Es el inicio de una colaboración y de un intercambio de saberes: cada proyecto aúna los conocimientos y experiencias de todos los artistas y educadores implicados.',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'aprender-distintos-contextos',
                title: 'Aprender en distintos contextos',
                subtitle: '',
                description: '¿Se plantea igual el trabajo de creación plástica en el contexto educativo formal  y en el no formal? ¿Cómo es la educación artística dentro y fuera de la escuela, o cómo se perciben ambas? El video recoge la visión de varios niños.',
                description2: '',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'diversidad-aprendizajes',
                title: 'Diversidad de aprendizajes',
                subtitle: '',
                description: 'La inmersión en los talleres implica aprendizajes explícitos como son los relativos al contenido del museo y las exposiciones, y otros implícitos que tienen que ver con la metodología de trabajo en grupo y la activación del pensamiento.',
                description2: 'La artista Almudena Lobera y las educadoras Elba Díaz y Ana Vaquero inciden en los variados aprendizajes, expresos o implícitos, que entran en juego al participar en un proceso creativo: desde los contenidos de las exposiciones hasta las dinámicas grupales.',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'aprendizaje-artista',
                title: 'Aprendizaje del artista',
                subtitle: '',
                description: 'Los artistas que diseñan proyectos educativos en colaboración con el Museo inician un proceso de aprendizaje que pasa por salir de su espacio de trabajo personal,  y adquirir estrategias que faciliten su encuentro con el otro.',
                description2: '',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'Recordar-lo-vivido-recordar-lo-aprendido',
                title: 'Recordar-vivido-recordar-aprendido',
                subtitle: '',
                description: 'Resulta difícil evaluar los aprendizajes obtenidos en el museo, dado el carácter extraordinario o puntual de sus actividades. ¿Cómo se recuerdan estas actividades una vez transcurrido el tiempo?',
                description2: '',
                size: 35
            }
        ]
    },


    //TODO: remove this test cluster ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    {
        color: 0x3498DB,
        position: new THREE.Vector3( 0.0, 0.47, 0.0 ),
        name:  "Aprendizajes",
        slug:  "dummi",
        videos: [
            {
                url: 'url1',
                cover: 'url',
                slug: '01',
                title: 'Abordar un nuevo proyecto',
                subtitle: '',
                description: 'Diseñar un proyecto educativo implica desarrollar una colaboración. Cada proyecto es, desde su inicio, una construcción compartida y consensuada que aúna los conocimientos, experiencia e ideas de los artistas y educadores implicados.',
                description2: 'Una de las primeras reuniones para abordar el diseño del taller Habitar la pintura.Es el inicio de una colaboración y de un intercambio de saberes: cada proyecto aúna los conocimientos y experiencias de todos los artistas y educadores implicados.',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: '02',
                title: 'Aprender en distintos contextos',
                subtitle: '',
                description: '¿Se plantea igual el trabajo de creación plástica en el contexto educativo formal  y en el no formal? ¿Cómo es la educación artística dentro y fuera de la escuela, o cómo se perciben ambas? El video recoge la visión de varios niños.',
                description2: '',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: '03',
                title: 'Diversidad de aprendizajes',
                subtitle: '',
                description: 'La inmersión en los talleres implica aprendizajes explícitos como son los relativos al contenido del museo y las exposiciones, y otros implícitos que tienen que ver con la metodología de trabajo en grupo y la activación del pensamiento.',
                description2: 'La artista Almudena Lobera y las educadoras Elba Díaz y Ana Vaquero inciden en los variados aprendizajes, expresos o implícitos, que entran en juego al participar en un proceso creativo: desde los contenidos de las exposiciones hasta las dinámicas grupales.',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: '04',
                title: 'Aprendizaje del artista',
                subtitle: '',
                description: 'Los artistas que diseñan proyectos educativos en colaboración con el Museo inician un proceso de aprendizaje que pasa por salir de su espacio de trabajo personal,  y adquirir estrategias que faciliten su encuentro con el otro.',
                description2: '',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: '05',
                title: 'Recordar-vivido-recordar-aprendido',
                subtitle: '',
                description: 'Resulta difícil evaluar los aprendizajes obtenidos en el museo, dado el carácter extraordinario o puntual de sus actividades. ¿Cómo se recuerdan estas actividades una vez transcurrido el tiempo?',
                description2: '',
                size: 35
            }
        ]
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    {
        color: 0xE74C3C,
        position: new THREE.Vector3( 0.6, 0.47, 0.0 ),
        name:  "El taller como experiencia",
        slug:  "taller-como-experiencia",
        description: "Lorem ipsum dolor sit amet, ex vim altera consulatu disputationi, ea mediocrem quaerendum vel. Etiam congue audiam ea pri, has stet numquam id. Doming fuisset minimum cum eu, doctus copiosae gloriatur eum eu. Dolorum accumsan deterruisset no nam, alia dolores ad quo. Eam ad eros legere invenire. Erroribus philosophia te has, ut partem ornatus his.",
        videos: [
            {
                url: 'url1',
                cover: 'url',
                slug: 'percepcion-experiencia-arte',
                title: 'Percepción y experiencia del arte',
                subtitle: '',
                description: 'Se describe en el video una estrategia concreta trabajada con los niños para estimular una observación más atenta y una experiencia más intensa ante las obras de arte, y se reflexiona, asimismo, sobre las implicaciones de esta experiencia.',
                description2: '',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'diversificar-experiencia',
                title: 'Diversificar la experiencia',
                subtitle: '',
                description: '¿Cómo trabajar una misma exposición, un mismo contenido, durante cinco días? La interacción intensa entre el artista, la educadora, los niños, el museo y la exposición,  genera  cada día nuevas experiencias y aprendizajes.',
                description2: '',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'inmersion-exposiciones',
                title: 'Inmersión en las exposiciones',
                subtitle: '',
                description: 'El arte contemporáneo ofrece en ocasiones la oportunidad de adentrarse físicamente en una instalación. Las obras que propician la implicación del cuerpo generan una experiencia particularmente intensa, muy estimulante para los niños.',
                description2: '',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'arte-y-vida-diálogo',
                title: 'El arte y la vida, en diálogo',
                subtitle: '',
                description: 'En conversación con niñas y niños participantes en varios talleres, así como con la educadora y la artista Leonor Serrano, se incide en la creación artística como singular universo personal que a su vez interacciona con la vida y el entorno cotidianos.',
                description2: 'Varias voces, las de los niños participantes en un taller, la de una educadora y la de una artista, transmiten su particular visión sobre los lazos que unen la creación artística con la vida y el entorno cotidianos.',
                size: 35
            }
        ]
    },
    {
        color: 0x8E44AD,
        position: new THREE.Vector3( 0.6, -0.47, 0.0 ),
        name:  "El taller como proceso",
        slug:  "taller-como-proceso",
        description: "Lorem ipsum dolor sit amet, ex vim altera consulatu disputationi, ea mediocrem quaerendum vel. Etiam congue audiam ea pri, has stet numquam id. Doming fuisset minimum cum eu, doctus copiosae gloriatur eum eu. Dolorum accumsan deterruisset no nam, alia dolores ad quo. Eam ad eros legere invenire. Erroribus philosophia te has, ut partem ornatus his.",
        videos: [
            {
                url: 'url1',
                cover: 'url',
                slug: 'taller-obra-proceso',
                title: 'El taller, una obra en proceso',
                subtitle: '',
                description: 'A lo largo de un taller, las actividades planificadas por un artista se ven modificadas en tiempo real: la inmediatez obliga a corregir errores, incorporar las sugerencias de los niños y asumir sus necesidades. Leonor Serrano lo explica en relación al taller A jugar.',
                description2: '',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'artista-museo-aunando-formas-trabajo',
                title: 'El artista, el museo: aunando formas de trabajo',
                subtitle: '',
                description: 'Cuando un artista inicia un proyecto educativo en el Museo, se integra también en las dinámicas de trabajo de sus profesionales. Las fases previas en el desarrollo de un taller son esenciales para compatibilizar los respectivos estilos de trabajo.',
                description2: '',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'niños-re-crean-taller',
                title: 'Los niños re-crean el taller',
                subtitle: '',
                description: 'Son siempre los participantes quienes definen en última instancia un taller de creación, modificando y re-creando las actividades diseñadas por el artista. Los profesionales de la educación evalúan después estas modificaciones para mejorar sus propuestas en el futuro.',
                description2: 'Ignacio Chávarri, autor del taller Construir universos, destaca el papel  de los niños como re-creadores de un taller, ya que siempre modifican las propuestas del artista. La evaluación posterior de estas modificaciones proporciona un valioso aprendizaje de cara al diseño de nuevos talleres.',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'tiempo-creatividad',
                title: 'Tiempo y creatividad',
                subtitle: '',
                description: ' Una breve reflexión en torno a la importancia que tienen las variables de tiempo, espacio y materiales para estimular procesos creativos. Generar y desarrollar ideas requiere una expansión de esas variables: la creación tiene su tiempo.',
                description2: '',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'continua-revision',
                title: 'En continua revisión',
                subtitle: '',
                description: ' Los talleres con artistas se ofrecen durante un mes, con grupos de niños que cambian semanalmente. Semana a semana, los talleres se someten a un replanteamiento continuo con el fin de alcanzar los objetivos propuestos, o de modificarlos.',
                description2: '',
                size: 35
            }
        ]
    },
    {
        color: 0x3498DB,
        position: new THREE.Vector3( -0.6, -0.47, 0.0 ),
        name:  "Autonomía y retos",
        slug:  "autonomia-retos",
        description: "Lorem ipsum dolor sit amet, ex vim altera consulatu disputationi, ea mediocrem quaerendum vel. Etiam congue audiam ea pri, has stet numquam id. Doming fuisset minimum cum eu, doctus copiosae gloriatur eum eu. Dolorum accumsan deterruisset no nam, alia dolores ad quo. Eam ad eros legere invenire. Erroribus philosophia te has, ut partem ornatus his.",
        videos: [
            {
                url: 'url1',
                cover: 'url',
                slug: 'decisiones-compartidas',
                title: 'Decisiones compartidas',
                subtitle: '',
                description: 'A lo largo de un taller, las actividades planificadas por un artista se ven modificadas en tiempo real: la inmediatez obliga a corregir errores, incorporar las sugerencias de los niños y asumir sus necesidades. Leonor Serrano lo explica en relación al taller A jugar.',
                description2: 'Varios niños participan en la elaboración de una pintura llevada a la tercera dimensión, en el taller Habitar la pintura con Miren Doiz. Su obra será resultado tanto de las aportaciones individuales, como de las decisiones y realizaciones grupales.',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'iniciativa-del-nino',
                title: 'Iniciativa del niño',
                subtitle: '',
                description: 'A pesar de su organización y estructura internas, los talleres creativos impulsados por los museos abren espacios de ideación más libres que los que se dan en otros contextos educativos. Así lo perciben tanto los participantes como los profesionales.',
                description2: '',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'superar-dificultades',
                title: 'Superar dificultades',
                subtitle: '',
                description: 'Hay cosas que sólo pueden aprenderse durante el mismo proceso de hacerlas, resolviendo las dificultades según éstas se van presentando. Ignacio Chávarri describe cómo lo lograban los niños que participaron en el taller Construir universos.',
                description2: '',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'espacios-para-cambio',
                title: 'Espacios para el cambio',
                subtitle: '',
                description: 'Participar en un proceso de creación significa partir de una realidad, pensar cómo modificarla, hacerlo y, así, hacerse conscientes de que podemos cambiar las cosas. Es uno de los principales aprendizajes que puede proporcionar la educación artística.',
                description2: 'La artista Miren Doiz y varias participantes en el taller Habitar la pintura describen los cambios que han imprimido al espacio de taller en el que trabajaron: participar en un proceso artístico implica hacernos conscientes de que podemos modificar ciertas realidades.',
                size: 35
            }
        ]
    },
    {
        color: 0x1ABC9C,
        position: new THREE.Vector3( -0.6, 0.45, 0.0 ),
        name:  "Arte educación transformación",
        slug:  "arte-educacion-transformacion",
        videos: [
            {
                url: 'url1',
                cover: 'url',
                slug: 'arte-como-motor-transformacion',
                title: 'Arte como motor de transformación',
                subtitle: '',
                description: 'Los talleres con artistas desarrollados en el Museo han supuesto en muchos casos la posibilidad de modificar radicalmente un espacio: una exploración, quizás, de la capacidad transformadora del arte, y en definitiva, de nuestro potencial transformador.',
                description2: 'Imágenes de los talleres "Reinventar el espacio" y "A jugar". En ambos casos, se propone a los participantes modificar un espacio de forma sustancial, ya sea el propio taller de trabajo, o espacios públicos del Museo. Una exploración de nuestro potencial transformador.',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'sobre-presencia-artistas-educacion',
                title: 'Sobre la presencia de artistas en la educación',
                subtitle: '',
                description: '¿Por qué implicar artistas en procesos educativos? ¿Cuál es su papel? ¿Cuál es su aportación? Tres de los artistas jóvenes que han colaborado con el Museo nos dan su opinión al respecto.',
                description2: '',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'vinculos-entre-educacion-creacion-joven',
                title: 'Vínculos entre la educación y la creación joven',
                subtitle: '',
                description: 'Un Museo como el Reina Sofía debe estar al tanto de las inquietudes que alientan a los nuevos creadores. El departamento educativo establece vínculos con la creación joven ofreciendo una posibilidad de trabajo en el campo educativo.',
                description2: '',
                size: 35
            },
            {
                url: 'url1',
                cover: 'url',
                slug: 'puede-proyecto-educativo-cambiar-trayectoria-artista',
                title: '¿Puede un proyecto educativo cambiar la trayectoria de un artista?',
                subtitle: '',
                description: 'Los cinco artistas que han colaborado con el Museo diseñando los talleres de verano describen en qué medida les ha afectado esta experiencia. A veces cambia la manera de concebir su propia creación, a veces se abren opciones profesionales.',
                description2: '',
                size: 35
            }
        ]
    }
];
