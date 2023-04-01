export function getCurrentBoardId() {
  return location.href.split('/board/').pop() ?? ''
}
