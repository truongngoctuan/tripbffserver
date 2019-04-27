import { Server } from "hapi";
import { IoC } from "./IoC";
import { FeelingRepository } from "./_infrastructures/repositories/FeelingRepository";
import { IFeeling, IActivity, IHighlight } from "./_core/models/ITrip";
import { ActivityRepository } from "./_infrastructures/repositories/ActivityRepository";
import { HighlightRepository } from "./_infrastructures/repositories/HighlightRepository";
import uuid4 from 'uuid/v4';

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
                highlightId: uuid4(),
                label: "Beautiful",
                highlightType: "Like"
            },
            {
                highlightId: uuid4(),
                label: "Bad Services",
                highlightType: "Dislike"
            },
            {
                highlightId: uuid4(),
                label: "Good Foods",
                highlightType: "Like"
            },
            {
                highlightId: uuid4(),
                label: "Very Noise",
                highlightType: "Dislike"
            },
            {
                highlightId: uuid4(),
                label: "Good Drinks",
                highlightType: "Like"
            },
            {
                highlightId: uuid4(),
                label: "A Lot of Dogs ",
                highlightType: "Like"
            }
          ];
          highlightRepo.insertMany(highlights);
          return true;
        }
      });  
  }
};
