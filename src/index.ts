export type BentoInstance = {
  /** @deprecated use `initialize` instead. This will be removed on June 1, 2023 */
  identify(bentoSettings?: BentoSettings): Promise<boolean>;
  initialize(): Promise<boolean>;
  initialized: boolean;
  reset(): Promise<boolean>;
};

export type DynamicAttributes = {
  [attributeName: string]: string | Date | number | boolean | string[] | undefined;
};

export type BentoSettings = {
  appId: string;
  account: {
    id: string;
    name: string;
    createdAt?: string;
  } & DynamicAttributes;
  accountUser: {
    id: string;
    email?: string;
    fullName?: string;
    role?: string;
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
  }
}
