import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlueGas } from '../../../shared/models/losses/flueGas';

@Injectable()
export class FlueGasLossesService {

  constructor(private formBuilder: FormBuilder) { }


  initForm() {
    return this.formBuilder.group({
      'furnaceFlueGasTemp': [''],
      'input': [''],
      'oxygenInFlueGas': [''],
      'excessAir': [''],
      'combustionAirTemp': [''],
      'calculatedO2InFlueGas': [''],
      'availableHeatInput': [''],
    })
  }

  initFormVolume() {
    return this.formBuilder.group({
      'gasTypeId': [1, Validators.required],
      'flueGasTemperature': ['', Validators.required],
      'excessAirPercentage': ['', Validators.required],
      'combustionAirTemperature': ['', Validators.required],
      'CH4': ['', Validators.required],
      'C2H6': ['', Validators.required],
      'N2': ['', Validators.required],
      'H2': ['', Validators.required],
      'C3H8': ['', Validators.required],
      'C4H10_CnH2n': ['', Validators.required],
      'H2O': ['', Validators.required],
      'CO': ['', Validators.required],
      'CO2': ['', Validators.required],
      'SO2': ['', Validators.required],
      'O2': ['', Validators.required]
    })
  }

  initFormMass() {
    return this.formBuilder.group({
      'gasTypeId': [1, Validators.required],
      'flueGasTemperature': ['', Validators.required],
      'excessAirPercentage': ['', Validators.required],
      'combustionAirTemperature': ['', Validators.required],
      'fuelTemperature': ['', Validators.required],
      'moistureInAirComposition': ['', Validators.required],
      'ashDischargeTemperature': ['', Validators.required],
      'unburnedCarbonInAsh': ['', Validators.required],
      'carbon': ['', Validators.required],
      'hydrogen': ['', Validators.required],
      'sulphur': ['', Validators.required],
      'inertAsh': ['', Validators.required],
      'o2': ['', Validators.required],
      'moisture': ['', Validators.required],
      'nitrogen': ['', Validators.required]
    })
  }

  initByVolumeFormFromLoss(loss: FlueGas) {
    return this.formBuilder.group({
      'gasTypeId': [loss.flueGasByVolume.gasTypeId, Validators.required],
      'flueGasTemperature': [loss.flueGasByVolume.flueGasTemperature, Validators.required],
      'excessAirPercentage': [loss.flueGasByVolume.excessAirPercentage, Validators.required],
      'combustionAirTemperature': [loss.flueGasByVolume.combustionAirTemperature, Validators.required],
      'CH4': [loss.flueGasByVolume.CH4, Validators.required],
      'C2H6': [loss.flueGasByVolume.C2H6, Validators.required],
      'N2': [loss.flueGasByVolume.N2, Validators.required],
      'H2': [loss.flueGasByVolume.H2, Validators.required],
      'C3H8': [loss.flueGasByVolume.C3H8, Validators.required],
      'C4H10_CnH2n': [loss.flueGasByVolume.C4H10_CnH2n, Validators.required],
      'H2O': [loss.flueGasByVolume.H2O, Validators.required],
      'CO': [loss.flueGasByVolume.CO, Validators.required],
      'CO2': [loss.flueGasByVolume.CO2, Validators.required],
      'SO2': [loss.flueGasByVolume.SO2, Validators.required],
      'O2': [loss.flueGasByVolume.O2, Validators.required]
    })
  }

  initByMassFormFromLoss(loss: FlueGas) {
    return this.formBuilder.group({
      'gasTypeId': [loss.flueGasByMass.gasTypeId, Validators.required],
      'flueGasTemperature': [loss.flueGasByMass.flueGasTemperature, Validators.required],
      'excessAirPercentage': [loss.flueGasByMass.excessAirPercentage, Validators.required],
      'combustionAirTemperature': [loss.flueGasByMass.combustionAirTemperature, Validators.required],
      'fuelTemperature': [loss.flueGasByMass.fuelTemperature, Validators.required],
      'moistureInAirComposition': [loss.flueGasByMass.moistureInAirComposition, Validators.required],
      'ashDischargeTemperature': [loss.flueGasByMass.ashDischargeTemperature, Validators.required],
      'unburnedCarbonInAsh': [loss.flueGasByMass.unburnedCarbonInAsh, Validators.required],
      'carbon': [loss.flueGasByMass.carbon, Validators.required],
      'hydrogen': [loss.flueGasByMass.hydrogen, Validators.required],
      'sulphur': [loss.flueGasByMass.sulphur, Validators.required],
      'inertAsh': [loss.flueGasByMass.inertAsh, Validators.required],
      'o2': [loss.flueGasByMass.o2, Validators.required],
      'moisture': [loss.flueGasByMass.moisture, Validators.required],
      'nitrogen': [loss.flueGasByMass.nitrogen, Validators.required]
    })
  }

  buildByMassLossFromForm(form: any): FlueGas {
    let tmpFlueGas: FlueGas = {
      flueGasType: "By Mass",
      flueGasByMass: {
        gasTypeId: form.value.gasTypeId,
        flueGasTemperature: form.value.flueGasTemperature,
        excessAirPercentage: form.value.excessAirPercentage,
        combustionAirTemperature: form.value.combustionAirTemperature,
        fuelTemperature: form.value.fuelTemperature,
        ashDischargeTemperature: form.value.ashDischargeTemperature,
        moistureInAirComposition: form.value.moistureInAirComposition,
        unburnedCarbonInAsh: form.value.unburnedCarbonInAsh,
        carbon: form.value.carbon,
        hydrogen: form.value.hydrogen,
        sulphur: form.value.sulphur,
        inertAsh: form.value.inertAsh,
        o2: form.value.o2,
        moisture: form.value.moisture,
        nitrogen: form.value.nitrogen
      }
    }
    return tmpFlueGas;
  }

  buildByVolumeLossFromForm(form: any): FlueGas {
    let tmpFlueGas: FlueGas = {
      flueGasType: "By Volume",
      flueGasByVolume: {
        gasTypeId: form.value.gasTypeId,
        flueGasTemperature: form.value.flueGasTemperature,
        excessAirPercentage: form.value.excessAirPercentage,
        combustionAirTemperature: form.value.combustionAirTemperature,
        CH4: form.value.CH4,
        C2H6: form.value.C2H6,
        N2: form.value.N2,
        H2: form.value.H2,
        C3H8: form.value.C3H8,
        C4H10_CnH2n: form.value.C4H10_CnH2n,
        H2O: form.value.H2O,
        CO: form.value.CO,
        CO2: form.value.CO2,
        SO2: form.value.SO2,
        O2: form.value.O2
      }
    }
    return tmpFlueGas;
  }
}
