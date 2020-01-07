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
                var { fromDate, toDate } = request.query as any;
                var chartsData = await userTripQueryHandler.getGrowthCharts(moment(fromDate), moment(toDate));
                return chartsData;
              }
              catch(error) {
                console.log(error);
                return "";
              }          
            },
            options: {
              //auth: "simple",
              tags: ["api"],
              cors: true      
            }
          });       
  }    
}