export class ExternalRocketDto {
  height: Height;
  diameter: Diameter;
  mass: Mass;
  first_stage: FirstStage;
  second_stage: SecondStage;
  engines: Engines;
  landing_legs: LandingLegs;
  payload_weights: PayloadWeight[];
  flickr_images: string[];
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
  id: string;
}

export class Height {
  meters: number;
  feet: number;
}

export class Diameter {
  meters: number;
  feet: number;
}

export class Mass {
  kg: number;
  lb: number;
}

export class FirstStage {
  thrust_sea_level: ThrustSeaLevel;
  thrust_vacuum: ThrustVacuum;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
}

export class ThrustSeaLevel {
  kN: number;
  lbf: number;
}

export class ThrustVacuum {
  kN: number;
  lbf: number;
}

export class SecondStage {
  thrust: Thrust;
  payloads: Payloads;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
}

export class Thrust {
  kN: number;
  lbf: number;
}

export class Payloads {
  composite_fairing: CompositeFairing;
  option_1: string;
}

export class CompositeFairing {
  height: Height2;
  diameter: Diameter2;
}

export class Height2 {
  meters: number;
  feet: number;
}

export class Diameter2 {
  meters: number;
  feet: number;
}

export class Engines {
  isp: Isp;
  thrust_sea_level: ThrustSeaLevel2;
  thrust_vacuum: ThrustVacuum2;
  number: number;
  type: string;
  version: string;
  layout: string;
  engine_loss_max: number;
  propellant_1: string;
  propellant_2: string;
  thrust_to_weight: number;
}

export class Isp {
  sea_level: number;
  vacuum: number;
}

export class ThrustSeaLevel2 {
  kN: number;
  lbf: number;
}

export class ThrustVacuum2 {
  kN: number;
  lbf: number;
}

export class LandingLegs {
  number: number;
  material: string;
}

export class PayloadWeight {
  id: string;
  name: string;
  kg: number;
  lb: number;
}
