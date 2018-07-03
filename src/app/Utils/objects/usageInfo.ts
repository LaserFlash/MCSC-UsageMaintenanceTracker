export class UsageInfo {
  constructor(
    public boatID: number,
    public startTime: Date,
    public endTime: Date,
    public duration: number
  ) {}
}
