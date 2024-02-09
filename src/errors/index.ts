/* eslint-disable max-classes-per-file */
export const errors = {
  ScrapingError: {
    message: "Scraping error",
  },

  ImageNotFound: {
    message: "Image not found",
  },

  R2Error: {
    message: "R2 error",
  },

  UnknownError: {
    message: "Unknown error",
  },

  DiscordNotificationError: {
    message: "Discord notification error",
  },
} as const;

type Errors = typeof errors;
type ErrorMessages = {
  [T in keyof Errors]: Errors[T]["message"];
}[keyof Errors];

export class HandleError extends Error {
  message: ErrorMessages;

  constructor(public error: keyof Errors) {
    super();
    this.message = errors[error].message;
  }
}

export class ScrapingError extends HandleError {
  constructor() {
    super("ScrapingError");
  }
}

export class ImageNotFound extends HandleError {
  constructor() {
    super("ImageNotFound");
  }
}

export class UnknownError extends HandleError {
  constructor() {
    super("UnknownError");
  }
}

export class DiscordNotificationError extends HandleError {
  constructor() {
    super("DiscordNotificationError");
  }
}

export class R2Error extends HandleError {
  constructor() {
    super("R2Error");
  }
}
