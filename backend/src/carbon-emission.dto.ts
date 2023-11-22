export class CarbonEmissionDto {
  emission: number;
  powerConsumption: number;
  tvEmission: number;
  carEmission: number;
  elevatorEmission: number;
  paperEmission: number;

  constructor(
    emission: number,
    powerConsumption: number,
    tvEmission: number,
    carEmission: number,
    elevatorEmission: number,
    paperEmission: number,
  ) {
    this.emission = emission;
    this.powerConsumption = powerConsumption;
    this.tvEmission = tvEmission;
    this.carEmission = carEmission;
    this.elevatorEmission = elevatorEmission;
    this.paperEmission = paperEmission;
  }
}
