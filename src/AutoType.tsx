import Cursor from "./Cursor";
import useAutotype, { AutotypeProps } from "./useAutotype";

// TODO: Add array of words with delete in between
// TODO: Add props for various timings
// TODO: Make cursor customizable
//       - Find a way to have a block and underline cursor.
//         Will require access to & wrapping last char of text
//         Also transition target will be different (maybe target all)
// TODO: Make text rendering customizable
// TODO: Create text and cursor themes (renderer pairs)
//       - e.g. retro green console look
// TODO: Add optional typing sound

function Autotype(props: AutotypeProps) {
  const { typedText, isTyping } = useAutotype(props);

  return <Cursor blink={!isTyping}>{typedText}</Cursor>;
}

export default Autotype;
