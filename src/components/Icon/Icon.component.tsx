import React from 'react'
import { defaultChannels } from '../../utils';
import { NextIcon, PreviousIcon } from './components';
import './style.scss';

type IconProps = {
  type: string
}

export const Icon = ({ type }: IconProps) => {
  switch (type) {
    case 'next':
      return <NextIcon />;
    case 'previous':
      return <PreviousIcon />;
    default:
      return null;
  }
}