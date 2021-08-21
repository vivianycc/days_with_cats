export const machine = {
  initial: "idle",
  states: {
    idle: {
      on: {
        TIME_TO_EAT: "hungry",
        TIME_TO_SLEEP: "sleeping",
        TIME_TO_WALK: "walking",
        PET: "beingpetted",
      },
    },
    sleeping: {
      on: {
        TIME_TO_WAKEUP: "idle",
      },
    },
    hungry: {
      on: {
        FEED: "idle",
        STARVE: "sick",
      },
    },
    walking: {
      on: {
        TIME_TO_SIT: "idle",
      },
    },
    beingpetted: {
      on: {
        PISSED: "angry",
        HAPPY: "happy",
      },
    },
    sick: {
      on: {
        FEED: "hungry",
      },
    },
    angry: {
      on: {
        IDLE: "idle",
      },
    },
  },
};

export function transition(state, event) {
  return machine.states[state].on[event] || state;
}
