const { sortTides } = require("../../tides");

const formatDate = (day, time) => {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setDate(parseInt(day));
  date.setHours(hours);
  date.setMinutes(minutes);
  return date.toISOString();
};

// http://www.puertosantander.es/cas/tabla_mareas.aspx
const cheerio = require("cheerio");
// const tides = require("./2020-08.html");
const fs = require("fs");
const tides = fs.readFileSync("/Users/pkrejcik/www/sanmartin/tides/puertosantander/2020-08.html");

const $ = cheerio.load(tides);
const table = $("table");
const rows = table.find("tr");
const result = [];
rows.each((i, row) => {
  if (i === 0) return;
  const cells = $(row).find("td").find("span");
  const day = $($(cells).get(0)).html();
  const time1 = $($(cells).get(1)).html();
  const height1 = $($(cells).get(2)).html();
  const time2 = $($(cells).get(3)).html();
  const height2 = $($(cells).get(4)).html();
  const time3 = $($(cells).get(7)).html();
  const height3 = $($(cells).get(8)).html();
  const time4 = $($(cells).get(9)).html();
  const height4 = $($(cells).get(10)).html();
  if (time1 && height1) {
    result.push({ date: formatDate(day, time1), height: height1 });
  }
  if (time2 && height2) {
    result.push({ date: formatDate(day, time2), height: height2 });
  }
  if (time3 && height3) {
    result.push({ date: formatDate(day, time3), height: height3 });
  }
  if (time4 && height4) {
    result.push({ date: formatDate(day, time4), height: height4 });
  }
});

console.log("🛎 ", sortTides(result));
