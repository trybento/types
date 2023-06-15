export type GetEventMetadataOptions = { eventName: string };
export type GetEventMetadataResult = {
  firstSeenAt: string;
  lastSeenAt: string;
} | null;

export interface BentoSDK {
  /**
   * Retrieve Bento metadata for the given event pertaining to the currently-identified account.
   *
   * Metadata will include information such as when the event was first/last received.
   *
   * If the event has not been received by Bento, this function will return `null`.
   */
  getEventMetadataForAccount(
    options: GetEventMetadataOptions
  ): Promise<GetEventMetadataResult>;

  /**
   * Retrieve Bento metadata for the given event pertaining to the currently-identified account-user.
   *
   * Metadata will include information such as when the event was first/last received.
   *
   * If the event has not been received by Bento, this function will return `null`.
   */
  getEventMetadataForAccountUser(
    options: GetEventMetadataOptions
  ): Promise<GetEventMetadataResult>;
}
