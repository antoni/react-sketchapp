/* @flow */
import convertToColor from './convertToColor';
import view from './view';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle } from '../types';

const TEXT_ALIGN = {
  auto: 0,
  left: 0,
  right: 1,
  center: 2,
  justify: 3,
};

const text = (
  style: ViewStyle,
  layout: LayoutInfo,
  textStyle: TextStyle,
  value: ?string
): SketchLayer => {
  if (value === null) {
    return view(style, layout, textStyle, value);
  }

  const layer = MSTextLayer
    .alloc()
    .initWithFrame_(NSMakeRect(layout.left, layout.top, layout.width, layout.height));

  // Text Value
  layer.setStringValue(value);

  // Styling

  if (textStyle.fontFamily) {
    // TODO(lmr): handle default font family etc.
    const font = NSFont.fontWithName_size(textStyle.fontFamily, textStyle.fontSize);
    layer.setFont(font);
  }

  if (textStyle.color !== undefined) {
    layer.setTextColor(convertToColor(textStyle.color));
  }

  if (textStyle.lineHeight) {
    // TODO(lmr): have text measurement use lineHeight so we can re-enable this here
    // layer.setLineHeight(textStyle.lineHeight);
  }

  if (textStyle.letterSpacing) {
    layer.setCharacterSpacing(textStyle.letterSpacing);
  }

  if (textStyle.textAlign) {
    layer.setTextAlignment(TEXT_ALIGN[textStyle.textAlign]);
  }

  if (style.opacity !== undefined) {
    layer.style().contextSettings().opacity = style.opacity;
  }

  layer.frame().setWidth(layout.width);
  layer.frame().setHeight(layout.height);

  // TODO: fontWeight

  return layer;
};

module.exports = text;