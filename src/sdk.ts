export type GetEventMetadataOptions = { eventName: string };
export type GetEventMetadataResult = {
  /**
   * Indicates whether the provided event has been received by Bento.
   */
  received: boolean;

  /** @deprecated will be deprecated soon. Use `received` instead. */
  receivedCount: number;
};

export interface BentoSDK {
  /**
   * Retrieve Bento metadata for the given event pertaining to the currently-identified account.
   *
   * Metadata will include a field named `received`, indicating whether Bento has received the event
   * or not.
   */
  getEventMetadataForAccount(
    options: GetEventMetadataOptions
  ): Promise<GetEventMetadataResult>;

  /**
   * Retrieve Bento metadata for the given event pertaining to the currently-identified account-user.
   *
   * Metadata will include a field named `received`, indicating whether Bento has received the event
   * or not.
   */
  getEventMetadataForAccountUser(
    options: GetEventMetadataOptions
  ): Promise<GetEventMetadataResult>;
}
