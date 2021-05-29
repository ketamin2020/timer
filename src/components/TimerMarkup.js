import React from "react";

const TimerMarkup = ({ time, start, stop, reset }) => (
  <>
    <header>
      <h1>Timer</h1>
      <h1>{new Date(time).toISOString().slice(11, 19)}</h1>
    </header>
    <section>
      <div>
        <button type="button" onClick={start}>
          Start
        </button>
        <button type="button" onClick={stop}>
          Stop
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
        <button type="button" className=" wait ">
          Wait
        </button>
      </div>
    </section>
  </>
);

export default TimerMarkup;
