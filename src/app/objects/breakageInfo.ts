export class BreakageInfo {
  constructor(
    public name: string,
    public contact: string,
    public boatID: number,
    public importance: number,
    public part: string,
    public details: string,
    public timestampFixed: Date,
    public timestamp: Date,
    public id: string,
    public imageID: string
  )
  {}
}
