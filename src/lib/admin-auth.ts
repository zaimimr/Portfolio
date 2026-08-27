export const PRIMARY_GITHUB_ACCOUNT = {
  login: "zaimimr",
  id: "23628986",
} as const;

export type AdminGithubAccount = {
  login: string;
  id: string;
};

const githubLoginPattern = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/;
const githubIdPattern = /^[1-9]\d*$/;

function normalizeGithubLogin(value: string): string {
  return value.trim().toLowerCase();
}

function parseInvitedAccount(entry: string): AdminGithubAccount {
  const parts = entry.split(":");
  if (parts.length !== 2) {
    throw new Error("ADMIN_GITHUB_ACCOUNTS entries must use login:id");
  }

  const [rawLogin, rawId] = parts;
  if (rawLogin === undefined || rawId === undefined) {
    throw new Error("ADMIN_GITHUB_ACCOUNTS entries must use login:id");
  }

  const login = normalizeGithubLogin(rawLogin);
  const id = rawId.trim();
  if (!githubLoginPattern.test(login) || !githubIdPattern.test(id)) {
    throw new Error("ADMIN_GITHUB_ACCOUNTS contains an invalid GitHub account");
  }

  return { login, id };
}

export function getAdminGithubAccounts(
  configuredAccounts: string | undefined,
): AdminGithubAccount[] {
  const accounts: AdminGithubAccount[] = [PRIMARY_GITHUB_ACCOUNT];
  if (configuredAccounts === undefined || configuredAccounts.trim() === "") {
    return accounts;
  }

  for (const entry of configuredAccounts.split(",")) {
    const account = parseInvitedAccount(entry);
    if (
      accounts.some(
        (existing) =>
          existing.login === account.login || existing.id === account.id,
      )
    ) {
      throw new Error("ADMIN_GITHUB_ACCOUNTS contains a duplicate account");
    }
    accounts.push(account);
  }

  return accounts;
}

export function readGithubIdentity(value: unknown): AdminGithubAccount | null {
  if (typeof value !== "object" || value === null) return null;

  const source = value as {
    login?: unknown;
    id?: unknown;
    githubId?: unknown;
  };
  const login = source.login;
  const id = source.id ?? source.githubId;
  if (typeof login !== "string") return null;
  if (typeof id !== "string" && typeof id !== "number") return null;

  const normalizedLogin = normalizeGithubLogin(login);
  const normalizedId = String(id);
  if (
    !githubLoginPattern.test(normalizedLogin) ||
    !githubIdPattern.test(normalizedId)
  ) {
    return null;
  }

  return { login: normalizedLogin, id: normalizedId };
}

export function isAdminGithubAccount(
  identity: AdminGithubAccount,
  configuredAccounts: string | undefined,
): boolean {
  return getAdminGithubAccounts(configuredAccounts).some(
    (account) => account.login === identity.login && account.id === identity.id,
  );
}

export function authorizeAdminGithubProfile(
  profile: unknown,
  configuredAccounts: string | undefined,
): boolean {
  const identity = readGithubIdentity(profile);
  return (
    identity !== null && isAdminGithubAccount(identity, configuredAccounts)
  );
}

export function refreshAdminGithubToken<T extends Record<string, unknown>>(
  token: T,
  profile: unknown,
  configuredAccounts: string | undefined,
): (T & { login: string; githubId: string }) | null {
  const identity = readGithubIdentity(profile ?? token);
  if (
    identity === null ||
    !isAdminGithubAccount(identity, configuredAccounts)
  ) {
    return null;
  }

  return { ...token, login: identity.login, githubId: identity.id };
}

export function safeAdminCallbackUrl(value: unknown): string {
  if (typeof value !== "string" || value.includes("\\")) return "/admin";

  try {
    const base = new URL("https://zaim.no");
    const target = new URL(value, base);
    const isAdminPath =
      target.pathname === "/admin" || target.pathname.startsWith("/admin/");
    if (target.origin !== base.origin || !isAdminPath) return "/admin";

    return `${target.pathname}${target.search}`;
  } catch {
    return "/admin";
  }
}
