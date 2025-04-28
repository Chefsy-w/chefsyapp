export const cacheUserSession = (token, role, expiry) => {
  localStorage.setItem("u_token", token);
  localStorage.setItem("user", role);
  localStorage.setItem("u_token_expiry", expiry);
};

export const clearUserSession = () => {
  localStorage.clear();
  window.location.href = "/";
};

export const getUserSession = () => {
  try {
    const token = localStorage.getItem("u_token");
    const expiry = localStorage.getItem("u_token_expiry");

    if (!token || !expiry) {
      return undefined;
    }

    const currentTimestamp = Date.now();
    const expiryTimestamp = parseInt(expiry, 10);

    if (currentTimestamp >= expiryTimestamp) {
      clearUserSession();
      return undefined;
    }

    return token;
  } catch (error) {
    console.error("Error retrieving user session:", error);
    return undefined;
  }
};

export const getTokenExpiry = (token) => {
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid token");
  }
  const payload = parts[1];
  const decodedPayload = JSON.parse(
    atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
  );

  const expiryTime = decodedPayload.exp;

  return new Date(expiryTime * 1000);
};
