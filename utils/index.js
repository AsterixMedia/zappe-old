export const retrieveAuthLocalStorage = () => {
  const localStorage = window.localStorage
  return JSON.parse(localStorage.getItem('zappe:authUser'))
}
