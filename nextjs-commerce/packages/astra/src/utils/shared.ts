export const objToQueryString = (obj: object) => {
  const keyValuePairs = []
  for (const key in obj) {
    if (obj[key])
      keyValuePairs.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
      )
  }
  return keyValuePairs.join('&')
}
