import { startListener } from "@lib/error-handler";

import {
  setupReferencesError,
  setupTypeError,
  setupUnhandledRejection
} from "./errors";
import './style.css'

startListener()
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Errors</h1>
    <div class="card">
      <button id="type-error" type="button">Type Error</button>
      <button id="references-error" type="button">References Error</button>
    </div>
    <hr />
    <div class="card">
      <p>UnhandledRejection</p>
      <button id="fetch" type="button">fetch</button>
    </div>
  </div>
`

setupTypeError(document.querySelector<HTMLButtonElement>('#type-error')!)
setupReferencesError(document.querySelector<HTMLButtonElement>('#references-error')!)
setupUnhandledRejection(document.querySelector<HTMLButtonElement>('.card>#fetch')!)
