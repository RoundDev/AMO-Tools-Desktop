import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { PSAT } from '../../../../shared/models/psat';
import { Settings } from '../../../../shared/models/settings';

@Component({
  selector: 'app-system-curve-form',
  templateUrl: './system-curve-form.component.html',
  styleUrls: ['./system-curve-form.component.css']
})
export class SystemCurveFormComponent implements OnInit {
  @Input()
  curveConstants: any;
  @Input()
  pointOne: any;
  @Input()
  pointTwo: any;
  @Output('calculate')
  calculate = new EventEmitter<boolean>();
  @Output('calculateP1')
  calculateP1 = new EventEmitter<boolean>();
  @Output('calculateP2')
  calculateP2 = new EventEmitter<boolean>();
  @Input()
  psat: PSAT;
  @Input()
  settings: Settings;

  options: Array<PSAT>;

  p1FlowRate: number;
  p1Head: number;
  p1Option: string;
  p2FlowRate: number;
  p2Head: number;
  p2Option: string;
  tmpSpecificGravity: number;
  tmpSystemLossExponent: number;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.options = new Array<PSAT>();
    if (this.psat) {
      this.options.push(this.psat);
      if (this.psat.modifications) {
        this.psat.modifications.forEach(mod => {
          this.options.push(mod.psat);
        })
      }
    } else {
      
      this.p1Option = 'Point 1';
      this.p2Option = 'Point 2';
    }

    if (this.pointOne) {
      this.p1Head = this.pointOne.form.value.head;
      this.p1FlowRate = this.pointOne.form.value.flowRate;
      this.p1Option = this.pointOne.form.value.pointAdjustment;
    }

    if (this.pointTwo) {
      this.p2Head = this.pointTwo.form.value.head;
      this.p2FlowRate = this.pointTwo.form.value.flowRate;
      this.p2Option = this.pointTwo.form.value.pointAdjustment;
    }

    if (this.curveConstants) {
      this.tmpSpecificGravity = this.curveConstants.form.value.specificGravity;
      this.tmpSystemLossExponent = this.curveConstants.form.value.systemLossExponent;
    }
    this.checkInputs();
  }

  checkInputs() {
    this.setFormValues();
    let p1 = this.checkForm(this.pointOne);
    let p2 = this.checkForm(this.pointTwo);
    let cc = this.checkForm(this.curveConstants);
    
    if (p1) {
      this.calculateP1.emit(true);
    }
    if (p2) {
        this.calculateP2.emit(true);
    }
    if (p1 && p2 && cc) {
      this.calculate.emit(true);
    }
  }

  checkForm(point: any) {
    if (point.form.status == "VALID") {
      return true;
    }
    else {
      return false;
    }
  }

  setFormValues() {
    this.pointOne.form.patchValue({
      flowRate: this.p1FlowRate,
      head: this.p1Head,
      pointAdjustment: this.p1Option
    })

    this.pointTwo.form.patchValue({
      flowRate: this.p2FlowRate,
      head: this.p2Head,
      pointAdjustment: this.p2Option
    })
    this.curveConstants.form.patchValue({
      specificGravity: this.tmpSpecificGravity,
      systemLossExponent: this.tmpSystemLossExponent
    })

  }

}
