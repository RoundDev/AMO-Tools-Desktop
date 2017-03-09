import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'app-wall-losses',
  templateUrl: './wall-losses.component.html',
  styleUrls: ['./wall-losses.component.css']
})
export class WallLossesComponent implements OnInit {

  wallLosses: Array<any>;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (!this.wallLosses) {
      this.wallLosses = new Array();
    }
  }

  initForm() {
    return this.formBuilder.group({
      'baselineSurfaceArea': [''],
      'baselineAvgSurfaceTemp': [''],
      'baselineAmbientTemp': [''],
      'baselineCorrectionFactor': [''],
      'baselineHeatRequired': [{ value: '', disabled: true }],
      'modifiedSurfaceArea': [''],
      'modifiedAvgSurfaceTemp': [''],
      'modifiedAmbientTemp': [''],
      'modifiedCorrectionFactor': [''],
      'modifiedHeatRequired': [{ value: '', disabled: true }],
    })
  }

  addLoss() {
    let tmpForm = this.initForm();
    let tmpName = 'Loss #' + (this.wallLosses.length + 1);
    this.wallLosses.push({ form: tmpForm, name: tmpName });
  }

  removeLoss(str: string) {
    this.wallLosses = _.remove(this.wallLosses, loss => {
      return loss.name != str;
    });
    this.renameLossess();
  }

  renameLossess() {
    let index = 1;
    this.wallLosses.forEach(loss => {
      loss.name = 'Loss #' + index;
      index++;
    })
  }
}
