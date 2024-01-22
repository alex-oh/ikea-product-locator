// calculate corners given a set of coordinates
// source: https://learn.microsoft.com/en-us/answers/questions/883272/find-max-min-latitude-and-longitude-from-coordinat
export function getExtents(locations) {
    if (locations && locations.length > 0) {
        var minLat = 90;
        var maxLat = -90;
        var minLon = 180;
        var maxLon = -180;

        for (var i = 0, len = locations.length; i < len; i++) {
            var lat = locations[i].lat;
            var lon = locations[i].lng;

            if (lat < minLat) {
                minLat = lat;
            }

            if (lat > maxLat) {
                maxLat = lat;
            }

            if (lon < minLon) {
                minLon = lon;
            }

            if (lon > maxLon) {
                maxLon = lon;
            }
        }

        return [minLon, minLat, maxLon, maxLat];
    }

    return null;
}
