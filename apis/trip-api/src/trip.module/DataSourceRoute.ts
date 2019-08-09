import { Server } from "hapi";
import { IoC } from "./IoC";
import { FeelingRepository } from "./_infrastructures/repositories/FeelingRepository";
import { IFeeling, IActivity, IHighlight } from "./_core/models/ITrip";
import { ActivityRepository } from "./_infrastructures/repositories/ActivityRepository";
import { HighlightRepository } from "./_infrastructures/repositories/HighlightRepository";
import { RegisterNotifyRepository } from "./_infrastructures/repositories/RegisterNotifyRepository";
import uuid4 from 'uuid/v4';
import moment = require("moment");

const dataSourceQueryHandler = IoC.dataSourceQueryHandler;

module.exports = {
  init: function(server: Server) {   

    server.route({
      method: "POST",
      path: "/registerNotify",
      handler: async function(request) {   
        var rawData = request.payload as any;
        var data = JSON.parse(rawData);
        let repository = new RegisterNotifyRepository();
        let createdDate = moment();
        repository.insert({
          email: data.email,
          createdDate
        });
        return true;
      },
      options: {
        tags: ["api"]
      }
    });


    server.route({
      method: "GET",
      path: "/registerNotify/list",
      handler: async function(request) {
        let repository = new RegisterNotifyRepository();
        let registeredItems = await repository.list();
        return registeredItems;
      },
      options: {
        tags: ["api"]
      }
    });

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
            feelingId: uuid4(),
            label_en: "Beautiful",
            label_vi: "Đẹp",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Wonderful",
            label_vi: "Tuyệt vời",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Peaceful",
            label_vi: "Yên bình",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Free",
            label_vi: "Tự do",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Comfortable",
            label_vi: "Thoải mái",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Chill",
            label_vi: "Chill",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Chất phát ngất",
            label_vi: "Chất phát ngất",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Hạn hán lời",
            label_vi: "Hạn hán lời",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Mình thích thì mình làm thôi",
            label_vi: "Mình thích thì mình làm thôi",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Trẻ trâu",
            label_vi: "Trẻ trâu",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Cool",
            label_vi: "Ngầu",
            icon: ""
          },         
          {
            feelingId: uuid4(),
            label_en: "Happy",
            label_vi: "Hạnh phúc",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "In Love",
            label_vi: "Đang yêu",
            icon: ""
          },      
          {
            feelingId: uuid4(),
            label_en: "Loved",
            label_vi: "Được yêu",
            icon: ""
          },   
          {
            feelingId: uuid4(),
            label_en: "Cute",
            label_vi: "Dễ thương",
            icon: ""
          },  
          {
            feelingId: uuid4(),
            label_en: "Excited",
            label_vi: "Hào hứng",
            icon: ""
          },     
          {
            feelingId: uuid4(),
            label_en: "Crazy",
            label_vi: "Khùng",
            icon: ""
          },  
          {
            feelingId: uuid4(),
            label_en: "Silly",
            label_vi: "Ngớ ngẩn",
            icon: ""
          }, 
          {
            feelingId: uuid4(),
            label_en: "Relaxed",
            label_vi: "Thư giãn",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Motivated",
            label_vi: "Có động lực",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Confident",
            label_vi: "Tự tin",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Fresh",
            label_vi: "Tươi mới",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Lucky",
            label_vi: "May mắn",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Cold",
            label_vi: "Lạnh",
            icon: ""
          },    
          {
            feelingId: uuid4(),
            label_en: "Worried",
            label_vi: "Lo lắng",
            icon: ""
          },   
          {
            feelingId: uuid4(),
            label_en: "Funny",
            label_vi: "Hài hước",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Inspired",
            label_vi: "Được truyền cảm hứng",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Super",
            label_vi: "Phi thường",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Satisfied",
            label_vi: "Thỏa mãn",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Safe",
            label_vi: "An toàn",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Sad",
            label_vi: "Buồn",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Tired",
            label_vi: "Mệt mỏi",
            icon: ""
          }, 
          {
            feelingId: uuid4(),
            label_en: "Angry",
            label_vi: "Giận dữ",
            icon: ""
          },  
          {
            feelingId: uuid4(),
            label_en: "Exhausted",
            label_vi: "Kiệt sức",
            icon: ""
          }, 
          {
            feelingId: uuid4(),
            label_en: "Bored",
            label_vi: "Chán",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Sleepy",
            label_vi: "Buồn ngủ",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Hungry",
            label_vi: "Đói",
            icon: ""
          },
          {
            feelingId: uuid4(),
            label_en: "Bad",
            label_vi: "Tồi tệ",
            icon: ""
          }, 
          {
            feelingId: uuid4(),
            label_en: "Disappointed",
            label_vi: "Thất vọng",
            icon: ""
          },       
          {
            feelingId: uuid4(),
            label_en: "Heartbroken",
            label_vi: "Trái tim tan vỡ",
            icon: ""
          },         
          {
            feelingId: uuid4(),
            label_en: "Lonely",
            label_vi: "Cô đơn",
            icon: ""
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
            activityId: uuid4(),
            label_en: "Eat & Drink",
            label_vi: "Ăn uống",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Hiking",
            label_vi: "Đi bộ đường dài ngắn ngày",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Trekking",
            label_vi: "Đi bộ đường dài nhiều ngày",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Walking with a Storm",
            label_vi: "Bước đi với một cơn bão",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Stargazing",
            label_vi: "Ngắm sao",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Cloud hunting",
            label_vi: "Săn mây",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Watch the sunrise",
            label_vi: "Ngắm mặt trời mọc",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Watch the sunset",
            label_vi: "Ngắm mặt trời lặn",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "See rice fields",
            label_vi: "Ngắm ruộng lúa",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Rock climbing",
            label_vi: "Leo núi",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Camping",
            label_vi: "Cắm trại",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Swimming",
            label_vi: "Bơi",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Extreme sports",
            label_vi: "Thể thao mạo hiểm",
            icon: ""
          }, 
          {
            activityId: uuid4(),
            label_en: "Go sightseeing",
            label_vi: "Tham quan",
            icon: ""
          },  
          {
            activityId: uuid4(),
            label_en: "Roller coaster",
            label_vi: "Tàu lượn siêu tốc",
            icon: ""
          }, 
          {
            activityId: uuid4(),
            label_en: "Picnic",
            label_vi: "Dã ngoại",
            icon: ""
          }, 
          {
            activityId: uuid4(),
            label_en: "Photography",
            label_vi: "Chụp hình",
            icon: ""
          },          
          {
            activityId: uuid4(),
            label_en: "Fishing",
            label_vi: "Câu cá",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Paragliding",
            label_vi: "Dù lượn",
            icon: ""
          },  
          {
            activityId: uuid4(),
            label_en: "Motor racing",
            label_vi: "Đua xe máy",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Cycling",
            label_vi: "Đi xe đạp",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Kayaking",
            label_vi: "Chèo thuyền Kayak",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Surfing",
            label_vi: "Lướt sóng",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Horseback riding",
            label_vi: "Cưỡi ngựa",
            icon: ""
          },           
          {
            activityId: uuid4(),
            label_en: "Listen Music",
            label_vi: "Nghe nhạc",
            icon: ""
          },     
          {
            activityId: uuid4(),
            label_en: "Read book",
            label_vi: "Đọc sách",
            icon: ""
          },
          {
            activityId: uuid4(),
            label_en: "Watch movie",
            label_vi: "Xem phim",
            icon: ""
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
                label_en: "Beautiful",
                label_vi: "Đẹp",
                highlightType: "Like"
            },
            {
              highlightId: uuid4(),
              label_en: "Food is delicious",
              label_vi: "Đồ ăn ngon",
              highlightType: "Like"
            },
            {
              highlightId: uuid4(),
              label_en: "Good drinks",
              label_vi: "Đồ uống ngon",
              highlightType: "Like"
            },
            {
              highlightId: uuid4(),
              label_en: "Good services",
              label_vi: "Phục vụ tốt",
              highlightType: "Like"
            },
            {
              highlightId: uuid4(),
              label_en: "A lot of dogs",
              label_vi: "Nhiều chó",
              highlightType: "Like"
            },
            {
              highlightId: uuid4(),
              label_en: "Safe",
              label_vi: "An toàn",
              highlightType: "Like"
            },
            {
              highlightId: uuid4(),
              label_en: "Cheap",
              label_vi: "Rẻ",
              highlightType: "Like"
            },
            {
              highlightId: uuid4(),
              label_en: "Clean",
              label_vi: "Sạch sẽ",
              highlightType: "Like"
            },
            {
              highlightId: uuid4(),
              label_en: "Good movie",
              label_vi: "Phim hay",
              highlightType: "Like"
            },
            {
              highlightId: uuid4(),
              label_en: "Bad services",
              label_vi: "Phục vụ tệ",
              highlightType: "Dislike"
            },
            {
              highlightId: uuid4(),
              label_en: "Bad food",
              label_vi: "Thức ăn dở",
              highlightType: "Dislike"
            },
            {
              highlightId: uuid4(),
              label_en: "Bad drinks",
              label_vi: "Đồ uống dở",
              highlightType: "Dislike"
            },    
            {
              highlightId: uuid4(),
              label_en: "Very noise",
              label_vi: "Rất ồn",
              highlightType: "Dislike"
            },
            {
              highlightId: uuid4(),
              label_en: "Very crowded",
              label_vi: "Rất đông",
              highlightType: "Dislike"
            },
            {
              highlightId: uuid4(),
              label_en: "Not beautiful",
              label_vi: "Không đẹp",
              highlightType: "Dislike"
            },
            {
              highlightId: uuid4(),
              label_en: "Dangerous",
              label_vi: "Nguy hiểm",
              highlightType: "Dislike"
            },
            {
              highlightId: uuid4(),
              label_en: "Expensive",
              label_vi: "Đắt",
              highlightType: "Dislike"
            },
            {
              highlightId: uuid4(),
              label_en: "Dirty",
              label_vi: "Bẩn",
              highlightType: "Dislike"
            }
          ];
          highlightRepo.insertMany(highlights);
          return true;
        }
      });  
  }
};
