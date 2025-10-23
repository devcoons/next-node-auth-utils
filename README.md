# next-node-auth-utils

Minimal, framework-agnostic authentication utilities for Next.js and Node.js.

Provides strong password hashing, session claim helpers, UA/IP fingerprinting, and random ID generation — all split cleanly between browser-safe, Next.js, and Node-only modules.

---

## Features

- Argon2 password hashing (Node-only)
- User-Agent / IP hash extraction with Next.js adapters
- Claims helpers for roles & permissions
- Zod-based password strength validation
- Random ID generation (URL-safe base64)
- Tree-shakeable ESM build with full TypeScript types
- No framework lock-in — works in Node, Next.js, and any headers-compatible runtime

---

## Installation

```bash
npm install next-node-auth-utils
```

Requires Node.js ≥ 18 and Next.js ≥ 13.4.

---

## Usage

### Node.js (API / worker)

```ts
import { randomId } from "next-node-auth-utils"
import { hashPassword, verifyPassword } from "next-node-auth-utils/node"

async function example() {
  const id = randomId()
  const hash = await hashPassword("StrongPassw0rd!")
  const ok = await verifyPassword(hash, "StrongPassw0rd!")

  console.log({ id, ok })
}
```

---

### Next.js (Middleware or Route Handler)

```ts
import { NextResponse } from "next/server"
import { getUaHash, getIpHint } from "next-node-auth-utils/next"

export function middleware(req) {
  const ua = getUaHash(req)
  const ip = getIpHint(req, { bindIp: true })
  console.log({ ua, ip })
  return NextResponse.next()
}
```

---

### Claims Helpers

```ts
import { hasRoles, hasPermissions } from "next-node-auth-utils"

const session = {
  sid: "abc",
  user_id: "u1",
  iat: Date.now(),
  exp: Date.now() + 3600_000,
  claims: { roles: ["admin"], permissions: ["read", "write"] }
}

console.log(hasRoles(session, "admin")) // → true
```

---

### Password Strength Validation

```ts
import { validatePasswordStrength } from "next-node-auth-utils"

const result = validatePasswordStrength("weakpass")
if (!result.ok) console.error(result.error)
```

---

## API Surface

| Import Path | Description |
|--------------|-------------|
| `next-node-auth-utils` | Core helpers (random ID, password validation, claims) |
| `next-node-auth-utils/node` | Node-only Argon2 hashing |
| `next-node-auth-utils/next` | Next.js-specific UA/IP helpers |

---

## Project Goals

- Keep all code framework-agnostic by default.
- Cleanly separate Node-only and Next entry points.
- Ship zero browser-incompatible code in ESM bundles.
- Favor clarity and correctness over magic.

---

## Requirements

- Node.js ≥ 18  
- TypeScript ≥ 5.3  
- Next.js ≥ 13.4 (for next entry point)

---

## License

MIT © 2025 devcoons
