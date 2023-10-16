import { BentoSDK } from "./sdk";

//
// Bento instance
//

export type BentoInstance = {
  /**
   * Whether Bento is initialized.
   */
  initialized: boolean;
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
  /**
   * Contains utility/helper SDK functions to access and work with Bento data.
   */
  sdk: BentoSDK;
};

export type DynamicAttributes = {
  /**
   * You may also add any additional attributes you want associated with this account/accountUser within Bento,
   * for example what products they bought, their pricing tier, or user role.
   */
  [attributeName: string]: string | Date | number | boolean | string[] | undefined;
};

export type BentoSettings = {
  /**
   * Your unique app identifier provided by Bento.
   *
   * Tip: Can be found in the Integrations page.
   */
  appId: string;
  /**
   * Accounts represent your customers.
   * For example, a company called "AcmeCo".
   */
  account: {
    /**
     * Unique identifier for the account
     * This is best set to something used internally by your app like an id or slug.
     */
    id: string;
    /**
     * Human-readable unique account identifier
     * Allows easily identifying the account within the Bento UI so a human can find stats for that account.
     */
    name: string;
    /**
     * Please ensure it's formatted to ISO8601 Date String
     */
    createdAt?: string;
  } & DynamicAttributes;
  /**
   * Account users represent people at your customer-companies.
   * For example, someone named John Doe who works at AcmeCo and uses your product.
   */
  accountUser: {
    /**
     * Unique identifier for the account user
     * This is best set to something used internally by your app like an id.
     */
    id: string;
    /**
     * (Recommended) Human-readable unique account user identifier
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

//
// Window & document events
//

export enum BentoWindowEvents {
  /** Fired when Bento script has finished loading and is ready to be called */
  loaded = "bento-loaded",
  /** Fired when Bento has been initialized */
  initialized = "bento-initialized",
}

export enum BentoDocumentEvents {
  /** Fired when a Button or CTA is clicked within Bento */
  buttonClicked = "bento-buttonClicked",
  /** Fired when no available Guide is found */
  noGuideFound = "bento-noGuideFound",
  /** Fired when a Guide is loaded */
  onGuideLoad = "bento-onGuideLoad",
  /** You can fire this event to tell Bento to close the Sidebar component */
  sidebarClose = "bento-sidebarClose",
  /** You can fire this event to tell Bento to open the Sidebar component, when available */
  sidebarOpen = "bento-sidebarOpen",
  /** Fired when the Inline (i.e. checklist) component is loaded */
  onInlineEmbedLoad = "bento-onInlineEmbedLoad",
  /** Fired when the Sidebar component is loaded */
  onSidebarEmbedLoad = "bento-onSidebarEmbedLoad",
  /** Fired when the Modal component is loaded */
  onModalEmbedLoad = "bento-onModalEmbedLoad",
  /** Fired when the Banner component is loaded */
  onBannerEmbedLoad = "bento-onBannerEmbedLoad",
  /** Fired when the Tooltip component is loaded */
  onTooltipEmbedLoad = "bento-onTooltipEmbedLoad",
  /** Fired when a component changes visibility state (i.e. a banner is hidden) */
  onComponentVisibilityChange = "bento-onComponentVisibilityChange",
}

export type LoadedEvent = CustomEvent<undefined>;
export type InitializedEvent = CustomEvent<undefined>;
export type ButtonClickedEvent = CustomEvent<{
  /** Either the event message or name */
  message: string;
}>;
export type NoGuideFoundEvent = CustomEvent<undefined>;
export type OnGuideLoadEvent = CustomEvent<{
  /** Guide base entity id (unique per account) or `undefined` when in preview mode */
  guideBaseId?: string;
  /** Whether this Guide is an onboarding checklist */
  isOnboarding: boolean;
  /** Whether this Guide has been completed */
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
export type OnComponentVisibilityChange = CustomEvent<{
  /** Whether the component is visible, false means hidden */
  visible: boolean;
  /** Which component type this is about */
  component: "modal" | "banner";
}>;

export * from "./sdk";

declare global {
  interface Window {
    /** Holds the current state and API methods of Bento */
    Bento?: BentoInstance;
    /** The account/accountUser details you must set to initialize Bento */
    bentoSettings?: BentoSettings;
  }

  interface WindowEventMap {
    [BentoWindowEvents.loaded]: LoadedEvent;
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
    [BentoDocumentEvents.onComponentVisibilityChange]: OnComponentVisibilityChange;
  }
}

//
// IntrinsicElements
//

type CommonBentoElementAttributes = {};

export interface IntrinsicElements {
  /**
   * Used to programatically control where the inline component responsible for displaying
   * the resource center and any onboarding guides should live, usually in a getting-started page
   * shown to end-users after logging in.
   *
   * WARNING: We strongly recommend you use the auto-injection feature instead, where you determine
   * the inline placement throught the Bento App and therefore you can make live changes without
   * having to perform code-level changes.
   *
   * @see https://help.trybento.co/en/articles/6476765-where-will-my-onboarding-checklist-appear
   */
  "bento-embed": CommonBentoElementAttributes;

  /**
   * Used to programatically control where the sidebar component should live.
   *
   * WARNING: We strongly recommend you don't use this method of inserting the sidebar and simply let the
   * Bento snippet dynamically insert it into the DOM. Not doing so guarantees that the sidebar component
   * will be available everywhere in your App where Bento is present and initialized.
   *
   * @see https://help.trybento.co/en/articles/6810074-control-where-the-bento-sidebar-appears
   */
  "bento-sidebar": CommonBentoElementAttributes;
}
