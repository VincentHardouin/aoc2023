function transpose(array) {
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]))
}

export {
  transpose,
}
