export const objToQueryString = (obj: object) => {
  const keyValuePairs = []
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    )
  }
  return keyValuePairs.join('&')
}
