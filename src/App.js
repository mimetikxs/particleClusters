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

    buttonTemplate : ""

}


// data

APP.data = [
    {
        color: 0xF39C12,
        position: new THREE.Vector3( 0.0, 0.0, 0.0 ),
        name:  "Category 1",
        slug:  "category-1",
        description: "Lorem ipsum dolor sit amet, ex vim altera consulatu disputationi, ea mediocrem quaerendum vel. Etiam congue audiam ea pri, has stet numquam id. Doming fuisset minimum cum eu, doctus copiosae gloriatur eum eu. Dolorum accumsan deterruisset no nam, alia dolores ad quo. Eam ad eros legere invenire. Erroribus philosophia te has, ut partem ornatus his.",
        videos: [
            {
                url: 'url1',
                cover: 'url',
                title: 'video 1',
                subtitle: '',
                description: '',
                slug: 'video-1',
                size: 35
            },
            {
                url: 'url2',
                cover: 'url',
                title: 'video 2',
                subtitle: '',
                description: '',
                slug: 'video-2',
                size: 30
            },
            {
                url: 'url3',
                cover: 'url',
                title: 'video 3',
                subtitle: '',
                description: '',
                slug: 'video-3',
                size: 35
            }
        ]
    },
    {
        color: 0xE74C3C,
        position: new THREE.Vector3( 0.6, 0.47, 0.0 ),
        name:  "Category 2",
        slug:  "category-2",
        description: "Lorem ipsum dolor sit amet, ex vim altera consulatu disputationi, ea mediocrem quaerendum vel. Etiam congue audiam ea pri, has stet numquam id. Doming fuisset minimum cum eu, doctus copiosae gloriatur eum eu. Dolorum accumsan deterruisset no nam, alia dolores ad quo. Eam ad eros legere invenire. Erroribus philosophia te has, ut partem ornatus his.",
        videos: [
            {
                url: 'url',
                cover: 'url',
                title: 'video 1',
                subtitle: '',
                description: '',
                slug: 'video-1',
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
                title: 'video 2',
                subtitle: '',
                description: '',
                slug: 'video-2',
                size: 30
            },
            {
                url: 'url',
                cover: 'url',
                title: 'video 3',
                subtitle: '',
                description: '',
                slug: 'video-3',
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
                title: 'video 4',
                subtitle: '',
                description: '',
                slug: 'video-4',
                size: 28
            },
            {
                url: 'url',
                cover: 'url',
                title: 'video 5',
                subtitle: '',
                description: '',
                slug: 'video-5',
                size: 30
            }
        ]
    },
    {
        color: 0x8E44AD,
        position: new THREE.Vector3( 0.6, -0.47, 0.0 ),
        name:  "cluster 3",
        slug:  "category-3",
        description: "Lorem ipsum dolor sit amet, ex vim altera consulatu disputationi, ea mediocrem quaerendum vel. Etiam congue audiam ea pri, has stet numquam id. Doming fuisset minimum cum eu, doctus copiosae gloriatur eum eu. Dolorum accumsan deterruisset no nam, alia dolores ad quo. Eam ad eros legere invenire. Erroribus philosophia te has, ut partem ornatus his.",
        videos: [
            {
                url: 'url',
                cover: 'url',
                title: 'video 1',
                subtitle: '',
                description: '',
                slug: 'video-1',
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
                title: 'video 2',
                subtitle: '',
                description: '',
                slug: 'video-2',
                size: 30
            },
            {
                url: 'url',
                cover: 'url',
                title: 'video 3',
                subtitle: '',
                description: '',
                slug: 'video-3',
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
                title: 'video 4',
                subtitle: '',
                description: '',
                slug: 'video-4',
                size: 28
            }
        ]
    },
    {
        color: 0x3498DB,
        position: new THREE.Vector3( -0.6, -0.47, 0.0 ),
        name:  "Category 4",
        slug:  "category-4",
        description: "Lorem ipsum dolor sit amet, ex vim altera consulatu disputationi, ea mediocrem quaerendum vel. Etiam congue audiam ea pri, has stet numquam id. Doming fuisset minimum cum eu, doctus copiosae gloriatur eum eu. Dolorum accumsan deterruisset no nam, alia dolores ad quo. Eam ad eros legere invenire. Erroribus philosophia te has, ut partem ornatus his.",
        videos: [
            {
                url: 'url',
                cover: 'url',
                title: 'video 1',
                subtitle: '',
                description: '',
                slug: 'video-1',
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
                title: 'video 2',
                subtitle: '',
                description: '',
                slug: 'video-2',
                size: 30
            },
            {
                url: 'url',
                cover: 'url',
                title: 'video 3',
                subtitle: '',
                description: '',
                slug: 'video-3',
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
                title: 'video 4',
                subtitle: '',
                description: '',
                slug: 'video-4',
                size: 28
            }
        ]
    },
    {
        color: 0x1ABC9C,
        position: new THREE.Vector3( -0.6, 0.45, 0.0 ),
        name:  "Category 5",
        slug:  "category-5",
        description: "Lorem ipsum dolor sit amet, ex vim altera consulatu disputationi, ea mediocrem quaerendum vel. Etiam congue audiam ea pri, has stet numquam id. Doming fuisset minimum cum eu, doctus copiosae gloriatur eum eu. Dolorum accumsan deterruisset no nam, alia dolores ad quo. Eam ad eros legere invenire. Erroribus philosophia te has, ut partem ornatus his.",
        videos: [
            {
                url: 'url',
                cover: 'url',
                title: 'video 1',
                subtitle: '',
                description: '',
                slug: 'video-1',
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
                title: 'video 2',
                subtitle: '',
                description: '',
                slug: 'video-2',
                size: 30
            },
            {
                url: 'url',
                cover: 'url',
                title: 'video 3',
                subtitle: '',
                description: '',
                slug: 'video-3',
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
                title: 'video 4',
                subtitle: '',
                description: '',
                slug: 'video-4',
                size: 28
            },
            {
                url: 'url',
                cover: 'url',
                title: 'video 5',
                subtitle: '',
                description: '',
                slug: 'video-5',
                size: 30
            }
        ]
    }
];
