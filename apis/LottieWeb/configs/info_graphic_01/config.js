

var config_infographic_01 = (function() {

    var config_01_01 = {
        infographic: {
            width: 1280,
            height: 1280,
            content_height: 300,
            paddingLeftRight: 20,
            c_paddingTop: 60,
            footer_height: 0,
            background: "#e3d1a2"
        },
        location: {
            name: {
                fontSize: "64px",
                fontFamily: "Roboto",
                color: "#d0363b",
                fontWeight: "bold",
                textAnchor: "start",
                textTransform: "uppercase"
            },
            description: {
               fontSize: "48px",
               fontFamily: "Roboto",
               color: "#121113",
               textAnchor: "start",
            },  
            paddingTop: 30,
            lineNumber: 1
        },
        footer: {
            marginBottom: 80,
            marginRight: 200,
            imageWidth: 180,
            imageHeight: 60
        }
    }

    var config_01_02 = {
        infographic: {
            width: 1280,
            height: 1500,            
            paddingLeftRight: 10,
            paddingBottom: 10,
            background: "rgb(254, 255, 246)"
        },
        header: {            
            height: 170,
            background: "rgb(254, 255, 246)",
            tripName: {
                color: "rgb(0, 0, 0)",
                font: "Roboto",
                fontSize: "64px",
                textAnchor: "middle",
                fontWeight: "bold",
                textTransform: "uppercase",
            },
            tripDescription: {
                color: "rgb(0, 0, 0)",
                font: "Roboto",
                fontSize: "52px",
                textAnchor: "middle",
            }
        },
        imageContainer: {
            svgWidth: 630,
            svgHeight: 840,
            viewBoxWidth: 288.5,
            viewBoxHeight: 384.1,
            clipPath: "M2.5 2.5H286v379.1H2.5z",
            paddingTop: 20,
            paddingBetweenImage: 5,
        },
        location: {
            name: {
                color: "#121113",
                font: "Roboto",
                fontSize: "64px",
                fontWeight: "bold",
                textAnchor: "start",
                textTransform: "uppercase",
            },
            description: {
                color: "#121113",
                font: "Roboto",
                fontSize: "48px",
                textAnchor: "start",
            },
            paddingTop: 30,
            lineNumber: 1
        },
        footer: {
            height: 70,
            marginBottom: 80,
            marginRight: 200,
            imageWidth: 180,
            imageHeight: 60
        }  
    };

    config_01_0304 = {
        infographic: {
            width: 940,
            height: 1500,
            paddingLeftRight: 10,
            background: "#e3d1a2"
        },
        header: {
            height: 170,
            background: "#d0363b",
            tripName: {
                color: "#e3d1a2",
                font: "Roboto",
                fontSize: "54px",
                textAnchor: "middle",
                textTransform: "uppercase",
                paddingTop: 50,
            },
            tripDescription: {
                color: "#e3d1a2",
                font: "Roboto",
                fontSize: "42px",
                textAnchor: "middle",
                paddingTop: 40,
            }       
        },
        content: {
            paddingTop: 60,
            paddingBottom: 20,
            itemHeight: 250,
            pathStroke: "#121113",
            pathStrokeWidth: "4",
            nodeColor: "red",
            circleRadius: 12
        },
        location: {
            paddingPath: 20,
            lineNumber: 1,
            linePadding: 20,
            name: {
                color: "#d0363b",
                font: "Roboto",
                fontSize: "40px",
                fontWeight: "bold",
                textAnchorEven: "start",
                textAnchorOdd: "end",
                textTransform: "uppercase",
            },
            description: {
                color: "#121113",
                font: "Roboto",
                fontSize: "32px",
                textAnchorEven: "start",
                textAnchorOdd: "end",
            },
            image: {
                svgWidth: 208,
                svgHeight: 202,
                clipPath: "M269 366.5c-2.2.6-3.9 1.4-5.6 1.6-9.6.8-19.1 1.6-28.7 2.3-4.9.3-9.8.6-14.7.7-5.3.2-10.6.5-15.8.3-5-.1-10-.4-14.8-1.3-6.2-1.1-12.5-1.1-18.6-2.1-15.9-2.6-32.1-1.9-48.1-3-9-.6-18-2-27-3.2-10.2-1.3-20.4-2.8-30.7-4.2-7.5-1-15.1-2-22.6-3-.2 0-.4-.1-.6-.1-6.3-2.7-13-4.8-18.8-8.3-9.8-6-14-15.6-14.4-26.9-.1-3.9-.6-7.7-.6-11.6.1-5.4.5-10.7.8-16 .8-15.8 1.2-31.6 0-47.4-1.1-14.2-2.1-28.3-3.2-42.5-.7-9.1-1.6-18.1-2.2-27.2-.4-6-.3-12.1-.7-18.1-.2-3.4-1.3-6.7-1.4-10.1-.4-8.2-.5-16.5-.7-24.8-.1-3.2-.6-6.4-.5-9.6.1-5 .7-10 .8-15C1 91.2.4 85.4.6 79.7c0-5.5.7-10.9 1.4-16.4.2-1.9 1.6-3.6 2-5.5 1.7-9.4 3.5-18.8 7.9-27.5 1-1.9 2.6-3.6 4.1-5.1.5-.5 1.7-.2 2-.2.7-1.3 1.1-2.6 1.9-3.2 4.3-3.3 8.8-5.7 14.4-6.3 4.2-.5 8.3-2.3 12.5-3.3C51.9 11 57 9.6 62.3 8.9c4.8-.6 9.4-1.9 14.3-2.3 5-.4 10-1.6 15.1-2 13.8-1 27.7-1.7 41.5-2.5 3.4-.2 6.8 0 10.2.1 1.7.1 3.4.5 5.2.7.8.1 1.6-.2 2.4-.2 2.4 0 4.9 0 7.3-.1 4.6-.2 9.3-.7 13.9-.7 4.5 0 9 .3 13.5.5h3.6c5.5-.2 10.9-.2 16.4-.5 5.3-.3 10.5-1 15.8-1.3 2.5-.2 5.1-.2 7.6.3 3.8.7 7.4 1.1 11.2 0 1.4-.4 3.2.3 4.8.5.7.1 1.5.3 1.9 0 2.7-2 5.2-1.5 7.8.2.3.2 1.1-.3 1.7-.3 2.4 0 4.8 0 7.3.1 1.8.1 3.5.7 5.3.9 3.9.5 7.9 1.3 11.9 1.3 7.5.1 15 .4 22.4 2 6.9 1.5 14 1.5 21 2.7 4.2.7 8.5 2 12.1 4.1 3.9 2.2 6.9 5.8 10.4 8.8 1.3 1.1 3.2 1.9 4.1 3.3 2.6 3.8 4.9 7.8 7.2 11.8 1.7 2.9 3.4 5.9 4.7 8.9 1.4 3.5 2.5 7.1 3.6 10.8 1.7 5.8 3.7 11.6 4.8 17.6 1.6 8.4 2.4 17 3.6 25.5.4 2.8.9 5.6 1.1 8.4.6 8 1 15.9 1.5 23.9.7 9.9 1.7 19.7 2.2 29.6.5 9.5.9 19.1.7 28.7-.3 16-1.1 31.9-1.9 47.9-.5 9.9-1.2 19.7-2.2 29.5s-2.5 19.5-3.6 29.3c-.8 6.8-1 13.6-1.9 20.3-.8 6.1-3.8 11.5-7.8 16-3.3 3.8-5.9 8.1-9.3 11.8-3 3.3-6.3 6.6-11.5 6.7-1.2 0-2.3 1.2-3.5 1.8-5.1 2.2-10.4 4.1-15.4 6.5-9.2 4.4-19.1 5.1-29 5.5-3.8.2-7.7-.1-11.5.2-1.9.1-3.7 1-5.5 1.4-.8.2-1.6.1-2.5.2-1.2.1-2.4.4-3.6.3-1.2-.2-2-.6-2.2-.6z",
                paddingTop: 40,              
                viewBoxWidth: 380,
                viewBoxHeight: 371
            }            
        },
        footer: {
            height: 70,
            marginBottom: 80,
            marginRight: 200,
            imageWidth: 180,
            imageHeight: 60
        }
    };

    var config_01_0506 = {
        infographic: {
            width: 1280,
            height: 2600,
            paddingLeftRight: 10,
            background: "#e3d1a2"
        },
        header: {
            height: 300,
            background: "#d0363b",
            tripName: {
                color: "#e3d1a2",
                font: "Roboto",
                fontSize: "64px",
                textAnchor: "middle",
                textTransform: "uppercase",
                paddingTop: 100,
            },
            tripDescription: {
                color: "#e3d1a2",
                font: "Roboto",
                fontSize: "54px",
                textAnchor: "middle",
                paddingTop: 50,
            }       
        },
        content: {
            paddingTop: 60,
            paddingBottom: 40,
            itemHeight: 350,
            pathStroke: "#121113",
            pathStrokeWidth: "6",
            nodeColor: "red",
            circleRadius: 16
        },
        location: {
            paddingPath: 40,
            lineNumber: 1,
            linePadding: 30,
            name: {
                color: "#d0363b",
                font: "Roboto",
                fontSize: "52px",
                fontWeight: "bold",
                textAnchorEven: "start",
                textAnchorOdd: "end",
                textTransform: "uppercase",
            },
            description: {
                color: "#121113",
                font: "Roboto",
                fontSize: "44px",
                textAnchorEven: "start",
                textAnchorOdd: "end",
            },
            image: {
                svgWidth: 290,
                svgHeight: 282,
                clipPath: "M269 366.5c-2.2.6-3.9 1.4-5.6 1.6-9.6.8-19.1 1.6-28.7 2.3-4.9.3-9.8.6-14.7.7-5.3.2-10.6.5-15.8.3-5-.1-10-.4-14.8-1.3-6.2-1.1-12.5-1.1-18.6-2.1-15.9-2.6-32.1-1.9-48.1-3-9-.6-18-2-27-3.2-10.2-1.3-20.4-2.8-30.7-4.2-7.5-1-15.1-2-22.6-3-.2 0-.4-.1-.6-.1-6.3-2.7-13-4.8-18.8-8.3-9.8-6-14-15.6-14.4-26.9-.1-3.9-.6-7.7-.6-11.6.1-5.4.5-10.7.8-16 .8-15.8 1.2-31.6 0-47.4-1.1-14.2-2.1-28.3-3.2-42.5-.7-9.1-1.6-18.1-2.2-27.2-.4-6-.3-12.1-.7-18.1-.2-3.4-1.3-6.7-1.4-10.1-.4-8.2-.5-16.5-.7-24.8-.1-3.2-.6-6.4-.5-9.6.1-5 .7-10 .8-15C1 91.2.4 85.4.6 79.7c0-5.5.7-10.9 1.4-16.4.2-1.9 1.6-3.6 2-5.5 1.7-9.4 3.5-18.8 7.9-27.5 1-1.9 2.6-3.6 4.1-5.1.5-.5 1.7-.2 2-.2.7-1.3 1.1-2.6 1.9-3.2 4.3-3.3 8.8-5.7 14.4-6.3 4.2-.5 8.3-2.3 12.5-3.3C51.9 11 57 9.6 62.3 8.9c4.8-.6 9.4-1.9 14.3-2.3 5-.4 10-1.6 15.1-2 13.8-1 27.7-1.7 41.5-2.5 3.4-.2 6.8 0 10.2.1 1.7.1 3.4.5 5.2.7.8.1 1.6-.2 2.4-.2 2.4 0 4.9 0 7.3-.1 4.6-.2 9.3-.7 13.9-.7 4.5 0 9 .3 13.5.5h3.6c5.5-.2 10.9-.2 16.4-.5 5.3-.3 10.5-1 15.8-1.3 2.5-.2 5.1-.2 7.6.3 3.8.7 7.4 1.1 11.2 0 1.4-.4 3.2.3 4.8.5.7.1 1.5.3 1.9 0 2.7-2 5.2-1.5 7.8.2.3.2 1.1-.3 1.7-.3 2.4 0 4.8 0 7.3.1 1.8.1 3.5.7 5.3.9 3.9.5 7.9 1.3 11.9 1.3 7.5.1 15 .4 22.4 2 6.9 1.5 14 1.5 21 2.7 4.2.7 8.5 2 12.1 4.1 3.9 2.2 6.9 5.8 10.4 8.8 1.3 1.1 3.2 1.9 4.1 3.3 2.6 3.8 4.9 7.8 7.2 11.8 1.7 2.9 3.4 5.9 4.7 8.9 1.4 3.5 2.5 7.1 3.6 10.8 1.7 5.8 3.7 11.6 4.8 17.6 1.6 8.4 2.4 17 3.6 25.5.4 2.8.9 5.6 1.1 8.4.6 8 1 15.9 1.5 23.9.7 9.9 1.7 19.7 2.2 29.6.5 9.5.9 19.1.7 28.7-.3 16-1.1 31.9-1.9 47.9-.5 9.9-1.2 19.7-2.2 29.5s-2.5 19.5-3.6 29.3c-.8 6.8-1 13.6-1.9 20.3-.8 6.1-3.8 11.5-7.8 16-3.3 3.8-5.9 8.1-9.3 11.8-3 3.3-6.3 6.6-11.5 6.7-1.2 0-2.3 1.2-3.5 1.8-5.1 2.2-10.4 4.1-15.4 6.5-9.2 4.4-19.1 5.1-29 5.5-3.8.2-7.7-.1-11.5.2-1.9.1-3.7 1-5.5 1.4-.8.2-1.6.1-2.5.2-1.2.1-2.4.4-3.6.3-1.2-.2-2-.6-2.2-.6z",
                paddingTop: 40,              
                viewBoxWidth: 380,
                viewBoxHeight: 371
            }            
        },
        footer: {
            height: 100,
            marginBottom: 80,
            marginRight: 200,
            imageWidth: 180,
            imageHeight: 60
        }
    }

    var config_01_others = {
        infographic: {
            width: 2060,
            height: 4200,
            paddingLeftRight: 10,
            background: "#e3d1a2"
        },
        header: {
            height: 370,
            background: "#d0363b",            
            tripName: {
                color: "#e3d1a2",
                font: "Roboto",
                fontSize: "84px",
                textAnchor: "middle",
                textTransform: "uppercase",
                paddingTop: 130,
            },
            tripDescription: {
                color: "#e3d1a2",
                font: "Roboto",
                fontSize: "74px",
                textAnchor: "middle",
                paddingTop: 70
            }       
        },
        content: {
            paddingTop: 60,
            paddingBottom: 40,
            itemHeight: 440,
            pathStroke: "#121113",
            pathStrokeWidth: "10",
            nodeColor: "red",
            circleRadius: 24
        },
        location: {
            paddingPath: 40,
            lineNumber: 1,
            linePadding: 40,
            name: {
                color: "#d0363b",
                font: "Roboto",
                fontSize: "64px",
                fontWeight: "bold",
                textAnchorEven: "start",
                textAnchorOdd: "end",
                textTransform: "uppercase",
            },
            description: {
                color: "#121113",
                font: "Roboto",
                fontSize: "56px",
                textAnchorEven: "start",
                textAnchorOdd: "end",
            },
            image: {
                svgWidth: 360,
                svgHeight: 352,
                clipPath: "M269 366.5c-2.2.6-3.9 1.4-5.6 1.6-9.6.8-19.1 1.6-28.7 2.3-4.9.3-9.8.6-14.7.7-5.3.2-10.6.5-15.8.3-5-.1-10-.4-14.8-1.3-6.2-1.1-12.5-1.1-18.6-2.1-15.9-2.6-32.1-1.9-48.1-3-9-.6-18-2-27-3.2-10.2-1.3-20.4-2.8-30.7-4.2-7.5-1-15.1-2-22.6-3-.2 0-.4-.1-.6-.1-6.3-2.7-13-4.8-18.8-8.3-9.8-6-14-15.6-14.4-26.9-.1-3.9-.6-7.7-.6-11.6.1-5.4.5-10.7.8-16 .8-15.8 1.2-31.6 0-47.4-1.1-14.2-2.1-28.3-3.2-42.5-.7-9.1-1.6-18.1-2.2-27.2-.4-6-.3-12.1-.7-18.1-.2-3.4-1.3-6.7-1.4-10.1-.4-8.2-.5-16.5-.7-24.8-.1-3.2-.6-6.4-.5-9.6.1-5 .7-10 .8-15C1 91.2.4 85.4.6 79.7c0-5.5.7-10.9 1.4-16.4.2-1.9 1.6-3.6 2-5.5 1.7-9.4 3.5-18.8 7.9-27.5 1-1.9 2.6-3.6 4.1-5.1.5-.5 1.7-.2 2-.2.7-1.3 1.1-2.6 1.9-3.2 4.3-3.3 8.8-5.7 14.4-6.3 4.2-.5 8.3-2.3 12.5-3.3C51.9 11 57 9.6 62.3 8.9c4.8-.6 9.4-1.9 14.3-2.3 5-.4 10-1.6 15.1-2 13.8-1 27.7-1.7 41.5-2.5 3.4-.2 6.8 0 10.2.1 1.7.1 3.4.5 5.2.7.8.1 1.6-.2 2.4-.2 2.4 0 4.9 0 7.3-.1 4.6-.2 9.3-.7 13.9-.7 4.5 0 9 .3 13.5.5h3.6c5.5-.2 10.9-.2 16.4-.5 5.3-.3 10.5-1 15.8-1.3 2.5-.2 5.1-.2 7.6.3 3.8.7 7.4 1.1 11.2 0 1.4-.4 3.2.3 4.8.5.7.1 1.5.3 1.9 0 2.7-2 5.2-1.5 7.8.2.3.2 1.1-.3 1.7-.3 2.4 0 4.8 0 7.3.1 1.8.1 3.5.7 5.3.9 3.9.5 7.9 1.3 11.9 1.3 7.5.1 15 .4 22.4 2 6.9 1.5 14 1.5 21 2.7 4.2.7 8.5 2 12.1 4.1 3.9 2.2 6.9 5.8 10.4 8.8 1.3 1.1 3.2 1.9 4.1 3.3 2.6 3.8 4.9 7.8 7.2 11.8 1.7 2.9 3.4 5.9 4.7 8.9 1.4 3.5 2.5 7.1 3.6 10.8 1.7 5.8 3.7 11.6 4.8 17.6 1.6 8.4 2.4 17 3.6 25.5.4 2.8.9 5.6 1.1 8.4.6 8 1 15.9 1.5 23.9.7 9.9 1.7 19.7 2.2 29.6.5 9.5.9 19.1.7 28.7-.3 16-1.1 31.9-1.9 47.9-.5 9.9-1.2 19.7-2.2 29.5s-2.5 19.5-3.6 29.3c-.8 6.8-1 13.6-1.9 20.3-.8 6.1-3.8 11.5-7.8 16-3.3 3.8-5.9 8.1-9.3 11.8-3 3.3-6.3 6.6-11.5 6.7-1.2 0-2.3 1.2-3.5 1.8-5.1 2.2-10.4 4.1-15.4 6.5-9.2 4.4-19.1 5.1-29 5.5-3.8.2-7.7-.1-11.5.2-1.9.1-3.7 1-5.5 1.4-.8.2-1.6.1-2.5.2-1.2.1-2.4.4-3.6.3-1.2-.2-2-.6-2.2-.6z",
                paddingTop: 40,
                viewBoxWidth: 380,
                viewBoxHeight: 371
            }            
        },
        footer: {
            height: 100,
            marginBottom: 80,
            marginRight: 200,
            imageWidth: 180,
            imageHeight: 60
        }
    }

    return {
        config_01_01: config_01_01,
        config_01_02: config_01_02,
        config_01_0304: config_01_0304,
        config_01_0506: config_01_0506,
        config_01_others: config_01_others
    }
})();