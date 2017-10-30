export class BreakageInfo {
  constructor(
    public name: string,
    public contact: string,
    public boatID: string,
    public importance: string,
    public part: string,
    public details: string,
    public timestampFixed: Date,
    public timestamp: Date
  )
  {}
}
