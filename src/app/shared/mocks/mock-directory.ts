import { Directory } from '../models/directory';

export const MockDirectory: Directory = {
  name: 'Root Directory',
  collapsed: false,
  createdDate: new Date(),
  modifiedDate: new Date(),
  assessments: [
    {
      createdDate: new Date(),
      modifiedDate: new Date(),
      name: 'Example PSAT',
      type: 'PSAT',
      psat:
      {
        name: 'Baseline',
        inputs: {
          pump_style: 6,
          pump_specified: null,
          pump_rated_speed: 1780,
          drive: 0,
          kinematic_viscosity: 1.0,
          specific_gravity: 1.0,
          stages: 2.0,
          fixed_speed: 1,
          line_frequency: 0,
          motor_rated_power: 200,
          motor_rated_speed: 1780,
          efficiency_class: 2,
          efficiency: 95,
          motor_rated_voltage: 460,
          load_estimation_method: 0,
          motor_rated_fla: 225.0,
          margin: 0,
          operating_fraction: 1,
          flow_rate: 1840,
          head: 174.85,
          motor_field_power: 80,
          motor_field_current: null,
          motor_field_voltage: 480,
          cost_kw_hour: .05,
          cost: .05
        },
        setupDone: true
      }

    },
    {
      name: 'Example PHAST',
      type: 'PHAST',
      createdDate: new Date(),
      modifiedDate: new Date(),
      phast: {
        losses: {
          chargeMaterials: [
            {
              chargeMaterialType: 'Gas',
              gasChargeMaterial: {
                materialId: 1,
                thermicReactionType: 0,
                specificHeatGas: 0.24,
                feedRate: 1000,
                percentVapor: 15,
                initialTemperature: 80,
                dischargeTemperature: 1150,
                specificHeatVapor: .5,
                percentReacted: 100,
                reactionHeat: 80,
                additionalHeat: 5000
              }
            },
            {
              chargeMaterialType: 'Solid',
              solidChargeMaterial: {
                materialId: 1,
                thermicReactionType: 1,
                specificHeatSolid: .15,
                latentHeat: 60,
                specificHeatLiquid: .481,
                meltingPoint: 2900,
                chargeFeedRate: 10000,
                waterContentCharged: .1,
                waterContentDischarged: 0.0,
                initialTemperature: 70.0,
                dischargeTemperature: 2200,
                waterVaporDischargeTemperature: 500,
                chargeMelted: 0.0,
                chargeReacted: 1.0,
                reactionHeat: 100,
                additionalHeat: 0
              }
            },
            {
              chargeMaterialType: 'Liquid',
              liquidChargeMaterial: {
                materialId: 1,
                thermicReactionType: 0,
                specificHeatLiquid: .48,
                vaporizingTemperature: 240,
                latentHeat: 250,
                specificHeatVapor: .25,
                chargeFeedRate: 1000,
                initialTemperature: 70,
                dischargeTemperature: 320,
                percentVaporized: 100,
                percentReacted: 25,
                reactionHeat: 50,
                additionalHeat: 0
              }
            }
          ],
          wallLosses: [
            {
              surfaceArea: 500.0,
              ambientTemperature: 80.0,
              surfaceTemperature: 225.0,
              windVelocity: 10.0,
              surfaceEmissivity: 0.9,
              conditionFactor: 1.394,
              surfaceShape: 'Vertical Plates',
              correctionFactor: 1.0
            },
          ],
          atmosphereLosses: [
            {
              atmosphereGas: 'Test Gas',
              specificHeat: 0.02,
              inletTemperature: 100.0,
              outletTemperature: 1400.0,
              flowRate: 1200.0,
              correctionFactor: 1.0,
            }
          ],
          openingLosses: [
            {
              numberOfOpenings: 1,
              emessivity: .95,
              thickness: 9.0,
              ambientTemperature: 75.0,
              insideTemperature: 1600,
              percentTimeOpen: 100,
              viewFactor: .7,
              openingType: 'Round',
              lengthOfOpening: 12.0,
            }, {
              numberOfOpenings: 1,
              emessivity: .95,
              thickness: 9.0,
              ambientTemperature: 75.0,
              insideTemperature: 1600,
              percentTimeOpen: 20,
              viewFactor: .64,
              openingType: 'Rectangular (Square)',
              lengthOfOpening: 48.0,
              heightOfOpening: 15.0
            }
          ],
          coolingLosses: [
            {
              coolingLossType: 'Other Gas',
              gasCoolingLoss: {
                flowRate: 2500.0,
                initialTemperature: 80.0,
                finalTemperature: 280.0,
                specificHeat: 0.02,
                correctionFactor: 1.0
              }
            },
            {
              coolingLossType: 'Other Gas',
              gasCoolingLoss: {
                flowRate: 600.0,
                initialTemperature: 80.0,
                finalTemperature: 350.0,
                specificHeat: 0.02,
                correctionFactor: 1.0
              }
            },
            {
              coolingLossType: 'Other Liquid',
              liquidCoolingLoss: {
                flowRate: 100.0,
                density: 9.35,
                initialTemperature: 80.0,
                outletTemperature: 210.0,
                specificHeat: .52,
                correctionFactor: 1.0
              }
            },
            {
              coolingLossType: 'Water',
              waterCoolingLoss: {
                flowRate: 100.0,
                initialTemperature: 80.0,
                outletTemperature: 120.0,
                correctionFactor: 1.0
              }
            }
          ],
          fixtureLosses: [
            {
              materialName: 'Material 1',
              specificHeat: 0.122,
              feedRate: 1250.0,
              initialTemperature: 300.0,
              finalTemperature: 1800.0,
              correctionFactor: 1.0
            }
          ],
          leakageLosses: [
            {
              draftPressure: 0.1,
              openingArea: 3.0,
              leakageGasTemperature: 1600.0,
              ambientTemperature: 80.0,
              coefficient: .8052,
              specificGravity: 1.02,
              correctionFactor: 1.0
            }
          ],
          flueGasLosses: [
            {
              flueGasType: "By Volume",
              flueGasByVolume: {
                flueGasTemperature: 700,
                excessAirPercentage: 9.0,
                combustionAirTemperature: 125,
                CH4: 94.1,
                C2H6: 2.4,
                N2: 1.41,
                H2: 0.03,
                C3H8: 0.49,
                C4H10_CnH2n: 0.29,
                H2O: 0,
                CO: 0.42,
                CO2: 0.71,
                SO2: 0,
                O2: 0
              }
            },
            {
              flueGasType: "By Mass",
              flueGasByMass: {
                flueGasTemperature: 700,
                excessAirPercentage: 9.0,
                combustionAirTemperature: 125,
                fuelTemperature: 70,
                moistureInAirComposition: 1.0,
                ashDischargeTemperature: 100,
                unburnedCarbonInAsh: 1.5,
                carbon: 75.0,
                hydrogen: 5.0,
                sulphur: 1.0,
                inertAsh: 9.0,
                o2: 7.0,
                moisture: 0.0,
                nitrogen: 1.5
              }
            }
          ]
        },
        setupDone: true
      }
    }
  ]
}
