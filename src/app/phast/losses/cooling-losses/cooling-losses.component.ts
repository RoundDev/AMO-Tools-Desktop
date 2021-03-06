import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { PhastService } from '../../phast.service';
import { CoolingLossesService } from './cooling-losses.service';
import { Losses } from '../../../shared/models/phast';
import { CoolingLoss } from '../../../shared/models/losses/coolingLoss';

@Component({
  selector: 'app-cooling-losses',
  templateUrl: './cooling-losses.component.html',
  styleUrls: ['./cooling-losses.component.css']
})
export class CoolingLossesComponent implements OnInit {
  @Input()
  losses: Losses;
  @Input()
  saveClicked: boolean;
  @Input()
  lossState: any;
  @Input()
  addLossToggle: boolean;
  @Output('savedLoss')
  savedLoss = new EventEmitter<boolean>();
  @Input()
  baselineSelected: boolean;
  @Output('fieldChange')
  fieldChange = new EventEmitter<string>();

  _coolingLosses: Array<any>;
  firstChange: boolean = true;
  constructor(private coolingLossesService: CoolingLossesService, private phastService: PhastService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.firstChange) {
      if (changes.saveClicked) {
        this.saveLosses();
      }
      if (changes.addLossToggle) {
        this.addLoss();
      }
    }
    else {
      this.firstChange = false;
    }
  }

  ngOnInit() {
    if (!this._coolingLosses) {
      this._coolingLosses = new Array();
    }
    if (this.losses.coolingLosses) {
      this.initCoolingLosses();
    }
  }

  initCoolingLosses() {
    this.losses.coolingLosses.forEach(loss => {
      let tmpLoss: any;
      if (loss.coolingLossType == 'Other Gas' || loss.coolingLossType == 'Air') {
        tmpLoss = {
          coolingMedium: loss.coolingLossType,
          waterCoolingForm: this.coolingLossesService.initWaterCoolingForm(),
          gasCoolingForm: this.coolingLossesService.initGasFormFromLoss(loss.gasCoolingLoss),
          liquidCoolingForm: this.coolingLossesService.initLiquidCoolingForm(),
          name: 'Loss #' + (this._coolingLosses.length + 1),
          heatLoss: loss.heatLoss || 0.0
        };
      } else if (loss.coolingLossType == 'Other Liquid') {
        tmpLoss = {
          coolingMedium: loss.coolingLossType,
          waterCoolingForm: this.coolingLossesService.initWaterCoolingForm(),
          gasCoolingForm: this.coolingLossesService.initGasCoolingForm(),
          liquidCoolingForm: this.coolingLossesService.initLiquidFormFromLoss(loss.liquidCoolingLoss),
          name: 'Loss #' + (this._coolingLosses.length + 1),
          heatLoss: loss.heatLoss || 0.0
        };
      }
      else if (loss.coolingLossType == 'Water') {
        tmpLoss = {
          coolingMedium: loss.coolingLossType,
          waterCoolingForm: this.coolingLossesService.initWaterFormFromLoss(loss.waterCoolingLoss),
          gasCoolingForm: this.coolingLossesService.initGasCoolingForm(),
          liquidCoolingForm: this.coolingLossesService.initLiquidCoolingForm(),
          name: 'Loss #' + (this._coolingLosses.length + 1),
          heatLoss: loss.heatLoss || 0.0
        };
      }
      this.calculate(tmpLoss);
      this._coolingLosses.unshift(tmpLoss);
    })
  }

  addLoss() {
    this._coolingLosses.unshift({
      coolingMedium: 'Air',
      waterCoolingForm: this.coolingLossesService.initWaterCoolingForm(),
      gasCoolingForm: this.coolingLossesService.initGasCoolingForm(),
      liquidCoolingForm: this.coolingLossesService.initLiquidCoolingForm(),
      name: 'Loss #' + (this._coolingLosses.length + 1),
      heatLoss: 0.0
    });
    this.lossState.saved = false;
  }

  removeLoss(str: string) {
    this._coolingLosses = _.remove(this._coolingLosses, loss => {
      return loss.name != str;
    });

    this.lossState.saved = false;
    this.renameLosses();
  }

  renameLosses() {
    let index = 1;
    this._coolingLosses.forEach(loss => {
      loss.name = 'Loss #' + index;
      index++;
    })
  }

  calculate(loss: any) {
    if (loss.coolingMedium == 'Other Gas' || loss.coolingMedium == 'Air') {
      loss.heatLoss = this.phastService.gasCoolingLosses(
        loss.gasCoolingForm.value.gasFlow,
        loss.gasCoolingForm.value.inletTemp,
        loss.gasCoolingForm.value.outletTemp,
        loss.gasCoolingForm.value.avgSpecificHeat,
        loss.gasCoolingForm.value.correctionFactor
      );
    }
    else if (loss.coolingMedium == 'Other Liquid') {
      loss.heatLoss = this.phastService.liquidCoolingLosses(
        loss.liquidCoolingForm.value.liquidFlow,
        loss.liquidCoolingForm.value.density,
        loss.liquidCoolingForm.value.inletTemp,
        loss.liquidCoolingForm.value.outletTemp,
        loss.liquidCoolingForm.value.avgSpecificHeat,
        loss.liquidCoolingForm.value.correctionFactor
      );
    }
    else if (loss.coolingMedium == 'Water') {
      loss.heatLoss = this.phastService.waterCoolingLosses(
        loss.waterCoolingForm.value.liquidFlow,
        loss.waterCoolingForm.value.inletTemp,
        loss.waterCoolingForm.value.outletTemp,
        loss.waterCoolingForm.value.correctionFactor
      );
    }
  }

  saveLosses() {
    let tmpCoolingLosses = new Array<CoolingLoss>();
    this._coolingLosses.forEach(loss => {
      let tmpCoolingLoss: any;
      if (loss.coolingMedium == 'Other Gas' || loss.coolingMedium == 'Air') {
        tmpCoolingLoss = this.coolingLossesService.initGasLossFromForm(loss.gasCoolingForm);
        tmpCoolingLoss.heatLoss = loss.heatLoss;
      }
      else if (loss.coolingMedium == 'Other Liquid') {
        tmpCoolingLoss = this.coolingLossesService.initLiquidLossFromForm(loss.liquidCoolingForm);
        tmpCoolingLoss.heatLoss = loss.heatLoss;
      }
      else if (loss.coolingMedium == 'Water') {
        tmpCoolingLoss = this.coolingLossesService.initWaterLossFromForm(loss.waterCoolingForm);
        tmpCoolingLoss.heatLoss = loss.heatLoss;
      }
      tmpCoolingLosses.unshift(tmpCoolingLoss);
    })
    this.losses.coolingLosses = tmpCoolingLosses;
    this.lossState.numLosses = this.losses.coolingLosses.length;
    this.lossState.saved = true;
    this.savedLoss.emit(true);
  }

  changeField(str: string) {
    this.fieldChange.emit(str);
  }
}
