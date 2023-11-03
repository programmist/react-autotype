import { useEffect, useState } from "react";

type TimeoutHandle = string | number | NodeJS.Timeout | undefined;

interface AutotypeProps {
  text: string;
  isDeletable?: boolean;
  typeDelay?: number;
  deleteDelay?: number;
}

class AutotypeState {
  private cursorPosition: number = 0;
  private timeoutId: TimeoutHandle;

  constructor(
    private text: string,
    private typeDelay: number = 250,
    private deleteDelay: number = 5,
    private onType: (typedText: string) => void
  ) {}

  get typedText() {
    return this.text.slice(0, this.cursorPosition);
  }

  get isTyping() {
    return this.cursorPosition <= this.text.length;
  }

  init() {
    this.timeoutId = this.pauseThenAct(this.typeDelay, this.typeCharacter);
    return () => clearTimeout(this.timeoutId);
  }

  private getRandomDelay() {
    // TODO: remove magic number and calculate range
    const min = this.typeDelay - 50;
    const max = this.typeDelay;
    return Math.random() * (max - min) + min;
  }

  private pauseThenAct(delay: number, nextAction: () => void) {
    return setTimeout(() => nextAction.call(this), delay);
  }

  private typeCharacter() {
    // Vary delay slightly to simulate human typist
    const delay = this.getRandomDelay();

    if (this.text.length >= this.cursorPosition) {
      this.cursorPosition += 1;
      this.onType(this.typedText);
      this.timeoutId = this.pauseThenAct(delay, this.typeCharacter);
    } else {
      this.timeoutId = this.pauseThenAct(250, this.deleteCharacter);
    }
  }

  private deleteCharacter() {
    if (this.cursorPosition > 0) {
      this.cursorPosition -= 1;
      this.onType(this.typedText);
      const delay = this.deleteDelay;
      this.timeoutId = this.pauseThenAct(delay, this.deleteCharacter);
    } else {
      this.timeoutId = this.pauseThenAct(1000, this.init);
    }
  }
}

const useAutotype = ({
  text,
  isDeletable = true,
  typeDelay,
  deleteDelay,
}: AutotypeProps) => {
  const [typedText, setTypedText] = useState("");
  const [typeState] = useState(
    new AutotypeState(text, typeDelay, deleteDelay, (typedText) => {
      setTypedText(typedText);
    })
  );
  useEffect(() => {
    const cleanup = typeState.init();
    return cleanup;
  }, [typeState]);

  return { typedText, isTyping: typeState.isTyping };
};

export default useAutotype;
export type { AutotypeProps };
