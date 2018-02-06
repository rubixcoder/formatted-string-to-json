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
            var names = delimitedData[2].split('<');
            parsedJson.name.first = names[1].replace('>', '');
            parsedJson.name.middle = names[2].replace('>', '');
            parsedJson.name.last = names[3].replace('>', '');

            var locations = delimitedData[4].split('>>');
            locations.forEach((item) => {
                if (item != "") {
                    var location = item.split('<');
                    console.log(location);
                    parsedJson.locations.push({
                        name: location[1].replace('>', ''),
                        coords: {
                            long: location[3].replace('>', ''),
                            lat: location[4].replace('>', '')
                        }
                    });
                }
            });
            return Promise.resolve(parsedJson);
        }
    }
}

module.exports = ParserService;