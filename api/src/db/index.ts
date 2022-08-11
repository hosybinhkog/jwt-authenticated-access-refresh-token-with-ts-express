const users = [
  {
    email: "test@test.com",
    password: "password",
    name: "hosybinh",
  },
];

export const sessions: Record<
  string,
  { sessionId: string; email: string; valid: boolean }
> = {};

export function getSession(sessionId: string) {
  const sesssion = sessions[sessionId];

  return sesssion && sesssion.valid ? sesssion : null;
}

export function invalidateSession(sessionId: string) {
  const session = sessions[sessionId];

  if (session) {
    sessions[sessionId].valid = false;
  }

  return sessions[sessionId];
}

export function createSession(email: string) {
  const sessionId = String(Object.keys(sessions).length + 1);
  const session = { sessionId, email, valid: true };

  sessions[sessionId] = session;

  return session;
}

export function getUser(email: string) {
  return users.find((user) => user.email === email);
}