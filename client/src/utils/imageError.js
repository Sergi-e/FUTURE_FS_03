/** Hide failed avatar image and show the following initials fallback sibling. */
export function handleAvatarImageError(e) {
  e.target.style.display = 'none';
  const next = e.target.nextElementSibling;
  if (next) next.style.display = 'flex';
}
