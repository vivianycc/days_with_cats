export function createTimer() {
  let time = 0;

  function tick() {
    time = time + 1;
    // console.log(time);
  }
  function reset() {
    time = 0;
  }
  function getTime() {
    return time;
  }
  return {
    tick,
    reset,
    getTime,
  };
}
