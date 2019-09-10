import { Server } from "hapi";
import { IoC } from "./IoC";
import { CUtils } from "../_shared/ControllerUtils";

module.exports = {
    init: function(server: Server) {      
  
      server.route({
        method: "POST",
        path: "/setting/feedback",
        handler: async function(request) {
          try {
            var { feedback, email } = request.payload as any;
            const userId = CUtils.getUserId(request);
            var userFeedback = {
              userId,
              feedback,
              email
            };
            await IoC.userFeedbackRepository.insert(userFeedback);
            return true;
          }
          catch(error) {
            console.log(error);
            return false;
          }          
        },
        options: {
          auth: "simple",
          tags: ["api"]         
        }
      });  

      server.route({
        method: "GET",
        path: "/setting/feedback",
        handler: async function(request) {
          try {          
            let feedbacks = await IoC.userFeedbackRepository.list();
            return feedbacks;
          }
          catch(error) {
            console.log(error);
            return false;
          }          
        },
        options: {
          auth: "simple",
          tags: ["api"]         
        }
      }); 

      server.route({
        method: "PATCH",
        path: "/setting/locale",
        handler: async function(request) {
          try {
            var { locale } = request.payload as any;
            const userId = CUtils.getUserId(request);
            var userSetting = {
              userId,
              locale
            };
            await IoC.userSettingRepository.update(userSetting);
            return true;
          }
          catch(error) {
            console.log(error);
            return false;
          }          
        },
        options: {
          auth: "simple",
          tags: ["api"]         
        }
      });      
  }    
}