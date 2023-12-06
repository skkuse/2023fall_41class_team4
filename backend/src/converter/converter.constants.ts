import { Reference } from './emission-type.enum';

export const CONVERTER_CONFIG = 'CONVERTER_CONFIG';
export const emissionReferences = Object.values(Reference);

export const MICRO = 1_000_000;
export const KILO_TO_MICRO = 1_000 * MICRO;
export const KILO_TO_MILLI = MICRO;
export const HOUR_TO_MICROSECOND = 60 * 60 * MICRO;
