export const getStoItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
export const setStoItem = (name,value) => {
  // if(value instanceof Object){
  //   return JSON.stringify(value)
  // }
  window.localStorage.setItem(name,JSON.stringify(value))
}
export const removeStoItem = name => {
  window.localStorage.removeItem(name)
}