// http://fontawesome.io/icons/

import React from 'react';

export interface Props {
  id: string;
  opts?: string;
  className?: string;
}

export default function Icon({ id, opts = '', className = '' }: Props) {
  const options = opts.split(' ').map((c) => `fa-${c}`).join(' ');
  return (
    <i
      className={`fa fa-${id} ${options} ${className}`}
      area-hidden="true"
    />
  );
}
