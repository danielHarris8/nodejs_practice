
const fetch = require("node-fetch");
const weatherData =  (url,cb) =>  fetch(url)
    .then((response) => response.json())
    .then(data => {
      const locationData = data.records.location[0];
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          
          if (['Wx', 'PoP', 'CI','MinT','MaxT'].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter;
          }
          return neededElements;
        },
        {},
      );
      console.log(weatherElements)
      return cb(null,weatherElements);
    })
.catch(err=>{console.error("has a promble", err);return cb(err, null);})

module.exports = weatherData;