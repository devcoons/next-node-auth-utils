/* ---------------------------------------------------------------------- */
/* Filepath: <path> */
/* ---------------------------------------------------------------------- */

import type { NextRequest } from 'next/server';
import { getUaHashFromHeaders, getIpHintFromHeaders, type IpHintOptions } from './core/auth/ua-ip';

/* ---------------------------------------------------------------------- */

export function getUaHash(req: NextRequest): string {
    return getUaHashFromHeaders(req.headers);
}

/* ---------------------------------------------------------------------- */

export function getIpHint(req: NextRequest, opts?: IpHintOptions): string {
    return getIpHintFromHeaders(req.headers, opts);
}

/* ---------------------------------------------------------------------- */
/* ---------------------------------------------------------------------- */
