export class AttendeeAlreadyCheckedInError extends Error {
  constructor() {
    super('Attendee already checked in.')
  }
}
