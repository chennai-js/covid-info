export let getChipType = (percentile) => {
  percentile = isNaN(percentile) ? 0 : percentile == Infinity ? 0 : percentile;
  console.log("incoming percentile", percentile);
  switch(true) {
    case percentile < 1: 
      return "Error";
    case percentile <= 25:
      return "Warn";
    case percentile > 25:
      return "Info";
    
  }
}