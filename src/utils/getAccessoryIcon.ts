import SpeedSvg from '../assets/speed.svg'
import AccelerateSvg from '../assets/acceleration.svg'
import ForceSvg from '../assets/force.svg'
import GasolineSvg from '../assets/gasoline.svg'
import EnergySvg from '../assets/energy.svg'
import HybridSvg from  '../assets/hybrid.svg'
import ExchangeSvg from '../assets/exchange.svg'
import PeopleSvg from '../assets/person.svg'
import CarSvg from '../assets/car.svg'

export function getAccessoryIcon(type: string){
  switch (type) {
    case 'speed':
      return SpeedSvg;
    case 'acceleration':
      return AccelerateSvg;
    case 'turning_diameter':
      return ForceSvg;
    case 'gasoline_motor':
      return GasolineSvg;
    case 'electric_motor':
      return EnergySvg;
    case 'hybrid_motor':
      return HybridSvg;
    case 'exchange':
      return ExchangeSvg;
    case 'seats':
      return PeopleSvg;
    default:
      return CarSvg;
  }
}