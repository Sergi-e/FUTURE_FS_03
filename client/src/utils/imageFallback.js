/** Hide failed image and show the next sibling (initials fallback). */
export function handleAvatarImageError(e) {
  e.target.style.display = 'none';
  const next = e.target.nextElementSibling;
  if (next) next.style.display = 'flex';
}
