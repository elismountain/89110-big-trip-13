const KeyboardKey = {
  ESCAPE: `Escape`,
  ESCAPE_IE: `Esc`,
};


export const isEscapeKey = (evt) =>
  evt.key === KeyboardKey.ESCAPE
    || evt.key === KeyboardKey.ESCAPE_IE;
