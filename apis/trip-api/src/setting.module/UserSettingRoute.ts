import { Server } from "@hapi/hapi";
import { IoC } from "./IoC";
import { CUtils } from "../_shared/ControllerUtils";

module.exports = {
  init: function (server: Server) {
    server.route({
      method: "POST",
      path: "/setting/feedback",
      handler: async function (request) {
        try {
          const { feedback, email } = request.payload as any;
          const userId = CUtils.getUserId(request);
          const userFeedback = {
            userId,
            feedback,
            email,
          };
          await IoC.userFeedbackRepository.insert(userFeedback);
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
      },
    });

    server.route({
      method: "GET",
      path: "/setting/feedback",
      handler: async function (request) {
        try {
          const feedbacks = await IoC.userFeedbackRepository.list();
          return feedbacks;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
      },
    });

    server.route({
      method: "PATCH",
      path: "/setting/locale",
      handler: async function (request) {
        try {
          const { locale } = request.payload as any;
          const userId = CUtils.getUserId(request);
          const userSetting = {
            userId,
            locale,
          };
          await IoC.userSettingRepository.update(userSetting);
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
      },
    });
  },
};
