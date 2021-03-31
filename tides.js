const getDate = (time) => {
  const today = new Date();
  const date = [today.getFullYear(), today.getMonth() + 1, today.getDate()].join("-");
  return new Date([date, time].join("T"));
};

export const getHeightTime = (tides, threshold) => {
  const h1 = tides[0].alt;
  const t1 = new Date(tides[0].date).getTime();
  const h2 = tides[1].alt;
  const t2 = new Date(tides[1].date).getTime();
  const slope = -(((h2 - h1) / (t2 - t1)) * t1 - h1);
  // const threshold = (h2 - h1) / (t2 - t1) * time - slope
  const timestamp = (threshold - slope) / ((h2 - h1) / (t2 - t1));
  return new Date(timestamp);
};

export const getHeightInterval = (tides, threshold) => {
  const tidesSorted = sortTides(tides);
  const tide1 = getHeightTime([tidesSorted[0], tidesSorted[1]], threshold);
  const tide2 = getHeightTime([tidesSorted[2], tidesSorted[3]], threshold);
  return [tide1, tide2];
};

export const sortTides = (tides) => {
  const tidesClone = [...tides];
  tidesClone.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
  return tidesClone;
};
