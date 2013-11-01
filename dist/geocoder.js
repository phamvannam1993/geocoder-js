var container="object"==typeof window?window:"object"==typeof exports?exports:{};if(function(a){"use strict";var b={};b.version="0.0.0",b.createGeocoder=function(a){var c=new b.ProviderFactory;return c.createProvider(a)},a.GeocoderJS=b}(container),"function"==typeof define&&define.amd&&define(GeocoderJS),"undefined"==typeof GeocoderJS&&"function"==typeof require)var GeocoderJS=require("../GeocoderJS.js");if(function(a){"use strict";a.ProviderBase=function(){},a.ProviderBase.prototype={geocode:function(){},geodecode:function(){},mapToGeocoded:function(){},executeRequest:function(){}}}(GeocoderJS),"undefined"==typeof GeocoderJS&&"function"==typeof require)var GeocoderJS=require("./GeocoderJS.js");if(function(a){"use strict";a.Geocoded=function(){},a.Geocoded.prototype={getCoordinates:function(){return[this.latitude,this.longitude]},getLatitude:function(){return this.latitude},getLongitude:function(){return this.longitude},getBounds:function(){},getStreetNumber:function(){return this.streetNumber},getStreetName:function(){return this.streetName},getCity:function(){return this.city},getZipcode:function(){return this.postal_code},getCityDistrict:function(){},getCounty:function(){},getCountyCode:function(){},getRegion:function(){return this.region}}}(GeocoderJS),"undefined"==typeof GeocoderJS&&"function"==typeof require)var GeocoderJS=require("./GeocoderJS.js");if(function(a){"use strict";var b={type:"Feature",properties:{},geometry:{type:"Point",coordinates:[]}};a.GeoJSONDumper=function(){return{dump:function(a){var c=b;return c.geometry.coordinates=[a.getLongitude(),a.getLatitude()],c}}}}(GeocoderJS),"undefined"==typeof GeocoderJS&&"function"==typeof require)var GeocoderJS=require("../GeocoderJS.js");if(function(a){"use strict";a.ProviderFactory=function(){},a.ProviderFactory.prototype.createProvider=function(b){"string"==typeof b&&(b={provider:b});var c;switch(b.provider){case"google":c=new a.GoogleAPIProvider(b);break;case"mapquest":c=new a.MapquestProvider(b)}return c}}(GeocoderJS),"undefined"==typeof GeocoderJS&&"function"==typeof require){var GeocoderJS=require("../GeocoderJS.js");require("../Geocoded.js"),require("../providers/ProviderBase.js")}if(function(a){"use strict";function b(b,c){var e,f=require("url"),g=d?require("https"):require("http"),h={protocol:d?"https":"http",host:"maps.googleapis.com",pathname:"maps/api/geocode/json",query:b};h.query.sensor="false",e=f.format(h),g.get(e,function(b){if(200!=b.statusCode)throw"Received HTTP status code "+b.statusCode+" when attempting geocoding request.";b.data="",b.setEncoding("utf8"),b.on("data",function(a){b.data+=a}),b.on("end",function(){if(!b.data||!b.data.length)throw"Received empty data when attempting geocoding request.";var d=!1,e=0,f=[];try{d=JSON.parse(b.data)}catch(g){throw"Received invalid JSON data when attempting geocoding request."}if(d&&d.status){if("OVER_QUERY_LIMIT"===d.status)throw"Exceeded daily quota when attempting geocoding request.";if("OK"===d.status&&d.results){for(;e<d.results.length;e++)f.push(a.GoogleAPIProvider.prototype.mapToGeocoded(d.results[e]));return c(f)}}throw"Received unexpected JSON data when attempting geocoding request."})}).on("error",function(a){throw a})}function c(b,c){var e=new XMLHttpRequest,f=(d?"https":"http")+"://maps.googleapis.com/maps/api/geocode/json?sensor=false&";for(var g in b)b.hasOwnProperty(g)&&(f+=encodeURIComponent(g)+"="+encodeURIComponent(b[g]));e.onload=function(){if(200!=this.status)return console.log("Received HTTP status code "+this.status+" when attempting geocoding request."),c(null);if(!this.responseText||!this.responseText.length)return console.log("Received empty data when attempting geocoding request."),c(null);var b=!1,d=0,e=[];try{b=JSON.parse(this.responseText)}catch(f){return console.log("Received invalid JSON data when attempting geocoding request."),c(null)}if(b&&b.status){if("OVER_QUERY_LIMIT"===b.status)return console.log("Exceeded daily quota when attempting geocoding request."),c(null);if("OK"===b.status&&b.results){for(;d<b.results.length;d++)e.push(a.GoogleAPIProvider.prototype.mapToGeocoded(b.results[d]));return c(e)}}return console.log("Received unexpected JSON data when attempting geocoding request."),c(null)},e.open("GET",f),e.send()}var d=!1;a.GoogleAPIProvider=function(a){d=a},a.GoogleAPIProvider.prototype=new a.ProviderBase,a.GoogleAPIProvider.prototype.constructor=a.GoogleAPIProvider,a.GoogleAPIProvider.prototype.geocode=function(a,b){this.executeRequest({address:a},b)},a.GoogleAPIProvider.prototype.geodecode=function(a,b,c){this.executeRequest({latlng:a+","+b},c)},a.GoogleAPIProvider.prototype.executeRequest=function(a,e){if("undefined"!=typeof XMLHttpRequest)return c(a,e);try{return require("url"),d?require("https"):require("http"),b(a,e)}catch(f){}return e(null)},a.GoogleAPIProvider.prototype.mapToGeocoded=function(b){var c=new a.Geocoded;c.latitude=b.geometry.location.lat,c.longitude=b.geometry.location.lng;for(var d in b.address_components)for(var e in b.address_components[d].types)switch(b.address_components[d].types[e]){case"street_number":c.streetNumber=b.address_components[d].long_name;break;case"route":c.streetName=b.address_components[d].long_name;break;case"locality":c.city=b.address_components[d].long_name;break;case"administrative_area_level_1":c.region=b.address_components[d].long_name;break;case"postal_code":c.postal_code=b.address_components[d].long_name}return c}}(GeocoderJS),"undefined"==typeof GeocoderJS&&"function"==typeof require)var GeocoderJS=require("../GeocoderJS.js");!function(a){"use strict";a.MapquestProvider=function(a){"object"!=typeof a&&(a={});var b={apiKey:""};for(var c in b)void 0===a[c]&&(a[c]=b[c]);this.apiKey=a.apiKey},a.MapquestProvider.prototype=new a.ProviderBase,a.MapquestProvider.prototype.constructor=a.MapquestProvider,a.MapquestProvider.prototype.geocode=function(a,b){this.executeRequest({location:a},b)},a.MapquestProvider.prototype.mapToGeocoded=function(b){var c=new a.Geocoded;return c.latitude=b[0].latLng.lat,c.longitude=b[0].latLng.lng,c.city=b[0].adminArea5,c.region=b[0].adminArea4,c},a.MapquestProvider.prototype.executeRequest=function(b,c){var d=new XMLHttpRequest,e="http://open.mapquestapi.com/geocoding/v1/address?outFormat=json&location="+encodeURIComponent(b.location);this.apiKey&&(e+="&key="+this.apiKey),d.onload=function(){if(200!=this.status)return console.log("Received HTTP status code "+this.status+" when attempting geocoding request."),c(null);if(!this.responseText||!this.responseText.length)return console.log("Received empty data when attempting geocoding request."),c(null);var b=!1,d=0,e=[];try{b=JSON.parse(this.responseText)}catch(f){return console.log("Received invalid JSON data when attempting geocoding request."),c(null)}if(b&&b.info){if("OVER_QUERY_LIMIT"===b.status)return console.log("Exceeded daily quota when attempting geocoding request."),c(null);if(0===b.info.statuscode&&b.results){for(;d<b.results.length;d++)e.push(a.MapquestProvider.prototype.mapToGeocoded(b.results[d].locations));return c(e)}}return console.log("Received unexpected JSON data when attempting geocoding request."),c(null)},d.open("GET",e),d.send()}}(GeocoderJS);