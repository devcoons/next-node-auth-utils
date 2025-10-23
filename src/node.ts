/* ---------------------------------------------------------------------- */
/* Filepath: <path> */
/* ---------------------------------------------------------------------- */

import { hash as aHash, verify as aVerify } from '@node-rs/argon2';

/* ---------------------------------------------------------------------- */

export async function verifyPassword(hash: string, plain: string): Promise<boolean> {
    try {
        return await aVerify(hash, plain);
    } catch {
        return false;
    }
}

/* ---------------------------------------------------------------------- */

export async function hashPassword(plain: string): Promise<string> {
    const opts = {
        memoryCost: 19456,
        timeCost: 2,
        parallelism: 1,
        outputLen: 32,
    };
    return aHash(plain, opts);
}

/* ---------------------------------------------------------------------- */
/* ---------------------------------------------------------------------- */
