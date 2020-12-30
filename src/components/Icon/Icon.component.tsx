import React from 'react'
import { defaultChannels } from '../../utils';
import { NextIcon, PreviousIcon, XIcon } from './components';

type IconProps = {
  type: string
}

export const Icon = ({ type }: IconProps) => {
  switch (type) {
    case 'next':
      return <NextIcon />;
    case 'previous':
      return <PreviousIcon />;
    case 'x':
      return <XIcon />
    default:
      return null;
  }
}