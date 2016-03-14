var APP = APP || {};

// defaults

APP.parameters = {

    cluster_radius:       220.0,
    surface_strength:     0.0037,
    central_attraction:   91.0,
    mouse_attraction:     -14.0,

    spring_strength_interactive:     0.022,
    spring_length_interactive:       163,
    attraction_strength_interactive: 16,

    gravity:              0.75,
    background_darkness:  0.0

};

APP.clusterStates = {

    default : {
        cluster_radius:       220.0,
        surface_strength:     0.0037,
        central_attraction:   91.0,
        mouse_attraction:     -14.0,
        spring_strength_interactive:     0.022,
        spring_length_interactive:       163,
        attraction_strength_interactive: 16,
    },

    opened : {
        cluster_radius:       220.0,
        surface_strength:     0.0037,
        central_attraction:   -611,
        mouse_attraction:     -14.0,
        spring_strength_interactive:     0.052,
        spring_length_interactive:       126,
        attraction_strength_interactive: 136,
    },

    closed : {
        cluster_radius:       220.0,
        surface_strength:     0.0019,
        central_attraction:   220,
        mouse_attraction:     -14.0,
        spring_strength_interactive:     0,
        spring_length_interactive:       0,
        attraction_strength_interactive: 345,
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
                size: 35
            },
            {
                url: 'url2',
                cover: 'url',
                size: 30
            },
            {
                url: 'url3',
                cover: 'url',
                size: 35
            }
        ]
    },
    {
        color: 0xE74C3C,
        position: new THREE.Vector3( 0.6, 0.45, 0.0 ),
        name:  "Category 2",
        slug:  "category-2",
        description: "Lorem ipsum dolor sit amet, ex vim altera consulatu disputationi, ea mediocrem quaerendum vel. Etiam congue audiam ea pri, has stet numquam id. Doming fuisset minimum cum eu, doctus copiosae gloriatur eum eu. Dolorum accumsan deterruisset no nam, alia dolores ad quo. Eam ad eros legere invenire. Erroribus philosophia te has, ut partem ornatus his.",
        videos: [
            {
                url: 'url',
                cover: 'url',
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
                size: 30
            },
            {
                url: 'url',
                cover: 'url',
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
                size: 28
            },
            {
                url: 'url',
                cover: 'url',
                size: 30
            }
        ]
    },
    {
        color: 0x8E44AD,
        position: new THREE.Vector3( 0.6, -0.45, 0.0 ),
        name:  "cluster 3",
        slug:  "category-3",
        description: "Lorem ipsum dolor sit amet, ex vim altera consulatu disputationi, ea mediocrem quaerendum vel. Etiam congue audiam ea pri, has stet numquam id. Doming fuisset minimum cum eu, doctus copiosae gloriatur eum eu. Dolorum accumsan deterruisset no nam, alia dolores ad quo. Eam ad eros legere invenire. Erroribus philosophia te has, ut partem ornatus his.",
        videos: [
            {
                url: 'url',
                cover: 'url',
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
                size: 30
            },
            {
                url: 'url',
                cover: 'url',
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
                size: 28
            }
        ]
    },
    {
        color: 0x3498DB,
        position: new THREE.Vector3( -0.6, -0.45, 0.0 ),
        name:  "Category 4",
        slug:  "category-4",
        description: "Lorem ipsum dolor sit amet, ex vim altera consulatu disputationi, ea mediocrem quaerendum vel. Etiam congue audiam ea pri, has stet numquam id. Doming fuisset minimum cum eu, doctus copiosae gloriatur eum eu. Dolorum accumsan deterruisset no nam, alia dolores ad quo. Eam ad eros legere invenire. Erroribus philosophia te has, ut partem ornatus his.",
        videos: [
            {
                url: 'url',
                cover: 'url',
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
                size: 30
            },
            {
                url: 'url',
                cover: 'url',
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
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
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
                size: 30
            },
            {
                url: 'url',
                cover: 'url',
                size: 35
            },
            {
                url: 'url',
                cover: 'url',
                size: 28
            },
            {
                url: 'url',
                cover: 'url',
                size: 30
            }
        ]
    }
];
