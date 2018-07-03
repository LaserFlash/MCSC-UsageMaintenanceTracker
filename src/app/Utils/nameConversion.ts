import {UserFriendlyBoats, Levels, WindTypes, WindDirection, WaterState} from '../Utils/menuNames'

export class BoatNameConversionHelper{
  public static boatNameFromNumber(n){
    return UserFriendlyBoats[n];
  }

  public static numberFromUserFriendlyName(s){
    return UserFriendlyBoats.indexOf(s);
  }
}

export class ImportanceConversionHelper{
  public static numberFromImportance(s){
    return Levels.length - 1 - Levels.indexOf(s);
  }

  public static importanceFromNumber(n){
    return Levels[Levels.length - 1 - n];
  }
}


export class WindSpeedConversionHelper{
  public static windSpeedFromNumber(n){
    return WindTypes[n];
  }

  public static numberFromUserFriendlyName(s){
    return WindTypes.indexOf(s);
  }
}

export class WindDirectionConversionHelper{
  public static windDirectionFromNumber(n){
    return WindDirection[n];
  }

  public static numberFromUserFriendlyName(s){
    return WindDirection.indexOf(s);
  }
}

export class WaterStateConversionHelper{
  public static waterStateFromNumber(n){
    return WaterState[n];
  }

  public static numberFromUserFriendlyName(s){
    return WaterState.indexOf(s);
  }
}
