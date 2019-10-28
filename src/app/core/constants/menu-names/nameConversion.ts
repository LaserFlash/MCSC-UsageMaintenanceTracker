import { Levels, WindTypes, WindDirection, WaterState } from './menuNames';

export class ImportanceConversionHelper {
  public static numberFromImportance(s) {
    return Levels.length - 1 - Levels.indexOf(s);
  }

  public static importanceFromNumber(n) {
    return Levels[Levels.length - 1 - n];
  }
}


export class WindSpeedConversionHelper {
  public static windSpeedFromNumber(n) {
    return WindTypes[n];
  }

  public static numberFromUserFriendlyName(s) {
    return WindTypes.indexOf(s);
  }
}

export class WindDirectionConversionHelper {
  public static windDirectionFromNumber(n) {
    return WindDirection[n];
  }

  public static numberFromUserFriendlyName(s) {
    return WindDirection.indexOf(s);
  }
}

export class WaterStateConversionHelper {
  public static waterStateFromNumber(n) {
    return WaterState[n];
  }

  public static numberFromUserFriendlyName(s) {
    return WaterState.indexOf(s);
  }
}
