import React from 'react'
import { defaultChannels } from '../../utils';
import { ChevronLeft, NextIcon, PreviousIcon, MinusIcon } from './components';

type IconProps = {
  type: string
}

export const Icon = ({ type }: IconProps) => {
  switch (type) {
    case 'chevron-left':
      return <ChevronLeft />;
    case 'next':
      return <NextIcon />;
    case 'previous':
      return <PreviousIcon />;
    case 'minus':
      return <MinusIcon />
    default:
      return null;
  }
}