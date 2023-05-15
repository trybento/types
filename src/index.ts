export type BentoInstance = {
  /**
   * Whether Bento is initialized.
   */
  initialized: boolean;
  /**
   * Currenly, this is the same as calling `initialize`.
   *
   * @deprecated use `initialize` instead. This will be removed on June 1, 2023 */
  identify(bentoSettings?: BentoSettings): Promise<boolean>;
  /**
   * Tell Bento to initialize.
   *
   * Please make sure you've set the `window.bentoSettings` object before.
   *
   * Tip: If the account/accountUser is the same but their attributes changed, you should call `initialize` once again.
   */
  initialize(): Promise<boolean>;
  /**
   * Tell Bento to fully reset. Usually called when account/accountUser has switched.
   *
   * Bento will immediately clear all existing state (including the `initialized` flag),
   * and shutdown any rendered components.
   *
   * Tip: You can always re-initialize Bento later.
   */
  reset(): Promise<boolean>;
};

export type DynamicAttributes = {
  /**
   * You may also add any additional attributes you want associated with this account/accountUser within Bento
   */
  [attributeName: string]: string | Date | number | boolean | string[] | undefined;
};

export type BentoSettings = {
  /**
   * Your unique app identifier provided by Bento.
   *
   * Tip: Can be found in Org settings > Integrations
   */
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

export enum BentoWindowEvents {
  /** Fired when Bento has been initialized */
  initialized = "bento-initialized",
}

export enum BentoDocumentEvents {
  /** Fired when a Button or CTA is clicked within Bento */
  buttonClicked = "bento-buttonClicked",
  /** Fired when no available guide is found */
  noGuideFound = "bento-noGuideFound",
  /** Fired when a guide is loaded */
  onGuideLoad = "bento-onGuideLoad",
  /** You can fire this event to tell Bento to close the sidebar component */
  sidebarClose = "bento-sidebarClose",
  /** You can fire this event to tell Bento to open the sidebar component, when available */
  sidebarOpen = "bento-sidebarOpen",
  /** Fired when the Inline component is loaded */
  onInlineEmbedLoad = "bento-onInlineEmbedLoad",
  /** Fired when the Sidebar component is loaded */
  onSidebarEmbedLoad = "bento-onSidebarEmbedLoad",
  /** Fired when the Modal component is loaded */
  onModalEmbedLoad = "bento-onModalEmbedLoad",
  /** Fired when the Banner component is loaded */
  onBannerEmbedLoad = "bento-onBannerEmbedLoad",
  /** Fired when the Tooltip component is loaded */
  onTooltipEmbedLoad = "bento-onTooltipEmbedLoad",
}

export type InitializedEvent = CustomEvent<undefined>;
export type ButtonClickedEvent = CustomEvent<{
  /** Either the event message or name */
  message: string;
}>;
export type NoGuideFoundEvent = CustomEvent<undefined>;
export type OnGuideLoadEvent = CustomEvent<{
  /** Guide base entity id (unique per account) or `undefined` when in preview mode */
  guideBaseId?: string;
  /** Whether this guide is of onboarding type */
  isOnboarding: boolean;
  /** Whether this guide has been completed */
  isComplete: boolean;
  /** List of all Step names */
  allSteps: Record<string, any>;
  /** List of all Step names that has been completed */
  completedSteps: string[];
  /** List of all Step names that has been skipped */
  skippedSteps: string[];
  /** List of all Step names that has been viewed */
  viewedSteps: string[];
}>;
export type SidebarOpenEvent = CustomEvent<undefined>;
export type SidebarCloseEvent = CustomEvent<undefined>;
export type OnFormFactorEmbedLoad = CustomEvent<undefined>;

declare global {
  interface Window {
    /** Holds the current state and API methods of Bento */
    Bento?: BentoInstance;
    /** The account/accountUser details you must set to initialize Bento */
    bentoSettings?: BentoSettings;
  }

  interface WindowEventMap {
    [BentoWindowEvents.initialized]: InitializedEvent;
  }

  interface DocumentEventMap {
    [BentoDocumentEvents.buttonClicked]: ButtonClickedEvent;
    [BentoDocumentEvents.noGuideFound]: NoGuideFoundEvent;
    [BentoDocumentEvents.onGuideLoad]: OnGuideLoadEvent;
    [BentoDocumentEvents.sidebarClose]: SidebarCloseEvent;
    [BentoDocumentEvents.sidebarOpen]: SidebarOpenEvent;
    [BentoDocumentEvents.onInlineEmbedLoad]: OnFormFactorEmbedLoad;
    [BentoDocumentEvents.onSidebarEmbedLoad]: OnFormFactorEmbedLoad;
    [BentoDocumentEvents.onModalEmbedLoad]: OnFormFactorEmbedLoad;
    [BentoDocumentEvents.onBannerEmbedLoad]: OnFormFactorEmbedLoad;
    [BentoDocumentEvents.onTooltipEmbedLoad]: OnFormFactorEmbedLoad;
  }
}
