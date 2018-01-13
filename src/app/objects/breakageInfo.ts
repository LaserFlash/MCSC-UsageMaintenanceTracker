export class BreakageInfo {
  constructor(
    public name: string = null,
    public contact: string = null,
    public boatID: number = null,
    public importance: number = null,
    public part: string = null,
    public details: string = null,
    public timestampFixed: Date = null,
    public timestamp: Date = null,
    public id: string = null,
    public imageID: string = null
  )
  {}
}
