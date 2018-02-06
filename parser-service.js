class ParserService {
    constructor() {}

    parseData(string) {
        var parsedJson = {
            id: null,
            name: {
                first: null,
                middle: null,
                last: null
            },
            dob: null,
            locations: [],
            imageId: null
        };
        if (string != null && string != undefined && string != '' && string.indexOf('new_profile') == 0) {
            var delimitedData = string.split('|');
            parsedJson.id = delimitedData[1];
            parsedJson.dob = delimitedData[3];
            parsedJson.imageId = delimitedData[5];
            var nameStringPattern = delimitedData[2].match(/\<([^\>]*)\>/g);
            if (nameStringPattern && nameStringPattern.length == 3) {
                var names = [];
                nameStringPattern.forEach((item) => {
                    item = item.substring(1, item.length - 1);
                    names.push(item);
                });
                parsedJson.name.first = names[0];
                parsedJson.name.middle = names[1];
                parsedJson.name.last = names[2];
            }
            var locationStringPattern = delimitedData[4].match(/<((?:[^<>]|<<[^>]*>>)*)>/g);
            if (locationStringPattern && locationStringPattern.length % 3 == 0) {
                for (var i = 0; i < locationStringPattern.length; i += 3) {
                    var location = [];
                    var temp = locationStringPattern.slice(i, i + 3);
                    temp.forEach((item) => {
                        item = item.substring(1, item.length - 1);
                        location.push(item);
                    });
                    parsedJson.locations.push({
                        name: location[0],
                        coords: {
                            long: location[1],
                            lat: location[2]
                        }
                    })
                }
            }
            return Promise.resolve(parsedJson);
        }
    }
}

module.exports = ParserService;