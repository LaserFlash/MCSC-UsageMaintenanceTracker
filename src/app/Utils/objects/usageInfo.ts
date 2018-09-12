export class UsageInfo {
  constructor(
    public boatID: number,
    public startTime: Date,
    public endTime: Date,
    public duration: number,
    public driver: string,
    public otherCrew: [{}],
    public windSpeed: number,
    public windDirection: number,
    public waterState: number
  ) { }
}
