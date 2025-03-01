export function getRelativePosition(bounds, positioning) {
  let x = bounds.x;
  let y = bounds.y;
  if (!positioning) return { x, y };

  if (positioning.left) x = x + positioning.left;
  if (positioning.right) x = x + bounds.width - positioning.right;

  if (positioning.top) y = y + positioning.top;
  if (positioning.bottom) y = y + bounds.height - positioning.bottom;

  return { x, y };
}
