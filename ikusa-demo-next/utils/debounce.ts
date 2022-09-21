export default (func: (...args: any) => void, wait: number) => {
  let timeout:any

  return function executedFunction (...args: any[]) {
    const later = () => {
      // null timeout to indicate the debounce ended
      timeout = null

      // Execute the callback
      func(...args)
    }
    clearTimeout(timeout)

    // Restart the debounce waiting period.
    // setTimeout returns a truthy value (it differs in web vs Node)
    timeout = setTimeout(later, wait)
  }
}
