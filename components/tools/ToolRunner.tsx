'use client';

import React from 'react';
import { InvoiceGenerator } from './accountant/InvoiceGenerator';
import { ProfitMarginCalculator } from './accountant/ProfitMarginCalculator';
import { LoanEmiCalculator } from './accountant/LoanEmiCalculator';
import { HourlyRateCalculator } from './accountant/HourlyRateCalculator';
import { JsonFormatter } from './developer/JsonFormatter';
import { Base64UrlConverter } from './developer/Base64UrlConverter';
import { CssShadowGenerator } from './developer/CssShadowGenerator';
import { UuidGenerator } from './developer/UuidGenerator';

interface ToolRunnerProps {
  toolId: 'invoice' | 'margin' | 'emi' | 'hourly' | 'json' | 'base64' | 'shadow' | 'uuid';
}

export function ToolRunner({ toolId }: ToolRunnerProps) {
  switch (toolId) {
    case 'invoice':
      return <InvoiceGenerator />;
    case 'margin':
      return <ProfitMarginCalculator />;
    case 'emi':
      return <LoanEmiCalculator />;
    case 'hourly':
      return <HourlyRateCalculator />;
    case 'json':
      return <JsonFormatter />;
    case 'base64':
      return <Base64UrlConverter />;
    case 'shadow':
      return <CssShadowGenerator />;
    case 'uuid':
      return <UuidGenerator />;
    default:
      return null;
  }
}
