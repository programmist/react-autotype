import { useEffect, useState } from "react";
import "./Cursor.css";

interface Props {
  children: string;
  blink?: boolean;
}
function Cursor({ children, blink = true }: Props) {
  const [shouldDisplay, setShouldDisplay] = useState(true);
  useEffect(() => {
    const canx = setInterval(() => {
      setShouldDisplay((display) => !display);
    }, 550);
    return () => clearInterval(canx);
  });

  return (
    <span className="cursor-container cursor-line">
      <span className="text">{children}</span>
      <span
        className="cursor"
        style={{
          display: "inline-block",
          fontSize: "larger",
          ...(blink && blinkStyles(shouldDisplay)),
        }}
      ></span>
    </span>
  );
}

const blinkStyles = (display: boolean) => ({
  opacity: display ? 1 : 0,
  transition: "opacity .5s",
});

export default Cursor;
