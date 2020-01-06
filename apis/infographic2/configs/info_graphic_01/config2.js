var config_01_01 = {
    width: 1280,
    backgroundColor: "#e3d1a2",
    type: "container",
    blocks: [
        {
            type: "location",
            blocks: [
                {
                    type: "container",
                    positioning: {
                        height: 1280
                    },
                    blocks: [
                        {
                            type: "location-image",
                            width: 1280,
                            height: 1280
                        }
                    ]
                },
                {
                    type: "container",
                    // content_height: 300,
                    positioning: {
                        height: 300
                    },
                    blocks: [
                        {
                            // location name
                            type: "text",
                            text: "{{location.name}}",
                            fontSize: "64px",
                            fontFamily: "Roboto",
                            color: "#d0363b",
                            fontWeight: "bold",
                            textAnchor: "start",
                            textTransform: "uppercase",
                            positioning: {
                                top: 20,
                                left: 20
                            }
                        },
                        {
                            // location feeling
                            type: "text",
                            text: "{{location.feeling}}",
                            fontSize: "48px",
                            fontFamily: "Roboto",
                            color: "#121113",
                            textAnchor: "start",
                            positioning: {
                                top: 20,
                                left: 20
                            }
                        },
                        {
                            // location highlights
                            type: "text",
                            text: "{{location.hight-lights}}",
                            fontSize: "48px",
                            fontFamily: "Roboto",
                            color: "#121113",
                            textAnchor: "start",
                            positioning: {
                                top: 20,
                                left: 20
                            }
                        }
                    ]
                }
            ]
        },
        {
            // render footer image
            type: "image",
            url: "./data/images/App_Signature.png",
            positioning: {
                right: 200,
                bottom: 80
            }
        }
    ]
};
var config_01_02 = {
    width: 1280,
    // height: 1500,
    backgroundColor: "rgb(254, 255, 246)",
    type: "container",
    blocks: [
        {
            type: "container",
            positioning: {
                height: 300
            },
            blocks: [
                {
                    type: "text",
                    color: "rgb(0, 0, 0)",
                    fontFamily: "Roboto",
                    fontSize: "64px",
                    textAnchor: "middle",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    positioning: {},
                    text: "{{trip.name}}"
                },
                {
                    type: "text",
                    color: "rgb(0, 0, 0)",
                    fontFamily: "Roboto",
                    fontSize: "64px",
                    textAnchor: "middle",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    positioning: {},
                    text: "{{trip.info}}"
                }
            ]
        },
        {
            type: "container",
            blocks: [
                {
                    type: "container",
                    blocks: [
                        {
                            type: "container",
                            positioning: {
                                height: 840
                            },
                            blocks: [
                                {
                                    type: "location-image",
                                    width: 1280 / 2,
                                    height: 840
                                    // svgWidth: 630,
                                    // svgHeight: 840,
                                    // viewBoxWidth: 288.5,
                                    // viewBoxHeight: 384.1,
                                    // clipPath: "M2.5 2.5H286v379.1H2.5z",
                                    // paddingTop: 20,
                                    // paddingBetweenImage: 5
                                }
                            ]
                        },
                        {
                            type: "container",
                            positioning: {
                                height: 300
                            },
                            blocks: [
                                {
                                    // location name
                                    type: "text",
                                    text: "{{location.name}}",
                                    fontSize: "64px",
                                    fontFamily: "Roboto",
                                    color: "#d0363b",
                                    fontWeight: "bold",
                                    textAnchor: "start",
                                    textTransform: "uppercase",
                                    positioning: {
                                        top: 60,
                                        left: 20
                                    }
                                },
                                {
                                    // location feeling
                                    type: "text",
                                    text: "{{location.feeling}}",
                                    fontSize: "48px",
                                    fontFamily: "Roboto",
                                    color: "#121113",
                                    textAnchor: "start",
                                    positioning: {
                                        top: 60,
                                        left: 20
                                    }
                                },
                                {
                                    // location highlights
                                    type: "text",
                                    text: "{{location.hight-lights}}",
                                    fontSize: "48px",
                                    fontFamily: "Roboto",
                                    color: "#121113",
                                    textAnchor: "start",
                                    positioning: {
                                        top: 60,
                                        left: 20
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "container",
                    blocks: [
                        {
                            type: "location-image",
                            width: 1280 / 2,
                            height: 840
                            // svgWidth: 630,
                            // svgHeight: 840,
                            // viewBoxWidth: 288.5,
                            // viewBoxHeight: 384.1,
                            // clipPath: "M2.5 2.5H286v379.1H2.5z",
                            // paddingTop: 20,
                            // paddingBetweenImage: 5
                        },
                        {
                            // location name
                            type: "text",
                            text: "{{location.name}}",
                            fontSize: "64px",
                            fontFamily: "Roboto",
                            color: "#d0363b",
                            fontWeight: "bold",
                            textAnchor: "start",
                            textTransform: "uppercase",
                            positioning: {
                                top: 60,
                                left: 20
                            }
                        },
                        {
                            // location feeling
                            type: "text",
                            text: "{{location.feeling}}",
                            fontSize: "48px",
                            fontFamily: "Roboto",
                            color: "#121113",
                            textAnchor: "start",
                            positioning: {
                                top: 60,
                                left: 20
                            }
                        },
                        {
                            // location highlights
                            type: "text",
                            text: "{{location.hight-lights}}",
                            fontSize: "48px",
                            fontFamily: "Roboto",
                            color: "#121113",
                            textAnchor: "start",
                            positioning: {
                                top: 60,
                                left: 20
                            }
                        }
                    ]
                }
            ]
        },
        {
            // render footer image
            type: "image",
            url: "./data/images/App_Signature.png",
            positioning: {
                right: 200,
                bottom: 80
            }
        }
    ]
};
module.exports = {
    config_01_01: config_01_01,
    config_01_02: config_01_02
};
