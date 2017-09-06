import { Component } from '@angular/core';

@Component({
  selector: 'app-safety-procedures',
  templateUrl: './safety-procedures.component.html',
  styleUrls: ['./safety-procedures.component.css']
})
export class SafetyProceduresComponent {
  constructor() {}
  
  links =
  [
    {a:"https://drive.google.com/file/d/0BwFE4hc768gQeGRkSTItS01iR0k", text:"Anti-Fouling"},
    {a:"https://drive.google.com/open?id=0BwFE4hc768gQbmlZY204andYcU0", text:"Confined Spaces"},
    {a:"https://drive.google.com/open?id=0BwFE4hc768gQMXA3X0x1cjZRQ2M", text:"Mast raising and lowering"},
    {a:"https://drive.google.com/open?id=0BwFE4hc768gQLWhxazZwVkF1d0U ", text:"Refueling"},
    {a:"https://drive.google.com/open?id=0BwFE4hc768gQbEQ5WFRVSGNITkk", text:"Towing"},
  ]

}
