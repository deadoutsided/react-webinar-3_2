export default function countLevels(list, id) {
  let childrenCount = 0
  let next = list[list.findLastIndex((el) => el.parent._id === id)]
  while(next?.children?.length){
    childrenCount++;
    next = next?.children[next.children.length - 1];
  }
  return childrenCount;
}
