import { Component, OnInit, Input } from '@angular/core';
import { PSAT } from '../../../shared/models/psat';
import { Settings } from '../../../shared/models/settings';
import { PsatService } from '../../psat.service';
import { ConvertUnitsService } from '../../../shared/convert-units/convert-units.service';
@Component({
  selector: 'app-field-data-help',
  templateUrl: './field-data-help.component.html',
  styleUrls: ['./field-data-help.component.css']
})
export class FieldDataHelpComponent implements OnInit {
  @Input()
  currentField: string;
  @Input()
  settings: Settings;
  @Input()
  psat: PSAT;

  maxFlowRate: number;
  minFlowRate: number;
  constructor(private psatService: PsatService, private convertUnitsService: ConvertUnitsService) { }

  ngOnInit() {
    this.minFlowRate = this.getMinFlowRate();
    this.maxFlowRate = this.getMaxFlowRate();
  }

  getMinFlowRate() {
    let flowRateRange = this.psatService.getFlowRateMinMax(this.psat.inputs.pump_style);
    if(this.settings.flowMeasurement != 'gpm'){
      flowRateRange.min = this.convertUnitsService.value(flowRateRange.min).from('gpm').to(this.settings.flowMeasurement);
    }
    return flowRateRange.min;
  }


  getMaxFlowRate() {
    let flowRateRange = this.psatService.getFlowRateMinMax(this.psat.inputs.pump_style);
    if(this.settings.flowMeasurement != 'gpm'){
      flowRateRange.max = this.convertUnitsService.value(flowRateRange.max).from('gpm').to(this.settings.flowMeasurement);
    }
    return flowRateRange.max;
  }


}
