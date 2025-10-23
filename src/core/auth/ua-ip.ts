/* ---------------------------------------------------------------------- */
/* Filepath: <path> */
/* ---------------------------------------------------------------------- */

import { createHash } from 'crypto';

/* ---------------------------------------------------------------------- */

export type HeaderSource = {
    get(name: string): string | null | undefined;
};

/* ---------------------------------------------------------------------- */

export function getUaHashFromHeaders(headers: HeaderSource): string {
    const ua = headers.get('user-agent') ?? '';
    return createHash('sha256').update(ua).digest('base64url');
}

/* ---------------------------------------------------------------------- */

export type IpHintOptions = {
    bindIp?: boolean;
    headerOrder?: readonly string[];
};

/* ---------------------------------------------------------------------- */

const DEFAULT_ORDER = [
    'x-forwarded-for',
    'x-real-ip',
    'cf-connecting-ip',
    'fly-client-ip',
    'x-vercel-forwarded-for',
] as const;

/* ---------------------------------------------------------------------- */

export function getIpHintFromHeaders(headers: HeaderSource, opts?: IpHintOptions): string {
    const bindIp = !!opts?.bindIp;
    if (!bindIp) return '';

    const order = (opts?.headerOrder ?? DEFAULT_ORDER) as readonly string[];
    for (const h of order) {
        const v = headers.get(h) ?? '';
        if (!v) continue;

        const first =
            h === 'x-forwarded-for' || h === 'x-vercel-forwarded-for'
                ? v.split(',')[0]?.trim()
                : v.trim();

        if (first) return first;
    }

    return '';
}

/* ---------------------------------------------------------------------- */
/* ---------------------------------------------------------------------- */
