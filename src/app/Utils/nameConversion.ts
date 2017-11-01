import {UserFriendlyBoats, Levels} from '../Utils/menuNames'

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
    return Levels.indexOf(s);
  }

  public static importanceFromNumber(n){
    return Levels[Levels.length - 1 - n];
  }
}
