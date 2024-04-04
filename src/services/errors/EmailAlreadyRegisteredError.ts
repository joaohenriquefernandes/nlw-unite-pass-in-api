export class EmailAlreadyRegisteredError extends Error {
  constructor() {
    super('This e-mail is alredy resgistered for this event.')
  }
}
