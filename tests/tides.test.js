const { getHeightTime, getHeightInterval } = require("../tides");
// const date = new Date("2020-07-30");

const formatDate = (date) => {
  const resultDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(prependZero).join("-");
  const resultTime = [date.getHours(), date.getMinutes()].map(prependZero).join(":");
  return [resultDate, resultTime].join("T");
};

const prependZero = (num) => (num + "").padStart(2, "0");

test("high tide", () => {
  const tides = [
    { date: "2020-07-30T01:00", alt: 1 },
    { date: "2020-07-30T03:00", alt: 5 },
  ];
  expect(formatDate(getHeightTime(tides, 1))).toBe("2020-07-30T01:00");
  expect(formatDate(getHeightTime(tides, 3))).toBe("2020-07-30T02:00");
  expect(formatDate(getHeightTime(tides, 5))).toBe("2020-07-30T03:00");
});

test("low tide", () => {
  const tides = [
    { date: "2020-07-30T01:00", alt: 5 },
    { date: "2020-07-30T03:00", alt: 1 },
  ];

  expect(formatDate(getHeightTime(tides, 1))).toBe("2020-07-30T03:00");
  expect(formatDate(getHeightTime(tides, 3))).toBe("2020-07-30T02:00");
  expect(formatDate(getHeightTime(tides, 5))).toBe("2020-07-30T01:00");
});

test("low and high", () => {
  // dates between two heights
  const tides = [
    { date: "2020-07-30T03:00", alt: 1 },
    { date: "2020-07-30T07:00", alt: 1 },
    { date: "2020-07-30T01:00", alt: 5 },
    { date: "2020-07-30T05:00", alt: 5 },
  ];
  expect(getHeightInterval(tides, 3).map(formatDate)).toEqual(["2020-07-30T02:00", "2020-07-30T06:00"]);
});

// yarn babel-node --presets es2015 tides/puertosantander/scraper.js
// TODO: ted musim udelat funkci, ktera projde cely pole a vzdy najde hodnotu pro i a i+1 prvky.

// 01:00 - 5 high
// 02:00 - 3
// 03:00 - 1 low
// 04:00 - 3
// 05:00 - 5 high
// 06:00 - 3
// 07:00 - 1 low
