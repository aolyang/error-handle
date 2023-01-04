export const setupTypeError = (el: HTMLButtonElement) => {
  el.onclick = () => {
    const fn = (obj: any) => console.log(obj.name)
    fn(null)
  }
}

export const setupReferencesError = (el: HTMLButtonElement) => {
  el.onclick = () => {
    // @ts-ignore
    console.log(bbb)
  }
}

export const setupUnhandledRejection = (el: HTMLButtonElement) => {
  el.onclick = () => {
    // @ts-ignore
    fetch("/api/v1/bad/path").then(() => console.log(bbb))
  }
}
