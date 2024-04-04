export class MaximumNumberReachedError extends Error {
  constructor() {
    super('The maximum number of attendees for this event has been reached.')
  }
}
