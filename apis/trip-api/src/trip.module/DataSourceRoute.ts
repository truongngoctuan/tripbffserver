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
          var feelings = await dataSourceQueryHandler.getFeelings();

          for (var i = 0; i < feelings.length; i++) {
            let item = feelings[i];
            let signedUrl = item.icon ? await IoC.fileService.signGetIcon(item.icon) : "";
            item.icon = signedUrl;
          }

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
            icon: "emoji/01_Beautiful.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Wonderful",
            label_vi: "Tuyệt vời",
            icon: "emoji/02_Wonderful.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Peaceful",
            label_vi: "Yên bình",
            icon: "emoji/03_Peaceful.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Free",
            label_vi: "Tự do",
            icon: "emoji/04_Free.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Comfortable",
            label_vi: "Thoải mái",
            icon: "emoji/05_Comfortable.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Chill",
            label_vi: "Chill",
            icon: "emoji/chill.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Chất phát ngất",
            label_vi: "Chất phát ngất",
            icon: "emoji/Chat_phat_ngat.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Hạn hán lời",
            label_vi: "Hạn hán lời",
            icon: "emoji/han_han_loi.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Mình thích thì mình làm thôi",
            label_vi: "Mình thích thì mình làm thôi",
            icon: "emoji/minh_thich_thi_minh_lam_thoi.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Trẻ trâu",
            label_vi: "Trẻ trâu",
            icon: "emoji/tre_trau.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Cool",
            label_vi: "Ngầu",
            icon: "emoji/cool.png"
          },         
          {
            feelingId: uuid4(),
            label_en: "Happy",
            label_vi: "Hạnh phúc",
            icon: "emoji/happy.png"
          },
          {
            feelingId: uuid4(),
            label_en: "In Love",
            label_vi: "Đang yêu",
            icon: "emoji/in-love.png"
          },      
          {
            feelingId: uuid4(),
            label_en: "Loved",
            label_vi: "Được yêu",
            icon: "emoji/loved.png"
          },   
          {
            feelingId: uuid4(),
            label_en: "Cute",
            label_vi: "Dễ thương",
            icon: "emoji/cute.png"
          },  
          {
            feelingId: uuid4(),
            label_en: "Excited",
            label_vi: "Hào hứng",
            icon: "emoji/excited.png"
          },     
          {
            feelingId: uuid4(),
            label_en: "Crazy",
            label_vi: "Khùng",
            icon: "emoji/crazy.png"
          },  
          {
            feelingId: uuid4(),
            label_en: "Silly",
            label_vi: "Ngớ ngẩn",
            icon: "emoji/silly.png"
          }, 
          {
            feelingId: uuid4(),
            label_en: "Relaxed",
            label_vi: "Thư giãn",
            icon: "emoji/relaxed.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Motivated",
            label_vi: "Có động lực",
            icon: "emoji/motivated.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Confident",
            label_vi: "Tự tin",
            icon: "emoji/confident.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Fresh",
            label_vi: "Tươi mới",
            icon: "emoji/fresh.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Lucky",
            label_vi: "May mắn",
            icon: "emoji/lucky.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Cold",
            label_vi: "Lạnh",
            icon: "emoji/cold.png"
          },    
          {
            feelingId: uuid4(),
            label_en: "Worried",
            label_vi: "Lo lắng",
            icon: "emoji/worried.png"
          },   
          {
            feelingId: uuid4(),
            label_en: "Funny",
            label_vi: "Hài hước",
            icon: "emoji/funny.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Inspired",
            label_vi: "Được truyền cảm hứng",
            icon: "emoji/inspired.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Super",
            label_vi: "Phi thường",
            icon: "emoji/super.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Satisfied",
            label_vi: "Thỏa mãn",
            icon: "emoji/satisfied.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Safe",
            label_vi: "An toàn",
            icon: "emoji/safe.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Sad",
            label_vi: "Buồn",
            icon: "emoji/sad.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Tired",
            label_vi: "Mệt mỏi",
            icon: "emoji/tired.png"
          }, 
          {
            feelingId: uuid4(),
            label_en: "Angry",
            label_vi: "Giận dữ",
            icon: "emoji/angry.png"
          },  
          {
            feelingId: uuid4(),
            label_en: "Exhausted",
            label_vi: "Kiệt sức",
            icon: "emoji/exhausted.png"
          }, 
          {
            feelingId: uuid4(),
            label_en: "Bored",
            label_vi: "Chán",
            icon: "emoji/bored.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Sleepy",
            label_vi: "Buồn ngủ",
            icon: "emoji/sleepy.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Hungry",
            label_vi: "Đói",
            icon: "emoji/hungry.png"
          },
          {
            feelingId: uuid4(),
            label_en: "Bad",
            label_vi: "Tồi tệ",
            icon: "emoji/bad.png"
          }, 
          {
            feelingId: uuid4(),
            label_en: "Disappointed",
            label_vi: "Thất vọng",
            icon: "emoji/disappointed.png"
          },       
          {
            feelingId: uuid4(),
            label_en: "Heartbroken",
            label_vi: "Trái tim tan vỡ",
            icon: "emoji/heartbroken.png"
          },         
          {
            feelingId: uuid4(),
            label_en: "Lonely",
            label_vi: "Cô đơn",
            icon: "emoji/lonely.png"
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
        var activities = await dataSourceQueryHandler.getActivities();

        for (var i = 0; i < activities.length; i++) {
          let item = activities[i];
          let signedUrl = item.icon ? await IoC.fileService.signGetIcon(item.icon) : "";
          item.icon = signedUrl;
        }

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
            icon: "activity/Eat.png"
          },
          {
            activityId: uuid4(),
            label_en: "Hiking",
            label_vi: "Đi bộ đường dài ngắn ngày",
            icon: "activity/hiking.png"
          },
          {
            activityId: uuid4(),
            label_en: "Trekking",
            label_vi: "Đi bộ đường dài nhiều ngày",
            icon: "activity/trekking.png"
          },
          {
            activityId: uuid4(),
            label_en: "Walking with a Storm",
            label_vi: "Bước đi với một cơn bão",
            icon: "activity/walking-with-a-storm.png"
          },
          {
            activityId: uuid4(),
            label_en: "Stargazing",
            label_vi: "Ngắm sao",
            icon: "activity/stargazing.png"
          },
          {
            activityId: uuid4(),
            label_en: "Cloud hunting",
            label_vi: "Săn mây",
            icon: "activity/cloud.png"
          },
          {
            activityId: uuid4(),
            label_en: "Watch the sunrise",
            label_vi: "Ngắm mặt trời mọc",
            icon: "activity/sunrise.png"
          },
          {
            activityId: uuid4(),
            label_en: "Watch the sunset",
            label_vi: "Ngắm mặt trời lặn",
            icon: "activity/sunset.png"
          },
          {
            activityId: uuid4(),
            label_en: "See rice fields",
            label_vi: "Ngắm ruộng lúa",
            icon: "activity/rice_fields.png"
          },
          {
            activityId: uuid4(),
            label_en: "Rock climbing",
            label_vi: "Leo núi",
            icon: "activity/climbing.png"
          },
          {
            activityId: uuid4(),
            label_en: "Camping",
            label_vi: "Cắm trại",
            icon: "activity/night-camping.png"
          },
          {
            activityId: uuid4(),
            label_en: "Swimming",
            label_vi: "Bơi",
            icon: "activity/swimming.png"
          },
          {
            activityId: uuid4(),
            label_en: "Extreme sports",
            label_vi: "Thể thao mạo hiểm",
            icon: "activity/extremem_sports.png"
          }, 
          {
            activityId: uuid4(),
            label_en: "Go sightseeing",
            label_vi: "Tham quan",
            icon: "activity/sightseeing.png"
          },  
          {
            activityId: uuid4(),
            label_en: "Roller coaster",
            label_vi: "Tàu lượn siêu tốc",
            icon: "activity/roller_coster.png"
          }, 
          {
            activityId: uuid4(),
            label_en: "Picnic",
            label_vi: "Dã ngoại",
            icon: "activity/picnic.png"
          }, 
          {
            activityId: uuid4(),
            label_en: "Photography",
            label_vi: "Chụp hình",
            icon: "activity/photographer.png"
          },          
          {
            activityId: uuid4(),
            label_en: "Fishing",
            label_vi: "Câu cá",
            icon: "activity/fishing-man.png"
          },
          {
            activityId: uuid4(),
            label_en: "Paragliding",
            label_vi: "Dù lượn",
            icon: "activity/Paragliding.png"
          },  
          {
            activityId: uuid4(),
            label_en: "Motor racing",
            label_vi: "Đua xe máy",
            icon: "activity/quad-bike.png"
          },
          {
            activityId: uuid4(),
            label_en: "Cycling",
            label_vi: "Đi xe đạp",
            icon: "activity/bicycle-rider.png"
          },
          {
            activityId: uuid4(),
            label_en: "Kayaking",
            label_vi: "Chèo thuyền Kayak",
            icon: "activity/kayak.png"
          },
          {
            activityId: uuid4(),
            label_en: "Surfing",
            label_vi: "Lướt sóng",
            icon: "activity/surfer-surfing.png"
          },
          {
            activityId: uuid4(),
            label_en: "Horseback riding",
            label_vi: "Cưỡi ngựa",
            icon: "activity/horse-riding.png"
          },           
          {
            activityId: uuid4(),
            label_en: "Listen Music",
            label_vi: "Nghe nhạc",
            icon: "activity/music.png"
          },     
          {
            activityId: uuid4(),
            label_en: "Read book",
            label_vi: "Đọc sách",
            icon: "activity/read-book.png"
          },
          {
            activityId: uuid4(),
            label_en: "Watch movie",
            label_vi: "Xem phim",
            icon: "activity/watching-a-movie.png"
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
