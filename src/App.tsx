import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { getPeriodForHour, getRandomMessage } from './quotes';
import { getGradientForTime } from './background';

interface TimeParts {
  hours: number;
  minutes: number;
  seconds: number;
  dateLabel: string;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

// Reads the current time as IST explicitly, regardless of the device's
// own timezone setting, so this always shows IST.
function getISTParts(): TimeParts {
  const now = new Date();

  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = Object.fromEntries(
    fmt.formatToParts(now).map((p) => [p.type, p.value])
  ) as Record<string, string>;

  const hours = Number(parts.hour) % 24; // some browsers report midnight as "24"

  return {
    hours,
    minutes: Number(parts.minute),
    seconds: Number(parts.second),
    dateLabel: now.toLocaleDateString('en-US', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  };
}

function App() {
  const [time, setTime] = useState<TimeParts>(getISTParts());
  const period = getPeriodForHour(time.hours);
  const [message, setMessage] = useState<string>(() => getRandomMessage(period.key));

  // Tick the clock every second — this also drives the time-based gradient.
  useEffect(() => {
    const id = setInterval(() => setTime(getISTParts()), 1000);
    return () => clearInterval(id);
  }, []);

  // If the time-of-day bucket changes (e.g. you leave the tab open across
  // a boundary), pull a fresh message for the new period automatically.
  useEffect(() => {
    setMessage(getRandomMessage(period.key));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period.key]);

  const reroll = useCallback(() => {
    setMessage((prev) => getRandomMessage(period.key, prev));
  }, [period.key]);

  const { hours, minutes, seconds, dateLabel } = time;
  const gradient = getGradientForTime(hours, minutes, seconds);

  return (
    <div className="App" style={{ background: gradient }}>
      {/* Slow drifting sheen — always visibly moving, independent of the clock.
          The true time-of-day color lives underneath in the .App background. */}
      <div className="drift" />
      <div className="glow" />

      <div className="content">
        <p className="date">{dateLabel} · IST</p>

        <h1 className="clock">
          {pad(hours)}
          <span>:</span>
          {pad(minutes)}
          <span>:</span>
          {pad(seconds)}
        </h1>

        <p className="period-label">
          <span className="period-icon">{period.icon}</span> {period.label}
        </p>

        <div className="message-card">
          <p className="message">{message}</p>
          <button className="reroll" onClick={reroll} aria-label="Show another message">
            Another one →
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;