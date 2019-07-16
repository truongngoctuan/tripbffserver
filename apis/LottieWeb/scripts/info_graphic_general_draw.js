
function draw(trip, infographicType) {
    let numberOfLocations = trip.locations.length;
    if (infographicType == INFOGRAPHIC_TYPE.FIRST_RELEASED) {
        if (numberOfLocations == 1) 
        {
            draw_01_01.draw(trip);
        }
        else if (numberOfLocations == 2) {
            draw_01_02.draw(trip);
        }
        else {
            draw_01_others.draw(trip);
        }
    }    
}

window.draw = draw;