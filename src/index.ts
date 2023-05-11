export type BentoInstance = {
  /** @deprecated use `initialize` instead. This will be removed on June 1, 2023 */
  identify(bentoSettings?: BentoSettings): Promise<boolean>;
  initialize(): Promise<boolean>;
  initialized: boolean;
  reset(): Promise<boolean>;
};

export type DynamicAttributes = {
  /**
   * You may also add any additional attributes you want associated with this account/accountUser within Bento
   */
  [attributeName: string]: string | Date | number | boolean | string[] | undefined;
};

export type BentoSettings = {
  /** Can be found in Org settings > Integrations */
  appId: string;
  /**
   * Accounts represent your customers or organizations.
   * For example, a company called "AcmeCo". Or a company you would sell your product to.
   */
  account: {
    /**
     * Unique identifier for the account
     * This is best set to something used internally by your app
     */
    id: string;
    /**
     * Human-readable unique account identifier
     * Allows easily identifying the account within the Bento UI
     */
    name: string;
    /**
     * Please ensure it's formatted to ISO8601 Date String
     */
    createdAt?: string;
  } & DynamicAttributes;
  /**
   * Account users represent employees at your account.
   * For example, someone named John Doe who works at AcmeCo.
   * Or the person who would be using your software at the company who purchased it.
   */
  accountUser: {
    /**
     * Unique identifier for the account user
     * This is best set to something used internally by your app
     */
    id: string;
    /**
     * (RECOMMENDED) Human-readable unique account user identifier
     * Allows easily identifying the account user within the Bento UI
     */
    fullName?: string;
    email?: string;
    /**
     * Please ensure it's formatted to ISO8601 Date String
     */
    createdAt?: string;
  } & DynamicAttributes;
};

type SidebarToggledEvent = CustomEvent<{
  isOpen: boolean;
}>;

declare global {
  interface Window {
    Bento?: BentoInstance;
    bentoSettings?: BentoSettings;
  }
  interface DocumentEventMap {
    "bento-sidebarToggled": SidebarToggledEvent;
    /** @todo add support for other events */
  }
}
