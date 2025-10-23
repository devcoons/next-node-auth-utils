/* ---------------------------------------------------------------------- */
/* Filepath: <path> */
/* ---------------------------------------------------------------------- */

import { z } from 'zod';

/* ---------------------------------------------------------------------- */

export const passwordSchema = z
    .string()
    .min(10)
    .refine((s) => /[a-z]/.test(s) && /[A-Z]/.test(s) && /\d/.test(s), {
        message: 'Password must be 10+ chars with upper, lower, and digit.',
    });

/* ---------------------------------------------------------------------- */

export function validatePasswordStrength(pw: string) {
    const r = passwordSchema.safeParse(pw);
    return r.success
        ? { ok: true as const }
        : { ok: false as const, error: r.error.issues[0]?.message ?? 'Weak password' };
}

/* ---------------------------------------------------------------------- */

export async function generatePassword(len = 14) {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#';
    const out: string[] = [];

    if (typeof globalThis !== 'undefined' && (globalThis as any).crypto?.getRandomValues) {
        const arr = new Uint32Array(len);
        (globalThis as any).crypto.getRandomValues(arr);
        for (let i = 0; i < len; i++) out.push(alphabet[arr[i] % alphabet.length]);
        return out.join('');
    }

    const { randomBytes } = await import('node:crypto');
    const buf = randomBytes(len);
    for (let i = 0; i < len; i++) out.push(alphabet[buf[i] % alphabet.length]);
    return out.join('');
}

/* ---------------------------------------------------------------------- */
/* ---------------------------------------------------------------------- */
