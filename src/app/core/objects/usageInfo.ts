export class UsageInfo {
  constructor(
    public boatID: string,
    public startTime: any,
    public endTime: any,
    public duration: number,
    public driver: string,
    public otherCrew: [{}],
    public windSpeed: number,
    public windDirection: number,
    public waterState: number
  ) { }
}
