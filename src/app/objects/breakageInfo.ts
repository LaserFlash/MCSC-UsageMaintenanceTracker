export class BreakageInfo {
  constructor(
    public name: string,
    public contact: string,
    public boatID: string,
    public importance: string,
    public part: string,
    public details: string,
    public timestampFixed: number,
    public timestamp: number
  )
  {}
}
