import React from 'react';
import { Container } from './style';


type BulletProps = {
  active?: boolean;
}

export function Bullet({ active = false }: BulletProps){
  return(
    <Container
      active={active}
    />
  )
}