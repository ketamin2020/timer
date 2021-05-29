import React, { useEffect, useState, useCallback } from "react";
import { Observable, fromEvent } from "rxjs";
import { map, buffer, debounceTime, filter, takeUntil } from "rxjs/operators";
import TimerMarkup from "./TimerMarkup";

const Timer = () => {
  const [state, setState] = useState("stop");
  const [time, setTime] = useState(0);

  const mouseClicked = useCallback(() => {
    const mouseDoubleClick = fromEvent(
      document.getElementsByClassName("wait"),
      "click"
    );

    return mouseDoubleClick.pipe(
      buffer(mouseDoubleClick.pipe(debounceTime(300))),
      map((list) => list.length),
      filter((x) => x >= 2 && waitTimer())
    );
  }, []);

  const waitTimer = useCallback(() => {
    setState("wait");
  }, []);

  const startTimer = useCallback(() => {
    setState("start");
  }, []);

  const stopTimer = useCallback(() => {
    setTime(0);
    setState("stop");
  }, []);

  const resetTimer = useCallback(() => {
    setTime(0);
  }, []);

  useEffect(() => {
    const timer = new Observable((observer) => {
      let count = 0;
      let id = setInterval(() => {
        observer.next((count += 1000));
      }, 1000);

      return () => {
        clearInterval(id);
      };
    });

    const subscription = timer.pipe(takeUntil(mouseClicked())).subscribe({
      next: () => {
        if (state === "start") {
          setTime((prev) => prev + 1000);
        }
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [state, mouseClicked]);
  return (
    <TimerMarkup
      time={time}
      start={startTimer}
      stop={stopTimer}
      reset={resetTimer}
    />
  );
};

export default Timer;
