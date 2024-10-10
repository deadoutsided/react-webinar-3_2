export default function insertNewComment(list, payloadData) {
  console.log(list.findIndex(el => el._id === payloadData.parent._id))
  console.log(list.findIndex(el => el._id === 'form'))
  console.log(payloadData)
  payloadData.children = []
  if(list.length > 0 && list.findIndex(el => el._id === 'form') - list.findIndex(el => el._id === payloadData.parent._id) === 0){
      list.splice(
      list.findIndex(el => el._id === payloadData.parent._id) === -1
        ? list.length
        : list.findIndex(el => el._id === payloadData.parent._id) + 1,
      0,
      { ...payloadData, level: payloadData.level },
    )
      list[list.findIndex(el => el._id === payloadData.parent._id)].children.push(payloadData);
  }
  else {list.splice(
    list.findIndex(el => el._id === payloadData.parent._id) + (list.findIndex(el => el._id === 'form') - list.findIndex(el => el._id === payloadData.parent._id)),
    0,
    { ...payloadData, level: payloadData.level },
  ); list[list.findIndex(el => el._id === payloadData.parent._id)].children.push(payloadData)}
  /* list.length > 0
    ? list.splice(
        list.findIndex(el => el._id === payloadData.parent._id) === -1
          ? list.length
          : list.findIndex(el => el._id === payloadData.parent._id) + 1,
        0,
        { ...payloadData, level: payloadData.level },
      )
    : { ...payloadData, level: 0 }; */
}
