import { describe, expect, it } from "vitest";
import {
  PRIMARY_GITHUB_ACCOUNT,
  authorizeAdminGithubProfile,
  getAdminGithubAccounts,
  isAdminGithubAccount,
  readGithubIdentity,
  refreshAdminGithubToken,
  safeAdminCallbackUrl,
} from "./admin-auth";

describe("getAdminGithubAccounts", () => {
  it("always includes the primary account", () => {
    expect(getAdminGithubAccounts(undefined)).toEqual([PRIMARY_GITHUB_ACCOUNT]);
  });

  it("adds normalized invited accounts", () => {
    expect(getAdminGithubAccounts(" Invited-User:42,Second:84 ")).toEqual([
      PRIMARY_GITHUB_ACCOUNT,
      { login: "invited-user", id: "42" },
      { login: "second", id: "84" },
    ]);
  });

  it.each([
    "missing-id",
    "login:not-a-number",
    ":42",
    "login:",
    "login:42,LOGIN:84",
    "first:42,second:42",
    "zaimimr:23628986",
  ])("rejects invalid configuration: %s", (value) => {
    expect(() => getAdminGithubAccounts(value)).toThrow();
  });
});

describe("GitHub identity checks", () => {
  it("accepts the primary and invited accounts", () => {
    expect(isAdminGithubAccount(PRIMARY_GITHUB_ACCOUNT, undefined)).toBe(true);
    expect(
      isAdminGithubAccount(
        { login: "invited-user", id: "42" },
        "invited-user:42",
      ),
    ).toBe(true);
  });

  it("requires both the login and numeric id", () => {
    expect(
      isAdminGithubAccount(
        { login: "invited-user", id: "84" },
        "invited-user:42",
      ),
    ).toBe(false);
    expect(
      isAdminGithubAccount(
        { login: "other-user", id: "42" },
        "invited-user:42",
      ),
    ).toBe(false);
  });

  it("revokes an account when it is removed", () => {
    const identity = { login: "invited-user", id: "42" };
    expect(isAdminGithubAccount(identity, "invited-user:42")).toBe(true);
    expect(isAdminGithubAccount(identity, undefined)).toBe(false);
  });

  it("normalizes profile identities", () => {
    expect(readGithubIdentity({ login: " Invited-User ", id: 42 })).toEqual({
      login: "invited-user",
      id: "42",
    });
  });

  it("rejects incomplete token identities", () => {
    expect(readGithubIdentity({ login: "invited-user" })).toBeNull();
    expect(readGithubIdentity({ githubId: "42" })).toBeNull();
  });
});

describe("Auth callbacks", () => {
  it("authorizes allowed profiles", () => {
    expect(
      authorizeAdminGithubProfile(
        { login: "invited-user", id: 42 },
        "invited-user:42",
      ),
    ).toBe(true);
    expect(
      authorizeAdminGithubProfile(
        { login: "unlisted-user", id: 84 },
        "invited-user:42",
      ),
    ).toBe(false);
  });

  it("issues and revalidates tokens with a GitHub id", () => {
    const issued = refreshAdminGithubToken(
      { name: "Invited User" },
      { login: "Invited-User", id: 42 },
      "invited-user:42",
    );
    expect(issued).toEqual({
      name: "Invited User",
      login: "invited-user",
      githubId: "42",
    });
    expect(
      refreshAdminGithubToken(issued ?? {}, undefined, "invited-user:42"),
    ).toEqual(issued);
  });

  it("returns null after an invite is removed", () => {
    const token = { login: "invited-user", githubId: "42" };
    expect(
      refreshAdminGithubToken(token, undefined, "invited-user:42"),
    ).toEqual(token);
    expect(refreshAdminGithubToken(token, undefined, undefined)).toBeNull();
  });

  it("returns null for legacy tokens without a GitHub id", () => {
    expect(
      refreshAdminGithubToken(
        { login: "invited-user" },
        undefined,
        "invited-user:42",
      ),
    ).toBeNull();
  });
});

describe("safeAdminCallbackUrl", () => {
  it.each([
    ["/admin", "/admin"],
    ["/admin/content", "/admin/content"],
    ["/admin/content?draft=1", "/admin/content?draft=1"],
  ])("accepts %s", (value, expected) => {
    expect(safeAdminCallbackUrl(value)).toBe(expected);
  });

  it.each([
    "https://example.com/admin",
    "//example.com/admin",
    "/admin\\example.com",
    "/projects",
    "admin",
  ])("rejects %s", (value) => {
    expect(safeAdminCallbackUrl(value)).toBe("/admin");
  });
});
