const KeyboardKey = {
  ESCAPE: `Escape`,
  ESCAPE_IE: `Esc`,
};


export const isEscapeKey = (event) =>
  event.key === KeyboardKey.ESCAPE
    || event.key === KeyboardKey.ESCAPE_IE;
