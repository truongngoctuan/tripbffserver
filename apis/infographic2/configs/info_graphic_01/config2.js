var config_01_01 = {
  width: 1280,
  backgroundColor: "#e3d1a2",
  type: "container",

  blocks: [
    {
      type: "location",
      blocks: [
        {
          type: "location-image",
          width: 1280,
          height: 1280
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
              text: "{{location.hight-lights}}}}",
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
      url: "put something here",

      // todo should review this one
      positioning: {
        right: 200,
        bottom: 80
      }
    }
  ]
};

module.exports = {
  config_01_01: config_01_01
};
