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
          },
          {
            feelingId: 3,
            label: "Blessed",
            icon: "smile"
          },
          {
            feelingId: 4,
            label: "Loved",
            icon: "smile"
          },
          {
            feelingId: 5,
            label: "Lovely",
            icon: "smile"
          },
          {
            feelingId: 6,
            label: "Excited",
            icon: "smile"
          },
          {
            feelingId: 7,
            label: "Fantastic",
            icon: "smile"
          },
          {
            feelingId: 8,
            label: "Chill",
            icon: "smile"
          },
          {
            feelingId: 9,
            label: "Alone",
            icon: "smile"
          },
          {
            feelingId: 10,
            label: "Angry",
            icon: "smile"
          },
          {
            feelingId: 11,
            label: "Thankful",
            icon: "smile"
          },
          {
            feelingId: 12,
            label: "In Love",
            icon: "frown"
          },
          {
            feelingId: 13,
            label: "Crazy",
            icon: "smile"
          },
          {
            feelingId: 14,
            label: "Grateful",
            icon: "smile"
          },
          {
            feelingId: 15,
            label: "Silly",
            icon: "smile"
          },
          {
            feelingId: 16,
            label: "Wonderful",
            icon: "smile"
          },
          {
            feelingId: 17,
            label: "Cool",
            icon: "smile"
          },
          {
            feelingId: 18,
            label: "Relaxed",
            icon: "smile"
          },
          {
            feelingId: 19,
            label: "Positive",
            icon: "smile"
          },
          {
            feelingId: 20,
            label: "Hopeful",
            icon: "smile"
          },
          {
            feelingId: 21,
            label: "Joyful",
            icon: "smile"
          },
          {
            feelingId: 22,
            label: "Tired",
            icon: "frown"
          },
          {
            feelingId: 23,
            label: "Motivated",
            icon: "smile"
          },
          {
            feelingId: 24,
            label: "Proud",
            icon: "smile"
          },
          {
            feelingId: 25,
            label: "OK",
            icon: "smile"
          },
          {
            feelingId: 26,
            label: "Sick",
            icon: "smile"
          },
          {
            feelingId: 27,
            label: "Emotional",
            icon: "smile"
          },
          {
            feelingId: 28,
            label: "Confident",
            icon: "smile"
          },
          {
            feelingId: 29,
            label: "Awesome",
            icon: "smile"
          },
          {
            feelingId: 30,
            label: "Fresh",
            icon: "smile"
          },
          {
            feelingId: 31,
            label: "Exhausted",
            icon: "smile"
          },
          {
            feelingId: 32,
            label: "Annoyed",
            icon: "frown"
          },
          {
            feelingId: 33,
            label: "Glad",
            icon: "smile"
          },
          {
            feelingId: 34,
            label: "Lucky",
            icon: "smile"
          },
          {
            feelingId: 35,
            label: "Heartbroken",
            icon: "smile"
          },
          {
            feelingId: 36,
            label: "Bored",
            icon: "smile"
          },
          {
            feelingId: 37,
            label: "Sleepy",
            icon: "smile"
          },
          {
            feelingId: 38,
            label: "Energized",
            icon: "smile"
          },
          {
            feelingId: 39,
            label: "Hungry",
            icon: "smile"
          },
          {
            feelingId: 40,
            label: "Pained",
            icon: "smile"
          },
          {
            feelingId: 41,
            label: "Peaceful",
            icon: "smile"
          },
          {
            feelingId: 42,
            label: "Disappointed",
            icon: "frown"
          },
          {
            feelingId: 43,
            label: "Optimistic",
            icon: "smile"
          },
          {
            feelingId: 44,
            label: "Cold",
            icon: "smile"
          },
          {
            feelingId: 45,
            label: "Cute",
            icon: "smile"
          },
          {
            feelingId: 46,
            label: "Fabulous",
            icon: "smile"
          },
          {
            feelingId: 47,
            label: "Great",
            icon: "smile"
          },
          {
            feelingId: 48,
            label: "Sorry",
            icon: "smile"
          },
          {
            feelingId: 49,
            label: "Super",
            icon: "smile"
          },
          {
            feelingId: 50,
            label: "Worried",
            icon: "smile"
          },
          {
            feelingId: 51,
            label: "Funny",
            icon: "smile"
          },
          {
            feelingId: 52,
            label: "Bad",
            icon: "frown"
          },
          {
            feelingId: 53,
            label: "Down",
            icon: "smile"
          },
          {
            feelingId: 54,
            label: "Inspired",
            icon: "smile"
          },
          {
            feelingId: 55,
            label: "Satisfied",
            icon: "smile"
          },
          {
            feelingId: 56,
            label: "Confused",
            icon: "smile"
          },
          {
            feelingId: 57,
            label: "Good",
            icon: "smile"
          },
          {
            feelingId: 58,
            label: "Lonely",
            icon: "smile"
          },
          {
            feelingId: 59,
            label: "Strong",
            icon: "smile"
          },
          {
            feelingId: 60,
            label: "Concerned",
            icon: "smile"
          },
          {
            feelingId: 61,
            label: "Special",
            icon: "smile"
          },
          {
            feelingId: 62,
            label: "Depressed",
            icon: "frown"
          },
          {
            feelingId: 63,
            label: "Curious",
            icon: "smile"
          },
          {
            feelingId: 64,
            label: "Welcome",
            icon: "smile"
          },
          {
            feelingId: 65,
            label: "Broken",
            icon: "smile"
          },
          {
            feelingId: 66,
            label: "Beautiful",
            icon: "smile"
          },
          {
            feelingId: 67,
            label: "Amazing",
            icon: "smile"
          },
          {
            feelingId: 68,
            label: "Pissed off",
            icon: "smile"
          },
          {
            feelingId: 69,
            label: "Surprised",
            icon: "smile"
          },
          {
            feelingId: 70,
            label: "Pretty",
            icon: "smile"
          },
          {
            feelingId: 71,
            label: "Better",
            icon: "smile"
          },
          {
            feelingId: 72,
            label: "Guilty",
            icon: "frown"
          },
          {
            feelingId: 73,
            label: "Safe",
            icon: "smile"
          },
          {
            feelingId: 74,
            label: "Free",
            icon: "smile"
          },
          {
            feelingId: 75,
            label: "Lost",
            icon: "smile"
          },
          {
            feelingId: 76,
            label: "Old",
            icon: "smile"
          },
          {
            feelingId: 77,
            label: "Lazy",
            icon: "smile"
          },
          {
            feelingId: 78,
            label: "Worse",
            icon: "smile"
          },
          {
            feelingId: 79,
            label: "Horrible",
            icon: "smile"
          },
          {
            feelingId: 80,
            label: "Comfortable",
            icon: "smile"
          },
          {
            feelingId: 81,
            label: "Stupid",
            icon: "smile"
          },
          {
            feelingId: 82,
            label: "Terrible",
            icon: "frown"
          },
          {
            feelingId: 83,
            label: "Asleep",
            icon: "smile"
          },
          {
            feelingId: 84,
            label: "Well",
            icon: "smile"
          },
          {
            feelingId: 85,
            label: "Alive",
            icon: "smile"
          },
          {
            feelingId: 86,
            label: "Shy",
            icon: "smile"
          },
          {
            feelingId: 87,
            label: "Weird",
            icon: "smile"
          },
          {
            feelingId: 88,
            label: "Hurt",
            icon: "smile"
          },
          {
            feelingId: 89,
            label: "Awful",
            icon: "smile"
          },
          {
            feelingId: 90,
            label: "Stressed",
            icon: "smile"
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
            label: "Swim",
            icon: "swimmer"
          },
          {
            activityId: 2,
            label: "Listen Music",
            icon: "music"
          },
          {
            activityId: 3,
            label: "Eat",
            icon: "running"
          },
          {
            activityId: 4,
            label: "Drink",
            icon: "running"
          },
          {
            activityId: 5,
            label: "Go trekking",
            icon: "running"
          },
          {
            activityId: 6,
            label: "Go sightseeing",
            icon: "running"
          },
          {
            activityId: 7,
            label: "Cloud hunting",
            icon: "running"
          },
          {
            activityId: 8,
            label: "Watch the sunrise",
            icon: "running"
          },
          {
            activityId: 9,
            label: "Go fishing",
            icon: "running"
          },
          {
            activityId: 10,
            label: "Stargazing",
            icon: "running"
          },
          {
            activityId: 11,
            label: "Eat & Drink",
            icon: "running"
          },
          {
            activityId: 12,
            label: "Read book",
            icon: "running"
          },
          {
            activityId: 13,
            label: "Watch movie",
            icon: "running"
          },
          {
            activityId: 14,
            label: "Go hiking",
            icon: "running"
          },
          {
            activityId: 15,
            label: "Go camping",
            icon: "running"
          },
          {
            activityId: 16,
            label: "Go climbing",
            icon: "running"
          },
          {
            activityId: 17,
            label: "Kayak",
            icon: "running"
          },
          {
            activityId: 18,
            label: "Water Ski",
            icon: "running"
          },
          {
            activityId: 19,
            label: "Walking with a Storm",
            icon: "running"
          },
          {
            activityId: 20,
            label: "Watch the sunset",
            icon: "running"
          },
          {
            activityId: 21,
            label: "Horseback riding",
            icon: "running"
          },
          {
            activityId: 22,
            label: "Ride a bike",
            icon: "running"
          },
          {
            activityId: 23,
            label: "Ride a motorbike",
            icon: "running"
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
            },
            {
              highlightId: uuid4(),
              label: "Food is delicious",
              highlightType: "Like"
            },
            {
              highlightId: uuid4(),
              label: "Good movie",
              highlightType: "Like"
            },
            {
              highlightId: uuid4(),
              label: "Good service",
              highlightType: "Like"
            },
            {
              highlightId: uuid4(),
              label: "Safe",
              highlightType: "Like"
            },
            {
              highlightId: uuid4(),
              label: "Cheap",
              highlightType: "Like"
            },
            {
              highlightId: uuid4(),
              label: "Clean",
              highlightType: "Like"
            },
            {
              highlightId: uuid4(),
              label: "Bad Food ",
              highlightType: "Dislike"
            },
            {
              highlightId: uuid4(),
              label: "Very crowded",
              highlightType: "Dislike"
            },
            {
              highlightId: uuid4(),
              label: "Not beautiful",
              highlightType: "Dislike"
            },
            {
              highlightId: uuid4(),
              label: "Dangerous",
              highlightType: "Dislike"
            },
            {
              highlightId: uuid4(),
              label: "Expensive",
              highlightType: "Dislike"
            },
            {
              highlightId: uuid4(),
              label: "Dirty",
              highlightType: "Dislike"
            }
          ];
          highlightRepo.insertMany(highlights);
          return true;
        }
      });  
  }
};
