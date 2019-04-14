import { Server } from "hapi";
import { IoC } from "./IoC";
import { FeelingRepository } from "./_infrastructures/repositories/FeelingRepository";
import { IFeeling, IActivity, IHighlight } from "./_core/models/ITrip";
import { ActivityRepository } from "./_infrastructures/repositories/ActivityRepository";
import { HighlightRepository } from "./_infrastructures/repositories/HighlightRepository";

const dataSourceQueryHandler = IoC.dataSourceQueryHandler;

module.exports = {
  init: function(server: Server) {   

    server.route({
        method: "GET",
        path: "/trips/feelings",
        handler: async function(request) {
          var feelings = dataSourceQueryHandler.getFeelings();
          return feelings;
        },
        options: {
          auth: "simple",
          tags: ["api"]
      }
    });

    //TODO: Insert feelings route will be removed later
    server.route({
      method: "POST",
      path: "/trips/feelings/insert",
      handler: async function(request) {
        var feelingRepo =  new FeelingRepository();
        var feelings: Array<IFeeling> = [
          {
            feelingId: 1,
            label: "Happy",
            icon: "smile"
          },
          {
            feelingId: 2,
            label: "Sad",
            icon: "frown"
          }
        ];
        feelingRepo.insertMany(feelings);
        return true;
      }
    });

    //////////////  ACTIVITY ROUTES /////////////////  
   

    server.route({
      method: "GET",
      path: "/trips/activities",
      handler: async function(request) {
        var activities = dataSourceQueryHandler.getActivities();
        return activities;
      },
      options: {
        auth: "simple",
        tags: ["api"]
       }
      });

    //TODO: Insert activities route will be removed later
    server.route({
      method: "POST",
      path: "/trips/activities/insert",
      handler: async function(request) {
        var activityRepo =  new ActivityRepository();
        var activities: Array<IActivity> = [
          {
            activityId: 1,
            label: "Swimming",
            icon: "swimmer"
          },
          {
            activityId: 2,
            label: "Listening Music",
            icon: "music"
          }
        ];
        activityRepo.insertMany(activities);
        return true;
      }
    });    

    //////////////  HIGHLIGHT ROUTES /////////////////     

    server.route({
        method: "GET",
        path: "/trips/highlights",
        handler: async function(request) {
          var highlights = dataSourceQueryHandler.getHighlights();
          return highlights;
        },
        options: {
          auth: "simple",
          tags: ["api"]
         }
        });
  
      //TODO: Insert highlights route will be removed later
      server.route({
        method: "POST",
        path: "/trips/highlights/insert",
        handler: async function(request) {
          var highlightRepo =  new HighlightRepository();
          var highlights: Array<IHighlight> = [
            {
                highlightId: 1,
                label: "Beautiful",
                type: "Like"
            },
            {
                highlightId: 2,
                label: "Bad Services",
                type: "Dislike"
            },
            {
                highlightId: 3,
                label: "Good Foods",
                type: "Like"
            },
            {
                highlightId: 4,
                label: "Very Noise",
                type: "Dislike"
            },
            {
                highlightId: 5,
                label: "Good Drinks",
                type: "Like"
            },
            {
                highlightId: 6,
                label: "A Lot of Dogs ",
                type: "Like"
            }
          ];
          highlightRepo.insertMany(highlights);
          return true;
        }
      });  
  }
};
