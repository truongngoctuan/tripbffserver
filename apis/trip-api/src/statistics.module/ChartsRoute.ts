import { Server } from "hapi";
import { IoC } from "./IoC"
import moment = require("moment");
const userTripQueryHandler = IoC.userTripQueryHandler;

module.exports = {
    init: function(server: Server) {       

        server.route({
            method: "GET",
            path: "/statistics/growthCharts",
            handler: async function(request) {
              try {  
                var chartsData = await userTripQueryHandler.getGrowthCharts(moment('2019-12-01'), moment('2020-01-01'));
                return chartsData;
              }
              catch(error) {
                console.log(error);
                return "";
              }          
            },
            options: {
              //auth: "simple",
              tags: ["api"]         
            }
          });       
  }    
}